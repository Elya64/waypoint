import { SiteNav } from "./_sections/site-nav";
import { HeroScene } from "./_sections/hero-scene";
import { LightPause } from "./_sections/light-pause";
import { ParticleScene } from "./_sections/particle-scene";
import { MoversSection } from "./_sections/movers-section";
import { CaptureCta } from "./_sections/capture-cta";
import { HowItWorks } from "./_sections/how-it-works";
import { ProofQuote } from "./_sections/proof-quote";
import { StoryCards } from "./_sections/story-cards";
import { SiteFooter } from "./_sections/site-footer";

// No wrapping `.animate-screenIn` here on purpose: that class's CSS animation
// sets `transform` on the element, and any `transform` (even a settled
// translateY(0)) makes the browser treat it as a containing block for
// `position: fixed` descendants — which breaks both SiteNav's fixed header
// and GSAP ScrollTrigger's pin (which pins via `position: fixed` too).
export default function HeroPage() {
  return (
    <>
      <SiteNav />
      <HeroScene />
      <LightPause />
      <ParticleScene />
      <MoversSection />
      <CaptureCta />
      <HowItWorks />
      <ProofQuote />
      <StoryCards />
      <SiteFooter />
    </>
  );
}
