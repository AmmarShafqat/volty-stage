
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./chat/ChatWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Handle scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 dark:bg-black">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      {/* Chat Widget */}
      <ChatWidget />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-24 z-50 bg-voltly-green text-black hover:bg-voltly-green/90 rounded-full p-3 shadow-lg transition-all duration-300"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Layout;
