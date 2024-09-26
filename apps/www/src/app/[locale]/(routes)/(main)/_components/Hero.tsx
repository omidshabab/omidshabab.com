import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { LangDir } from "@/lib/fonts";
import { Locale } from "@/lib/locales";

const Hero = () => {
     const tHomePage = useTranslations("home_page")

     const locale = useLocale()
     const dir = LangDir(locale as Locale)

     const slider = useRef<HTMLDivElement>(null)

     useLayoutEffect(() => {
          gsap.registerPlugin(ScrollTrigger)

          const textWidth = slider.current?.offsetWidth || 0;

          gsap.to(slider.current, {
               scrollTrigger: {
                    trigger: document.documentElement,
                    scrub: 0.25,
                    start: "top top",
                    end: "bottom center",
               },
               x: dir !== "rtl" ? -textWidth : textWidth,
          })
     }, [])

     return (
          <div
               className="w-full h-[650px] flex justify-center bg-gradient-to-b from-transparent to-primary/[3%] overflow-hidden px-[30px] xl:px-[0px]">
               <div className="max-w-6xl w-full relative">
                    <div className="absolute w-full bottom-0 flex flex-col py-[20px] cursor-text">
                         <div ref={slider} className="whitespace-nowrap text-[68px] sm:text-[128px] py-[5px] tracking-tight">
                              <span className="font-semibold bg-gradient-to-b from-[#EA580C]/50 to-[#EA580C] inline-block text-transparent bg-clip-text">
                                   {tHomePage("title")},
                              </span>

                              {" "}

                              <span className="bg-gradient-to-b from-[#EA580C]/50 to-[#EA580C] inline-block text-transparent bg-clip-text">
                                   {tHomePage("hero_section.title")}
                              </span>
                         </div>

                         <div className="flex justify-end">
                              <div className="tracking-tight leading-[2rem] py-[15px] bg-gradient-to-b from-[#3b3b3b]/50 to-[#3b3b3b] inline-block text-transparent bg-clip-text">
                                   {tHomePage("hero_section.title")}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Hero;