"use client"

import Editor from "@/components/editor/Editor";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { defaultEditorValue } from "@/config/defaultEditorValue";
import { JSONContent } from "novel";
import { FormEventHandler, SetStateAction, SyntheticEvent, useRef, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

const Page = () => {
     const searchParams = useSearchParams();
     const id = searchParams.get("id");

     const [title, setTitle] = useState(
          id !== undefined && id !== "" && id !== null
               ? id
               : "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur"
     );
     const [value, setValue] = useState<JSONContent>(defaultEditorValue);

     const titleRef = useRef<HTMLDivElement>(null);

     const handleTitle = (event: SyntheticEvent<HTMLDivElement>) => {
          const target = event.target as HTMLDivElement;

          setTitle(target.innerHTML);
     };

     const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
          if (event.key === "Enter") {
               event.preventDefault();
          }
     };

     return (
          <div className="flex w-full h-full gap-x-[30px] flex-grow">
               <ScrollArea className="w-full h-full scroll-mx-12 none-scroll-bar overflow-y-hidden">
                    <div className="flex flex-col h-full flex-grow overflow-y-hidden gap-y-[20px]">
                         <div>
                              Edit Post:
                              <span
                                   onChange={handleTitle}
                                   contentEditable
                                   role="textbox"
                                   ref={titleRef}
                                   onKeyDown={handleKeyDown}
                                   dangerouslySetInnerHTML={{ __html: title }}
                                   className="textarea max-w-full text-[30px] block h-full overflow-hidden resize-none font-semibold leading-[3rem] bg-transparent text-start focus-visible:outline-none cursor-text"
                                   title="Post Title" />
                         </div>
                         {/* <div className="w-full min-h-min aspect-[6/5] rounded-[20px] bg-primary/5">

                    </div> */}
                         <div className="pb-[35px]">
                              <Editor initialValue={value} onChange={setValue} />
                         </div>
                    </div>
               </ScrollArea>
               <div className="h-full">
                    <div className="flex h-fit flex-col min-w-[300px] max-w-[350px] bg-primary/[3%] rounded-[20px] mb-[35px]">
                         <div className="flex-grow px-[25px] py-[15px]">
                              <div className="text-[18px]">Post Settings</div>
                              <p className="text-[16px] leading-[1.8rem] text-slate-800 font-normal">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                                   pariatur quos possimus beatae.
                              </p>
                              <Input
                                   placeholder="Type it here ..."
                                   className="text-start sm:text-[16px] py-[10px] leading-[1.5rem] mb-[5px]" />
                              <p className="text-[13px] leading-[1.5rem] text-slate-600 font-normal">
                                   Lorem ipsum dolor
                              </p>
                         </div>

                         <div className="border-t-[1px] border-primary/10 h-min w-full flex items-end justify-end gap-x-[10px] px-[20px] py-[15px]">
                              <Button variant="secondary" size="sm">
                                   Save the Post
                              </Button>
                              <Button variant="default" size="sm">
                                   Publish
                              </Button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Page;