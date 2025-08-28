import { type KnowledgeSection } from "../types";

export const Technology: KnowledgeSection = {
  slug: "technology",
  title: "Technology", 
  preview: "Data systems and predictive maintenance",
  icon: "Signal",
  qas: [
    // Core telematics Q&As
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
      id: "tele-q8",
      question: "Who owns the data?",
      answer:
        "Your municipality should own the data, with clear contracts on export formats and retention.",
    },
    // Diagnostic capabilities from controls
    {
      id: "controls-q5",
      question: "Diagnostics and serviceability?",
      answer:
        "On-screen faults, I/O status views, and event logs speed troubleshooting. Standardized modules simplify spares and training.",
    },
    {
      id: "controls-q6",
      question: "Can it integrate with telematics?",
      answer:
        "Yes—export key events and rates via CAN/serial for proof-of-service, work orders, and compliance reporting.",
    },
  ],
  groups: [
    {
      id: "data-monitoring",
      title: "Data & Monitoring",
      qaIds: ["tele-q1", "tele-q2"],
    },
    {
      id: "predictive-maintenance",
      title: "Predictive Maintenance", 
      qaIds: ["tele-q4", "controls-q5"],
    },
    {
      id: "system-integration",
      title: "System Integration",
      qaIds: ["tele-q3", "controls-q6"],
    },
    {
      id: "analytics-governance",
      title: "Analytics & Governance",
      qaIds: ["tele-q5", "tele-q8"],
    },
  ],
  terms: ["AVL", "CAN Bus", "Predictive Maintenance", "Duty Cycle", "PWM", "Diagnostics"],
  hasLaneCoverageTool: true,
  relatedSlugs: ["integration", "procurement", "environment"],
};