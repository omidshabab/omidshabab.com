import { cn } from "@repo/ui/lib/utils";
import React from "react";

const IconButton = ({
     children,
     onClick,
     disabled,
     className,
}: {
     children: React.ReactNode;
     onClick?: React.MouseEventHandler<HTMLDivElement>;
     disabled?: boolean;
     className?: string;
}) => {
     return (
          <div
               onClick={!disabled ? onClick : undefined}
               className={cn(
                    className,
                    disabled && "cursor-not-allowed opacity-50",
                    "flex justify-center items-center border-input border-[3px] border-orange-600 border-opacity-20 bg-orange-600 bg-opacity-10 cursor-pointer p-3 rounded-full hover:bg-opacity-15 transform duration-200 hover:-translate-y-1 transition duration-400 aspect-square"
               )}>
               {children}
          </div>
     );
};

export default IconButton;