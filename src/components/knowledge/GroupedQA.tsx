import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { QAItem } from "@/content/types";
import { HelpCircle } from "lucide-react";

export type QAGroup = {
  id: string;
  title: string;
  qaIds: string[];
};

export function GroupedQA({
  groups,
  items,
}: {
  groups: QAGroup[];
  items: QAItem[];
}) {
  const byId = new Map(items.map((i) => [i.id, i]));
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <Card
          key={g.id}
          id={g.id}
          className="scroll-mt-32"
          data-testid="qa-group"
        >
          <CardHeader className="pb-7">
            <CardTitle
              className="text-[21px] leading-tight"
              data-testid="group-title"
            >
              {g.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-7">
              {g.qaIds.map((qid, idx) => {
                const qa = byId.get(qid);
                if (!qa) return null;
                return (
                  <div
                    key={qid}
                    className={
                      "flex items-start gap-4" +
                      (idx > 0 ? " border-t pt-6 mt-6 border-border/60" : "")
                    }
                    data-testid="qa-row"
                  >
                    <HelpCircle className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <div className="font-medium text-[18px]">
                        {qa.question}
                      </div>
                      <div
                        className="text-[16px] text-foreground/80 mt-2 leading-[1.7]"
                        dangerouslySetInnerHTML={{ __html: qa.answer }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function JumpNav({ groups }: { groups: QAGroup[] }) {
  const [active, setActive] = useState<string>(groups[0]?.id || "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5] }
    );
    const els = groups
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  const handleJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="sticky top-16 z-20 bg-background/80 backdrop-blur-sm border rounded-md px-3 py-4 text-sm overflow-x-auto shadow-sm"
      data-testid="jumpnav"
      role="navigation"
      aria-label="JumpNav"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-foreground/80 mr-2">Jump to:</span>
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={handleJump(g.id)}
            className={
              "px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background " +
              (active === g.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
            type="button"
            aria-current={active === g.id ? "true" : undefined}
          >
            {g.title}
          </button>
        ))}
      </div>
    </div>
  );
}
