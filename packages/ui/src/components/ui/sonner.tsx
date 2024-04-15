"use client"

import { Toaster as Sonner } from "sonner"

interface ToasterProps {
  font: string,
  others: React.ComponentProps<typeof Sonner>
}

const Toaster = ({ font, others: { ...props } }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-none",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        className: font
      }}
      {...props}
    />
  )
}

export { Toaster }
