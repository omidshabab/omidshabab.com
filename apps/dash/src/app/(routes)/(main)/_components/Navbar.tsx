import ProfileAvatar from "@/components/ProfileAvatar";
import ToggleButton from "./ToggleButton";
import Image from "next/image";
import Link from "next/link";

import {
     Breadcrumb,
     BreadcrumbItem,
     BreadcrumbLink,
     BreadcrumbList,
     BreadcrumbPage,
     BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb"

import { dashRoutes } from "@/config/routes";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { capitalize } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { Locale } from "@/config/locale";
import { setUserLocale } from "@/services/locale";
import { cn } from "@repo/ui/lib/utils";
import { LangDir } from "@/lib/fonts";

const Navbar = () => {
     const segments = useSelectedLayoutSegments();

     const router = useRouter();

     const locale = useLocale();

     const dir = LangDir(locale)

     const tGeneral = useTranslations("general");
     const tBreadcrumb = useTranslations("breadcrumb");
     const tLang = useTranslations("lang");

     const [isPending, startTransition] = useTransition();

     function onChange(value: string) {
          const locale = value as Locale;

          new Promise<void>((resolve) => {
               startTransition(async () => {
                    await setUserLocale(locale);
                    resolve();
               });
          }).then(() => {
               window.location.reload();
          });
     }

     return (
          <div className="flex sticky top-0 z-50 items-center justify-between gap-x-5 shrink-0 px-[25px] py-[20px]">
               <div className="flex gap-x-5 items-center">
                    <div className="flex w-min min-w-[35px] sm:w-auto sm:min-w-auto gap-x-[10px] items-center justify-start">
                         <Link href={dashRoutes.default}>
                              <Image
                                   width={32}
                                   height={32}
                                   src="/images/logo-64x64.png"
                                   alt="logo"
                                   className="w-[32px] h-[32px] aspect-square cursor-pointer" />
                         </Link>

                         <ToggleButton />
                    </div>

                    <div className="sm:px-[15px]">
                         <Breadcrumb>
                              <BreadcrumbList>
                                   <BreadcrumbItem>
                                        <BreadcrumbLink>
                                             <Link href={dashRoutes.default}>{capitalize(tGeneral("dashboard"))}</Link>
                                        </BreadcrumbLink>
                                   </BreadcrumbItem>
                                   {segments[0] && (
                                        <>
                                             <BreadcrumbSeparator />
                                             <BreadcrumbItem>
                                                  <BreadcrumbLink>
                                                       <Link href={`/${segments[0]}`}>{capitalize(tBreadcrumb(segments[0]))}</Link>
                                                  </BreadcrumbLink>
                                             </BreadcrumbItem>
                                        </>
                                   )}

                                   {segments[2] && (
                                        <>
                                             <BreadcrumbSeparator />
                                             <BreadcrumbItem>
                                                  <BreadcrumbPage>{capitalize(tBreadcrumb(segments[2]))}</BreadcrumbPage>
                                             </BreadcrumbItem>
                                        </>
                                   )}
                              </BreadcrumbList>
                         </Breadcrumb>
                    </div>
               </div>

               <div className="flex w-min min-w-[50px] sm:w-auto sm:min-w-auto gap-x-[20px] items-center justify-end">
                    <div className="hidden sm:flex gap-x-[5px] text-[15px] font-light text-slate-600 cursor-pointer">
                         <div className={cn(locale === "en" && "text-text")} onClick={() => onChange("en")}>{tLang("english")}</div>
                         <div className="text-text"> / </div>
                         <div className={cn(locale === "fa" && "text-text")} onClick={() => onChange("fa")}>{tLang("persian")}</div>
                    </div>

                    <ProfileAvatar />
               </div>
          </div>
     );
}

export default Navbar;