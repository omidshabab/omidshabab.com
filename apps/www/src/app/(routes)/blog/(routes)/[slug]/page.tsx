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
          <div className="flex w-full h-full gap-x-[30px]">
               <div className="flex flex-col flex-grow gap-y-[45px] text-[20px] leading-[2.5rem]">
                    <div className="w-full aspect-[6/3] rounded-[20px] bg-primary/5">

                    </div>

                    <div className="w-full flex flex-col gap-y-[15px] cursor-text">
                         <div className="text-[26px] font-semibold leading-[2.5rem]">
                              Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur
                         </div>

                         <div className="text-[20px] text-slate-800">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, perspiciatis in doloremque molestias eum vitae fuga. A beatae dolor mollitia suscipit inventore tenetur harum itaque saepe, doloribus odit adipisci facilis.
                         </div>
                    </div>

               </div>

               <div className="min-w-[280px] max-w-[250px] col-span-3 text-slate-800 leading-[2rem] cursor-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis doloribus repellendus recusandae adipisci ipsum dolores dolor, quam voluptatem unde facilis pariatur vitae fugiat doloremque fuga tenetur nihil eum aliquid blanditiis.
               </div>
          </div>
     );
}

export default Page;