export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)] overflow-hidden">
      <div className="flex ticker whitespace-nowrap py-2 text-[10px] text-[var(--dim)]">
        {[...Array(2)].map((_, k) => (
          <span key={k} className="inline-flex">
            {[
              "TALARIA PROTOCOL",
              "NousResearch/hermes-agent",
              "tools/file_operations.py",
              "_add_line_numbers()",
              "delta_read()",
              "17 file-tool tests green",
              "—",
              "𝕏 @Talaria_OS",
            ].map((t, i) => (
              <span key={i} className="px-5">· {t}</span>
            ))}
          </span>
        ))}
      </div>
    </footer>
  );
}
