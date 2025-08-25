import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { LaneCoverageEstimator } from "../components/microtools/LaneCoverageEstimator";
import { SaltUsageCalculator } from "../components/microtools/SaltUsageCalculator";
import { QAList } from "../components/knowledge/QAList";
import { TermsChips } from "../components/shared/TermsChips";
import { FactCard } from "../components/shared/FactCard";
import { FAQSchema } from "../components/seo/FAQSchema";
import { HowToSchema } from "../components/seo/HowToSchema";
import { Checklist } from "../components/shared/Checklist";
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

  const currentIndex = KNOWLEDGE_SECTIONS.findIndex(
    (s) => s.slug === section.slug
  );
  const prevSection =
    currentIndex > 0 ? KNOWLEDGE_SECTIONS[currentIndex - 1] : undefined;
  const nextSection =
    currentIndex >= 0 && currentIndex < KNOWLEDGE_SECTIONS.length - 1
      ? KNOWLEDGE_SECTIONS[currentIndex + 1]
      : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <FAQSchema title={section.title} items={section.qas} />
      {section.checklist && section.checklist.items.length > 0 && (
        <HowToSchema title={section.checklist.title} items={section.checklist.items} />
      )}
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

      {section.factCardBullets && section.factCardBullets.length > 0 && (
        <FactCard
          title={section.factCardTitle}
          bullets={section.factCardBullets}
        />
      )}

      {(section.hasLaneCoverageTool || section.hasSaltUsageTool) && (
        <div className="mt-8 space-y-4">
          {section.hasLaneCoverageTool && <LaneCoverageEstimator />}
          {section.hasSaltUsageTool && <SaltUsageCalculator />}
        </div>
      )}

      {section.checklist && section.checklist.items.length > 0 && (
        <Checklist title={section.checklist.title} items={section.checklist.items} />
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

      {(prevSection || nextSection) && (
        <nav className="mt-10 flex items-center justify-between text-sm">
          <div>
            {prevSection && (
              <Link
                to={`/section/${prevSection.slug}`}
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-slate-50"
                aria-label={`Previous: ${prevSection.title}`}
              >
                ← {prevSection.title}
              </Link>
            )}
          </div>
          <div>
            {nextSection && (
              <Link
                to={`/section/${nextSection.slug}`}
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-slate-50"
                aria-label={`Next: ${nextSection.title}`}
              >
                {nextSection.title} →
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
