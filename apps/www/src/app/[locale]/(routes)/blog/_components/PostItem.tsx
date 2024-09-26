"use client"

import { defaultRoutes } from "@/config/routes";
import { Post } from "@/types";
import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion"
import { TransitionLink } from "@/components/TransitionLink";

const PostItem = ({
     post
}: {
     post: Post
}) => {
     return (
          <TransitionLink href={`${defaultRoutes.blog}/${post.slug}`}>
               <motion.div
                    initial={{
                         opacity: 0.5,
                    }}
                    whileInView={{
                         opacity: 1,
                    }}
                    viewport={{
                         once: false,
                         amount: 0.5,
                    }}
                    transition={{
                         ease: "easeInOut",
                         duration: 0.8,
                    }}
                    className="group/item col-span-1 flex flex-col gap-y-[18px] sm:gap-y-[20px] cursor-pointer">
                    <div className={cn(
                         "aspect-video bg-primary/[3%] rounded-[25px] group-hover/item:bg-primary/[6%] transition-all duration-500 overflow-hidden",
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
                         <div className="group-hover/item:text-text transition-all duration-500 font-normal text-[22px] sm:text-[25px] text-zinc-600 leading-[2.5rem] line-clamp-2">
                              {post.title}
                         </div>
                    </div>
               </motion.div>
          </TransitionLink>
     );
}

export default PostItem;