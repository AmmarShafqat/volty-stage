
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";
import TimeSlotSelector from "./TimeSlotSelector";
import ServiceOption from "./ServiceOption";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface ScheduleStepProps {
  form: UseFormReturn<BookingFormValues>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  availableTimeSlots: string[];
  isLoading: boolean;
  isPriorityTimeframe: boolean;
  showTermsDialog: boolean;
  setShowTermsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  distanceKm: number | null;
  travelFee: number;
  isLookingUpAddress: boolean;
  calculateTotalCost: () => number;
  selectedServiceOption: "standard" | "priority" | "protection" | null;
  toast: any; // Using any for brevity, ideally should match the toast function type
  FREE_TRAVEL_DISTANCE_KM: number;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  form,
  selectedDate,
  setSelectedDate,
  availableTimeSlots,
  isLoading,
  isPriorityTimeframe,
  showTermsDialog,
  setShowTermsDialog,
  distanceKm,
  travelFee,
  isLookingUpAddress,
  calculateTotalCost,
  selectedServiceOption,
  toast,
  FREE_TRAVEL_DISTANCE_KM,
}) => {
  const watchServiceOption = form.watch("serviceOption");
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Appointment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setSelectedDate(date);
                    }}
                    disabled={(date) => {
                      // Disable past dates and Sundays (weekend days when service might not be available)
                      const day = date.getDay();
                      const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
                      return isPastDate || day === 0;
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <FormControl>
                <TimeSlotSelector
                  value={field.value}
                  onChange={field.onChange}
                  availableTimeSlots={availableTimeSlots}
                  isLoading={isLoading}
                  isDateSelected={!!selectedDate}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              Postal Code 
              <MapPin className="h-4 w-4 ml-1 text-voltly-green" />
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="Enter your postal code (e.g., M1M 1M1)" 
                  {...field} 
                />
                {isLookingUpAddress && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-voltly-green rounded-full border-t-transparent"></div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
            {distanceKm !== null && (
              <p className="text-xs text-gray-500 mt-1">
                {distanceKm <= FREE_TRAVEL_DISTANCE_KM ? (
                  `Distance: ${distanceKm}km (within free travel zone)`
                ) : (
                  `Distance: ${distanceKm}km (${distanceKm - FREE_TRAVEL_DISTANCE_KM}km beyond free travel zone)`
                )}
              </p>
            )}
            {travelFee > 0 && (
              <p className="text-xs text-voltly-green mt-1">
                Travel fee: ${travelFee} (${1}/km beyond {FREE_TRAVEL_DISTANCE_KM}km)
              </p>
            )}
          </FormItem>
        )}
      />

      {/* Payment Options */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-2">Payment Options</h3>
        {isPriorityTimeframe && (
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md mb-4">
            <p className="text-sm flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-amber-500" />
              <span>
                <strong>Priority Service Required:</strong> Appointments within 6 hours require priority service.
              </span>
            </p>
          </div>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Select your preferred service option below.
        </p>
        
        <FormField
          control={form.control}
          name="serviceOption"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormControl>
                <ServiceOption
                  selectedOption={field.value}
                  onChange={(value) => {
                    // If it's priority timeframe, only allow "priority" or "protection"
                    if (isPriorityTimeframe && value === "standard") {
                      toast({
                        title: "Priority Service Required",
                        description: "Appointments within 6 hours require priority service.",
                        variant: "destructive",
                      });
                      // If trying to select standard in a priority timeframe, force priority
                      field.onChange("priority");
                    } else {
                      field.onChange(value);
                    }
                  }}
                  disableStandard={isPriorityTimeframe}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Terms and Conditions for Protection Plan */}
        {watchServiceOption === "protection" && (
          <div className="mt-4">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the 
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-voltly-green font-normal ml-1"
                        onClick={(e) => { 
                          e.preventDefault();
                          setShowTermsDialog(true);
                        }}
                      >
                        terms and conditions
                      </Button>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            {/* Terms and Conditions Dialog */}
            <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Protection Plan Terms & Conditions</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto text-sm">
                  <p>By enrolling in our Protection Plan, you agree to the following terms:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Monthly subscription of $24 per product</li>
                    <li>Minimum 12-month commitment</li>
                    <li>Covers regular maintenance and priority service</li>
                    <li>Excludes damage due to misuse or natural disasters</li>
                    <li>24/7 customer support</li>
                    <li>Parts at discounted rates</li>
                    <li>Cancellation requires 30-day notice after minimum term</li>
                  </ul>
                  <p className="mt-4">
                    For service calls outside the Greater Toronto Area, a travel fee of $1/km will be applied.
                  </p>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={() => setShowTermsDialog(false)}
                    className="bg-voltly-green hover:bg-voltly-green/90 text-black"
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        
        {/* Service Cost Summary */}
        <Card className="mt-6">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>Base service cost:</span>
              <span className="font-medium">
                {selectedServiceOption && `$${form.getValues().serviceOption ? form.getValues().serviceOption === "standard" ? 149 : form.getValues().serviceOption === "priority" ? 325 : 24 : 0}`}
                {!selectedServiceOption && "Select an option"}
              </span>
            </div>
            {travelFee > 0 && (
              <div className="flex justify-between">
                <span>Travel fee:</span>
                <span className="font-medium">${travelFee}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${calculateTotalCost()}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Travel Fee Notice */}
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
          <p className="flex items-center">
            <span className="text-voltly-green mr-2">Note:</span>
            For service calls outside of Greater Toronto Area (80km from our service center), 
            a travel fee of $1/km will be applied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;
