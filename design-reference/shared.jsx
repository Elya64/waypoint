/* ───────────────────────────────────────────────────────────────
   shared.jsx — Icon helper, design data, small shared UI atoms.
   Loaded first; exports everything onto window.
   ─────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useCallback } = React;

/* ---- Lucide icon → React, robust across UMD shapes ---- */
function toCamel(k) { return k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
function Icon({ name, size = 20, sw = 2, color, style, className = "" }) {
  const L = window.lucide || {};
  let node = (L.icons && L.icons[name]) || L[name];
  if (!node) return null;
  // some builds wrap as ['svg', attrs, children]
  let kids = node;
  if (Array.isArray(node) && node[0] === "svg") kids = node[2] || [];
  const children = (kids || []).map((c, i) => {
    if (!Array.isArray(c)) return null;
    const [tag, attrs] = c;
    const props = { key: i };
    for (const k in attrs) props[toCamel(k)] = attrs[k];
    return React.createElement(tag, props);
  });
  return React.createElement("svg", {
    className: "lucide " + className, width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color || "currentColor", strokeWidth: sw,
    strokeLinecap: "round", strokeLinejoin: "round", style,
  }, children);
}

/* ---- brand mark ---- */
function Brand({ size = "md" }) {
  const px = size === "lg" ? 34 : 28;
  const fs = size === "lg" ? 19 : 16;
  return (
    <div className="brand" style={{ fontSize: fs }}>
      <span className="brand-mark" style={{ width: px, height: px, borderRadius: px * 0.29 }}>
        <Icon name="Compass" size={px * 0.62} sw={2.2} />
      </span>
      <span>Waypoint</span>
    </div>
  );
}

/* ---- The three roadmap phases (shared between preview + dashboard) ---- */
const PHASES = [
  {
    id: "visa", n: 1, name: "Visa & Legal", icon: "Stamp", tone: "var(--ac)",
    blurb: "Gathering documents, booking consulate appointments, applying for permits.",
    weeks: "Weeks 1–4", tasks: 6,
  },
  {
    id: "finance", n: 2, name: "Financial Setup", icon: "Landmark", tone: "var(--positive)",
    blurb: "Opening a local bank account, proof of income, taxes and transfers.",
    weeks: "Weeks 4–7", tasks: 5,
  },
  {
    id: "housing", n: 3, name: "Housing & Logistics", icon: "House", tone: "var(--warning)",
    blurb: "Finding long-term rent, signing the lease, packing and the move itself.",
    weeks: "Weeks 7–12", tasks: 7,
  },
];

/* ---- soft icon tile used across cards ---- */
function IconTile({ icon, tone = "var(--ac)", size = 44, r = 12 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: r, flex: "none",
      display: "grid", placeItems: "center",
      color: tone, background: "color-mix(in srgb, " + tone + " 11%, white)",
      border: "1px solid color-mix(in srgb, " + tone + " 22%, white)",
    }}>
      <Icon name={icon} size={size * 0.46} sw={2} />
    </div>
  );
}

/* ---- default "this week's focus" tasks (fallback when no AI) ---- */
const DEFAULT_TASKS = [
  { id: "t1", label: "Request bank statements for the last 6 months", done: false,
    sub: ["Log into your online banking portal", "Export statements as stamped PDFs", "Forward them to your translator for certification"] },
  { id: "t2", label: "Book appointment at the destination consulate", done: false,
    sub: ["Create an account on the consulate booking site", "Pick the earliest national-visa slot", "Add the date to your calendar with a reminder"] },
  { id: "t3", label: "Translate birth certificate (sworn translation)", done: false,
    sub: ["Find a sworn (jurado) translator", "Send a clear scan of the original", "Confirm the apostille is included"] },
];

/* ---- AI helper: deployed proxy → in-preview helper → graceful null ---- */
function aiReady() {
  return !!(window.claude && typeof window.claude.complete === "function") || window.__waypointApi === true;
}
async function aiComplete(prompt) {
  // 1. production serverless proxy (Vercel /api/ai with your ANTHROPIC_API_KEY)
  try {
    const r = await fetch("/api/ai", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (r.ok) {
      const j = await r.json();
      if (j && j.text) { window.__waypointApi = true; return String(j.text).trim(); }
    }
  } catch (e) {}
  // 2. in-preview helper (Claude artifact environment)
  try {
    if (window.claude && window.claude.complete) {
      const t = await window.claude.complete(prompt);
      return (t || "").trim();
    }
  } catch (e) {}
  // 3. no AI reachable → caller uses built-in fallback
  return null;
}
async function aiJSON(prompt) {
  const t = await aiComplete(prompt);
  if (!t) return null;
  try {
    const m = t.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    return JSON.parse(m ? m[0] : t);
  } catch (e) { return null; }
}

/* ---- localStorage persistence ---- */
const STORE_KEY = "waypoint.state.v1";
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch (e) { return null; }
}
function saveState(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {}
}
function clearState() {
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
}

Object.assign(window, {
  Icon, Brand, IconTile, PHASES, DEFAULT_TASKS,
  aiReady, aiComplete, aiJSON, loadState, saveState, clearState,
  useState, useEffect, useRef, useCallback,
});
