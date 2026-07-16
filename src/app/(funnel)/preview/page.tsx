"use client";

import { useRouter } from "next/navigation";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { IconTile } from "@/components/icon-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { usePlan } from "@/components/flow/plan-provider";
import { PHASES, cityOnly, visaLabel, whenLabel } from "@/lib/waypoint";

export default function PreviewPage() {
  const router = useRouter();
  const { input } = usePlan();

  const summary = [
    { icon: "Plane" as const, label: cityOnly(input.from) + " → " + cityOnly(input.to) },
    { icon: "Stamp" as const, label: visaLabel(input.visa) },
    { icon: "CalendarClock" as const, label: whenLabel(input.when) },
  ];

  return (
    <div className="surface animate-screenIn" style={{ minHeight: "100vh" }}>
      <nav className="nav">
        <Brand />
        <Badge variant="secondary">Roadmap ready</Badge>
      </nav>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", marginBottom: 18,
              borderRadius: 999, background: "var(--ac-soft)", border: "1px solid var(--ac-border)", color: "var(--ac)", fontSize: 13, fontWeight: 600,
            }}
          >
            <Icon name="Sparkles" size={14} /> Personalized to your situation
          </div>
          <h2 className="editorial" style={{ fontSize: 44, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 10px", textWrap: "balance" }}>
            Here&apos;s your move, in <span className="it">three calm phases</span>.
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: 17, margin: 0 }}>
            We analyzed your context and sequenced 18 concrete steps — you&apos;ll only ever see the next one.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            {summary.map((s) => (
              <span
                key={s.label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px",
                  borderRadius: 999, background: "var(--background)", border: "1px solid var(--border)", fontSize: 13.5, fontWeight: 500,
                }}
              >
                <Icon name={s.icon} size={15} color="var(--muted-foreground)" /> {s.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PHASES.map((p, i) => (
            <Card
              key={p.id}
              style={{ padding: 22, animation: "fadeUp .5s both", animationDelay: `${i * 0.12}s`, borderColor: i === 0 ? "var(--ac-border)" : "var(--border)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <IconTile icon={p.icon as never} tone={p.tone} size={54} r={15} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase {p.n}</span>
                    {i === 0 && <Badge variant="accent">Start here</Badge>}
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-.4px" }}>{p.name}</div>
                  <div style={{ fontSize: 14.5, color: "var(--muted-foreground)", marginTop: 4 }}>{p.blurb}</div>
                </div>
                <div style={{ textAlign: "right", flex: "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.tasks} steps</div>
                  <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{p.weeks}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          <Button size="lg" onClick={() => router.push("/guest")} style={{ height: 48, padding: "0 28px", fontSize: 16 }}>
            Open My Dashboard <Icon name="ArrowRight" size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}
