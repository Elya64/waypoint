/* ───────────────────────────────────────────────────────────────
   screens.jsx — Hero, Onboarding wizard, Generating, Roadmap preview
   ─────────────────────────────────────────────────────────────── */

const DS = window.ObraShadcnUiDesignSystem_acd6ac;
const { Button, Input, Card, CardContent, Badge, Progress, RadioGroup, Separator } = DS;

/* ========================= HERO ========================= */
function Hero({ onStart }) {
  const [email, setEmail] = useState("");
  const go = () => onStart(email);
  return (
    <div className="surface screen" data-screen-label="Hero">
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Brand />
          <span style={{ width: 1, height: 22, background: "var(--border)" }} />
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a href="#" className="nav-link">How it works</a>
            <a href="#" className="nav-link">Who it's for</a>
            <a href="#" className="nav-link">Pricing</a>
          </div>
        </div>
        <Button variant="outline" size="sm" style={{ borderRadius: 999, padding: "0 18px" }}>Sign in</Button>
      </nav>

      <div className="hero-grid" style={{
        maxWidth: 1240, margin: "0 auto", padding: "60px 40px 88px",
        display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        gap: 72, alignItems: "center",
      }}>
        {/* left: copy */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 15px 7px 12px",
            borderRadius: 999, background: "var(--secondary)", border: "1px solid var(--border)",
            color: "var(--foreground)", fontSize: 13.5, fontWeight: 500, marginBottom: 30,
          }}>
            <Icon name="Sparkles" size={14} color="var(--ac)" /> The overwhelming move, decomposed
          </div>

          <h1 className="editorial" style={{
            fontSize: 62, lineHeight: "1.05", letterSpacing: "-1px",
            margin: "0 0 26px", maxWidth: 600, textWrap: "balance",
          }}>
            Your move <span className="it">abroad</span>, one clear <span className="it">step</span> at a time.
          </h1>

          <p style={{
            fontSize: 18, lineHeight: "1.6", color: "var(--muted-foreground)",
            margin: "0 0 40px", maxWidth: 460,
          }}>
            We break the overwhelming process of moving into a personalized,
            bite-sized roadmap — so you always know the one next step.
          </p>

          {/* email capture — pill field + dark pill button */}
          <div style={{ display: "flex", gap: 12, maxWidth: 480, marginBottom: 26, flexWrap: "wrap" }}>
            <input
              type="email" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              style={{
                flex: "1 1 220px", height: 54, padding: "0 22px", fontSize: 15.5,
                fontFamily: "var(--font-sans)", color: "var(--foreground)",
                borderRadius: 999, border: "1px solid var(--border)", background: "var(--secondary)",
                outline: "none",
              }}
            />
            <button onClick={go} style={{
              flex: "none", height: 54, padding: "0 26px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)",
              fontSize: 15.5, fontWeight: 600, borderRadius: 999, border: "none",
              background: "var(--primary)", color: "var(--primary-foreground)",
            }}>
              Build My Plan <Icon name="ArrowRight" size={17} />
            </button>
          </div>

          {/* avatar social proof */}
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
          <image-slot
            id="hero-photo" shape="rounded" radius="22"
            placeholder="Drop a hero photo (someone arriving / a new city)"
            style={{ display: "block", width: "100%", height: 500, boxShadow: "var(--shadow-lg)" }}
          ></image-slot>

          {/* floating "next step" card */}
          <div style={{
            position: "absolute", left: -26, bottom: 64, width: 268,
            background: "var(--card)", borderRadius: 18, padding: "16px 18px",
            boxShadow: "0 18px 48px -12px rgba(0,0,0,.28)", border: "1px solid var(--border)",
            animation: "popIn .5s .25s both",
          }}>
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
            <button style={{
              width: "100%", height: 38, cursor: "pointer", border: "none", borderRadius: 10,
              background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-sans)",
              fontSize: 13.5, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}>
              Mark done <Icon name="Check" size={15} />
            </button>
          </div>

          {/* carousel dots */}
          <div className="dots" style={{ marginTop: 22 }}>
            <span className="on"></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= ONBOARDING WIZARD ========================= */
const VISA_OPTS = [
  { value: "need", label: "I need a visa", desc: "Help me figure out which one and how to apply.", icon: "FileSearch" },
  { value: "approved", label: "Already approved", desc: "My visa or permit is sorted.", icon: "BadgeCheck" },
  { value: "eu", label: "EU / no visa needed", desc: "I can move freely.", icon: "Globe" },
];
const WHEN_OPTS = [
  { value: "asap", label: "As soon as possible", icon: "Zap" },
  { value: "1-3", label: "In 1–3 months", icon: "CalendarClock" },
  { value: "3-6", label: "In 3–6 months", icon: "Calendar" },
  { value: "6+", label: "6+ months out", icon: "CalendarRange" },
];

function Onboarding({ data, setData, onDone, onBack }) {
  const [step, setStep] = useState(0);
  const steps = [
    { q: "Where are you moving from?", sub: "Your current home base.", key: "from" },
    { q: "Where is your destination?", sub: "Where you're headed next.", key: "to" },
    { q: "What is your visa status?", sub: "This shapes your very first steps.", key: "visa" },
    { q: "When are you planning to move?", sub: "A rough timeframe is perfectly fine.", key: "when" },
  ];
  const cur = steps[step];
  const total = steps.length;
  const pct = Math.round(((step) / total) * 100);

  const value = data[cur.key] || "";
  const set = (v) => setData((d) => ({ ...d, [cur.key]: v }));

  const canNext = cur.key === "from" || cur.key === "to" ? value.trim().length > 1 : !!value;
  const next = () => { if (!canNext) return; step === total - 1 ? onDone() : setStep((s) => s + 1); };
  const back = () => (step === 0 ? onBack() : setStep((s) => s - 1));

  return (
    <div className="surface" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav className="nav"><Brand /><Badge variant="secondary" rounded>Step {step + 1} of {total}</Badge></nav>

      {/* progress */}
      <div style={{ maxWidth: 620, width: "100%", margin: "0 auto", padding: "0 24px", marginTop: 40 }}>
        <Progress value={pct} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          {steps.map((s, i) => (
            <span key={s.key} style={{
              fontSize: 12, fontWeight: 600,
              color: i <= step ? "var(--foreground)" : "var(--muted-foreground)",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              {i < step && <Icon name="Check" size={13} color="var(--positive)" />}
              {["Origin", "Destination", "Visa", "Timing"][i]}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "32px 24px 64px" }}>
        <div key={step} className="screen" style={{ width: "100%", maxWidth: 560 }}>
          <h2 className="editorial" style={{ fontSize: 38, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 8px", textWrap: "balance" }}>{cur.q}</h2>
          <p style={{ fontSize: 16.5, color: "var(--muted-foreground)", margin: "0 0 28px" }}>{cur.sub}</p>

          {/* text steps */}
          {(cur.key === "from" || cur.key === "to") && (
            <div>
              <Input size="lg" autoFocus value={value} onChange={(e) => set(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder={cur.key === "from" ? "e.g. Moscow, Russia" : "e.g. Barcelona, Spain"}
                style={{ fontSize: 17, height: 52 }} />
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

          {/* visa step — choice cards */}
          {cur.key === "visa" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {VISA_OPTS.map((o) => (
                <ChoiceCard key={o.value} active={value === o.value} onClick={() => set(o.value)}
                  icon={o.icon} title={o.label} desc={o.desc} />
              ))}
            </div>
          )}

          {/* when step — grid */}
          {cur.key === "when" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {WHEN_OPTS.map((o) => (
                <ChoiceCard key={o.value} active={value === o.value} onClick={() => set(o.value)}
                  icon={o.icon} title={o.label} compact />
              ))}
            </div>
          )}

          {/* nav */}
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

function chipStyle(active) {
  return {
    display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px",
    borderRadius: 999, fontSize: 13.5, fontWeight: 500, cursor: "pointer",
    fontFamily: "var(--font-sans)",
    border: "1px solid " + (active ? "var(--primary)" : "var(--border)"),
    background: active ? "var(--primary)" : "var(--background)",
    color: active ? "var(--primary-foreground)" : "var(--foreground)",
    transition: "all .15s ease",
  };
}

function ChoiceCard({ active, onClick, icon, title, desc, compact }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
      padding: compact ? "16px 16px" : "16px 18px", cursor: "pointer", fontFamily: "var(--font-sans)",
      borderRadius: 14, transition: "all .15s ease",
      border: "1px solid " + (active ? "var(--ac)" : "var(--border)"),
      background: active ? "var(--ac-soft)" : "var(--background)",
      boxShadow: active ? "0 0 0 3px color-mix(in srgb, var(--ac) 14%, transparent)" : "none",
    }}>
      <IconTile icon={icon} tone={active ? "var(--ac)" : "var(--neutral-500)"} size={compact ? 38 : 42} r={11} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15.5 }}>{title}</div>
        {desc && <div style={{ fontSize: 13.5, color: "var(--muted-foreground)", marginTop: 2 }}>{desc}</div>}
      </div>
      <Icon name={active ? "CheckCircle2" : "Circle"} size={20}
        color={active ? "var(--ac)" : "var(--neutral-300)"} />
    </button>
  );
}

/* ========================= GENERATING (AI processing) ========================= */
function Generating({ data, onTasks, onDone }) {
  const lines = [
    "Reading visa requirements for " + (cityOnly(data.to) || "your destination") + "…",
    "Mapping the financial setup for new residents…",
    "Sequencing housing & logistics around your timeline…",
    "Decomposing everything into bite-sized weekly steps…",
  ];
  const [done, setDone] = useState(0);
  useEffect(() => {
    // real AI: personalize the active-phase weekly tasks to this move
    (async () => {
      const prompt =
        "You are an expert relocation advisor. A person is moving from " +
        (cityOnly(data.from) || "their home") + " to " + (cityOnly(data.to) || "their destination") +
        ". Visa status: " + visaLabel(data.visa) + ". Timeline: " + whenLabel(data.when) +
        ". Generate the 3 most important concrete tasks for THIS WEEK in the Visa & Legal phase, " +
        "specific to the destination country. For each task give exactly 3 small micro-actions. " +
        'Return ONLY JSON: [{"label":"...","sub":["...","...","..."]}]. ' +
        "Labels under 9 words, action-oriented. No prose, JSON only.";
      const arr = await aiJSON(prompt);
      if (Array.isArray(arr) && arr.length) {
        const tasks = arr.slice(0, 4).map((t, i) => ({
          id: "t" + (i + 1), label: String(t.label || "").slice(0, 90), done: false,
          sub: (Array.isArray(t.sub) ? t.sub : []).slice(0, 4).map((s) => String(s).slice(0, 120)),
        })).filter((t) => t.label);
        if (tasks.length) onTasks(tasks);
      }
    })();
    const timers = lines.map((_, i) => setTimeout(() => setDone(i + 1), 650 + i * 650));
    const fin = setTimeout(onDone, 650 + lines.length * 650 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(fin); };
  }, []);
  return (
    <div className="surface screen" style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <div style={{
          width: 76, height: 76, margin: "0 auto 26px", borderRadius: 22, display: "grid", placeItems: "center",
          background: "var(--ac-soft)", border: "1px solid var(--ac-border)", animation: "drift 2.4s ease-in-out infinite",
        }}>
          <Icon name="Sparkles" size={34} color="var(--ac)" />
        </div>
        <h2 className="editorial" style={{ fontSize: 30, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 8px" }}>Building your <span className="it">roadmap</span></h2>
        <p style={{ color: "var(--muted-foreground)", margin: "0 0 28px", fontSize: 15.5 }}>
          Analyzing your move from <b style={{ color: "var(--foreground)" }}>{cityOnly(data.from) || "home"}</b> to <b style={{ color: "var(--foreground)" }}>{cityOnly(data.to) || "your destination"}</b>.
        </p>
        <Card style={{ padding: 10, textAlign: "left" }}>
          {lines.map((ln, i) => {
            const state = i < done ? "done" : i === done ? "active" : "wait";
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 12px",
                opacity: state === "wait" ? .4 : 1, transition: "opacity .3s ease",
              }}>
                <span style={{ width: 20, height: 20, flex: "none", display: "grid", placeItems: "center" }}>
                  {state === "done" && <Icon name="CheckCircle2" size={19} color="var(--positive)" />}
                  {state === "active" && <span className="ds-btn-spinner" style={{ color: "var(--ac)", width: 16, height: 16 }} />}
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

/* ========================= ROADMAP PREVIEW ========================= */
function RoadmapPreview({ data, onOpen }) {
  const summary = [
    { icon: "Plane", label: cityOnly(data.from) + " → " + cityOnly(data.to) },
    { icon: "Stamp", label: visaLabel(data.visa) },
    { icon: "CalendarClock", label: whenLabel(data.when) },
  ];
  return (
    <div className="surface screen" style={{ minHeight: "100vh" }}>
      <nav className="nav"><Brand /><Badge variant="secondary" rounded>Roadmap ready</Badge></nav>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", marginBottom: 18,
            borderRadius: 999, background: "var(--ac-soft)", border: "1px solid var(--ac-border)", color: "var(--ac)", fontSize: 13, fontWeight: 600,
          }}>
            <Icon name="Sparkles" size={14} /> Personalized to your situation
          </div>
          <h2 className="editorial" style={{ fontSize: 44, letterSpacing: "-.5px", fontWeight: 500, margin: "0 0 10px", textWrap: "balance" }}>
            Here's your move, in <span className="it">three calm phases</span>.
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: 17, margin: 0 }}>
            We analyzed your context and sequenced 18 concrete steps — you'll only ever see the next one.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            {summary.map((s) => (
              <span key={s.label} style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px",
                borderRadius: 999, background: "var(--background)", border: "1px solid var(--border)",
                fontSize: 13.5, fontWeight: 500,
              }}>
                <Icon name={s.icon} size={15} color="var(--muted-foreground)" /> {s.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PHASES.map((p, i) => (
            <Card key={p.id} style={{
              padding: 22, animation: "fadeUp .5s both", animationDelay: `${i * .12}s`,
              borderColor: i === 0 ? "var(--ac-border)" : "var(--border)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <IconTile icon={p.icon} tone={p.tone} size={54} r={15} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Phase {p.n}</span>
                    {i === 0 && <Badge style={{ background: "var(--ac)", color: "#fff" }} rounded>Start here</Badge>}
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
          <Button size="lg" onClick={onOpen} style={{ height: 48, padding: "0 28px", fontSize: 16 }}>
            Open My Dashboard <Icon name="ArrowRight" size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---- label helpers ---- */
function cityOnly(s) { return (s || "").split(",")[0].trim(); }
function visaLabel(v) { return ({ need: "Visa needed", approved: "Visa approved", eu: "EU citizen" })[v] || "Visa: TBD"; }
function whenLabel(v) { return ({ asap: "Moving ASAP", "1-3": "In 1–3 months", "3-6": "In 3–6 months", "6+": "6+ months out" })[v] || "Timing flexible"; }

Object.assign(window, { Hero, Onboarding, Generating, RoadmapPreview, cityOnly, visaLabel, whenLabel });
