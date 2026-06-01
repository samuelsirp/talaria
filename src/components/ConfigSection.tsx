"use client";

import { useState } from "react";
import Reveal from "./anim/Reveal";
import SplitReveal from "./anim/SplitReveal";

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-3 border-b border-[var(--line)] last:border-0">
      <div>
        <div className="text-xs text-white">{label}</div>
        {hint && <div className="text-[10px] text-[var(--dim)] mt-0.5">{hint}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="bg-[var(--bg)] border border-[var(--line)] rounded px-2 py-1.5 text-xs text-[var(--text)] focus:border-[var(--accent)]/50 outline-none">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`w-10 h-5 rounded-full relative transition-colors ${on ? "bg-[var(--accent)]/60" : "bg-[var(--line)]"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function ConfigSection() {
  const json = `{
  "gutter_format": "compact",
  "delta_reads": true,
  "branch_mode": "none",
  "fuzzy_match": true,
  "model": "hermes-3-70b",
  "max_tokens": 4096,
  "temperature": 0.7,
  "on_chain_verify": true,
  "network": "base-mainnet",
  "chain_id": 8453,
  "contract_addr": "0x8335...0913",
  "gas_strategy": "standard"
}`;

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[11px] tracking-[0.3em] text-[var(--accent)] mb-2">2 · CONFIGURATION — HERMES AGENT SETTINGS</div>
        <SplitReveal as="h2" className="text-2xl md:text-3xl font-bold text-white overflow-hidden">
          One canonical format. No branches.
        </SplitReveal>
      </header>

      <Reveal className="border border-[var(--line)] bg-[var(--panel)] rounded-md overflow-hidden">
        <div className="px-3 py-2 text-[11px] tracking-widest text-[var(--accent)] border-b border-[var(--line)]">FORMAT PROTOCOL</div>
        <Row label="GUTTER_FORMAT" hint="Line number display mode"><Select options={["compact {i}|{line}", "padded (legacy)", "none (no numbers)"]} /></Row>
        <Row label="DELTA_READS" hint="Re-reads send only changed hunks"><Toggle defaultOn /></Row>
        <Row label="BRANCH_MODE" hint="No branch, no toggle, no alternate path"><Select options={["none", "escape-hatch"]} /></Row>
        <Row label="FUZZY_MATCH" hint="Patch/match text — never consume gutter"><Toggle defaultOn /></Row>
      </Reveal>

      <Reveal className="border border-[var(--line)] bg-[var(--panel)] rounded-md overflow-hidden">
        <div className="px-3 py-2 text-[11px] tracking-widest text-[var(--accent)] border-b border-[var(--line)]">HERMES AGENT SETTINGS</div>
        <Row label="MODEL" hint="Inference model endpoint"><Select options={["hermes-3-70b", "hermes-3-8b", "hermes-2-pro"]} /></Row>
        <Row label="MAX_TOKENS" hint="Per-request token ceiling"><input defaultValue="4096" className="w-24 bg-[var(--bg)] border border-[var(--line)] rounded px-2 py-1.5 text-xs text-[var(--text)] outline-none focus:border-[var(--accent)]/50" /></Row>
        <Row label="TEMPERATURE" hint="Output randomness (0.0 – 1.0)"><input defaultValue="0.7" className="w-24 bg-[var(--bg)] border border-[var(--line)] rounded px-2 py-1.5 text-xs text-[var(--text)] outline-none focus:border-[var(--accent)]/50" /></Row>
        <Row label="ON_CHAIN_VERIFY" hint="Log all reads to blockchain"><Toggle defaultOn /></Row>
      </Reveal>

      <Reveal className="border border-[var(--line)] bg-[var(--panel)] rounded-md overflow-hidden">
        <div className="px-3 py-2 text-[11px] tracking-widest text-[var(--accent)] border-b border-[var(--line)]">BLOCKCHAIN CONFIGURATION</div>
        <Row label="NETWORK" hint="Target chain for on-chain ops"><Select options={["Base Mainnet (8453)", "Base Sepolia (84532)", "Ethereum Mainnet", "Optimism"]} /></Row>
        <Row label="CONTRACT_ADDR" hint="Verification registry contract"><span className="text-xs text-[var(--accent)] font-mono">0x8335…0913</span></Row>
        <Row label="GAS_STRATEGY" hint="Transaction fee priority"><Select options={["Slow", "Standard", "Fast", "Instant"]} /></Row>
      </Reveal>

      <section>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] tracking-widest text-[var(--dim)]">RAW CONFIG — JSON</span>
          <div className="flex gap-2 text-[10px]">
            <button className="px-2 py-1 border border-[var(--line)] rounded hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors">COPY</button>
            <button className="px-2 py-1 border border-[var(--line)] rounded hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors">EXPORT</button>
            <button className="px-2 py-1 border border-[var(--line)] rounded hover:border-red-400/50 hover:text-red-400 transition-colors">RESET</button>
          </div>
        </div>
        <pre className="border border-[var(--line)] bg-[var(--panel)] rounded-md p-4 text-xs text-[var(--accent)]/90 overflow-x-auto">{json}</pre>
      </section>
    </div>
  );
}
