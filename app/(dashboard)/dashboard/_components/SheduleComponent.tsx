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
import { ControllerRenderProps } from "react-hook-form";

import { FormSchema } from "./EditOrCreatePostDialog";
import { z } from "zod";

type FormSchema = z.infer<typeof FormSchema>;

interface ISheduleComponentProps {
  field: ControllerRenderProps<FormSchema, "schedule">;
  isLoading: boolean;
}

function SheduleComponent({ field, isLoading }: ISheduleComponentProps) {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-foreground/70 border border-foreground/40 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span className="text-foreground/70 ">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={isLoading}
            mode="single"
            selected={field.value}
            hidden={{ before: new Date() }}
            onSelect={(date) => field.onChange(date)}
            className="bg-white border-foreground/20 shadow-sm rounded-lg"
          />
        </PopoverContent>
      </Popover>
      {/* <p className="text-xs text-foreground/60">Leave empty to post now</p> */}
    </div>
  );
}

export default SheduleComponent;
