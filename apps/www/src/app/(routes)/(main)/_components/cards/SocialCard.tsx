import { cn } from "@repo/ui/lib/utils";
import Block from "../Block";
import { ReactNode } from "react";

const SocialCard = ({
     className,
     children,
     ...props
}: {
     className?: string,
     children?: ReactNode
}) => {
     return (
          <Block
               className={cn(
                    "col-span-2 md:col-span-2 row-span-2 flex flex-col justify-center items-center gap-y-[10px] cursor-pointer transition-all duration-500",
                    className,
               )}
               {...props}>
               {children}
          </Block>
     );
}

export default SocialCard;