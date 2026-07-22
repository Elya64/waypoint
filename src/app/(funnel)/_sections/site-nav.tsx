"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";

/** Persistent fixed nav, present across every scene. Starts white-on-dark
 *  (the hero photo) and flips to dark-on-paper once the pinned zoom-to-mission
 *  scene in HeroScene crosses 85% progress — decoupled from that scene via a
 *  "wp:nav-theme" window CustomEvent rather than prop-drilling or context,
 *  since HeroScene's pin uses GSAP transforms that would break a nested
 *  position:fixed element's containing block if nav lived inside it. */
export function SiteNav() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<{ dark: boolean }>).detail;
      setDark(detail.dark);
    };
    window.addEventListener("wp:nav-theme", onTheme);
    return () => window.removeEventListener("wp:nav-theme", onTheme);
  }, []);

  return (
    <nav className={`wp-nav${dark ? " wp-nav--dark" : ""}`}>
      <Brand />
      <div className="wp-nav-links nav-links">
        <a href="#works" className="wp-nav-link">How it works</a>
        <a href="#movers" className="wp-nav-link">Who it&apos;s for</a>
        <Link href="/pricing" className="wp-nav-link">Pricing</Link>
        <Link href="/demo" className="wp-nav-link">Live demo</Link>
      </div>
      <Link href="/login" className="wp-nav-pill">Sign in</Link>
    </nav>
  );
}
