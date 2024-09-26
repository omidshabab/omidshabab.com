import Container from "@/components/Container";
import { baseApiUrl } from "@/config/routes";
import { Post } from "@/types";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PostItem from "../../blog/_components/PostItem";

const Posts = () => {
     const tHomePage = useTranslations("home_page")

     const [posts, setPosts] = useState<Post[] | null>(null);

     const locale = useLocale()

     useEffect(() => {
          const getPosts = async () => {
               try {
                    const response = await axios.get(`${baseApiUrl}/posts?locale=${locale}&count=4`);
                    setPosts(response.data);
               } catch (error) {
                    console.error('Error getting the post:', error);
               }
          };

          getPosts();
     }, [locale]);

     return (
          <Container>
               <div className="relative flex flex-col gap-y-[50px] py-[50px]">
                    <div className="max-w-[650px] text-[20px] sm:text-[25px] text-zinc-600 font-light leading-[2.5rem] sm:leading-[3rem] pt-[20px]">
                         {tHomePage("posts_section.title")}
                    </div>

                    <div className="flex flex-col w-full">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[45px] gap-y-[35px] sm:gap-y-[50px] leading-[2rem]">
                              {posts && posts.map((post, index) => (
                                   <div key={index} className="even:md:-mt-[25px]">
                                        <PostItem post={post} />
                                   </div>
                              )).reverse()}
                         </div>
                    </div>
               </div>
          </Container>
     );
}

export default Posts;