
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import { Link } from "react-router-dom";

interface TermsDialogProps {
  children: React.ReactNode;
  onPrivacyAgree: (agreed: boolean) => void;
  onElectronicAgree: (agreed: boolean) => void;
  privacyAgreed: boolean;
  electronicAgreed: boolean;
}

const TermsDialog = ({ 
  children, 
  onPrivacyAgree, 
  onElectronicAgree, 
  privacyAgreed, 
  electronicAgreed 
}: TermsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-blue-600 underline cursor-pointer">{children}</span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please review our terms and conditions below
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CONSENT TO VOLTLY PRIVACY POLICY AND THIRD-PARTY DETERMINATION</h3>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="privacyPolicy" 
                checked={privacyAgreed}
                onCheckedChange={(checked) => onPrivacyAgree(checked as boolean)}
                className="mt-1"
              />
              <FormLabel htmlFor="privacyPolicy" className="leading-relaxed">
                I accept the Voltly Privacy Policy, located at{" "}
                <Link to="/privacy" className="text-blue-600 underline">
                  https://voltly.com/privacypolicy
                </Link>
                . I also confirm that there is no person or company directing me to apply for financing and use this loan on their direction or behalf.
              </FormLabel>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CONSENT TO ELECTRONIC DISCLOSURES (OPTIONAL)*</h3>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="electronicDisclosures"
                checked={electronicAgreed}
                onCheckedChange={(checked) => onElectronicAgree(checked as boolean)}
                className="mt-1"
              />
              <FormLabel htmlFor="electronicDisclosures" className="leading-relaxed">
                I consent to receive Disclosures (including the Loan Agreement, Amendments, Statements and Renewals, notices and other associated documents) electronically. For more information, please visit{" "}
                <Link to="/electronic-consent" className="text-blue-600 underline">
                  https://voltly.com/electronic-consent-agreement/
                </Link>
              </FormLabel>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CREDIT AUTHORIZATION</h3>
            <p className="leading-relaxed">
              I agree, acknowledge and represent, that by personally submitting this application the recipient or its affiliates is authorized to obtain my credit report from one or more consumer credit reporting agencies, to verify the information in my credit report with third parties as necessary, and to periodically update my credit information with credit reporting agencies.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;

