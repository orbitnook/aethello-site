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
    "A source-backed workspace for preparing, reviewing and coordinating research ethics and governance submissions.",
  openGraph: {
    title: "Aethello | Research ethics and governance, connected",
    description:
      "A source-backed workspace for preparing, reviewing and coordinating research ethics and governance submissions.",
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
