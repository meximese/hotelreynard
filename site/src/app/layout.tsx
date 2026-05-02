import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AmbientBotanicals from "@/components/AmbientBotanicals";
import FooterWordmark from "@/components/FooterWordmark";
import ObserveCssVars from "@/components/ObserveCssVars";
import "./globals.css";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AmbientBotanicals />
        <div className="site-shell">
          <div className="stripes" aria-hidden="true">
            <div className="bar bar-a"></div>
            <div className="bar bar-b"></div>
            <div className="bar bar-c"></div>
            <div className="bar bar-a"></div>
            <div className="bar bar-b"></div>
            <div className="bar bar-c"></div>
          </div>
          <header>
            <div
              className="site-header__bar"
              data-css-var-dimension="height"
              data-css-var-name="--site-header-height"
              data-home-scroll-nav-state="hidden"
            >
              <nav className="site-header__nav site-header__nav--left" aria-label="Primary left">
                <Link href="/tavern">Eat and Drink</Link>
                <Link href="/rooms">Rest and Relax</Link>
              </nav>
              <Link href="/" className="site-logo">
                <img
                  src="/site-svg/word-hotel.svg"
                  alt="Hotel"
                  className="logo-hotel"
                  width="50"
                />
                <img
                  src="/site-svg/word-reynard.svg"
                  alt="Reynard"
                  className="logo-reynard"
                  width="100"
                />
              </Link>
              <nav className="site-header__nav site-header__nav--right" aria-label="Primary right">
                <Link href="/events">Throw a Party</Link>
                <Link href="/journal">Journal</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <div>
              <FooterWordmark />
              <p>302 Historic Columbia River Highway</p>
              <p>Troutdale, OR 97060</p>
              <p>
                <a href="tel:+15037555302">+1 (503) 755-5302</a>
              </p>
            </div>
          </footer>
        </div>
        <ObserveCssVars />
        <Script src="https://api.mews.com/distributor/distributor.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
