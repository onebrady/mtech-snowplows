import { useEffect, useState } from "react";
import type { Region } from "../../lib/geo";

const REGIONS: Region[] = [
  "Ohio",
  "Michigan",
  "Pennsylvania-West",
  "Indiana",
  "Kentucky",
  "Other",
];

const STORAGE_KEY = "mtech-region";

export function RegionSelector() {
  const [region, setRegion] = useState<Region>(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return (saved as Region) || "Other";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, region);
    window.dispatchEvent(
      new CustomEvent("mtech:region-changed", { detail: region })
    );
  }, [region]);

  return (
    <label
      className="inline-flex items-center gap-2 text-sm"
      aria-label="Select your region"
    >
      <span className="text-slate-600 hidden sm:inline">Region:</span>
      <select
        className="rounded-md border bg-white px-2 py-1"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
      >
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </label>
  );
}
