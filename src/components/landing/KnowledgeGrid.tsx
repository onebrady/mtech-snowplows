import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { KNOWLEDGE_SECTIONS } from "../../content/knowledge";
import { emitAnalytics } from "../../lib/analytics";

function IconByName({ name, className }: { name: string; className?: string }) {
  const Icon =
    (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[
      name
    ] || Icons.BookOpen;
  return <Icon className={className} />;
}

export function KnowledgeGrid() {
  return (
    <section
      id="knowledge-grid"
      className="mx-auto max-w-7xl px-4 py-10 scroll-mt-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {KNOWLEDGE_SECTIONS.map((s) => (
          <Link
            key={s.slug}
            to={`/section/${s.slug}`}
            className="group rounded-lg border p-4 hover:shadow-sm transition bg-white"
            onClick={() =>
              emitAnalytics("tile_click", { slug: s.slug, title: s.title })
            }
          >
            <div className="flex items-start gap-3">
              <span className="rounded-md bg-slate-100 p-2 text-slate-700">
                <IconByName name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold group-hover:underline">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{s.preview}</p>
              </div>
            </div>
          </Link>
        ))}
        {/* Quiz entry */}
        <Link
          to="/quiz"
          className="group rounded-lg border p-4 hover:shadow-sm transition bg-white"
          onClick={() => emitAnalytics("tile_click", { slug: "quiz", title: "Equipment Fit Quiz" })}
        >
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-slate-100 p-2 text-slate-700">
              <Icons.ListChecks className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold group-hover:underline">Equipment Fit Quiz</h3>
              <p className="text-sm text-slate-600 mt-1">Six steps to a tailored recommendation.</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
