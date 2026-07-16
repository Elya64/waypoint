"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Brand } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { IconTile } from "@/components/icon-tile";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton, Button } from "@/components/ui/button";
import { aiComplete } from "@/lib/ai-client";
import { FLOW_STORE_KEY } from "@/components/flow/plan-provider";
import {
  PHASES, BLANK_INPUT, DEFAULT_TASKS, cityOnly, type PlanInput, type Task, type WaypointDoc,
} from "@/lib/waypoint";
import {
  planRowToInput, taskRowToTask, docRowToDoc,
  type PlanRow, type TaskRow, type DocumentRow,
} from "@/lib/db-types";

type NavId = "roadmap" | "vault" | "timeline";

/** Seed for the signed-out demo at /demo. Kept here rather than in the DB so the
 *  demo never touches Supabase — no auth, no rows, no storage. */
const DEMO_INPUT: PlanInput = {
  email: "alex@example.com", from: "Berlin, Germany", to: "Lisbon, Portugal", visa: "need", when: "3-6",
};

export function DashboardApp({
  userId, email, displayName, pro, demo = false,
}: {
  userId: string; email: string; displayName: string; pro: boolean; demo?: boolean;
}) {
  const router = useRouter();
  const supabase = useRef(createClient()).current;

  const [loading, setLoading] = useState(!demo);
  const [planId, setPlanId] = useState<string | null>(null);
  const [input, setInput] = useState<PlanInput>(demo ? DEMO_INPUT : BLANK_INPUT);
  const [tasks, setTasks] = useState<Task[]>(demo ? DEFAULT_TASKS : []);
  const [docs, setDocs] = useState<WaypointDoc[]>([]);
  const [nav, setNav] = useState<NavId>("roadmap");

  // ---- load or claim the plan ----
  useEffect(() => {
    if (demo) return;
    let active = true;
    (async () => {
      const { data: plans } = await supabase
        .from("plans").select("*").eq("active", true)
        .order("created_at", { ascending: false }).limit(1);

      let plan = (plans?.[0] as PlanRow | undefined) ?? null;

      // No plan yet — claim the one collected in the pre-auth funnel (localStorage).
      if (!plan) {
        const flow = readFlow();
        if (!flow) {
          router.replace("/onboarding");
          return;
        }
        plan = await claimPlan(supabase, userId, email, flow.input, flow.tasks);
        clearFlow();
      }
      if (!active || !plan) return;

      const [{ data: taskRows }, { data: docRows }] = await Promise.all([
        supabase.from("tasks").select("*").eq("plan_id", plan.id).order("sort"),
        supabase.from("documents").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      ]);

      if (!active) return;
      setPlanId(plan.id);
      setInput(planRowToInput(plan));
      setTasks((taskRows as TaskRow[] | null ?? []).map(taskRowToTask));
      setDocs((docRows as DocumentRow[] | null ?? []).map(docRowToDoc));
      setLoading(false);
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- mutations ----
  const toggleTask = useCallback(async (id: string) => {
    let nextDone = false;
    setTasks((ts) => ts.map((t) => (t.id === id ? ((nextDone = !t.done), { ...t, done: nextDone }) : t)));
    if (demo) return;
    await supabase.from("tasks").update({ done: nextDone }).eq("id", id);
  }, [supabase, demo]);

  const setSub = useCallback(async (id: string, sub: Task["sub"]) => {
    const allDone = sub.length > 0 && sub.every((s) => s.done);
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, sub, done: allDone || t.done } : t)));
    if (demo) return;
    await supabase.from("tasks").update({ sub, ...(allDone ? { done: true } : {}) }).eq("id", id);
  }, [supabase, demo]);

  const addDocs = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files || []);
    if (demo) {
      // Show the upload UI working without persisting anything.
      setDocs((d) => [
        ...list.map((f, i) => ({
          id: `demo-${Date.now()}-${i}`, name: f.name, kind: "Proof of action", at: "just now",
        })),
        ...d,
      ]);
      return;
    }
    for (const f of list) {
      const path = `${userId}/${Date.now()}-${f.name}`;
      const { error: upErr } = await supabase.storage.from("documents").upload(path, f);
      if (upErr) continue;
      const { data } = await supabase
        .from("documents")
        .insert({ user_id: userId, plan_id: planId, name: f.name, kind: "Proof of action", storage_path: path })
        .select("*").single();
      if (data) setDocs((d) => [docRowToDoc(data as DocumentRow), ...d]);
    }
  }, [supabase, userId, planId, demo]);

  const restart = useCallback(async () => {
    if (!demo && planId) await supabase.from("plans").update({ active: false }).eq("id", planId);
    clearFlow();
    router.push("/onboarding");
  }, [supabase, planId, router, demo]);

  if (loading) {
    return (
      <div className="surface" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted-foreground)" }}>
          <span
            style={{
              width: 18, height: 18, borderRadius: 999, border: "2px solid var(--ac)",
              borderTopColor: "transparent", display: "inline-block", animation: "spin .7s linear infinite",
            }}
          />
          Loading your roadmap…
        </div>
      </div>
    );
  }

  const fromCity = cityOnly(input.from) || "home";
  const toCity = cityOnly(input.to) || "your destination";
  const initial = displayName.charAt(0).toUpperCase();

  const navItems: { id: NavId; label: string; icon: IconName; badge?: number }[] = [
    { id: "roadmap", label: "Roadmap", icon: "Map" },
    { id: "vault", label: "Document Vault", icon: "FolderLock", badge: docs.length },
    { id: "timeline", label: "Timeline", icon: "GanttChartSquare" },
  ];

  return (
    <div className="dash-grid animate-screenIn" style={{ display: "grid", gridTemplateColumns: "264px 1fr", minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* ============ SIDEBAR ============ */}
      <aside
        className="dash-sidebar"
        style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}
      >
        <div style={{ padding: "20px 20px 16px" }}><Brand /></div>

        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: 12, borderRadius: 13, background: "var(--background)", border: "1px solid var(--border)" }}>
            <div style={{ width: 38, height: 38, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, fontSize: 15 }}>{initial}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Hello, {displayName}!</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Icon name="Plane" size={12} /> {fromCity} → {toCity}
              </div>
            </div>
          </div>
        </div>

        <nav style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--sidebar-muted)", padding: "8px 12px 6px" }}>Workspace</div>
          {navItems.map((n) => {
            const activeItem = nav === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setNav(n.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", width: "100%",
                  borderRadius: 9, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                  border: "none", textAlign: "left",
                  background: activeItem ? "var(--sidebar-accent)" : "transparent",
                  color: activeItem ? "var(--sidebar-accent-foreground)" : "var(--sidebar-foreground)",
                }}
              >
                <Icon name={n.icon} size={17} color={activeItem ? "var(--ac)" : "currentColor"} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge ? <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{n.badge}</span> : null}
              </button>
            );
          })}
        </nav>

        <AskAI input={input} tasks={tasks} toCity={toCity} pro={pro} />

        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--sidebar-border)", display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={restart} style={footerBtn}>
            <Icon name="RotateCcw" size={15} /> Start a new plan
          </button>
          {demo ? (
            <Link href="/login" style={{ ...footerBtn, textDecoration: "none" }}>
              <Icon name="ArrowRight" size={15} /> Sign up for your own plan
            </Link>
          ) : (
            <form action="/auth/signout" method="post">
              <button type="submit" style={{ ...footerBtn, width: "100%" }}>
                <Icon name="ArrowUp" size={15} style={{ transform: "rotate(45deg)" }} /> Sign out
              </button>
            </form>
          )}
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main style={{ padding: 0, overflow: "auto" }}>
        {!pro && <UpgradeBanner />}
        {nav === "roadmap" && (
          <RoadmapView tasks={tasks} toggle={toggleTask} setSub={setSub} addDocs={addDocs} toCity={toCity} aiOn={pro} />
        )}
        {nav === "vault" && <VaultView docs={docs} addDocs={addDocs} />}
        {nav === "timeline" && <TimelineView tasks={tasks} />}
      </main>
    </div>
  );
}

const footerBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px",
  border: "none", background: "transparent", cursor: "pointer", borderRadius: 8,
  fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--muted-foreground)", textAlign: "left",
};

/* ---------------- upgrade banner ---------------- */
function UpgradeBanner() {
  return (
    <div style={{ padding: "12px 32px", background: "var(--ac-soft)", borderBottom: "1px solid var(--ac-border)", display: "flex", alignItems: "center", gap: 12 }}>
      <Icon name="Sparkles" size={16} color="var(--ac)" />
      <span style={{ fontSize: 13.5, flex: 1 }}>
        You&apos;re on the free plan. Unlock the AI coach, unlimited documents, and all three phases.
      </span>
      <a href="/pricing"><Button size="sm">Upgrade</Button></a>
    </div>
  );
}

/* ---------------- ROADMAP VIEW ---------------- */
function RoadmapView({
  tasks, toggle, setSub, addDocs, toCity, aiOn,
}: {
  tasks: Task[]; toggle: (id: string) => void; setSub: (id: string, sub: Task["sub"]) => void;
  addDocs: (f: FileList | File[]) => void; toCity: string; aiOn: boolean;
}) {
  const phase = PHASES[0];
  const doneCount = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 32px 72px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
            <IconTile icon={phase.icon as IconName} tone={phase.tone} size={34} r={9} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase 1 · Active</span>
          </div>
          <h1 className="editorial" style={{ fontSize: 36, letterSpacing: "-.5px", fontWeight: 500, margin: 0 }}>{phase.name}</h1>
        </div>
        <Badge variant="secondary" style={{ marginTop: 6 }}><Icon name="CalendarDays" size={13} /> Week 2 of 12</Badge>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 18px", margin: "16px 0 24px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Phase 1: {pct}% completed</span>
            <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{doneCount} of {tasks.length} this week</span>
          </div>
          <Progress value={pct} />
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", marginBottom: 22 }}>
        <div style={{ padding: "20px 22px 0", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ac)", boxShadow: "0 0 0 4px var(--ac-soft)" }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ac)" }}>This week&apos;s focus</span>
          {aiOn && (
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: "var(--ac)", background: "var(--ac-soft)", border: "1px solid var(--ac-border)", padding: "3px 8px", borderRadius: 999 }}>
              <Icon name="Sparkles" size={12} /> Personalized for {toCity}
            </span>
          )}
        </div>
        <div style={{ padding: "8px 22px 4px" }}>
          <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-.5px", margin: "0 0 2px" }}>Visa Application</h3>
          <p style={{ fontSize: 14.5, color: "var(--muted-foreground)", margin: 0 }}>
            Steps to get your file consulate-ready. Feeling stuck on one? Break it down.
          </p>
        </div>
        <div style={{ padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={() => toggle(t.id)} onSub={(sub) => setSub(t.id, sub)} />
          ))}
          {tasks.length === 0 && (
            <div style={{ padding: "24px 0", textAlign: "center", color: "var(--muted-foreground)", fontSize: 14 }}>
              No tasks yet for this week.
            </div>
          )}
        </div>
      </div>

      <UploadZone addDocs={addDocs} />
      <div style={{ marginTop: 22 }}><UpcomingCard /></div>
    </div>
  );
}

/* ---- single checklist item with decomposition ---- */
function TaskItem({ task, onToggle, onSub }: { task: Task; onToggle: () => void; onSub: (sub: Task["sub"]) => void }) {
  const [open, setOpen] = useState(false);
  const subDoneCount = task.sub.filter((s) => s.done).length;
  const toggleSub = (i: number) => onSub(task.sub.map((s, j) => (j === i ? { ...s, done: !s.done } : s)));

  return (
    <div
      style={{
        border: "1px solid " + (task.done ? "color-mix(in srgb, var(--positive) 30%, var(--border))" : "var(--border)"),
        borderRadius: 13, background: task.done ? "color-mix(in srgb, var(--positive) 5%, var(--card))" : "var(--card)",
        transition: "all .2s ease", overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px" }}>
        <Checkbox checked={task.done} onCheckedChange={onToggle} />
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, textDecoration: task.done ? "line-through" : "none", color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
          {task.label}
        </span>
        {open && subDoneCount > 0 && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{subDoneCount}/{task.sub.length}</span>
        )}
        {task.sub.length > 0 && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", flex: "none",
              borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500,
              border: "1px solid " + (open ? "var(--ac-border)" : "var(--border)"),
              background: open ? "var(--ac-soft)" : "var(--background)",
              color: open ? "var(--ac)" : "var(--muted-foreground)",
            }}
          >
            <Icon name="Network" size={13} /> {open ? "Hide steps" : "Break it down"}
          </button>
        )}
      </div>

      {open && (
        <div style={{ padding: "2px 14px 14px 46px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 12, color: "var(--ac)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, margin: "2px 0 8px" }}>
            <Icon name="Sparkles" size={13} /> Broken into micro-actions
          </div>
          {task.sub.map((s, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 10px", borderRadius: 9, cursor: "pointer", animation: "fadeUp .25s both", animationDelay: `${i * 0.05}s` }}>
              <Checkbox checked={s.done} onCheckedChange={() => toggleSub(i)} />
              <span style={{ fontSize: 13.5, color: s.done ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: s.done ? "line-through" : "none" }}>{s.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- upload zone ---- */
function UploadZone({ addDocs }: { addDocs: (f: FileList | File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); addDocs(e.dataTransfer.files); }}
      style={{
        border: "1.5px dashed " + (drag ? "var(--ac)" : "var(--border)"), borderRadius: 14,
        background: drag ? "var(--ac-soft)" : "var(--card)", padding: 22, textAlign: "center", transition: "all .15s ease",
      }}
    >
      <input ref={inputRef} type="file" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addDocs(e.target.files)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center", background: "var(--secondary)", flex: "none" }}>
          <Icon name="UploadCloud" size={22} color="var(--muted-foreground)" />
        </div>
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Upload artifact / proof of action</div>
          <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Drag a file here, or browse — stored securely in your vault.</div>
        </div>
        <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()} style={{ flex: "none" }}>
          <Icon name="Paperclip" size={15} /> Browse
        </Button>
      </div>
    </div>
  );
}

/* ---- upcoming card ---- */
function UpcomingCard() {
  const p = PHASES[1];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 14, background: "var(--neutral-900)", color: "var(--neutral-50)" }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, flex: "none", display: "grid", placeItems: "center", background: "rgba(255,255,255,.08)" }}>
        <Icon name="House" size={22} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--neutral-400)", marginBottom: 3 }}>Next up</div>
        <div style={{ fontSize: 16.5, fontWeight: 600 }}>{p.name}</div>
        <div style={{ fontSize: 13.5, color: "var(--neutral-400)" }}>Unlocks when Phase 1 is wrapped.</div>
      </div>
      <Badge style={{ background: "rgba(255,255,255,.12)", color: "#fff", flex: "none" }}><Icon name="Lock" size={12} /> Locked</Badge>
    </div>
  );
}

/* ---------------- ASK AI ---------------- */
function AskAI({ input, tasks, toCity, pro }: { input: PlanInput; tasks: Task[]; toCity: string; pro: boolean }) {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    const text = q.trim();
    if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setQ(""); setOpen(true); setBusy(true);
    const reply = await aiComplete("chat", { input, tasks, question: text });
    setMsgs((m) => [...m, { role: "ai", text: reply || answerFor(text, toCity) }]);
    setBusy(false);
  };

  if (!pro) {
    return (
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sidebar-border)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--sidebar-muted)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="Sparkles" size={12} color="var(--ac)" /> Ask Waypoint
        </div>
        <a href="/pricing" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 11, background: "var(--background)", border: "1px solid var(--border)", fontSize: 12.5, color: "var(--muted-foreground)" }}>
            <Icon name="Lock" size={13} /> Upgrade to chat with your AI coach
          </div>
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sidebar-border)" }}>
      {open && msgs.length > 0 && (
        <div style={{ maxHeight: 220, overflow: "auto", marginBottom: 10, display: "flex", flexDirection: "column", gap: 8, padding: 10, borderRadius: 12, background: "var(--background)", border: "1px solid var(--border)" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "92%", fontSize: 12.5, lineHeight: 1.45, padding: "8px 11px", borderRadius: 11, background: m.role === "user" ? "var(--primary)" : "var(--ac-soft)", color: m.role === "user" ? "var(--primary-foreground)" : "var(--foreground)", border: m.role === "ai" ? "1px solid var(--ac-border)" : "none" }}>
              {m.text}
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--sidebar-muted)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <Icon name="Sparkles" size={12} color="var(--ac)" /> Ask Waypoint
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 5px 5px 11px", borderRadius: 11, background: "var(--background)", border: "1px solid var(--border)" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={busy ? "Thinking…" : "What is my next priority?"}
          disabled={busy}
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--foreground)", minWidth: 0 }}
        />
        <IconButton variant="primary" size="sm" onClick={ask} aria-label="Ask" disabled={busy}>
          <Icon name={busy ? "Loader" : "ArrowUp"} size={15} style={busy ? { animation: "spin .7s linear infinite" } : undefined} />
        </IconButton>
      </div>
    </div>
  );
}

function answerFor(q: string, toCity: string) {
  const s = q.toLowerCase();
  if (s.includes("priorit") || s.includes("next") || s.includes("focus"))
    return `Your #1 priority: book the ${toCity} consulate appointment. National-visa slots fill 4–6 weeks out, so locking a date now unblocks everything else.`;
  if (s.includes("bank") || s.includes("financ") || s.includes("money"))
    return "For Phase 2 you'll need 6 months of stamped statements — start gathering those now so you're ahead.";
  if (s.includes("hous") || s.includes("rent") || s.includes("apart"))
    return "Housing is Phase 3. Don't start now — securing the visa first protects your deposit if dates shift.";
  return "Keep your energy on Phase 1. The single highest-leverage move this week is booking the consulate appointment — everything downstream depends on that date.";
}

/* ---------------- DOCUMENT VAULT ---------------- */
function VaultView({ docs, addDocs }: { docs: WaypointDoc[]; addDocs: (f: FileList | File[]) => void }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 32px 72px" }}>
      <h1 className="editorial" style={{ fontSize: 36, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 6px" }}>Document <span className="it">Vault</span></h1>
      <p style={{ fontSize: 15.5, color: "var(--muted-foreground)", margin: "0 0 24px" }}>
        Every artifact you upload as proof of action lives here — encrypted and move-ready.
      </p>

      <UploadZone addDocs={addDocs} />

      <div style={{ marginTop: 24 }}>
        {docs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted-foreground)" }}>
            <Icon name="FolderOpen" size={34} color="var(--neutral-300)" />
            <div style={{ marginTop: 10, fontSize: 14 }}>No documents yet.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {docs.map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 13, background: "var(--card)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, flex: "none", display: "grid", placeItems: "center", background: "var(--secondary)" }}>
                  <Icon name="FileText" size={19} color="var(--muted-foreground)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{d.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>{d.kind} · {d.at}</div>
                </div>
                <Badge variant="success"><Icon name="Check" size={12} /> Stored</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- TIMELINE ---------------- */
function TimelineView({ tasks }: { tasks: Task[] }) {
  const doneCount = tasks.filter((t) => t.done).length;
  const p1pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  const rows = PHASES.map((p, i) => ({
    ...p,
    status: i === 0 ? (p1pct === 100 ? "done" : "active") : "upcoming",
    pct: i === 0 ? p1pct : 0,
  }));
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 32px 72px" }}>
      <h1 className="editorial" style={{ fontSize: 36, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 6px" }}>Timeline</h1>
      <p style={{ fontSize: 15.5, color: "var(--muted-foreground)", margin: "0 0 32px" }}>
        Your full move, sequenced across 12 weeks. One phase at a time.
      </p>

      <div style={{ position: "relative", paddingLeft: 8 }}>
        <div style={{ position: "absolute", left: 26, top: 18, bottom: 18, width: 2, background: "var(--border)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {rows.map((r) => (
            <div key={r.id} style={{ display: "flex", gap: 18, position: "relative" }}>
              <div
                style={{
                  width: 38, height: 38, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", zIndex: 1,
                  background: r.status === "active" ? "var(--ac)" : r.status === "done" ? "var(--positive)" : "var(--background)",
                  color: r.status === "upcoming" ? "var(--muted-foreground)" : "#fff",
                  border: "2px solid " + (r.status === "upcoming" ? "var(--border)" : "transparent"),
                }}
              >
                <Icon name={r.status === "done" ? "Check" : (r.icon as IconName)} size={18} />
              </div>
              <div style={{ flex: 1, padding: 18, border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase {r.n} · {r.weeks}</span>
                  {r.status === "active" && <Badge variant="accent">In progress</Badge>}
                  {r.status === "upcoming" && <Badge variant="outline">Upcoming</Badge>}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.3px" }}>{r.name}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted-foreground)", marginTop: 3, maxWidth: 460 }}>{r.blurb}</div>
                {r.status === "active" && (
                  <div style={{ marginTop: 14 }}>
                    <Progress value={r.pct} />
                    <div style={{ fontSize: 12.5, color: "var(--muted-foreground)", marginTop: 7 }}>{r.pct}% complete</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- flow (localStorage) + claim helpers ---------------- */
function readFlow(): { input: PlanInput; tasks: Task[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = JSON.parse(localStorage.getItem(FLOW_STORE_KEY) || "null");
    if (!raw || !raw.input) return null;
    // require at least a destination to consider it a real plan
    if (!String(raw.input.to || "").trim()) return null;
    return raw;
  } catch {
    return null;
  }
}
function clearFlow() {
  try { localStorage.removeItem(FLOW_STORE_KEY); } catch { /* ignore */ }
}

async function claimPlan(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  email: string,
  input: PlanInput,
  tasks: Task[]
): Promise<PlanRow | null> {
  // deactivate any prior active plans (defensive)
  await supabase.from("plans").update({ active: false }).eq("user_id", userId).eq("active", true);

  const { data: plan } = await supabase
    .from("plans")
    .insert({
      user_id: userId,
      email: email || input.email,
      from_loc: input.from,
      to_loc: input.to,
      visa: input.visa,
      when_timing: input.when,
      active: true,
    })
    .select("*")
    .single();

  if (!plan) return null;

  const rows = (tasks.length ? tasks : []).map((t, i) => ({
    plan_id: (plan as PlanRow).id,
    ext_id: t.id,
    label: t.label,
    done: t.done,
    sub: t.sub,
    sort: i,
  }));
  if (rows.length) await supabase.from("tasks").insert(rows);

  return plan as PlanRow;
}
