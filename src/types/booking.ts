
import { z } from "zod";

export const formSchema = z.object({
  // Service details
  serviceType: z.enum(["electrical", "hvac"], {
    required_error: "Please select a service type",
  }),
  homeType: z.enum(["house", "condo", "townhouse", "apartment"], {
    required_error: "Please select your home type",
  }),
  equipmentType: z.string().min(1, "Please select equipment type"),
  issueDescription: z.string().min(10, "Please provide at least 10 characters describing the issue"),
  
  // Schedule
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  serviceOption: z.enum(["standard", "priority", "protection"], {
    required_error: "Please select a service option",
  }),
  
  // Contact information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  postalCode: z.string().min(6, "Please enter a valid postal code"),
  
  // Terms
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }).optional(),
});

export type BookingFormValues = z.infer<typeof formSchema>;

export interface AddressCache {
  [postalCode: string]: {
    address: string;
    city: string;
    province: string;
  };
}
