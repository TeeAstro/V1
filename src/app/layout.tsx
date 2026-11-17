import type { Metadata } from "next";
import localFont from "next/font/local";
import { C2CartDrawer } from "@/components/site/C2CartDrawer";
import { C2Footer } from "@/components/site/C2Footer";
import { C2Header } from "@/components/site/C2Header";
import { Providers } from "@/components/site/Providers";
import "./globals.css";
import "./site.css";

// Self-hosted, SIL Open Font License, so the build needs no network.
const bodoni = localFont({
  src: [
    { path: "../fonts/bodoni-moda-latin-opsz-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/bodoni-moda-latin-opsz-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-bodoni",
});

const instrument = localFont({
  src: "../fonts/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "ATHAR THOBES | Thobes, shirts and hats for men",
    template: "%s | ATHAR THOBES",
  },
  description:
    "Men's thobes, shirts and hats, designed in Minnesota. Free shipping in the United States.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className={`c2 flex min-h-screen flex-col ${bodoni.variable} ${instrument.variable}`}>
            <a
              href="#c2-main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2"
            >
              Skip to content
            </a>
            <C2Header />
            <main id="c2-main" className="flex-1">
              {children}
            </main>
            <C2Footer />
            <C2CartDrawer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
