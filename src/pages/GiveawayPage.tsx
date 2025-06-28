import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Ticket, Trophy, Info } from "lucide-react";

const GiveawayPage = () => {
  const scrollToServiceCategories = () => {
    // Scroll to service categories section on homepage
    window.location.href = "/#service-categories";
  };

  return (
    <Layout>
      <div className="bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-1 rounded-full mb-4">
                <span className="text-voltly-green text-sm font-semibold mr-2">COMING SOON</span>
                <span className="text-sm text-white">Win a Tesla Model Y</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Voltly's First Tesla <span className="text-voltly-green">Giveaway</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                We're giving away a brand new Tesla Model Y to one lucky customer. The more you spend on Voltly products and services, the higher your chances to win!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-[#00FF7F] hover:bg-[#00FF7F]/90 text-black font-bold rounded-md px-6 py-6 h-auto"
                  onClick={scrollToServiceCategories}
                >
                  Shop Now to Earn Entries
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  className="bg-[#4169E1] hover:bg-[#4169E1]/90 text-white border-none font-medium py-6 h-auto"
                >
                  View Legal Documents
                </Button>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-900/50 p-4 rounded-lg border border-voltly-purple/20">
                <Ticket className="h-6 w-6 text-voltly-green flex-shrink-0" />
                <span className="text-white">Every $1,000 spent = 1 entry. No purchase limit!</span>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Tesla Model Y" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
                <span className="text-voltly-green font-bold">MODEL Y</span>
                <p className="text-white text-sm">Electric SUV - Est. Value $55,000 CAD</p>
              </div>
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">How the Giveaway Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <div className="h-12 w-12 flex items-center justify-center bg-voltly-green text-black rounded-full mb-4 font-bold text-xl">1</div>
                <h3 className="text-xl font-bold mb-2 text-white">Shop Voltly Products</h3>
                <p className="text-gray-300">
                  Browse our selection of energy-efficient products and make a purchase through our website or in-store.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <div className="h-12 w-12 flex items-center justify-center bg-voltly-green text-black rounded-full mb-4 font-bold text-xl">2</div>
                <h3 className="text-xl font-bold mb-2 text-white">Earn Entries</h3>
                <p className="text-gray-300">
                  For every $1,000 you spend, you'll receive 1 entry into the Tesla Model Y giveaway. Spend $5,000 and get 5 entries!
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <div className="h-12 w-12 flex items-center justify-center bg-voltly-green text-black rounded-full mb-4 font-bold text-xl">3</div>
                <h3 className="text-xl font-bold mb-2 text-white">Win a Tesla</h3>
                <p className="text-gray-300">
                  After the giveaway period ends, we'll randomly select one winner to receive a brand new Tesla Model Y.
                </p>
              </div>
            </div>
          </div>
          
          {/* Rules & Terms Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Giveaway Rules & Terms</h2>
            
            <div className="bg-gray-900/50 border border-voltly-purple/20 p-8 rounded-xl">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Eligibility</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Open to legal residents of Canada who are at least 18 years old at time of entry</li>
                  <li>Valid driver's license required to claim the vehicle prize</li>
                  <li>Employees of Voltly, its affiliates, subsidiaries, and immediate family members are not eligible</li>
                  <li>Void where prohibited by law</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Entry Period</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>The exact start and end dates of the giveaway will be announced soon</li>
                  <li>Entries are earned through qualifying purchases during the entry period</li>
                  <li>All entries must be received by 11:59 PM EST on the final day of the entry period</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Entry Calculation</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>One (1) entry is awarded for every $1,000 CAD spent on Voltly products and services</li>
                  <li>Entry count is calculated based on pre-tax merchandise total</li>
                  <li>Shipping, installation fees, and taxes do not count toward entry calculation</li>
                  <li>No limit to the number of entries one person can earn</li>
                  <li>No purchase necessary entry option available (see alternate entry method)</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Prize Details</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>One (1) Tesla Model Y, standard configuration (estimated value: $55,000 CAD)</li>
                  <li>Color and options subject to availability</li>
                  <li>Winner is responsible for registration, insurance, and any applicable taxes</li>
                  <li>Prize is non-transferable and cannot be exchanged for cash value</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Selection of Winner</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Winner will be selected by random drawing from all eligible entries</li>
                  <li>Drawing will be conducted within 14 days after the end of the entry period</li>
                  <li>Odds of winning depend on the total number of entries received</li>
                  <li>Winner will be notified via email and/or phone within 5 business days of the drawing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Additional Terms</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>By participating, entrants agree to be bound by these official rules</li>
                  <li>Winner may be required to sign and return an affidavit of eligibility and liability/publicity release</li>
                  <li>Voltly reserves the right to modify or cancel the giveaway at any time</li>
                  <li>For complete terms and conditions, see our legal documents</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-900/30 border border-voltly-purple/20">
              <Info className="text-voltly-green h-5 w-5" />
              <p className="text-gray-300 text-center">
                Full legal terms and conditions available upon request. Contact <span className="text-voltly-green">support@voltly.com</span> for details.
              </p>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-white">When will the giveaway start?</h3>
                <p className="text-gray-300">
                  The official start date will be announced soon. Follow our social media channels and check our website for updates.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-white">How will I know how many entries I have?</h3>
                <p className="text-gray-300">
                  Your current entry count will be displayed in your cart and on your account dashboard once the giveaway officially launches.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-white">Can I participate without making a purchase?</h3>
                <p className="text-gray-300">
                  Yes, you can enter without purchase by mailing a handwritten 3x5 card with your name, address, email and phone number to our headquarters. Each mail-in entry receives one entry. Limit one mail-in entry per person per day.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-voltly-purple/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-white">What if I don't want the Tesla Model Y?</h3>
                <p className="text-gray-300">
                  The prize is offered as-is and cannot be exchanged for cash value. However, if you choose not to accept the vehicle, we may offer an alternate prize of equal or lesser value at our discretion.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Earning Entries?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Shop our energy-efficient products now and start collecting entries for your chance to win a brand new Tesla Model Y!
            </p>
            <Button 
              className="bg-[#00FF7F] hover:bg-[#00FF7F]/90 text-black font-bold rounded-md px-8 py-6 h-auto text-lg"
              onClick={scrollToServiceCategories}
            >
              Shop Now to Earn Entries
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <div className="mt-8 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-voltly-green" />
              <span className="text-white font-medium">Our First Giveaway - Stay Tuned for Launch Details!</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiveawayPage;
