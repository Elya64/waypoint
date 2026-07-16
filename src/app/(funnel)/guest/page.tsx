"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/components/flow/plan-provider";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

/** The funnel's destination for visitors who haven't signed in. Runs the real
 *  dashboard in `demo` mode — every Supabase read/write is short-circuited — but
 *  seeded with this visitor's own answers and generated roadmap instead of the
 *  canned tour data. Their plan lives only in localStorage (see PlanProvider);
 *  signing in is what moves it into the database.
 *
 *  Lives under (funnel) for the PlanProvider in that layout. */
export default function GuestPage() {
  const router = useRouter();
  const { input, tasks, hydrated } = usePlan();

  // No plan to show (someone opened /guest directly) — send them to the funnel.
  const hasPlan = !!input.to;
  useEffect(() => {
    if (hydrated && !hasPlan) router.replace("/onboarding");
  }, [hydrated, hasPlan, router]);

  // DashboardApp seeds its state on first mount, so it must not mount before
  // localStorage has been read — otherwise it captures BLANK_INPUT forever.
  if (!hydrated || !hasPlan) return null;

  return (
    <DashboardApp
      userId="guest"
      email={input.email}
      displayName={input.email ? input.email.split("@")[0] : "there"}
      pro={false}
      demo
      seed={{ input, tasks }}
    />
  );
}
