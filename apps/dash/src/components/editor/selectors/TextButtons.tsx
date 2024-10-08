import { cn } from "@repo/ui/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
     BoldIcon,
     ItalicIcon,
     UnderlineIcon,
     StrikethroughIcon,
     CodeIcon,
} from "lucide-react";
import type { SelectorItem } from "./NodeSelector";
import { Button } from "@repo/ui/components/button";

export const TextButtons = () => {
     const { editor } = useEditor();
     if (!editor) return null;

     const items: SelectorItem[] = [
          {
               name: "bold",
               isActive: (editor) => editor.isActive("bold"),
               command: (editor) => editor.chain().focus().toggleBold().run(),
               icon: BoldIcon,
          },
          {
               name: "code",
               isActive: (editor) => editor.isActive("code"),
               command: (editor) => editor.chain().focus().toggleCode().run(),
               icon: CodeIcon,
          },
     ];

     return (
          <div className="flex">
               {items.map((item, index) => (
                    <EditorBubbleItem
                         key={index}
                         onSelect={(editor) => {
                              item.command(editor);
                         }}>
                         <Button size="sm" className="rounded-none hover:bg-primary/15" variant="ghost">
                              <item.icon
                                   className={cn("h-4 w-4", {
                                        "text-text": item.isActive(editor),
                                   })}
                              />
                         </Button>
                    </EditorBubbleItem>
               ))}
          </div>
     );
};