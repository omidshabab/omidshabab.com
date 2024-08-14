const SidebarSkeleton = () => {
     return (
          <div className="flex flex-col gap-y-2">
               <div className="w-1/2 h-[20px] rounded-full bg-primary/5 animate-pulse duration-700" />

               {[1, 2].map((index) => (
                    <div
                         key={index}
                         className="flex w-full h-[40px] bg-primary/5 animate-pulse duration-700 rounded-[10px] px-[10px] py-[8px] text-[14px] cursor-pointer hover:bg-primary/10 transition-all line-clamp-2 text-ellipsis" />
               ))}
          </div>
     );
}

export default SidebarSkeleton;