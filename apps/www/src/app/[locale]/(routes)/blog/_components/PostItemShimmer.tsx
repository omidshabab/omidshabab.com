const PostItemShimmer = () => {
     return (
          <div
               className="group/item col-span-1 flex flex-col gap-y-[25px] animate-pulse">
               <div className="aspect-[6/3.5] bg-primary/5 rounded-[25px] group-hover/item:bg-primary/[6%] transition-all duration-500">

               </div>
               <div className="flex flex-col gap-y-[15px]">
                    <div className="w-full h-[20px] rounded-full bg-primary/5" />

                    <div className="w-1/2 h-[20px] rounded-full bg-primary/5" />
               </div>
          </div>
     );
}

export default PostItemShimmer;