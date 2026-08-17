import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/motion-reveal";
import { ProductCrop } from "@/components/product-screenshot";

const shots = {
  application: { src: "/product/application-evidence.png", width: 1261, height: 884 },
  create: { src: "/product/create-in-aethello.png", width: 1761, height: 878 },
  facts: { src: "/product/project-facts.png", width: 1778, height: 869 },
  finding: { src: "/product/review-finding.png", width: 1778, height: 613 },
  history: { src: "/product/document-version-history.png", width: 1798, height: 887 },
  pack: { src: "/product/submission-pack.png", width: 1419, height: 806 },
  review: { src: "/product/review-amendments.png", width: 1798, height: 774 },
};

export default function HomePage() {
  return (
    <>
      <section className="v2-hero">
        <div className="page-shell v2-hero__inner">
          <Reveal className="v2-hero__copy">
            <p className="marketing-kicker">Early access</p>
            <h1 className="marketing-display">From first submission to final amendment, keep the evidence connected.</h1>
            <p className="marketing-lede">Aethello helps research teams organise submission materials, identify inconsistencies, prepare application responses and manage reviewer-requested changes across connected documents.</p>
            <div className="marketing-actions">
              <Link className="marketing-button focus-ring" href="/early-access">Request early access</Link>
              <a className="hero-text-link focus-ring" href="#create">Explore the workflow <span aria-hidden="true">↓</span></a>
            </div>
          </Reveal>

          <Reveal className="hero-scene" delay={100}>
            <div className="hero-scene__line hero-scene__line--one" aria-hidden="true" />
            <div className="hero-scene__line hero-scene__line--two" aria-hidden="true" />
            <ProductCrop {...shots.pack} alt="Aethello submission pack with active documents and suggested contents" aspectRatio="1.82" className="hero-scene__pack" focusX={0} focusY={-1} mobileFocusX={0} mobileFocusY={-1} mobileScale={1.45} priority scale={1.1} />
            <ProductCrop {...shots.application} alt="Aethello application question list, selected answer and linked supporting evidence" aspectRatio="1.72" className="hero-scene__application" focusX={0} focusY={-37} mobileFocusX={0} mobileFocusY={-38} mobileScale={1.2} priority scale={1.15} sizes="(max-width: 700px) 390px, 560px" />
            <ProductCrop {...shots.finding} alt="Aethello inconsistency finding linked to two source documents" aspectRatio="2.72" className="hero-scene__finding" focusX={0} focusY={-1} mobileFocusX={0} mobileFocusY={-1} mobileScale={1.65} priority scale={1.18} sizes="(max-width: 700px) 440px, 680px" />
            <p className="hero-scene__caption"><span aria-hidden="true" /> Documents, evidence and findings stay connected</p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section create-chapter" id="create" aria-labelledby="create-heading">
        <div className="page-shell">
          <div className="v2-section-heading">
            <Reveal className="v2-section-heading__title">
              <p className="marketing-kicker">Create in Aethello</p>
              <h2 className="marketing-heading" id="create-heading">Create the documents where the work happens.</h2>
            </Reveal>
            <Reveal className="v2-section-heading__copy" delay={70}>
              <p>Create common ethics submission materials in the same workspace where they are reviewed and tracked. Start with a structured document or bring in materials you already have.</p>
              <p className="quiet-copy">Adapt sections and questions to your study and institution while keeping important information connected across the submission.</p>
            </Reveal>
          </div>
          <Reveal className="create-product" delay={120}>
            <ProductCrop {...shots.create} alt="Upload an existing document or create a structured document in Aethello" aspectRatio="2.28" focusX={0} focusY={-15} mobileFocusX={-3} mobileFocusY={-13} mobileScale={1.48} scale={1.06} />
            <div className="create-product__key" aria-hidden="true"><span>Bring in existing material</span><i /><span>Create a structured document</span></div>
          </Reveal>
        </div>
      </section>

      <section className="connect-review-chapter" id="connect-review" aria-labelledby="connect-heading">
        <div className="v2-section connect-chapter">
          <div className="page-shell">
            <Reveal className="chapter-lead">
              <p className="marketing-kicker">Connected submission workspace</p>
              <h2 className="marketing-heading" id="connect-heading">Keep the submission connected.</h2>
              <p>Bring protocols, participant materials, application responses and supporting evidence into one workspace. Extraction and version state stay visible while researchers decide what should be confirmed.</p>
            </Reveal>

            <div className="connect-sequence">
              <Reveal className="connect-step">
                <div className="connect-step__copy"><span>01</span><h3>Build the submission pack</h3><p>See active documents, extraction state and suggested materials in one connected pack.</p></div>
                <ProductCrop {...shots.pack} alt="Submission pack showing active documents, extraction status and suggested contents" aspectRatio="2.12" focusX={0} focusY={-2} mobileFocusX={0} mobileFocusY={-2} mobileScale={1.45} scale={1.08} />
              </Reveal>
              <Reveal className="connect-step connect-step--dark" delay={70}>
                <div className="connect-step__copy"><span>02</span><h3>Confirm study details</h3><p>Review detected facts, extraction coverage and the details already confirmed for the project.</p></div>
                <ProductCrop {...shots.facts} alt="Project facts showing detected details, confirmed facts and extraction coverage" aspectRatio="2.15" focusX={0} focusY={0} mobileFocusX={0} mobileFocusY={0} mobileScale={1.55} scale={1.14} />
              </Reveal>
              <Reveal className="connect-step" delay={90}>
                <div className="connect-step__copy"><span>03</span><h3>Link evidence to an answer</h3><p>Keep the researcher-authored response connected to confirmed facts and selected source evidence.</p></div>
                <ProductCrop {...shots.application} alt="Application question list beside a selected question, researcher-authored answer and linked supporting evidence" aspectRatio="1.75" className="application-proof" focusX={0} focusY={-1} mobileFocusX={0} mobileFocusY={-1} mobileScale={1.05} scale={1} />
              </Reveal>
            </div>
            <p className="chapter-caveat">Nothing is confirmed automatically. Researchers review possible facts and decide which evidence supports an answer    .</p>
          </div>
        </div>

        <div className="review-proof" id="review" aria-labelledby="review-heading">
          <div className="page-shell review-proof__inner">
            <Reveal className="review-proof__copy">
              <p className="marketing-kicker">Cross-document review</p>
              <h2 className="marketing-heading" id="review-heading">Catch inconsistencies before they become reviewer comments.</h2>
              <p>Aethello surfaces discrepancies across confirmed study details and shows the source evidence that needs researcher review.</p>
              <p className="review-proof__boundary">The researcher decides what should be changed.</p>
            </Reveal>
            <Reveal className="review-product" delay={90}>
              <div className="review-product__sequence" aria-hidden="true"><span>Source one</span><i /><span>Source two</span><i /><strong>Finding</strong></div>
              <ProductCrop {...shots.finding} alt="Review finding showing affected documents, conflicting evidence and the option to fix the issue" aspectRatio="2.75" focusX={0} focusY={0} mobileFocusX={0} mobileFocusY={0} mobileScale={2.35} scale={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="v2-section submit-respond-chapter" id="submit-respond" aria-labelledby="history-heading">
        <div className="page-shell">
          <div className="history-layout">
            <Reveal className="history-layout__copy">
              <p className="marketing-kicker">Submission history</p>
              <h2 className="marketing-heading" id="history-heading">Know exactly what was submitted.</h2>
              <p>Each submission round preserves the exact document and application versions sent for review. Later changes create a new working state without rewriting the earlier submission.</p>
              <p className="history-statement"><span aria-hidden="true">01</span><strong>Preserve what went out.</strong> Keep working on what comes next.</p>
            </Reveal>
            <Reveal className="history-product" delay={90}>
              <ProductCrop {...shots.history} alt="Submission history preserving Version 1 from Round 1 alongside later document options" aspectRatio="1.48" focusX={0} focusY={-11} mobileFocusX={0} mobileFocusY={-10} mobileScale={2.15} scale={1.5} />
              <p className="history-product__status"><span aria-hidden="true">✓</span> Submitted in Round 1 as Version 1</p>
            </Reveal>
          </div>

          <div className="workflow-transition" aria-hidden="true"><span>Submitted version preserved</span><i /><span>Reviewer feedback coordinated</span></div>

          <div className="respond-layout" id="respond" aria-labelledby="respond-heading">
            <Reveal className="respond-layout__copy">
              <p className="marketing-kicker">After submission</p>
              <h2 className="marketing-heading" id="respond-heading">Respond without losing the thread.</h2>
              <p>Record reviewer feedback, confirm affected materials, coordinate amendments and prepare traceable responses while preserving the original submission round.</p>
            </Reveal>
            <Reveal className="respond-product" delay={90}>
              <div className="respond-product__steps" aria-hidden="true"><span>Feedback</span><i /><span>Affected items</span><i /><span>Amendments</span><i /><span>Responses</span></div>
              <ProductCrop {...shots.review} alt="Round 2 workflow for reviewer feedback, affected items, amendments and responses" aspectRatio="1.72" focusX={0} focusY={-3} mobileFocusX={0} mobileFocusY={-2} mobileScale={2.05} scale={1.32} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="page-shell faq-section__inner">
          <Reveal className="faq-section__intro">
            <p className="marketing-kicker">FAQ</p>
            <h2 className="marketing-heading" id="faq-heading">Practical questions, answered.</h2>
            <p className="faq-section__support">Still have a question?</p>
            <a className="faq-section__cta focus-ring" href="mailto:hello.aethello@gmail.com">Contact us</a>
          </Reveal>
          <Reveal delay={70}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <section className="v2-final-cta" aria-labelledby="early-access-heading">
        <div className="page-shell v2-final-cta__inner">
          <Reveal>
            <p className="marketing-kicker">Early access</p>
            <h2 className="marketing-heading" id="early-access-heading">Keep the next submission connected.</h2>
            <p>A source-backed workspace for preparing, reviewing and coordinating research ethics and governance submissions.</p>
            <div className="marketing-actions marketing-actions--center"><Link className="marketing-button focus-ring" href="/early-access">Request early access</Link></div>
            <small>For teams preparing ethics and governance submissions.</small>
          </Reveal>
        </div>
      </section>
    </>
  );
}
