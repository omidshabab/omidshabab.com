"use client"

import { Post } from "@/types";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PostItem from "../_components/PostItem";
import PostItemShimmer from "../_components/PostItemShimmer";
import { baseApiUrl } from "@/config/routes";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/Container";

const Page = () => {
     const tBlogPage = useTranslations("blog_page");

     const [posts, setPosts] = useState<Post[] | null>(null);

     const locale = useLocale()

     const tPostPage = useTranslations("blog_page")

     useEffect(() => {
          const getPosts = async () => {
               try {
                    const response = await axios.get(`${baseApiUrl}/posts?locale=${locale}`);
                    setPosts(response.data);
               } catch (error) {
                    console.error('Error getting the post:', error);
               }
          };

          getPosts();
     }, [locale]);

     return (
          <Container>
               <div className="flex flex-col flex-grow w-full h-full gap-y-[20px] py-[20px] sm:py-[25px]">
                    <motion.h2
                         initial={{
                              opacity: 0.05
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
                         className="text-[35px] sm:text-[45px] tracking-tight bg-gradient-to-b from-orange-400 to-orange-600 inline-block text-transparent bg-clip-text font-bold leading-[3.5rem] sm:leading-[4.5rem] py-[30px] mb-[30px] max-w-[650px] cursor-text">
                         {tBlogPage("desc")}
                    </motion.h2>
                    <div className="flex flex-col w-full">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[45px] gap-y-[35px] sm:gap-y-[50px] leading-[2rem] pb-[30px]">
                              {posts && posts.map((post, index) => (
                                   <div key={index} className="even:md:-mt-[25px]">
                                        <PostItem post={post} />
                                   </div>
                              )).reverse()}

                              {!posts && [1, 2, 3, 4, 5, 6].map((index) => (
                                   <div key={index} className="even:md:-mt-[25px]">
                                        <PostItemShimmer />
                                   </div>
                              )).reverse()}
                         </div>

                         {posts?.length === 0 &&
                              <div className="flex w-full min-w-max h-full">
                                   {tPostPage("not_found")}
                              </div>}
                    </div>
               </div>
          </Container>
     );
}

export default Page;
