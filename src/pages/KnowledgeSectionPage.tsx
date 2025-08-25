import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { LaneCoverageEstimator } from "../components/microtools/LaneCoverageEstimator";
import { SaltUsageCalculator } from "../components/microtools/SaltUsageCalculator";
import { QAList } from "../components/knowledge/QAList";
import { TermsChips } from "../components/shared/TermsChips";
import { FAQSchema } from "../components/seo/FAQSchema";
import { KNOWLEDGE_SECTIONS, getSectionBySlug } from "../content/knowledge";

export default function KnowledgeSectionPage() {
  const { slug = "" } = useParams();
  const section = useMemo(() => getSectionBySlug(slug), [slug]);
  if (!section)
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">Section not found.</div>
    );

  const related = KNOWLEDGE_SECTIONS.filter((s) =>
    section.relatedSlugs?.includes(s.slug)
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <FAQSchema title={section.title} items={section.qas} />
      <nav className="text-sm mb-4">
        <Link to="/" className="hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>
      <h1 className="text-2xl font-bold">{section.title}</h1>
      <p className="text-slate-600 mt-1">{section.preview}</p>

      <div className="mt-6">
        <QAList items={section.qas} />
      </div>

      {section.terms && section.terms.length > 0 && (
        <TermsChips terms={section.terms} />
      )}

      {(section.hasLaneCoverageTool || section.hasSaltUsageTool) && (
        <div className="mt-8 space-y-4">
          {section.hasLaneCoverageTool && <LaneCoverageEstimator />}
          {section.hasSaltUsageTool && <SaltUsageCalculator />}
        </div>
      )}

      {section.downloads && section.downloads.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Downloads</h3>
          <ul className="list-disc pl-6 text-sm">
            {section.downloads.map((d) => (
              <li key={d.href}>
                <a
                  className="text-blue-600 hover:underline"
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Related Topics</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/section/${r.slug}`}
                className="rounded-full border px-3 py-1 hover:bg-slate-50"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
