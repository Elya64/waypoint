/** Scene 8 — replaces the spec's dated AGI-summit section with what
 *  actually fits a relocation product: a single big statement, minimal
 *  decoration, one mono link out. Deliberately not framed as a customer
 *  quote/testimonial — there's no real one to attribute this to yet, and
 *  a fabricated name/story is exactly the kind of thing that undermines
 *  trust the moment someone asks where it came from. */
export function ProofQuote() {
  return (
    <section className="wp-quote">
      <p className="wp-quote-text editorial">
        No more three browser tabs and a panicked spreadsheet — just the
        next right step, every single day.
      </p>
      <a href="/demo" className="link-mono wp-quote-link">SEE HOW IT WORKS</a>
    </section>
  );
}
