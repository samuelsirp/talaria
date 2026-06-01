"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** stagger immediate children instead of the wrapper itself */
  stagger?: number;
};

export default function Reveal({
  children,
  className,
  y = 22,
  delay = 0,
  stagger,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const targets = stagger ? Array.from(el.children) : el;

      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 0.7,
        delay,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
