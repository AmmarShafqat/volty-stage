
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAvailableTimeSlots } from "@/hooks/use-available-time-slots";

interface InstallationSchedulingProps {
  onScheduleChange: (data: {
    postalCode: string;
    address: string | null;
    date: Date | null;
    timeSlot: string | null;
    isPriority: boolean;
    distanceKm: number | null;
  }) => void;
}

const InstallationScheduling: React.FC<InstallationSchedulingProps> = ({ onScheduleChange }) => {
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isPriority, setIsPriority] = useState(false);
  const [distanceKm] = useState<number | null>(25); // Simulated distance
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);

  const { availableTimeSlots, isLoading } = useAvailableTimeSlots(selectedDate);

  // Auto-populate address based on postal code (simplified)
  useEffect(() => {
    if (postalCode && postalCode.length >= 6) {
      setIsLookingUpAddress(true);
      // Simulate address lookup
      setTimeout(() => {
        setAddress(`123 Main Street, Toronto, ON ${postalCode}`);
        setIsLookingUpAddress(false);
      }, 1000);
    }
  }, [postalCode]);

  // Update parent component when data changes
  useEffect(() => {
    onScheduleChange({
      postalCode,
      address: address || null,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      isPriority,
      distanceKm,
    });
  }, [postalCode, address, selectedDate, selectedTimeSlot, isPriority, distanceKm, onScheduleChange]);

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    
    // Check if within 6 hours for priority service
    if (selectedDate) {
      const now = new Date();
      const appointmentTime = new Date(selectedDate);
      const [time] = timeSlot.split(' - ');
      const [hours, minutes] = time.split(':');
      appointmentTime.setHours(parseInt(hours), parseInt(minutes));
      
      const timeDiff = appointmentTime.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      setIsPriority(hoursDiff <= 6);
    }
  };

  return (
    <div className="space-y-6">
      {/* Installation Address Section */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-voltly-green" />
            Installation Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
              Postal Code *
            </Label>
            <Input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
              placeholder="M5V 3A8"
              className="w-full"
              maxLength={7}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Street Address *
            </Label>
            <div className="relative">
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street, Toronto, ON"
                className="w-full pr-10"
                required
              />
              {isLookingUpAddress && (
                <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            {postalCode && address && (
              <p className="text-xs text-green-600">
                ✓ Address verified - Installation distance: ~{distanceKm}km
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Installation Date & Time Section */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-voltly-green" />
            Installation Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Select Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => setSelectedDate(date || null)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedDate && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Available Time Slots *
              </Label>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm text-gray-500">Loading available times...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      className={cn(
                        "text-sm py-2",
                        selectedTimeSlot === slot && "bg-voltly-green hover:bg-voltly-green/90 text-black"
                      )}
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isPriority && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  Priority Service
                </Badge>
              </div>
              <p className="text-sm text-amber-700 mt-1">
                This appointment is within 6 hours and requires priority service (+$50).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationScheduling;
