type CardProps = { label: string; title: string; detail?: string; tone?: "accent" | "neutral" | "warning" };

export function VersionBadge({ children }: { children: React.ReactNode }) { return <span className="mock-badge">{children}</span>; }

export function DocumentCard({ detail, label, title, tone = "neutral" }: CardProps) {
  return <div className={`mock-document mock-document--${tone}`}><p className="mock-label">{label}</p><p className="mock-document__title">{title}</p>{detail && <p className="mock-detail">{detail}</p>}</div>;
}

export function FindingCard({ children, title }: { children: React.ReactNode; title: string }) {
  return <div className="mock-finding"><div className="mock-finding__top"><span>Review finding</span><VersionBadge>Needs review</VersionBadge></div><p className="mock-finding__title">{title}</p><div className="mock-finding__body">{children}</div></div>;
}

export function ReviewerPoint({ children }: { children: React.ReactNode }) { return <div className="mock-reviewer"><p className="mock-label">Reviewer point</p><p>{children}</p></div>; }

export function GuidanceDiff() { return <div className="mock-diff" aria-label="Illustrative guidance comparison"><div><span>Before</span><p>Retain for five years</p></div><div className="mock-connector" aria-hidden="true">→</div><div><span>After</span><p>Retain for ten years</p></div></div>; }

export function ConnectionLabel({ children }: { children: React.ReactNode }) { return <div className="mock-connection"><span aria-hidden="true" /><p>{children}</p></div>; }
