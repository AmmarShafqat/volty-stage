
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-center">
          <h1 className="text-voltly-green text-9xl font-bold mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold rounded-md cta-button"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2" size={16} />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
