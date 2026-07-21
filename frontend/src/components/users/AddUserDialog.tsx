"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userFormSchema,
  type UserFormData,
} from "@/lib/validations/user.schema";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormSelect,
  FormDatePicker,
} from "@/components/form/FormComponents";
import { Modal } from "@/components/ui/modal";
import { Loader2 } from "lucide-react";
import {
  bloodGroupOptions,
  genderOptions,
  roleOptions,
  tshirtSizeOptions,
} from "@/types/common";
import { toast } from "sonner";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => Promise<any>;
  isLoading?: boolean;
}

export function AddUserDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddUserDialogProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
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

  const handleSubmit = async (data: UserFormData) => {
    try {
      const res = await onSubmit(data);
      console.log("res", res);
      toast.success(res?.message || "User created successfully");
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      // Error is already handled by parent with toast
      console.error("Failed to create user:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Add New User"
      maxWidth="4xl"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" form="add-user-form" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create User"
            )}
          </Button>
        </>
      }
    >
      <Form {...form}>
        
        <form
          id="add-user-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-x-8 gap-4 md:grid-cols-2">
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Min 8 chars"
                required
              />
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
                name="nickName"
                label="Nickname"
                placeholder="Johnny"
              />
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="+880 1234-567890"
              />
              <FormInput name="district" label="District" placeholder="Dhaka" />

              <FormDatePicker
                name="dob"
                label="Date of Birth"
                placeholder="Select date"
                disableFuture
                id="dob"
              />

              <FormSelect
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
              />
              <FormSelect
                name="role"
                label="Role"
                placeholder="Select role"
                options={roleOptions}
              />
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
