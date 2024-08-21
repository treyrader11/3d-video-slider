import { cn } from "@/lib/utils";
import React from "react";
// import dynamic from "next/dynamic";
import ReactPlayer from "react-player/lazy";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer({ id }: { id: string }) {
  return (
    <div
      className={cn(
        "video-player",
        "size-full",
        "overflow-hidden",
        "[&_>_div]:relative",
        "[&_>_div]:scale-150", // spinner
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
