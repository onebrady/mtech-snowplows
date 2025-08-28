import { type KnowledgeSection } from "./types";

import { Equipment } from "./sections/equipment";
import { Integration } from "./sections/integration";
import { Operations } from "./sections/operations";
import { Environment } from "./sections/environment";
import { Procurement } from "./sections/procurement";
import { Technology } from "./sections/technology";

export const KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  Equipment,
  Integration,
  Operations,
  Environment,
  Procurement,
  Technology,
];

export function getSectionBySlug(slug: string): KnowledgeSection | undefined {
  return KNOWLEDGE_SECTIONS.find((s) => s.slug === slug);
}
