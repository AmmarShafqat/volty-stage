import emailjs from 'emailjs-com';

type EmailParams = {
  to_email: string;
  from_name?: string;
  to_name?: string;
  subject?: string;
  message: string;
  service_type: string;
  service_date: string;
  service_time: string;
  service_option: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_address: string;
  total_amount: string;
};

type FinanceApplicationParams = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  date_of_birth: string;
  property_status: string;
  mortgage_payment?: string;
  employment_status: string;
  annual_income: string;
  order_details: string;
  total_amount: string;
  monthly_payment: string;
  application_timestamp: string;
};

// Initialize EmailJS with your user ID
// Note: In production, you would normally store this in environment variables
const initEmailJS = () => {
  // Replace with your actual EmailJS user ID when setting up the service
  emailjs.init("YOUR_USER_ID");
};

export const sendServiceConfirmationEmail = async (params: EmailParams) => {
  try {
    initEmailJS();
    
    // Replace with your actual EmailJS service ID and template ID
    const response = await emailjs.send(
      "service_id", // Your EmailJS service ID
      "template_id", // Your EmailJS template ID
      params
    );
    
    console.log("Email sent successfully:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

// This is a simplified version that doesn't require EmailJS setup
// It uses a webhook to send emails (can be replaced with Zapier workflow)
export const sendServiceConfirmationViaWebhook = async (params: Omit<EmailParams, "to_name" | "from_name" | "subject">) => {
  try {
    console.log("Sending email via webhook with params:", params);
    
    // For demo purposes - simulate successful email sending
    console.log("Email content that would be sent:", {
      ...params,
      to_email: "govoltly@gmail.com", // Hardcoded recipient email as requested
      subject: "New Service Booking Confirmation",
      timestamp: new Date().toISOString()
    });
    
    // In a real scenario, you would uncomment this code to send via webhook:
    /*
    const response = await fetch("YOUR_ZAPIER_WEBHOOK_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        ...params,
        to_email: "govoltly@gmail.com", // Hardcoded recipient email as requested
        subject: "New Service Booking Confirmation",
        timestamp: new Date().toISOString()
      }),
    });
    */
    
    // For demonstration purposes, always return success
    return { success: true };
  } catch (error) {
    console.error("Error sending email via webhook:", error);
    return { success: false, error };
  }
};

// New function for finance application submissions
export const sendFinanceApplicationEmail = async (params: FinanceApplicationParams) => {
  try {
    console.log("Sending finance application email with params:", params);
    
    // For demo purposes - simulate successful email sending
    console.log("Finance application email content that would be sent:", {
      to_email: "govoltly@gmail.com",
      subject: "New Finance Application Submission",
      ...params
    });
    
    // In a real scenario, you would uncomment this code to send via webhook:
    /*
    const response = await fetch("YOUR_ZAPIER_WEBHOOK_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        to_email: "govoltly@gmail.com",
        subject: "New Finance Application Submission",
        ...params
      }),
    });
    */
    
    // For demonstration purposes, always return success
    return { success: true };
  } catch (error) {
    console.error("Error sending finance application email:", error);
    return { success: false, error };
  }
};
