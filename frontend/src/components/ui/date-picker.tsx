import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import type { Instance } from "flatpickr/dist/types/instance";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CalendarDays } from "lucide-react";

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: (dates: Date | Date[] | null) => void;
  value?: Date | Date[] | null;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disableFuture?: boolean;
  isRequired?: boolean;
  isInLine?: boolean;
  clearable?: boolean;
};

const DATE_FORMAT = "d-m-Y";

// Normalize date to noon (12:00) to prevent timezone shifts
const normalizeDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const normalized = new Date(date);
  normalized.setHours(12, 0, 0, 0);
  return normalized;
};

// Parse input string to Date
const parseInputDate = (
  input: string,
  instance: Instance | null,
): Date | null => {
  if (!input || !instance) return null;
  const parsed = instance.parseDate(input, DATE_FORMAT);
  return parsed && !isNaN(parsed.getTime()) ? parsed : null;
};

export default function DatePicker({
  id,
  mode = "single",
  onChange,
  value,
  label,
  placeholder,
  error = false,
  disableFuture = true,
  isRequired = false,
  isInLine = false,
  clearable = false,
}: PropsType) {
  const flatpickrRef = useRef<Instance | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Unified date handler - works for both picker selection and manual typing
  const handleDateChange = (date: Date | null) => {
    console.log('handleDateChange called with:', date);
    if (!onChange) return;

    const normalized = normalizeDate(date);
    console.log('normalized date:', normalized);

    if (mode === "single") {
      onChange(normalized);
    } else {
      // For multiple/range modes
      onChange(normalized ? [normalized] : null);
    }
  };

  // Initialize flatpickr
  useEffect(() => {
    const element = document.getElementById(id) as HTMLInputElement;
    if (!element) return;

    flatpickrRef.current = flatpickr(element, {
      mode,
      static: true,
      position: "above",
      dateFormat: DATE_FORMAT,
      allowInput: true,
      monthSelectorType: "dropdown",
      defaultDate: value || undefined,
      maxDate: disableFuture
        ? (() => {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            return today;
          })()
        : undefined,
      appendTo: document.body,
      onOpen: (selectedDates, dateStr, instance) => {
        // Set high z-index when calendar opens to appear above modal
        const calendarContainer = instance?.calendarContainer;
        if (calendarContainer) {
          calendarContainer.style.zIndex = "99999";
        }
      },
      onChange: (selectedDates, dateStr) => {
        // This fires when user selects from calendar or inputs valid date
        console.log('flatpickr onChange:', selectedDates, dateStr);
        if (selectedDates.length > 0) {
          handleDateChange(selectedDates[0]);
        } else {
          handleDateChange(null);
        }
      },
    });

    setIsInitialized(true);

    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
        flatpickrRef.current = null;
      }
      setIsInitialized(false);
    };
  }, [id, mode, disableFuture]);

  // Sync external value changes to flatpickr (only when value actually changes from outside)
  useEffect(() => {
    if (!flatpickrRef.current || !isInitialized) return;

    const currentSelected = flatpickrRef.current.selectedDates[0];

    // Only sync if the external value is different from current selection
    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      if (currentSelected) {
        flatpickrRef.current.clear();
      }
    } else if (value instanceof Date) {
      const valueTime = value.getTime();
      const currentTime = currentSelected?.getTime();

      if (valueTime !== currentTime) {
        flatpickrRef.current.setDate(value, false);
      }
    }
  }, [value, isInitialized]);

  const getInputClasses = () => {
    let inputClasses =
      "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

    return inputClasses;
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed mb-1"
        >
          {label} {isRequired && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={id}
          placeholder={placeholder}
          className={getInputClasses()}
          autoComplete="off"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400 cursor-pointer">
          <CalendarDays className="size-5" />
        </span>

      </div>
    </div>
  );
}
