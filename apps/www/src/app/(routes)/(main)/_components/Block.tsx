"use client"

import { cn } from "@repo/ui/lib/utils";
import { motion, MotionProps } from "framer-motion";

type Props = {
     className?: string,
     onClick?: () => void
} & MotionProps

const Block = ({
     className,
     onClick,
     ...props
}: Props) => {
     return (
          <motion.div
               className={cn(
                    "col-span-12 md:col-span-4 rounded-[25px] border-primary/10 bg-primary/5 px-[30px] py-[25px] text-text text-[20px]",
                    className
               )}
               onClick={onClick}
               {...props} />
     );
}

export default Block;