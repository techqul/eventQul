import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
} from "@/components/form/FormComponents";
import { bloodGroupOptions, genderOptions } from "@/types/common";
import { FormProvider } from "react-hook-form";
import { TShirtSizeSelector } from "@/components/form/TShirtSizeSelector";

interface AttendeeFormProps {
  form: any;
}

export function AttendeeForm({ form }: AttendeeFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold mb-1">Checkout</h1>
            <p className="text-muted-foreground text-sm">
              Complete your purchase to secure your tickets
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormProvider {...form}>
            <div className="grid grid-cols-1 gap-x-8 gap-4 md:grid-cols-2">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="John"
                required
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
              />
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="+880 1234-567890"
              />

              <FormInput
                name="instituteName"
                label="Institute Name"
                placeholder="Dhaka University"
              />

              <FormInput name="thana" label="Thana" placeholder="Rampura" />
              <FormInput name="district" label="District" placeholder="Dhaka" />

              <FormDatePicker
                name="dob"
                label="Date of Birth"
                placeholder="Select date"
                disableFuture
                id="dob"
              />
              <FormInput name="ocupation" label="Ocupation" placeholder="Job" />

              <FormSelect
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
              />
              <FormSelect
                name="bloodGroup"
                label="Blood Group"
                placeholder="Select blood group"
                options={bloodGroupOptions}
              />

              <FormInput
                name="facebookId"
                label="Facebook Id"
                placeholder="www.facebook.com"
              />
              <FormInput
                name="linkedinId"
                label="linkedin Id"
                placeholder="www.linkedin.com"
              />
            </div>

            {/* T-Shirt Size - Full width */}
            <div className="space-y-2">
              <Label>T-Shirt Size</Label>
              <TShirtSizeSelector
                value={form.watch("tshirtSize")}
                onChange={(value) => form.setValue("tshirtSize", value)}
                className="grid grid-cols-3 gap-4"
              />
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> An account will be automatically created for you.
                You can login later using your email and default password.
              </p>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
}
