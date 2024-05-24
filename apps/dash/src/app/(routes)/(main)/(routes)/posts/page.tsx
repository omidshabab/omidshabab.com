"use client"

import PostItem from "@/components/posts/PostItem";
import { trpc } from "@/lib/trpc/client";

const Page = () => {
     const posts = trpc.posts.getPosts.useQuery().data?.posts;

     return (
          <div className="flex flex-col gap-y-[20px]">
               Your Created Posts
               <div className="flex-grow">
                    <div className="grid grid-cols-4 gap-x-[20px] gap-y-[30px] leading-[2rem]">
                         {posts ? posts.map((post) => (
                              <PostItem
                                   key={post.id}
                                   post={post} />
                         )).reverse() : "There is any post!"}
                    </div>
               </div>
          </div>
     );
}

export default Page;