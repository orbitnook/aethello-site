"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type RevealStyle = CSSProperties & { "--reveal-delay": string };

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = element.current;
    if (!node) return;

    const reveal = () => node.classList.add("is-visible");
    let firstFrame = 0;
    let secondFrame = 0;
    document.documentElement.classList.add("motion-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -4%", threshold: 0.01 },
    );

    observer.observe(node);
    node.classList.add("reveal-ready");

    const initialPosition = node.getBoundingClientRect();
    if (initialPosition.bottom <= 0) {
      reveal();
      observer.disconnect();
    } else if (initialPosition.top < window.innerHeight) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(reveal);
      });
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  const style: RevealStyle = { "--reveal-delay": `${delay}ms` };
  return <div className={`reveal${className ? ` ${className}` : ""}`} ref={element} style={style}>{children}</div>;
}
