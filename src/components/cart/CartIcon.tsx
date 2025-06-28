
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartIconProps {
  onClick: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({
  onClick,
  className
}) => {
  const { itemCount } = useCart();
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onClick} 
        className={cn("border-none bg-transparent hover:bg-black/10 relative h-10 w-10 flex items-center justify-center", className)}
      >
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        {itemCount > 0 && 
          <span className="absolute -top-1 -right-1 bg-voltly-green text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        }
      </Button>
    </div>
  );
};

export default CartIcon;
