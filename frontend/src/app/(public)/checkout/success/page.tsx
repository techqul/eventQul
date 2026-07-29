"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ordersApi } from "@/lib/api/orders";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar, MapPin, Ticket } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderNumber = searchParams.get("order");

  useEffect(() => {
    if (!orderNumber) {
      router.push("/events");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await ordersApi.getByOrderNumber(orderNumber);
        if (response.success && response.data) {
          setOrder(response.data);
        } else {
          throw new Error("Failed to fetch order");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast({
          title: "Error",
          description: "Unable to fetch order details.",
          variant: "destructive",
        });
        router.push("/events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  const handleDownloadTicket = () => {
    toast({
      title: "Download Started",
      description: "Your ticket is being downloaded.",
    });
    // TODO: Implement actual ticket download
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order Details</h2>
                <p className="text-sm text-muted-foreground">
                  Order #{order.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ৳{Number(order.total).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {order.status}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tickets List */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Tickets ({order.tickets.length})
              </h3>
              {order.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{ticket.eventTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.ticketTypeName}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      {ticket.eventDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(ticket.eventDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Venue
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">QR Code</p>
                    <p className="font-mono text-xs">{ticket.qrCode.slice(0, 8)}...</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Attendee Information */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Attendee Information</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {order.tickets[0]?.attendeeName}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {order.tickets[0]?.attendeeEmail}
                </p>
                <p>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {order.tickets[0]?.attendeePhone}
                </p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{Number(order.subtotal).toFixed(2)}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm mb-2 text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-৳{Number(order.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>৳{Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={handleDownloadTicket}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Tickets
          </Button>
          <Button
            className="flex-1"
            onClick={() => router.push("/events")}
          >
            Browse Events
          </Button>
        </div>
      </div>
    </div>
  );
}
