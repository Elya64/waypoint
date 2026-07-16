import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

/** Configure the Lemon Squeezy SDK (server-only). Call before any LS API use. */
export function initLemonSqueezy() {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY,
    onError: (err) => console.error("[lemonsqueezy]", err),
  });
}

export function paymentsConfigured(): boolean {
  return !!(
    process.env.LEMONSQUEEZY_API_KEY &&
    process.env.LEMONSQUEEZY_STORE_ID &&
    process.env.LEMONSQUEEZY_VARIANT_ID
  );
}

/** Map a Lemon Squeezy subscription status to whether it grants product access. */
export const ACTIVE_STATUSES = new Set(["active", "on_trial"]);
