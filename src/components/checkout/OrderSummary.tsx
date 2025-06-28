
import React from "react";
import { format } from "date-fns";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/taxUtils";
import { MapPin, CalendarClock } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  taxName: string;
  total: number;
  bookingData: {
    postalCode?: string;
    address?: string | null;
    date?: Date | null;
    timeSlot?: string | null;
    isPriority?: boolean;
  };
  additionalFees?: {
    label: string;
    amount: number;
  }[];
  discounts?: {
    label: string;
    amount: number;
  }[];
  installation?: {
    postalCode: string;
    address: string | null;
    date: Date | null;
    timeSlot: string | null;
    isPriority: boolean;
    distanceKm: number | null;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal, 
  tax, 
  taxName,
  total, 
  bookingData,
  additionalFees = [],
  discounts = [],
  installation
}) => {
  const getFormattedDate = (date: Date | null | undefined) => {
    if (!date) return "";
    return format(date, "EEEE, MMMM d, yyyy");
  };
  
  // Use either installation data or booking data based on what's provided
  const displayData = installation || bookingData;
  
  return (
    <Card className="bg-black border-voltly-purple/30">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal:</span>
            <span className="text-white font-semibold">${formatCurrency(subtotal)}</span>
          </div>
          
          {discounts.map((discount, index) => (
            <div key={index} className="flex justify-between text-voltly-green">
              <span className="text-gray-300">{discount.label}:</span>
              <span className="text-voltly-green font-semibold">-${formatCurrency(discount.amount)}</span>
            </div>
          ))}
          
          {additionalFees.map((fee, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-300">{fee.label}:</span>
              <span className="text-white font-semibold">${formatCurrency(fee.amount)}</span>
            </div>
          ))}
          
          <div className="flex justify-between">
            <span className="text-gray-300">{taxName}:</span>
            <span className="text-white font-semibold">${formatCurrency(tax)}</span>
          </div>
          
          <Separator className="bg-gray-800" />
          
          <div className="flex justify-between">
            <span className="text-white">Total:</span>
            <span className="text-lg font-bold text-voltly-green">
              ${formatCurrency(total)}
            </span>
          </div>
          
          {/* Booking Details */}
          <div className="bg-gray-900/70 p-3 rounded-lg mt-4">
            <h3 className="font-medium text-white mb-2">Service Details</h3>
            
            {displayData?.address && displayData.postalCode && (
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-300">
                  {displayData.address}, {displayData.postalCode}
                </span>
              </div>
            )}
            
            {displayData?.date && displayData?.timeSlot && (
              <div className="flex items-start gap-2">
                <CalendarClock className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-300">
                  {getFormattedDate(displayData.date)} at {displayData.timeSlot}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
