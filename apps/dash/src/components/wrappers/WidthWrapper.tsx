import { cn } from "@repo/ui/lib/utils"
import { ReactNode } from "react"

const WidthWrapper = ({
     className,
     children
}: {
     className?: string,
     children: ReactNode,
}) => {
     return (
          <div className={cn(
               "mx-auto w-full max-w-screen-2xl px-2.5 md:px-20",
               className
          )}>
               {children}
          </div>
     )
}

export default WidthWrapper