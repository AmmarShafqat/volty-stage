
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

interface WarrantyOptionProps {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
}

const WarrantyOption: React.FC<WarrantyOptionProps> = ({ isSelected, onChange }) => {
  return (
    <Card className="border border-gray-200 mt-4">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-voltly-green/10 p-2 rounded-full">
              <ShieldCheck className="h-6 w-6 text-voltly-green" />
            </div>
            <div>
              <h3 className="font-medium">Extended Labor Warranty</h3>
              <p className="text-sm text-gray-500">
                Add a 9-year extended labor warranty to your service ($750)
              </p>
              <p className="text-xs text-voltly-green mt-1">
                Combine with our standard 1-year labor warranty for 10 years of coverage
              </p>
            </div>
          </div>
          <Switch checked={isSelected} onCheckedChange={onChange} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WarrantyOption;
