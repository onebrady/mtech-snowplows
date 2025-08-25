import { type KnowledgeSection } from "../types";

export const TelematicsMaintenance: KnowledgeSection = {
  slug: "telematics-maintenance",
  title: "Telematics & Predictive Maintenance",
  preview: "Proof-of-service and live status monitoring",
  icon: "Signal",
  qas: [
    {
      id: "tele-q1",
      question: "What proof-of-service should we capture?",
      answer:
        "GPS breadcrumb, blade up/down, spreader on/off, and rate setpoint. Tie events to timestamps for defensible records.",
    },
    {
      id: "tele-q2",
      question: "Which sensors matter for uptime?",
      answer:
        "Hydraulic pressure/temperature, pump current, and controller faults. Early alerts prevent route failures.",
    },
    {
      id: "tele-q3",
      question: "How to integrate with our existing AVL?",
      answer:
        "Export core events via CAN/serial or REST. Map to your AVL fields; avoid duplicate GPS sources.",
    },
    {
      id: "tele-q4",
      question: "Predictive maintenance—what's practical?",
      answer:
        "Track motor duty cycles and valve actuations to schedule service before failures; monitor hydraulic temps for cooling needs.",
    },
    {
      id: "tele-q5",
      question: "Data retention and privacy?",
      answer:
        "Retain raw events for the season plus one audit year. Limit personally identifiable driver data to what's necessary.",
    },
    {
      id: "tele-q6",
      question: "Lane coverage and cycle times?",
      answer:
        "Use coverage estimations to plan beats and measure clearing progress versus targets during events.",
    },
    {
      id: "tele-q7",
      question: "What about driver coaching?",
      answer:
        "Dash prompts and after-action reviews (speeds, idles, rates) reduce salt use and improve safety.",
    },
    {
      id: "tele-q8",
      question: "Who owns the data?",
      answer:
        "Your municipality should own the data, with clear contracts on export formats and retention.",
    },
  ],
  groups: [
    {
      id: "proof",
      title: "Proof-of-Service & Governance",
      qaIds: ["tele-q1", "tele-q5", "tele-q8"],
    },
    { id: "sensors", title: "Sensors & Health Monitoring", qaIds: ["tele-q2"] },
    {
      id: "integration",
      title: "Integration (AVL & Data)",
      qaIds: ["tele-q3"],
    },
    { id: "predictive", title: "Predictive Maintenance", qaIds: ["tele-q4"] },
    {
      id: "coverage",
      title: "Coverage & Coaching",
      qaIds: ["tele-q6", "tele-q7"],
    },
  ],
  terms: ["AVL", "CAN Bus", "Predictive Maintenance", "Duty Cycle"],
  hasLaneCoverageTool: true,
  relatedSlugs: ["controls-101", "environmental-compliance"],
};
