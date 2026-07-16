import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Waypoint — Your move abroad, one clear step at a time",
  description:
    "Waypoint breaks the overwhelming process of moving abroad into a personalized, AI-powered, bite-sized roadmap — so you always know the one next step.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Waypoint — Your move abroad, one clear step at a time",
    description:
      "A personalized relocation roadmap, powered by AI. Visa, finances, housing — decomposed into calm weekly steps.",
    type: "website",
  },
};

// The font variables must live on <html>, not <body>: globals.css declares
// --font-sans on :root, and var() substitution resolves against the element the
// property is declared on — from :root, a --font-geist set on <body> is invisible
// and silently invalidates the whole --font-sans chain down to the browser default.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
