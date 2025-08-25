import { type KnowledgeSection } from "./types";

import { PLows101 } from "./sections/plows-101";
import { Spreaders101 } from "./sections/spreaders-101";
import { Controls101 } from "./sections/controls-101";
import { FitCompliance } from "./sections/fit-compliance";
import { EnvironmentalCompliance } from "./sections/environmental-compliance";
import { TelematicsMaintenance } from "./sections/telematics-maintenance";
import { SafetyTraining } from "./sections/safety-training";
import { ProcurementFleet } from "./sections/procurement-fleet";
import { RegionalSnapshots } from "./sections/regional-snapshots";

export const KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  PLows101,
  Spreaders101,
  Controls101,
  FitCompliance,
  EnvironmentalCompliance,
  TelematicsMaintenance,
  SafetyTraining,
  ProcurementFleet,
  RegionalSnapshots,
];

export function getSectionBySlug(slug: string): KnowledgeSection | undefined {
  return KNOWLEDGE_SECTIONS.find((s) => s.slug === slug);
}
