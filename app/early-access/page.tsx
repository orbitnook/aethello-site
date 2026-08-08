import type { Metadata } from "next";
import { EarlyAccessForm } from "@/components/early-access-form";

export const metadata: Metadata = { title: "Request early access", description: "Register your interest in testing Aethello." };

export default function EarlyAccessPage() {
  return <section className="early-access-page"><div className="reading-shell early-access-page__inner"><div className="early-access-page__intro"><p className="marketing-kicker">Early access</p><h1 className="marketing-heading">Request early access</h1><p>Join researchers and research organisations helping shape Aethello&apos;s approach to ethics and governance workflows.</p></div><EarlyAccessForm /></div></section>;
}
