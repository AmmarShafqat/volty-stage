
import React from "react";
import { Shield, Award, Clock } from "lucide-react";

const TrustSignals: React.FC = () => {
  return (
    <div className="border border-gray-200 bg-white rounded-md p-3 text-sm">
      <h3 className="font-semibold text-voltly-purple mb-2 text-center">Our Promises</h3>
      
      <div className="space-y-2">
        <div className="flex items-start">
          <Shield className="h-4 w-4 text-voltly-purple mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Satisfaction Guarantee</p>
            <p className="text-xs text-gray-600">If you're not 100% satisfied, we'll make it right</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Award className="h-4 w-4 text-voltly-purple mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Certified Professional Installation</p>
            <p className="text-xs text-gray-600">All installers are licensed, insured and background-checked</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-4 w-4 text-voltly-purple mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">24/7 Customer Support</p>
            <p className="text-xs text-gray-600">Questions? Our team is available around the clock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
