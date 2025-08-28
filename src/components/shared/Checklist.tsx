import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

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
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


