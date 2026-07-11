import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Providers } from "@/components/providers";
import { SplashLayoutScaffold } from "@/components/splash/SplashLayoutScaffold";
import { getVisualEditingEnabled } from "@/lib/sanity/preview";
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
          <SplashLayoutScaffold>
            {children}
            {visualEditingEnabled ? <VisualEditing /> : null}
            <footer className="site-footer">
              <div className="site-footer-grid">
                <div>
                  <p className="eyebrow">Visit</p>
                  <p>302 Historic Columbia River Highway</p>
                  <p>Troutdale, Oregon</p>
                </div>
                <div>
                  <p className="eyebrow">Hotel Reynard</p>
                  <p>A room-forward hotel and tavern in progress.</p>
                </div>
              </div>
            </footer>
          </SplashLayoutScaffold>
        </Providers>
      </body>
    </html>
  );
}
