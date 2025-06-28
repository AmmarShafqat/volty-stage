
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthDialogProps {
  trigger: React.ReactNode;
  defaultView?: 'signin' | 'signup';
  onClose?: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  trigger, 
  defaultView = 'signin',
  onClose 
}) => {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleSignInClick = () => {
    setView('signin');
  };

  const handleSignUpClick = () => {
    setView('signup');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {view === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        {view === 'signin' ? (
          <SignInForm onSignUpClick={handleSignUpClick} />
        ) : (
          <SignUpForm onSignInClick={handleSignInClick} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
