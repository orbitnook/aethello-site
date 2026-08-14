import { VersionBadge } from "@/components/marketing-ui";

const documentChoices = [
  "Participant Information Sheet",
  "Consent Form",
  "Research Protocol",
  "Interview / Topic Guide",
  "Custom document",
];

const sections = [
  ["01", "Study title", "An introduction to the example study"],
  ["02", "What is the purpose of the study?", "Explain the study clearly for prospective participants."],
  ["03", "Why have I been invited?", "Describe who is being invited and why."],
];

export function NativeAuthoringComposition() {
  return (
    <div className="authoring-composition" aria-label="Illustrative Aethello document authoring workspace">
      <aside className="authoring-composition__templates">
        <p className="mock-label">Start a document</p>
        <div className="authoring-template-list">
          {documentChoices.map((choice, index) => (
            <div className={index === 0 ? "is-selected" : ""} key={choice}>
              <span aria-hidden="true">{index === 4 ? "+" : "□"}</span>
              <p>{choice}</p>
            </div>
          ))}
        </div>
        <p className="authoring-composition__note">Representative templates</p>
      </aside>
      <div className="authoring-editor">
        <div className="authoring-editor__topbar">
          <div><p className="mock-label">Editing document</p><h3>Participant Information Sheet</h3></div>
          <VersionBadge>Draft</VersionBadge>
        </div>
        <div className="authoring-editor__body">
          <div className="authoring-section-list">
            <div className="authoring-section-list__heading">
              <p className="mock-label">Structured sections</p>
              <div className="authoring-editor__additions"><span>+ Add section</span><span>+ Add question</span></div>
            </div>
            {sections.map(([number, title, helper]) => (
              <article className="authoring-section-card" key={title}>
                <span>{number}</span>
                <div><h4>{title}</h4><p>{helper}</p></div>
                <span className="authoring-section-card__control">Edit&nbsp; ⋮</span>
              </article>
            ))}
          </div>
          <aside className="authoring-history">
            <p className="mock-label">Submission history</p>
            <div><span aria-hidden="true" /><p><strong>Current draft</strong><small>Editing continues</small></p></div>
            <div><span aria-hidden="true" /><p><strong>Submission round 1</strong><small>Version frozen</small></p></div>
          </aside>
        </div>
        <div className="authoring-editor__footer"><span>All changes saved</span><span className="mock-action">Save</span></div>
      </div>
    </div>
  );
}
