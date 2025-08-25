import { ShieldCheck, Wrench, MapPinned } from "lucide-react";
import { emitAnalytics } from "../../lib/analytics";

const INDICATORS = [
  { id: "ohio-built", icon: MapPinned, label: "Ohio Built" },
  { id: "midwest-service", icon: Wrench, label: "Midwest Service" },
  { id: "municipal-grade", icon: ShieldCheck, label: "Municipal‑Grade" },
] as const;

export function TrustIndicators() {
  return (
    <section aria-label="Trust indicators" className="mt-6" role="group">
      <div className="flex flex-wrap gap-2 text-sm">
        {INDICATORS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            aria-label={`Trust indicator: ${label}`}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 hover:bg-slate-50"
            onClick={() => emitAnalytics("trust_click", { id, label })}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
