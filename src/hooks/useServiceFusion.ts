
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ServiceFusionCustomer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface ServiceFusionJob {
  customer_id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Normal' | 'High' | 'Emergency';
  category: string;
  scheduled_date?: string;
  scheduled_time?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  serviceType: 'electrical' | 'hvac';
  homeType: string;
  equipmentType: string;
  issueDescription: string;
  date: Date;
  timeSlot: string;
  serviceOption: 'standard' | 'priority' | 'protection';
}

interface PurchaseData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  isFinanced: boolean;
}

export const useServiceFusion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const callServiceFusionAPI = async (action: string, data: any) => {
    try {
      const response = await fetch('/functions/v1/service-fusion-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (error) {
      console.error(`Service Fusion API error (${action}):`, error);
      throw error;
    }
  };

  const createBookingInServiceFusion = async (bookingData: BookingData) => {
    setIsLoading(true);
    try {
      console.log('Creating booking in Service Fusion:', bookingData);

      // Parse customer name
      const nameParts = bookingData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Extract city and province from postal code (simplified)
      const city = 'Toronto'; // This would normally be derived from postal code
      const state = 'ON';

      // First, check if customer exists
      let customer;
      try {
        customer = await callServiceFusionAPI('get_customer', {
          email: bookingData.email
        });
      } catch (error) {
        console.log('Customer not found, will create new one');
      }

      // Create customer if not exists
      if (!customer) {
        const customerData: ServiceFusionCustomer = {
          first_name: firstName,
          last_name: lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          address: bookingData.address,
          city: city,
          state: state,
          zip: bookingData.postalCode,
        };

        customer = await callServiceFusionAPI('create_customer', customerData);
        console.log('Created customer:', customer);
      }

      // Create job/work order
      const jobTitle = `${bookingData.serviceType === 'electrical' ? 'Electrical' : 'HVAC'} Service - ${bookingData.equipmentType}`;
      const priority = bookingData.serviceOption === 'priority' ? 'High' : 
                     bookingData.serviceOption === 'protection' ? 'Normal' : 'Low';

      const jobData: ServiceFusionJob = {
        customer_id: customer.id,
        title: jobTitle,
        description: `Service Type: ${bookingData.serviceType}\nEquipment: ${bookingData.equipmentType}\nHome Type: ${bookingData.homeType}\nIssue: ${bookingData.issueDescription}\nService Option: ${bookingData.serviceOption}`,
        priority: priority,
        category: bookingData.serviceType === 'electrical' ? 'Electrical' : 'HVAC',
        scheduled_date: bookingData.date.toISOString().split('T')[0],
        scheduled_time: bookingData.timeSlot,
        address: bookingData.address,
        city: city,
        state: state,
        zip: bookingData.postalCode,
      };

      const job = await callServiceFusionAPI('create_job', jobData);
      console.log('Created job:', job);

      toast({
        title: 'Success!',
        description: 'Your booking has been created in Service Fusion CRM.',
      });

      return { customer, job };
    } catch (error) {
      console.error('Error creating booking in Service Fusion:', error);
      toast({
        variant: 'destructive',
        title: 'CRM Integration Error',
        description: 'Failed to create booking in Service Fusion. The booking was still added to your cart.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createPurchaseInServiceFusion = async (purchaseData: PurchaseData) => {
    setIsLoading(true);
    try {
      console.log('Creating purchase in Service Fusion:', purchaseData);

      // Parse customer name
      const nameParts = purchaseData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Extract city and province from postal code (simplified)
      const city = 'Toronto';
      const state = 'ON';

      // First, check if customer exists
      let customer;
      try {
        customer = await callServiceFusionAPI('get_customer', {
          email: purchaseData.email
        });
      } catch (error) {
        console.log('Customer not found, will create new one');
      }

      // Create customer if not exists
      if (!customer) {
        const customerData: ServiceFusionCustomer = {
          first_name: firstName,
          last_name: lastName,
          email: purchaseData.email,
          phone: purchaseData.phone,
          address: purchaseData.address,
          city: city,
          state: state,
          zip: purchaseData.postalCode,
        };

        customer = await callServiceFusionAPI('create_customer', customerData);
        console.log('Created customer:', customer);
      }

      // Create job for product purchase
      const productList = purchaseData.items.map(item => 
        `${item.name} (Qty: ${item.quantity}) - $${item.price.toLocaleString()}`
      ).join('\n');

      const jobData: ServiceFusionJob = {
        customer_id: customer.id,
        title: `Product Purchase - ${purchaseData.isFinanced ? 'Financed' : 'Direct Payment'}`,
        description: `Product Purchase Order\n\nItems:\n${productList}\n\nTotal Amount: $${purchaseData.totalAmount.toLocaleString()}\nPayment Method: ${purchaseData.isFinanced ? 'Financing' : 'Direct Payment'}`,
        priority: 'Normal',
        category: 'Sales',
        address: purchaseData.address,
        city: city,
        state: state,
        zip: purchaseData.postalCode,
      };

      const job = await callServiceFusionAPI('create_job', jobData);
      console.log('Created purchase job:', job);

      toast({
        title: 'Success!',
        description: 'Your purchase has been recorded in Service Fusion CRM.',
      });

      return { customer, job };
    } catch (error) {
      console.error('Error creating purchase in Service Fusion:', error);
      toast({
        variant: 'destructive',
        title: 'CRM Integration Error',
        description: 'Failed to record purchase in Service Fusion. Your order is still being processed.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomer = async (emailOrPhone: string) => {
    try {
      return await callServiceFusionAPI('get_customer', { 
        email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined
      });
    } catch (error) {
      console.error('Error getting customer:', error);
      return null;
    }
  };

  const getTechnicians = async () => {
    try {
      return await callServiceFusionAPI('get_technicians', {});
    } catch (error) {
      console.error('Error getting technicians:', error);
      return [];
    }
  };

  return {
    isLoading,
    createBookingInServiceFusion,
    createPurchaseInServiceFusion,
    getCustomer,
    getTechnicians,
  };
};
