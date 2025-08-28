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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      {/* Enhanced grid for 6 categories - 2x3 layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {KNOWLEDGE_SECTIONS.map((s) => (
          <Link
            key={s.slug}
            to={`/section/${s.slug}`}
            className="group block transition"
            onClick={() =>
              emitAnalytics("tile_click", { slug: s.slug, title: s.title })
            }
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="flex-row items-start gap-3 p-6">
                <span className="rounded-md bg-muted p-3 text-foreground/80">
                  <IconByName name={s.icon} className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="group-hover:underline text-lg">
                      {s.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {s.qas.length} topics
                    </Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
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
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="flex-row items-start gap-3 p-6">
              <span className="rounded-md bg-muted p-3 text-foreground/80">
                <Icons.ListChecks className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="group-hover:underline text-lg">
                    Equipment Fit Quiz
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    6 steps
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  Six steps to a tailored recommendation.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
      
      {/* View All Content Button */}
      <div className="text-center">
        <Link to="/knowledge">
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => emitAnalytics("view_all_click", { source: "knowledge_grid" })}
          >
            <Icons.BookOpen className="h-4 w-4" />
            View All Content
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          Browse all {KNOWLEDGE_SECTIONS.reduce((total, section) => total + section.qas.length, 0)} topics in one page
        </p>
      </div>
    </section>
  );
}
