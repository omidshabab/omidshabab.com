import PostItem from "./_components/PostItem";

const Page = () => {
     return (
          <div className="flex flex-col gap-y-[20px]">
               Your Created Posts
               <div className="flex-grow">
                    <div className="grid grid-cols-4 gap-x-[20px] gap-y-[30px]">
                         <PostItem />

                         <PostItem />

                         <PostItem />

                         <PostItem />

                         <PostItem />
                    </div>
               </div>
          </div>
     );
}

export default Page;