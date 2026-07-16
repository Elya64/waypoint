import { cityOnly, visaLabel, whenLabel, type PlanInput, type Task } from "@/lib/waypoint";

/** Prompt for generating this week's Visa & Legal micro-tasks, personalized. */
export function roadmapPrompt(input: PlanInput): string {
  return (
    "You are an expert relocation advisor. A person is moving from " +
    (cityOnly(input.from) || "their home") +
    " to " +
    (cityOnly(input.to) || "their destination") +
    ". Visa status: " +
    visaLabel(input.visa) +
    ". Timeline: " +
    whenLabel(input.when) +
    ". Generate the 3 most important concrete tasks for THIS WEEK in the Visa & Legal phase, " +
    "specific to the destination country. For each task give exactly 3 small, ordered micro-actions. " +
    "Task labels must be under 9 words and action-oriented."
  );
}

/** JSON schema constraining the roadmap generation output. */
export const ROADMAP_SCHEMA = {
  type: "object",
  properties: {
    tasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          sub: { type: "array", items: { type: "string" } },
        },
        required: ["label", "sub"],
        additionalProperties: false,
      },
    },
  },
  required: ["tasks"],
  additionalProperties: false,
} as const;

/** Prompt for the "Ask Waypoint" assistant. */
export function chatPrompt(input: PlanInput, openTasks: Task[], question: string): string {
  const open = openTasks
    .filter((t) => !t.done)
    .map((t) => "- " + t.label)
    .join("\n");
  return (
    "You are Waypoint, a calm relocation coach. The user is moving from " +
    (cityOnly(input.from) || "home") +
    " to " +
    (cityOnly(input.to) || "their destination") +
    ". Visa status: " +
    visaLabel(input.visa) +
    ". Timeline: " +
    whenLabel(input.when) +
    ". They are in Phase 1 (Visa & Legal). Open tasks this week:\n" +
    (open || "(none)") +
    '\n\nUser asks: "' +
    question +
    '"\nReply in 2-3 short sentences, concrete and reassuring. ' +
    "Reduce overwhelm by naming the single most important next action. No markdown."
  );
}
