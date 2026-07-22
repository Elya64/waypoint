"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { usePlan } from "@/components/flow/plan-provider";

/** Scene 6 — the spec's "Contact CTA + generative visual" recast as the
 *  actual funnel conversion moment: the real email capture lives here (not
 *  in the hero), paired with a route line that draws itself in on scroll —
 *  the "plan grows with every step" idea from the reference, told as a
 *  route being plotted rather than a blooming flower. */
export function CaptureCta() {
  const router = useRouter();
  const { start } = usePlan();
  const [email, setEmail] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const go = () => {
    start(email);
    router.push("/onboarding");
  };

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)";
      path.style.strokeDashoffset = "0";
      io.disconnect();
    }, { threshold: 0.15 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="wp-capture" id="start" ref={sectionRef}>
      <div className="wp-capture-grid">
        <div>
          <div className="wp-capture-kicker">start your move</div>
          <h2 className="wp-capture-headline editorial">Your plan grows with every step you take</h2>
          <p className="wp-capture-sub">
            Tell us where you&apos;re headed and we&apos;ll break the whole
            journey into a personalized, bite-sized roadmap.
          </p>

          <div className="wp-capture-form">
            <input
              type="email"
              className="field wp-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
            />
            <button className="wp-cta" onClick={go}>
              Build My Plan <Icon name="ArrowRight" size={17} />
            </button>
          </div>

          <Link href="/demo" className="wp-demo">
            or <b>explore a live demo</b> <Icon name="ArrowRight" size={14} />
          </Link>

          <div className="wp-proof">
            <span className="wp-proof-text">Build your personal relocation plan in <b>4 steps</b></span>
          </div>
        </div>

        <div className="wp-capture-visual" aria-hidden>
          <svg viewBox="0 0 320 320" className="wp-route-svg">
            <path
              ref={pathRef}
              d="M40 260 C 90 260 70 180 130 170 S 200 90 170 60 S 260 40 280 70"
              fill="none"
              stroke="var(--brand-500)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="40" cy="260" r="6" fill="var(--brand-600)" />
            <circle cx="280" cy="70" r="6" fill="var(--ink-dark)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
