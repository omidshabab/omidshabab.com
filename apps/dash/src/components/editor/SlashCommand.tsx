import {
     CheckSquare,
     Code,
     GalleryThumbnailsIcon,
     Heading1,
     Heading2,
     Heading3,
     Heading4,
     ImageIcon,
     List,
     ListOrdered,
     Text,
     TextQuote,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";
import { uploadFn } from "./ImageUpload";
import titlesEn from "../../../translations/en.json";
import titlesFa from "../../../translations/fa.json";

export const SuggestionItems = (locale: "en" | "fa") => {
     const titles = locale === "fa" ? titlesFa.suggestion_items : titlesEn.suggestion_items;

     return createSuggestionItems([
          {
               title: titles.textTitle,
               description: titles.textDescription,
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
          // {
          //      title: "To-do List",
          //      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem fugiat dolore a ut, doloremque sed maiores similique doloribus eius dolores quasi est consectetur ipsum vel iusto et incidunt dignissimos?",
          //      searchTerms: ["todo", "task", "list", "check", "checkbox"],
          //      icon: <CheckSquare size={18} />,
          //      command: ({ editor, range }) => {
          //           editor.chain().focus().deleteRange(range).toggleTaskList().run();
          //      },
          // },
          {
               title: titles.heading1Title,
               description: titles.heading1Description,
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
               title: titles.heading2Title,
               description: titles.heading2Description,
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
               title: titles.heading3Title,
               description: titles.heading3Description,
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
               title: titles.heading4Title,
               description: titles.heading4Description,
               searchTerms: ["subtitle", "small"],
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
          // {
          //      title: "Bullet List",
          //      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem fugiat dolore a ut, doloremque sed maiores similique doloribus eius dolores quasi est consectetur ipsum vel iusto et incidunt dignissimos?",
          //      searchTerms: ["unordered", "point"],
          //      icon: <List size={18} />,
          //      command: ({ editor, range }) => {
          //           editor.chain().focus().deleteRange(range).toggleBulletList().run();
          //      },
          // },
          // {
          //      title: "Numbered List",
          //      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem fugiat dolore a ut, doloremque sed maiores similique doloribus eius dolores quasi est consectetur ipsum vel iusto et incidunt dignissimos?",
          //      searchTerms: ["ordered"],
          //      icon: <ListOrdered size={18} />,
          //      command: ({ editor, range }) => {
          //           editor.chain().focus().deleteRange(range).toggleOrderedList().run();
          //      },
          // },
          // {
          //      title: "Quote",
          //      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem fugiat dolore a ut, doloremque sed maiores similique doloribus eius dolores quasi est consectetur ipsum vel iusto et incidunt dignissimos?",
          //      searchTerms: ["blockquote"],
          //      icon: <TextQuote size={18} />,
          //      command: ({ editor, range }) =>
          //           editor
          //                .chain()
          //                .focus()
          //                .deleteRange(range)
          //                .toggleNode("paragraph", "paragraph")
          //                .toggleBlockquote()
          //                .run(),
          // },
          {
               title: titles.codeTitle,
               description: titles.codeDescription,
               searchTerms: ["codeblock"],
               icon: <Code size={18} />,
               command: ({ editor, range }) =>
                    editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
          },
          {
               title: titles.imageTitle,
               description: titles.imageDescription,
               searchTerms: ["photo", "picture", "media"],
               icon: <GalleryThumbnailsIcon size={18} />,
               command: ({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).run();
                    // upload image
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async () => {
                         if (input.files?.length) {
                              const file = input.files[0];
                              const pos = editor.view.state.selection.from;
                              uploadFn(file, editor.view, pos);
                         }
                    };
                    input.click();
               },
          },
     ]);
}

export const slashCommand = Command.configure({
     suggestion: {
          items: () => SuggestionItems("en"),
          render: renderItems,
     },
});