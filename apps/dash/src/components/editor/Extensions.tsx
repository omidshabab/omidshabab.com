import {
     // TiptapImage,
     TiptapLink,
     UpdatedImage,
     // TaskList,
     // TaskItem,
     HorizontalRule,
     StarterKit,
     Placeholder,
     AIHighlight,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";

import { cx } from "class-variance-authority";
import { englishBricolageGrotesqueFont } from "@/lib/fonts";

const aiHighlight = AIHighlight;
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
     HTMLAttributes: {
          class: cx(
               "text-text underline underline-offset-[1px] hover:text-primary transition-colors cursor-pointer",
          ),
     },
});

// const tiptapImage = TiptapImage.extend({
//      addProseMirrorPlugins() {
//           return [
//                UploadImagesPlugin({
//                     imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
//                }),
//           ];
//      },
// }).configure({
//      allowBase64: true,
//      HTMLAttributes: {
//           class: cx("rounded-lg border border-muted"),
//      },
// });

const updatedImage = UpdatedImage.configure({
     HTMLAttributes: {
          class: cx("rounded-lg border border-muted"),
     },
});

// const taskList = TaskList.configure({
//      HTMLAttributes: {
//           class: cx("not-prose pl-2 "),
//      },
// });

// const taskItem = TaskItem.configure({
//      HTMLAttributes: {
//           class: cx("flex gap-2 items-start my-4"),
//      },
//      nested: true,
// });

const horizontalRule = HorizontalRule.configure({
     HTMLAttributes: {
          class: cx("mt-4 mb-6 border-t border-muted-foreground"),
     },
});

const starterKit = StarterKit.configure({
     // bulletList: {
     //      HTMLAttributes: {
     //           class: cx("list-disc list-outside leading-3 -mt-2"),
     //      },
     // },
     // orderedList: {
     //      HTMLAttributes: {
     //           class: cx("list-decimal list-outside leading-3 -mt-2"),
     //      },
     // },
     // listItem: {
     //      HTMLAttributes: {
     //           class: cx("leading-normal"),
     //      },
     // },
     // blockquote: {
     //      HTMLAttributes: {
     //           class: cx("border-l-4 border-primary"),
     //      },
     // },
     codeBlock: {
          HTMLAttributes: {
               class: cx(
                    "rounded-[20px] bg-primary/[3%] text-[22px] leading-[2.5rem] text-text px-[30px] py-[20px] mb-[25px] mt-[10px] font-normal",
                    englishBricolageGrotesqueFont.className,
               ),
          },
     },
     code: {
          HTMLAttributes: {
               class: cx("rounded-[8px] bg-primary/5 px-[10px] py-1 font-medium"),
               spellcheck: "false",
          },
     },
     horizontalRule: false,
     dropcursor: {
          color: "#DBEAFE",
          width: 4,
     },
     gapcursor: false,
});

export const defaultExtensions = [
     starterKit,
     placeholder,
     tiptapLink,
     // tiptapImage,
     updatedImage,
     // taskList,
     // taskItem,
     horizontalRule,
     aiHighlight,
];