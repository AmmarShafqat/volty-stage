
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Trophy, Ticket, AppWindow, Clock, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const TeslaGiveaway = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="tesla-banner py-16">
      <div className="container mx-auto px-4">
        <Carousel 
          className="w-full" 
          autoplay={true} 
          autoplayInterval={8000}
          opts={{
            align: "center",
            containScroll: "trimSnaps",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {/* Slide 1: Voltly App Coming Soon */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-full lg:basis-5/6">
              <div className="bg-gradient-to-r from-black to-black/80 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">COMING SOON</span>
                      <span className="text-sm text-white">Voltly Mobile App</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Manage Your Home Services </span>
                      <span className="text-voltly-green">On The Go</span>
                    </h2>
                    
                    <p className="text-gray-300 mb-4">
                      The all-new Voltly App puts home services in your pocket. Book repairs, track technicians in real-time, shop products, and schedule installations - all from your smartphone.
                    </p>
                    
                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <AppWindow className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white">One-tap service booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white">Live technician ETA tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-voltly-green flex-shrink-0" />
                        <span className="text-white">Available in Ontario, Alberta & Vancouver</span>
                      </div>
                    </div>
                    
                    <Button className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold w-full md:w-auto rounded-md flex items-center gap-2" asChild>
                      <Link to="/voltly-app">
                        Learn More <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/2d575dc5-d942-425e-b4d4-2a7755a1a10d.png" 
                        alt="Voltly Mobile App" 
                        className="h-full w-auto object-contain z-10"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2: Tesla Giveaway */}
            <CarouselItem className="pl-4 md:pl-6 md:basis-full lg:basis-5/6">
              <div className="bg-gradient-to-r from-black to-black/80 border border-voltly-purple/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                      <span className="text-voltly-green text-sm font-semibold mr-2">COMING SOON</span>
                      <span className="text-sm text-white">Win a Tesla Model Y</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">Every $1,000 Spent = </span>
                      <span className="text-voltly-green">1 Entry</span>
                    </h2>
                    
                    <p className="text-gray-300 mb-4">
                      The more you spend, the higher your chances to win! Each $1,000 spent on Voltly products or services gives you one entry into our Tesla Model Y giveaway.
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Ticket className="h-5 w-5 text-voltly-green flex-shrink-0" />
                      <span className="text-white">Entry count shows in your cart</span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <Trophy className="h-6 w-6 text-voltly-green mr-2" />
                      <span className="text-white font-medium">Our First Giveaway! Stay tuned for launch details.</span>
                    </div>
                    
                    <Button className="bg-[#00FF7F] hover:bg-[#00FF7F]/90 text-black font-bold w-full md:w-auto rounded-md" asChild>
                      <Link to="/giveaway">Learn More</Link>
                    </Button>
                  </div>
                  
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
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

export default TeslaGiveaway;
