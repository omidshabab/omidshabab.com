"use client"

import Editor from "@/components/editor/Editor";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { defaultEditorValue } from "@/config/defaultEditorValue";
import { JSONContent } from "novel";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";

const Page = () => {
     const searchParams = useSearchParams()

     const [value, setValue] = useState<JSONContent>(defaultEditorValue);

     const id = searchParams.get("id")

     return (
          <div className="w-full h-full flex flex-col">
               <div className="flex gap-x-[35px] flex-grow">
                    <ScrollArea className="flex flex-col flex-grow gap-y-[20px] text-[20px] leading-[2.5rem]">
                         <div className="text-[26px] font-semibold leading-[2.5rem]">
                              Edit Post: {" "}
                              <span className="font-normal">
                                   {id !== undefined && id !== "" && id !== null ?
                                        id :
                                        "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur"}
                              </span>
                         </div>
                         <div className="w-full aspect-[6/3] rounded-[20px] bg-primary/5">

                         </div>
                         <Editor initialValue={value} onChange={setValue} />
                    </ScrollArea>
                    <div className="flex flex-col min-w-[300px] max-w-[350px] bg-primary/[3%] rounded-[20px] mb-[35px]">
                         <div className="flex-grow px-[25px] py-[15px]">
                              <div className="text-[18px]">
                                   Post Settings
                              </div>
                         </div>

                         <div className="border-t-[1px] border-primary/10 h-min w-full flex items-end justify-end gap-x-[10px] px-[20px] py-[15px]">
                              <Button variant="secondary" size="sm">Save the Post</Button>
                              <Button variant="default" size="sm">Publish</Button>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Page;