import {
     Check,
     ChevronDown,
     Heading1,
     Heading2,
     Heading3,
     Heading4,
     TextQuote,
     ListOrdered,
     TextIcon,
     Code,
     CheckSquare,
     type LucideIcon,
} from "lucide-react";
import { EditorBubbleItem, EditorInstance, useEditor } from "novel";

import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover";
import { Button } from "@repo/ui/components/ui/button";

export type SelectorItem = {
     name: string;
     icon: LucideIcon;
     command: (editor: EditorInstance) => void;
     isActive: (editor: EditorInstance) => boolean;
};

const items: SelectorItem[] = [
     {
          name: "Text",
          icon: TextIcon,
          command: (editor) => editor.chain().focus().clearNodes().run(),
          isActive: (editor) =>
               editor.isActive("paragraph") &&
               !editor.isActive("bulletList") &&
               !editor.isActive("orderedList"),
     },
     {
          name: "Heading 1",
          icon: Heading1,
          command: (editor) =>
               editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
          isActive: (editor) => editor.isActive("heading", { level: 1 }),
     },
     {
          name: "Heading 2",
          icon: Heading2,
          command: (editor) =>
               editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
          isActive: (editor) => editor.isActive("heading", { level: 2 }),
     },
     {
          name: "Heading 3",
          icon: Heading3,
          command: (editor) =>
               editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
          isActive: (editor) => editor.isActive("heading", { level: 3 }),
     },
     {
          name: "Heading 4",
          icon: Heading4,
          command: (editor) =>
               editor.chain().focus().clearNodes().toggleHeading({ level: 4 }).run(),
          isActive: (editor) => editor.isActive("heading", { level: 4 }),
     },
     // {
     //      name: "To-do List",
     //      icon: CheckSquare,
     //      command: (editor) =>
     //           editor.chain().focus().clearNodes().toggleTaskList().run(),
     //      isActive: (editor) => editor.isActive("taskItem"),
     // },
     // {
     //      name: "Bullet List",
     //      icon: ListOrdered,
     //      command: (editor) =>
     //           editor.chain().focus().clearNodes().toggleBulletList().run(),
     //      isActive: (editor) => editor.isActive("bulletList"),
     // },
     // {
     //      name: "Numbered List",
     //      icon: ListOrdered,
     //      command: (editor) =>
     //           editor.chain().focus().clearNodes().toggleOrderedList().run(),
     //      isActive: (editor) => editor.isActive("orderedList"),
     // },
     // {
     //      name: "Quote",
     //      icon: TextQuote,
     //      command: (editor) =>
     //           editor.chain().focus().clearNodes().toggleBlockquote().run(),
     //      isActive: (editor) => editor.isActive("blockquote"),
     // },
     {
          name: "Code",
          icon: Code,
          command: (editor) =>
               editor.chain().focus().clearNodes().toggleCodeBlock().run(),
          isActive: (editor) => editor.isActive("codeBlock"),
     },
];
interface NodeSelectorProps {
     open: boolean;
     onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
     const { editor } = useEditor();
     if (!editor) return null;

     const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
          name: "Multiple",
     };

     return (
          <Popover modal={true} open={open} onOpenChange={onOpenChange}>
               <PopoverTrigger
                    asChild
                    className="gap-2 rounded-none border-none hover:bg-primary/10 focus:ring-0">
                    <Button size="sm" variant="ghost" className="gap-2">
                         <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
                         <ChevronDown className="h-4 w-4" />
                    </Button>
               </PopoverTrigger>
               <PopoverContent sideOffset={15} align="start" className="w-[150px] p-1 border-none rounded-[15px] bg-primary/20 backdrop-blur-3xl border-[1px] border-primary/20">
                    {items.map((item, index) => (
                         <EditorBubbleItem
                              key={index}
                              onSelect={(editor) => {
                                   item.command(editor);
                                   onOpenChange(false);
                              }}
                              className="flex cursor-pointer items-center justify-between rounded-sm px-[8px] py-[6px] text-sm hover:bg-primary/10">
                              <div className="flex items-center space-x-2">
                                   <div className="rounded-sm p-1">
                                        <item.icon className="h-[15px] w-[15px]" />
                                   </div>
                                   <span className="text-[15px]">{item.name}</span>
                              </div>
                              {activeItem.name === item.name && <Check className="h-4 w-4" />}
                         </EditorBubbleItem>
                    ))}
               </PopoverContent>
          </Popover>
     );
};