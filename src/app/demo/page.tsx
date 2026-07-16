import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

export const metadata: Metadata = {
  title: "Waypoint — Live demo",
  description: "A read-only tour of the Waypoint dashboard, no sign-in required.",
  robots: { index: false },
};

/** Signed-out product tour. Renders the real dashboard against seeded in-memory
 *  data: `demo` short-circuits every Supabase read/write, so this route needs no
 *  session and can never touch a real user's rows. Deliberately outside /app,
 *  which proxy.ts gates on auth. */
export default function DemoPage() {
  return (
    <DashboardApp
      userId="demo"
      email="alex@example.com"
      displayName="Alex"
      pro
      demo
    />
  );
}
