'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  maxHeight?: string;
  showSeparator?: boolean;
  closeOnOutsideClick?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full',
};

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  footer,
  className,
  contentClassName,
  maxWidth = '2xl',
  maxHeight = '90vh',
  showSeparator = true,
  closeOnOutsideClick = false,
}: ModalProps) {
  const contentMaxWidth = maxWidthClasses[maxWidth];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
        className={cn(
          'p-0',
          contentMaxWidth,
          contentClassName
        )}
      >
        <DialogHeader >
          <DialogTitle className='px-6 py-4 pb-3'>{title}</DialogTitle>
          {showSeparator && <Separator className="mt-4" />}
        </DialogHeader>

        <ScrollArea className={maxHeight ? `max-h-[calc(${maxHeight}-140px)]` : undefined}>
          <div className={cn('px-6', className)}>{children}</div>
        </ScrollArea>

        {footer && (
          <>
           
            <DialogFooter className={cn('px-6 py-3 gap-2', showSeparator && 'border-t')}>
              {footer}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
