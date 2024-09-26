import {
     Code,
     GalleryThumbnailsIcon,
     Heading1,
     Heading2,
     Heading3,
     Heading4,
     Text,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";
import { uploadFn } from "@/uploadthing/novel-plugin";

export const suggestionItems = createSuggestionItems([
     {
          title: "Text",
          description: "Lorem ipsum dolor sit amet...",
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
          title: "Heading 1",
          description: "Lorem ipsum dolor sit amet...",
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
          title: "Heading 2",
          description: "Lorem ipsum dolor sit amet...",
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
          title: "Heading 3",
          description: "Small section heading.",
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
          title: "Heading 4",
          description: "Small section heading.",
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
          title: "Code",
          description: "Capture a code snippet.",
          searchTerms: ["codeblock"],
          icon: <Code size={18} />,
          command: ({ editor, range }) =>
               editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
     },
     {
          title: "Image",
          description: "Upload an image from your computer.",
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

export const slashCommand = Command.configure({
     suggestion: {
          items: () => suggestionItems,
          render: renderItems,
     },
});