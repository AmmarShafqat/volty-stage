
import React from "react";
import Layout from "@/components/Layout";
import PolicyTabs from "@/components/PolicyTabs";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <PolicyTabs activeTab="privacy" />
          
          <div className="mt-10 bg-gray-900 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
            <p className="text-gray-300 mb-6">
              Voltly respects your privacy and protects your personal information in compliance with PIPEDA. We do not sell or share customer data without consent.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">1. Information We Collect</h2>
                <p className="text-gray-300">
                  We collect personal information that you provide directly to us, such as your name, address, email, phone number, and payment information when you make a purchase, create an account, or contact our customer service.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">2. How We Use Your Information</h2>
                <p className="text-gray-300">
                  We use your personal information to process orders, schedule installations, provide customer support, send important product updates, and improve our services. We may also use your information to personalize your experience and send you marketing communications if you have opted in.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">3. Information Sharing</h2>
                <p className="text-gray-300">
                  We do not sell or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as installation technicians, payment processors, and shipping companies. These providers are contractually obligated to protect your information.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">4. Data Security</h2>
                <p className="text-gray-300">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">5. Your Rights</h2>
                <p className="text-gray-300">
                  You have the right to access, correct, or delete your personal information. You may also withdraw consent for marketing communications at any time. To exercise these rights, please contact our privacy officer at support@voltly.ca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
