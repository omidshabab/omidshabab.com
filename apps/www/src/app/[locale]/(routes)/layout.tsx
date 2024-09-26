"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { LangDir } from "@/lib/fonts"
import { Locale } from "@/lib/locales"
import { ReactNode } from "react"

export default function layout({
     children,
     params: {
          locale
     }
}: {
     children: ReactNode
     params: {
          locale: Locale
     }
}) {
     const dir = LangDir(locale);

     return (
          <div className="w-full min-h-screen bg-grid-black/[0.1] flex relative justify-center">
               <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
               <div className="content w-full flex items-center justify-center h-full cursor-d z-20">
                    <div className="flex flex-col w-full h-full">
                         <div className="flex flex-col w-full h-full gap-x-[30px]">
                              <Navbar dir={dir} />

                              <div className="flex flex-grow">
                                   {children}
                              </div>

                              <Footer />
                         </div>
                    </div>
               </div>
          </div>
     )
}
