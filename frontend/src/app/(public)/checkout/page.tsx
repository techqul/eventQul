"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { eventsApi } from "@/lib/api/events";
import { paymentApi } from "@/lib/api/payment";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";
import { Event, TicketType, UserRole } from "@/types";
import { UserFormData, userFormSchema } from "@/lib/validations/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import modular components
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { AttendeeForm } from "@/components/checkout/AttendeeForm";
import { PaymentMethodSection } from "@/components/checkout/PaymentMethodSection";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash"); // Default to bKash
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketType, setTicketType] = useState<TicketType | null>(null);

  const eventId = searchParams.get("event") as string;
  const ticketId = searchParams.get("ticket") as string;

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      nickName: "",
      phoneNumber: "",
      instituteName: "",
      district: "",
      dob: "",
      bloodGroup: undefined,
      gender: undefined,
      tshirtSize: undefined,
      role: UserRole.USER,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!eventId) {
      router.push("/events");
    }
    const fetchEvent = async () => {
      try {
        const response = await eventsApi.getById(eventId);
        if (response.success && response.data) {
          const data: any = response.data;
          setEvent(data);
          setTicketType(data?.ticketTypes?.find((t: any) => t.id === ticketId));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const subtotal = Number(ticketType?.price) * quantity;
  const convenienceFee = quantity * 0;
  const total = subtotal + convenienceFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "eventqul10") {
      setDiscount(subtotal * 0.1);
      toast.success("Coupon applied! 10% discount has been applied to your order.");
    } else if (couponCode.toLowerCase() === "free") {
      setDiscount(subtotal);
      toast.success("Wow! Your ticket is now completely free!");
    } else {
      toast.error("Invalid coupon. Please enter a valid coupon code.");
    }
  };

  const handlePlaceOrder = async () => {
    // Validate form
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!ticketType?.id || !eventId) {
      toast.error("Unable to process order. Missing ticket or event information.");
      return;
    }

    setIsProcessing(true);

    try {
      const formValues = form.getValues();
      const DEFAULT_PASSWORD = "Admin@1234!";

      // STEP 1: Check if user exists by email, if not then register
      let existingUser = null;
      try {
        existingUser = await usersApi.getByEmail(formValues.email);
      } catch (error) {
        // User doesn't exist, will register
      }

      console.log("existingUser", existingUser);

      if (!existingUser?.data) {
        const registerData = {
          email: formValues.email,
          password: DEFAULT_PASSWORD,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          nickName: formValues.nickName,
          phoneNumber: formValues.phoneNumber,
          instituteName: formValues.instituteName,
          district: formValues.district,
          dob: formValues.dob,
          bloodGroup: formValues.bloodGroup,
          gender: formValues.gender,
          tshirtSize: formValues.tshirtSize,
          role: UserRole.USER,
        };

        await authApi.register(registerData);
      }

      // STEP 2: Complete checkout with payment
      const checkoutData = {
        provider: 'bkash', // 'bkash' or 'sslcommerz'
        paymentMethod: "mobile_banking",
        callbackUrl: `${window.location.origin}/checkout/success`,
        payerReference: formValues.phoneNumber || "",
        amount: total,
      };

      const response = await paymentApi.checkout(checkoutData);

   console.log("Checkout response:", response);

      // Redirect to bKash payment page if redirectUrl is provided
      if (response?.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Unable to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) =>
      Math.min(Number(ticketType?.maxPerPurchase) || 10, prev + 1)
    );
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="container mx-auto p-4">
      <CheckoutHeader eventSlug={event?.slug} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <AttendeeForm form={form} />
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummaryCard
            event={event}
            ticketType={ticketType}
            quantity={quantity}
            subtotal={subtotal}
            convenienceFee={convenienceFee}
            discount={discount}
            total={total }
            couponCode={couponCode}
            onQuantityIncrease={handleIncreaseQuantity}
            onQuantityDecrease={handleDecreaseQuantity}
            onCouponChange={setCouponCode}
            onApply={handleApplyCoupon}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
