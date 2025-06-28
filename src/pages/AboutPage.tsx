
import React from "react";
import Layout from "@/components/Layout";
import { Zap, Users, TrendingUp, Shield, Heart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Voltly</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
            Voltly is a modern home comfort company transforming how Canadians access heating, cooling, electrical, and smart energy solutions. With competitive pricing, innovative financing, and digital-first service, we're making home upgrades easier and smarter.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-voltly-green p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer-First</h3>
                  <p className="text-gray-600">We prioritize customer satisfaction and experience above all else, making home comfort accessible to everyone.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-voltly-green p-4 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-600">We constantly seek better ways to deliver energy-efficient solutions through technology and fresh ideas.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-voltly-green p-4 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reliability</h3>
                  <p className="text-gray-600">We stand behind our work with quality guarantees and responsive support when you need it most.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The Voltly Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-voltly-green p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Solutions</h3>
                <p className="text-gray-600">We integrate smart technology into traditional home systems, making your home more efficient and responsive to your needs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-voltly-green p-3 rounded-full">
                  <Heart className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sustainable Future</h3>
                <p className="text-gray-600">Our products and services are designed with environmental sustainability in mind, helping reduce your carbon footprint.</p>
              </div>
            </div>

            <div className="flex gap-4 md:col-span-2">
              <div className="flex-shrink-0">
                <div className="bg-voltly-green p-3 rounded-full">
                  <Zap className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Energy Independence</h3>
                <p className="text-gray-600">We empower homeowners with solutions that reduce reliance on traditional energy grids and provide more control over home comfort.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">What areas do you service in Canada?</AccordionTrigger>
              <AccordionContent>
                We currently serve major metropolitan areas across Canada, including the Greater Toronto Area, Vancouver, Montreal, Calgary, and surrounding regions. We're constantly expanding our service areas.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Do you offer warranties on your products?</AccordionTrigger>
              <AccordionContent>
                Yes, all our products come with manufacturer warranties, and we offer extended warranty options for additional peace of mind. Our service work is also guaranteed.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">How do I schedule a service appointment?</AccordionTrigger>
              <AccordionContent>
                You can easily schedule a service appointment through our online booking system, or by calling our customer service team. We offer flexible scheduling options to fit your needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">What financing options do you offer?</AccordionTrigger>
              <AccordionContent>
                We provide various financing options to make home upgrades affordable, including monthly payment plans, zero-interest periods, and energy-saving rebate assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mb-10">
          <Alert className="bg-voltly-green/10 border-voltly-green">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2">
              <div>
                <AlertTitle className="text-2xl font-bold">Ready to upgrade your home comfort?</AlertTitle>
                <AlertDescription className="mt-2 text-lg">
                  Our team is ready to help you find the perfect solution for your needs.
                </AlertDescription>
              </div>
              <a href="/booking" className="bg-black text-voltly-green px-6 py-3 rounded-md font-bold hover:bg-black/90 transition-colors">
                Book a Consultation
              </a>
            </div>
          </Alert>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
