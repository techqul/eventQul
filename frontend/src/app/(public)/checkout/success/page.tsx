"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ordersApi } from "@/lib/api/orders";
import { OrderDetail } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import {
  OrderSuccessHeader,
  OrderSummaryCard,
  TicketsSection,
  EventInfo,
  AttendeeInfo,
  TotalsSection,
  ConfirmationMessage,
  ActionButtons,
  SupportLink,
} from "@/components/checkout";
import { TicketDownload } from "@/components/checkout/TicketDownload";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [order, setOrder] = useState<OrderDetail | null>(null);
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
  }, [orderNumber, router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <OrderSuccessHeader />

        <Card className="bg-card">
          <CardContent className="p-6 space-y-6">
            <OrderSummaryCard
              orderNumber={order.orderNumber}
              total={order.total}
              status={order.status}
            />

            <EventInfo
              eventTitle={order.eventTitle}
              venuName={order.venuName}
              eventStartDate={order.eventStartDate}
              eventEndDate={order.eventEndDate}
              eventTime={order.eventTime}
            />

            <TicketsSection tickets={order.tickets} qrCode={order.qrCode} />

            <AttendeeInfo
              attendeeName={order.attendeeName}
              attendeeEmail={order.attendeeEmail}
              attendeePhone={order.attendeePhone}
            />

            <TotalsSection subtotal={order.subtotal} total={order.total} />

            <ConfirmationMessage phoneNumber={order.attendeePhone} />
          </CardContent>
        </Card>

        <ActionButtons orderId={order.orderNumber} />
        <SupportLink />

        {/* Hidden ticket for download */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <TicketDownload id="ticket-download-element" order={order} />
        </div>
      </div>
    </div>
  );
}
