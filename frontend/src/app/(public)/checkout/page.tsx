"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Phone,
  User,
  Mail,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { eventsApi } from "@/lib/api/events";
import { Event, TicketType } from "@/types";
import { getGoogleDriveImageUrl } from "@/lib/utils/image";

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

  console.log("id", eventId, ticketId);

  //single event api call

  useEffect(() => {
    if (!eventId) {
      router.push("/events");
    }
    const fetchEvent = async () => {
      try {
        const response = await eventsApi.getById(eventId);
        console.log("response", response);
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

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        href={`/events/${event?.slug}`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to event
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
 

          {/* Attendee Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="">
                  {/* <User className="h-5 w-5" />
                  Attendee Information */}
                   <h1 className="text-2xl font-bold mb-1">Checkout</h1>
            <p className="text-muted-foreground text-sm">
              Complete your purchase to secure your tickets
            </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="mobile">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile
                    </TabsTrigger>
                    <TabsTrigger value="cod">
                      <Phone className="h-4 w-4 mr-2" />
                      COD
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mobile" className="space-y-4 mt-4">
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="h-20 flex-col gap-1">
                        <span className="text-lg font-bold text-pink-500">
                          bKash
                        </span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-1">
                        <span className="text-lg font-bold text-orange-500">
                          Nagad
                        </span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-1">
                        <span className="text-lg font-bold text-purple-500">
                          Rocket
                        </span>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input id="mobileNumber" placeholder="+880 1XXX-XXXXXX" />
                    </div>
                  </TabsContent>

                  <TabsContent value="cod" className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">
                      Pay cash at the venue on the event day. Please arrive 30
                      minutes early.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event */}
                <div className="flex gap-3">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getGoogleDriveImageUrl(event?.coverImage as string)}
                      alt={event?.title as string}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold line-clamp-2">
                      {event?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {ticketType?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(event?.startDate)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setQuantity(
                          Math.min(
                            Number(ticketType?.maxPerPurchase),
                            quantity + 1,
                          ),
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({quantity} ×{" "}
                      {formatPrice(Number(ticketType?.price))})
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Convenience Fee
                    </span>
                    <span>{formatPrice(convenienceFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                {/* Coupon */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>

                {/* Place Order Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
