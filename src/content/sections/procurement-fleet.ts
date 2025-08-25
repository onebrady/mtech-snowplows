import { type KnowledgeSection } from "../types";

export const ProcurementFleet: KnowledgeSection = {
  slug: "procurement-fleet",
  title: "Procurement & Fleet Strategy",
  preview: "RFP/RFQ essentials and TCO vs. price",
  icon: "BriefcaseBusiness",
  qas: [
    {
      id: "proc-q1",
      question: "How should we evaluate TCO vs. low bid?",
      answer:
        "Include lifecycle costs: uptime, parts commonality, fuel/liquid usage, and resale. Score safety and training support, not just purchase price.",
    },
    {
      id: "proc-q2",
      question: "Spec writing—what avoids protest risk?",
      answer:
        "Performance-based specs with verifiable tests, at least two compliant paths, and clear evaluation criteria. Avoid brand lock-in unless justified.",
    },
    {
      id: "proc-q3",
      question: "Standardize or diversify builds?",
      answer:
        "Standardize around platforms for training/parts. Allow limited variants for terrain or district needs to keep spares manageable.",
    },
    {
      id: "proc-q4",
      question: "What warranty and support terms matter?",
      answer:
        "In-region parts inventory, loaner modules, technician training, and guaranteed response times reduce downtime.",
    },
    {
      id: "proc-q5",
      question: "Lead times and funding windows?",
      answer:
        "Coordinate chassis and upfit lead times 6–12 months out. Use cooperative contracts and plan for supply variability.",
    },
    {
      id: "proc-q6",
      question: "Buy vs. refurbish older units?",
      answer:
        "Evaluate frame corrosion, hydraulic hours, and control obsolescence. Refurbs work when cores are solid and safety upgrades are feasible.",
    },
    {
      id: "proc-q7",
      question: "What KPIs should fleet managers track?",
      answer:
        "Uptime, cost per lane-mile, salt per lane-mile, and training completion rates. Publish quarterly to stakeholders.",
    },
    {
      id: "proc-q8",
      question: "How do demos/pilots fit in?",
      answer:
        "Pilot new controls or wings on a few beats with tight telemetry and operator feedback before large buys.",
    },
  ],
  groups: [
    {
      id: "evaluation",
      title: "Evaluation & TCO",
      qaIds: ["proc-q1", "proc-q7"],
    },
    { id: "specs", title: "Spec Writing & Compliance", qaIds: ["proc-q2"] },
    {
      id: "platforms",
      title: "Standardization & Lifecycle",
      qaIds: ["proc-q3", "proc-q6"],
    },
    { id: "support", title: "Warranty & Support", qaIds: ["proc-q4"] },
    { id: "planning", title: "Lead Times & Funding", qaIds: ["proc-q5"] },
    { id: "pilots", title: "Pilots & Demos", qaIds: ["proc-q8"] },
  ],
  terms: ["TCO", "RFQ", "Cooperative Contracts", "KPI"],
  relatedSlugs: ["fit-compliance", "controls-101"],
  factCardTitle: "MTech value",
  factCardBullets: [
    "Ohio-built ARM packages",
    "Midwest service, parts & training",
    "Cooperative purchasing support",
  ],
};
