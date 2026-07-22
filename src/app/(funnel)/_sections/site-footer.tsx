"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Sign in", href: "/login" },
];

/** Scene 10 — footer. Every link follows the site-wide .link-mono " [ + ]"
 *  convention, the hero's slogan echoes a third and final time, and a giant
 *  low-opacity wordmark slides up into view on scroll — the reference's
 *  genre-standard finish. */
export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer || !wordmark || prefersReducedMotion()) return;

    const gsap = ensureScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmark,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 85%" },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="wp-footer" ref={footerRef}>
      <div className="wp-footer-top">
        <div className="wp-footer-links">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="link-mono wp-footer-link">{l.label}</Link>
          ))}
        </div>
        <select className="wp-footer-lang" defaultValue="en" aria-label="Language">
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
        </select>
      </div>

      <p className="wp-footer-slogan">Your move abroad, one clear step at a time.</p>

      <div className="wp-footer-wordmark" ref={wordmarkRef} aria-hidden>WAYPOINT</div>

      <div className="wp-footer-bottom">
        <span>{`© ${new Date().getFullYear()} Waypoint`}</span>
      </div>
    </footer>
  );
}
