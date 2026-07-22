import { Icon, type IconName } from "@/components/icon";

/** Scene 7 — the spec's "research cards" (blur-photo + SVG node ring +
 *  mono code texture) recast around Waypoint's own three-track phase
 *  system already used elsewhere in the app (visa/housing/finance). */

const PSEUDO = `{ "phase": "visa",     "status": "tracked" }
{ "phase": "housing",  "status": "tracked" }
{ "phase": "finance",  "status": "tracked" }
{ "phase": "docs",     "status": "reminders: on" }
{ "phase": "move-in",  "status": "tracked" }
`;

const PHASES: {
  code: string; title: string; icon: IconName; tone: string; desc: string; nodes: readonly string[];
}[] = [
  {
    code: "V&L", title: "Visa & Legal", icon: "Stamp", tone: "var(--brand-600)",
    desc: "Every form, appointment, and deadline for your visa — tracked and reminded, in order.",
    nodes: ["VISA", "PERMITS", "DOCS", "APPTS"],
  },
  {
    code: "HOU", title: "Housing", icon: "House", tone: "var(--positive)",
    desc: "From short-let to lease — a checklist that matches how renting actually works there.",
    nodes: ["SEARCH", "LEASE", "DEPOSIT", "MOVE-IN"],
  },
  {
    code: "FIN", title: "Finances", icon: "Landmark", tone: "var(--warning)",
    desc: "Bank accounts, tax residency, and transfers — sequenced so nothing gets stuck.",
    nodes: ["BANKING", "TAX ID", "TRANSFERS", "BUDGET"],
  },
];

function RingDiagram({ icon, tone, nodes }: { icon: IconName; tone: string; nodes: readonly string[] }) {
  return (
    <div className="wp-ring">
      <div className="wp-ring-circle" style={{ borderColor: tone }} />
      <div className="wp-ring-center" style={{ color: tone }}>
        <Icon name={icon} size={28} strokeWidth={1.6} />
      </div>
      {nodes.map((n, i) => {
        const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
        const x = 50 + 42 * Math.cos(angle);
        const y = 50 + 42 * Math.sin(angle);
        return (
          <div key={n} className="wp-ring-node" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="wp-ring-dot" style={{ background: tone }} />
            <span className="wp-ring-label">{n}</span>
          </div>
        );
      })}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="wp-works" id="works">
      <pre className="wp-works-texture" aria-hidden>{PSEUDO.repeat(6)}</pre>
      <div className="wp-works-inner">
        <div className="wp-works-head">
          <div className="wp-capture-kicker">how it works</div>
          <h2 className="wp-works-headline editorial">
            Every relocation, decomposed into three tracks
          </h2>
        </div>

        <div className="wp-works-grid">
          {PHASES.map((p) => (
            <article className="wp-work-card" key={p.code}>
              <div className="wp-work-visual">
                <div className="wp-work-blur" style={{ background: p.tone }} />
                <RingDiagram icon={p.icon} tone={p.tone} nodes={p.nodes} />
              </div>
              <div className="wp-work-body">
                <div className="wp-work-code" style={{ color: p.tone }}>{p.code}</div>
                <h3 className="wp-work-title">{p.title}</h3>
                <p className="wp-work-desc">{p.desc}</p>
                <a href="/demo" className="link-mono wp-work-link">LEARN MORE</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
