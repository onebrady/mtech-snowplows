import { useEffect, useState } from "react";
import { detectRegion, type Region } from "../../lib/geo";

const STORAGE_KEY = "mtech-region";

export function GeoBanner() {
  const [region, setRegion] = useState<Region>("Other");
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Region | null;
    if (saved) {
      setRegion(saved);
    } else {
      detectRegion().then(setRegion);
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Region>).detail;
      if (detail) setRegion(detail);
    };
    window.addEventListener("mtech:region-changed", onChange as EventListener);
    return () =>
      window.removeEventListener(
        "mtech:region-changed",
        onChange as EventListener
      );
  }, []);

  if (region === "Other") return null;

  const copy: Record<Region, string> = {
    Ohio: "Based on your Ohio location, lake-effect snow and freeze-thaw cycles are key considerations.",
    Michigan:
      "Michigan's heavy lake-effect bursts require robust equipment designed for extreme conditions.",
    "Pennsylvania-West":
      "Hilly terrain and micro-climate variations demand versatile, reliable equipment.",
    Indiana:
      "Open corridors and wind-blown drifts require specialized equipment configurations.",
    Kentucky:
      "Transition climate with ice storms demands flexible, multi-capability systems.",
    Other: "",
  };

  return (
    <div className="bg-sky-50 border-b">
      <div className="mx-auto max-w-7xl px-4 py-2 text-sm text-sky-900">
        {copy[region]}
      </div>
    </div>
  );
}
