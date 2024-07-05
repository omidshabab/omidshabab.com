"use client";

import Editor from "@/components/editor/Editor";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { defaultEditorValue, defaultPersianEditorValue } from "@/config/defaultEditorValue";
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
import { useEffect, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { englishBricolageGrotesqueFont, LangDir, LangFont } from "@/lib/fonts";
import { dashRoutes } from "@/config/routes";
import { createSlug, generateRandomString, isValidLocale } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";


const { TextArea } = Input;

const PostForm = ({ post }: { post?: Post }) => {
     const editing = !!post?.id;

     const router = useRouter();
     const utils = trpc.useUtils();

     const locale = useLocale()

     let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

     if (isValidLocale(locale)) {
          newLocale = locale;
     }

     const tGeneral = useTranslations("general")
     const tPostPage = useTranslations("post_page")

     const dir = LangDir(locale)
     const font = LangFont(locale)

     const [title, setTitle] = useState<string>(post?.title ?? tPostPage("default_title"))

     const [desc, setDesc] = useState<JSONContent>((post && post.desc) ? (JSON.parse(post.desc)) : locale === "en" ? defaultEditorValue : defaultPersianEditorValue);

     const [slug, setSlug] = useState<string>(post?.slug ?? createSlug(title))

     const [image, setImage] = useState<string>(post?.image ?? "")

     const [published, setPublished] = useState<boolean>(post?.published ?? false)

     useEffect(() => {
          if (post?.slug === "" || post?.slug === undefined) setSlug(createSlug(title))
     }, [post?.slug, title])

     const form = useForm<z.infer<typeof insertPostParams>>({
          resolver: zodResolver(insertPostParams),
          defaultValues: {
               title: "",
               desc: "",
               slug: "",
               image: "",
               locale: newLocale,
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

     const handleSubmit = (values: NewPostParams) => {
          if (editing) {
               updatePost({ ...values, id: post.id });
          } else {
               createPost(values);
          }
     };

     const handlePostCover = (file: File) => {
          const promise = fetch("/api/upload", {
               method: "POST",
               headers: {
                    "content-type": file?.type || "application/octet-stream",
                    "x-vercel-filename": file?.name || "image.png",
               },
               body: file,
          });

          return new Promise((resolve) => {
               toast.promise(
                    promise.then(async (res) => {
                         if (res.status === 200) {
                              const { url } = (await res.json()) as any;
                              let image = new Image();
                              image.src = url;
                              image.onload = () => {
                                   setImage(url);
                                   resolve(url);
                              };
                         } else if (res.status === 401) {
                              resolve(file);
                              throw new Error(
                                   "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
                              );
                              // Unknown error
                         } else {
                              throw new Error(`Error uploading image. Please try again.`);
                         }
                    }),
                    {
                         loading: "Uploading image...",
                         success: "Image uploaded successfully.",
                         error: (e) => e.message,
                    },
               );
          });
     };

     return (
          <div className="w-full h-full">
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(handleSubmit)}
                         className="flex flex-col md:flex-row h-full gap-x-[30px] flex-grow">
                         <ScrollArea dir={dir} className="w-full h-full scroll-mx-12 none-scroll-bar overflow-y-hidden">
                              <div className="flex flex-col h-full flex-grow overflow-y-hidden gap-y-[20px]">
                                   <div className="h-min">
                                        {tPostPage("edit_post")}:
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
                                                                           "text-start h-min text-[32px] px-0 py-0 none-scroll-bar focus:ring-0 focus-visible:ring-0 cursor-text font-semibold rounded-[0px]",
                                                                           font,
                                                                      )} />
                                                            </div>
                                                       </FormControl>
                                                       <FormMessage />
                                                  </FormItem>
                                             )}
                                        />
                                   </div>
                                   <div
                                        onClick={() => {
                                             const input = document.createElement("input");
                                             input.type = "file";
                                             input.accept = "image/*";
                                             input.onchange = async () => {
                                                  if (input.files?.length) {
                                                       const file = input.files[0];
                                                       handlePostCover(file)
                                                  }
                                             };
                                             input.click();
                                        }}
                                        className={cn(
                                             "min-h-[450px] w-full rounded-[20px] bg-primary/[3%] hover:bg-primary/[6%] transition-all duration-500 cursor-pointer mb-[10px] overflow-hidden",
                                             image !== "" && "rounded-none"
                                        )}>

                                        {image && (
                                             <img
                                                  alt={post?.slug}
                                                  src={image}
                                                  className="w-full h-full object-cover" />
                                        )}

                                   </div>
                                   <div className="pb-[35px]">
                                        <Editor initialValue={desc} onChange={setDesc} />
                                   </div>
                              </div>
                         </ScrollArea>
                         <div className="hidden lg:block h-full">
                              <div className="h-full">
                                   <div className="flex h-fit flex-col min-w-[300px] max-w-[350px] bg-primary/[3%] rounded-[20px] mb-[35px]">
                                        <div className="flex-grow px-[25px] py-[15px]">
                                             <div className="text-[18px]">{tPostPage("post_settings")}</div>
                                             <p className="text-[16px] leading-[1.8rem] text-slate-800 font-normal">
                                                  {tGeneral("lorem")}
                                             </p>

                                             <div className="border-b-[2px] border-primary/10 mb-[5px]">
                                                  <TextArea
                                                       value={slug}
                                                       placeholder="type the post slug here ..."
                                                       autoSize
                                                       variant="borderless"
                                                       dir="ltr"
                                                       maxLength={100}
                                                       onChange={(value) => setSlug(value.currentTarget.value)}
                                                       className={cn(
                                                            "text-start sm:text-[16px] py-[10px] leading-[1.5rem] h-min text-[32px] px-0 none-scroll-bar focus:ring-0 focus-visible:ring-0 cursor-text",
                                                            englishBricolageGrotesqueFont.className,
                                                       )}
                                                  />
                                             </div>

                                             <p className="text-[13px] leading-[1.5rem] text-slate-600 font-normal">
                                                  {tPostPage("slug_seperate_hint")}
                                             </p>
                                        </div>
                                        <div className="border-t-[1px] border-primary/10 h-min w-full flex items-end justify-end gap-x-[10px] px-[20px] py-[15px]">
                                             <Button
                                                  onClick={() => handleSubmit({
                                                       title: title,
                                                       desc: JSON.stringify(desc) ?? defaultEditorValue,
                                                       slug: slug === "" ? generateRandomString(20) : slug,
                                                       image: image,
                                                       published: published,
                                                       locale: newLocale,
                                                  })}
                                                  disabled={isCreating || isUpdating}
                                                  variant="secondary"
                                                  size="sm">
                                                  {tPostPage("save_post")}
                                             </Button>

                                             {post?.published ? (
                                                  <Button
                                                       onClick={() => handleSubmit({
                                                            title: title,
                                                            desc: JSON.stringify(desc) ?? defaultEditorValue,
                                                            slug: slug === "" ? generateRandomString(20) : slug,
                                                            image: image,
                                                            published: false,
                                                            locale: newLocale
                                                       })}
                                                       disabled={isCreating || isUpdating}
                                                       variant="secondary"
                                                       size="sm">
                                                       {tPostPage("published")}
                                                  </Button>
                                             ) : (
                                                  <Button
                                                       onClick={() => handleSubmit({
                                                            title: title,
                                                            desc: JSON.stringify(desc) ?? defaultEditorValue,
                                                            slug: slug === "" ? generateRandomString(20) : slug,
                                                            image: image,
                                                            published: true,
                                                            locale: newLocale,
                                                       })}
                                                       disabled={isCreating || isUpdating}
                                                       variant="default"
                                                       size="sm">
                                                       {tPostPage("publish")}
                                                  </Button>
                                             )}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </form>
               </Form>
          </div>
     );
};

export default PostForm;
