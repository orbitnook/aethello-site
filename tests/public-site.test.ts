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
    expect(home).toContain("Create and coordinate research ethics submissions in one connected workspace.");
    expect(home).toContain("See how Aethello works");
    expect(home).toContain('href="/early-access"');
  });

  it("has the intended public navigation without product links", () => {
    const navigation = `${header}\n${footer}`;
    expect(navigation).toContain("Create documents");
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

  it("presents document creation and the researcher-controlled workflow", () => {
    expect(home).toContain("Create the documents where the work happens.");
    expect(home).toContain("Create in Aethello");
    expect(home).toContain("Adapt sections and questions to your study and institution");
    for (const step of ["Create, then keep materials connected", "Review connected materials", "Prepare the submission", "Respond to reviewer feedback"]) expect(home).toContain(step);
    expect(home).toContain("institution’s existing portal");
  });
});
