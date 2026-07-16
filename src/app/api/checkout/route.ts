import { NextResponse } from "next/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { createClient } from "@/lib/supabase/server";
import { initLemonSqueezy, paymentsConfigured } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!paymentsConfigured()) {
    return NextResponse.json({ error: "Payments not configured." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  initLemonSqueezy();

  const origin = new URL(request.url).origin;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID!;

  try {
    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: user.email ?? undefined,
        custom: { user_id: user.id }, // echoed back in webhook meta.custom_data
      },
      productOptions: {
        redirectUrl: `${origin}/app`,
      },
      checkoutOptions: { embed: false },
    });

    if (error || !data) {
      console.error("[/api/checkout] LS error:", error);
      return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
    }

    return NextResponse.json({ url: data.data.attributes.url });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json({ error: "Checkout failed." }, { status: 500 });
  }
}
