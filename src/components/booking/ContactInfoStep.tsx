
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";

interface ContactInfoStepProps {
  form: UseFormReturn<BookingFormValues>;
  isLookingUpAddress: boolean;
  distanceKm: number | null;
  FREE_TRAVEL_DISTANCE_KM: number;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  form,
  isLookingUpAddress,
  distanceKm,
  FREE_TRAVEL_DISTANCE_KM,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="123 Main St, City, State" 
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
            </FormItem>
          )}
        />

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
                <Input placeholder="A1A 1A1" {...field} />
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
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContactInfoStep;
