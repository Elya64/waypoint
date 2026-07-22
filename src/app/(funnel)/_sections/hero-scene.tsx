"use client";

import { useEffect, useRef } from "react";
import { FisheyeHero, type FisheyeHeroHandle } from "../fisheye-hero";
import { ensureScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const MANIFESTO_LINES = [
  "Your move ", // + <em>abroad</em>,
  "one clear ", // + <em>step</em> at a time
];

const MISSION_LINES = [
  "A calm, structured guide through",
  "every step of relocating abroad —",
  "visas, housing, banking, and the",
  "hundred small decisions in between.",
];

/** Scenes 1+2 combined: the resting photographic hero (manifesto headline +
 *  scatter mono annotations) that then pins for ~220vh of scroll while the
 *  camera pushes in (via FisheyeHero's zoom uniform), the manifesto exits
 *  line-by-line, a mission statement + two mono labels fade in top-left, and
 *  a paper-colored "wake" wipes up from the bottom to hand off into the next
 *  (light) scene — dispatching "wp:nav-theme" at 85% progress so SiteNav
 *  flips from white-on-dark to dark-on-paper in sync. */
export function HeroScene() {
  const heroRef = useRef<HTMLElement>(null);
  const fisheyeRef = useRef<FisheyeHeroHandle>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const monoARef = useRef<HTMLDivElement>(null);
  const monoBRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionLabelARef = useRef<HTMLDivElement>(null);
  const missionLabelBRef = useRef<HTMLAnchorElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = prefersReducedMotion();
    const lineInners = hero.querySelectorAll<HTMLElement>(".sf-line-inner");

    if (reduced) {
      // No pin, no scroll choreography — just settle every element at its
      // resting "revealed" state.
      lineInners.forEach((el) => { el.style.transform = "translateY(0)"; });
      return;
    }

    const gsap = ensureScrollTrigger();
    const ctx = gsap.context(() => {
      // Entrance: manifesto lines + kicker + scatter labels slide/fade in on
      // mount. Done here (not CSS keyframes) so the same engine can later
      // scrub these exact elements back out without the two fighting over
      // the transform/opacity property.
      gsap.set(lineInners, { yPercent: 115 });
      gsap.set([kickerRef.current, monoARef.current, monoBRef.current], { opacity: 0, y: 10 });

      // The pinned camera-push is built and its ScrollTrigger (pin: true) is
      // created immediately, NOT after the entrance finishes — every later
      // section on the page measures its own scroll-trigger position against
      // the total document height, so this pin's spacer has to exist and be
      // the right size from the very first layout pass, or everything below
      // it drifts. What we DO defer is *reacting* to scroll: the trigger is
      // disabled (pin + spacer stay put, `revert:false`) until the entrance
      // timeline completes, then enabled — otherwise a scrub ScrollTrigger's
      // immediate progress-0 render would permanently fight the entrance
      // tween for the same transform/opacity properties.
      const zoomState = { z: 1 };
      let wasDark = false;
      let introDone = false;

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=130%",
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (!introDone) return;
            const dark = self.progress > 0.85;
            if (dark !== wasDark) {
              wasDark = dark;
              window.dispatchEvent(new CustomEvent("wp:nav-theme", { detail: { dark } }));
            }
          },
        },
      })
        .to(zoomState, {
          z: 1.55, duration: 0.45, ease: "none",
          onUpdate: () => { if (introDone) fisheyeRef.current?.setZoom(zoomState.z); },
        }, 0)
        // fromTo (not to) on purpose: with stagger, each element's "from" value
        // is captured lazily the first time ITS sub-tween becomes active. Since
        // this timeline is created (and does one render pass) before the intro
        // timeline below has settled the lines at rest, a plain `.to()` could
        // capture inconsistent from-values per staggered element — symptom was
        // one headline line permanently stuck mid-transition. Explicit from
        // values remove that ambiguity entirely.
        .fromTo(lineInners, { yPercent: 0, opacity: 1 }, { yPercent: -115, opacity: 0, stagger: 0.05, duration: 0.4, ease: "none" }, 0)
        .fromTo([kickerRef.current, monoARef.current, monoBRef.current], { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "none" }, 0.05)
        .fromTo(missionRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "none" }, 0.4)
        .fromTo([missionLabelARef.current, missionLabelBRef.current],
          { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, 0.45)
        .fromTo(wakeRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: "none" }, 0.7)
        .to(missionRef.current, { opacity: 0, duration: 0.15, ease: "none" }, 0.85);

      pinTl.scrollTrigger?.disable(false);

      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .to(kickerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(lineInners, { yPercent: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" }, 0.15)
        .to([monoARef.current, monoBRef.current], { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.5)
        .call(() => {
          introDone = true;
          pinTl.scrollTrigger?.enable();
        });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sf-hero" id="hero" ref={heroRef}>
      <FisheyeHero
        ref={fisheyeRef}
        src="/hero-lisbon.jpg"
        alt="A traveler looking out over Lisbon's rooftops from a balcony — their future home"
      />
      <div className="sf-vignette" />
      <div className="sf-shade" />
      <div className="sf-wake" ref={wakeRef} />

      <div className="sf-copy">
        <div className="sf-kicker" ref={kickerRef}>
          building your roadmap
          <br />
          to a life abroad
        </div>

        <h1 className="sf-big editorial" ref={headlineRef}>
          <span className="sf-line">
            <span className="sf-line-inner">
              {MANIFESTO_LINES[0]}<span className="it">abroad</span>,
            </span>
          </span>
          <span className="sf-line">
            <span className="sf-line-inner">
              {MANIFESTO_LINES[1]}<span className="it">step</span> at a time
            </span>
          </span>
        </h1>
      </div>

      <div className="sf-mono sf-mono-a" ref={monoARef}>
        where your move
        <br />
        becomes a plan,
        <br />
        and you shape it
      </div>
      <div className="sf-mono sf-mono-b" ref={monoBRef}>
        visas, housing,
        <br />
        finances and paperwork —
        <br />
        decomposed into
        <br />
        bite-sized steps
      </div>

      <div className="sf-mission" ref={missionRef}>
        {MISSION_LINES.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="sf-mission-label sf-mission-label-a" ref={missionLabelARef}>OUR MISSION</div>
      <a href="#works" className="sf-mission-label sf-mission-label-b link-mono" ref={missionLabelBRef}>LEARN MORE</a>
    </section>
  );
}
