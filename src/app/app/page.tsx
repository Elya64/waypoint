import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { subActive, type SubscriptionRow } from "@/lib/db-types";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

export const dynamic = "force-dynamic";

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware gates this route, but guard defensively
  if (!user) redirect("/login?next=/app");

  const [{ data: profile }, { data: sub }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
  ]);

  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.email ? user.email.split("@")[0] : "there");

  return (
    <DashboardApp
      userId={user.id}
      email={user.email ?? ""}
      displayName={displayName}
      pro={subActive((sub as SubscriptionRow) ?? null)}
    />
  );
}
