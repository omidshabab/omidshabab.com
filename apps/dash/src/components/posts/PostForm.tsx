"use client";

import Editor from "@/components/editor/Editor";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { defaultEditorValue } from "@/config/defaultEditorValue";
import { JSONContent } from "novel";
import { Input } from 'antd';
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "sonner";
import { insertPostParams, NewPostParams, Post } from "@/lib/db/schema/posts";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { englishBricolageGrotesqueFont } from "@/lib/fonts";
import PostSettings from "./PostSettings";
import { dashRoutes } from "@/config/routes";

const { TextArea } = Input;

const PostForm = ({ post }: { post?: Post }) => {
     const editing = !!post?.id;

     const router = useRouter();
     const utils = trpc.useUtils(); // Ensure the trpc context is used correctly

     const [title, setTitle] = useState<string>(post?.title ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur quos possimus beatae")

     const [desc, setDesc] = useState<JSONContent>(post?.desc ?? defaultEditorValue);

     const form = useForm<z.infer<typeof insertPostParams>>({
          resolver: zodResolver(insertPostParams),
          defaultValues: {
               title: "",
               published: false,
          },
     });

     const onSuccess = async (action: "create" | "update" | "delete", data?: { error?: string, post: Post }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          await utils.posts.getPosts.invalidate();

          if (action === "create") {
               router.push(dashRoutes.posts + "/" + data?.post?.id);
          } else if (action === "update") {
               router.refresh();
          }

          toast.success(`Post ${action}d!`);
     };

     const onError = async (action: "create" | "update" | "delete", data?: { error?: string }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          toast.error(`Post ${action} failed!`);
     };

     const { mutate: createPost, isLoading: isCreating } = trpc.posts.createPost.useMutation({
          onSuccess: (data) => onSuccess("create", data),
          onError: (err) => onError("create", { error: err.message }),
     });

     const { mutate: updatePost, isLoading: isUpdating } = trpc.posts.updatePost.useMutation({
          onSuccess: () => onSuccess("update"),
          onError: (err) => onError("update", { error: err.message }),
     });

     const { mutate: deletePost, isLoading: isDeleting } = trpc.posts.deletePost.useMutation({
          onSuccess: () => onSuccess("delete"),
          onError: (err) => onError("delete", { error: err.message }),
     });

     const handleSubmit = (values: NewPostParams) => {
          if (editing) {
               updatePost({ ...values, id: post.id });
          } else {
               createPost(values);
          }
     };

     return (
          <div className="w-full h-full">
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full gap-x-[30px] flex-grow">
                         <ScrollArea className="w-full h-full scroll-mx-12 none-scroll-bar overflow-y-hidden">
                              <div className="flex flex-col h-full flex-grow overflow-y-hidden gap-y-[20px]">
                                   <div className="h-min">
                                        Edit Post:
                                        <FormField
                                             control={form.control}
                                             name="title"
                                             render={({ field }) => (
                                                  <FormItem>
                                                       <FormControl>
                                                            <div {...field}>
                                                                 <TextArea
                                                                      value={title}
                                                                      placeholder="Type the post title here..."
                                                                      variant="borderless"
                                                                      autoSize
                                                                      maxLength={150}
                                                                      onChange={(value) => setTitle(value.currentTarget.value)}
                                                                      className={cn(
                                                                           "text-start h-min text-[32px] px-0 py-0 none-scroll-bar cursor-text font-semibold",
                                                                           englishBricolageGrotesqueFont.className,
                                                                      )} />
                                                            </div>
                                                       </FormControl>
                                                       <FormMessage />
                                                  </FormItem>
                                             )}
                                        />
                                   </div>
                                   <div className="w-full aspect-[6/3] rounded-[20px] bg-primary/[3%] hover:bg-primary/[6%] transition-all duration-500 cursor-pointer mb-[10px]"></div>
                                   <div className="pb-[35px]">
                                        <Editor initialValue={desc} onChange={setDesc} />
                                   </div>
                              </div>
                         </ScrollArea>
                         <div className="h-full">
                              <PostSettings
                                   buttons={
                                        <>
                                             <Button
                                                  onClick={() => handleSubmit({ title: title, desc: desc ?? "lorem", published: false })}
                                                  disabled={isCreating || isUpdating}
                                                  variant="secondary"
                                                  size="sm">
                                                  Save the Post
                                             </Button>
                                             <Button
                                                  disabled={isCreating || isUpdating}
                                                  variant="default"
                                                  size="sm">
                                                  Publish
                                             </Button>
                                        </>
                                   } />
                         </div>
                    </form>
               </Form>
          </div>
     );
};

export default PostForm;
