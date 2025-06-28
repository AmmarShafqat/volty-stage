
import React from "react";
import Layout from "@/components/Layout";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FaqPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">Do you offer financing?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Yes! We offer up to 180-month financing with flexible approval options.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">Where do you install?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Currently serving Ontario, Alberta, and British Columbia.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">What areas do you service in Canada?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                We currently serve major metropolitan areas across Canada, including the Greater Toronto Area, Vancouver, Montreal, Calgary, and surrounding regions. We're constantly expanding our service areas.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">Do you offer warranties on your products?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Yes, all our products come with manufacturer warranties, and we offer extended warranty options for additional peace of mind. Our service work is also guaranteed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">How do I schedule a service appointment?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                You can easily schedule a service appointment through our online booking system, or by calling our customer service team. We offer flexible scheduling options to fit your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">What financing options do you offer?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                We provide various financing options to make home upgrades affordable, including monthly payment plans, zero-interest periods, and energy-saving rebate assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">How long does installation typically take?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Installation time varies by product. Heat pumps and furnaces typically take 1 day, while electrical panels may take 4-8 hours. Our team will provide you with a specific timeline during your consultation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">What should I do in case of an emergency?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                For emergencies such as gas leaks, electrical failures, or no heat during winter, call our emergency service line at 1-800-XXX-XXXX. We offer priority service for urgent situations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg px-4">Do you offer maintenance packages?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Yes, we offer annual maintenance packages for all our products. Regular maintenance ensures optimal performance, extends equipment life, and maintains warranty coverage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Contact our team directly for personalized assistance.
          </p>
          <Button asChild>
            <Link to="/contact" className="inline-block bg-black hover:bg-black/80 text-voltly-green font-medium py-3 px-6 rounded-md transition-colors">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
