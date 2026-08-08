import { ConnectionLabel, DocumentCard, ReviewerPoint, VersionBadge } from "@/components/marketing-ui";

export function HeroComposition() {
  return (
    <div className="hero-composition" aria-label="Illustration showing a reviewer point connected to source documents">
      <div className="hero-composition__bar"><div><span className="mock-label">Illustrative workspace</span><p>Submission pack</p></div><VersionBadge>Version 2</VersionBadge></div>
      <div className="hero-composition__content">
        <ReviewerPoint>Clarify how participant withdrawal will work.</ReviewerPoint>
        <ConnectionLabel>Connected materials</ConnectionLabel>
        <div className="hero-composition__sources">
          <DocumentCard label="Application answer" title="How and until when may participants withdraw?" detail="Draft answer linked to source" tone="accent" />
          <DocumentCard label="Participant information sheet" title="Withdrawal from the study" detail="Page 3 · Source linked" />
        </div>
      </div>
    </div>
  );
}
