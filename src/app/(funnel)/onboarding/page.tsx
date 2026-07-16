"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { IconTile } from "@/components/icon-tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePlan } from "@/components/flow/plan-provider";
import type { PlanInput } from "@/lib/waypoint";

const VISA_OPTS = [
  { value: "need", label: "I need a visa", desc: "Help me figure out which one and how to apply.", icon: "FileSearch" as IconName },
  { value: "approved", label: "Already approved", desc: "My visa or permit is sorted.", icon: "BadgeCheck" as IconName },
  { value: "eu", label: "EU / no visa needed", desc: "I can move freely.", icon: "Globe" as IconName },
];
const WHEN_OPTS = [
  { value: "asap", label: "As soon as possible", icon: "Zap" as IconName },
  { value: "1-3", label: "In 1–3 months", icon: "CalendarClock" as IconName },
  { value: "3-6", label: "In 3–6 months", icon: "Calendar" as IconName },
  { value: "6+", label: "6+ months out", icon: "CalendarRange" as IconName },
];

type StepKey = keyof Omit<PlanInput, "email">;

export default function OnboardingPage() {
  const router = useRouter();
  const { input, setInput } = usePlan();
  const [step, setStep] = useState(0);

  const steps: { q: string; sub: string; key: StepKey }[] = [
    { q: "Where are you moving from?", sub: "Your current home base.", key: "from" },
    { q: "Where is your destination?", sub: "Where you're headed next.", key: "to" },
    { q: "What is your visa status?", sub: "This shapes your very first steps.", key: "visa" },
    { q: "When are you planning to move?", sub: "A rough timeframe is perfectly fine.", key: "when" },
  ];
  const cur = steps[step];
  const total = steps.length;
  const pct = Math.round((step / total) * 100);

  const value = (input[cur.key] as string) || "";
  const set = (v: string) => setInput((d) => ({ ...d, [cur.key]: v }));

  const canNext = cur.key === "from" || cur.key === "to" ? value.trim().length > 1 : !!value;
  const next = () => {
    if (!canNext) return;
    if (step === total - 1) router.push("/generating");
    else setStep((s) => s + 1);
  };
  const back = () => (step === 0 ? router.push("/") : setStep((s) => s - 1));

  return (
    <div className="surface" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav className="nav">
        <Brand />
        <Badge variant="secondary">Step {step + 1} of {total}</Badge>
      </nav>

      {/* progress */}
      <div style={{ maxWidth: 620, width: "100%", margin: "40px auto 0", padding: "0 24px" }}>
        <Progress value={pct} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          {steps.map((s, i) => (
            <span
              key={s.key}
              style={{
                fontSize: 12, fontWeight: 600,
                color: i <= step ? "var(--foreground)" : "var(--muted-foreground)",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              {i < step && <Icon name="Check" size={13} color="var(--positive)" />}
              {["Origin", "Destination", "Visa", "Timing"][i]}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "32px 24px 64px" }}>
        <div key={step} className="animate-screenIn" style={{ width: "100%", maxWidth: 560 }}>
          <h2 className="editorial" style={{ fontSize: 38, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 8px", textWrap: "balance" }}>{cur.q}</h2>
          <p style={{ fontSize: 16.5, color: "var(--muted-foreground)", margin: "0 0 28px" }}>{cur.sub}</p>

          {(cur.key === "from" || cur.key === "to") && (
            <div>
              <Input
                inputSize="lg"
                autoFocus
                value={value}
                onChange={(e) => set(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder={cur.key === "from" ? "e.g. Moscow, Russia" : "e.g. Barcelona, Spain"}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {(cur.key === "from"
                  ? ["Moscow, Russia", "Kyiv, Ukraine", "London, UK"]
                  : ["Barcelona, Spain", "Berlin, Germany", "Lisbon, Portugal"]
                ).map((c) => (
                  <button key={c} onClick={() => set(c)} style={chipStyle(value === c)}>
                    <Icon name="MapPin" size={13} /> {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cur.key === "visa" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {VISA_OPTS.map((o) => (
                <ChoiceCard key={o.value} active={value === o.value} onClick={() => set(o.value)} icon={o.icon} title={o.label} desc={o.desc} />
              ))}
            </div>
          )}

          {cur.key === "when" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {WHEN_OPTS.map((o) => (
                <ChoiceCard key={o.value} active={value === o.value} onClick={() => set(o.value)} icon={o.icon} title={o.label} compact />
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 36 }}>
            <Button variant="ghost" onClick={back}>
              <Icon name="ArrowLeft" size={16} /> Back
            </Button>
            <div style={{ flex: 1 }} />
            <Button size="lg" onClick={next} disabled={!canNext}>
              {step === total - 1 ? "Generate my roadmap" : "Continue"}
              <Icon name={step === total - 1 ? "Sparkles" : "ArrowRight"} size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function chipStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px",
    borderRadius: 999, fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)",
    border: "1px solid " + (active ? "var(--primary)" : "var(--border)"),
    background: active ? "var(--primary)" : "var(--background)",
    color: active ? "var(--primary-foreground)" : "var(--foreground)",
    transition: "all .15s ease",
  };
}

function ChoiceCard({
  active, onClick, icon, title, desc, compact,
}: {
  active: boolean; onClick: () => void; icon: IconName; title: string; desc?: string; compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
        padding: "16px 18px", cursor: "pointer", fontFamily: "var(--font-sans)",
        borderRadius: 14, transition: "all .15s ease",
        border: "1px solid " + (active ? "var(--ac)" : "var(--border)"),
        background: active ? "var(--ac-soft)" : "var(--background)",
        boxShadow: active ? "0 0 0 3px color-mix(in srgb, var(--ac) 14%, transparent)" : "none",
      }}
    >
      <IconTile icon={icon} tone={active ? "var(--ac)" : "var(--neutral-500)"} size={compact ? 38 : 42} r={11} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15.5 }}>{title}</div>
        {desc && <div style={{ fontSize: 13.5, color: "var(--muted-foreground)", marginTop: 2 }}>{desc}</div>}
      </div>
      <Icon name={active ? "CheckCircle2" : "Circle"} size={20} color={active ? "var(--ac)" : "var(--neutral-300)"} />
    </button>
  );
}
