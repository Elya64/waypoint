"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { Card } from "@/components/ui/card";
import { usePlan } from "@/components/flow/plan-provider";
import { aiJSON } from "@/lib/ai-client";
import { cityOnly, type Task } from "@/lib/waypoint";

interface RoadmapResult {
  tasks?: { label?: string; sub?: string[] }[];
}

export default function GeneratingPage() {
  const router = useRouter();
  const { input, setTasks } = usePlan();
  const [done, setDone] = useState(0);

  const lines = [
    "Reading visa requirements for " + (cityOnly(input.to) || "your destination") + "…",
    "Mapping the financial setup for new residents…",
    "Sequencing housing & logistics around your timeline…",
    "Decomposing everything into bite-sized weekly steps…",
  ];

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const result = await aiJSON<RoadmapResult>("roadmap", input);
      const arr = result?.tasks;
      if (!cancelled && Array.isArray(arr) && arr.length) {
        const tasks: Task[] = arr
          .slice(0, 4)
          .map((t, i) => ({
            id: "t" + (i + 1),
            label: String(t.label || "").slice(0, 90),
            done: false,
            sub: (Array.isArray(t.sub) ? t.sub : [])
              .slice(0, 4)
              .map((s) => ({ label: String(s).slice(0, 120), done: false })),
          }))
          .filter((t) => t.label);
        if (tasks.length) setTasks(tasks);
      }
    })();

    const timers = lines.map((_, i) => setTimeout(() => setDone(i + 1), 650 + i * 650));
    const fin = setTimeout(() => router.push("/preview"), 650 + lines.length * 650 + 500);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearTimeout(fin);
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="surface animate-screenIn" style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <div
          style={{
            width: 76, height: 76, margin: "0 auto 26px", borderRadius: 22, display: "grid", placeItems: "center",
            background: "var(--ac-soft)", border: "1px solid var(--ac-border)", animation: "drift 2.4s ease-in-out infinite",
          }}
        >
          <Icon name="Sparkles" size={34} color="var(--ac)" />
        </div>
        <h2 className="editorial" style={{ fontSize: 30, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 8px" }}>
          Building your <span className="it">roadmap</span>
        </h2>
        <p style={{ color: "var(--muted-foreground)", margin: "0 0 28px", fontSize: 15.5 }}>
          Analyzing your move from <b style={{ color: "var(--foreground)" }}>{cityOnly(input.from) || "home"}</b> to{" "}
          <b style={{ color: "var(--foreground)" }}>{cityOnly(input.to) || "your destination"}</b>.
        </p>
        <Card style={{ padding: 10, textAlign: "left" }}>
          {lines.map((ln, i) => {
            const state = i < done ? "done" : i === done ? "active" : "wait";
            return (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 12px",
                  opacity: state === "wait" ? 0.4 : 1, transition: "opacity .3s ease",
                }}
              >
                <span style={{ width: 20, height: 20, flex: "none", display: "grid", placeItems: "center" }}>
                  {state === "done" && <Icon name="CheckCircle2" size={19} color="var(--positive)" />}
                  {state === "active" && (
                    <span
                      style={{
                        width: 16, height: 16, borderRadius: 999, border: "2px solid var(--ac)",
                        borderTopColor: "transparent", display: "inline-block", animation: "spin .7s linear infinite",
                      }}
                    />
                  )}
                  {state === "wait" && <Icon name="Circle" size={17} color="var(--neutral-300)" />}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: state === "active" ? 600 : 500 }}>{ln}</span>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
