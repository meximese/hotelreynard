import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { NewsletterForm } from "@/components/newsletter-form";
import { Providers } from "@/components/providers";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { BuiText } from "@/components/ui/typography";
import { getVisualEditingEnabled } from "@/lib/sanity/preview";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Reynard",
  description: "Hotel Reynard web experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();
  const visualEditingEnabled = getVisualEditingEnabled() && draft.isEnabled;

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
      <body className="striped">
        <Providers>
          <SiteHeaderShell />
          {children}
          {visualEditingEnabled ? <VisualEditing /> : null}
          <footer className="site-footer">
            <div className="site-footer-grid">
              <div>
                <BuiText variant="eyebrow" className="eyebrow">
                  Visit
                </BuiText>
                <p>302 Historic Columbia River Highway</p>
                <p>Troutdale, Oregon</p>
              </div>
              <div className="site-footer-newsletter">
                <NewsletterForm />
              </div>
            </div>
          </footer>
        </Providers>
        <Script
          src="https://api.mews.com/distributor/distributor.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
