"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function LoginInner() {
  const params = useSearchParams();
  const next = params.get("next") || "/app";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(params.get("error") ? "Sign-in failed. Try again." : null);

  const redirectTo =
    (typeof window !== "undefined" ? window.location.origin : "") +
    "/auth/callback?next=" +
    encodeURIComponent(next);

  const sendMagicLink = async () => {
    if (!email.trim() || busy) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="surface" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Brand />
        </Link>
      </nav>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "24px" }}>
        <Card style={{ width: "100%", maxWidth: 420, padding: 32 }}>
          <h1 className="editorial" style={{ fontSize: 30, letterSpacing: "-.5px", margin: "0 0 6px" }}>
            Welcome to <span className="it">Waypoint</span>
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: 15, margin: "0 0 24px" }}>
            Sign in to save your plan and pick up where you left off.
          </p>

          {sent ? (
            <div
              style={{
                display: "flex", gap: 12, alignItems: "flex-start", padding: 16, borderRadius: 12,
                background: "var(--ac-soft)", border: "1px solid var(--ac-border)",
              }}
            >
              <Icon name="Check" size={18} color="var(--ac)" />
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                Check <b>{email}</b> for a magic link to finish signing in.
              </div>
            </div>
          ) : (
            <>
              {/* Google sign-in temporarily disabled (no Google Workspace / OAuth app yet).
                  To re-enable: restore this button + the `google()` handler, and configure the
                  Google provider in Supabase → Auth → Providers. Email magic-link stays primary. */}
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMagicLink()}
                style={{ marginBottom: 12 }}
              />
              <Button onClick={sendMagicLink} disabled={busy} style={{ width: "100%" }}>
                {busy ? "Sending…" : "Email me a magic link"} <Icon name="ArrowRight" size={16} />
              </Button>
            </>
          )}

          {error && <p style={{ color: "var(--destructive)", fontSize: 13, marginTop: 14 }}>{error}</p>}
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
