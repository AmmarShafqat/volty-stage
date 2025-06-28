
import React from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-voltly-green" />
              <span className="text-xl font-bold text-white">VOLTLY</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Shop Online. Delivered & Installed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-voltly-green">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-voltly-green">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-voltly-green">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink to="/heat-pumps">Heat Pumps</FooterLink>
              <FooterLink to="/furnaces">Furnaces</FooterLink>
              <FooterLink to="/tankless">Tankless Water Heaters</FooterLink>
              <FooterLink to="/air-conditioners">Air Conditioners</FooterLink>
              <FooterLink to="/insulation">Insulation</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/shipping-policy">Shipping & Installation</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-voltly-green" />
                <span>(844) 629-4333</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-voltly-green" />
                <span>govoltly@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-voltly-green mt-0.5" />
                <span>80 Dynamic Dr, Unit 21<br />Toronto, ON<br />M1V 2V1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Voltly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-voltly-green transition-colors">
        {children}
      </Link>
    </li>
  );
};

export default Footer;
