"use client";

import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import("react-quill-new").then((mod: any) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse bg-muted rounded-md" />
    ),
  },
) as any;

import "react-quill-new/dist/quill.snow.css";

// ============================================================================
// FormRichTextEditor Component
// ============================================================================

interface FormRichTextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
  modules?: any;
  formats?: string[];
}

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "color",
  "background",
];

export const FormRichTextEditor = ({
  name,
  label,
  placeholder = "Write something amazing...",
  disabled = false,
  required = false,
  description,
  className = "",
  modules = defaultModules,
  formats = defaultFormats,
}: FormRichTextEditorProps) => {
  const { control } = useFormContext();

  // Custom handler to ensure proper value updates
  const handleChange = useCallback(
    (value: string, onChange: (value: string) => void) => {
      onChange(value === "<p><br></p>" ? "" : value);
    },
    [],
  );

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
          <FormControl className="mt-1">
            <div
              className={cn(
                "rounded-md border border-input ring-offset-background focus-within:ring-1 focus-within:ring-ring",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <ReactQuill
                theme="snow"
                value={field.value || ""}
                onChange={(value:any) => handleChange(value, field.onChange)}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
                readOnly={disabled}
                className="bg-background"
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

// ============================================================================
// FormRichTextEditorMini Component (Compact toolbar with essential formatting)
// ============================================================================

const miniModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const miniFormats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "color",
  "background",
];

interface FormRichTextEditorMiniProps
  extends Omit<FormRichTextEditorProps, "modules" | "formats"> {}

export const FormRichTextEditorMini = ({
  ...props
}: FormRichTextEditorMiniProps) => {
  return (
    <FormRichTextEditor
      {...props}
      modules={miniModules}
      formats={miniFormats}
    />
  );
};
