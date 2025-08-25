export const TERM_DEFINITIONS: Record<string, string> = {
  "Trip-edge":
    "Only the cutting edge trips over obstacles to keep the snow load.",
  "Full-trip": "The entire moldboard trips to absorb impact, gentler on truck.",
  Moldboard:
    "Curved plow surface that rolls and casts snow away from the lane.",
  "Cutting Edge":
    "Replaceable blade segment that performs the scraping on pavement.",
  "Underbody Scraper":
    "Down-pressure blade mounted mid‑chassis for hard pack removal.",
  "Wing Plow": "Side-mounted blade to widen cleared width in a single pass.",
  "Pre-wet":
    "Liquids added to salt to reduce bounce/scatter and speed activation.",
  "Anti-ice":
    "Liquid treatment applied before storms to prevent ice bond formation.",
  Brine:
    "Salt-in-water solution used for anti‑icing and pre‑wetting strategies.",
  GVWR: "Gross Vehicle Weight Rating; max allowable total vehicle weight.",
  FGAWR: "Front Gross Axle Weight Rating; max allowable front axle load.",
  PTO: "Power take-off; drives hydraulics for plow/spreader systems.",
  RWIS: "Road Weather Information System data to time and select treatments.",
  AVL: "Automatic Vehicle Location (GPS) for route tracking and proof-of-service.",
  "Application Rate":
    "Target material output per lane‑mile, set by route priority and conditions.",
  Swath: "The lateral width of material coverage behind the spreader.",
  "Bounce/Scatter":
    "Material lost due to bouncing off pavement and scattering outside the target area.",
  "Closed-loop":
    "Controller automatically adjusts output based on ground speed for consistent application.",
  "Stainless 304":
    "Common corrosion‑resistant stainless steel alloy used in spreader construction.",
  "Spinner Shield":
    "Deflector or guard to control spinner throw and reduce scatter/off‑target discharge.",
};

export function getTermDefinition(term: string): string | undefined {
  return TERM_DEFINITIONS[term] || TERM_DEFINITIONS[normalizeKey(term)];
}

function normalizeKey(key: string): string {
  return key.trim().replace(/\.$/, "");
}
