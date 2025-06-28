
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProNetworkCarousel from "@/components/pro-network/ProNetworkCarousel";
import {
  BadgeCheck,
  Users,
  Laptop,
  Wrench,
  Map,
  CheckCircle2,
  Building,
  Truck,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const ProNetworkPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
              <span className="text-voltly-green text-sm font-semibold mr-2">FOR CONTRACTORS</span>
              <span className="text-sm text-white">Business Opportunity</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Join the <span className="text-voltly-green">Voltly Pro Network</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-6">
              The UberEats for home services, or RE/MAX for contractors. License the Voltly brand and get 
              access to pre-qualified leads, tech tools, and exclusive territories.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button className="bg-voltly-purple hover:bg-voltly-purple/90 text-white font-bold">
                Apply Now
              </Button>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/lovable-uploads/09475fb8-0faa-4a72-a25f-fd2de142c773.png"
              alt="Voltly contractor in uniform standing in front of a large residential home with company van"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <ProNetworkCarousel />

      {/* Main Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-black/90 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            What's Included in a <span className="text-voltly-green">Voltly Pro License</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Each licensed contractor (individual or company) gets access to our complete suite of tools, 
            resources, and marketing to grow their business under the Voltly brand.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand License Card */}
            <Card className="bg-black/80 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <BadgeCheck className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Brand License</CardTitle>
                <CardDescription className="text-gray-400">Market under our premium brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Permission to market as "Voltly Certified Pro"</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Local area marketing kits (yard signs, wraps, uniforms)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Use of Voltly logos, testimonials, and social proof</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Lead Access Card */}
            <Card className="bg-black/80 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Lead Access</CardTitle>
                <CardDescription className="text-gray-400">Pre-qualified customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Service and install leads in your licensed territory</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">"Claim and dispatch" via the Voltly app or portal</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Tiered pricing: e.g., 10% referral cut or flat fees</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Tech Toolkit Card */}
            <Card className="bg-black/80 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Laptop className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Tech Toolkit</CardTitle>
                <CardDescription className="text-gray-400">Complete business platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Access to backend dashboard to view jobs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Upload install photos and completion docs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Integrated VaultPay financing tools</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Training Card */}
            <Card className="bg-black/80 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Installer Standards + Training</CardTitle>
                <CardDescription className="text-gray-400">Quality assurance and support</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Onboarding checklist</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Brand guidelines</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Optional certification videos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Optional site audits</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Territory Card */}
            <Card className="bg-black/80 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Exclusive Territory Rights</CardTitle>
                <CardDescription className="text-gray-400">Secure your service area</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Lock in postal codes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Lock in service zones</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Volume incentives</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Multi-zone pricing options</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Who Should Join Section */}
      <section className="py-16 bg-gradient-to-b from-black to-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Who Should <span className="text-voltly-green">Join the Network?</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            The Voltly Pro Network is ideal for contractors looking to grow their business, increase 
            their service reach, and operate under a premium technology-enabled brand.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contractor Card */}
            <Card className="bg-gradient-to-br from-black/90 to-black/70 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Independent Contractors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Solo professionals and small teams looking to compete with larger companies by leveraging 
                  our brand recognition and lead generation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Get consistent leads without heavy marketing costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Focus on service quality instead of customer acquisition</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Established Business Card */}
            <Card className="bg-gradient-to-br from-black/90 to-black/70 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">Established Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Mid-sized companies looking to expand their service offerings or enter new markets 
                  without the risk of building brand presence from scratch.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Add premium services under a recognized brand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Use our tech platform to streamline operations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* New Market Entrants Card */}
            <Card className="bg-gradient-to-br from-black/90 to-black/70 border-voltly-purple/20 text-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-voltly-green/20 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-voltly-green" />
                </div>
                <CardTitle className="text-xl">New Market Entrants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Entrepreneurs with industry experience looking to start their own business 
                  with immediate credibility and a proven system.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Launch with a turnkey business model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Start generating revenue immediately</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-black to-black/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-black/90 to-black/70 border border-voltly-purple/20 rounded-xl p-8 text-center">
            <ShieldCheck className="h-16 w-16 text-voltly-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to <span className="text-voltly-green">Join the Network?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Take the first step towards growing your business with the Voltly Pro Network. Apply now 
              to check if your area is available and learn more about licensing opportunities.
            </p>
            <div className="flex flex-wrap justify-center">
              <Button size="lg" className="bg-voltly-purple hover:bg-voltly-purple/90 text-white font-bold">
                Apply to Join
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProNetworkPage;
