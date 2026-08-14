import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aethello | Research ethics and governance, connected",
    template: "%s | Aethello",
  },
  description:
    "Create and coordinate research ethics submission materials, review connected evidence and preserve every submitted version in Aethello.",
  openGraph: {
    title: "Aethello | Research ethics and governance, connected",
    description:
      "Create and coordinate research ethics submission materials, review connected evidence and preserve every submitted version in Aethello.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
