
import { format, addHours, isPast, isSameDay } from "date-fns";
import { Product } from "@/components/product/ProductCard";
import { BookingFormValues } from "@/types/booking";
import { sendServiceConfirmationViaWebhook } from "@/utils/emailService";

// Constants
export const SERVICE_CENTER_LOCATION = "80 Dynamic Drive, Scarborough, ON";
export const FREE_TRAVEL_DISTANCE_KM = 80;

// Service costs
export const SERVICE_COSTS = {
  standard: 149,
  priority: 325,
  protection: 24 // monthly
};

// Equipment types
export const electricalEquipmentTypes = [
  "Electrical Panel",
  "Circuit Breaker",
  "Outlet/Switch",
  "Lighting System",
  "EV Charger",
  "Generator",
  "Wiring Issue",
  "Other Electrical Issue"
];

export const hvacEquipmentTypes = [
  "Furnace",
  "Air Conditioner",
  "Heat Pump",
  "Tankless Water Heater",
  "Thermostat",
  "Ductwork",
  "Smart Home System",
  "Other HVAC Issue"
];

// Helper function to determine if a time slot is within priority timeframe
export const isPriorityTimeframe = (date: Date | undefined, timeSlot: string | undefined): boolean => {
  if (!date || !timeSlot) return false;
  
  const now = new Date();
  const [hours, minutesPeriod] = timeSlot.split(":");
  let hour = parseInt(hours, 10);
  const minutes = parseInt(minutesPeriod.split(" ")[0], 10);
  const period = timeSlot.includes("PM") ? "PM" : "AM";
  
  // Adjust hour for PM times
  if (period === "PM" && hour !== 12) {
    hour += 12;
  }
  // Adjust for 12 AM
  if (period === "AM" && hour === 12) {
    hour = 0;
  }
  
  // Create appointment date
  const appointmentDate = new Date(date);
  appointmentDate.setHours(hour, minutes, 0, 0);
  
  // Calculate the time difference in hours
  const sixHoursLater = addHours(now, 6);
  
  // If appointment is within 6 hours, set priority
  return appointmentDate <= sixHoursLater && !isPast(appointmentDate);
};

// Calculate travel fee based on distance
export const calculateTravelFee = (distanceKm: number | null): number => {
  if (distanceKm === null || distanceKm <= FREE_TRAVEL_DISTANCE_KM) {
    return 0;
  }
  return (distanceKm - FREE_TRAVEL_DISTANCE_KM) * 1; // $1/km beyond free travel distance
};

// Calculate total cost
export const calculateTotalCost = (serviceOption: "standard" | "priority" | "protection" | null, travelFee: number): number => {
  if (!serviceOption) return 0;
  const baseCost = SERVICE_COSTS[serviceOption];
  return baseCost + travelFee;
};

// Create service product for cart
export const createServiceProduct = (
  data: BookingFormValues, 
  appointmentDateTime: string, 
  serviceOption: "standard" | "priority" | "protection"
): Product => {
  return {
    id: Date.now(),
    name: `${data.serviceType.toUpperCase()} Service - ${serviceOption.charAt(0).toUpperCase()}${serviceOption.slice(1)}`,
    price: SERVICE_COSTS[serviceOption],
    image: data.serviceType === "electrical" 
      ? "/lovable-uploads/f385d44a-5401-4c14-9248-cc1d4231a25e.png" 
      : "/lovable-uploads/53954ef4-9bf0-4fdf-aa9d-eb6c04bc419d.png",
    features: [
      `${appointmentDateTime}`,
      `${data.equipmentType}`,
      `${serviceOption.charAt(0).toUpperCase() + serviceOption.slice(1)} Service`
    ],
    rebate: false,
    isPerSqft: false,
    category: "service"
  };
};

// Create travel fee product for cart
export const createTravelFeeProduct = (
  postalCode: string,
  distanceKm: number | null,
  travelFee: number
): Product => {
  return {
    id: Date.now() + 1,
    name: "Travel Fee",
    price: travelFee,
    image: "/lovable-uploads/f385d44a-5401-4c14-9248-cc1d4231a25e.png",
    features: [
      `Travel fee for service to postal code ${postalCode}`,
      `Distance: ${distanceKm}km`,
      `${distanceKm && distanceKm - FREE_TRAVEL_DISTANCE_KM}km beyond free travel zone`
    ],
    rebate: false,
    isPerSqft: false,
    category: "service"
  };
};

// Mock Canadian postal code database
export const canadianPostalCodeDatabase: {[key: string]: {address: string, city: string, province: string}} = {
  "M5V": {
    address: "25 Queens Quay W",
    city: "Toronto",
    province: "Ontario"
  },
  "M4W": {
    address: "123 Bloor St E",
    city: "Toronto", 
    province: "Ontario"
  },
  "M5T": {
    address: "287 Spadina Ave",
    city: "Toronto",
    province: "Ontario"
  },
  "K1P": {
    address: "56 Sparks St",
    city: "Ottawa",
    province: "Ontario"
  },
  "H2Y": {
    address: "800 René-Lévesque Blvd",
    city: "Montreal",
    province: "Quebec"
  },
  "V6B": {
    address: "128 W Cordova St",
    city: "Vancouver", 
    province: "British Columbia"
  },
  "T2P": {
    address: "240 8 Ave SW",
    city: "Calgary",
    province: "Alberta"
  },
  "B3J": {
    address: "1505 Barrington St",
    city: "Halifax",
    province: "Nova Scotia"
  },
  "R3C": {
    address: "330 Portage Ave",
    city: "Winnipeg",
    province: "Manitoba"
  },
  "S7K": {
    address: "220 3rd Ave S",
    city: "Saskatoon",
    province: "Saskatchewan"
  }
};

// Function to lookup Canadian address from postal code
export const lookupCanadianAddress = (postalCode: string) => {
  // Extract first three characters (Forward Sortation Area)
  const fsa = postalCode.substring(0, 3).toUpperCase();
  
  if (canadianPostalCodeDatabase[fsa]) {
    const data = canadianPostalCodeDatabase[fsa];
    const randomHouseNumber = Math.floor(Math.random() * 100) + 1;
    return {
      address: data.address,
      city: data.city,
      province: data.province,
      fullAddress: `${data.address}, ${data.city}, ${data.province}`
    };
  }
  
  return null;
};

// Send confirmation email
export const sendConfirmationEmail = async (
  data: BookingFormValues, 
  appointmentDateTime: string,
  totalCost: number,
  travelFee: number
) => {
  try {
    const formattedServiceOption = data.serviceOption.charAt(0).toUpperCase() + data.serviceOption.slice(1);
    const serviceType = data.serviceType.toUpperCase();
    
    // Prepare email content
    const emailParams = {
      to_email: "govoltly@gmail.com", // Hardcoded recipient as requested
      message: `A new service booking has been made with the following details:
        
Service Type: ${serviceType}
Equipment: ${data.equipmentType}
Service Option: ${formattedServiceOption}
Appointment: ${appointmentDateTime}
Issue Description: ${data.issueDescription}

Customer Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}, ${data.postalCode}

Payment Details:
Base Service Cost: $${SERVICE_COSTS[data.serviceOption]}
Travel Fee: $${travelFee}
Total Cost: $${totalCost}
`,
      service_type: serviceType,
      service_date: format(data.date, "MMMM d, yyyy"),
      service_time: data.timeSlot,
      service_option: formattedServiceOption,
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone,
      service_address: `${data.address}, ${data.postalCode}`,
      total_amount: `$${totalCost}`
    };
    
    // Send the email
    const result = await sendServiceConfirmationViaWebhook(emailParams);
    
    if (result.success) {
      console.log("Confirmation email sent successfully");
      return true;
    } else {
      console.error("Failed to send confirmation email:", result.error);
      return false;
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
};
