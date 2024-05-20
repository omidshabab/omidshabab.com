import { cn } from "@repo/ui/lib/utils";
import { useEditor } from "novel";
import { Check, Trash } from "lucide-react";
import {
     type Dispatch,
     type FC,
     type SetStateAction,
     useEffect,
     useRef,
} from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
     PopoverContent,
     Popover,
     PopoverTrigger,
} from "@repo/ui/components/ui/popover";

export function isValidUrl(url: string) {
     try {
          new URL(url);
          return true;
     } catch (e) {
          return false;
     }
}
export function getUrlFromString(str: string) {
     if (isValidUrl(str)) return str;
     try {
          if (str.includes(".") && !str.includes(" ")) {
               return new URL(`https://${str}`).toString();
          }
     } catch (e) {
          return null;
     }
}
interface LinkSelectorProps {
     open: boolean;
     onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
     const inputRef = useRef<HTMLInputElement>(null);
     const { editor } = useEditor();

     // Autofocus on input by default
     useEffect(() => {
          inputRef.current && inputRef.current?.focus();
     });
     if (!editor) return null;

     return (
          <Popover modal={true} open={open} onOpenChange={onOpenChange}>
               <PopoverTrigger asChild>
                    <Button
                         size="sm"
                         variant="ghost"
                         className="gap-[15px] border-0 rounded-none">
                         <p
                              className={cn("text-slate-800 text-[15px]", {
                                   "text-text": editor.isActive("link"),
                              })}>
                              Link
                         </p>
                    </Button>
               </PopoverTrigger>
               <PopoverContent align="start" className="w-[200px] p-0 bg-primary/5 backdrop-blur-md border-[2px] border-text/10 rounded-[10px]" sideOffset={10}>
                    <form
                         onSubmit={(e) => {
                              const target = e.currentTarget as HTMLFormElement;
                              e.preventDefault();
                              const input = target[0] as HTMLInputElement;
                              const url = getUrlFromString(input.value);
                              url && editor.chain().focus().setLink({ href: url }).run();
                         }}
                         className="flex items-center">
                         <input
                              ref={inputRef}
                              type="text"
                              placeholder="Paste a link"
                              className="flex-grow bg-transparent px-[12px] py-[10px] text-sm outline-none"
                              defaultValue={editor.getAttributes("link").href || ""} />
                         {editor.getAttributes("link").href ? (
                              <Button
                                   size="icon"
                                   variant="outline"
                                   type="button"
                                   className="rounded-sm px-[5px] py-[5px] bg-primary/5 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
                                   onClick={() => {
                                        editor.chain().focus().unsetLink().run();
                                   }}
                              >
                                   <Trash className="w-[25px] h-[25px]" />
                              </Button>
                         ) : (
                              <Button size="icon" className="h-full aspect-square bg-primary/10 px-[5px] py-[5px] text-text hover:bg-primary/15">
                                   <Check className="w-[20px] h-[20px]" />
                              </Button>
                         )}
                    </form>
               </PopoverContent>
          </Popover>
     );
};