import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/components/product/ProductCard";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useServiceFusion } from "@/hooks/useServiceFusion";

export type CartItem = {
  product: Product;
  quantity: number;
  extendedWarranty?: boolean;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleExtendedWarranty: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  extendedWarrantyPrice: number;
  hasExtendedWarranty: boolean;
  isProductEligibleForWarranty: (product: Product) => boolean;
  totalMonthlyPayment: number;
  hasFinanceOption: boolean;
  isProcessing: boolean;
  processOrder: (redirectType: 'finance' | 'payment', installationData?: any, customerData?: any) => Promise<void>;
  totalGiveawayEntries: number;
  calculateProductEntries: (price: number) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { createPurchaseInServiceFusion } = useServiceFusion();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items]);

  // Helper function to determine if a product is eligible for extended warranty
  const isProductEligibleForWarranty = (product: Product) => {
    // Products sold per square foot (like insulation) are not eligible
    return !product.isPerSqft;
  };

  // Helper function to calculate giveaway entries for a given price
  const calculateProductEntries = (price: number) => {
    // Each $1000 spent equals 1 entry
    return Math.floor(price / 1000);
  };

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: "Quantity has been increased by 1",
        });
        
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Item added to cart",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...prevItems, { product, quantity: 1, extendedWarranty: false }];
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.product.name} has been removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleExtendedWarranty = (productId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId 
          ? { ...item, extendedWarranty: !item.extendedWarranty } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // New simplified processOrder function without customer info requirements
  const processOrder = async (redirectType: 'finance' | 'payment', installationData?: any, customerData?: any) => {
    // Only check installation scheduling for completion
    const isInstallationComplete = installationData?.postalCode && 
                                   installationData?.address && 
                                   installationData?.date && 
                                   installationData?.timeSlot;

    if (!isInstallationComplete) {
      toast({
        title: "Incomplete Information",
        description: "Please complete installation scheduling to proceed",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);
      
      // Create Service Fusion purchase record if customer data is available
      if (customerData) {
        try {
          const purchaseData = {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address || installationData.address,
            postalCode: customerData.postalCode || installationData.postalCode,
            items: items.map(item => ({
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity
            })),
            totalAmount: totalPrice + extendedWarrantyPrice,
            isFinanced: redirectType === 'finance'
          };

          await createPurchaseInServiceFusion(purchaseData);
        } catch (serviceFusionError) {
          console.error('Service Fusion integration failed:', serviceFusionError);
          // Continue with the process even if Service Fusion fails
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate values for order
      const taxAmount = (totalPrice + extendedWarrantyPrice) * 0.13;
      const finalTotal = totalPrice + extendedWarrantyPrice + taxAmount;
      
      // Store order information in sessionStorage for use on the next page
      sessionStorage.setItem('orderDetails', JSON.stringify({
        items,
        totalPrice,
        extendedWarrantyPrice,
        taxAmount,
        finalTotal,
        totalGiveawayEntries,
        orderDate: new Date().toISOString(),
        installationData: installationData || null,
        customerData: customerData || null
      }));
      
      // Show success message
      toast({
        title: "Order Created",
        description: redirectType === 'finance' 
          ? "Redirecting to FinanceIt application..." 
          : "Redirecting to payment page...",
      });
      
      // Clear the cart
      setItems([]);
      
      // Redirect based on the selected option
      if (redirectType === 'finance') {
        navigate("/finance-application");
      } else {
        navigate("/payment");
      }
      
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate various cart metrics
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate total monthly payment
  const totalMonthlyPayment = items.reduce(
    (total, item) => total + ((item.product.monthlyPayment || 0) * item.quantity),
    0
  );

  // Calculate total giveaway entries based on cart total (before tax and warranty)
  const totalGiveawayEntries = Math.floor(totalPrice / 1000);

  // Check if any item has finance option
  const hasFinanceOption = items.some(item => 
    item.product.monthlyPayment && item.product.monthlyPayment > 0
  );

  // Calculate if any item has extended warranty
  const hasExtendedWarranty = items.some(item => item.extendedWarranty);

  // Extended warranty price - $750 for each item that has it enabled
  const extendedWarrantyPrice = items.reduce(
    (total, item) => total + (item.extendedWarranty ? 750 : 0),
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    toggleExtendedWarranty,
    clearCart,
    itemCount,
    totalPrice,
    extendedWarrantyPrice,
    hasExtendedWarranty,
    isProductEligibleForWarranty,
    totalMonthlyPayment,
    hasFinanceOption,
    isProcessing,
    processOrder,
    totalGiveawayEntries,
    calculateProductEntries,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
