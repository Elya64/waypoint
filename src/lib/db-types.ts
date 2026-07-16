import type { PlanInput, Task, SubTask, WaypointDoc } from "@/lib/waypoint";

/* ---- database row shapes ---- */
export interface PlanRow {
  id: string;
  user_id: string;
  email: string | null;
  from_loc: string | null;
  to_loc: string | null;
  visa: string | null;
  when_timing: string | null;
  active: boolean;
  created_at: string;
}

export interface TaskRow {
  id: string;
  plan_id: string;
  ext_id: string | null;
  label: string;
  done: boolean;
  sub: SubTask[] | null;
  sort: number;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  user_id: string;
  plan_id: string | null;
  name: string;
  kind: string | null;
  storage_path: string | null;
  created_at: string;
}

export interface SubscriptionRow {
  user_id: string;
  status: string | null;
  ls_subscription_id: string | null;
  renews_at: string | null;
  ends_at: string | null;
}

/* ---- row → domain mappers ---- */
export function planRowToInput(p: PlanRow): PlanInput {
  return {
    email: p.email ?? "",
    from: p.from_loc ?? "",
    to: p.to_loc ?? "",
    visa: (p.visa ?? "") as PlanInput["visa"],
    when: (p.when_timing ?? "") as PlanInput["when"],
  };
}

export function taskRowToTask(t: TaskRow): Task {
  return {
    id: t.id,
    label: t.label,
    done: t.done,
    sub: Array.isArray(t.sub) ? t.sub : [],
  };
}

export function docRowToDoc(d: DocumentRow): WaypointDoc {
  return {
    id: d.id,
    name: d.name,
    kind: d.kind ?? "Document",
    at: relativeTime(d.created_at),
    path: d.storage_path ?? undefined,
  };
}

/** A subscription is "active" if it grants access (paid or trialing). */
export function subActive(s: SubscriptionRow | null): boolean {
  return !!s && (s.status === "active" || s.status === "on_trial");
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const secs = Math.max(0, (Date.now() - then) / 1000);
  if (secs < 60) return "Just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}
