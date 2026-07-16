import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waypoint — Your roadmap",
  description: "Your personalized relocation roadmap.",
  robots: { index: false },
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
