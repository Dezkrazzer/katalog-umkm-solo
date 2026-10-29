"use client";

import type { MouseEvent } from "react";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GALLERY_HEADING_ID, GALLERY_ID } from "@/lib/section-ids";
import { scrollToElement } from "@/lib/smooth-scroll";

export function ExploreButton() {
  function handleExplore(event: MouseEvent<HTMLAnchorElement>) {
    const heading = document.getElementById(GALLERY_HEADING_ID);
    if (!heading) return; // fall back to the plain #galeri anchor jump
    event.preventDefault();
    scrollToElement(heading);
    heading.focus({ preventScroll: true });
    history.replaceState(null, "", `#${GALLERY_ID}`);
  }

  return (
    <Button
      asChild
      size="lg"
      className="h-12 gap-2 rounded-md px-6 text-base shadow-warm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 active:translate-y-0 active:bg-primary/80 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <a href={`#${GALLERY_ID}`} onClick={handleExplore} className="group/explore">
        Jelajahi Kuliner
        <ArrowDown
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/explore:translate-y-0.5 motion-reduce:transition-none"
        />
      </a>
    </Button>
  );
}
