
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const CartItems: React.FC = () => {
  const { items, removeItem, updateQuantity, toggleExtendedWarranty } = useCart();

  // Function to handle image paths
  const getImagePath = (imagePath: string) => {
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For local assets that start with "public/", remove the "public/" prefix
    if (imagePath.startsWith('public/')) {
      return imagePath.substring(7);
    }
    
    return imagePath;
  };

  return (
    <>
      {items.map((item) => {
        return (
          <Card key={item.product.id} className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  {item.product.category === "insulation" || item.product.name.includes("Insulation") ? (
                    <img
                      src={getImagePath("lovable-uploads/d2192e50-f7cc-4a5f-a701-440f5c06cb8b.png")}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={getImagePath(item.product.image)}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-black">{item.product.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.product.price.toLocaleString()} each
                    </p>
                    {item.product.monthlyPayment && (
                      <p className="text-sm text-voltly-purple mb-2">
                        or ${item.product.monthlyPayment}/mo
                      </p>
                    )}
                  </div>
                  
                  {!item.product.isPerSqft && (
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        10 Year Parts & 1 Year Labor Warranty
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 ml-auto"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Extended warranty option for eligible products */}
                  {!item.product.isPerSqft && (
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium">9-Year Extended Labor Warranty (+$750)</p>
                        <p className="text-xs text-gray-500">10 years total labor coverage</p>
                      </div>
                      <Switch
                        checked={item.extendedWarranty || false}
                        onCheckedChange={() => toggleExtendedWarranty(item.product.id)}
                      />
                    </div>
                  )}
                  
                  <div className="mt-2 text-right">
                    <p className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toLocaleString()}
                      {item.extendedWarranty && " + $750"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default CartItems;
