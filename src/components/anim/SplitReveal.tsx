"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
};

export default function SplitReveal({ children, className, as = "h2" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      const split = SplitText.create(ref.current, { type: "words,chars" });
      gsap.from(split.chars, {
        autoAlpha: 0,
        yPercent: 110,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.014,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
