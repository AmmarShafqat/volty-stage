
import React from "react";
import Layout from "@/components/Layout";
import PolicyTabs from "@/components/PolicyTabs";

const TermsPage = () => {
  return (
    <Layout>
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <PolicyTabs activeTab="terms" />
          
          <div className="mt-10 bg-gray-900 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Terms & Conditions</h1>
            <p className="text-gray-300 mb-6">
              By using Voltly's services and website, you agree to our terms including service areas, pricing transparency, and installation timelines.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">1. Service Agreement</h2>
                <p className="text-gray-300">
                  Voltly agrees to provide products and services as described on our website and in written agreements. All installations are performed by certified technicians in accordance with local building codes and regulations.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">2. Service Areas</h2>
                <p className="text-gray-300">
                  Voltly currently serves Ontario, Alberta, and British Columbia. Additional travel fees may apply for installations in remote areas. Voltly reserves the right to decline service to locations outside our service area.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">3. Pricing & Payment</h2>
                <p className="text-gray-300">
                  All prices displayed on the website are in Canadian dollars and subject to applicable taxes. Voltly reserves the right to modify pricing at any time. Payment is required to confirm installation appointments. Financing options are available subject to approval by our financing partners.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">4. Installation Timeline</h2>
                <p className="text-gray-300">
                  Standard installation is scheduled within 3-7 business days of order confirmation. Actual installation times may vary based on product availability, technician scheduling, and weather conditions. Voltly will notify customers of any delays as soon as possible.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">5. Warranty</h2>
                <p className="text-gray-300">
                  Voltly products come with manufacturer warranties as specified in product descriptions. Voltly installation services are covered by a separate workmanship warranty. Details are provided upon installation completion.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">6. Limitation of Liability</h2>
                <p className="text-gray-300">
                  Voltly is not responsible for damages resulting from improper use of our products or services, force majeure events, or circumstances beyond our reasonable control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
