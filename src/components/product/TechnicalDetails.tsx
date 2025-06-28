
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, House } from "lucide-react";

interface TechnicalDetail {
  name: string;
  value: string | number;
}

interface TechnicalDetailsProps {
  details: TechnicalDetail[];
  specifications?: string[];
  sizingInfo?: {
    title: string;
    description: string;
  };
}

const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({
  details,
  specifications,
  sizingInfo
}) => {
  return (
    <div className="mt-4 border-t border-gray-700 pt-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="technical-specs" className="border-b-gray-700">
          <AccordionTrigger className="py-2 text-white flex items-center">
            <span className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Technical Specifications
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-300">
            <div className="space-y-2">
              {details.map((detail, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-400">{detail.name}</span>
                  <span>{detail.value}</span>
                </div>
              ))}
              
              {/* Home Sizing Information */}
              {sizingInfo && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <House className="h-4 w-4 text-voltly-green" />
                    <h4 className="font-medium text-voltly-green">{sizingInfo.title}</h4>
                  </div>
                  <p className="text-xs text-gray-300">{sizingInfo.description}</p>
                </div>
              )}
              
              {specifications && specifications.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <h4 className="font-medium mb-2">Additional Specifications</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TechnicalDetails;
