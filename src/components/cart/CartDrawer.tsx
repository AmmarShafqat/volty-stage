
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import CartActions from "./CartActions";
import EmptyCart from "./EmptyCart";
import InstallationScheduling from "@/components/checkout/InstallationScheduling";
import CustomerInfoSection from "./CustomerInfoSection";

interface CartDrawerProps {
  children: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  const { items, itemCount } = useCart();
  const [installationData, setInstallationData] = React.useState({
    postalCode: "",
    address: null as string | null,
    date: null as Date | null,
    timeSlot: null as string | null,
    isPriority: false,
    distanceKm: null as number | null,
  });

  const [customerData, setCustomerData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  if (items.length === 0) {
    return (
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <EmptyCart />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          <CartItems />
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Installation Details</h3>
            <InstallationScheduling onScheduleChange={setInstallationData} />
          </div>
          
          <Separator />
          
          <div>
            <CustomerInfoSection 
              customerData={customerData}
              onCustomerDataChange={setCustomerData}
            />
          </div>
          
          <Separator />
          
          <CartSummary />
        </div>
        
        <div className="flex-shrink-0 pt-4 border-t">
          <CartActions 
            installationData={installationData} 
            customerData={customerData}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
