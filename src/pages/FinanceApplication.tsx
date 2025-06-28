
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ExternalLink, DollarSign, CheckCircle, Clock, Shield, Zap, Star, CreditCard } from "lucide-react";
import { useFinanceLinks } from "@/hooks/useFinanceLinks";
import { calculateFinancingFee } from "@/utils/taxUtils";

const FinanceApplication = () => {
  const navigate = useNavigate();
  const { getFinanceLinkForProducts, getFinanceLinkForProduct } = useFinanceLinks();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [financeUrl, setFinanceUrl] = useState<string | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  useEffect(() => {
    // Get saved order details from sessionStorage
    const savedOrderDetails = sessionStorage.getItem('orderDetails');
    
    // Redirect to home if no order details found
    if (!savedOrderDetails) {
      navigate('/');
      return;
    }
    
    const details = JSON.parse(savedOrderDetails);
    setOrderDetails(details);
    
    // Get product IDs from the order
    const productIds = details.items.map((item: any) => item.product.id);
    
    // Calculate total monthly payment for all products that have financing
    let totalMonthlyPayment = 0;
    let hasFinanceOption = false;
    let primaryFinanceUrl = null;
    
    productIds.forEach((productId: number) => {
      const financeLink = getFinanceLinkForProduct(productId);
      if (financeLink) {
        hasFinanceOption = true;
        if (!primaryFinanceUrl) {
          primaryFinanceUrl = financeLink.finance_url;
        }
        // Find the quantity for this product
        const item = details.items.find((item: any) => item.product.id === productId);
        const quantity = item ? item.quantity : 1;
        totalMonthlyPayment += financeLink.monthly_payment * quantity;
      }
    });
    
    if (hasFinanceOption) {
      setFinanceUrl(primaryFinanceUrl);
      setMonthlyPayment(totalMonthlyPayment);
    }
  }, [navigate, getFinanceLinkForProduct]);

  const handleApplyNow = () => {
    if (financeUrl) {
      // Open FinanceIt in a new tab
      window.open(financeUrl, '_blank');
      
      // Clear session storage and redirect to home
      sessionStorage.removeItem('orderDetails');
      navigate('/?financeStarted=true');
    }
  };

  const handleBackToPayment = () => {
    navigate('/payment');
  };

  if (!orderDetails) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <p>Loading finance application...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = orderDetails.totalPrice + (orderDetails.extendedWarrantyPrice || 0);
  const financingFee = calculateFinancingFee(subtotal);
  const amountAfterFinancingFee = subtotal + financingFee;
  const hstAmount = amountAfterFinancingFee * 0.13;
  const finalTotal = amountAfterFinancingFee + hstAmount;

  // Calculate HST-inclusive monthly payment
  const finalMonthlyPayment = monthlyPayment ? monthlyPayment * 1.13 : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Finance Your Purchase</h1>
              <p className="text-lg text-gray-600">Complete your financing application to get started</p>
            </div>

            {/* Monthly Payment Highlight */}
            {finalMonthlyPayment && finalMonthlyPayment > 0 && (
              <Card className="mb-8 bg-white border-2 border-blue-100">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <Badge className="bg-blue-600 text-white font-bold px-4 py-2 text-lg">
                      Monthly Payment
                    </Badge>
                  </div>
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    ${finalMonthlyPayment.toFixed(2)}
                  </div>
                  <p className="text-gray-600 text-lg">per month</p>
                  <p className="text-sm text-gray-500 mt-1">Includes Finance fee and HST</p>
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">Competitive rates starting at 7.99% APR</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card className="h-fit bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    Order Summary
                  </CardTitle>
                  <CardDescription>
                    Review your purchase details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product List */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-blue-600">Products:</h3>
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.product.name}</span>
                          <span className="text-gray-600 ml-2">(x{item.quantity})</span>
                        </div>
                        <span className="font-bold">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderDetails.totalPrice.toLocaleString()}</span>
                    </div>
                    
                    {orderDetails.extendedWarrantyPrice > 0 && (
                      <div className="flex justify-between">
                        <span>Extended Warranty</span>
                        <span>${orderDetails.extendedWarrantyPrice.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-blue-600">
                      <span>Financing Fee (7.5%)</span>
                      <span>${financingFee.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>HST (13%)</span>
                      <span>${Math.round(hstAmount).toLocaleString()}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span>${Math.round(finalTotal).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financing Benefits */}
              <div className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Why Choose Our Financing?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">$0 Down Payment</p>
                          <p className="text-sm text-gray-600">Start your project immediately without upfront costs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Fast Review Process</p>
                          <p className="text-sm text-gray-600">Get approved in minutes, not days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Buy Now, Pay Later</p>
                          <p className="text-sm text-gray-600">Get your products today, start payments later</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Shield className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">30-Day Money Back Guarantee</p>
                          <p className="text-sm text-gray-600">Complete satisfaction or your money back</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Badge className="bg-blue-600 text-white mb-4">
                        Special Offer
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">No Prepayment Penalties</h3>
                      <p className="text-sm text-gray-600">
                        Pay off your loan early without any additional fees
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              {financeUrl ? (
                <Button 
                  onClick={handleApplyNow}
                  className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold text-xl py-6 shadow-lg"
                >
                  <ExternalLink className="mr-3 h-6 w-6" />
                  Apply for Financing Now
                </Button>
              ) : (
                <div className="text-center p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    Financing is not available for the selected products. Please proceed with direct payment.
                  </p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleBackToPayment}
                className="w-full border-2 border-slate-600 text-slate-700 hover:bg-slate-50"
              >
                Back to Payment Options
              </Button>
            </div>

            {/* Trust Footer */}
            <div className="mt-12 text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure SSL Encryption</span>
                <Separator orientation="vertical" className="h-4" />
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Licensed & Insured</span>
              </div>
              <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                *Financing subject to credit approval. Terms and conditions apply. 
                Interest rates and payment terms may vary based on creditworthiness. 
                30-day money back guarantee applies to financed purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinanceApplication;
