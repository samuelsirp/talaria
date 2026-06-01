"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** units added per second after the count-up finishes, to feel "live" */
  drift?: number;
  duration?: number;
  className?: string;
};

export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  drift = 0,
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const obj = { v: 0 };
      const fmt = (n: number) =>
        prefix +
        n.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;

      const render = () => {
        el.textContent = fmt(obj.v);
      };

      gsap.to(obj, {
        v: to,
        duration,
        ease: "power3.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onComplete: () => {
          if (!drift) return;
          // slow, never-ending linear creep upward for a live feel
          gsap.to(obj, {
            v: to + drift * 6000,
            duration: 6000,
            ease: "none",
            onUpdate: render,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
