"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { eventsApi } from "@/lib/api/events";
import { ordersApi } from "@/lib/api/orders";
import { authApi } from "@/lib/api/auth";
import { Event, TicketType, UserRole, CreateOrderInput } from "@/types";
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
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
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
  const convenienceFee = Math.max(50, subtotal * 0.05);
  const total = subtotal + convenienceFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "eventqul10") {
      setDiscount(subtotal * 0.1);
      toast({
        title: "Coupon applied!",
        description: "10% discount has been applied to your order.",
      });
    } else if (couponCode.toLowerCase() === "free") {
      setDiscount(subtotal);
      toast({
        title: "Wow! Free ticket!",
        description: "Your ticket is now completely free!",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
  };

  const handlePlaceOrder = async () => {
    // Validate form
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    if (!ticketType?.id || !eventId) {
      toast({
        title: "Missing Information",
        description: "Unable to process order. Missing ticket or event information.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const formValues = form.getValues();
      const DEFAULT_PASSWORD = "Admin@1234!";

      // STEP 1: Register user
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

      const authResponse = await authApi.register(registerData);

      // STEP 2: Store JWT tokens for API call
      if (authResponse?.data?.accessToken) {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", authResponse.data.accessToken);
          if (authResponse.data.refreshToken) {
            localStorage.setItem("refresh_token", authResponse.data.refreshToken);
          }
        }
      }

      // STEP 3: Create order
      const orderData: CreateOrderInput = {
        tickets: [{ ticketTypeId: ticketType.id, quantity }],
        couponCode: couponCode || undefined,
        paymentMethod: paymentMethod || "card",
        attendeeName: `${formValues.firstName} ${formValues.lastName}`.trim(),
        attendeeEmail: formValues.email,
        attendeePhone: formValues.phoneNumber || "",
      };

      const response = await ordersApi.create(orderData);

      // STEP 4: Show success
      if (response.success && response.data) {
        router.push(`/checkout/success?order=${response.data.orderNumber}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Order Failed",
        description: error.message || "Unable to place your order. Please try again.",
        variant: "destructive",
      });
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
            total={total}
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
