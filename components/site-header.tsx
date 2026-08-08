"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";

const navigation = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#who-its-for", label: "Who it's for" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="marketing-header">
      <div className="page-shell marketing-header__inner">
        <Wordmark />
        <nav className="marketing-nav marketing-nav--desktop" aria-label="Main navigation">
          {navigation.map((item) => <Link className="marketing-nav__link focus-ring" href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="marketing-button marketing-button--small focus-ring" href="/early-access">Request early access</Link>
        </nav>
        <button aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} className="marketing-menu-button focus-ring" onClick={() => setOpen((current) => !current)} type="button">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="marketing-mobile-nav page-shell" id="mobile-navigation">
          {navigation.map((item) => <Link className="focus-ring" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="marketing-button focus-ring" href="/early-access" onClick={() => setOpen(false)}>Request early access</Link>
        </nav>
      )}
    </header>
  );
}
