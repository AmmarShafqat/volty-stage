
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BookingButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const BookingButton: React.FC<BookingButtonProps> = ({ className, children = "Book a Repair" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/booking");
  };

  return (
    <Button 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default BookingButton;
