
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrustBanner from "@/components/product/TrustBanner";
import { 
  Smartphone, 
  Clock, 
  Calendar, 
  MapPin, 
  CreditCard, 
  ShoppingCart, 
  Wrench,
  HomeIcon,
  Bell,
  CheckCircle,
  Star,
  AppWindow,
  ArrowRight
} from "lucide-react";

const VoltlyAppPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black text-white pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-black/40 border border-voltly-purple/30 px-4 py-2 rounded-full mb-6">
                <span className="text-voltly-green text-sm font-semibold mr-2">COMING SOON</span>
                <span className="text-sm text-white">Q3 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                The Voltly App
                <span className="block text-voltly-green mt-2">Home Services Reimagined</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Manage all your home service needs from one powerful app. From emergency repairs to product installations, 
                the Voltly App gives you complete control with real-time updates and seamless scheduling.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-black border border-voltly-purple hover:bg-black/80 text-white py-6 flex items-center justify-center gap-2">
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="text-lg font-bold">App Store</span>
                  </div>
                </Button>
                
                <Button className="bg-black border border-voltly-purple hover:bg-black/80 text-white py-6 flex items-center justify-center gap-2">
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Get it on</span>
                    <span className="text-lg font-bold">Google Play</span>
                  </div>
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-400">
                <Bell className="h-4 w-4 mr-2 text-voltly-green" />
                <span>Sign up below to be notified when the app launches</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative mx-auto w-[280px] h-[560px] bg-gray-900 rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden">
                {/* App screen mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900">
                  {/* App UI elements */}
                  <div className="p-6 h-full flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-xs text-white">9:41</div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-voltly-green"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                    </div>
                    
                    {/* App header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <div className="text-xl text-white font-bold">VOLTLY</div>
                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-xs text-white">JD</span>
                        </div>
                      </div>
                      <div className="text-voltly-green text-sm">Smart Home Services</div>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-voltly-purple/20">
                        <Wrench className="h-5 w-5 text-voltly-green mb-2" />
                        <div className="text-white text-sm font-medium">Book Repair</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-voltly-purple/20">
                        <ShoppingCart className="h-5 w-5 text-voltly-green mb-2" />
                        <div className="text-white text-sm font-medium">Shop Products</div>
                      </div>
                    </div>
                    
                    {/* Active service */}
                    <div className="bg-black/40 border border-voltly-purple/20 rounded-xl p-4 mb-6">
                      <div className="text-voltly-green text-xs mb-1">ACTIVE SERVICE</div>
                      <div className="text-white font-medium mb-2">HVAC Maintenance</div>
                      <div className="flex items-center mb-3">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-300 text-xs">Technician arriving in ~45 min</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-voltly-green h-full w-2/3"></div>
                      </div>
                    </div>
                    
                    {/* Recent activity */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-white text-sm font-medium">Recent Activity</div>
                        <div className="text-voltly-green text-xs">View All</div>
                      </div>
                      <div className="bg-gray-800/30 rounded-lg p-3 mb-2 border border-gray-800">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white text-xs font-medium">Smart Battery Installation</div>
                            <div className="text-gray-400 text-xs">Completed • April 15</div>
                          </div>
                          <CheckCircle className="h-4 w-4 text-voltly-green" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom notch */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-full"></div>
              </div>
              
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-voltly-purple/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-voltly-green/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need In One App</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Voltly App brings together all your home service needs in one place, with intuitive features designed to make managing your home easier than ever.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-voltly-green/10 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-voltly-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">On-Demand Repairs</h3>
              <p className="text-gray-600">
                Book emergency repairs or schedule maintenance with just a few taps. Connect with certified technicians in your area instantly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-voltly-green/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-voltly-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Live Tracking</h3>
              <p className="text-gray-600">
                See exactly when your technician will arrive with real-time GPS tracking and minute-by-minute ETA updates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-voltly-green/10 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-voltly-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Shop & Install</h3>
              <p className="text-gray-600">
                Browse energy-saving products, make purchases, and schedule professional installation all through the app.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Screenshots Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Designed For Simplicity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See why homeowners across Canada are choosing Voltly for their home service needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="bg-gray-100 rounded-xl h-60 mb-4 flex items-center justify-center">
                <div className="text-center px-6">
                  <AppWindow className="h-10 w-10 text-voltly-green mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Book service screen</p>
                </div>
              </div>
              <h3 className="font-medium">Quick Booking</h3>
              <p className="text-sm text-gray-600">Book a service in under 60 seconds</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="bg-gray-100 rounded-xl h-60 mb-4 flex items-center justify-center">
                <div className="text-center px-6">
                  <MapPin className="h-10 w-10 text-voltly-green mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Technician tracking screen</p>
                </div>
              </div>
              <h3 className="font-medium">Live ETA Updates</h3>
              <p className="text-sm text-gray-600">Know exactly when help will arrive</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="bg-gray-100 rounded-xl h-60 mb-4 flex items-center justify-center">
                <div className="text-center px-6">
                  <ShoppingCart className="h-10 w-10 text-voltly-green mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Product catalog screen</p>
                </div>
              </div>
              <h3 className="font-medium">Shop Products</h3>
              <p className="text-sm text-gray-600">Browse and purchase energy-saving products</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="bg-gray-100 rounded-xl h-60 mb-4 flex items-center justify-center">
                <div className="text-center px-6">
                  <Calendar className="h-10 w-10 text-voltly-green mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Installation scheduling screen</p>
                </div>
              </div>
              <h3 className="font-medium">Easy Scheduling</h3>
              <p className="text-sm text-gray-600">Pick the perfect time for installation</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-voltly-green text-black hover:bg-voltly-green/90">
              Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Areas Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Areas</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The Voltly App is currently available in these regions, with more coming soon:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black border-voltly-purple/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-voltly-green" /> Ontario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Full service coverage across major cities including Toronto, Ottawa, Hamilton, 
                  London, Windsor, Kingston, and surrounding areas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-voltly-purple/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-voltly-green" /> Alberta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Complete coverage in Calgary, Edmonton, Red Deer, Lethbridge, 
                  Medicine Hat, and surrounding communities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-voltly-purple/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-voltly-green" /> Vancouver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Service throughout Greater Vancouver, including Burnaby, Richmond, 
                  Surrey, Coquitlam, and North Vancouver.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Notification Signup Section */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl text-white font-bold mb-6">
              Be the First to Know
            </h2>
            <p className="text-gray-300 mb-8">
              Sign up to be notified when the Voltly App launches in your area. Get early access 
              and exclusive promotions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="rounded-md px-4 py-3 flex-grow bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-voltly-green"
              />
              <Button className="bg-voltly-green text-black hover:bg-voltly-green/90 py-3">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about the Voltly App
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>When will the Voltly App be available?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The Voltly App is scheduled to launch in Q3 2025. Sign up for our notification list to be among the first to know when it's available in your area.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Is the app free to download?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Yes, the Voltly App will be completely free to download and use. You only pay for the services or products you purchase through the app.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Will my data be secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Absolutely. We use industry-leading encryption and security practices to ensure your personal and payment information remains safe and protected.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What types of services can I book through the app?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You can book a wide range of home services including electrical repairs, HVAC maintenance, smart home installations, plumbing services, and more.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>How quickly can I get emergency service?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>For emergency services, we aim to connect you with a technician within 60 minutes in most service areas. The app will provide you with the exact ETA once your request is accepted.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Are all technicians licensed and insured?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Yes, all Voltly service providers are thoroughly vetted, licensed, insured, and undergo background checks. You can view their credentials and ratings in the app.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="technical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Which devices will the app support?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The Voltly App will be available for iOS devices running iOS 13 or later and Android devices running Android 8.0 (Oreo) or later.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Will the app work offline?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Some basic features will be available offline, but core functionality such as booking services and tracking technicians requires an internet connection for real-time updates.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>How are payments processed in the app?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The app securely processes payments through Stripe. We accept all major credit cards, Apple Pay, Google Pay, and Interac (in Canada).</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <TrustBanner />
    </Layout>
  );
};

export default VoltlyAppPage;
