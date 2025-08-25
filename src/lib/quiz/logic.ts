import type { QuizAnswerMap, QuizResult } from "./types";

const PRIMARY_BY_RULE: Array<{
  match: (answers: QuizAnswerMap) => boolean;
  primary: QuizResult["primary"];
  rationale: string;
}> = [
  {
    match: (a) => a.vehicle_class === "heavy" && a.priority === "capacity",
    primary: "A",
    rationale: "Heavy vehicle with capacity priority suggests a high-capacity plow.",
  },
  {
    match: (a) => a.surface_type === "lot" && a.priority === "precision",
    primary: "B",
    rationale: "Lots and campus with precision favor maneuverable, precise control.",
  },
  {
    match: (a) => a.snow_amount === "gt6",
    primary: "C",
    rationale: ">6 in events benefit from robust, aggressive configurations.",
  },
  {
    match: (a) => a.salt_strategy === "liquid",
    primary: "D",
    rationale: "Pre-wet/liquids align with enhanced controls and telematics.",
  },
];

function pickAlternatives(primary: QuizResult["primary"]): QuizResult["alternatives"] {
  const order: QuizResult["primary"][] = ["A", "B", "C", "D"];
  return order.filter((o) => o !== primary).slice(0, 2);
}

function literatureFor(primary: QuizResult["primary"]) {
  const base = [{ label: "Downloads", url: "#/downloads" }];
  switch (primary) {
    case "A":
      return base.concat([{ label: "Plows 101", url: "#/section/plows-101" }]);
    case "B":
      return base.concat([{ label: "Spreaders 101", url: "#/section/spreaders-101" }]);
    case "C":
      return base.concat([{ label: "Fit & Compliance", url: "#/section/fit-compliance" }]);
    case "D":
    default:
      return base.concat([
        { label: "Telematics & Maintenance", url: "#/section/telematics-maintenance" },
      ]);
  }
}

export function computeRecommendation(answers: QuizAnswerMap): QuizResult {
  for (const rule of PRIMARY_BY_RULE) {
    if (rule.match(answers)) {
      const alts = pickAlternatives(rule.primary);
      return {
        primary: rule.primary,
        alternatives: alts,
        rationale: rule.rationale,
        literature: literatureFor(rule.primary),
      };
    }
  }

  // Fallback tie-break: hash first answer to index
  const keys = Object.keys(answers);
  const seed = keys.length ? (answers[keys[0]] || "A").charCodeAt(0) : 65;
  const primary = ("ABCD"[seed % 4] || "A") as QuizResult["primary"];
  return {
    primary,
    alternatives: pickAlternatives(primary),
    rationale: "Based on your responses, these configurations are a good starting point.",
    literature: literatureFor(primary),
  };
}


