"use client";

import * as React from "react";
import { BLANK_INPUT, DEFAULT_TASKS, type PlanInput, type Task } from "@/lib/waypoint";

/**
 * Funnel state for the pre-auth flow (hero → onboarding → generating → preview).
 * Persisted to localStorage so it survives navigation and the sign-up redirect.
 * Once a user authenticates, the persisted plan is pushed to the database and
 * this local copy is cleared (see /app claim flow).
 */

const STORE_KEY = "waypoint.flow.v1";

interface FlowState {
  input: PlanInput;
  tasks: Task[];
}

interface PlanContextValue extends FlowState {
  /** False until localStorage has been read; `input`/`tasks` are defaults til then.
   *  Consumers that seed other state from the flow must wait for this. */
  hydrated: boolean;
  setInput: React.Dispatch<React.SetStateAction<PlanInput>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  start: (email: string) => void;
  reset: () => void;
}

const PlanContext = React.createContext<PlanContextValue | null>(null);

function load(): FlowState | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch {
    return null;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = React.useState<PlanInput>(BLANK_INPUT);
  const [tasks, setTasks] = React.useState<Task[]>(DEFAULT_TASKS);
  const [hydrated, setHydrated] = React.useState(false);

  // hydrate from localStorage after mount (avoids SSR mismatch)
  React.useEffect(() => {
    const saved = load();
    if (saved) {
      setInput(saved.input ?? BLANK_INPUT);
      setTasks(saved.tasks ?? DEFAULT_TASKS);
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ input, tasks }));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [input, tasks, hydrated]);

  const start = React.useCallback((email: string) => {
    setInput({ ...BLANK_INPUT, email });
    setTasks(DEFAULT_TASKS);
  }, []);

  const reset = React.useCallback(() => {
    setInput(BLANK_INPUT);
    setTasks(DEFAULT_TASKS);
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value: PlanContextValue = { input, tasks, hydrated, setInput, setTasks, start, reset };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = React.useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within <PlanProvider>");
  return ctx;
}

export { STORE_KEY as FLOW_STORE_KEY };
