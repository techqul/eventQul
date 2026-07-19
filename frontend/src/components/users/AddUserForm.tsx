'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormData } from '@/lib/validations/user.schema';
import { UserRole, BloodGroup, Gender, TShirtSize } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { InputField, SelectField, DateField } from '@/components/form/FormField';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AddUserFormProps {
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading?: boolean;
  cancelUrl?: string;
}

/**
 * Add User Form Component
 * Uses react-hook-form with zod validation
 * Reusable pattern that can be applied to other forms
 */
export function AddUserForm({ onSubmit, isLoading = false, cancelUrl = '/admin/users' }: AddUserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      nickName: '',
      phoneNumber: '',
      instituteName: '',
      district: '',
      dob: '',
      bloodGroup: undefined,
      gender: undefined,
      tshirtSize: undefined,
      role: UserRole.USER,
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  const handleSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      toast.success('User created successfully');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  // Select options
  const roleOptions = [
    { value: UserRole.USER, label: 'User' },
    { value: UserRole.ORGANIZER, label: 'Organizer' },
    { value: UserRole.ADMIN, label: 'Admin' },
  ];

  const bloodGroupOptions = [
    { value: BloodGroup.A_POSITIVE, label: 'A+' },
    { value: BloodGroup.A_NEGATIVE, label: 'A-' },
    { value: BloodGroup.B_POSITIVE, label: 'B+' },
    { value: BloodGroup.B_NEGATIVE, label: 'B-' },
    { value: BloodGroup.AB_POSITIVE, label: 'AB+' },
    { value: BloodGroup.AB_NEGATIVE, label: 'AB-' },
    { value: BloodGroup.O_POSITIVE, label: 'O+' },
    { value: BloodGroup.O_NEGATIVE, label: 'O-' },
  ];

  const genderOptions = [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' },
    { value: Gender.OTHER, label: 'Other' },
  ];

  const tshirtSizeOptions = [
    { value: TShirtSize.XS, label: 'XS' },
    { value: TShirtSize.S, label: 'S' },
    { value: TShirtSize.M, label: 'M' },
    { value: TShirtSize.L, label: 'L' },
    { value: TShirtSize.XL, label: 'XL' },
    { value: TShirtSize.XXL, label: 'XXL' },
    { value: TShirtSize.XXXL, label: 'XXXL' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create a new user account with required information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <Separator />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />

                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Min 8 chars, uppercase, lowercase, number & special char"
                    required
                  />

                  <InputField
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    required
                  />

                  <InputField
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />

                  <InputField
                    name="nickName"
                    label="Nickname"
                    placeholder="Johnny"
                  />

                  <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    placeholder="+880 1234-567890"
                  />
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <Separator />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    name="instituteName"
                    label="Institute Name"
                    placeholder="University of Dhaka"
                  />

                  <InputField
                    name="district"
                    label="District"
                    placeholder="Dhaka"
                  />

                  <DateField
                    name="dob"
                    label="Date of Birth"
                    placeholder="Select date"
                    disableFuture
                  />

                  <SelectField
                    name="bloodGroup"
                    label="Blood Group"
                    placeholder="Select blood group"
                    options={bloodGroupOptions}
                  />

                  <SelectField
                    name="gender"
                    label="Gender"
                    placeholder="Select gender"
                    options={genderOptions}
                  />

                  <SelectField
                    name="tshirtSize"
                    label="T-Shirt Size"
                    placeholder="Select size"
                    options={tshirtSizeOptions}
                  />

                  <SelectField
                    name="role"
                    label="Role"
                    placeholder="Select role"
                    options={roleOptions}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = cancelUrl}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
