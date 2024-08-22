"use client";

import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VideoPlayer from "./VideoPlayer";
import { VIDEOS_DATA } from "@/lib/constants";
import { ClockLoader } from "react-spinners";

gsap.registerPlugin(useGSAP);

export default function Slider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useGSAP(() => {
    setIsClient(true);
    if (isClient && sliderRef.current) initializeCards();
  }, [isClient, sliderRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) handleClick();
    }, 2500);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const initializeCards = () => {
    if (!sliderRef.current) return;
    const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
    gsap.to(cards, {
      y: (i) => 0 + 12 * i + "%", //originally 20
      z: (i) => 15 * i,
      duration: 1,
      ease: "power3.out",
      stagger: -0.1,
    });
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    if (!slider) return;
    const cards = Array.from(slider.querySelectorAll(".card"));
    const lastCard = cards.pop();

    if (lastCard) {
      gsap.to(lastCard, {
        y: "+=150%",
        duration: 0.75,
        ease: "power3.inOut",
        onStart: () => {
          setTimeout(() => {
            slider.prepend(lastCard);
            initializeCards();
            setTimeout(() => {
              setIsAnimating(false);
            }, 1000);
          }, 300);
        },
      });
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <div
      style={{ perspective: "175px" }}
      className={cn("fixed size-screen overflow-hidden top-[4rem]")}
      onClick={handleClick}
      ref={sliderRef}
    >
      {isClient ? (
        VIDEOS_DATA.map((card, i) => (
          <Card key={i} {...card}>
            <VideoPlayer id={card.id} />
          </Card>
        ))
      ) : (
        <ClockLoader />
      )}
    </div>
  );
}

type CardProps = {
  className?: string;
  children: React.ReactNode;
  id: string;
  date: string;
  title: string;
  category: string;
};

function Card({ className, date, title, category, children }: CardProps) {
  return (
    <div
      style={{ transform: "translate3d(-50%, -50%, 0px)" }}
      className={cn(
        "card",
        "absolute",
        "fixed",
        // "top-1/2",
        "top-1/4",
        "left-1/2",
        "w-[65%]",
        "h-[50dvh]",
        "bg-black",
        "overflow-hidden",
        "border",
        "border-[#303030]",
        "rounded-lg",
        "flex",
        "flex-col",
        className
      )}
    >
      <header
        className={cn(
          "flex",
          "items-center",
          "bg-black",
          "z-20",
          "px-3",
          "py-2",
          className
        )}
      >
        <CardItem className="text-left">{date}</CardItem>
        <CardItem className="text-center">{title}</CardItem>
        <CardItem className="text-right">{category}</CardItem>
      </header>
      {children}
      <Overlay />
    </div>
  );
}

function CardItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 card-item")}>
      <p className={cn("text-[7px] text-[#6a6a6a]", className)}>{children}</p>
    </div>
  );
}

function Overlay() {
  return (
    <div
      className={cn(
        "absolute",
        "z-2",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "rounded-lg"
      )}
    />
  );
}

// "use client";

// import { cn } from "@/lib/utils";
// import React, { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import VideoPlayer from "./VideoPlayer";
// import { VIDEOS_DATA } from "@/lib/constants";
// import { ClockLoader } from "react-spinners";

// gsap.registerPlugin(useGSAP);

// export default function Slider() {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isClient, setIsClient] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [timeline, setTimeline] = useState<any>(null);

//   useGSAP(() => {
//     setIsClient(true);
//     if (isClient && sliderRef.current) initializeCards();
//   }, [isClient, sliderRef]);

//   const initializeCards = () => {
//     if (!sliderRef.current) return;
//     const cards = Array.from(sliderRef.current.querySelectorAll(".card"));

//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

//     tl.to(cards, {
//       y: (i) => 0 + 12 * i + "%",
//       z: (i) => 15 * i,
//       duration: 1,
//       ease: "power3.out",
//       stagger: -0.1,
//     })
//       .to(cards[cards.length - 1], {
//         y: "+=150%",
//         duration: 2000,
//         ease: "power3.inOut",
//         onComplete: () => {
//           sliderRef.current?.prepend(cards.pop()!);
//           tl.restart(); // Restart the timeline to continue the cycle
//         },
//       });

//     setTimeline(tl);
//   };

//   useEffect(() => {
//     if (timeline) {
//       timeline.play();
//     }
//     return () => {
//       if (timeline) {
//         timeline.kill();
//       }
//     };
//   }, [timeline]);

//   return (
//     <div
//       style={{ perspective: "175px" }}
//       className={cn("fixed size-screen overflow-hidden top-[4rem]")}
//       ref={sliderRef}
//     >
//       {isClient ? (
//         VIDEOS_DATA.map((card, i) => (
//           <Card key={i} {...card}>
//             <VideoPlayer id={card.id} />
//           </Card>
//         ))
//       ) : (
//         <ClockLoader />
//       )}
//     </div>
//   );
// }

// type CardProps = {
//   className?: string;
//   children: React.ReactNode;
//   id: string;
//   date: string;
//   title: string;
//   category: string;
// };

// function Card({ className, date, title, category, children }: CardProps) {
//   return (
//     <div
//       style={{ transform: "translate3d(-50%, -50%, 0px)" }}
//       className={cn(
//         "card",
//         "absolute",
//         "fixed",
//         "top-1/4",
//         "left-1/2",
//         "w-[65%]",
//         "h-[50dvh]",
//         "bg-black",
//         "overflow-hidden",
//         "border",
//         "border-[#303030]",
//         "rounded-lg",
//         "flex",
//         "flex-col",
//         className
//       )}
//     >
//       <header
//         className={cn(
//           "flex",
//           "items-center",
//           "bg-black",
//           "z-20",
//           "px-3",
//           "py-2",
//           className
//         )}
//       >
//         <CardItem className="text-left">{date}</CardItem>
//         <CardItem className="text-center">{title}</CardItem>
//         <CardItem className="text-right">{category}</CardItem>
//       </header>
//       {children}
//       <Overlay />
//     </div>
//   );
// }

// function CardItem({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div className={cn("flex-1 card-item")}>
//       <p className={cn("text-[7px] text-[#6a6a6a]", className)}>{children}</p>
//     </div>
//   );
// }

// function Overlay() {
//   return (
//     <div
//       className={cn(
//         "absolute",
//         "z-2",
//         "top-0",
//         "left-0",
//         "w-full",
//         "h-full",
//         "rounded-lg"
//       )}
//     />
//   );
// }
