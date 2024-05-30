import { Input } from "@repo/ui/components/ui/input";
import React from "react";

const PostSettings = ({
     buttons
}: {
     buttons: React.ReactNode
}) => {
     return (
          <div className="h-full">
               <div className="flex h-fit flex-col min-w-[300px] max-w-[350px] bg-primary/[3%] rounded-[20px] mb-[35px]">
                    <div className="flex-grow px-[25px] py-[15px]">
                         <div className="text-[18px]">Post Settings</div>
                         <p className="text-[16px] leading-[1.8rem] text-slate-800 font-normal">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                              pariatur quos possimus beatae.
                         </p>
                         <Input
                              placeholder="Type here ..."
                              className="text-start sm:text-[16px] py-[10px] leading-[1.5rem] mb-[5px]"
                         />
                         <p className="text-[13px] leading-[1.5rem] text-slate-600 font-normal">
                              Lorem ipsum dolor
                         </p>
                    </div>
                    <div className="border-t-[1px] border-primary/10 h-min w-full flex items-end justify-end gap-x-[10px] px-[20px] py-[15px]">
                         {buttons}
                    </div>
               </div>
          </div>
     );
}

export default PostSettings;