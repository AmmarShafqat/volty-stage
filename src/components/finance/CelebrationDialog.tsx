
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

interface CelebrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CelebrationDialog = ({ open, onOpenChange }: CelebrationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-orange-50 to-yellow-50 border-4 border-orange-300">
        <DialogHeader className="text-center">
          <div className="relative overflow-hidden">
            {/* Animated bouncing balls */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-bounce delay-0 absolute top-4 left-8 w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="animate-bounce delay-100 absolute top-6 right-12 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="animate-bounce delay-200 absolute top-8 left-16 w-4 h-4 bg-red-400 rounded-full"></div>
              <div className="animate-bounce delay-300 absolute top-2 right-6 w-3 h-3 bg-orange-500 rounded-full"></div>
              <div className="animate-bounce delay-150 absolute top-10 left-6 w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="animate-bounce delay-75 absolute top-4 right-20 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            
            {/* Success icon with scale animation */}
            <div className="animate-scale-in mb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <DialogTitle className="text-3xl font-black text-green-700 mb-2 animate-fade-in">
              SUBMITTED! 🎉
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="text-center space-y-4 animate-fade-in">
          <div className="bg-white/80 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Application Submitted Successfully!
            </h3>
            <p className="text-green-700 text-lg mb-4">
              Your finance application has been received and is being reviewed.
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg border border-orange-200">
              <p className="text-orange-800 font-medium">
                📧 An email confirmation will be sent to you shortly with next steps and timeline.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Review time: 24-48 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
              <span className="font-medium">98% approval rate</span>
            </div>
          </div>
          
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationDialog;
