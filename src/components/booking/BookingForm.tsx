import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAvailableTimeSlots } from "@/hooks/use-available-time-slots";
import { useCart } from "@/contexts/CartContext";
import { useServiceFusion } from "@/hooks/useServiceFusion";
import { formSchema, BookingFormValues, AddressCache } from "@/types/booking";
import ServiceDetailsStep from "./ServiceDetailsStep";
import ScheduleStep from "./ScheduleStep";
import ContactInfoStep from "./ContactInfoStep";
import BookingSummary, { EmailSentDialog } from "./BookingSummary";
import WebhookDialog from "./WebhookDialog";
import { 
  electricalEquipmentTypes, 
  hvacEquipmentTypes, 
  SERVICE_COSTS,
  FREE_TRAVEL_DISTANCE_KM,
  isPriorityTimeframe as checkPriorityTimeframe,
  calculateTravelFee,
  calculateTotalCost as getTotalCost,
  createServiceProduct,
  createTravelFeeProduct,
  sendConfirmationEmail,
  lookupCanadianAddress
} from "@/utils/bookingUtils";

// Zapier webhook configuration
const DEFAULT_WEBHOOK_URL = "";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedServiceType, setSelectedServiceType] = useState<"electrical" | "hvac" | null>(null);
  const { toast } = useToast();
  const { availableTimeSlots, isLoading } = useAvailableTimeSlots(selectedDate);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  const [selectedServiceOption, setSelectedServiceOption] = useState<"standard" | "priority" | "protection" | null>(null);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [travelFee, setTravelFee] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showEmailSentConfirmation, setShowEmailSentConfirmation] = useState(false);
  const { addItem } = useCart();
  const [isPriorityTimeframe, setIsPriorityTimeframe] = useState(false);
  const [addressCache, setAddressCache] = useState<AddressCache>({});
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);
  
  // Add Service Fusion integration
  const { createBookingInServiceFusion, isLoading: isServiceFusionLoading } = useServiceFusion();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      serviceType: undefined,
      homeType: undefined,
      equipmentType: "",
      issueDescription: "",
      serviceOption: "standard",
      agreeToTerms: false,
    },
    mode: "onTouched",
  });

  const watchServiceType = form.watch("serviceType");
  const watchServiceOption = form.watch("serviceOption");
  const watchPostalCode = form.watch("postalCode");
  const watchDate = form.watch("date");
  const watchTimeSlot = form.watch("timeSlot");
  
  const equipmentTypeOptions = watchServiceType === "electrical" 
    ? electricalEquipmentTypes 
    : hvacEquipmentTypes;

  // Update the service type state when the form value changes
  useEffect(() => {
    if (watchServiceType) {
      setSelectedServiceType(watchServiceType);
    }
  }, [watchServiceType]);

  // Update service option state when form value changes
  useEffect(() => {
    if (watchServiceOption) {
      setSelectedServiceOption(watchServiceOption);
    }
  }, [watchServiceOption]);
  
  // Try to load webhook URL and address cache from localStorage on mount
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("serviceFusionWebhookUrl");
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
    }

    // Load address cache from localStorage
    const savedAddressCache = localStorage.getItem("addressCache");
    if (savedAddressCache) {
      try {
        const parsedCache = JSON.parse(savedAddressCache);
        setAddressCache(parsedCache);
      } catch (error) {
        console.error("Error parsing address cache:", error);
      }
    }
  }, []);

  // Save address cache to localStorage when it changes
  useEffect(() => {
    if (Object.keys(addressCache).length > 0) {
      localStorage.setItem("addressCache", JSON.stringify(addressCache));
    }
  }, [addressCache]);

  // Check if selected time is within 6 hours (priority service)
  useEffect(() => {
    if (watchDate && watchTimeSlot) {
      const isPriority = checkPriorityTimeframe(watchDate, watchTimeSlot);
      setIsPriorityTimeframe(isPriority);
      
      if (isPriority) {
        // Only update if not protection plan
        if (watchServiceOption !== "protection") {
          form.setValue("serviceOption", "priority");
        }
        
        // Show toast notification once when detecting priority timeframe
        if (!isPriorityTimeframe) {
          toast({
            title: "Priority Service Required",
            description: "Appointments within 6 hours are automatically set to Priority Service.",
          });
        }
      }
    }
  }, [watchDate, watchTimeSlot, form, toast, watchServiceOption, isPriorityTimeframe]);

  // Lookup and auto-populate address when postal code changes
  useEffect(() => {
    const lookupAddress = async () => {
      if (watchPostalCode && watchPostalCode.length >= 3) {
        // First check if we already have this postal code in cache
        if (addressCache[watchPostalCode]) {
          console.log("Using cached address for postal code:", watchPostalCode);
          const cachedAddress = addressCache[watchPostalCode];
          form.setValue("address", cachedAddress.address);
          toast({
            title: "Address Found",
            description: "Address fields have been auto-filled based on your postal code.",
          });
          return;
        }

        setIsLookingUpAddress(true);
        try {
          console.log("Looking up Canadian address for postal code:", watchPostalCode);
          
          // Look up address using the first three characters of the postal code
          const addressData = lookupCanadianAddress(watchPostalCode);
          
          if (addressData) {
            // Update the form with the found address
            form.setValue("address", addressData.fullAddress);
            
            // Save to cache for future use
            const newCache = {
              ...addressCache,
              [watchPostalCode]: {
                address: addressData.fullAddress,
                city: addressData.city,
                province: addressData.province
              }
            };
            setAddressCache(newCache);
            
            toast({
              title: "Canadian Address Found",
              description: `Address found in ${addressData.city}, ${addressData.province}.`,
            });
            
            // Simulate a realistic distance calculation based on the city
            let simulatedDistance: number;
            if (addressData.city === "Toronto") {
              simulatedDistance = Math.floor(Math.random() * 40) + 5; // 5-45km within Toronto
            } else if (addressData.province === "Ontario") {
              simulatedDistance = Math.floor(Math.random() * 100) + 50; // 50-150km within Ontario
            } else {
              simulatedDistance = Math.floor(Math.random() * 1000) + 500; // 500-1500km for other provinces
            }
            
            setDistanceKm(simulatedDistance);
            
            // Calculate travel fee if distance exceeds free travel distance
            const calculatedTravelFee = calculateTravelFee(simulatedDistance);
            setTravelFee(calculatedTravelFee);
          } else {
            // If no match in our database, show a message
            toast({
              title: "Address Not Found",
              description: "Please enter a valid Canadian postal code (Format: A1A 1A1)",
            });
          }
        } catch (error) {
          console.error("Error looking up address:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to find address for this postal code",
          });
        } finally {
          setIsLookingUpAddress(false);
        }
      }
    };

    lookupAddress();
  }, [watchPostalCode, toast, form, addressCache]);

  // Save webhook URL to localStorage
  const saveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem("serviceFusionWebhookUrl", url);
    setShowWebhookDialog(false);
    toast({
      title: "Webhook URL Saved",
      description: "Your Service Fusion integration is now configured.",
    });
  };

  // Calculate total service cost
  const calculateTotalCost = () => {
    if (!selectedServiceOption) return 0;
    return getTotalCost(selectedServiceOption, travelFee);
  };

  // Submit form and create service order
  const onSubmit = async (data: BookingFormValues) => {
    console.log("Form submitted with data:", data);
    
    // Validate required fields for the current step
    if (currentStep === 3) {
      // Validate all form fields before proceeding
      const isValid = await form.trigger();
      if (!isValid) {
        console.error("Form validation failed");
        toast({
          variant: "destructive",
          title: "Form Error",
          description: "Please complete all required fields correctly.",
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      // Format the appointment date and time for better readability
      const formattedDate = format(data.date, "MMMM d, yyyy");
      const appointmentDateTime = `${formattedDate} at ${data.timeSlot}`;
      
      // Create Service Fusion booking first (this is the primary integration now)
      try {
        // Ensure all required properties are present before calling Service Fusion
        const bookingData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          postalCode: data.postalCode,
          serviceType: data.serviceType,
          homeType: data.homeType,
          equipmentType: data.equipmentType,
          issueDescription: data.issueDescription,
          date: data.date,
          timeSlot: data.timeSlot,
          serviceOption: data.serviceOption,
        };

        await createBookingInServiceFusion(bookingData);
        console.log("Successfully created booking in Service Fusion CRM");
      } catch (serviceFusionError) {
        console.error("Service Fusion integration failed:", serviceFusionError);
        // Continue with the process even if Service Fusion fails
      }
      
      // Create a service product to add to cart
      const serviceProduct = createServiceProduct(data, appointmentDateTime, data.serviceOption);
      
      // Add service to cart
      addItem(serviceProduct);
      
      // If travel fee applies, add it as a separate item
      if (travelFee > 0) {
        const travelFeeProduct = createTravelFeeProduct(data.postalCode, distanceKm, travelFee);
        addItem(travelFeeProduct);
      }
      
      console.log("Repair booking submitted:", data);
      
      // Send confirmation email
      const totalCost = calculateTotalCost();
      const emailSent = await sendConfirmationEmail(data, appointmentDateTime, totalCost, travelFee);
      
      // Fallback Zapier webhook (if configured)
      if (webhookUrl) {
        try {
          console.log("Sending data to Zapier webhook as fallback:", webhookUrl);
          
          const webhookData = {
            ...data,
            serviceOption: data.serviceOption,
            appointmentDateTime,
            distanceKm,
            travelFee,
            totalCost,
            submittedAt: new Date().toISOString(),
          };
          
          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify(webhookData),
          });
          
          console.log("Zapier webhook triggered as fallback");
        } catch (error) {
          console.error("Error sending data to Zapier webhook:", error);
        }
      }

      toast({
        title: "Service Added to Cart",
        description: `Your repair appointment has been scheduled for ${appointmentDateTime} and added to your cart.${emailSent ? " A confirmation email has been sent." : ""}`,
      });

      // Display booking summary
      setShowSummary(true);
      
      if (emailSent) {
        setShowEmailSentConfirmation(true);
      }

      // Reset form after successful cart addition
      form.reset();
      setSelectedDate(undefined);
      setSelectedServiceType(null);
      setSelectedServiceOption(null);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "There was a problem booking your appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const fieldsToValidate = currentStep === 1
      ? ["serviceType", "homeType", "equipmentType", "issueDescription"]
      : currentStep === 2
      ? ["date", "timeSlot", "serviceOption"]
      : [];
    
    // Additional validation for step 2 if protection plan is selected
    if (currentStep === 2 && watchServiceOption === "protection") {
      fieldsToValidate.push("agreeToTerms" as any);
    }
    
    if (fieldsToValidate.length > 0) {
      form.trigger(fieldsToValidate as any).then((isValid) => {
        if (isValid) {
          setCurrentStep(currentStep + 1);
        }
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 3</span>
          <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-voltly-green" : "bg-gray-300"
            }`}>
              <span className="text-white font-bold">1</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Service Details</p>
            </div>
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            currentStep >= 2 ? "bg-voltly-green" : "bg-gray-300"
          }`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-voltly-green" : "bg-gray-300"
            }`}>
              <span className="text-white font-bold">2</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Schedule</p>
            </div>
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            currentStep >= 3 ? "bg-voltly-green" : "bg-gray-300"
          }`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? "bg-voltly-green" : "bg-gray-300"
            }`}>
              <span className="text-white font-bold">3</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Contact Info</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Fusion Integration Config Button */}
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setShowWebhookDialog(true)}
        >
          <Link className="h-3 w-3" />
          <span className="text-xs">Configure CRM</span>
        </Button>
      </div>

      {/* Modals */}
      <WebhookDialog
        showWebhookDialog={showWebhookDialog}
        setShowWebhookDialog={setShowWebhookDialog}
        webhookUrl={webhookUrl}
        setWebhookUrl={setWebhookUrl}
        saveWebhookUrl={saveWebhookUrl}
      />
      
      <EmailSentDialog
        show={showEmailSentConfirmation}
        onClose={() => setShowEmailSentConfirmation(false)}
      />
      
      <BookingSummary
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        serviceType={form.watch("serviceType") || ""}
        serviceOption={form.watch("serviceOption") || ""}
        totalCost={calculateTotalCost()}
        travelFee={travelFee}
        distanceKm={distanceKm}
        FREE_TRAVEL_DISTANCE_KM={FREE_TRAVEL_DISTANCE_KM}
        baseCost={selectedServiceOption ? SERVICE_COSTS[selectedServiceOption] : 0}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <ServiceDetailsStep 
              form={form}
              selectedServiceType={selectedServiceType}
              equipmentTypeOptions={equipmentTypeOptions}
            />
          )}

          {/* Step 2: Select Time and Date */}
          {currentStep === 2 && (
            <ScheduleStep
              form={form}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availableTimeSlots={availableTimeSlots}
              isLoading={isLoading}
              isPriorityTimeframe={isPriorityTimeframe}
              showTermsDialog={showTermsDialog}
              setShowTermsDialog={setShowTermsDialog}
              distanceKm={distanceKm}
              travelFee={travelFee}
              isLookingUpAddress={isLookingUpAddress}
              calculateTotalCost={calculateTotalCost}
              selectedServiceOption={selectedServiceOption}
              toast={toast}
              FREE_TRAVEL_DISTANCE_KM={FREE_TRAVEL_DISTANCE_KM}
            />
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <ContactInfoStep
              form={form}
              isLookingUpAddress={isLookingUpAddress}
              distanceKm={distanceKm}
              FREE_TRAVEL_DISTANCE_KM={FREE_TRAVEL_DISTANCE_KM}
            />
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={isSubmitting || isServiceFusionLoading}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-voltly-green hover:bg-voltly-green/90 text-black font-medium"
                disabled={isServiceFusionLoading}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-voltly-green hover:bg-voltly-green/90 text-black font-medium"
                disabled={isSubmitting || isServiceFusionLoading}
              >
                {isSubmitting || isServiceFusionLoading ? "Processing..." : "Add to Cart"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BookingForm;
