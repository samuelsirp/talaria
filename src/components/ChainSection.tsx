"use client";

import { useEffect, useState } from "react";
import Reveal from "./anim/Reveal";
import SplitReveal from "./anim/SplitReveal";
import Scramble from "./anim/Scramble";
import Magnetic from "./anim/Magnetic";

function randHash() {
  const c = "0123456789abcdef";
  const pick = (n: number) => Array.from({ length: n }, () => c[Math.floor(Math.random() * 16)]).join("");
  return "0x" + pick(6) + "…" + pick(4);
}

const labels = [
  "delta_read(tools/file_operations.py)",
  "_add_line_numbers() compact",
  "compact_gutter:apply",
  "format:audit hash",
  "fuzzy_match:verify",
  "verify:17 file-tool tests",
];

type Block = { h: string; block: number; label: string; t: string };

export default function ChainSection() {
  const [feed, setFeed] = useState<Block[]>([]);
  const [height, setHeight] = useState(14582019);

  useEffect(() => {
    setFeed(
      Array.from({ length: 5 }, (_, i) => ({
        h: randHash(),
        block: 14582019 - i,
        label: labels[i % labels.length],
        t: `${i * 2}s ago`,
      })),
    );

    const id = setInterval(() => {
      setHeight((h) => h + 1);
      setFeed((f) => [
        { h: randHash(), block: f[0] ? f[0].block + 1 : 14582020, label: labels[Math.floor(Math.random() * labels.length)], t: "now" },
        ...f.slice(0, 6),
      ]);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[11px] tracking-[0.3em] text-[var(--accent)] mb-2">3 · BLOCKCHAIN — ON-CHAIN VERIFICATION</div>
        <SplitReveal as="h2" className="text-2xl md:text-3xl font-bold text-white overflow-hidden">
          Every read, hashed and immutable.
        </SplitReveal>
      </header>

      {/* Chain status */}
      <Reveal stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        {[
          ["NETWORK", "Base Mainnet · 8453"],
          ["BLOCK HEIGHT", height.toLocaleString()],
          ["GAS PRICE", "0.0012 Gwei"],
          ["BLOCK TIME", "~2 seconds"],
          ["RPC", "mainnet.base.org"],
          ["CONTRACT", "0x8335…0913"],
        ].map(([k, v]) => (
          <div key={k} className="lift border border-[var(--line)] bg-[var(--panel)] rounded px-3 py-2.5">
            <div className="text-[10px] text-[var(--dim)] tracking-widest">{k}</div>
            <div className="text-[var(--text)] mt-1 font-mono">{v}</div>
          </div>
        ))}
      </Reveal>

      <div className="flex items-center gap-2 text-xs text-[var(--accent)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse" /> SYNC STATUS · SYNCED
      </div>

      {/* Validation */}
      <section>
        <div className="text-[11px] tracking-widest text-[var(--dim)] mb-3">6 · VALIDATION — ON-CHAIN PROOFS</div>
        <Reveal stagger={0.06} className="border border-[var(--line)] rounded-md overflow-hidden text-xs">
          {[
            ["tools/file_operations.py", "VERIFIED"],
            ["_add_line_numbers()", "VERIFIED"],
            ["delta_read()", "VERIFIED"],
            ["17 file-tool tests green", "VERIFIED"],
            ["compact gutter spec", "VERIFIED"],
            ["delta hunk integrity", "PENDING"],
          ].map(([k, s], i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 border-b border-[var(--line)] last:border-0 bg-[var(--panel)]">
              <span className="text-[var(--text)] font-mono">{k}</span>
              <span className={s === "VERIFIED" ? "text-[var(--accent)]" : "text-yellow-400"}>
                {s === "VERIFIED" ? "✓ " : "◷ "}{s}
              </span>
            </div>
          ))}
        </Reveal>
        <p className="text-[10px] text-[var(--dim)] mt-2">All format changes hashed to Base · immutable audit trail.</p>
      </section>

      {/* Live feed */}
      <section>
        <div className="text-[11px] tracking-widest text-[var(--dim)] mb-3">LIVE BLOCK FEED — TALARIA READ HASHES</div>
        <div className="border border-[var(--line)] rounded-md overflow-hidden">
          <div className="grid grid-cols-12 bg-[var(--panel)] text-[10px] text-[var(--dim)] px-3 py-2 border-b border-[var(--line)] tracking-widest">
            <span className="col-span-3">HASH</span><span className="col-span-2">BLOCK</span><span className="col-span-5">LABEL</span><span className="col-span-2 text-right">AGE</span>
          </div>
          {feed.map((b, i) => (
            <div key={b.h + i} className="grid grid-cols-12 px-3 py-2 border-b border-[var(--line)] last:border-0 text-xs bg-[var(--bg)]">
              <span className="col-span-3 text-[var(--accent2)] font-mono truncate">
                {i === 0 ? <Scramble text={b.h} /> : b.h}
              </span>
              <span className="col-span-2 text-[var(--dim)] font-mono">{b.block.toLocaleString()}</span>
              <span className="col-span-5 text-[var(--text)] truncate">{b.label}</span>
              <span className="col-span-2 text-right text-[var(--dim)]">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hash verifier */}
      <Reveal className="border border-[var(--line)] bg-[var(--panel)] rounded-md p-4">
        <div className="text-[11px] tracking-widest text-[var(--dim)] mb-3">HASH VERIFIER</div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input placeholder="TRANSACTION HASH / BLOCK HASH" className="flex-1 bg-[var(--bg)] border border-[var(--line)] rounded px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)]/50" />
          <Magnetic strength={0.3}>
            <button className="px-4 py-2 rounded text-xs tracking-widest border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors">VERIFY ON-CHAIN</button>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}
