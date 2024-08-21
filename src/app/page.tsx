import { cn } from "@/lib/utils";
import Image from "next/image";
import Slider from "./components/Slider";

export default function HomePage() {
  return (
    <main className={cn("relative size-screen overflow-clip")}>
      <Slider />
    </main>
  );
}
