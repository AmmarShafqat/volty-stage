
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import BookingPage from "./pages/BookingPage";
import SmartBatteryPage from "./pages/SmartBatteryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ElectronicConsentPage from "./pages/ElectronicConsentPage";
import FinanceApplication from "./pages/FinanceApplication";
import Payment from "./pages/Payment";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import ProNetworkPage from "./pages/ProNetworkPage";
import GiveawayPage from "./pages/GiveawayPage";
import VoltlyAppPage from "./pages/VoltlyAppPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/smart-battery" element={<SmartBatteryPage />} />
              <Route path="/pro-network" element={<ProNetworkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/electronic-consent" element={<ElectronicConsentPage />} />
              <Route path="/finance-application" element={<FinanceApplication />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/giveaway" element={<GiveawayPage />} />
              <Route path="/voltly-app" element={<VoltlyAppPage />} />
              <Route path="/electrical-panel" element={<Navigate to="/electrical" replace />} />
              <Route path="/product/:category/:productId" element={<ProductDetail />} />
              <Route path="/:category" element={<ProductCategory />} />
              {/* Add more routes above this line */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
