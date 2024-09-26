"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import axios from 'axios';
import { generateHTML } from '@tiptap/html';
import { defaultExtensions } from '@/components/editor/Extensions';
import TableOfContents from '@/components/TableOfContents';
import Loading from "@/app/[locale]/loading";
import { Post } from "@/types";
import { cn } from "@repo/ui/lib/utils";
import { formatDateString } from "@/lib/utils";
import { baseApiUrl } from "@/config/routes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/Container";

const Page = ({
     params,
}: {
     params: {
          slug: string
     }
}) => {
     const tGeneral = useTranslations("general");
     const tMonth = useTranslations("month")

     const [post, setPost] = useState<Post | null>(null);

     useEffect(() => {
          const fetchPost = async () => {
               try {
                    const response = await axios.get(`${baseApiUrl}/posts/${params.slug}`);
                    setPost(response.data);
               } catch (error) {
                    console.error('Error fetching the post:', error);
               }
          };

          fetchPost();
     }, [params.slug]);

     // Helper function to add IDs to headings
     const addIdsToHeadings = (html: string) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

          headingElements.forEach((heading) => {
               // Generate a unique ID based on the heading text or other logic
               const id = heading.textContent ? heading.textContent.trim().replace(/\s+/g, '-').toLowerCase() : '';
               if (id) {
                    heading.id = encodeURIComponent(id); // Encode the ID to handle non-ASCII characters
               }
          });

          return doc.body.innerHTML; // Return the modified HTML with IDs
     };

     const output = useMemo(() => {
          if (post) {
               const html = generateHTML(JSON.parse(post.desc), defaultExtensions);
               return addIdsToHeadings(html); // Add IDs to the generated HTML
          }
          return "";
     }, [post]);

     if (!post) {
          return (
               <Loading />
          )
     }

     const date = formatDateString(post.updatedAt)

     return (
          <Container>
               <Suspense fallback={<Loading />}>
                    <div className="relative flex flex-col sm:flex-row w-full h-full gap-x-[45px] py-[20px] sm:py-[25px]">
                         <div className="flex flex-col w-full flex-grow gap-y-[20px] text-[20px] leading-[2.5rem]">
                              <div>
                                   <div className="text-[32px] font-semibold cursor-text leading-[3rem] text-slate-800">
                                        {post.title}
                                   </div>

                                   <div className="text-[15px] font-light text-slate-600">
                                        {tGeneral("updated_at", { day: date.day, month: tMonth(date.month.toLowerCase()), year: date.year })}
                                   </div>
                              </div>

                              <div className={cn(
                                   "min-h-[450px] w-full rounded-[20px] bg-primary/[3%] mb-[10px] overflow-hidden",
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

                              <div className="w-full flex flex-col cursor-text">
                                   <div className="prose w-full flex flex-col" dangerouslySetInnerHTML={{ __html: output }} />
                              </div>
                         </div>

                         <div className="hidden md:block relative container min-w-[250px] max-w-[280px] text-slate-600 leading-[2rem] cursor-text px-0">
                              <div className="sticky top-[97px] flex flex-col w-full">
                                   <div className="text-[18px] font-medium text-slate-800">
                                        {tGeneral("table_of_contents")}
                                   </div>

                                   <TableOfContents content={output} />
                              </div>
                         </div>
                    </div>
               </Suspense>
          </Container>
     );
}

export default Page;
