"use client"

import { defaultRoutes } from "@/config/routes";
import { Post } from "@/types";
import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostItem = ({
     post
}: {
     post: Post
}) => {
     const router = useRouter()

     return (
          <div
               onClick={() => router.push(`${defaultRoutes.blog}/${post.slug}`)}
               className="group/item col-span-1 flex flex-col gap-y-[15px] cursor-pointer">
               <div className={cn(
                    "min-h-[150px] bg-primary/[3%] rounded-[15px] group-hover/item:bg-primary/[6%] transition-all duration-500 overflow-hidden",
                    post.image && "rounded-none"
               )}>
                    {post.image && (
                         <Image
                              alt={post?.slug}
                              src={post.image}
                              fill={true}
                              className="w-full h-full object-cover" />
                    )}
               </div>
               <div className="flex flex-col gap-y-[5px]">
                    <div className="group-hover/item:text-text transition-all duration-500 font-normal text-[16px] leading-[1.5rem] line-clamp-2">
                         {post.title}
                    </div>
                    {/* <p className="group-hover/item:text-text/80 text-slate-800 transition-all duration-500 font-normal text-[14px] leading-[1.5rem] line-clamp-1">
                         {post.createdAt.getFullYear().toString()}
                    </p> */}
               </div>
          </div>
     );
}

export default PostItem;