'use client';

import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

/**
 * Reusable FormField Component
 * Wraps shadcn FormField with form context from react-hook-form
 */

interface BaseFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

// Input Field
export const InputField = forwardRef<
  HTMLInputElement,
  BaseFieldProps & {
    type?: string;
    placeholder?: string;
    disabled?: boolean;
  }
>(({ name, label, description, required, className, type = 'text', placeholder, disabled }, ref) => {
  return (
    <FormFieldComponent
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              ref={ref}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
InputField.displayName = 'InputField';

// Textarea Field
export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  BaseFieldProps & {
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
  }
>(({ name, label, description, required, className, placeholder, disabled, rows = 3 }, ref) => {
  return (
    <FormFieldComponent
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              ref={ref}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
TextareaField.displayName = 'TextareaField';

// Select Field
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export const SelectField = ({ name, label, description, required, className, placeholder, disabled, options }: SelectFieldProps) => {
  return (
    <FormFieldComponent
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Checkbox Field
interface CheckboxFieldProps extends BaseFieldProps {
  disabled?: boolean;
  description?: string;
}

export const CheckboxField = ({ name, label, description, disabled, className }: CheckboxFieldProps) => {
  return (
    <FormFieldComponent
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-row items-start space-x-3 space-y-0', className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

// Date Field
interface DateFieldProps extends BaseFieldProps {
  placeholder?: string;
  disabled?: boolean;
  disableFuture?: boolean;
}

export const DateField = ({ name, label, description, required, className, placeholder, disabled, disableFuture = false }: DateFieldProps) => {
  return (
    <FormFieldComponent
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div
                  className={cn(
                    'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>{placeholder || 'Pick a date'}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={disableFuture ? (date) => date > new Date() : disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
