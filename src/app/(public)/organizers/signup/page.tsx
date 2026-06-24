"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function OrganizerSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Step 2: Address
    address: "",
    city: "",
    area: "",

    // Step 3: Description
    description: "",
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",

    // Step 4: Verification
    tradeLicenseNo: "",
    tinNo: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.organizationName) newErrors.organizationName = "Organization name is required";
      if (!formData.organizationType) newErrors.organizationType = "Organization type is required";
      if (!formData.contactPerson) newErrors.contactPerson = "Contact person name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    if (currentStep === 2) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.area) newErrors.area = "Area is required";
    }

    if (currentStep === 3) {
      if (!formData.description) newErrors.description = "Description is required";
      if (formData.description.length < 50) newErrors.description = "Description must be at least 50 characters";
    }

    if (currentStep === 4) {
      if (!formData.tradeLicenseNo) newErrors.tradeLicenseNo = "Trade license number is required";
      if (!formData.tinNo) newErrors.tinNo = "TIN number is required";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      router.push("/organizers/success");
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const steps = [
    { title: "Basic Info", icon: Building2 },
    { title: "Address", icon: MapPin },
    { title: "About", icon: User },
    { title: "Verification", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/organizers"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organizers
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <div key={s.title} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: step >= index + 1 ? "hsl(var(--primary))" : "hsl(var(--muted))",
                      scale: step === index + 1 ? 1.1 : 1,
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.div>
                  <span className="text-xs mt-2 text-muted-foreground hidden md:block">
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      step > index + 1 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Basic Information"}
                {step === 2 && "Address Details"}
                {step === 3 && "About Your Organization"}
                {step === 4 && "Verification"}
              </CardTitle>
              <p className="text-muted-foreground">
                Step {step} of {steps.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="organizationName">
                        Organization Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="organizationName"
                        placeholder="Enter your organization name"
                        value={formData.organizationName}
                        onChange={(e) => updateFormData("organizationName", e.target.value)}
                        className={errors.organizationName ? "border-destructive" : ""}
                      />
                      {errors.organizationName && (
                        <p className="text-sm text-destructive mt-1">{errors.organizationName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="organizationType">
                        Organization Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) => updateFormData("organizationType", value)}
                      >
                        <SelectTrigger
                          className={errors.organizationType ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">Private Company</SelectItem>
                          <SelectItem value="partnership">Partnership Firm</SelectItem>
                          <SelectItem value="sole-proprietor">Sole Proprietorship</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.organizationType && (
                        <p className="text-sm text-destructive mt-1">{errors.organizationType}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contactPerson">
                        Contact Person Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contactPerson"
                        placeholder="Full name of contact person"
                        value={formData.contactPerson}
                        onChange={(e) => updateFormData("contactPerson", e.target.value)}
                        className={errors.contactPerson ? "border-destructive" : ""}
                      />
                      {errors.contactPerson && (
                        <p className="text-sm text-destructive mt-1">{errors.contactPerson}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+8801XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <p className="text-sm font-medium">Create Password</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">
                            Password <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                            className={errors.password ? "border-destructive" : ""}
                          />
                          {errors.password && (
                            <p className="text-sm text-destructive mt-1">{errors.password}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">
                            Confirm Password <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-destructive" : ""}
                          />
                          {errors.confirmPassword && (
                            <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">
                      Street Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="House/Office number, street name"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => updateFormData("city", value)}
                      >
                        <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dhaka">Dhaka</SelectItem>
                          <SelectItem value="Chittagong">Chittagong</SelectItem>
                          <SelectItem value="Sylhet">Sylhet</SelectItem>
                          <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                          <SelectItem value="Khulna">Khulna</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-sm text-destructive mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="area">
                        Area <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="area"
                        placeholder="e.g., Gulshan, Dhanmondi"
                        value={formData.area}
                        onChange={(e) => updateFormData("area", e.target.value)}
                        className={errors.area ? "border-destructive" : ""}
                      />
                      {errors.area && (
                        <p className="text-sm text-destructive mt-1">{errors.area}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: About */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">
                      Organization Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your organization, the types of events you organize, and your experience..."
                      className={`min-h-32 ${errors.description ? "border-destructive" : ""}`}
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.description.length}/500 characters
                    </p>
                    {errors.description && (
                      <p className="text-sm text-destructive mt-1">{errors.description}</p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-sm font-medium">Social Links (Optional)</p>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="website">
                          <Globe className="h-4 w-4 mr-2 inline" />
                          Website
                        </Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={(e) => updateFormData("website", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="facebook">
                          <Facebook className="h-4 w-4 mr-2 inline" />
                          Facebook Profile/Page
                        </Label>
                        <Input
                          id="facebook"
                          placeholder="https://facebook.com/yourpage"
                          value={formData.facebook}
                          onChange={(e) => updateFormData("facebook", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="instagram">
                          <Instagram className="h-4 w-4 mr-2 inline" />
                          Instagram Profile
                        </Label>
                        <Input
                          id="instagram"
                          placeholder="https://instagram.com/yourprofile"
                          value={formData.instagram}
                          onChange={(e) => updateFormData("instagram", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="twitter">
                          <Twitter className="h-4 w-4 mr-2 inline" />
                          Twitter/X Profile
                        </Label>
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/yourhandle"
                          value={formData.twitter}
                          onChange={(e) => updateFormData("twitter", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Verification Requirements</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Trade License Number (required)</li>
                      <li>• Tax Identification Number (TIN)</li>
                      <li>• Business documents will be requested after signup</li>
                      <li>• Verification typically takes 24-48 hours</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tradeLicenseNo">
                        Trade License Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tradeLicenseNo"
                        placeholder="Enter your trade license number"
                        value={formData.tradeLicenseNo}
                        onChange={(e) => updateFormData("tradeLicenseNo", e.target.value)}
                        className={errors.tradeLicenseNo ? "border-destructive" : ""}
                      />
                      {errors.tradeLicenseNo && (
                        <p className="text-sm text-destructive mt-1">{errors.tradeLicenseNo}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tinNo">
                        Tax Identification Number (TIN) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="tinNo"
                        placeholder="Enter your TIN number"
                        value={formData.tinNo}
                        onChange={(e) => updateFormData("tinNo", e.target.value)}
                        className={errors.tinNo ? "border-destructive" : ""}
                      />
                      {errors.tinNo && (
                        <p className="text-sm text-destructive mt-1">{errors.tinNo}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => updateFormData("agreeTerms", checked)}
                        className={errors.agreeTerms ? "border-destructive" : ""}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreeTerms" className="text-sm font-normal cursor-pointer">
                          I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                          <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          By signing up, you agree to our organizer policies and guidelines for event management on EventQul.
                        </p>
                        {errors.agreeTerms && (
                          <p className="text-sm text-destructive">{errors.agreeTerms}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox id="agreeMarketing" onCheckedChange={(checked) => updateFormData("agreeMarketing", checked as boolean)} />
                      <div className="space-y-1">
                        <Label htmlFor="agreeMarketing" className="text-sm font-normal cursor-pointer">
                          Send me updates about new features and organizer tips
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Optional - you can unsubscribe anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {step < steps.length ? (
                  <Button onClick={nextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need help? Contact us at <a href="mailto:organizers@eventqul.com" className="text-primary hover:underline">organizers@eventqul.com</a></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
