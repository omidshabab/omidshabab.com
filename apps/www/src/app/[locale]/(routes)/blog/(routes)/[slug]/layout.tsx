import { baseApiUrl } from "@/config/routes";
import { Post } from "@/types";
import axios from "axios";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
     const res = await axios.get(`${baseApiUrl}/posts/${params.slug}`);
     const post: Post = res.data;

     return {
          title: post.title.toLowerCase(),
          description: JSON.parse(post.desc).content[0]?.content[0]?.text || 'Post description',
     };
};

export default function layout({
     children
}: {
     children: React.ReactNode
}) {
     return children
}
