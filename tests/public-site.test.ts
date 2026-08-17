import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const home = read("app/page.tsx");
const header = read("components/site-header.tsx");
const footer = read("components/site-footer.tsx");
const faq = read("components/faq-accordion.tsx");

describe("public marketing site", () => {
  it("uses the required hero and conversion copy", () => {
    expect(home).toContain("Keep the next submission connected.");
    expect(home).toContain("Aethello helps research teams organise submission materials");
    expect(home).toContain("Explore the workflow");
    expect(home).toContain('href="/early-access"');
  });

  it("has the intended public navigation without product links", () => {
    const navigation = `${header}\n${footer}`;
    for (const label of ["Create", "Connect and review", "Submit and respond", "FAQ"]) expect(navigation).toContain(label);
    expect(navigation).toContain("Request early access");
    expect(footer).toContain('href="mailto:hello.aethello@gmail.com"');
    expect(footer).toContain("hello.aethello@gmail.com");
    for (const prohibited of ["Sign in", "/login", "Pricing", "/dashboard", "/projects", "/guidance"]) expect(navigation).not.toContain(prohibited);
  });

  it("keeps claims source-backed and human-reviewed", () => {
    expect(home).toContain("Nothing is confirmed automatically.");
    expect(home).toContain("The researcher decides what should be changed.");
  });

  it("presents document creation and the researcher-controlled workflow", () => {
    expect(home).toContain("Create the documents where the work happens.");
    expect(home).toContain("Create in Aethello");
    expect(home).toContain("Adapt sections and questions to your study and institution");
    for (const step of ["Keep the submission connected.", "Catch inconsistencies before they become reviewer comments.", "Know exactly what was submitted.", "Respond without losing the thread."]) expect(home).toContain(step);
  });

  it("includes the practical FAQ without expanding privacy claims", () => {
    for (const question of [
      "What does Aethello do?",
      "Does Aethello replace my university or organisation's ethics system?",
      "Can I upload documents I already have?",
      "Can I create documents directly in Aethello?",
      "Does Aethello decide whether my application is ethically approved or compliant?",
      "What happens when reviewer feedback comes back?",
      "Are uploaded research materials used to train AI models?",
    ]) expect(faq).toContain(question);
    expect(faq).toContain("Uploaded application materials are not used to train Aethello's models.");
    expect(faq).not.toContain("third-party processor");
  });
});
