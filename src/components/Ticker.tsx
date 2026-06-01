const items = [
  "100% FREE · NO SUBSCRIPTION",
  "DELTA READS ACTIVE",
  "~40% FEWER TOKENS ON RE-READS",
  "COMPACT GUTTER {i}|{line}",
  "ON-CHAIN VERIFIED",
  "OPEN SOURCE",
  "BASE MAINNET · CHAIN ID 8453",
  "17 FILE-TOOL TESTS GREEN",
  "IMMUTABLE AUDIT TRAIL",
];

export default function Ticker() {
  return (
    <div className="border-b border-[var(--line)] bg-[var(--panel)] overflow-hidden">
      <div className="flex ticker whitespace-nowrap py-1.5 text-[11px] text-[var(--dim)]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-6 inline-flex items-center gap-2">
            <span className="text-[var(--accent)]">▸</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
