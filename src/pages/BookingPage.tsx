
import React from "react";
import Layout from "@/components/Layout";
import BookingForm from "@/components/booking/BookingForm";
import { Zap } from "lucide-react";

const BookingPage = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-voltly-green" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-voltly-green to-voltly-purple">
                  BOOK YOUR REPAIR
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Schedule Your Home Repair Service
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Book an appointment with our expert technicians to diagnose and repair your electrical or HVAC system.
                Service data will be sent directly to our Service Fusion CRM.
              </p>
              <p className="text-sm text-voltly-green mt-2">
                Choose from standard service, priority service, or enroll in our protection plan.
              </p>
            </div>

            <BookingForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
