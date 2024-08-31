import * as React from "react"

import { cn } from "@repo/ui/lib/utils"

export interface TextareaProps
     extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
     ({ className, ...props }, ref) => {
          return (
               <textarea
                    className={cn(
                         "flex min-h-[80px] w-full rounded-none border-none border-input bg-transparent px-0 py-0 text-sm ring-offset-transparent placeholder:text-slate-800 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 cursor-text disabled:cursor-not-allowed disabled:opacity-50",
                         className
                    )}
                    ref={ref}
                    {...props}
               />
          )
     }
)
Textarea.displayName = "Textarea"

export { Textarea }
