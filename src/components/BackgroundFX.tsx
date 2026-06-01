"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Node = { x: number; y: number; vx: number; vy: number };

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const glow = glowRef.current!;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const glowX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      glowX(e.clientX);
      glowY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // cursor attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 180 && d > 0) {
          n.x += (dx / d) * 0.4;
          n.y += (dy / d) * 0.4;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.22;
            ctx.strokeStyle = `rgba(52,224,192,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 180;
        ctx.fillStyle = near ? "rgba(58,160,255,0.9)" : "rgba(120,200,255,0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.2 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduce) {
      draw();
    } else {
      gsap.ticker.add(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(draw);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden
      />
      <div
        ref={glowRef}
        aria-hidden
        className="fixed -z-10 pointer-events-none w-[480px] h-[480px] rounded-full"
        style={{
          left: 0,
          top: 0,
          marginLeft: "-240px",
          marginTop: "-240px",
          background:
            "radial-gradient(circle, rgba(52,224,192,0.10), rgba(58,160,255,0.04) 40%, transparent 70%)",
        }}
      />
    </>
  );
}
