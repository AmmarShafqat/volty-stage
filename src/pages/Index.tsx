
import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import ProNetworkCarousel from "@/components/pro-network/ProNetworkCarousel";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServiceCategories />
      
      {/* Pro Network Carousel */}
      <ProNetworkCarousel />
    </Layout>
  );
};

export default Index;
