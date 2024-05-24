"use client";

import Editor from "@/components/editor/Editor";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { defaultEditorValue } from "@/config/defaultEditorValue";
import { JSONContent } from "novel";
import { SyntheticEvent, useRef, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { toast } from "sonner";
import { insertPostParams, NewPostParams, Post } from "@/lib/db/schema/posts";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/client";

const PostForm = ({ post }: { post?: Post }) => {
     const editing = !!post?.id;

     const router = useRouter();
     const utils = trpc.useUtils(); // Ensure the trpc context is used correctly

     const [title, setTitle] = useState(
          post?.title ?? "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur"
     );

     const [desc, setDesc] = useState<JSONContent>(defaultEditorValue);

     const titleRef = useRef<HTMLDivElement>(null);

     const handleTitle = (event: SyntheticEvent<HTMLDivElement>) => {
          const target = event.target as HTMLDivElement;
          setTitle(target.innerHTML);
     };

     const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
          if (event.key === "Enter") {
               event.preventDefault();
          }
     };

     const form = useForm<z.infer<typeof insertPostParams>>({
          resolver: zodResolver(insertPostParams),
          defaultValues: {
               title: "",
               published: false,
          },
     });

     const onSuccess = async (action: "create" | "update" | "delete", data?: { error?: string }) => {
          if (data?.error) {
               toast.error(data.error);
               return;
          }

          await utils.posts.getPosts.invalidate();
          router.refresh();

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
          onSuccess: () => onSuccess("create"),
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
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex w-full h-full gap-x-[30px] flex-grow">
                         <ScrollArea className="w-full h-full scroll-mx-12 none-scroll-bar overflow-y-hidden">
                              <div className="flex flex-col h-full flex-grow overflow-y-hidden gap-y-[20px]">
                                   <div>
                                        Edit Post:
                                        <FormField
                                             control={form.control}
                                             name="title"
                                             render={({ field }) => (
                                                  <FormItem>
                                                       <FormControl>
                                                            <div {...field}>
                                                                 <span
                                                                      onChange={handleTitle}
                                                                      contentEditable
                                                                      role="textbox"
                                                                      ref={titleRef}
                                                                      onKeyDown={handleKeyDown}
                                                                      dangerouslySetInnerHTML={{ __html: title }}
                                                                      className="textarea max-w-full text-[30px] block h-full overflow-hidden resize-none font-semibold leading-[3rem] bg-transparent text-start focus-visible:outline-none cursor-text"
                                                                      title="Post Title"
                                                                 />
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
                              <div className="flex h-fit flex-col min-w-[300px] max-w-[350px] bg-primary/[3%] rounded-[20px] mb-[35px]">
                                   <div className="flex-grow px-[25px] py-[15px]">
                                        <div className="text-[18px]">Post Settings</div>
                                        <p className="text-[16px] leading-[1.8rem] text-slate-800 font-normal">
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                                             pariatur quos possimus beatae.
                                        </p>
                                        <Input
                                             placeholder="Type it here ..."
                                             className="text-start sm:text-[16px] py-[10px] leading-[1.5rem] mb-[5px]"
                                        />
                                        <p className="text-[13px] leading-[1.5rem] text-slate-600 font-normal">
                                             Lorem ipsum dolor
                                        </p>
                                   </div>
                                   <div className="border-t-[1px] border-primary/10 h-min w-full flex items-end justify-end gap-x-[10px] px-[20px] py-[15px]">
                                        <Button
                                             onClick={() => handleSubmit({ title: title, desc: desc.content?.toString() ?? "lorem", published: false })}
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
                                   </div>
                              </div>
                         </div>
                    </div>
               </form>
          </Form>
     );
};

export default PostForm;
