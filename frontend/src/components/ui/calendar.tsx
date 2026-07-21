"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn(
        "w-fit p-3 bg-background",
        "rdp-button_reset rdp-button_next:hover:bg-accent rdp-button_prev:hover:bg-accent",
        "[&_.rdp-head_cell]:text-muted-foreground [&_.rdp-head_cell]:w-9 [&_.rdp-head_cell]:font-normal [&_.rdp-head_cell]:text-[0.8rem]",
        "[&_.rdp-day]:h-9 [&_.rdp-day]:w-9 [&_.rdp-day]:rounded-lg [&_.rdp-day]:text-sm",
        "[&_.rdp-day:hover]:bg-accent [&_.rdp-day:hover]:text-accent-foreground",
        "[&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected]:text-primary-foreground",
        "[&_.rdp-day_today]:bg-accent [&_.rdp-day_today]:text-accent-foreground",
        "[&_.rdp-day_outside]:text-muted-foreground [&_.rdp-day_outside]:opacity-50",
        "[&_.rdp-day_disabled]:text-muted-foreground [&_.rdp-day_disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
