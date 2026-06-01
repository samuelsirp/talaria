"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import TabNav, { TabId } from "@/components/TabNav";
import StatsSection from "@/components/StatsSection";
import ConfigSection from "@/components/ConfigSection";
import ChainSection from "@/components/ChainSection";
import DocsSection from "@/components/DocsSection";
import Footer from "@/components/Footer";
import BackgroundFX from "@/components/BackgroundFX";

export default function Home() {
  const [tab, setTab] = useState<TabId>("stats");
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 18, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
      );
    },
    { dependencies: [tab] },
  );

  return (
    <main className="grid-bg flex flex-col min-h-screen relative">
      <BackgroundFX />
      <Header />
      <Ticker />
      <TabNav active={tab} onChange={setTab} />

      <div ref={contentRef} className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-10">
        {tab === "stats" && <StatsSection />}
        {tab === "config" && <ConfigSection />}
        {tab === "chain" && <ChainSection />}
        {tab === "docs" && <DocsSection />}
      </div>

      <Footer />
    </main>
  );
}
