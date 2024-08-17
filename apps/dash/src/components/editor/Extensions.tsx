import {
     TiptapImage,
     TiptapLink,
     UpdatedImage,
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
               "text-text no-underline hover:text-primary transition-colors cursor-pointer",
          ),
     },
});

const tiptapImage = TiptapImage.extend({
     addProseMirrorPlugins() {
          return [
               UploadImagesPlugin({
                    imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
               }),
          ];
     },
}).configure({
     allowBase64: true,
     HTMLAttributes: {
          class: cx("rounded-lg border border-muted"),
     },
});

const updatedImage = UpdatedImage.configure({
     HTMLAttributes: {
          class: cx("rounded-lg border border-muted"),
     },
});

const horizontalRule = HorizontalRule.configure({
     HTMLAttributes: {
          class: cx("mt-4 mb-6 border-t border-muted-foreground"),
     },
});

const starterKit = StarterKit.configure({
     codeBlock: {
          HTMLAttributes: {
               dir: "ltr",
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
     tiptapImage,
     updatedImage,
     horizontalRule,
     aiHighlight,
];