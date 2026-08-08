import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const home = read("app/page.tsx");
const header = read("components/site-header.tsx");
const footer = read("components/site-footer.tsx");

describe("public marketing site", () => {
  it("uses the required hero and conversion copy", () => {
    expect(home).toContain("From first submission to final amendment, keep the evidence connected.");
    expect(home).toContain("Aethello helps research teams prepare ethics and governance submissions, review connected documents, respond to reviewer feedback and keep every change traceable to its source.");
    expect(home).toContain("See how Aethello works");
    expect(home).toContain('href="/early-access"');
  });

  it("has the intended public navigation without product links", () => {
    const navigation = `${header}\n${footer}`;
    expect(navigation).toContain("How it works");
    expect(navigation).toContain("Who it&apos;s for");
    expect(navigation).toContain("Request early access");
    for (const prohibited of ["Sign in", "/login", "Pricing", "/dashboard", "/projects", "/guidance"]) expect(navigation).not.toContain(prohibited);
  });

  it("keeps claims source-backed and human-reviewed", () => {
    expect(home).toContain("Source-backed by design.");
    expect(home).toContain("does not treat generated text as the source of truth");
    expect(home).toContain("Human confirmation");
  });
});
