import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="marketing-footer">
      <div className="page-shell marketing-footer__grid">
        <div><Wordmark /><p className="marketing-footer__description">Source-backed research ethics and governance workflows.</p></div>
        <nav aria-label="Footer navigation" className="marketing-footer__links">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#who-its-for">Who it&apos;s for</Link>
          <Link href="/early-access">Request early access</Link>
        </nav>
      </div>
      <div className="page-shell marketing-footer__base"><p>© 2026 Aethello.</p></div>
    </footer>
  );
}
