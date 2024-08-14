"use client"

import { UploadCloud, CheckIcon, ShareIcon, LogOutIcon, TrashIcon } from 'lucide-react';
import { Input } from "antd";
import { cn } from "@repo/ui/lib/utils";
import { englishBricolageGrotesqueFont, LangDir, LangFont } from "@/lib/fonts";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@repo/ui/components/ui/button";
import IconButton from "@/components/buttons/icon-button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { capitalize } from '@/lib/utils';

const { TextArea } = Input

const Page = () => {
     const locale = useLocale()

     const dir = LangDir(locale)
     const font = LangFont(locale)

     const tGeneral = useTranslations("general")
     const tRegister = useTranslations("register_page")
     const tProfilePage = useTranslations("profile_page")

     const router = useRouter();

     const [isLoggingOut, setIsLoggingOut] = useState(false)

     const signOut = async () => {
          const response = await fetch("/api/sign-out", {
               method: "POST",
               redirect: "manual",
          });

          if (response.status === 0) {
               return router.refresh();
          }
     }

     const handleSignOut = async () => {
          setIsLoggingOut(true);

          toast.promise(signOut().then(() => {
               setIsLoggingOut(false);
          }), {
               loading: `${tRegister("in_progress")}`,
          })

          setIsLoggingOut(false)

          return router.refresh();
     };

     return (
          <div className="flex flex-col sm:flex-row w-full h-full flex-grow">
               <ScrollArea dir={dir} className="flex w-full h-full flex-grow">
                    <div className="flex flex-col w-full h-full flex-grow gap-y-[20px]">
                         {capitalize(tProfilePage("profile"))}

                         <div className="flex gap-x-[20px] items-center text-[15px] leading-[1.5rem] font-normal none-scroll-bar">
                              <div className="group/avatar flex items-center justify-center w-[120px] h-[120px] rounded-full bg-primary/[3%] text-text cursor-pointer hover:bg-primary/[6%] transition-all duration-500 border-dashed border-[5px] border-primary/5 hover:border-primary/10">
                                   <UploadCloud className="w-[50px] h-[50px] opacity-30 group-hover/avatar:opacity-50 transition-all duration-500" />
                              </div>
                              <p className="max-w-[250px] text-slate-600">
                                   {tProfilePage("drop_image_avatar")}
                              </p>
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("name"))}
                              <TextArea
                                   placeholder={tProfilePage("type_your_x_here", { x: tProfilePage("name") })}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("username"))}
                              <TextArea
                                   placeholder={tProfilePage("type_your_x_here", { x: tProfilePage("username") })}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("display_name"))}
                              <TextArea
                                   placeholder={tProfilePage("type_your_x_here", { x: tProfilePage("display_name") })}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("email"))}
                              <TextArea
                                   placeholder={tProfilePage("type_your_x_here", { x: tProfilePage("email") })}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("phone"))}
                              <TextArea
                                   placeholder={tProfilePage("type_your_x_here", { x: tProfilePage("phone") })}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="flex flex-col text-[15px] font-normal text-slate-600">
                              {capitalize(tProfilePage("about"))}
                              <TextArea
                                   placeholder={tProfilePage("type_about_yourself_here")}
                                   autoSize={{ maxRows: 1 }}
                                   maxLength={25}
                                   autoComplete="off"
                                   className={cn(
                                        "h-full text-[15px] sm:text-[18px] px-[15px] py-[15px] none-scroll-bar focus:ring-0 focus-visible:ring-0 bg-primary/[3%] rounded-none border-0 border-b-[2px] border-primary/10 hover:bg-primary/[5%] focus:bg-primary/[5%] hover:border-primary/10 focus:border-primary/10 transition-all duration-500 cursor-text",
                                        font,
                                   )}
                              />
                         </div>

                         <div className="h-[0px]" />

                         <div className="flex gap-x-[20px] justify-between">
                              <div className="flex flex-grow gap-x-[15px]">
                                   <div className="flex items-center justify-end gap-x-[10px]">
                                        <IconButton
                                             onClick={() => handleSignOut()}
                                             className="p-[10px]">
                                             <LogOutIcon className="size-[20px] sm:size-[25px] text-primary" />
                                        </IconButton>

                                        <p className="w-min min-w-[60px] text-start text-[15px] leading-[1.25rem] text-slate-600 font-normal opacity-50">
                                             {tProfilePage("logout")}
                                        </p>
                                   </div>

                                   <div className="flex items-center justify-end gap-x-[10px]">
                                        <IconButton
                                             onClick={() => null}
                                             className="p-[10px]">
                                             <TrashIcon className="size-[20px] sm:size-[25px] text-primary" />
                                        </IconButton>

                                        <p className="w-min min-w-[100px] text-start text-[15px] leading-[1.25rem] text-slate-600 font-normal opacity-50">
                                             {tProfilePage("delete_account")}
                                        </p>
                                   </div>
                              </div>

                              <div className="flex items-center justify-end gap-x-[10px]">
                                   <p className="w-min min-w-[150px] text-end text-[15px] leading-[1.25rem] text-slate-600 font-normal opacity-50">
                                        {tProfilePage("save_changes")}
                                   </p>

                                   <IconButton
                                        onClick={() => null}
                                        className="p-[10px]">
                                        <CheckIcon className="size-[20px] sm:size-[25px] text-primary" />
                                   </IconButton>
                              </div>
                         </div>

                         <Spacer className="h-[15px]" />
                    </div>
               </ScrollArea>

               <Spacer className="hidden sm:flex w-[55px]" />

               <ScrollArea dir={dir} className="flex w-full h-full flex-grow none-scroll-bar">
                    <div className="relative flex flex-col gap-y-[20px] bg-primary/[3%] rounded-[20px] h-full w-full px-[35px] py-[20px]">
                         <div className="flex flex-col">
                              {tProfilePage("preview_profile")}
                              <span className="text-[15px] font-normal text-slate-600 mt-[-5px]">
                                   {tProfilePage("preview_desc")}
                              </span>
                         </div>

                         <div className="flex flex-col gap-y-[20px]">
                              <div className="flex items-center justify-center w-[120px] h-[120px] rounded-full bg-primary/[3%] text-text cursor-pointer hover:bg-primary/[6%] transition-all duration-500 border-[2px] border-primary/5 hover:border-primary/10">

                              </div>

                              <div className="flex flex-col gap-y-[5px]">
                                   <div className="text-slate-800 font-semibold text-[20px] line-clamp-1 leading-[1.5rem]">
                                        {tProfilePage("name")}
                                   </div>

                                   <div className="flex text-slate-600 font-normal text-[15px] line-clamp-1 leading-[1.5rem]">
                                        {tProfilePage("username")}
                                   </div>
                              </div>
                         </div>

                         <div className="flex text-slate-800 font-normal text-[16px] line-clamp-3 leading-[2.0rem]">
                              {tGeneral("lorem")}
                         </div>

                         <div className="flex gap-x-[10px] items-center">
                              <Button
                                   variant="secondary"
                                   size="sm"
                                   className="w-min">
                                   {tProfilePage("follow")}
                              </Button>

                              <Button
                                   variant="secondary"
                                   size="sm"
                                   className="w-min">
                                   {tProfilePage("connect")}
                              </Button>

                              <Button
                                   variant="secondary"
                                   size="sm"
                                   className="w-min">
                                   {tProfilePage("send_message")}
                              </Button>
                         </div>

                         <div className="flex text-slate-800 font-normal text-[16px] line-clamp-3 leading-[2.0rem]">
                              -- {tProfilePage("continue_of_profile")}
                         </div>
                    </div>
               </ScrollArea>
          </div>
     );
}

export default Page;