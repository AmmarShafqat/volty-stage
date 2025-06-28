
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const Payment = () => {
  const { totalPrice, extendedWarrantyPrice, items, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const taxAmount = (totalPrice + extendedWarrantyPrice) * 0.13;
  const finalTotal = totalPrice + extendedWarrantyPrice + taxAmount;

  useEffect(() => {
    const savedOrderDetails = sessionStorage.getItem('orderDetails');
    
    if (!savedOrderDetails && items.length === 0) {
      navigate('/');
      return;
    }
    
    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    }
  }, [items.length, navigate]);

  const handleCompletePayment = async () => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment Successful",
        description: "Your order has been confirmed and is being processed.",
      });
      
      clearCart();
      sessionStorage.removeItem('orderDetails');
      
      navigate("/?orderSuccess=true");
      
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const displayTotalPrice = orderDetails?.totalPrice || totalPrice;
  const displayWarrantyPrice = orderDetails?.extendedWarrantyPrice || extendedWarrantyPrice;
  const displayTaxAmount = orderDetails?.taxAmount || taxAmount;
  const displayFinalTotal = orderDetails?.finalTotal || finalTotal;
  const installationData = orderDetails?.installationData;
  const customerData = orderDetails?.customerData;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Payment Gateway</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {customerData && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium text-gray-900">{customerData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{customerData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{customerData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Postal Code</p>
                        <p className="font-medium text-gray-900">{customerData.postalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {installationData && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Installation Details</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">{installationData.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Postal Code</p>
                        <p className="font-medium text-gray-900">{installationData.postalCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">
                          {installationData.date ? new Date(installationData.date).toLocaleDateString() : 'Not selected'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time Slot</p>
                        <p className="font-medium text-gray-900">{installationData.timeSlot || 'Not selected'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 mb-4">
                    In a real application, this would integrate with a payment processor like Stripe, PayPal, etc.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${displayTotalPrice.toLocaleString()}</p>
                  </div>
                  
                  {displayWarrantyPrice > 0 && (
                    <div className="flex justify-between">
                      <p className="text-gray-600">Extended Warranty</p>
                      <p className="font-medium">${displayWarrantyPrice.toLocaleString()}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">HST (13%)</p>
                    <p className="font-medium">${displayTaxAmount.toLocaleString()}</p>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">${displayFinalTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <Button 
                  className="bg-voltly-green hover:bg-voltly-green/90 text-black w-full"
                  onClick={handleCompletePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    "Complete Payment"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
