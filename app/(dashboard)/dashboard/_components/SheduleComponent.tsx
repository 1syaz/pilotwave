"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

function SheduleComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col gap-2 w-full ">
      <h4 className="text-foreground/80 font-medium text-sm">Schedule</h4>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-foreground/70 border border-foreground/40 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-foreground/70 ">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-white border-foreground/20 shadow-sm rounded-lg"
          />
        </PopoverContent>
      </Popover>
      <p className="text-xs text-foreground/60">Leave empty to post now</p>
    </div>
  );
}

export default SheduleComponent;
