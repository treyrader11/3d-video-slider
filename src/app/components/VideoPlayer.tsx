import { cn } from "@/lib/utils";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({ id }: { id: string }) {
  return (
    <div
      className={cn(
        "video-player",
        "size-full",
        "overflow-hidden",
        "[&_>_div]:relative",
        "[&_>_div]:scale-150", // spinner
        "[&_>_div]:size-8",
        "md:scale-[3]"
      )}
    >
      <ReactPlayer
        url={`https://vimeo.com/${id}`}
        controls={false}
        autoPlay={true}
        loop={true}
        playing
        muted
        width="100%"
        height="100%"
      />
    </div>
  );
}
