"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  chars?: string;
  duration?: number;
  /** only run when scrolled into view */
  onScroll?: boolean;
};

export default function Scramble({
  text,
  className,
  chars = "01x#|/<>",
  duration = 0.9,
  onScroll = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.to(ref.current, {
        duration,
        scrambleText: { text, chars, speed: 0.6, revealDelay: 0.1 },
        ease: "none",
        ...(onScroll
          ? { scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } }
          : {}),
      });
    },
    { scope: ref, dependencies: [text], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
