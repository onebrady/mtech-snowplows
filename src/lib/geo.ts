export type Region =
  | "Ohio"
  | "Michigan"
  | "Pennsylvania-West"
  | "Indiana"
  | "Kentucky"
  | "Other";

export async function detectRegion(): Promise<Region> {
  // Placeholder: integrate IP-based detection in Phase 2
  return "Other";
}
