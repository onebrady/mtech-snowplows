import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { KNOWLEDGE_SECTIONS } from "../../content/knowledge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
            className="group block transition"
            onClick={() =>
              emitAnalytics("tile_click", { slug: s.slug, title: s.title })
            }
          >
            <Card className="hover:shadow-sm">
              <CardHeader className="flex-row items-start gap-3 p-4">
                <span className="rounded-md bg-muted p-2 text-foreground/80">
                  <IconByName name={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="group-hover:underline">
                    {s.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {s.preview}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {/* Quiz entry */}
        <Link
          to="/quiz"
          className="group block transition"
          onClick={() =>
            emitAnalytics("tile_click", {
              slug: "quiz",
              title: "Equipment Fit Quiz",
            })
          }
        >
          <Card className="hover:shadow-sm">
            <CardHeader className="flex-row items-start gap-3 p-4">
              <span className="rounded-md bg-muted p-2 text-foreground/80">
                <Icons.ListChecks className="h-5 w-5" />
              </span>
              <div>
                <CardTitle className="group-hover:underline">
                  Equipment Fit Quiz
                </CardTitle>
                <CardDescription className="mt-1">
                  Six steps to a tailored recommendation.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </section>
  );
}
