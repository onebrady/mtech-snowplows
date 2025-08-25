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
import {
  GroupedQA,
  JumpNav,
  type QAGroup,
} from "@/components/knowledge/GroupedQA";
import { Button } from "@/components/ui/button";

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
        <HowToSchema
          title={section.checklist.title}
          items={section.checklist.items}
        />
      )}
      <nav className="text-sm mb-4">
        <Link to="/" className="hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>
      <h1 className="text-[24px] font-bold leading-tight">{section.title}</h1>
      <p className="text-slate-600 mt-2">
        {section.slug === "spreaders-101"
          ? "Essential knowledge for winter road maintenance equipment"
          : section.preview}
      </p>

      {/* Use grouped layout when groups provided or for spreaders-101 template */}
      {section.slug === "spreaders-101" || section.groups?.length ? (
        <>
          <div className="mt-12">
            <JumpNav
              groups={
                section.slug === "spreaders-101"
                  ? ([
                      {
                        id: "equip",
                        title: "Equipment Selection",
                        qaIds: ["spreaders-q1", "spreaders-q4"],
                      },
                      {
                        id: "rates",
                        title: "Application Rates & Calibration",
                        qaIds: ["spreaders-q2", "spreaders-q3"],
                      },
                      {
                        id: "materials",
                        title: "Materials & Liquids",
                        qaIds: ["spreaders-q5", "spreaders-q6"],
                      },
                      {
                        id: "maintenance",
                        title: "Maintenance & Monitoring",
                        qaIds: ["spreaders-q7", "spreaders-q8"],
                      },
                    ] as QAGroup[])
                  : (section.groups as QAGroup[])
              }
            />
          </div>
          <div className="mt-6">
            <GroupedQA
              groups={
                section.slug === "spreaders-101"
                  ? [
                      {
                        id: "equip",
                        title: "Equipment Selection & Setup",
                        qaIds: ["spreaders-q1", "spreaders-q4"],
                      },
                      {
                        id: "rates",
                        title: "Application Rates & Calibration",
                        qaIds: ["spreaders-q2", "spreaders-q3"],
                      },
                      {
                        id: "materials",
                        title: "Materials & Liquids",
                        qaIds: ["spreaders-q5", "spreaders-q6"],
                      },
                      {
                        id: "maintenance",
                        title: "Maintenance & Monitoring",
                        qaIds: ["spreaders-q7", "spreaders-q8"],
                      },
                    ]
                  : (section.groups as QAGroup[])
              }
              items={section.qas}
            />
          </div>
        </>
      ) : (
        <div className="mt-6">
          <QAList items={section.qas} />
        </div>
      )}

      {section.terms && section.terms.length > 0 && (
        <TermsChips terms={section.terms} />
      )}

      {section.slug === "spreaders-101" && (
        <div className="mt-10 rounded-md border p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm">
              Need a tailored equipment recommendation?
            </div>
            <Button asChild>
              <Link to="/quiz">Start Equipment Quiz</Link>
            </Button>
          </div>
        </div>
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
        <Checklist
          title={section.checklist.title}
          items={section.checklist.items}
        />
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
