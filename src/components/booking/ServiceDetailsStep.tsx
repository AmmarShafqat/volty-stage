
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Thermometer, Home } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";
import { cn } from "@/lib/utils";

interface ServiceDetailsStepProps {
  form: UseFormReturn<BookingFormValues>;
  selectedServiceType: "electrical" | "hvac" | null;
  equipmentTypeOptions: string[];
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  form,
  selectedServiceType,
  equipmentTypeOptions,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Service Details</h2>
      
      <FormField
        control={form.control}
        name="serviceType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What type of service do you need?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`flex items-center space-x-2 p-4 border rounded-md cursor-pointer ${
                    field.value === "electrical" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                  }`}
                  onClick={() => field.onChange("electrical")}>
                    <RadioGroupItem value="electrical" id="electrical" />
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-voltly-green" />
                      <label htmlFor="electrical" className="font-medium cursor-pointer">
                        Electrical
                      </label>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 p-4 border rounded-md cursor-pointer ${
                    field.value === "hvac" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                  }`}
                  onClick={() => field.onChange("hvac")}>
                    <RadioGroupItem value="hvac" id="hvac" />
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 mr-2 text-voltly-green" />
                      <label htmlFor="hvac" className="font-medium cursor-pointer">
                        HVAC
                      </label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="homeType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What type of home do you have?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                  field.value === "house" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                }`}
                onClick={() => field.onChange("house")}>
                  <Home className="h-6 w-6 mb-1" />
                  <RadioGroupItem value="house" id="house" className="sr-only" />
                  <label htmlFor="house" className="text-sm font-medium cursor-pointer">House</label>
                </div>
                <div className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                  field.value === "townhouse" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                }`}
                onClick={() => field.onChange("townhouse")}>
                  <Home className="h-6 w-6 mb-1" />
                  <RadioGroupItem value="townhouse" id="townhouse" className="sr-only" />
                  <label htmlFor="townhouse" className="text-sm font-medium cursor-pointer">Townhouse</label>
                </div>
                <div className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                  field.value === "apartment" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                }`}
                onClick={() => field.onChange("apartment")}>
                  <Home className="h-6 w-6 mb-1" />
                  <RadioGroupItem value="apartment" id="apartment" className="sr-only" />
                  <label htmlFor="apartment" className="text-sm font-medium cursor-pointer">Apartment</label>
                </div>
                <div className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                  field.value === "condo" ? "border-voltly-green bg-voltly-green/10" : "border-gray-300"
                }`}
                onClick={() => field.onChange("condo")}>
                  <Home className="h-6 w-6 mb-1" />
                  <RadioGroupItem value="condo" id="condo" className="sr-only" />
                  <label htmlFor="condo" className="text-sm font-medium cursor-pointer">Condo</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedServiceType && (
        <FormField
          control={form.control}
          name="equipmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What equipment needs repair?</FormLabel>
              <FormControl>
                <select
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
                    "text-sm ring-offset-background file:border-0 file:bg-transparent",
                    "file:text-sm file:font-medium placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  {...field}
                >
                  <option value="">Select equipment type</option>
                  {equipmentTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="issueDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Briefly describe the issue</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please describe the problem you're experiencing"
                className="min-h-[80px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServiceDetailsStep;
