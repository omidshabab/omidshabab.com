import { allPosts } from 'contentlayer/generated'

const Page = ({
     params,
}: {
     params: {
          slug: string
     }
}) => {
     const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

     return (
          <div className="flex w-full h-full gap-x-5">
               <div className="flex-grow bg-primary/5 cursor-text text-[20px] leading-[2.5rem]">
                    `${post?.body.code}`
               </div>

               <div className="min-w-[280px] max-w-[250px] col-span-3 bg-primary/5">
                    {post?.title}
               </div>
          </div>
     );
}

export default Page;