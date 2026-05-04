import type { Metadata } from "next";
import Script from "next/script";
import HeaderVisibilityController from "@/components/HeaderVisibilityController";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Ga+Maamli&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <HeaderVisibilityController />
        <div className="site-shell">
          <header className="site-header">
            <div className="site-header__bar">
              <a href="#top" className="site-header__brand">
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
          <main className="site-main">{children}</main>
        </div>
        <Script src="https://api.mews.com/distributor/distributor.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
