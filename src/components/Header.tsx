"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hdr-item", {
        autoAlpha: 0,
        y: -12,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between gap-4">

        <div className="hdr-item flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="TALARIA"
              width={40}
              height={40}
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
          <div>
            <h1 className="shimmer font-bold tracking-[0.18em] text-sm md:text-base">TALARIA</h1>
            <p className="text-[10px] text-[var(--dim)] tracking-[0.2em] uppercase">Token Efficiency Protocol</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[var(--dim)]">
          <span className="hdr-item px-2 py-1 border border-[var(--line)] rounded">v0.1.0</span>
          <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noreferrer"
             className="hdr-item px-2 py-1 border border-[var(--line)] rounded hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors">
            NousResearch/hermes-agent
          </a>
          <a href="https://x.com/Talaria_OS" target="_blank" rel="noreferrer" className="hdr-item px-2 py-1 border border-[var(--accent)]/30 rounded text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors">𝕏 @Talaria_OS</a>
        </div>
      </div>
    </header>
  );
}
