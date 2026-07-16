import Anthropic from "@anthropic-ai/sdk";

/**
 * Server-only Anthropic client. The API key lives in ANTHROPIC_API_KEY and is
 * NEVER shipped to the browser — this module must only be imported from server
 * code (API routes / server components).
 */
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const AI_MODEL = "claude-opus-4-8";

export function aiConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}
