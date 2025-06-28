import React from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-700">
            Have questions or need help? Reach out to the Voltly team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-voltly-green p-3 rounded-full">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      <a href="mailto:govoltly@gmail.com" className="hover:text-voltly-green transition-colors">
                        govoltly@gmail.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      We usually respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-voltly-green p-3 rounded-full">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      <a href="tel:(844) 629-4333" className="hover:text-voltly-green transition-colors">
                        (844) 629-4333
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Toll-free across Canada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-voltly-green p-3 rounded-full">
                    <Clock className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Service Hours</h3>
                    <p className="text-gray-600">
                      Monday – Saturday: 9am – 7pm
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Closed on major holidays
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-voltly-green p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Head Office</h3>
                    <p className="text-gray-600">
                      80 Dynamic Dr, Unit 21<br />
                      Toronto, ON<br />
                      M1V 2V1
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      By appointment only
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-voltly-green"
                  required
                ></textarea>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-black/80 text-voltly-green font-semibold py-3"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Check our frequently asked questions or book a consultation with our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/faq" 
              className="inline-block bg-gray-100 hover:bg-gray-200 text-black font-medium py-3 px-6 rounded-md transition-colors"
            >
              View FAQ
            </a>
            <a 
              href="/booking" 
              className="inline-block bg-black hover:bg-black/80 text-voltly-green font-medium py-3 px-6 rounded-md transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
