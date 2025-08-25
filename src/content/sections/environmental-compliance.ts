import { type KnowledgeSection } from "../types";

export const EnvironmentalCompliance: KnowledgeSection = {
  slug: "environmental-compliance",
  title: "Environmental Compliance",
  preview: "Smart practices save money and protect the environment",
  icon: "Leaf",
  qas: [
    {
      id: "env-q1",
      question: "How do we reduce salt without risking safety?",
      answer:
        "Dial rates to pavement temperature and route priority, use pre-wet to cut bounce/scatter, and plow early to minimize bonding.",
    },
    {
      id: "env-q2",
      question: "What should be in a Salt Management Plan?",
      answer:
        "Targets by route class, calibration schedule, operator training, brine usage policy, and post-storm reviews with data feedback.",
    },
    {
      id: "env-q3",
      question: "Where should we store salt and brine?",
      answer:
        "Covered storage on impervious pads, controlled drainage, and secondary containment for liquids. Keep piles away from wells and waterways.",
    },
    {
      id: "env-q4",
      question: "Regulatory reporting—what data matters?",
      answer:
        "Application rates, total tons, brine gallons, and proof-of-service times. Track incidents like spills and document mitigations.",
    },
    {
      id: "env-q5",
      question: "Are treated salts worth it?",
      answer:
        "They lower effective temperatures and can reduce total tons on priority routes; weigh cost vs. benefit and environmental goals.",
    },
    {
      id: "env-q6",
      question: "How do liquids change our strategy?",
      answer:
        "Anti-icing on bridges/hills prevents bonding and reduces first-pass rates. Pre-wet improves sticking and activation.",
    },
    {
      id: "env-q7",
      question: "What operator training reduces over-application?",
      answer:
        "Ground-speed control, rate presets, spinner deflectors, and recognizing when plowing alone restores friction.",
    },
    {
      id: "env-q8",
      question: "How do we communicate results to councils and the public?",
      answer:
        "Publish season summaries with lane-miles treated, salt/ton reductions, and safety outcomes using telematics data for credibility.",
    },
  ],
  groups: [
    { id: "planning", title: "Programs & Planning", qaIds: ["env-q2"] },
    {
      id: "strategy",
      title: "Strategy & Liquids",
      qaIds: ["env-q1", "env-q6"],
    },
    { id: "materials", title: "Materials & Alternatives", qaIds: ["env-q5"] },
    { id: "storage", title: "Storage & Containment", qaIds: ["env-q3"] },
    {
      id: "reporting",
      title: "Reporting & Communication",
      qaIds: ["env-q4", "env-q8"],
    },
    { id: "training", title: "Training & Operations", qaIds: ["env-q7"] },
  ],
  terms: ["Pre-wet", "Anti-ice", "BMPs", "Secondary Containment"],
  hasSaltUsageTool: true,
  relatedSlugs: ["spreaders-101", "telematics-maintenance"],
  factCardTitle: "Quick wins",
  factCardBullets: [
    "Pre-wet to reduce bounce/scatter",
    "Prioritize bridges/grades",
    "Monthly calibration in peak season",
  ],
};
