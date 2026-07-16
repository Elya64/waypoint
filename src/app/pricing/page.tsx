"use client";

import { useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FREE = [
  "Personalized 3-phase roadmap",
  "This week's focus checklist",
  "Document vault (up to 3 files)",
];
const PRO = [
  "Everything in Free",
  "AI coach — Ask Waypoint anytime",
  "Unlimited document vault",
  "All three phases unlocked",
  "Task decomposition into micro-actions",
  "Priority email support",
];

export default function PricingPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upgrade = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/checkout", { method: "POST" });
      if (r.status === 401) {
        window.location.href = "/login?next=/pricing";
        return;
      }
      const j = await r.json();
      if (j.url) window.location.href = j.url;
      else setError(j.error || "Could not start checkout.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="surface" style={{ minHeight: "100vh" }}>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}><Brand /></Link>
        <Link href="/app"><Button variant="outline" size="sm">Dashboard</Button></Link>
      </nav>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "56px 24px 80px", textAlign: "center" }}>
        <h1 className="editorial" style={{ fontSize: 46, letterSpacing: "-1px", margin: "0 0 12px", textWrap: "balance" }}>
          Move with <span className="it">confidence</span>.
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted-foreground)", margin: "0 0 44px" }}>
          Start free. Upgrade when you want your AI coach and the full roadmap.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, textAlign: "left" }}>
          {/* Free */}
          <Card style={{ padding: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--muted-foreground)" }}>Free</div>
            <div style={{ fontSize: 40, fontWeight: 700, margin: "10px 0 4px", letterSpacing: "-1px" }}>$0</div>
            <div style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 22 }}>Get your roadmap, no card required.</div>
            <FeatureList items={FREE} />
            <Link href="/onboarding"><Button variant="outline" style={{ width: "100%", marginTop: 22 }}>Start free</Button></Link>
          </Card>

          {/* Pro */}
          <Card style={{ padding: 28, borderColor: "var(--ac-border)", position: "relative", boxShadow: "var(--shadow-lg)" }}>
            <span style={{ position: "absolute", top: 20, right: 20, fontSize: 12, fontWeight: 700, color: "var(--ac)", background: "var(--ac-soft)", border: "1px solid var(--ac-border)", padding: "4px 10px", borderRadius: 999 }}>
              Most popular
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ac)" }}>Waypoint Pro</div>
            <div style={{ fontSize: 40, fontWeight: 700, margin: "10px 0 4px", letterSpacing: "-1px" }}>
              $19<span style={{ fontSize: 16, fontWeight: 500, color: "var(--muted-foreground)" }}> /month</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 22 }}>Cancel anytime. Taxes handled at checkout.</div>
            <FeatureList items={PRO} accent />
            <Button onClick={upgrade} disabled={busy} style={{ width: "100%", marginTop: 22 }}>
              {busy ? "Starting checkout…" : "Upgrade to Pro"} <Icon name="ArrowRight" size={16} />
            </Button>
            {error && <p style={{ color: "var(--destructive)", fontSize: 13, marginTop: 12 }}>{error}</p>}
          </Card>
        </div>

        <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 32 }}>
          Already subscribed? <a href="/api/billing" className="hl-link">Manage billing</a>
        </p>
      </div>
    </div>
  );
}

function FeatureList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
      {items.map((f) => (
        <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
          <Icon name="Check" size={16} color={accent ? "var(--ac)" : "var(--positive)"} /> {f}
        </li>
      ))}
    </ul>
  );
}
