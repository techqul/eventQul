"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  organizerCreateSchema,
  type OrganizerCreateFormData,
} from "@/lib/validations/organizer.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormRichTextEditorMini } from "@/components/form/FormComponents";
import { Modal } from "@/components/ui/modal";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddOrganizerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrganizerCreateFormData) => Promise<any>;
  isLoading?: boolean;
}

export function AddOrganizerDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddOrganizerDialogProps) {
  const form = useForm<OrganizerCreateFormData>({
    resolver: zodResolver(organizerCreateSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
      banner: "",
      description: "",
      socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        website: "",
      },
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: OrganizerCreateFormData) => {
    try {
      const res = await onSubmit(data);
      toast.success(res?.message || "Organizer created successfully");
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to create organizer:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    // Only auto-generate slug if slug is empty or matches the previous name
    const currentSlug = form.getValues("slug");
    if (!currentSlug || currentSlug === generateSlug(form.getValues("name") || "")) {
      form.setValue("slug", generateSlug(name));
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Add New Organizer"
      maxWidth="2xl"
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
          <Button type="submit" form="add-organizer-form" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Organizer"
            )}
          </Button>
        </>
      }
    >
      <Form {...form}>
        <form
          id="add-organizer-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-x-8 gap-4 md:grid-cols-2">
              <FormInput
                name="name"
                label="Organizer Name"
                placeholder="Event Organizer Inc."
                required
              />

              <FormInput
                name="slug"
                label="Slug"
                placeholder="event-organizer-inc"
                required
              />

              <FormInput
                name="logo"
                label="Logo URL"
                placeholder="https://example.com/logo.png"
                required
              />

              <FormInput
                name="banner"
                label="Banner URL (Optional)"
                placeholder="https://example.com/banner.png"
              />
            </div>

            <FormRichTextEditorMini
              name="description"
              label="Description"
              placeholder="Tell us about this organizer..."
              required
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Social Links (Optional)</h3>
            <div className="grid grid-cols-1 gap-x-8 gap-4 md:grid-cols-2">
              <FormInput
                name="socialLinks.facebook"
                label="Facebook"
                placeholder="https://facebook.com/organizer"
              />

              <FormInput
                name="socialLinks.instagram"
                label="Instagram"
                placeholder="https://instagram.com/organizer"
              />

              <FormInput
                name="socialLinks.twitter"
                label="Twitter/X"
                placeholder="https://twitter.com/organizer"
              />

              <FormInput
                name="socialLinks.website"
                label="Website"
                placeholder="https://organizer.com"
              />
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
