import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="marketing-footer">
      <div className="page-shell marketing-footer__grid">
        <div><Wordmark /><p className="marketing-footer__description">A source-backed workspace for research ethics and governance submissions.</p></div>
        <nav aria-label="Footer navigation" className="marketing-footer__links">
          <Link href="/#create">Create</Link>
          <Link href="/#connect-review">Connect and review</Link>
          <Link href="/#submit-respond">Submit and respond</Link>
          <Link href="/early-access">Request early access</Link>
        </nav>
        <div className="marketing-footer__contact">
          <p>Contact</p>
          <a href="mailto:hello.aethello@gmail.com">hello.aethello@gmail.com</a>
        </div>
      </div>
      <div className="page-shell marketing-footer__base"><p>© 2026 Aethello.</p></div>
    </footer>
  );
}
