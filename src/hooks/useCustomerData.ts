
import { useState } from 'react';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
}

export const useCustomerData = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isCollected, setIsCollected] = useState(false);

  const updateCustomerData = (data: CustomerData) => {
    setCustomerData(data);
    setIsCollected(true);
  };

  const clearCustomerData = () => {
    setCustomerData(null);
    setIsCollected(false);
  };

  return {
    customerData,
    isCollected,
    updateCustomerData,
    clearCustomerData,
  };
};
