import { motion } from "framer-motion";
import { CreditCard, Smartphone, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export function PaymentMethodSection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSectionProps) {
  return (
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
          <Tabs value={paymentMethod} onValueChange={onPaymentMethodChange}>
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
                Pay cash at the venue on the event day. Please arrive 30 minutes
                early.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
