import type { Metadata } from "next";
import Script from "next/script";
import FooterKnockoutSvg from "@/components/FooterKnockoutSvg";
import HeaderVisibilityController from "@/components/HeaderVisibilityController";
import HeaderWordmark from "@/components/HeaderWordmark";
import { LayoutAnimationProvider } from "@/components/LayoutAnimationProvider";
import "./globals.css";
import ReynardWordmarkMorphSvgScrollScene from "@/components/ReynardWordmarkMorphSvgScrollScene";
import NewsletterForm from "@/components/NewsletterForm";

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
        <LayoutAnimationProvider>
          <HeaderVisibilityController />
          <div className="site-shell">
            <header className="site-header">
              <div className="site-header__bar">
                {/* <nav className="site-header__nav" aria-label="Primary">
                  <a href="#rooms">Rooms</a>
                  <a href="#stays">Stays</a>
                </nav> */}
                <a href="#top" className="site-header__home-link">
                  <span className="sr-only">Hotel Reynard</span>
                  <HeaderWordmark />
                </a>
                {/* <nav className="site-header__nav" aria-label="Primary">
                  <a href="#menu">Menu</a>
                  <a href="#events">Events</a>
                </nav> */}
              </div>
            </header>
            <section className="site-intro">
              <ReynardWordmarkMorphSvgScrollScene
                className="morph-scroll-track--footer"
                morphClassName="poster-hero__morph"
                direction="forward"
                holdStart={0.0}
                holdEnd={0.25}
              >
                <h2 className="poster-sub poster-hero__hotel">Hotel</h2>
                <h2 className="poster-sub poster-hero__tavern">
                  <span>&amp;</span> Tavern
                </h2>
              </ReynardWordmarkMorphSvgScrollScene>
              <p className="tagline">
                302 Historic Columbia River Highway
                <br />
                Hotel Reynard opens Summer 2026
              </p>
              <section className="newsletter-signup">
                <NewsletterForm />
              </section>
            </section>
            {/* <div
              className="poster-bouquet poster-bouquet--hero"
              aria-hidden="true"
            >
              <img
                src={"/site-svg/bouquet.svg"}
                alt=""
                className="flower-bouquet"
              />
            </div> */}

            {/* <main className="site-main">{children}</main> */}
            {/* <footer className="site-footer">
              <div className="poster-hero__stack">
                <FooterKnockoutSvg />
                <p className="poster-date poster-date--footer">
                  Hotel Reynard opens Summer 2026
                  <br />
                  302 Historic Columbia River Highway
                </p>
              </div>
            </footer> */}
          </div>
        </LayoutAnimationProvider>
        <Script
          src="https://api.mews.com/distributor/distributor.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
