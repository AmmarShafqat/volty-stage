
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface BookingSummaryProps {
  showSummary: boolean;
  setShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
  serviceType: string;
  serviceOption: string;
  totalCost: number;
  travelFee: number;
  distanceKm: number | null;
  FREE_TRAVEL_DISTANCE_KM: number;
  baseCost: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  showSummary,
  setShowSummary,
  serviceType,
  serviceOption,
  totalCost,
  travelFee,
  distanceKm,
  FREE_TRAVEL_DISTANCE_KM,
  baseCost,
}) => {
  return (
    <Dialog open={showSummary} onOpenChange={setShowSummary}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Added to Cart</DialogTitle>
          <DialogDescription>
            Your service appointment has been scheduled successfully and added to your cart.
            A confirmation email has been sent to govoltly@gmail.com.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardContent className="p-4">
              <p className="font-medium mb-2">Service Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service Type:</span>
                  <span className="font-medium">{serviceType?.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Option:</span>
                  <span className="font-medium capitalize">{serviceOption}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Service Cost:</span>
                  <span className="font-medium">${baseCost}</span>
                </div>
                {travelFee > 0 && (
                  <div className="flex justify-between">
                    <span>Travel Fee ({distanceKm && distanceKm - FREE_TRAVEL_DISTANCE_KM} km):</span>
                    <span className="font-medium">${travelFee}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${totalCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <Button
            onClick={() => setShowSummary(false)}
            variant="outline"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => {
              setShowSummary(false);
              window.location.href = "/checkout";
            }}
            className="bg-voltly-green hover:bg-voltly-green/90 text-black"
          >
            View Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const EmailSentDialog: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Confirmation Sent</DialogTitle>
          <DialogDescription>
            A confirmation email with the booking details has been sent to govoltly@gmail.com
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-6">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-voltly-green hover:bg-voltly-green/90 text-black"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSummary;
