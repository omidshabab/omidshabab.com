import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";

type TextButtonType = "default" | "outline";

const TextButton = ({
     children,
     disabled,
     onClick,
     type = "outline",
     className
}: {
     children: React.ReactNode,
     disabled?: boolean,
     onClick?: React.MouseEventHandler<HTMLButtonElement>
     type?: TextButtonType,
     className?: string
}) => {
     return (
          <div
               className="relative">
               <Button
                    onClick={onClick}
                    disabled={disabled}
                    className={cn(
                         className,
                         "flex gap-2 w-min text-[16px] sm:text-[20px] font-bold py-[25px] px-[20px] sm:py-[30px] sm:px-[25px] rounded-[12px] transform hover:-translate-y-1 transition duration-400"
                    )}
                    variant={type}>
                    {children}
               </Button>
          </div>
     );
}

export default TextButton;