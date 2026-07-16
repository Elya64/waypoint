/* ───────────────────────────────────────────────────────────────
   Shared Waypoint domain: types, phase data, default tasks, labels.
   Used across screens, API routes, and the database mappers.
   ─────────────────────────────────────────────────────────────── */

export type VisaStatus = "need" | "approved" | "eu" | "";
export type MoveTiming = "asap" | "1-3" | "3-6" | "6+" | "";

export interface PlanInput {
  email: string;
  from: string;
  to: string;
  visa: VisaStatus;
  when: MoveTiming;
}

export interface SubTask {
  label: string;
  done: boolean;
}

export interface Task {
  id: string;
  label: string;
  done: boolean;
  sub: SubTask[];
}

export interface WaypointDoc {
  id: string;
  name: string;
  kind: string;
  at: string;
  path?: string; // Supabase storage path
}

export const BLANK_INPUT: PlanInput = { email: "", from: "", to: "", visa: "", when: "" };

export interface Phase {
  id: string;
  n: number;
  name: string;
  icon: string;
  tone: string;
  blurb: string;
  weeks: string;
  tasks: number;
}

export const PHASES: Phase[] = [
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

/** Fallback "this week's focus" tasks when the AI is unavailable. */
export const DEFAULT_TASKS: Task[] = [
  {
    id: "t1", label: "Request bank statements for the last 6 months", done: false,
    sub: [
      { label: "Log into your online banking portal", done: false },
      { label: "Export statements as stamped PDFs", done: false },
      { label: "Forward them to your translator for certification", done: false },
    ],
  },
  {
    id: "t2", label: "Book appointment at the destination consulate", done: false,
    sub: [
      { label: "Create an account on the consulate booking site", done: false },
      { label: "Pick the earliest national-visa slot", done: false },
      { label: "Add the date to your calendar with a reminder", done: false },
    ],
  },
  {
    id: "t3", label: "Translate birth certificate (sworn translation)", done: false,
    sub: [
      { label: "Find a sworn (jurado) translator", done: false },
      { label: "Send a clear scan of the original", done: false },
      { label: "Confirm the apostille is included", done: false },
    ],
  },
];

/* ---- label helpers ---- */
export function cityOnly(s: string): string {
  return (s || "").split(",")[0].trim();
}
export function visaLabel(v: VisaStatus): string {
  return ({ need: "Visa needed", approved: "Visa approved", eu: "EU citizen" } as const)[v as "need"] ?? "Visa: TBD";
}
export function whenLabel(v: MoveTiming): string {
  return (
    { asap: "Moving ASAP", "1-3": "In 1–3 months", "3-6": "In 3–6 months", "6+": "6+ months out" } as const
  )[v as "asap"] ?? "Timing flexible";
}
