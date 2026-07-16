"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { IconTile } from "@/components/icon-tile";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/components/flow/plan-provider";

export default function HeroPage() {
  const router = useRouter();
  const { start } = usePlan();
  const [email, setEmail] = useState("");

  const go = () => {
    start(email);
    router.push("/onboarding");
  };

  return (
    <div className="hero-surface animate-screenIn">
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Brand />
          <span style={{ width: 1, height: 22, background: "var(--border)" }} />
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#who" className="nav-link">Who it&apos;s for</a>
            <Link href="/pricing" className="nav-link">Pricing</Link>
          </div>
        </div>
        <Link href="/login">
          <Button variant="outline" size="sm" style={{ padding: "0 18px" }}>Sign in</Button>
        </Link>
      </nav>

      <div
        className="hero-grid"
        style={{
          maxWidth: 1240, margin: "0 auto", padding: "60px 40px 88px",
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 72, alignItems: "center",
        }}
      >
        {/* left: copy */}
        <div className="hero-copy">
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 15px 7px 12px",
              borderRadius: 999, background: "var(--secondary)", border: "1px solid var(--border)",
              color: "var(--foreground)", fontSize: 13.5, fontWeight: 500, marginBottom: 30,
            }}
          >
            <Icon name="Sparkles" size={14} color="var(--ac)" /> The overwhelming move, decomposed
          </div>

          <h1
            className="editorial"
            style={{ fontSize: 62, lineHeight: 1.05, letterSpacing: "-1px", margin: "0 0 26px", maxWidth: 600, textWrap: "balance" }}
          >
            Your move <span className="it">abroad</span>, one clear <span className="it">step</span> at a time.
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--muted-foreground)", margin: "0 0 40px", maxWidth: 460 }}>
            We break the overwhelming process of moving into a personalized,
            bite-sized roadmap — so you always know the one next step.
          </p>

          {/* email capture */}
          <div style={{ display: "flex", gap: 12, maxWidth: 480, marginBottom: 26, flexWrap: "wrap" }}>
            <input
              type="email"
              className="field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              style={{
                flex: "1 1 220px", height: 54, padding: "0 22px", fontSize: 15.5,
                fontFamily: "var(--font-sans)", color: "var(--foreground)",
                borderRadius: 999, border: "1px solid var(--border)", background: "var(--secondary)", outline: "none",
              }}
            />
            <Button onClick={go} size="lg" style={{ height: 54, padding: "0 26px" }}>
              Build My Plan <Icon name="ArrowRight" size={17} />
            </Button>
          </div>

          <div style={{ marginBottom: 26, marginTop: -12 }}>
            <Link
              href="/demo"
              style={{ fontSize: 14.5, color: "var(--muted-foreground)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              or <b style={{ color: "var(--ac)", fontWeight: 600 }}>explore a live demo</b>
              <Icon name="ArrowRight" size={14} color="var(--ac)" />
            </Link>
          </div>

          {/* social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="av-stack">
              <span className="av" style={{ background: "var(--brand-100)", color: "var(--brand-700)" }}>AM</span>
              <span className="av" style={{ background: "color-mix(in srgb, var(--positive) 16%, white)", color: "var(--positive)" }}>K</span>
              <span className="av" style={{ background: "color-mix(in srgb, var(--warning) 18%, white)", color: "var(--warning)" }}>S</span>
              <span className="av" style={{ background: "var(--neutral-900)", color: "#fff" }}>+2k</span>
            </span>
            <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
              <b style={{ color: "var(--foreground)", fontWeight: 600 }}>2,000+ movers</b> already building their plan
            </span>
          </div>
        </div>

        {/* right: photo + floating card */}
        <div style={{ position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-shot"
            src="https://images.unsplash.com/photo-1681118143075-5f5a10c9c092?auto=format&fit=crop&w=1200&q=80"
            alt="A traveler looking out over a new city"
            style={{
              display: "block", width: "100%", height: 500, objectFit: "cover",
              borderRadius: 22, boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)",
            }}
          />

          {/* floating "next step" card — wrapper animates in, inner lifts on hover */}
          <div style={{ position: "absolute", left: -26, bottom: 64, width: 268, animation: "popIn .5s .25s both" }}>
            <div
              className="hero-card"
              style={{
                background: "var(--card)", borderRadius: 18, padding: "16px 18px",
                boxShadow: "0 18px 48px -12px rgba(0,0,0,.28)", border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: 12 }}>
                Your next step
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <IconTile icon="Stamp" tone="var(--ac)" size={42} r={12} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }}>Book consulate appointment</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>Phase 1 · Visa &amp; Legal</div>
                </div>
              </div>
              <button
                style={{
                  width: "100%", height: 38, cursor: "pointer", border: "none", borderRadius: 10,
                  background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-sans)",
                  fontSize: 13.5, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                Mark done <Icon name="Check" size={15} />
              </button>
            </div>
          </div>

          <div className="dots" style={{ marginTop: 22 }}>
            <span className="on" /><span /><span /><span /><span />
          </div>
        </div>
      </div>
    </div>
  );
}
