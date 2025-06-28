
import { useState, useEffect } from "react";
import { format } from "date-fns";

// In a real application, this would fetch from your backend API
const mockTimeSlots: Record<string, string[]> = {
  // Today has fewer slots (some already booked)
  [format(new Date(), "yyyy-MM-dd")]: ["9:00 AM", "11:00 AM", "2:00 PM"],
  
  // Tomorrow has more availability
  [format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd")]: [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ],
  
  // Day after tomorrow is quite busy
  [format(new Date(new Date().setDate(new Date().getDate() + 2)), "yyyy-MM-dd")]: [
    "9:00 AM", "4:00 PM"
  ],
};

// Default time slots for dates not specifically defined
const defaultTimeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Weekend time slots (fewer hours)
const weekendTimeSlots = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];

export function useAvailableTimeSlots(selectedDate: Date | undefined) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }

    const fetchAvailableTimeSlots = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const dateKey = format(selectedDate, "yyyy-MM-dd");
        const isWeekend = selectedDate.getDay() === 6; // Saturday
        
        // Use mock data if available, otherwise use default slots based on weekday/weekend
        let slots;
        if (dateKey in mockTimeSlots) {
          slots = mockTimeSlots[dateKey];
        } else if (isWeekend) {
          slots = weekendTimeSlots;
        } else {
          slots = defaultTimeSlots;
        }
        
        setAvailableTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching available time slots:", error);
        setAvailableTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableTimeSlots();
  }, [selectedDate]);

  return { availableTimeSlots, isLoading };
}
