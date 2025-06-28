
import React from "react";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";

const ElectronicConsentPage = () => {
  const effectiveDate = "May 12, 2025"; // Using the current date from the context
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Voltly Electronic Consent Agreement (Canada)</h1>
          <p className="text-center text-gray-600 mb-6">Effective Date: {effectiveDate}</p>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              This Electronic Consent Agreement ("Agreement") outlines your rights when receiving electronic disclosures 
              and communications from Voltly Inc. ("Voltly", "we", "us", or "our") in relation to products, services, 
              financing, or other transactions. Please read this Agreement carefully and retain a copy for your records.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Consent to Receive Disclosures Electronically</h2>
            <p className="mb-4">
              By providing your consent, you agree to receive the following documents and communications from Voltly electronically:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li>Loan agreements, disclosures, and related amendments</li>
              <li>Statements, payment schedules, and renewals</li>
              <li>Notices of approval, denial, or other updates</li>
              <li>Terms and conditions, privacy policies, and consent requests</li>
              <li>Any legally required notices or documentation</li>
            </ul>
            <p className="mb-4">
              These may be delivered via:
            </p>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>Email to the address you provide</li>
              <li>Voltly's website or customer portal</li>
              <li>PDF downloads, links, or embedded documents</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Your Rights</h2>
            <p className="mb-3">
              You have the right to withdraw your consent at any time by contacting support@voltly.com. 
              Doing so may affect your ability to complete financing or use certain services.
            </p>
            <p className="mb-6">
              You may request a paper copy of any document by emailing us. A processing fee may apply for print requests.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. System Requirements</h2>
            <p className="mb-4">
              To access and retain records electronically, you must have:
            </p>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>A valid email address</li>
              <li>A modern web browser (e.g., Chrome, Safari, Firefox)</li>
              <li>Internet access</li>
              <li>Software to view PDF files (e.g., Adobe Reader)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Updating Contact Information</h2>
            <p className="mb-6">
              You agree to keep your email address and contact details up to date with Voltly. 
              You may update this information through your Voltly customer account or by emailing us.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Consent Confirmation</h2>
            <p className="mb-6">
              By checking the box labeled "I Consent to Receive Disclosures Electronically," you confirm that:
            </p>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>You have read and understood this Agreement;</li>
              <li>You meet the system requirements;</li>
              <li>You consent to receive electronic disclosures and documents in lieu of paper copies.</li>
            </ul>
            
            <Separator className="my-8" />
            
            <p className="mb-4">
              If you have any questions about this agreement, please contact:
            </p>
            <p className="mb-1">📧 Email: <a href="mailto:support@voltly.com" className="text-blue-600 hover:underline">support@voltly.com</a></p>
            <p className="mb-6">🌐 Website: <a href="https://voltly.com/electronic-consent-agreement" className="text-blue-600 hover:underline">https://voltly.com/electronic-consent-agreement</a></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ElectronicConsentPage;
