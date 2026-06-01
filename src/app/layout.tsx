import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TALARIA — Token Efficiency Protocol",
  description: "Delta Reads + compact gutter format. Cut agent token spend by up to 40% on iterative file reads. On-chain verified. Built for NousResearch/hermes-agent.",
  metadataBase: new URL("https://talariaos.xyz"),
  openGraph: {
    title: "TALARIA — Token Efficiency Protocol",
    description: "Cut agent token spend by up to 40%. Delta Reads + compact gutter. Free & open source.",
    url: "https://talariaos.xyz",
    siteName: "TALARIA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TALARIA — Token Efficiency Protocol",
    description: "Cut agent token spend by up to 40%. Delta Reads + compact gutter. Free & open source.",
    site: "@Talaria_OS",
    creator: "@Talaria_OS",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
