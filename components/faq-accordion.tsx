"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const items = [
  {
    question: "What does Aethello do?",
    answer: "Aethello is a source-backed workspace for preparing, reviewing and coordinating research ethics and governance submissions. It helps research teams organise connected submission materials, review study details, identify inconsistencies, prepare application responses and coordinate changes after reviewer feedback.",
  },
  {
    question: "Does Aethello replace my university or organisation's ethics system?",
    answer: "No. Aethello is designed to support the preparation and coordination of submission materials. Researchers can prepare and review their materials in Aethello, then submit them through the ethics or governance process used by their institution or organisation.",
  },
  {
    question: "Can I upload documents I already have?",
    answer: "Yes. Aethello currently supports PDF, DOCX and TXT files. Supported text can be extracted so researchers can review source evidence and connected study information across the submission.",
  },
  {
    question: "Can I create documents directly in Aethello?",
    answer: "Yes. Researchers can create structured submission materials directly in Aethello, start from available document structures, or create a blank structured document when a predefined option does not fit the study or institution.",
  },
  {
    question: "Does Aethello decide whether my application is ethically approved or compliant?",
    answer: "No. Aethello can surface source evidence, inconsistencies and areas that require researcher review, but it does not determine ethical approval, compliance or whether a submission will satisfy a reviewer. Those decisions remain with the researcher and the relevant ethics or governance process.",
  },
  {
    question: "What happens when reviewer feedback comes back?",
    answer: "Aethello can help teams record reviewer feedback, confirm which materials are affected, coordinate amendments and prepare traceable responses while preserving the versions that were originally submitted.",
  },
  {
    question: "Are uploaded research materials used to train AI models?",
    answer: "No. Uploaded application materials are not used to train Aethello's models.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      buttons.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-question-${index + 1}`;
        const panelId = `faq-answer-${index + 1}`;

        return (
          <div className="faq-item" key={item.question}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="faq-question focus-ring"
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(event) => moveFocus(event, index)}
                ref={(node) => { buttons.current[index] = node; }}
                type="button"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="faq-question__icon" />
              </button>
            </h3>
            <div aria-hidden={!isOpen} aria-labelledby={buttonId} className="faq-answer" id={panelId} role="region">
              <div className="faq-answer__inner"><p>{item.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
