"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type TabId = "stats" | "config" | "chain" | "docs";

const tabs: { id: TabId; n: string; label: string }[] = [
  { id: "stats", n: "1", label: "STATS" },
  { id: "config", n: "2", label: "CONFIG" },
  { id: "chain", n: "3", label: "CHAIN" },
  { id: "docs", n: "4", label: "DOCS" },
];

export default function TabNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const nav = navRef.current!;
      const btn = nav.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`);
      const ind = indicatorRef.current!;
      if (!btn) return;
      const navBox = nav.getBoundingClientRect();
      const box = btn.getBoundingClientRect();
      gsap.to(ind, {
        x: box.left - navBox.left + 8,
        width: box.width - 16,
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { dependencies: [active], scope: navRef },
  );

  return (
    <nav className="border-b border-[var(--line)] bg-[var(--bg)]/60 sticky top-0 z-40 backdrop-blur">
      <div ref={navRef} className="relative max-w-5xl mx-auto px-4 md:px-6 flex items-center gap-1">
        <span
          ref={indicatorRef}
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
          style={{ width: 0 }}
        />
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              data-tab={t.id}
              onClick={() => onChange(t.id)}
              className={`group relative px-4 py-3 text-xs tracking-widest transition-colors duration-300 ${
                on ? "text-[var(--accent)]" : "text-[var(--dim)] hover:text-[var(--text)]"
              }`}
            >
              <span className="opacity-50 mr-1 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
                {t.n}
              </span>
              {t.label}
            </button>
          );
        })}
        <a
          href="https://github.com/NousResearch/hermes-agent"
          target="_blank"
          rel="noreferrer"
          className="ml-auto px-4 py-3 text-xs tracking-widest text-[var(--dim)] hover:text-[var(--accent2)] transition-colors"
        >
          GITHUB →
        </a>
      </div>
    </nav>
  );
}
