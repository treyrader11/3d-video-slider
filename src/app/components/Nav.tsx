import { cn } from "@/lib/utils";
import React from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/commitments", label: "Commitments" },
];

/* 
Semantic Meaning:
    The <nav> element is a semantic tag that indicates a block of navigation links.
    Wrapping the entire navbar in a <nav> tag makes it clear that the entire section is related to site navigation.

Accessibility: 
    Using <nav> as the wrapper helps screen readers and other assistive technologies identify the section of the page dedicated to navigation, improving accessibility for users with disabilities.
*/

export default function Nav() {
  return (
    <nav // using nav for the entire nav secion helps screen readers and other assistive technologies identify the section of the page dedicated to navigation, improving accessibility for users with disabilities.
      className={cn(
        "absolute",
        "top-0",
        "w-full",
        "p-8",
        "flex",
        "items-center",
        "z-20",
        "[&_>_div]:flex-1"
      )}
    >
      <Logo />
      <NavLinks />
      <CTA />
    </nav>
  );
}

function Logo() {
  return (
    <div className={cn("")}>
      <p>
        <span>Directory</span> by Codegrid
      </p>
    </div>
  );
}

function NavLinks() {
  return (
    <div className={"justify-center gap-4 hidden md:flex"}>
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className="nav-link">
          <p>{link.label}</p>
        </a>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <div className={cn("flex justify-end")}>
      <p>Contact</p>
    </div>
  );
}
