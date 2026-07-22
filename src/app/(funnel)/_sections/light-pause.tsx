"use client";

import { useEffect, useRef } from "react";
import { ensureScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/** Scene 3: the calmest beat on the page. An almost-empty --void viewport
 *  with one echoed line from the hero's mono annotation, grown to a
 *  full-screen statement — the "echo" trick where a phrase migrates between
 *  scenes at increasing scale. Exits on scroll with a blur+lift, cheap to do
 *  in GSAP but expensive-looking; will-change is added only while the tween
 *  runs and stripped after, since a lingering blur filter is a real paint
 *  cost on weaker GPUs. */
export function LightPause() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline || prefersReducedMotion()) return;

    const gsap = ensureScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 0, opacity: 1, filter: "blur(0px)" },
        {
          y: -80, opacity: 0, filter: "blur(12px)", ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.3 },
          onStart: () => { headline.style.willChange = "transform, opacity, filter"; },
          onComplete: () => { headline.style.willChange = "auto"; },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wp-pause" ref={sectionRef}>
      <h2 className="wp-pause-headline" ref={headlineRef}>
        Where the overwhelm ends,
        <br />
        and your plan begins
      </h2>
    </section>
  );
}
