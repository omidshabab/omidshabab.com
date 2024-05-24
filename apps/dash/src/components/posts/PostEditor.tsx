import { PostId } from "@/lib/db/schema/posts";
import PostForm from "./PostForm";
import { api } from "@/lib/trpc/api";

const PostEditor = async ({
     postId
}: {
     postId?: PostId
}) => {
     const result = postId ? await api.posts.getPostById.query({ id: postId }) : undefined;

     return (
          <PostForm post={result?.post} />
     );
}

export default PostEditor