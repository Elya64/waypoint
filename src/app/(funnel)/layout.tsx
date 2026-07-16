import { PlanProvider } from "@/components/flow/plan-provider";

/** Wraps the pre-auth funnel (hero → onboarding → generating → preview)
 *  so the collected plan survives navigation between these routes. */
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}
