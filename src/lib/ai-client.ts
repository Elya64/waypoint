/**
 * Browser-side AI helpers. These call our own server route (/api/ai),
 * which holds the Anthropic key. The key is NEVER exposed to the client.
 */

export type AiMode = "roadmap" | "chat";

export async function aiComplete(mode: AiMode, payload: unknown): Promise<string | null> {
  try {
    const r = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, payload }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j && typeof j.text === "string" ? j.text.trim() : null;
  } catch {
    return null;
  }
}

export async function aiJSON<T = unknown>(mode: AiMode, payload: unknown): Promise<T | null> {
  const t = await aiComplete(mode, payload);
  if (!t) return null;
  try {
    const m = t.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    return JSON.parse(m ? m[0] : t) as T;
  } catch {
    return null;
  }
}
