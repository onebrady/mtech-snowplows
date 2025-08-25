import * as Tooltip from "@radix-ui/react-tooltip";
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
                    className="rounded-full border px-3 py-1 bg-white hover:bg-slate-50"
                    aria-label={def ? `${term}: ${def}` : term}
                  >
                    {term}
                  </button>
                </Tooltip.Trigger>
                {def && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="max-w-xs rounded-md border bg-white px-3 py-2 text-xs text-slate-700 shadow"
                      sideOffset={6}
                    >
                      {def}
                      <Tooltip.Arrow className="fill-white" />
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


