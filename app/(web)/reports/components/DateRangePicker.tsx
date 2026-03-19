"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  /** Controlled value — pass undefined to use internal state */
  value?: DateRange | undefined;
  /** Called whenever the selected range changes */
  onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  // Support both controlled (value+onChange) and uncontrolled usage
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >();

  const isControlled = value !== undefined || onChange !== undefined;
  const range = isControlled ? value : internalRange;

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!isControlled) setInternalRange(newRange);
    onChange?.(newRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit h-[42px] justify-start text-left bg-secondary text-primary border border-white/50 p-3 text-sm">
          <CalendarIcon className="w-5 h-5 mr-2 shrink-0" />
          {range?.from && range?.to ? (
            <>
              {format(range.from, "dd/MM/yyyy")}
              <span className="mx-2">-</span>
              {format(range.to, "dd/MM/yyyy")}
            </>
          ) : (
            <span className="text-primary">Select date range</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          autoFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
