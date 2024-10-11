"use client"

import React, { useState } from "react"
import {
     EditorRoot,
     EditorCommand,
     EditorCommandItem,
     EditorCommandEmpty,
     EditorContent,
     type JSONContent,
     EditorCommandList,
     EditorBubble,
} from "novel"
import {
     handleCommandNavigation,
     ImageResizer
} from "novel/extensions"
import { defaultExtensions } from "./Extensions"
import { NodeSelector } from "./selectors/NodeSelector"
import { LinkSelector } from "./selectors/LinkSelector"

import { TextButtons } from "./selectors/TextButtons"
import { handleImageDrop, handleImagePaste } from "novel/plugins"
import { uploadFn } from "@/uploadthing/novel-plugin";

import { useTranslations } from "next-intl";
import { Code, GalleryThumbnailsIcon, Heading1, Heading2, Heading3, Heading4, Text } from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

interface EditorProp {
     initialValue?: JSONContent;
     onChange: (value: JSONContent) => void;
}

const Editor = ({ initialValue, onChange }: EditorProp) => {
     const [openNode, setOpenNode] = useState(false);
     const [openLink, setOpenLink] = useState(false);

     const t = useTranslations("suggestion_items");

     const suggestionItems = createSuggestionItems([
          {
               title: t("text.title"),
               description: t("text.description"),
               searchTerms: ["p", "paragraph"],
               icon: <Text size={18} />,
               command: ({ editor, range }) => {
                    editor
                         .chain()
                         .focus()
                         .deleteRange(range)
                         .toggleNode("paragraph", "paragraph")
                         .run();
               },
          },
          {
               title: t("heading1.title"),
               description: t("heading1.description"),
               searchTerms: ["title", "big", "large"],
               icon: <Heading1 size={18} />,
               command: ({ editor, range }) => {
                    editor
                         .chain()
                         .focus()
                         .deleteRange(range)
                         .setNode("heading", { level: 1 })
                         .run();
               },
          },
          {
               title: t("heading2.title"),
               description: t("heading2.description"),
               searchTerms: ["subtitle", "medium"],
               icon: <Heading2 size={18} />,
               command: ({ editor, range }) => {
                    editor
                         .chain()
                         .focus()
                         .deleteRange(range)
                         .setNode("heading", { level: 2 })
                         .run();
               },
          },
          {
               title: t("heading3.title"),
               description: t("heading3.description"),
               searchTerms: ["subtitle", "small"],
               icon: <Heading3 size={18} />,
               command: ({ editor, range }) => {
                    editor
                         .chain()
                         .focus()
                         .deleteRange(range)
                         .setNode("heading", { level: 3 })
                         .run();
               },
          },
          {
               title: t("heading4.title"),
               description: t("heading4.description"),
               searchTerms: ["subtitle", ""],
               icon: <Heading4 size={18} />,
               command: ({ editor, range }) => {
                    editor
                         .chain()
                         .focus()
                         .deleteRange(range)
                         .setNode("heading", { level: 4 })
                         .run();
               },
          },
          {
               title: t("code.title"),
               description: t("code.description"),
               searchTerms: ["codeblock"],
               icon: <Code size={18} />,
               command: ({ editor, range }) =>
                    editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
          },
          {
               title: t("image.title"),
               description: t("image.description"),
               searchTerms: ["photo", "picture", "media"],
               icon: <GalleryThumbnailsIcon size={18} />,
               command: ({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).run();

                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async () => {
                         if (input.files?.length) {
                              const file = input.files[0];
                              const pos = editor.view.state.selection.from;
                              uploadFn(file!, editor.view, pos);
                         }
                    };
                    input.click();
               },
          },
     ]);

     const slashCommand = Command.configure({
          suggestion: {
               items: () => suggestionItems,
               render: renderItems,
          },
     });

     const extensions = [...defaultExtensions, slashCommand]

     return (
          <EditorRoot>
               <EditorContent
                    {...(initialValue && { initialContent: initialValue })}
                    extensions={extensions}
                    editorProps={{
                         handleDOMEvents: {
                              keydown: (_view, event) => handleCommandNavigation(event),
                         },
                         handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
                         handleDrop: (view, event, _slice, moved) =>
                              handleImageDrop(view, event, moved, uploadFn),
                         attributes: {
                              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full cursor-text`,
                         },
                    }}
                    onUpdate={({ editor }) => {
                         onChange(editor.getJSON());
                    }}
               // slotAfter={<ImageResizer />}
               >
                    <EditorCommand className="z-50 none-scroll-bar w-[160px] h-auto max-h-[300px] overflow-y-auto rounded-[15px] bg-primary/10 backdrop-blur-3xl border-[1px] border-primary/20 px-[5px] py-[5px] transition-all">
                         <EditorCommandEmpty className="px-[20px] text-text">
                              {t("no_results")}
                         </EditorCommandEmpty>
                         <EditorCommandList>
                              {suggestionItems.map((item) => (
                                   <EditorCommandItem
                                        value={item.title}
                                        onCommand={(val) => item.command?.(val)}
                                        className={`flex w-full items-center gap-x-[10px] rounded-[10px] px-[10px] py-[8px] hover:bg-primary/10 aria-selected:bg-primary/10 cursor-pointer`}
                                        key={item.title}>
                                        <div>
                                             {item.icon}
                                        </div>
                                        <p className="font-medium text-[15px]">
                                             {item.title}
                                        </p>
                                   </EditorCommandItem>
                              ))}
                         </EditorCommandList>
                    </EditorCommand>

                    <EditorBubble
                         tippyOptions={{
                              placement: "top",
                         }}
                         className="flex w-fit max-w-[90vw] h-full overflow-hidden rounded-[10px] bg-primary/20 backdrop-blur-3xl border-[1px] border-primary/20">

                         <NodeSelector open={openNode} onOpenChange={setOpenNode} />

                         <LinkSelector open={openLink} onOpenChange={setOpenLink} />

                         <TextButtons />

                    </EditorBubble>
               </EditorContent>
          </EditorRoot>
     );
};

export default Editor;