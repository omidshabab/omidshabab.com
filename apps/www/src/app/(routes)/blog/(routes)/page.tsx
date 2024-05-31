"use client"

import { PostType } from "@/src/types";
import { useEffect, useState } from "react";

const Page = () => {
     const [posts, setPosts] = useState<PostType[]>([]);

     return (
          <div>
               {posts.map((post, index) => (
                    <div key={index}>
                         {post.slug}
                    </div>
               ))}
          </div>
     );
}

export default Page;