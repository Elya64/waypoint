import { NextResponse } from "next/server";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { createClient } from "@/lib/supabase/server";
import { initLemonSqueezy, paymentsConfigured } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

/** Redirect the signed-in user to their Lemon Squeezy customer portal. */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  if (!paymentsConfigured()) return NextResponse.redirect(`${origin}/app`);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${origin}/login?next=/app`);

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("ls_subscription_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const subId = sub?.ls_subscription_id as string | undefined;
  if (!subId) return NextResponse.redirect(`${origin}/pricing`);

  initLemonSqueezy();
  try {
    const { data } = await getSubscription(subId);
    const portal = data?.data.attributes.urls?.customer_portal;
    return NextResponse.redirect(portal || `${origin}/app`);
  } catch (err) {
    console.error("[/api/billing] error:", err);
    return NextResponse.redirect(`${origin}/app`);
  }
}
