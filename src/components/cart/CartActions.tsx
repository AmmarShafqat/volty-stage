
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Loader, CreditCard, DollarSign } from "lucide-react";

interface CustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface CartActionsProps {
  installationData: {
    postalCode: string;
    address: string | null;
    date: Date | null;
    timeSlot: string | null;
    isPriority: boolean;
    distanceKm: number | null;
  };
  customerData: CustomerData;
}

const CartActions: React.FC<CartActionsProps> = ({ installationData, customerData }) => {
  const { 
    isProcessing, 
    processOrder, 
    hasFinanceOption,
    totalMonthlyPayment 
  } = useCart();

  const isInstallationComplete = installationData.postalCode && 
                                 installationData.address && 
                                 installationData.date && 
                                 installationData.timeSlot;

  const isCustomerDataComplete = customerData.firstName && 
                                customerData.lastName && 
                                customerData.phone && 
                                customerData.email;

  const canProceed = isInstallationComplete && isCustomerDataComplete;

  // Format customer data for Service Fusion (combine first and last name)
  const formatCustomerDataForServiceFusion = () => {
    return {
      name: `${customerData.firstName} ${customerData.lastName}`.trim(),
      email: customerData.email,
      phone: customerData.phone,
      address: installationData.address || "",
      postalCode: installationData.postalCode,
    };
  };

  const handleFinanceClick = () => {
    if (canProceed) {
      const serviceFusionCustomerData = formatCustomerDataForServiceFusion();
      processOrder('finance', installationData, serviceFusionCustomerData);
    }
  };

  const handlePaymentClick = () => {
    if (canProceed) {
      const serviceFusionCustomerData = formatCustomerDataForServiceFusion();
      processOrder('payment', installationData, serviceFusionCustomerData);
    }
  };

  return (
    <div className="space-y-3">
      {hasFinanceOption && (
        <Button 
          className="w-full bg-voltly-purple hover:bg-voltly-purple/90 text-white"
          onClick={handleFinanceClick}
          disabled={!canProceed || isProcessing}
        >
          {isProcessing ? (
            <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            <><DollarSign className="mr-2 h-4 w-4" /> Finance ${totalMonthlyPayment}/mo</>
          )}
        </Button>
      )}
      
      <Button 
        className="w-full bg-voltly-green hover:bg-voltly-green/90 text-black"
        onClick={handlePaymentClick}
        disabled={!canProceed || isProcessing}
      >
        {isProcessing ? (
          <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
        ) : (
          <><CreditCard className="mr-2 h-4 w-4" /> Proceed to Payment</>
        )}
      </Button>
      
      {!isInstallationComplete && (
        <p className="text-xs text-red-500 text-center">
          Please complete installation details to continue
        </p>
      )}
      
      {!isCustomerDataComplete && (
        <p className="text-xs text-red-500 text-center">
          Please provide your contact information to continue
        </p>
      )}
    </div>
  );
};

export default CartActions;
