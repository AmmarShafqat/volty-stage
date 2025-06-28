
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerData } from "@/hooks/useCustomerData";

interface CustomerInfoFormProps {
  customerData: CustomerData | null;
  onCustomerDataChange: (data: CustomerData) => void;
  isRequired?: boolean;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  customerData,
  onCustomerDataChange,
  isRequired = true
}) => {
  const handleInputChange = (field: keyof CustomerData, value: string) => {
    const updatedData = {
      ...customerData,
      [field]: value
    } as CustomerData;
    onCustomerDataChange(updatedData);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Customer Information
          {isRequired && <span className="text-red-500">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Full Name</Label>
            <Input
              id="customerName"
              value={customerData?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required={isRequired}
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={customerData?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required={isRequired}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={customerData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              required={isRequired}
            />
          </div>
          <div>
            <Label htmlFor="customerPostalCode">Postal Code</Label>
            <Input
              id="customerPostalCode"
              value={customerData?.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="Enter your postal code"
              required={isRequired}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="customerAddress">Address</Label>
          <Input
            id="customerAddress"
            value={customerData?.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter your full address"
            required={isRequired}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;
