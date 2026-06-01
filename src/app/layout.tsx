import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TALARIA — Token Efficiency Protocol",
  description: "Delta Reads + compact gutter format. Cut agent token spend by up to 40% on iterative file reads. On-chain verified. Built for NousResearch/hermes-agent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
