"use client";

import Reveal from "./anim/Reveal";
import SplitReveal from "./anim/SplitReveal";
import Magnetic from "./anim/Magnetic";

const contents = [
  ["1", "Overview", "Protocol summary, Delta Reads & compact gutter"],
  ["2", "Token Efficiency Model", "Format comparison, A/B battery, guarantees"],
  ["3", "Architecture", "Stack, app shell, tab map"],
  ["4", "Animation System", "GSAP registration & reusable primitives"],
  ["5", "Crypto / On-Chain Layer", "Network, $TAL plans, verification"],
  ["6", "Configuration Reference", "Canonical JSON config"],
  ["7", "Running Locally", "Dev server & integration"],
];

export default function DocsSection() {
  return (
    <div className="space-y-8">
      <header>
        <div className="text-[11px] tracking-[0.3em] text-[var(--accent)] mb-2">4 · DOCUMENTATION — TECHNICAL SPEC</div>
        <SplitReveal as="h2" className="text-2xl md:text-3xl font-bold text-white overflow-hidden">
          The whole protocol, on paper.
        </SplitReveal>
        <Reveal delay={0.2}>
          <p className="text-sm text-[var(--dim)] mt-3 max-w-2xl leading-relaxed">
            Full technical documentation for TALARIA — efficiency model, architecture, animation system,
            on-chain layer and configuration. Read it inline or download the PDF.
          </p>
        </Reveal>
      </header>

      <Reveal className="flex flex-wrap items-center gap-3">
        <Magnetic strength={0.3}>
          <a
            href="/talaria-docs.pdf"
            download
            className="inline-block px-4 py-2.5 rounded text-xs tracking-widest border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
          >
            ↓ DOWNLOAD PDF
          </a>
        </Magnetic>
        <a
          href="/talaria-docs.pdf"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded text-xs tracking-widest border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent2)]/50 hover:text-[var(--accent2)] transition-colors"
        >
          OPEN IN NEW TAB →
        </a>
        <span className="text-[10px] text-[var(--dim)]">talaria-docs.pdf · v0.1.0</span>
      </Reveal>

      <section>
        <div className="text-[11px] tracking-widest text-[var(--dim)] mb-3">TABLE OF CONTENTS</div>
        <Reveal stagger={0.06} className="grid sm:grid-cols-2 gap-2 text-xs">
          {contents.map(([n, t, d]) => (
            <div key={n} className="lift flex gap-3 border border-[var(--line)] bg-[var(--panel)] rounded px-3 py-2.5">
              <span className="text-[var(--accent)] font-mono">{n}</span>
              <div>
                <div className="text-[var(--text)]">{t}</div>
                <div className="text-[10px] text-[var(--dim)] mt-0.5">{d}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal>
        <div className="text-[11px] tracking-widest text-[var(--dim)] mb-3">INLINE PREVIEW</div>
        <div className="border border-[var(--line)] rounded-md overflow-hidden bg-[var(--panel)]">
          <object data="/talaria-docs.pdf" type="application/pdf" className="w-full h-[80vh]">
            <div className="p-6 text-center text-xs text-[var(--dim)]">
              Inline preview unavailable.{" "}
              <a href="/talaria-docs.pdf" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">
                Open the PDF
              </a>
              .
            </div>
          </object>
        </div>
      </Reveal>
    </div>
  );
}
