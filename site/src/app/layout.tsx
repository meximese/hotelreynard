import type { Metadata } from "next";
import Script from "next/script";
import HeaderVisibilityController from "@/components/HeaderVisibilityController";
import HeaderWordmark from "@/components/HeaderWordmark";
import "./globals.css";
import ReynardWordmarkMorphScrollScene from "@/components/ReynardWordmarkMorphScrollScene";

export const metadata: Metadata = {
  title: "Hotel Reynard",
  description: "Hotel Reynard",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ga+Maamli&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <HeaderVisibilityController />
        <div className="site-shell">
          <header className="site-header">
            <div className="site-header__bar">
              <a href="#top" className="site-header__brand">
                <span className="sr-only">Hotel Reynard</span>
                <HeaderWordmark />
              </a>
              <a href="#top" className="site-header__home-link">
                Hotel Reynard
              </a>
              <nav className="site-header__nav" aria-label="Primary">
                <a href="#rooms">Rooms</a>
                <a href="#stays">Stays</a>
                <a href="#menu">Menu</a>
                <a href="#events">Events</a>
              </nav>
            </div>
          </header>
          <section className="site-intro">
            <ReynardWordmarkMorphScrollScene
              className="morph-scroll-track--footer"
              morphClassName="poster-hero__morph"
              direction="forward"
              holdStart={0.0}
              holdEnd={0.25}
            >
              <h2 className="poster-sub poster-hero__hotel">Hotel</h2>
              <h2 className="poster-sub poster-hero__tavern">&amp; Tavern</h2>
              <p className="poster-date">Hotel Reynard opens July 1st, 2026</p>
            </ReynardWordmarkMorphScrollScene>
          </section>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="poster-hero__stack">
              <img
                src="/reynard-short.png"
                alt="Hotel Reynard"
                className="poster-hero__reynard"
              />
              <div
                className="poster-hero__navline poster-hero__navline--top"
                aria-hidden="true"
              >
                <span>Rooms</span>
                <span>Stays</span>
              </div>
              <div
                className="poster-hero__navline poster-hero__navline--bottom"
                aria-hidden="true"
              >
                <span>Menu</span>
                <span>Events</span>
              </div>
            </div>
          </footer>
        </div>
        <Script
          src="https://api.mews.com/distributor/distributor.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
