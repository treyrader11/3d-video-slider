// "use client";

// import { cn } from "@/lib/utils";
// import React, { useEffect, useState, useRef } from "react";
// import gsap from "gsap";
// import { VIDEOS_DATA } from "@/lib/constants";
// import VideoPlayer from "./VideoPlayer";

// export default function Slider() {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => setIsClient(true), []);

//   useEffect(() => {
//     if (isClient && sliderRef.current) initializeCards();
//   }, [isClient, sliderRef]);

//   const initializeCards = () => {
//     if (!sliderRef.current) return;

//     const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
//     gsap.to(cards, {
//       y: (i) => 0 + 20 * i + "%",
//       z: (i) => 15 * i,
//       duration: 1,
//       ease: "power3.out",
//       stagger: -0.1,
//     });
//   };

//   const handleClick = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     const slider = sliderRef.current;
//     if (!slider) return;

//     const cards = Array.from(slider.querySelectorAll(".card"));
//     const lastCard = cards.pop();

//     if (!lastCard) return;

//     gsap.to(lastCard, {
//       y: "+=150%",
//       duration: 0.75,
//       ease: "power3.inOut",
//       onStart: () => {
//         setTimeout(() => {
//           slider.prepend(lastCard);
//           initializeCards();
//           setTimeout(() => {
//             setIsAnimating(false);
//           }, 1000);
//         }, 300);
//       },
//     });
//   };

//   return (
//     <div
//       style={{ perspective: "175px" }}
//       className={cn(
//         "absolute",

//         "size-screen",
//         "overflow-hidden",
//         "z-50"
//       )}
//       onClick={handleClick}
//       ref={sliderRef}
//     >
//       {VIDEOS_DATA.map((card, i) => (
//         <Card key={i} {...card}>
//           <VideoPlayer id={card.id} />
//         </Card>
//       ))}
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
//     <>
//       <div
//         style={{ transform: "translate3d(-50%, -50%, 0px)" }}
//         className={cn(
//           "card", // targeting the card class
//           "absolute",
//           "top-1/2",
//           "left-1/2",
//           "w-[65%]",
//           "h-[500px]",
//           "bg-black",
//           "overflow-hidden",
//           "border",
//           "border-r-[#303030]",
//           "border",
//           "border-[#303030]",
//           "overflow-hidden",
//           "rounded-lg",
//           "flex",
//           "flex-col",
//           className
//         )}
//       >
//         <header
//           className={cn(
//             "card-info",
//             "flex",
//             "items-center",
//             "bg-black",
//             "z-20",
//             "px-3",
//             "py-2",
//             className
//           )}
//         >
//           <CardItem className="text-left">{date}</CardItem>
//           <CardItem className="text-center">{title}</CardItem>
//           <CardItem className="text-right">{category}</CardItem>
//         </header>
//         {children}
//       </div>
//       {/* // overlays so you can click anywhere to switch slide */}
//       <div
//         className={cn(
//           "absolute",
//           "z-2",
//           "top-0",
//           "left-0",
//           "size-full",
//           // "border",
//           // "border-[#303030]",
//           "rounded-lg"
//         )}
//       />
//     </>
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
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { VIDEOS_DATA } from "@/lib/constants";
import VideoPlayer from "./VideoPlayer";

export default function Slider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs for cards

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && sliderRef.current) initializeCards();
  }, [isClient, sliderRef]);

  const initializeCards = () => {
    if (!sliderRef.current) return;

    cardRefs.current.forEach((cardRef, i) => {
      if (!cardRef) return;
      gsap.to(cardRef, {
        y: 0 + 20 * i + "%",
        z: 15 * i,
        duration: 1,
        ease: "power3.out",
        stagger: -0.1,
      });
    });
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    if (!slider || cardRefs.current.length === 0) return;

    const lastCard = cardRefs.current.pop();
    if (!lastCard) return;

    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "power3.inOut",
      onStart: () => {
        setTimeout(() => {
          if (lastCard && slider.firstChild) {
            slider.insertBefore(lastCard, slider.firstChild);
            initializeCards();
            setTimeout(() => {
              setIsAnimating(false);
            }, 1000);
          }
        }, 300);
      },
    });

    // Move the last ref to the first position
    cardRefs.current.unshift(lastCard);
  };

  return (
    <div
      style={{ perspective: "175px" }}
      className={cn("absolute size-screen overflow-hidden z-50")}
      onClick={handleClick}
      ref={sliderRef}
    >
      {VIDEOS_DATA.map((card, i) => (
        <Card
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }} // Assign ref to cardRefs array
          {...card}
        >
          <VideoPlayer id={card.id} />
        </Card>
      ))}
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

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, date, title, category, children }, ref) => {
    return (
      <>
        <div
          ref={ref}
          style={{ transform: "translate3d(-50%, -50%, 0px)" }}
          className={cn(
            "absolute",
            "top-1/2",
            "left-1/2",
            "w-[65%]",
            "h-[500px]",
            "bg-black",
            "overflow-hidden",
            "border",
            "border-r-[#303030]",
            "border",
            "border-[#303030]",
            "overflow-hidden",
            "rounded-lg",
            "flex",
            "flex-col",
            className
          )}
        >
          <header
            className={cn(
              "card-info",
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
        </div>
        {/* // overlays so you can click anywhere to switch slide */}
        <div
          className={cn(
            "absolute",
            "z-2",
            "top-0",
            "left-0",
            "size-full",
            "rounded-lg"
          )}
        />
      </>
    );
  }
);

Card.displayName = "Card";

export { Card };

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
