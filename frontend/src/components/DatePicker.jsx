"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  className,
}) {
  const [date, setDate] = React.useState(new Date())

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[140px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
      
      </Popover>
    </div>
  )
}
