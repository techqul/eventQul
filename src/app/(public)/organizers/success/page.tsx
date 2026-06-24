import Link from "next/link";
import { CheckCircle, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrganizerSignupSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Application Submitted!</h1>
              <p className="text-muted-foreground">
                Thank you for your interest in becoming an organizer on EventQul.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-left">
              <p className="font-medium">What happens next?</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>1. We'll review your application within 24-48 hours</li>
                <li>2. You'll receive an email confirmation shortly</li>
                <li>3. Our team may contact you for additional documents</li>
                <li>4. Once verified, you can start creating events!</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button className="w-full" variant="gradient" asChild>
                <Link href="/organizer">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Questions? Contact us at{" "}
              <a href="mailto:organizers@eventqul.com" className="text-primary hover:underline">
                organizers@eventqul.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
