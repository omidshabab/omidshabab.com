import React from "react";
import GoogleIcon from "@/components/icons/google";
import TextButton from "@/components/buttons/text-button";

const GoogleButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="relative">
      <TextButton
        onClick={onClick}
        disabled={disabled}>
        <GoogleIcon
          className="aspect-square h-5 sm:h-6" />
        {children}
      </TextButton>
    </div>
  );
};

export default GoogleButton;
