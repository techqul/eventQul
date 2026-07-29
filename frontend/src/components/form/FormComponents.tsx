"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import DatePicker from "../ui/date-picker";

// ============================================================================
// FormInput Component
// ============================================================================

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  disabled?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  description,
  className = "space-y-2",
}: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="mb-1">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

// ============================================================================
// FormSelect Component
// ============================================================================

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
}

export const FormSelect = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
  required = false,
  description,
  className = "",
}: FormSelectProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="mb-1">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Select
            onValueChange={field.onChange}
            value={field.value as string}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

// ============================================================================
// FormDatePicker Component
// ============================================================================

interface FormDatePickerProps {
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
}

export const FormDatePicker = ({
  name,
  id,
  label,
  disabled = false,
  disableFuture = false,
  required = false,
  description,
  placeholder,
  className = "",
}: FormDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value ? new Date(field.value as string) : null;

        const handleChange = (dates: Date | Date[] | null) => {
          console.log('FormDatePicker handleChange called with:', dates);
          const date = Array.isArray(dates) ? dates[0] : dates;
          console.log('Extracted date:', date);
          if (date) {
            const isoString = date.toISOString();
            console.log('Calling field.onChange with:', isoString);
            field.onChange(isoString);
          } else {
            console.log('Calling field.onChange with empty string');
            field.onChange("");
          }
        };

        return (
          <FormItem className={cn(className, "w-full")}>
            {label && (
              <FormLabel className="mb-1">
                {label} {required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}
            <FormControl className="w-full">
              <DatePicker
                disableFuture={disableFuture}
                id={id}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
              />
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

// ============================================================================
// FormTextarea Component
// ============================================================================

interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  required?: boolean;
  description?: string;
  className?: string;
}

export const FormTextarea = ({
  name,
  label,
  placeholder,
  disabled = false,
  rows = 3,
  required = false,
  description,
  className = "",
}: FormTextareaProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="mb-1">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <textarea
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

// ============================================================================
// FormCheckbox Component
// ============================================================================

interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const FormCheckbox = ({
  name,
  label,
  description,
  disabled = false,
  className = "",
}: FormCheckboxProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0",
            className,
          )}
        >
          <FormControl>
            <input
              type="checkbox"
              checked={field.value as boolean}
              onChange={field.onChange}
              disabled={disabled}
              className="h-4 w-4 rounded border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
