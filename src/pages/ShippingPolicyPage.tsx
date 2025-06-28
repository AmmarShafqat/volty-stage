
import React from "react";
import Layout from "@/components/Layout";
import PolicyTabs from "@/components/PolicyTabs";

const ShippingPolicyPage = () => {
  return (
    <Layout>
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <PolicyTabs activeTab="shipping" />
          
          <div className="mt-10 bg-gray-900 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Shipping & Installation Policy</h1>
            <p className="text-gray-300 mb-6">
              All Voltly products include installation by certified technicians. Installations are scheduled within 3–7 business days. Additional travel charges may apply for remote areas.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">Installation Process</h2>
                <p className="text-gray-300">
                  Our certified technicians handle all aspects of installation, including removal of old equipment, positioning of new systems, electrical connections, and system testing. All installations follow local building codes and manufacturer specifications.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">Installation Timeline</h2>
                <p className="text-gray-300">
                  <span className="font-medium text-voltly-green">Greater Toronto Area:</span> 1 business day
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-voltly-green">Other major cities in Ontario, Alberta, and BC:</span> 1-2 business days
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-voltly-green">Rural and remote locations:</span> 2-5 business days
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">What to Expect</h2>
                <p className="text-gray-300">
                  Prior to installation day, our team will contact you to confirm details and answer any questions. On installation day, technicians will arrive within the scheduled window, perform the installation, clean the work area, and provide a full system demonstration.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">Additional Charges</h2>
                <p className="text-gray-300">
                  Travel charges may apply for installations in remote areas. Any unforeseen complexities discovered during installation that require additional materials or labor will be discussed with you before any additional work is performed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;
