import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Lemon Squeezy webhook. Verifies the HMAC signature, then mirrors subscription
 * state into public.subscriptions (service role — bypasses RLS).
 * Configure this URL in Lemon Squeezy → Settings → Webhooks, subscribed to the
 * subscription_* events, with the same signing secret as LEMONSQUEEZY_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const raw = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  const digest = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const ok =
    signature.length === digest.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  if (!ok) return NextResponse.json({ error: "invalid_signature" }, { status: 401 });

  let event: LsEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const name = event.meta?.event_name ?? "";
  const userId = event.meta?.custom_data?.user_id;
  const attrs = event.data?.attributes;

  // Only subscription events carry the state we mirror.
  if (!name.startsWith("subscription_") || !userId || !attrs) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      ls_customer_id: attrs.customer_id != null ? String(attrs.customer_id) : null,
      ls_subscription_id: event.data?.id ?? null,
      ls_variant_id: attrs.variant_id != null ? String(attrs.variant_id) : null,
      status: attrs.status ?? null,
      renews_at: attrs.renews_at ?? null,
      ends_at: attrs.ends_at ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("[ls webhook] upsert error:", error);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}

interface LsEvent {
  meta?: { event_name?: string; custom_data?: { user_id?: string } };
  data?: {
    id?: string;
    attributes?: {
      status?: string;
      customer_id?: number | string;
      variant_id?: number | string;
      renews_at?: string | null;
      ends_at?: string | null;
    };
  };
}
