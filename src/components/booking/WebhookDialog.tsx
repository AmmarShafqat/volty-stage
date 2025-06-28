
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface WebhookDialogProps {
  showWebhookDialog: boolean;
  setShowWebhookDialog: React.Dispatch<React.SetStateAction<boolean>>;
  webhookUrl: string;
  setWebhookUrl: React.Dispatch<React.SetStateAction<string>>;
  saveWebhookUrl: (url: string) => void;
}

const WebhookDialog: React.FC<WebhookDialogProps> = ({
  showWebhookDialog,
  setShowWebhookDialog,
  webhookUrl,
  setWebhookUrl,
  saveWebhookUrl,
}) => {
  return (
    <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Service Fusion CRM Integration</DialogTitle>
          <DialogDescription>
            Your Service Fusion CRM is now directly integrated! This form configures 
            an optional Zapier webhook as a backup. The direct API integration 
            will automatically create customers and jobs in your Service Fusion account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <label className="block text-sm font-medium mb-2">
            Zapier Webhook URL (Optional Backup)
          </label>
          <Input
            placeholder="https://hooks.zapier.com/hooks/catch/your-webhook-url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-2">
            Only needed if you want a backup webhook integration alongside the direct API.
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setShowWebhookDialog(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => saveWebhookUrl(webhookUrl)}
            className="bg-voltly-green hover:bg-voltly-green/90 text-black"
          >
            Save Backup Integration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookDialog;
