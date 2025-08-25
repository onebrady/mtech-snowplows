import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { type QAItem } from "../../content/types";
import { emitAnalytics } from "../../lib/analytics";

function sanitizeAnswer(html: string): string {
  if (typeof window === "undefined") return html;
  const container = document.createElement("div");
  container.innerHTML = html;
  const anchors = container.querySelectorAll("a");
  anchors.forEach((a, idx) => {
    if (idx > 0) {
      const span = document.createElement("span");
      span.textContent = a.textContent || "";
      a.replaceWith(span);
    }
  });
  const textContent = (container.textContent || "").trim();
  const words = textContent.split(/\s+/).filter(Boolean);
  if (words.length > 120) {
    const truncated = words.slice(0, 120).join(" ") + "…";
    container.textContent = truncated;
  }
  return container.innerHTML;
}

export function QAList({ items }: { items: QAItem[] }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setExpanded(false);
  }, [items]);
  const visible = expanded ? items : items.slice(0, 3);
  // Dev-time validation to enforce PRD rules
  if (import.meta.env.DEV) {
    for (const qa of items.slice(0, 8)) {
      const wordCount = qa.answer
        .replace(/<[^>]+>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      const linkCount = (qa.answer.match(/<a\b[^>]*>/gi) || []).length;
      if (wordCount > 120 || linkCount > 1) {
        console.warn("QA validation warning", {
          id: qa.id,
          wordCount,
          linkCount,
        });
      }
    }
  }
  return (
    <div className="space-y-3">
      {visible.map((qa) => (
        <details
          key={qa.id}
          className="group rounded-md border bg-white"
          onToggle={(e) =>
            emitAnalytics(
              (e.currentTarget as HTMLDetailsElement).open
                ? "qa_expand"
                : "qa_collapse",
              {
                id: qa.id,
                question: qa.question,
              }
            )
          }
        >
          <summary className="list-none cursor-pointer px-4 py-3 flex items-center justify-between gap-3">
            <span className="font-medium line-clamp-2 md:line-clamp-none">
              {qa.question}
            </span>
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div
            className="px-4 pb-4 text-slate-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeAnswer(qa.answer) }}
          />
        </details>
      ))}
      {items.length > 3 && (
        <button
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
          onClick={() => {
            setExpanded((v) => !v);
            emitAnalytics("qa_toggle_show_more", { expanded: !expanded });
          }}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
