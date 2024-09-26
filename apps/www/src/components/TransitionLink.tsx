"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";

interface TransitionLinkProps extends LinkProps {
     children: React.ReactNode;
     className?: string
     href: string;
}

function sleep(ms: number): Promise<void> {
     return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
     children,
     className,
     href,
     ...props
}) => {
     const router = useRouter();
     const pathname = usePathname()

     const handleTransition = async (
          e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
     ) => {
          if (pathname !== href) {
               e.preventDefault();

               const body = document.querySelector(".content");

               body?.classList.add("page-transition");

               await sleep(500);
               router.push(href);
               await sleep(500);

               body?.classList.remove("page-transition");
          }
     };

     return (
          <Link
               href={href}
               onClick={handleTransition}
               className={className}
               {...props} >
               {children}
          </Link>
     );
};