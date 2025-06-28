import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

import {
  LucideShield,
  Users,
  Map,
  Wrench,
  Laptop,
  BadgeCheck,
} from "lucide-react";

const ProNetworkCarousel = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleExploreClick = () => {
    navigate("/pro-network");
  };

  return (
    <div className="pro-network-carousel py-16 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto px-4">
        {/* Added section title */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white">Join The</span> <span className="text-voltly-green">Voltly Pro Network</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            License our brand for your HVAC, plumbing, electrical, or smart energy business
          </p>
        </div>
        
        <Carousel 
          className="w-full" 
          autoplay={true} 
          autoplayInterval={10000}
          opts={{
            align: "center",
            containScroll: "trimSnaps",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {/* Slide 1: Overview */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-4/5 lg:basis-3/4">
              <div className="bg-gradient-to-r from-black to-black/90 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">NEW</span>
                      <span className="text-sm text-white">For Contractors</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Join The </span>
                      <span className="text-voltly-green">Voltly Pro Network</span>
                    </h2>
                    
                    <p className="text-gray-300 mb-6">
                      License the Voltly brand for your HVAC, plumbing, electrical, or smart energy business.
                      Get pre-qualified leads and access to our complete tech toolkit.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white text-sm">Brand License</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white text-sm">Lead Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Laptop className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white text-sm">Tech Toolkit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white text-sm">Training</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md" 
                      onClick={handleExploreClick}
                    >
                      Explore Pro Network
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2: Brand License */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-4/5 lg:basis-3/4">
              <div className="bg-gradient-to-r from-black to-black/90 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">BENEFIT</span>
                      <span className="text-sm text-white">Brand License</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Market Under A </span>
                      <span className="text-voltly-green">Premium Brand</span>
                    </h2>
                    
                    <ul className="text-gray-300 mb-6 space-y-3">
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Market your business as a "Voltly Certified Pro"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Receive local marketing kits including yard signs, wraps, and uniforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Access to Voltly logos, testimonials, and social proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Operate under a premium tech-enabled brand without building costs</span>
                      </li>
                    </ul>
                    
                    <Button 
                      className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md" 
                      onClick={handleExploreClick}
                    >
                      Learn About Brand Benefits
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 3: Leads Access */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-4/5 lg:basis-3/4">
              <div className="bg-gradient-to-r from-black to-black/90 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">BENEFIT</span>
                      <span className="text-sm text-white">Lead Access</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Pre-Qualified </span>
                      <span className="text-voltly-green">Service Leads</span>
                    </h2>
                    
                    <ul className="text-gray-300 mb-6 space-y-3">
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Receive service and installation leads in your licensed territory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>"Claim and dispatch" jobs through our easy-to-use app and portal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Tiered pricing options: 10% referral cut or flat install fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>No need to spend on expensive marketing campaigns</span>
                      </li>
                    </ul>
                    
                    <Button 
                      className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md" 
                      onClick={handleExploreClick}
                    >
                      See Lead Program Details
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 4: Tech Toolkit */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-4/5 lg:basis-3/4">
              <div className="bg-gradient-to-r from-black to-black/90 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">BENEFIT</span>
                      <span className="text-sm text-white">Tech Toolkit</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Complete </span>
                      <span className="text-voltly-green">Business Platform</span>
                    </h2>
                    
                    <ul className="text-gray-300 mb-6 space-y-3">
                      <li className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Access backend dashboard to view and manage jobs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Upload installation photos and completion documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Collect payments and trigger Tesla giveaway entries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Integrated VaultPay financing tools pre-embedded</span>
                      </li>
                    </ul>
                    
                    <Button 
                      className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md" 
                      onClick={handleExploreClick}
                    >
                      Explore Our Technology
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 5: Territory Rights */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-4/5 lg:basis-3/4">
              <div className="bg-gradient-to-r from-black to-black/90 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">BENEFIT</span>
                      <span className="text-sm text-white">Exclusive Territory</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Secure Your </span>
                      <span className="text-voltly-green">Service Territory</span>
                    </h2>
                    
                    <ul className="text-gray-300 mb-6 space-y-3">
                      <li className="flex items-start gap-2">
                        <Map className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Lock in exclusive postal codes or service zones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Volume incentives for hitting installation targets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Optional multi-zone pricing if you want to scale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="h-5 w-5 text-voltly-green flex-shrink-0 mt-1" />
                        <span>Guaranteed exclusivity in your service area</span>
                      </li>
                    </ul>
                    
                    <Button 
                      className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md" 
                      onClick={handleExploreClick}
                    >
                      Check Available Territories
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className={`${isMobile ? 'ml-1' : 'ml-6 md:ml-12'} bg-black/70 border border-voltly-purple/30 text-white hover:bg-black`} />
          <CarouselNext className={`${isMobile ? 'mr-1' : 'mr-6 md:mr-12'} bg-black/70 border border-voltly-purple/30 text-white hover:bg-black`} />
        </Carousel>
      </div>
    </div>
  );
};

export default ProNetworkCarousel;
