/* ───────────────────────────────────────────────────────────────
   dashboard.jsx — Main control dashboard (shell, checklist,
   decomposition, upload, Ask-AI, vault, timeline)
   ─────────────────────────────────────────────────────────────── */

const D2 = window.ObraShadcnUiDesignSystem_acd6ac;

function Dashboard({ data, tasks, setTasks, docs, setDocs, onRestart }) {
  const [nav, setNav] = useState("roadmap");

  const fromCity = cityOnly(data.from) || "Moscow";
  const toCity = cityOnly(data.to) || "Barcelona";

  const navItems = [
    { id: "roadmap", label: "Roadmap", icon: "Map" },
    { id: "vault", label: "Document Vault", icon: "FolderLock", badge: docs.length },
    { id: "timeline", label: "Timeline", icon: "GanttChartSquare" },
  ];

  return (
    <div className="screen" style={{ display: "grid", gridTemplateColumns: "264px 1fr", minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* ============ SIDEBAR ============ */}
      <aside style={{
        background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)",
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "20px 20px 16px" }}><Brand /></div>

        {/* profile snippet */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 11, padding: 12, borderRadius: 13,
            background: "var(--background)", border: "1px solid var(--border)",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999, flex: "none", display: "grid", placeItems: "center",
              background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, fontSize: 15,
            }}>N</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Hello, Nikolay!</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Icon name="Plane" size={12} /> {fromCity} → {toCity}
              </div>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--sidebar-muted)", padding: "8px 12px 6px" }}>Workspace</div>
          {navItems.map((n) => {
            const active = nav === n.id;
            return (
              <button key={n.id} onClick={() => setNav(n.id)} style={{
                display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", width: "100%",
                borderRadius: 9, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                border: "none", textAlign: "left",
                background: active ? "var(--sidebar-accent)" : "transparent",
                color: active ? "var(--sidebar-accent-foreground)" : "var(--sidebar-foreground)",
              }}>
                <Icon name={n.icon} size={17} color={active ? "var(--ac)" : "currentColor"} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge ? <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{n.badge}</span> : null}
              </button>
            );
          })}
        </nav>

        {/* Ask AI */}
        <AskAI data={data} tasks={tasks} />

        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--sidebar-border)" }}>
          <button onClick={onRestart} style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px",
            border: "none", background: "transparent", cursor: "pointer", borderRadius: 8,
            fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--muted-foreground)",
          }}>
            <Icon name="RotateCcw" size={15} /> Start a new plan
          </button>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main style={{ padding: "0", overflow: "auto" }}>
        {nav === "roadmap" && <RoadmapView tasks={tasks} setTasks={setTasks} docs={docs} setDocs={setDocs} toCity={toCity} aiOn={aiReady()} />}
        {nav === "vault" && <VaultView docs={docs} setDocs={setDocs} onGoRoadmap={() => setNav("roadmap")} />}
        {nav === "timeline" && <TimelineView tasks={tasks} />}
      </main>
    </div>
  );
}

/* ---------------- ROADMAP VIEW ---------------- */
function RoadmapView({ tasks, setTasks, docs, setDocs, toCity, aiOn }) {
  const phase = PHASES[0];
  const doneCount = tasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / tasks.length) * 100);

  const toggle = (id) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const setSub = (id, subDone) => setTasks((ts) => ts.map((t) => {
    if (t.id !== id) return t;
    const allDone = subDone.length === t.sub.length && subDone.every(Boolean);
    return { ...t, _subDone: subDone, done: allDone ? true : t.done };
  }));

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 32px 72px" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
            <IconTile icon={phase.icon} tone={phase.tone} size={34} r={9} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase 1 · Active</span>
          </div>
          <h1 className="editorial" style={{ fontSize: 36, letterSpacing: "-.5px", fontWeight: 500, margin: 0 }}>{phase.name}</h1>
        </div>
        <D2.Badge variant="secondary" rounded style={{ marginTop: 6 }}>
          <Icon name="CalendarDays" size={13} /> Week 2 of 12
        </D2.Badge>
      </div>

      {/* progress strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 18, padding: "16px 18px", marginBottom: 24, marginTop: 16,
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Phase 1: {pct}% completed</span>
            <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{doneCount} of {tasks.length} this week</span>
          </div>
          <D2.Progress value={pct} />
        </div>
      </div>

      {/* active task card */}
      <D2.Card style={{ marginBottom: 22 }}>
        <div style={{ padding: "20px 22px 0", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ac)", boxShadow: "0 0 0 4px var(--ac-soft)" }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ac)" }}>This week's focus</span>
          {aiOn && (
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: "var(--ac)", background: "var(--ac-soft)", border: "1px solid var(--ac-border)", padding: "3px 8px", borderRadius: 999 }}>
              <Icon name="Sparkles" size={12} /> Personalized for {toCity}
            </span>
          )}
        </div>
        <div style={{ padding: "8px 22px 4px" }}>
          <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-.5px", margin: "0 0 2px" }}>Visa Application</h3>
          <p style={{ fontSize: 14.5, color: "var(--muted-foreground)", margin: 0 }}>
            Three steps to get your file consulate-ready. Feeling stuck on one? Break it down.
          </p>
        </div>
        <div style={{ padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={() => toggle(t.id)} onSub={(sd) => setSub(t.id, sd)} />
          ))}
        </div>
      </D2.Card>

      {/* upload zone */}
      <UploadZone docs={docs} setDocs={setDocs} />

      {/* upcoming */}
      <div style={{ marginTop: 22 }}>
        <UpcomingCard />
      </div>
    </div>
  );
}

/* ---- single checklist item with decomposition ---- */
function TaskItem({ task, onToggle, onSub }) {
  const [open, setOpen] = useState(false);
  const [subDone, setSubDone] = useState(task.sub.map(() => false));
  const toggleSub = (i) => {
    const nx = subDone.map((v, j) => (j === i ? !v : v));
    setSubDone(nx); onSub(nx);
  };
  const subCount = subDone.filter(Boolean).length;

  return (
    <div style={{
      border: "1px solid " + (task.done ? "color-mix(in srgb, var(--positive) 30%, var(--border))" : "var(--border)"),
      borderRadius: 13, background: task.done ? "color-mix(in srgb, var(--positive) 5%, var(--card))" : "var(--card)",
      transition: "all .2s ease", overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px" }}>
        <D2.Checkbox checked={task.done} onCheckedChange={onToggle} />
        <span style={{
          flex: 1, fontSize: 15, fontWeight: 500,
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "var(--muted-foreground)" : "var(--foreground)",
        }}>{task.label}</span>

        {open && subCount > 0 && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{subCount}/{task.sub.length}</span>
        )}
        <button onClick={() => setOpen((o) => !o)} style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", flex: "none",
          borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500,
          border: "1px solid " + (open ? "var(--ac-border)" : "var(--border)"),
          background: open ? "var(--ac-soft)" : "var(--background)",
          color: open ? "var(--ac)" : "var(--muted-foreground)",
        }}>
          <Icon name="Network" size={13} />
          {open ? "Hide steps" : "Break it down"}
        </button>
      </div>

      {open && (
        <div style={{ padding: "2px 14px 14px 46px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 12, color: "var(--ac)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, margin: "2px 0 8px" }}>
            <Icon name="Sparkles" size={13} /> Broken into micro-actions
          </div>
          {task.sub.map((s, i) => (
            <label key={i} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "8px 10px", borderRadius: 9, cursor: "pointer",
              animation: "fadeUp .25s both", animationDelay: `${i * .05}s`,
            }}>
              <D2.Checkbox checked={subDone[i]} onCheckedChange={() => toggleSub(i)} />
              <span style={{
                fontSize: 13.5, color: subDone[i] ? "var(--muted-foreground)" : "var(--foreground)",
                textDecoration: subDone[i] ? "line-through" : "none",
              }}>{s}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- upload zone ---- */
function UploadZone({ docs, setDocs }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const add = (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setDocs((d) => [...list.map((f) => ({ name: f.name, kind: "Proof of action", at: "Just now" })), ...d]);
  };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
      style={{
        border: "1.5px dashed " + (drag ? "var(--ac)" : "var(--border)"), borderRadius: 14,
        background: drag ? "var(--ac-soft)" : "var(--card)", padding: "22px", textAlign: "center",
        transition: "all .15s ease",
      }}>
      <input ref={inputRef} type="file" multiple style={{ display: "none" }} onChange={(e) => add(e.target.files)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center", background: "var(--secondary)", flex: "none" }}>
          <Icon name="UploadCloud" size={22} color="var(--muted-foreground)" />
        </div>
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Upload artifact / proof of action</div>
          <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Drag a file here, or browse — it validates real-world progress.</div>
        </div>
        <D2.Button variant="outline" size="sm" onClick={() => inputRef.current && inputRef.current.click()} style={{ flex: "none" }}>
          <Icon name="Paperclip" size={15} /> Browse
        </D2.Button>
      </div>
    </div>
  );
}

/* ---- upcoming card ---- */
function UpcomingCard() {
  const p = PHASES[1];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
      borderRadius: 14, background: "var(--neutral-900)", color: "var(--neutral-50)",
    }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, flex: "none", display: "grid", placeItems: "center", background: "rgba(255,255,255,.08)" }}>
        <Icon name="House" size={22} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--neutral-400)", marginBottom: 3 }}>Next up</div>
        <div style={{ fontSize: 16.5, fontWeight: 600 }}>{p.name}</div>
        <div style={{ fontSize: 13.5, color: "var(--neutral-400)" }}>Unlocks in 2 weeks — we'll surface it when Phase 1 is wrapped.</div>
      </div>
      <D2.Badge rounded style={{ background: "rgba(255,255,255,.12)", color: "#fff", flex: "none" }}>
        <Icon name="Lock" size={12} /> Locked
      </D2.Badge>
    </div>
  );
}

/* ---------------- ASK AI ---------------- */
function AskAI({ data, tasks }) {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ask = async () => {
    const text = q.trim(); if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setQ(""); setOpen(true); setBusy(true);
    let a = null;
    if (aiReady() && data) {
      const open = (tasks || []).filter((t) => !t.done).map((t) => "- " + t.label).join("\n");
      const prompt =
        "You are Waypoint, a calm relocation coach. The user is moving from " +
        (cityOnly(data.from) || "home") + " to " + (cityOnly(data.to) || "their destination") +
        ". Visa status: " + visaLabel(data.visa) + ". Timeline: " + whenLabel(data.when) +
        ". They are in Phase 1 (Visa & Legal). Open tasks this week:\n" + (open || "(none)") +
        "\n\nUser asks: \"" + text + "\"\nReply in 2-3 short sentences, concrete and reassuring. " +
        "Reduce overwhelm by naming the single most important next action. No markdown.";
      a = await aiComplete(prompt);
    }
    if (!a) a = answerFor(text);
    setMsgs((m) => [...m, { role: "ai", text: a }]);
    setBusy(false);
  };
  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sidebar-border)" }}>
      {open && msgs.length > 0 && (
        <div style={{
          maxHeight: 220, overflow: "auto", marginBottom: 10, display: "flex", flexDirection: "column", gap: 8,
          padding: 10, borderRadius: 12, background: "var(--background)", border: "1px solid var(--border)",
        }}>
          {msgs.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "92%",
              fontSize: 12.5, lineHeight: 1.45, padding: "8px 11px", borderRadius: 11,
              background: m.role === "user" ? "var(--primary)" : "var(--ac-soft)",
              color: m.role === "user" ? "var(--primary-foreground)" : "var(--foreground)",
              border: m.role === "ai" ? "1px solid var(--ac-border)" : "none",
            }}>{m.text}</div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--sidebar-muted)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <Icon name="Sparkles" size={12} color="var(--ac)" /> Ask Waypoint
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, padding: "5px 5px 5px 11px",
        borderRadius: 11, background: "var(--background)", border: "1px solid var(--border)",
      }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={busy ? "Thinking…" : "What is my next priority?"} disabled={busy} style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--foreground)", minWidth: 0,
          }} />
        <D2.IconButton variant="primary" size="sm" onClick={ask} aria-label="Ask" disabled={busy}>
          <Icon name={busy ? "Loader" : "ArrowUp"} size={15} style={busy ? { animation: "ds-spin .7s linear infinite" } : undefined} />
        </D2.IconButton>
      </div>
    </div>
  );
}
function answerFor(q) {
  const s = q.toLowerCase();
  if (s.includes("priorit") || s.includes("next") || s.includes("focus"))
    return "Your #1 priority: book the Spanish Consulate appointment. National-visa slots fill 4–6 weeks out, so locking a date now unblocks everything else.";
  if (s.includes("bank") || s.includes("financ") || s.includes("money"))
    return "For Phase 2 you'll need 6 months of stamped statements — you're already gathering those in step 1, so you're ahead. Banks here usually want an NIE first.";
  if (s.includes("hous") || s.includes("rent") || s.includes("apart"))
    return "Housing is Phase 3 and unlocks in ~2 weeks. Don't start now — securing the visa first protects your deposit if dates shift.";
  if (s.includes("visa") || s.includes("document") || s.includes("consul"))
    return "You're on track. Finish translating your birth certificate, then you'll have a complete consulate file. Want me to break that step down?";
  return "Right now, keep your energy on Phase 1. The single highest-leverage move this week is booking the consulate appointment — everything downstream depends on that date.";
}

/* ---------------- DOCUMENT VAULT ---------------- */
function VaultView({ docs, setDocs, onGoRoadmap }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 32px 72px" }}>
      <h1 className="editorial" style={{ fontSize: 36, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 6px" }}>Document <span className="it">Vault</span></h1>
      <p style={{ fontSize: 15.5, color: "var(--muted-foreground)", margin: "0 0 24px" }}>
        Every artifact you upload as proof of action lives here — encrypted and move-ready.
      </p>

      <UploadZone docs={docs} setDocs={setDocs} />

      <div style={{ marginTop: 24 }}>
        {docs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted-foreground)" }}>
            <Icon name="FolderOpen" size={34} color="var(--neutral-300)" />
            <div style={{ marginTop: 10, fontSize: 14 }}>No documents yet.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {docs.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                border: "1px solid var(--border)", borderRadius: 13, background: "var(--card)",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, flex: "none", display: "grid", placeItems: "center", background: "var(--secondary)" }}>
                  <Icon name="FileText" size={19} color="var(--muted-foreground)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{d.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>{d.kind} · {d.at}</div>
                </div>
                <D2.Badge variant="success" rounded><Icon name="Check" size={12} /> Stored</D2.Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- TIMELINE ---------------- */
function TimelineView({ tasks }) {
  const doneCount = tasks.filter((t) => t.done).length;
  const p1pct = Math.round((doneCount / tasks.length) * 100);
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
              <div style={{
                width: 38, height: 38, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", zIndex: 1,
                background: r.status === "active" ? "var(--ac)" : r.status === "done" ? "var(--positive)" : "var(--background)",
                color: r.status === "upcoming" ? "var(--muted-foreground)" : "#fff",
                border: "2px solid " + (r.status === "upcoming" ? "var(--border)" : "transparent"),
              }}>
                <Icon name={r.status === "done" ? "Check" : r.icon} size={18} />
              </div>
              <D2.Card style={{ flex: 1, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase {r.n} · {r.weeks}</span>
                      {r.status === "active" && <D2.Badge style={{ background: "var(--ac)", color: "#fff" }} rounded>In progress</D2.Badge>}
                      {r.status === "upcoming" && <D2.Badge variant="outline" rounded>Upcoming</D2.Badge>}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.3px" }}>{r.name}</div>
                    <div style={{ fontSize: 13.5, color: "var(--muted-foreground)", marginTop: 3, maxWidth: 460 }}>{r.blurb}</div>
                  </div>
                </div>
                {r.status === "active" && (
                  <div style={{ marginTop: 14 }}>
                    <D2.Progress value={r.pct} />
                    <div style={{ fontSize: 12.5, color: "var(--muted-foreground)", marginTop: 7 }}>{r.pct}% complete</div>
                  </div>
                )}
              </D2.Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
