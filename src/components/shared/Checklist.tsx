import { useMemo } from "react";

export function Checklist({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const textBlob = useMemo(
    () => `${title}\n\n` + items.map((i, idx) => `${idx + 1}. ${i}`).join("\n"),
    [title, items]
  );

  function handlePrint() {
    const content = `<pre style="font: 14px/1.5 ui-sans-serif, system-ui">${escapeHtml(
      textBlob
    )}</pre>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>${title}</title></head><body>${content}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  function handleDownload() {
    const blob = new Blob([textBlob], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(title)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-8 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50" onClick={handlePrint}>
            Print
          </button>
          <button className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
      <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


