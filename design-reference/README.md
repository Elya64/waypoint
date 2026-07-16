# Handoff: Waypoint — Relocation Roadmap App

## Overview
Waypoint helps people moving abroad by decomposing the overwhelming relocation process into a personalized, bite-sized roadmap. The product is a single-page flow: a marketing **Hero** → a 4-step **Onboarding** wizard → an AI **Generating** state → a **Roadmap Preview** → a full **Dashboard** (roadmap checklist, document vault, timeline) with an "Ask Waypoint" AI assistant.

## About the Design Files
The files in this bundle are **design references created in HTML/React (via in-browser Babel)** — prototypes that demonstrate the intended look, copy, and behavior. They are **not** production code to ship as-is. Your task is to **recreate these designs in the target codebase's environment** using its established patterns (component library, routing, state, data fetching). If no environment exists yet, pick the most appropriate stack (the prototype is React-friendly) and implement there.

The prototype is built on the **Obra shadcn/ui design system** (a shadcn/ui variant). If your codebase already uses shadcn/ui, map the components directly (`Button`, `Card`, `Input`, `Badge`, `Progress`, `Checkbox`, `Tabs`, etc.). The exact design tokens used are bundled under `_ds/` and listed below.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all specified. Recreate pixel-perfectly using your codebase's libraries. The only non-final asset is the hero photo (a user-fillable image slot — supply a real photo).

## Design Tokens

All tokens live in `_ds/obra-shadcn-ui-design-system-*/tokens/*.css` and are referenced via CSS variables. Key values:

**Typography**
- Body / UI sans: **Geist** (`--font-sans`), weights 300–700. Mono: **Geist Mono**.
- Display serif (headlines only): **Newsreader** (Google Fonts), optical sizing on, weights 400/500/600, with italics. Used via the `.editorial` class; accent words wrapped in `<span class="it">` render italic.
- Type scale: h1 48/48/-1.5px · h2 30/30/-1px · h3 24/28.8/-1px · body 16/24 · sm 14/20 · xs 12/16.

**Colors** (resolve the CSS vars in `tokens/colors.css` for exact hex; semantic names used throughout):
- `--background`, `--foreground`, `--card`, `--border`, `--secondary`, `--muted-foreground`
- Accent ("trust blue"): `--ac` = `--brand-600`; soft `--ac-soft` = `--brand-50`; `--ac-border` = `--brand-200`
- `--primary` / `--primary-foreground` (near-black button), `--positive` (green), `--warning` (amber)
- Sidebar set: `--sidebar`, `--sidebar-border`, `--sidebar-accent`, `--sidebar-foreground`, `--sidebar-muted`
- Neutral ramp `--neutral-50 … --neutral-900`

**Radius**: `--radius-md`, `--radius-lg`, `--radius-full` (pill). **Project convention: all CTAs are pill-shaped** (`.ds-btn:not(.ds-btn--link){border-radius:var(--radius-full)}`). Cards/tiles use 9–22px radii.

**Shadows**: `--shadow-lg` for elevated cards; floating cards use `0 18px 48px -12px rgba(0,0,0,.28)`.

**Icons**: Lucide. Map names directly (Compass, Sparkles, ArrowRight, Stamp, Landmark, House, Check, CircleDot, Circle, MapPin, Plane, CalendarClock, ShieldCheck, Clock, UploadCloud, FolderLock, Map, GanttChartSquare, RotateCcw, Network, Paperclip, Lock, ArrowUp, Loader).

## Screens / Views

### 1. Hero (`screens.jsx` → `Hero`)
- **Purpose**: Marketing landing + email capture to start the flow.
- **Layout**: Sticky top nav (64px, blurred white, bottom border). Below: centered max-width 1240px, 2-column grid (`1fr 1fr`, 72px gap), vertically centered, padding `60px 40px 88px`. Collapses to 1 column under 860px.
- **Nav**: Left = brand mark (28px rounded-8 near-black tile w/ Compass icon) + "Waypoint" + 1px divider + links ("How it works", "Who it's for", "Pricing", muted, hover→foreground). Right = outline **pill** "Sign in" (sm).
- **Left column**:
  - Pill badge: `--secondary` bg, `--border`, Sparkles icon (accent), text "The overwhelming move, decomposed", 13.5px/500.
  - Headline `.editorial`, 62px/1.05/-1px/weight 500: "Your move *abroad*, one clear *step* at a time." — "abroad" and "step" italic via `.it`.
  - Sub-paragraph: 18px/1.6, `--muted-foreground`, max-width 460.
  - Email form: pill `<input>` (54px tall, `--secondary` bg, `--border`, radius full, 22px padding) + near-black pill button "Build My Plan" + ArrowRight.
  - Avatar social proof: overlapping 30px circle stack (3 initials in brand/positive/warning tints + a near-black "+2k"), then "**2,000+ movers** already building their plan".
- **Right column**: User-fillable `<image-slot>` (rounded, radius 22, **width 100% × height 500px**, `--shadow-lg`). Overlapping floating card bottom-left (`left:-26, bottom:64`, 268px, white, radius 18, big soft shadow): uppercase caption "Your next step", Stamp icon tile + "Book consulate appointment" / "Phase 1 · Visa & Legal", full-width near-black "Mark done" button. Below image: 5 carousel dots (first active: 22px wide pill, `--neutral-500`; rest 6px `--neutral-300`).
- **Behavior**: typing email + Enter or button click → `onStart(email)` → Onboarding.

### 2. Onboarding (`screens.jsx` → `Onboarding`)
- **Purpose**: Collect 4 inputs to personalize the roadmap.
- **Steps**: (1) "Where are you moving from?" text input + city chips; (2) "Where is your destination?" text + chips; (3) "What is your visa status?" — 3 stacked choice cards (I need a visa / Already approved / EU – no visa); (4) "When are you planning to move?" — 2×2 grid of compact choice cards (ASAP / 1–3mo / 3–6mo / 6+mo).
- **Layout**: nav with brand + "Step N of 4" badge. Progress bar (max-width 620) with 4 labeled segments (Origin/Destination/Visa/Timing), completed ones get a green Check. Centered question block max-width 560.
- **Headline**: `.editorial` 38px/weight 500.
- **Choice cards**: full-width button, icon tile + title (+ desc), trailing Circle→CheckCircle2 when active; active state = `--ac` border, `--ac-soft` bg, 3px accent ring.
- **Nav**: ghost "Back" (← ArrowLeft) + primary pill "Continue"/"Generate my roadmap". Next disabled until valid (text length > 1, or option selected).

### 3. Generating (`screens.jsx` → `Generating`)
- **Purpose**: AI processing / anticipation state.
- **Layout**: centered, max-width 480. 76px rounded-22 accent-soft tile w/ Sparkles, gentle float animation. Headline `.editorial` "Building your *roadmap*". Sub names the from→to cities. A card lists 4 status lines that resolve sequentially (~650ms each): each shows spinner→green CheckCircle2, waiting lines at 0.4 opacity.
- **Behavior**: Fires a real AI call (see State/AI below) to personalize Phase-1 weekly tasks; auto-advances to Preview after the lines finish (~3.1s).

### 4. Roadmap Preview (`screens.jsx` → `RoadmapPreview`)
- **Purpose**: Show the 3-phase plan before entering the dashboard.
- **Layout**: centered max-width 880. Accent pill "Personalized to your situation", headline `.editorial` 44px "Here's your move, in *three calm phases*.", sub, then a row of summary pills (from→to, visa label, timing). Three phase cards (icon tile + Phase n label + name + blurb + steps/weeks); Phase 1 highlighted with accent border + "Start here" badge. Cards fade-up staggered. Primary pill "Open My Dashboard".

### 5. Dashboard (`dashboard.jsx` → `Dashboard` + views)
- **Layout**: 2-col grid `264px 1fr`, full height, `--neutral-50` main bg.
- **Sidebar**: brand; profile snippet card (38px circle avatar "N", "Hello, Nikolay!", from→to with Plane icon); "Workspace" nav (Roadmap / Document Vault [count badge] / Timeline) with active = `--sidebar-accent`; **Ask Waypoint** AI box (chat history bubbles + pill input + primary IconButton send); footer "Start a new plan" (RotateCcw, resets state).
- **Roadmap view**: phase header (icon tile + "Phase 1 · Active" + `.editorial` 36px phase name) + "Week 2 of 12" badge; progress strip (% + "n of m this week" + Progress bar); active task card ("This week's focus", h3 "Visa Application", checklist of `TaskItem`s); upload dropzone; near-black "Next up" card (locked Phase 2).
  - **TaskItem**: bordered row, Checkbox + label (line-through when done), "Break it down" toggle revealing AI-style micro-action sub-checklist (each fades up). Done state tints border/bg positive.
- **Document Vault view**: `.editorial` 36px "Document *Vault*", upload dropzone, list of stored docs (file icon tile, name, kind·time, green "Stored" badge). Empty state with FolderOpen.
- **Timeline view**: `.editorial` 36px "Timeline", vertical timeline rail with 3 phase nodes (active=accent, done=positive+Check, upcoming=outline) and cards showing phase/weeks/blurb; active phase shows a Progress bar.

## Interactions & Behavior
- **Flow / routing**: single `screen` state in `app.jsx`: `hero → onboarding → generating → preview → dashboard`. No URL routing in the prototype — use your router (route per screen).
- **Animations**: `screenIn` (translateY 10→0, .42s) on screen change; `fadeUp` staggered on lists/cards; `popIn` (scale .96→1) on the hero floating card; `drift` loop on the generating tile; `pulseDot`. Respect `prefers-reduced-motion`.
- **Upload zone**: drag-over highlights (accent dashed border + soft bg); drop or browse adds docs to state. No real upload in prototype.
- **Validation**: onboarding Next disabled until the current field is valid.
- **Responsive**: hero grid + nav links collapse < 860px. Dashboard assumes desktop width; design a mobile treatment for the sidebar (e.g. drawer) when implementing.

## State Management
Lifted in `app.jsx`, persisted to `localStorage` (`waypoint.state.v1`):
- `screen` (current view), `data` `{ email, from, to, visa, when }`, `tasks[]` (`{id,label,done,sub[]}`), `docs[]` (`{name,kind,at}`).
- `start(email)` resets data + tasks → onboarding. `restart()` clears storage → hero.
- Replace localStorage with your persistence layer / backend as appropriate.

### AI integration (`shared.jsx`)
- `aiComplete(prompt)` tries, in order: (1) `POST /api/ai` `{prompt}` → `{text}` (a serverless proxy holding the Anthropic key); (2) in-preview `window.claude.complete`; (3) returns null → callers fall back to built-in canned content.
- Used in **Generating** (`aiJSON` → personalized Phase-1 tasks, expects strict JSON array `[{label, sub[]}]`) and **Ask Waypoint** (`AskAI`, 2–3 sentence reassuring reply). In production, implement `/api/ai` server-side; never ship an API key to the client.

## Assets
- **Fonts**: Geist + Geist Mono (in `_ds/tokens/fonts.css`), Newsreader (Google Fonts `<link>` in `index.html`).
- **Icons**: Lucide (`lucide` UMD in prototype). Use your icon lib with matching names.
- **Hero photo**: user-fillable `<image-slot>` (see `image-slot.js`) — replace with a real `<img>`/Image component fed by your CMS/upload. Suggested: a person arriving in a new city.
- **No raster brand assets** — the brand mark is a Lucide Compass in a rounded tile; recreate with your brand system if one exists.

## Files
- `index.html` — entry; loads React 18, Babel, Lucide, the design-system bundle + tokens, the Newsreader font, and global styles (`.surface`, `.nav`, `.editorial`, pill-button rule, avatar stack, carousel dots).
- `shared.jsx` — `Icon`, `Brand`, `IconTile`, `PHASES` data, default tasks, AI helpers, localStorage persistence.
- `screens.jsx` — `Hero`, `Onboarding`, `Generating`, `RoadmapPreview` + label helpers.
- `dashboard.jsx` — `Dashboard` shell, `RoadmapView`, `TaskItem`, `UploadZone`, `AskAI`, `VaultView`, `TimelineView`.
- `app.jsx` — screen router, lifted state, persistence.
- `image-slot.js` — user-fillable image placeholder web component (prototype only).
- `_ds/obra-shadcn-ui-design-system-*/` — design tokens (`tokens/*.css`), `styles.css`, and the compiled component bundle (`_ds_bundle.js`). Read the token CSS for exact values.
