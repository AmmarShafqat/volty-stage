import { Product } from "../ProductCard";

// Helper function to get concise sizing badge text
export function getSizingBadgeText(product: Product): string | null {
  switch (product.category) {
    case "heat-pumps":
      if (product.name.includes("2-3 ton")) {
        return "1,000-2,000 sq ft";
      } else if (product.name.includes("2.5 ton")) {
        return "1,500-2,200 sq ft";
      } else if (product.name.includes("2 ton")) {
        return "1,000-1,400 sq ft";
      } else if (product.name.includes("3 ton")) {
        return "1,400-2,800 sq ft";
      } else if (product.name.includes("4 ton")) {
        return "2,800-3,500 sq ft";
      }
      return "2 ton system";
    
    case "air-conditioners":
      if (product.name.includes("1.5 ton")) {
        return "1,000-1,500 sq ft";
      } else if (product.name.includes("2 ton")) {
        return "1,600-2,100 sq ft";
      } else if (product.name.includes("2.5 ton")) {
        return "2,200-2,600 sq ft";
      } else if (product.name.includes("3 ton")) {
        return "2,700-3,200 sq ft";
      } else if (product.name.includes("3.5 ton")) {
        return "3,300-3,700 sq ft";
      } else if (product.name.includes("4 ton")) {
        return "3,800-4,200 sq ft";
      } else if (product.name.includes("5 ton")) {
        return "4,300-5,000 sq ft";
      }
      return "2 ton system";
      
    case "furnaces":
      if (product.name.includes("045")) {
        return "< 1,200 sq ft";
      } else if (product.name.includes("070")) {
        return "1,200-2,000 sq ft";
      } else if (product.name.includes("090")) {
        return "2,000-3,000 sq ft";
      }
      return "70,000 BTU";
      
    case "tankless":
      if (product.name.includes("RX160")) {
        return "1-2 bathrooms";
      } else if (product.name.includes("RX199")) {
        return "2-4 bathrooms";
      } else if (product.name.includes("JSG52")) {
        return "1-2 bathrooms";
      }
      return "6.0 GPM";
      
    case "smart-battery":
      if (product.name.includes("10kWh")) {
        return "15-25 kWh daily";
      } else if (product.name.includes("15kWh")) {
        return "25-40 kWh daily";
      } else if (product.name.includes("20kWh")) {
        return "35-55 kWh daily";
      }
      return "10 kWh capacity";
      
    case "insulation":
      return "Per sq ft coverage";
      
    case "electrical":
      return "Up to 3,000 sq ft";
      
    default:
      return null;
  }
}

// Helper functions to provide default technical details based on product category
export function getDefaultTechnicalDetails(product: Product) {
  switch (product.category) {
    case "heat-pumps":
      return [
        { name: "SEER Rating", value: product.seerRating || "21.5" },
        { name: "BTU Rating", value: product.btuRating?.toLocaleString() || 
                                     (product.name.includes("2-3 ton") ? "30,000" :
                                      product.name.includes("2 ton") ? "24,000" : 
                                      product.name.includes("3 ton") ? "36,000" : 
                                      product.name.includes("4 ton") ? "48,000" : "24,000") },
        { name: "Refrigerant", value: "R410A" },
        { name: "Energy Star", value: product.energyStar ? "Yes" : "No" },
        { name: "Compressor Type", value: product.variableSpeed ? "Variable Speed" : "Single Speed" },
        ...(product.model ? [{ name: "Model", value: product.model }] : [])
      ];
    case "smart-battery":
      return [
        { name: "Capacity", value: product.name.includes("10kWh") ? "10 kWh" : 
                                   product.name.includes("15kWh") ? "15 kWh" : 
                                   product.name.includes("20kWh") ? "20 kWh" : "10 kWh" },
        { name: "Voltage", value: "240V" },
        { name: "Warranty", value: "10 years" },
        { name: "Solar Compatible", value: "Yes" },
        { name: "Power Output", value: product.name.includes("10kWh") ? "7.6 kW" : 
                                       product.name.includes("15kWh") ? "9.6 kW" : 
                                       product.name.includes("20kWh") ? "12 kW" : "7.6 kW" }
      ];
    case "furnaces":
      return [
        { name: "AFUE Rating", value: "96%" },
        { name: "BTU Input", value: product.name.includes("045") ? "45,000" :
                                   product.name.includes("070") ? "70,000" :
                                   product.name.includes("090") ? "90,000" : "70,000" },
        { name: "Heating Stages", value: "2" },
        { name: "Cabinet Width", value: "17.5 inches" },
        { name: "Motor Type", value: "Variable Speed ECM" }
      ];
    case "tankless":
      return [
        { name: "Flow Rate", value: product.name.includes("RX160") ? "6.0 GPM" :
                                   product.name.includes("RX199") ? "9.8 GPM" :
                                   product.name.includes("JSG52") ? "5.2 GPM" : "6.0 GPM" },
        { name: "Energy Factor", value: "0.95" },
        { name: "Fuel Type", value: "Natural Gas" },
        { name: "BTU Input", value: product.name.includes("RX160") ? "160,000" :
                                   product.name.includes("RX199") ? "199,000" :
                                   product.name.includes("JSG52") ? "180,000" : "160,000" }
      ];
    case "air-conditioners":
      return [
        { name: "SEER Rating", value: "16" },
        { name: "BTU Rating", value: product.name.includes("1.5 ton") ? "18,000" : 
                                   product.name.includes("2 ton") ? "24,000" :
                                   product.name.includes("2.5 ton") ? "30,000" :
                                   product.name.includes("3 ton") ? "36,000" :
                                   product.name.includes("3.5 ton") ? "42,000" :
                                   product.name.includes("4 ton") ? "48,000" :
                                   product.name.includes("5 ton") ? "60,000" : "24,000" },
        { name: "Refrigerant", value: "R410A" },
        { name: "Sound Rating", value: "72 dB" },
        { name: "Dimensions", value: "29.75\"W x 29.75\"D x 32.5\"H" }
      ];
    case "insulation":
      return [
        { name: "R-Value", value: "R-60" },
        { name: "Material", value: "Blown-in Fiberglass" },
        { name: "Coverage", value: "Per square foot" },
        { name: "Air Barrier", value: "Included" },
        { name: "Installation Method", value: "Blown-in" }
      ];
    case "electrical":
      return [
        { name: "Panel Capacity", value: "200 Amp" },
        { name: "Circuit Breakers", value: "42 spaces" },
        { name: "Certification", value: "UL Listed" },
        { name: "Material", value: "Copper Wiring" }
      ];
    default:
      return [
        { name: "Warranty", value: "10 Years Parts, 1 Year Labor" },
        { name: "Certification", value: "Energy Star" },
        { name: "Professional Installation", value: "Included" }
      ];
  }
}

export function getDefaultSpecifications(product: Product) {
  switch (product.category) {
    case "heat-pumps":
      if (product.brand === "Tosot") {
        return [
          "Multi-zone heating and cooling capability",
          "Smart Wi-Fi enabled controls",
          "Ultra-quiet operation below 60 decibels",
          "All-weather performance down to -22°F",
          "Advanced inverter technology for maximum efficiency"
        ];
      }
      return [
        "Variable speed compressor optimizes energy efficiency",
        "Wi-Fi enabled smart control compatibility",
        "Quiet operation as low as 58 decibels",
        "All-season comfort with heating down to -15°C",
        "Compatible with existing ductwork in most homes"
      ];
    case "smart-battery":
      return [
        "Automatic switchover during power outages",
        "Integrated energy management system",
        "Expandable capacity with additional modules",
        "Smartphone app for monitoring and control",
        "Weatherproof outdoor installation option"
      ];
    case "furnaces":
      return [
        "Self-diagnosing control board with error codes",
        "Multi-speed blower motor for precise comfort",
        "Dual fuel capability when paired with heat pump",
        "Ultra-low NOx emissions",
        "Insulated cabinet for quieter operation"
      ];
    case "tankless":
      return [
        "Endless hot water supply",
        "Space-saving wall-mounted design",
        "Temperature control within 1 degree precision",
        "Scale detection to prevent buildup",
        "Recirculation capability for instant hot water"
      ];
    default:
      return [
        "Professional installation included in price",
        "Energy Star certified for utility rebate eligibility",
        "Smart home integration capabilities",
        "Standard 10-year manufacturer warranty"
      ];
  }
}

export function getSizingInfo(product: Product): { title: string; description: string } | undefined {
  switch (product.category) {
    case "heat-pumps":
      let hpSqFt = "";
      let tonSize = "";
      if (product.name.includes("2-3 ton")) {
        hpSqFt = "1,000 - 2,000 sq ft";
        tonSize = "2-3 ton";
      } else if (product.name.includes("2.5 ton")) {
        hpSqFt = "1,500 - 2,200 sq ft";
        tonSize = "2.5 ton";
      } else if (product.name.includes("2 ton")) {
        hpSqFt = "1,000 - 1,400 sq ft";
        tonSize = "2 ton";
      } else if (product.name.includes("3 ton")) {
        hpSqFt = "1,400 - 2,800 sq ft";
        tonSize = "3 ton";
      } else if (product.name.includes("4 ton")) {
        hpSqFt = "2,800 - 3,500 sq ft";
        tonSize = "4 ton";
      }
      return {
        title: "Home Sizing Guide",
        description: `This ${tonSize} heat pump is recommended for homes between ${hpSqFt}.`
      };
    
    case "furnaces":
      let furnaceSqFt = "";
      if (product.name.includes("045")) {
        furnaceSqFt = "< 1,200 sq ft";
      } else if (product.name.includes("070")) {
        furnaceSqFt = "1,200 - 2,000 sq ft";
      } else if (product.name.includes("090")) {
        furnaceSqFt = "2,000 - 3,000 sq ft";
      }
      return {
        title: "Home Sizing Guide",
        description: `This furnace is designed for homes of ${furnaceSqFt}.`
      };
      
    case "air-conditioners":
      let acSqFt = "";
      if (product.name.includes("1.5 ton")) {
        acSqFt = "1,000 - 1,500 sq ft";
      } else if (product.name.includes("2 ton")) {
        acSqFt = "1,600 - 2,100 sq ft";
      } else if (product.name.includes("2.5 ton")) {
        acSqFt = "2,200 - 2,600 sq ft";
      } else if (product.name.includes("3 ton")) {
        acSqFt = "2,700 - 3,200 sq ft";
      } else if (product.name.includes("3.5 ton")) {
        acSqFt = "3,300 - 3,700 sq ft";
      } else if (product.name.includes("4 ton")) {
        acSqFt = "3,800 - 4,200 sq ft";
      } else if (product.name.includes("5 ton")) {
        acSqFt = "4,300 - 5,000 sq ft";
      }
      return {
        title: "Home Sizing Guide",
        description: `This ${product.name.includes("1.5 ton") ? "1.5 ton" : 
                            product.name.includes("2 ton") ? "2 ton" : 
                            product.name.includes("2.5 ton") ? "2.5 ton" : 
                            product.name.includes("3 ton") ? "3 ton" :
                            product.name.includes("3.5 ton") ? "3.5 ton" :
                            product.name.includes("4 ton") ? "4 ton" :
                            product.name.includes("5 ton") ? "5 ton" : ""} 
                      A/C is suitable for homes between ${acSqFt}.`
      };
      
    case "tankless":
      let bathroomCount = "";
      if (product.name.includes("RX160")) {
        bathroomCount = "1-2 bathrooms";
      } else if (product.name.includes("RX199")) {
        bathroomCount = "2-4 bathrooms";
      } else if (product.name.includes("JSG52")) {
        bathroomCount = "1-2 bathrooms";
      }
      return {
        title: "Bathroom Capacity",
        description: `This tankless water heater can support ${bathroomCount} in your home.`
      };
      
    case "smart-battery":
      let dailyUsage = "";
      if (product.name.includes("10kWh")) {
        dailyUsage = "15-25 kWh";
      } else if (product.name.includes("15kWh")) {
        dailyUsage = "25-40 kWh";
      } else if (product.name.includes("20kWh")) {
        dailyUsage = "35-55 kWh";
      }
      return {
        title: "Power Usage Capacity",
        description: `Best for homes with daily electricity usage of ${dailyUsage}.`
      };
      
    case "insulation":
      return {
        title: "Coverage Information",
        description: "Attic area typically requires 1,000-1,300 sq ft for a 1,500 sq ft home."
      };
      
    case "electrical":
      return {
        title: "Home Capacity",
        description: "Suitable for homes up to 3,000 sq ft with standard appliances."
      };
      
    default:
      return undefined;
  }
}
