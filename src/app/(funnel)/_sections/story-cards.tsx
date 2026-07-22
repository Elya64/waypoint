/** Scene 9 — the spec's "News" section. Originally written as fabricated
 *  customer anecdotes (a made-up name, a made-up outcome) with a "Read More"
 *  link that went nowhere real — exactly the kind of stub content that reads
 *  fine until someone actually clicks it. Rewritten as a plain description of
 *  what each phase of the roadmap covers, with no invented people or
 *  outcomes, and the CTA points at the real, working demo. */

const TOPICS = [
  {
    tags: ["Visa", "Legal"],
    title: "Getting a visa approved without missing a deadline",
    excerpt: "Every form, appointment, and document requirement for your visa type, sequenced so nothing gets missed.",
    tone: "var(--brand-600)",
  },
  {
    tags: ["Housing"],
    title: "Finding a place to live before you land",
    excerpt: "What to search for, what to sign, and what to have ready — matched to how renting actually works at your destination.",
    tone: "var(--positive)",
  },
  {
    tags: ["Finances"],
    title: "Setting up banking without a second trip",
    excerpt: "Which documents to bring, which local banks accept them, and the order that avoids getting stuck.",
    tone: "var(--warning)",
  },
];

export function StoryCards() {
  return (
    <section className="wp-stories">
      <div className="wp-stories-inner">
        <div className="wp-capture-kicker">from the roadmap</div>
        <h2 className="wp-stories-headline editorial">What each phase actually covers</h2>

        <div className="wp-stories-grid">
          {TOPICS.map((s) => (
            <article className="wp-story-card" key={s.title}>
              <div className="wp-story-bar" style={{ background: s.tone }} />
              <div className="wp-story-tags">
                {s.tags.map((t) => (
                  <span key={t}>{`// ${t}`}</span>
                ))}
              </div>
              <h3 className="wp-story-title">{s.title}</h3>
              <p className="wp-story-excerpt">{s.excerpt}</p>
              <a href="/demo" className="link-mono wp-story-link">TRY THE DEMO</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
