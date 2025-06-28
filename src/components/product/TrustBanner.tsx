
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, CreditCard, Truck, Circle, CircleCheck, CircleUser } from "lucide-react";

const TrustBanner: React.FC = () => {
  return (
    <div className="my-8">
      <Card className="bg-white border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-[#00FF7F]/10 border-b border-[#00FF7F]/20 px-6 py-4">
            <h3 className="text-xl font-bold text-center">Shop With Confidence</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00FF7F]/10 p-3 rounded-full mb-3">
                <ShieldCheck className="h-7 w-7 text-[#00FF7F]" />
              </div>
              <h4 className="font-semibold mb-2">Safe & Secure</h4>
              <p className="text-sm text-gray-600">
                Fully encrypted checkout with secure payment processing. Your data is always protected.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00FF7F]/10 p-3 rounded-full mb-3">
                <CircleCheck className="h-7 w-7 text-[#00FF7F]" />
              </div>
              <h4 className="font-semibold mb-2">Trusted Professionals</h4>
              <p className="text-sm text-gray-600">
                Licensed and certified technicians install all products with care and precision.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00FF7F]/10 p-3 rounded-full mb-3">
                <CircleUser className="h-7 w-7 text-[#00FF7F]" />
              </div>
              <h4 className="font-semibold mb-2">Easy Process</h4>
              <p className="text-sm text-gray-600">
                Simple 3-step process: select your product, schedule installation, enjoy the benefits.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Professional Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Warranty Included</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustBanner;
