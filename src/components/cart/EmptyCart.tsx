
import React from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-80 p-6">
      <div className="bg-gray-100 rounded-full p-4 mb-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-600 mb-6 text-center">Looks like you haven't added any products to your cart yet.</p>
      <SheetClose asChild>
        <Button className="bg-voltly-green text-black hover:bg-voltly-green/90 transition-all">
          Start Shopping
        </Button>
      </SheetClose>
    </div>
  );
};

export default EmptyCart;
