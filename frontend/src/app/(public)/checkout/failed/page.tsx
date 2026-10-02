"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function CheckoutFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [message, setMessage] = useState("Payment processing failed");
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const errorMsg = searchParams.get("message");
    const payment = searchParams.get("payment");

    if (errorMsg) {
      setMessage(decodeURIComponent(errorMsg));
    }

    if (payment) {
      setPaymentId(payment);
    }

    // Show error toast
    toast({
      title: "Payment Failed",
      description: errorMsg || "Your payment could not be processed. Please try again.",
      variant: "destructive",
    });
  }, [searchParams, toast]);

  const handleRetry = () => {
    // Redirect back to checkout page
    // In a real app, you might want to restore cart state from localStorage or server
    router.push("/events");
  };

  const handleContactSupport = () => {
    // Open email client or redirect to support page
    const subject = encodeURIComponent("Payment Issue - EventQul");
    const body = paymentId
      ? encodeURIComponent(`Payment ID: ${paymentId}\nError: ${message}`)
      : encodeURIComponent(`Error: ${message}`);

    window.location.href = `mailto:support@eventqul.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card className="border-destructive">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">
              Payment Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              {message}
            </p>

            {paymentId && (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Payment Reference:</p>
                <p className="text-xs text-muted-foreground font-mono">{paymentId}</p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                onClick={handleRetry}
                className="w-full"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              <Button
                onClick={handleContactSupport}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Contact Support
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Need help? Visit our{" "}
                <a
                  href="/help"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/help");
                  }}
                >
                  Help Center
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
