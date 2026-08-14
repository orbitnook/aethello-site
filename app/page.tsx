import Link from "next/link";
import { HeroComposition } from "@/components/hero-composition";
import { NativeAuthoringComposition } from "@/components/native-authoring-composition";
import { ConnectionLabel, DocumentCard, FindingCard, GuidanceDiff, ReviewerPoint, VersionBadge } from "@/components/marketing-ui";

const audiences = [
  ["Research teams", "Designed for researchers coordinating applications, evidence and amendments across a study."],
  ["Universities and research offices", "Built for teams supporting consistent, well-evidenced submission workflows."],
  ["Healthtech and MedTech teams", "Designed for product teams preparing human-participant research materials."],
  ["Research organisations and consultancies", "Built for specialists managing several connected research workflows."],
];

export default function HomePage() {
  return (
    <>
      <section className="marketing-hero">
        <div className="marketing-hero__glow" aria-hidden="true" />
        <div className="page-shell marketing-hero__inner">
          <div className="marketing-hero__copy">
            <p className="marketing-kicker">Research ethics and governance, connected</p>
            <h1 className="marketing-display">From first submission to final amendment, keep the evidence connected.</h1>
            <p className="marketing-lede">Create and coordinate research ethics submissions in one connected workspace. Build common submission documents, review connected evidence, respond to reviewer feedback and preserve every submitted version.</p>
            <div className="marketing-actions">
              <Link className="marketing-button focus-ring" href="/early-access">Request early access</Link>
              <Link className="marketing-button marketing-button--secondary focus-ring" href="#how-it-works">See how Aethello works</Link>
            </div>
          </div>
          <HeroComposition />
        </div>
      </section>

      <section className="marketing-section marketing-section--paper" aria-labelledby="problem-heading">
        <div className="page-shell">
          <div className="marketing-section__intro">
            <p className="marketing-kicker">The coordination problem</p>
            <h2 className="marketing-heading" id="problem-heading">Research approval work is still held together by documents, inboxes and memory.</h2>
            <p>Important details can move across a submission while the connection between them remains difficult to see.</p>
          </div>
          <div className="story-grid">
            <StoryCard number="01" title="Submission materials drift apart" copy="Application answers, uploaded files and research documents are often updated separately, making inconsistencies difficult to spot." callout="Keep uploaded and Aethello-created materials connected">
              <div className="mock-stack"><DocumentCard label="Application" title="Participants: 40" /><DocumentCard label="Protocol" title="Participants: up to 50" tone="warning" /><DocumentCard label="Participant information sheet" title="Participant count not stated" /></div>
            </StoryCard>
            <StoryCard number="02" title="Reviewer feedback creates another round of coordination" copy="One reviewer point can affect several answers and documents, leaving researchers to work out what needs changing and where." callout="One request, several affected materials">
              <ReviewerPoint>Clarify the withdrawal process.</ReviewerPoint><ConnectionLabel>3 affected materials</ConnectionLabel>
              <div className="mock-list"><span>Application answer <VersionBadge>V2</VersionBadge></span><span>Consent document <VersionBadge>V3</VersionBadge></span><span>Protocol <VersionBadge>V2</VersionBadge></span></div>
            </StoryCard>
            <StoryCard number="03" title="Requirements do not stand still" copy="Guidance, institutional requirements and reviewer conditions can change while research is already underway." callout="1 active project may need review">
              <div className="mock-version-row"><span>Guidance version 1</span><span aria-hidden="true">→</span><span>Guidance version 2</span></div><GuidanceDiff />
            </StoryCard>
          </div>
        </div>
      </section>

      <section className="marketing-section authoring-section" id="authoring" aria-labelledby="authoring-heading">
        <div className="page-shell">
          <div className="authoring-section__intro">
            <div><p className="marketing-kicker">Create in Aethello</p><h2 className="marketing-heading" id="authoring-heading">Create the documents where the work happens.</h2></div>
            <div className="authoring-section__copy"><p>Aethello lets researchers create common ethics submission materials directly in the same workspace where they are reviewed and tracked. Start with a structured template or create your own document.</p><p>Adapt sections and questions to your study and institution, or add custom submission materials when the standard templates do not fit.</p></div>
          </div>
          <NativeAuthoringComposition />
        </div>
      </section>

      <section className="marketing-section workflow-section" id="how-it-works" aria-labelledby="workflow-heading">
        <div className="page-shell">
          <div className="marketing-section__intro marketing-section__intro--wide"><p className="marketing-kicker">Create · Review · Submit · Respond</p><h2 className="marketing-heading" id="workflow-heading">One workspace from first draft to reviewer response.</h2></div>
          <div className="workflow-cards">
            <WorkflowCard number="01 · Create" title="Create, then keep materials connected" copy="Use uploaded files alongside documents created in Aethello. Both stay connected to the same evidence, findings, version history and submission rounds as drafts develop.">
              <div className="workflow-create-list"><DocumentCard label="Created in Aethello" title="Participant Information Sheet" detail="Draft · Structured sections" tone="accent" /><DocumentCard label="Uploaded file" title="Research Protocol" detail="Current version" /><DocumentCard label="Application material" title="Application responses" detail="Connected evidence and findings" /></div>
            </WorkflowCard>
            <WorkflowCard number="02 · Review" title="Review connected materials" copy="Compare the details carried across documents and application responses, with source-backed findings that help researchers identify inconsistencies." reverse>
              <FindingCard title="Participant count appears inconsistent"><div className="comparison-pair"><DocumentCard label="Application" title="40 participants" /><DocumentCard label="Protocol" title="Up to 50 participants" tone="warning" /></div></FindingCard>
            </WorkflowCard>
            <WorkflowCard number="03 · Submit" title="Prepare the submission" copy="Choose the materials being submitted, freeze their exact document and application versions, and download a submission pack for the institution’s existing portal.">
              <div className="submission-pack"><div className="submission-pack__top"><div><p className="mock-label">Submission round 1</p><strong>3 selected materials</strong></div><VersionBadge>Ready to freeze</VersionBadge></div><div className="mock-list"><span>Application responses <VersionBadge>Current</VersionBadge></span><span>Participant Information Sheet <VersionBadge>Draft 4</VersionBadge></span><span>Consent Form <VersionBadge>Draft 3</VersionBadge></span></div><div className="submission-pack__footer"><span>Exact versions preserved</span><span className="mock-action">Download pack</span></div></div>
            </WorkflowCard>
            <WorkflowCard number="04 · Respond" title="Respond to reviewer feedback" copy="Record reviewer requests, coordinate changes across affected materials and preserve the history of each response." reverse>
              <ReviewerPoint>Clarify how participant withdrawal will work.</ReviewerPoint><div className="response-flow" aria-label="Reviewer response workflow"><span>Affected answer</span><span aria-hidden="true">→</span><span>Affected document</span><span aria-hidden="true">→</span><span>Revised versions</span></div><div className="mock-confirm"><span aria-hidden="true">✓</span><div><p>Response ready</p><small>Confirmed by researcher</small></div></div>
            </WorkflowCard>
          </div>
        </div>
      </section>

      <section className="marketing-section source-section" aria-labelledby="source-heading">
        <div className="page-shell source-section__grid">
          <div><p className="marketing-kicker">Evidence before assertion</p><h2 className="marketing-heading" id="source-heading">Source-backed by design.</h2><p className="source-section__copy">Aethello does not treat generated text as the source of truth. Findings, responses and changes remain linked to the underlying documents, guidance and version history for human review.</p>
            <div className="principle-list"><Principle title="Exact source evidence">See the document, passage and version behind a finding or response.</Principle><Principle title="Human confirmation">Suggestions remain proposals until a researcher or authorised reviewer confirms them.</Principle><Principle title="Version history">New answers, documents and guidance versions preserve what came before.</Principle></div>
          </div>
          <div className="lineage-card" aria-label="Illustrative source lineage"><p className="mock-label">Source lineage</p>{[["Reviewer point", "Clarify withdrawal"], ["Source passage", "Participant information · Page 3"], ["Affected answer", "Withdrawal process"], ["Answer version 2", "Ready for human review"]].map(([label, value], index) => <div className="lineage-step" key={label}><span>{index + 1}</span><div><small>{label}</small><p>{value}</p></div></div>)}</div>
        </div>
      </section>

      <section className="marketing-section marketing-section--paper" id="who-its-for" aria-labelledby="audience-heading">
        <div className="page-shell audience-layout"><div className="marketing-section__intro"><p className="marketing-kicker">Who it&apos;s for</p><h2 className="marketing-heading" id="audience-heading">Built for teams managing human-participant research.</h2></div><div className="audience-list">{audiences.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      </section>

      <section className="early-access-callout" aria-labelledby="early-access-heading"><div className="page-shell early-access-callout__inner"><p className="marketing-kicker">Early access</p><h2 className="marketing-heading" id="early-access-heading">Help shape Aethello.</h2><p>We&apos;re inviting researchers and research organisations to test an early version and help shape how Aethello supports ethics and governance workflows.</p><div className="marketing-actions marketing-actions--center"><Link className="marketing-button focus-ring" href="/early-access">Request early access</Link></div></div></section>
    </>
  );
}

function StoryCard({ callout, children, copy, number, title }: { callout: string; children: React.ReactNode; copy: string; number: string; title: string }) { return <article className="story-card"><span className="story-card__number">{number}</span><h3>{title}</h3><p>{copy}</p><div className="story-card__visual">{children}</div><div className="story-card__callout"><span aria-hidden="true" />{callout}</div></article>; }

function WorkflowCard({ children, copy, number, reverse = false, title }: { children: React.ReactNode; copy: string; number: string; reverse?: boolean; title: string }) { return <article className={`workflow-card${reverse ? " workflow-card--reverse" : ""}`}><div className="workflow-card__copy"><span>{number}</span><h3>{title}</h3><p>{copy}</p></div><div className="workflow-card__visual">{children}</div></article>; }

function Principle({ children, title }: { children: React.ReactNode; title: string }) { return <article><span aria-hidden="true">✓</span><div><h3>{title}</h3><p>{children}</p></div></article>; }
