"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";

/** Scene 5 — the spec's "community" section, recast around Waypoint's own
 *  movers. Same shape as the reference: warm paper background, a role list
 *  down the left, one photo-card on the right that hover-swaps per row.
 *  The reference uses six candid analog photos; this uses six brand-toned
 *  icon panels instead — same interaction, zero hotlinked-image risk in a
 *  shipped app. */

const ROLES: { label: string; icon: IconName; tone: string }[] = [
  { label: "Students", icon: "GraduationCap", tone: "var(--brand-600)" },
  { label: "Remote workers", icon: "Laptop", tone: "var(--positive)" },
  { label: "Families", icon: "Users", tone: "var(--warning)" },
  { label: "Retirees", icon: "Palmtree", tone: "var(--success)" },
  { label: "Digital nomads", icon: "Globe", tone: "var(--info)" },
  { label: "Expats", icon: "Plane", tone: "var(--slate)" },
];

export function MoversSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(hover: none)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % ROLES.length), 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="wp-movers" id="movers">
      <div className="wp-movers-grid">
        <div className="wp-movers-copy">
          <h2 className="wp-movers-headline editorial">
            One roadmap, built to fit wherever you&apos;re moving
            from and whoever you&apos;re moving as
          </h2>

          <ul className="wp-movers-list">
            {ROLES.map((role, i) => (
              <li
                key={role.label}
                className={`wp-movers-row${i === active ? " wp-movers-row--active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                {role.label}
              </li>
            ))}
          </ul>
        </div>

        <Link href="#start" className="wp-movers-cta link-mono">START YOUR PLAN</Link>

        <div className="wp-movers-card">
          {ROLES.map((role, i) => (
            <div
              key={role.label}
              className="wp-movers-panel"
              style={{
                opacity: i === active ? 1 : 0,
                background: `linear-gradient(155deg, color-mix(in srgb, ${role.tone} 20%, var(--paper)), color-mix(in srgb, ${role.tone} 6%, var(--paper)))`,
              }}
            >
              <Icon name={role.icon} size={44} strokeWidth={1.5} color={role.tone} />
              <span className="wp-movers-panel-label" style={{ color: role.tone }}>{role.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
