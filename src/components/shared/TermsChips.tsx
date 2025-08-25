import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { getTermDefinition } from "../../content/glossary";

export function TermsChips({ terms }: { terms: string[] }) {
  if (!terms || terms.length === 0) return null;
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-2">Key Terms</h3>
      <Tooltip.Provider>
        <div className="flex flex-wrap gap-2 text-sm">
          {terms.map((term) => {
            const def = getTermDefinition(term);
            return (
              <Tooltip.Root key={term} delayDuration={200}>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    className="rounded-full border px-3 py-1 bg-muted text-foreground/80 hover:bg-muted/80 inline-flex items-center gap-2"
                    aria-label={def ? `${term}: ${def}` : term}
                  >
                    {term}
                    {def && <Info className="h-3 w-3 text-muted-foreground" />}
                  </button>
                </Tooltip.Trigger>
                {def && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="max-w-xs rounded-md border bg-card px-3 py-2 text-xs text-foreground shadow"
                      sideOffset={6}
                    >
                      {def}
                      <Tooltip.Arrow className="fill-card" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            );
          })}
        </div>
      </Tooltip.Provider>
    </div>
  );
}
