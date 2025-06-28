
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, User, MapPin, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";
import UserProfileButton from "@/components/auth/UserProfileButton";
import CartDrawer from "@/components/cart/CartDrawer";
import CartIcon from "@/components/cart/CartIcon";
import { productCategories } from "@/data/productCategories";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Service & Repair", href: "/booking" },
    { label: "Pro Network", href: "/pro-network" },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsSheetOpen(false); // Close the mobile sheet after navigation
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleProductCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Toronto • London • Kingston • Ottawa • Windsor • Barrie</span>
          </div>
          <div className="flex items-center space-x-4">
            <CartDrawer>
              <CartIcon onClick={handleCartClick} />
            </CartDrawer>
            {user ? (
              <UserProfileButton />
            ) : (
              <AuthDialog 
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/2e4a99f8-78b2-4460-a59d-77b87b546bbb.png" 
              alt="Voltly Logo" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>Products</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-50">
                {Object.entries(productCategories).map(([categoryId, category]) => (
                  <DropdownMenuItem
                    key={categoryId}
                    onClick={() => handleProductCategoryClick(categoryId)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{category.title}</span>
                      <span className="text-xs text-gray-500">{category.description}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Products</h3>
                    {Object.entries(productCategories).map(([categoryId, category]) => (
                      <Button
                        key={categoryId}
                        variant="ghost"
                        className="justify-start w-full text-left"
                        onClick={() => handleNavigation(`/${categoryId}`)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{category.title}</span>
                          <span className="text-xs text-gray-500">{category.description}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => handleNavigation(item.href)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
