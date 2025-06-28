import React from "react";
import { Zap, Clock, ShieldCheck } from "lucide-react";

type ServiceOptionProps = {
  selectedOption: "standard" | "priority" | "protection";
  onChange: (option: "standard" | "priority" | "protection") => void;
  disableStandard?: boolean;
};

const ServiceOption = ({ selectedOption, onChange, disableStandard = false }: ServiceOptionProps) => {
  // For debugging
  console.log("ServiceOption rendering with selectedOption:", selectedOption);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 
          ${selectedOption === "standard" 
            ? "border-voltly-green bg-voltly-green/5" 
            : "border-gray-300 dark:border-gray-700"
          }
          ${disableStandard 
            ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" 
            : "hover:border-voltly-green"
          }
        `}
        onClick={() => {
          console.log("Standard option clicked, disabled:", disableStandard);
          if (!disableStandard) onChange("standard");
        }}
      >
        <div className="flex items-center mb-2">
          <Clock className="h-5 w-5 text-voltly-green" />
          <h4 className="ml-2 font-medium">Standard</h4>
        </div>
        <p className="text-sm font-bold mb-1">$149</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Standard service call</p>
        <ul className="text-xs space-y-1">
          <li className="flex items-center">
            <span className="h-1 w-1 bg-gray-400 rounded-full mr-1"></span>
            <span>Next available appointment</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-gray-400 rounded-full mr-1"></span>
            <span>Standard diagnosis</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-gray-400 rounded-full mr-1"></span>
            <span>Expert technician</span>
          </li>
        </ul>
        
        {disableStandard && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/70 dark:bg-gray-800/80 rounded-lg">
            <span className="text-xs font-medium px-2 py-1 bg-gray-800/90 dark:bg-black/90 text-white rounded-md">
              Not available
            </span>
          </div>
        )}
      </div>

      {/* Priority Option */}
      <div 
        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
          selectedOption === "priority" 
            ? "border-voltly-green bg-voltly-green/5" 
            : "border-gray-300 dark:border-gray-700 hover:border-voltly-green"
        }`}
        onClick={() => {
          console.log("Priority option clicked");
          onChange("priority");
        }}
      >
        <div className="flex items-center mb-2">
          <Zap className="h-5 w-5 text-voltly-green" />
          <h4 className="ml-2 font-medium">Priority</h4>
        </div>
        <p className="text-sm font-bold mb-1">$325</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Same-day or urgent service</p>
        <ul className="text-xs space-y-1">
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Priority scheduling</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Extended diagnosis time</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Senior technician</span>
          </li>
        </ul>
      </div>

      {/* Protection Plan Option */}
      <div 
        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
          selectedOption === "protection" 
            ? "border-voltly-green bg-voltly-green/5" 
            : "border-gray-300 dark:border-gray-700 hover:border-voltly-green"
        }`}
        onClick={() => {
          console.log("Protection option clicked");
          onChange("protection");
        }}
      >
        <div className="flex items-center mb-2">
          <ShieldCheck className="h-5 w-5 text-voltly-green" />
          <h4 className="ml-2 font-medium">Protection Plan</h4>
        </div>
        <p className="text-sm font-bold mb-1">$24/mo</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Subscription service</p>
        <ul className="text-xs space-y-1">
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Priority scheduling</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Regular maintenance</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Discounted repairs</span>
          </li>
          <li className="flex items-center">
            <span className="h-1 w-1 bg-voltly-green rounded-full mr-1"></span>
            <span>Annual inspection</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceOption;
