"use client"

import PostItem from "@/components/posts/PostItem";
import PostItemShimmer from "@/components/posts/PostItemShimmer";
import { trpc } from "@/lib/trpc/client";

const Page = () => {
     const posts = trpc.posts.getPosts.useQuery().data?.posts;

     return (
          <div className="flex flex-col flex-grow w-full h-full gap-y-[20px]">
               Your Created Posts
               <div className="flex flex-col w-full">
                    <div className="grid grid-cols-4 gap-x-[20px] gap-y-[30px] leading-[2rem]">
                         {posts && posts.map((post) => (
                              <PostItem
                                   key={post.id}
                                   post={post} />
                         )).reverse()}
                    </div>

                    <div className="grid grid-cols-4 gap-x-[20px] gap-y-[30px] leading-[2rem]">
                         {!posts && [1, 2, 3, 4, 5, 6].map((index) => (
                              <PostItemShimmer
                                   key={index} />
                         )).reverse()}
                    </div>

                    {posts?.length === 0 &&
                         <div className="flex w-full min-w-max h-full">
                              There is no post!
                         </div>}
               </div>
          </div>
     );
}

export default Page;