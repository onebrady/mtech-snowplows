import { Link } from "react-router-dom";
import type { QuizResult } from "../../lib/quiz/types";
import { emitAnalytics } from "../../lib/analytics";
import { useEffect } from "react";
import { ContactCapture } from "./ContactCapture";
import { QUIZ_RESULTS } from "../../content/quiz-results";
import { ResultCard } from "./ResultCard";

const LITERATURE_LINKS: Record<string, { label: string; url: string }[]> = {
  A: [
    { label: "Downloads", url: "#/downloads" },
    { label: "Plows 101", url: "#/section/plows-101" },
  ],
  B: [
    { label: "Downloads", url: "#/downloads" },
    { label: "Spreaders 101", url: "#/section/spreaders-101" },
  ],
  C: [
    { label: "Controls 101", url: "#/section/controls-101" },
    { label: "Fit & Compliance", url: "#/section/fit-compliance" },
  ],
  D: [
    {
      label: "Telematics & Maintenance",
      url: "#/section/telematics-maintenance",
    },
    {
      label: "Environmental Compliance",
      url: "#/section/environmental-compliance",
    },
  ],
};

export function RecommendationResults({ result }: { result: QuizResult }) {
  const links = LITERATURE_LINKS[result.primary] || [
    { label: "Downloads", url: "#/downloads" },
  ];

  useEffect(() => {
    emitAnalytics("quiz_result_view", {
      primary: result.primary,
      alternatives: result.alternatives,
    });
  }, [result.primary, result.alternatives]);

  const primaryContent = QUIZ_RESULTS[result.primary];
  const alternativeContents = result.alternatives
    .map((c) => QUIZ_RESULTS[c])
    .filter(Boolean);

  return (
    <section aria-labelledby="quiz-results">
      <h2 id="quiz-results" className="text-xl font-semibold">
        Your Recommendation: {result.primary}
      </h2>
      <p className="mt-2 text-slate-700">{result.rationale}</p>
      {primaryContent && <ResultCard content={primaryContent} />}

      {result.alternatives.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium">Alternatives</h3>
          <div className="mt-2 flex flex-col gap-2">
            {alternativeContents.map((c) => (
              <ResultCard key={c.code} content={c} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium">Literature & Next Steps</h3>
        <ul className="list-disc ml-5">
          {links.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                onClick={() =>
                  emitAnalytics("quiz_result_link_click", { url: l.url })
                }
                className="text-slate-900 hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
            onClick={() =>
              emitAnalytics("quiz_result_view", {
                primary: result.primary,
                alternatives: result.alternatives,
              })
            }
          >
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
      <ContactCapture />
    </section>
  );
}
