
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BookingButton from "@/components/booking/BookingButton";
const Hero = () => {
  const handleBrowseClick = () => {
    // Smooth scroll to the service categories section
    const serviceSection = document.getElementById("service-categories");
    if (serviceSection) {
      serviceSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Background patterns and effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/lovable-uploads/b205d65b-f1d9-4de1-946d-8d1a3e365b2f.png')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        
        {/* Animated orbs */}
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-voltly-green/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-40 w-32 h-32 bg-voltly-purple/30 rounded-full filter blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-voltly-purple/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-40 w-40 h-40 bg-voltly-green/20 rounded-full filter blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-white">Shop HVAC Online</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-voltly-green to-voltly-purple">
                Buy Now, Pay Later
              </span>
            </h1>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <Button variant="outline" className="border-white bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 text-lg font-bold px-12 py-6 rounded-md shadow-lg" onClick={handleBrowseClick}>
                Browse Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <BookingButton className="bg-voltly-green hover:bg-voltly-green/90 text-black text-lg font-bold px-12 py-6 rounded-md shadow-lg">
                Book a Repair
              </BookingButton>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;
