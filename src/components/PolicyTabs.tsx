
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PolicyTabsProps {
  activeTab: "faq" | "shipping" | "contact" | "terms" | "privacy";
}

const PolicyTabs = ({ activeTab }: PolicyTabsProps) => {
  return (
    <div className="flex justify-center mb-8">
      <Tabs defaultValue={activeTab} className="w-full max-w-3xl">
        <TabsList className="grid grid-cols-5 w-full bg-gray-900">
          <TabsTrigger value="faq" asChild>
            <Link to="/faq" className={activeTab === "faq" ? "text-voltly-green" : "text-white"}>
              FAQ
            </Link>
          </TabsTrigger>
          <TabsTrigger value="shipping" asChild>
            <Link to="/shipping-policy" className={activeTab === "shipping" ? "text-voltly-green" : "text-white"}>
              Shipping & Installation
            </Link>
          </TabsTrigger>
          <TabsTrigger value="terms" asChild>
            <Link to="/terms" className={activeTab === "terms" ? "text-voltly-green" : "text-white"}>
              Terms & Conditions
            </Link>
          </TabsTrigger>
          <TabsTrigger value="privacy" asChild>
            <Link to="/privacy" className={activeTab === "privacy" ? "text-voltly-green" : "text-white"}>
              Privacy Policy
            </Link>
          </TabsTrigger>
          <TabsTrigger value="contact" asChild>
            <Link to="/contact" className={activeTab === "contact" ? "text-voltly-green" : "text-white"}>
              Contact Us
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PolicyTabs;
