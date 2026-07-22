"use client";

import { useEffect, useRef } from "react";
import { ensureScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/** Scene 4: scattered points collect into Waypoint's compass mark as the
 *  section pins and scrolls — the spec's "particle beast" reimagined around
 *  our own brand mark instead of a cat silhouette (same trick: disparate
 *  dots assembling into one shape reads as "scattered decisions becoming a
 *  single clear direction," which is literally the product's pitch). Built
 *  as a live canvas (not a pre-rendered video loop) specifically so it can
 *  react to the cursor — particles near the pointer repel, then ease back. */

const CAPTION = "One step. One plan. One direction.";
const SCRAMBLE_CHARS = "{}[];/ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Point { x: number; y: number }
interface Particle { x: number; y: number; tx: number; ty: number; phase: number }

/** Draws the compass mark (ring + rotated needle) to an offscreen canvas and
 *  samples its dark pixels into normalized (-0.5..0.5) target points. */
function buildCompassTargets(count: number): Point[] {
  const size = 600;
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const ctx = off.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = size * 0.05;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 5);
  const nl = r * 0.66;
  const nw = size * 0.1;
  ctx.beginPath();
  ctx.moveTo(0, -nl);
  ctx.lineTo(nw / 2, 0);
  ctx.lineTo(0, nl * 0.32);
  ctx.lineTo(-nw / 2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, nl);
  ctx.lineTo(nw / 2, 0);
  ctx.lineTo(0, -nl * 0.32);
  ctx.lineTo(-nw / 2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.032, 0, Math.PI * 2);
  ctx.fill();

  const data = ctx.getImageData(0, 0, size, size).data;
  const points: Point[] = [];
  const step = 6;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      if (data[(y * size + x) * 4 + 3] > 128) {
        points.push({
          x: x / size - 0.5 + (Math.random() - 0.5) * 0.006,
          y: y / size - 0.5 + (Math.random() - 0.5) * 0.006,
        });
      }
    }
  }
  const out: Point[] = [];
  for (let i = 0; i < count; i++) out.push(points[i % points.length]);
  return out;
}

export function ParticleScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const COUNT = 1400;
    const targets = buildCompassTargets(COUNT);
    const particles: Particle[] = targets.map((t) => ({
      x: Math.random(), y: Math.random(), tx: t.x, ty: t.y, phase: Math.random() * Math.PI * 2,
    }));
    const ambient: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), tx: 0, ty: 0, phase: Math.random() * Math.PI * 2,
    }));

    let progress = reduced ? 1 : 0;
    let w = 0, h = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(216, 220, 227, 0.55)";
      for (const p of ambient) {
        p.phase += 0.006;
        const dx = p.x * w + Math.sin(p.phase) * 8;
        const dy = p.y * h + Math.cos(p.phase * 0.8) * 8;
        ctx.beginPath();
        ctx.arc(dx, dy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      const s = Math.min(w, h) * 0.6;
      const ox = w / 2;
      const oy = h * 0.46;
      ctx.fillStyle = "rgb(216, 220, 227)";
      for (const p of particles) {
        const targetX = ox + p.tx * s;
        const targetY = oy + p.ty * s;
        const scatterX = p.x * w;
        const scatterY = p.y * h;
        let gx = scatterX + (targetX - scatterX) * progress;
        let gy = scatterY + (targetY - scatterY) * progress;

        p.phase += 0.012;
        gx += Math.sin(p.phase) * 1.4 * (1 - progress * 0.6);
        gy += Math.cos(p.phase * 0.9) * 1.4 * (1 - progress * 0.6);

        const dx = gx - mouse.x;
        const dy = gy - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          const push = (80 - dist) / 80;
          gx += (dx / (dist || 1)) * push * 26;
          gy += (dy / (dist || 1)) * push * 26;
        }

        ctx.beginPath();
        ctx.arc(gx, gy, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    let killPin: (() => void) | null = null;
    if (!reduced) {
      const gsap = ensureScrollTrigger();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=90%",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => { progress = self.progress; },
        },
      });
      killPin = () => tl.scrollTrigger?.kill();
    }

    // Scramble caption: decode left-to-right once the section enters view.
    let scrambleRaf = 0;
    const caption = captionRef.current;
    let io: IntersectionObserver | null = null;
    if (caption) {
      let revealed = 0;
      let frame = 0;
      io = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting) return;
        io?.disconnect();
        const step = () => {
          frame++;
          if (frame % 3 === 0) revealed = Math.min(CAPTION.length, revealed + 1);
          let out = "";
          for (let i = 0; i < CAPTION.length; i++) {
            out += i < revealed || CAPTION[i] === " "
              ? CAPTION[i]
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          caption.textContent = out;
          if (revealed < CAPTION.length) scrambleRaf = requestAnimationFrame(step);
        };
        step();
      }, { threshold: 0.15 });
      io.observe(caption);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrambleRaf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      io?.disconnect();
      killPin?.();
    };
  }, []);

  return (
    <section className="wp-particles" ref={sectionRef}>
      <canvas ref={canvasRef} className="wp-particles-canvas" />
      <div className="wp-particles-caption" ref={captionRef}>{CAPTION}</div>
    </section>
  );
}
