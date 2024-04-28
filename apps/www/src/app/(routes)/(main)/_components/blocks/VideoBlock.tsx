"use client"

import { PauseIcon, PlayIcon } from "lucide-react";
import Block from "../Block";
import { useState } from "react";

const VideoBlock = () => {
     const [isPlaying, setIsPlaying] = useState<boolean>(false)

     const handlePlaying = () => {
          setIsPlaying(!isPlaying)
     }

     return (
          <Block
               onClick={() => handlePlaying()}
               className="md:col-span-4 row-span-4 flex justify-center items-center cursor-pointer">
               <div
                    className="p-[20px] bg-primary/5 hover:bg-primary/10 transition-all duration-500 rounded-full backdrop-blur-sm">
                    {isPlaying ?
                         <PauseIcon className="w-[35px] h-[35px]" /> :
                         <PlayIcon className="w-[35px] h-[35px]" />
                    }
               </div>
          </Block>
     );
}

export default VideoBlock;