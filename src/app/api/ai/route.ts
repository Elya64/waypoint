import { NextRequest, NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, AI_MODEL, aiConfigured } from "@/lib/anthropic";
import { roadmapPrompt, ROADMAP_SCHEMA, chatPrompt } from "@/lib/ai-prompts";
import type { PlanInput, Task } from "@/lib/waypoint";

export const runtime = "nodejs";
export const maxDuration = 30;

/* ---- tiny in-memory rate limiter (best-effort per warm instance) ---- */
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = HITS.get(key);
  if (!entry || now > entry.resetAt) {
    HITS.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function textFrom(content: Anthropic.Message["content"]): string {
  return content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
}

function normalizeInput(raw: unknown): PlanInput {
  const p = (raw ?? {}) as Partial<PlanInput>;
  return {
    email: String(p.email ?? ""),
    from: String(p.from ?? ""),
    to: String(p.to ?? ""),
    visa: (p.visa ?? "") as PlanInput["visa"],
    when: (p.when ?? "") as PlanInput["when"],
  };
}

export async function POST(req: NextRequest) {
  if (!aiConfigured()) {
    // No key configured — let the client fall back to canned content.
    return NextResponse.json({ text: null, reason: "ai_not_configured" }, { status: 200 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ text: null, reason: "rate_limited" }, { status: 429 });
  }

  let body: { mode?: string; payload?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ text: null, reason: "bad_json" }, { status: 400 });
  }

  try {
    if (body.mode === "roadmap") {
      const input = normalizeInput(body.payload);
      const res = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 4000,
        thinking: { type: "adaptive" },
        output_config: { effort: "low", format: { type: "json_schema", schema: ROADMAP_SCHEMA } },
        messages: [{ role: "user", content: roadmapPrompt(input) }],
      });
      return NextResponse.json({ text: textFrom(res.content) }, { status: 200 });
    }

    if (body.mode === "chat") {
      const p = (body.payload ?? {}) as { input?: unknown; tasks?: unknown; question?: unknown };
      const input = normalizeInput(p.input);
      const tasks = Array.isArray(p.tasks) ? (p.tasks as Task[]) : [];
      const question = String(p.question ?? "").slice(0, 500);
      if (!question) return NextResponse.json({ text: null, reason: "empty" }, { status: 400 });

      const res = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 400,
        thinking: { type: "adaptive" },
        output_config: { effort: "low" },
        messages: [{ role: "user", content: chatPrompt(input, tasks, question) }],
      });
      return NextResponse.json({ text: textFrom(res.content) }, { status: 200 });
    }

    return NextResponse.json({ text: null, reason: "unknown_mode" }, { status: 400 });
  } catch (err) {
    console.error("[/api/ai] error:", err);
    // Fail soft — the client falls back to built-in canned content.
    return NextResponse.json({ text: null, reason: "ai_error" }, { status: 200 });
  }
}
