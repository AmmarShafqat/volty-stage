import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const ServiceCategories = () => {
  const isMobile = useIsMobile();
  const categories = [{
    id: "air-conditioners",
    name: "Air Conditioners",
    description: "Efficient Midea air conditioning systems",
    image: "/lovable-uploads/384031be-24ef-4c43-9bd5-e92be3cc0267.png"
  }, {
    id: "heat-pumps",
    name: "Heat Pumps",
    description: "Energy-efficient Kepler Series with rebates available",
    image: "/lovable-uploads/f385d44a-5401-4c14-9248-cc1d4231a25e.png"
  }, {
    id: "furnaces",
    name: "Furnaces",
    description: "High-quality Lennox Merit Series furnaces",
    image: "/lovable-uploads/e6f95724-177a-4d78-a355-5238a271a9a8.png"
  }, {
    id: "tankless",
    name: "Tankless",
    description: "Rinnai, Kepler, and Navien water heaters",
    image: "/lovable-uploads/2044c443-f1dd-4502-9cc5-46c61fbf34ac.png"
  }, {
    id: "smart-battery",
    name: "Smart Battery",
    description: "Home battery systems for energy independence",
    image: "/lovable-uploads/b9266618-80ee-487f-a576-c62678645588.png"
  }, {
    id: "electrical",
    name: "Electrical Panel",
    description: "Professional panel upgrades for modern homes",
    image: "/lovable-uploads/ae08fea6-c911-4ef3-ba57-235af9ee54f5.png"
  }, {
    id: "ev-charger",
    name: "EV Charger",
    description: "Coming Soon - Home charging stations for electric vehicles",
    image: "/lovable-uploads/aecd1800-e40f-495e-a327-f9f86b4b41bd.png",
    comingSoon: true
  }, {
    id: "solar-panels",
    name: "Solar Panels",
    description: "Coming Soon - Sustainable energy solutions for your home",
    image: "/lovable-uploads/a000f654-e155-4cfc-8f1e-2a08de281843.png",
    comingSoon: true
  }];
  
  return <section id="service-categories" className="py-12 md:py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Our Service Categories
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-2">
            Browse our comprehensive range of home comfort solutions designed to optimize your space for maximum efficiency and comfort.
          </p>
        </div>

        {/* Regular Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map(category => 
            <div key={category.id} className="service-card bg-black border border-gray-800 rounded-lg overflow-hidden h-full relative">
              <div className={`${isMobile ? 'h-32' : 'h-48'} relative`}>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-contain p-2" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded"></div>
                {category.comingSoon && <div className="absolute top-0 right-0 bg-voltly-purple text-white px-2 py-1 text-xs md:text-sm md:px-3 rounded-bl-lg font-medium">
                    Coming Soon
                  </div>}
              </div>
              <div className="p-3 md:p-5">
                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-white">{category.name}</h3>
                <p className="text-xs md:text-sm text-gray-400 mb-3">{category.description}</p>
                {category.comingSoon ? (
                  <Button 
                    disabled 
                    className="w-full bg-gray-600 text-gray-400 hover:bg-gray-600 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Link to={`/${category.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <Button className="w-full bg-voltly-green hover:bg-voltly-green/90 text-black font-semibold">
                      Shop Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>;
};
export default ServiceCategories;
