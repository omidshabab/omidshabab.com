import { PauseIcon, PlayIcon } from "lucide-react";

const VideoPlayButton = ({
     isPlaying
}: {
     isPlaying?: boolean | false
}) => {
     return (
          <div
               className="p-[10px] bg-primary/5 hover:bg-primary/10 transition-all duration-500 rounded-full text-primary border-[2px] border-primary/20">
               {isPlaying ?
                    <PauseIcon className="w-[20px] h-[20px]" /> :
                    <PlayIcon className="w-[20px] h-[20px]" />
               }
          </div>
     );
}

export default VideoPlayButton;