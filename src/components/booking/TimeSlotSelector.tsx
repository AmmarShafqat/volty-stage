
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlotSelectorProps {
  value: string;
  onChange: (value: string) => void;
  availableTimeSlots: string[];
  isLoading: boolean;
  isDateSelected: boolean;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  value,
  onChange,
  availableTimeSlots,
  isLoading,
  isDateSelected,
}) => {
  if (!isDateSelected) {
    return (
      <div className="flex items-center justify-center h-10 px-3 py-2 border border-input rounded-md bg-background text-muted-foreground">
        Please select a date first
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-10 px-3 py-2 border border-input rounded-md bg-background">
        Loading available slots...
      </div>
    );
  }

  if (availableTimeSlots.length === 0) {
    return (
      <div className="flex items-center justify-center h-10 px-3 py-2 border border-input rounded-md bg-background text-destructive">
        No available slots for selected date
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-1">
      {availableTimeSlots.map((timeSlot) => (
        <button
          key={timeSlot}
          type="button"
          onClick={() => onChange(timeSlot)}
          className={cn(
            "flex items-center justify-center gap-1 px-3 py-2 border rounded-md text-sm transition-colors",
            value === timeSlot
              ? "bg-voltly-green text-black border-voltly-green"
              : "bg-background hover:bg-muted"
          )}
        >
          <Clock className="h-3 w-3" />
          {timeSlot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
