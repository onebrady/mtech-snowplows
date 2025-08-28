import { type KnowledgeSection } from "../../types";

export const FitCompliance: KnowledgeSection = {
  slug: "fit-compliance",
  title: "Fit & Compliance (Commercial)",
  preview: "Chassis & axles—what's non-negotiable?",
  icon: "Scale",
  qas: [
    {
      id: "fit-q1",
      question: "What are the must-checks for GVWR and axle loads?",
      answer:
        "Confirm installed plow/spreader weights vs. front axle rating (FAWR) and rear axle rating (RAWR) with full fuel and operator. Maintain reserve for cargo and liquids.",
    },
    {
      id: "fit-q2",
      question: "Frame rail and PTO considerations?",
      answer:
        "Check frame section modulus for wing posts/underbody scrapers. Verify PTO clearance, torque, and hydraulic pump sizing for combined loads.",
    },
    {
      id: "fit-q3",
      question: "Lighting and visibility compliance?",
      answer:
        "Meet FMVSS/CMVSS with auxiliary lights correctly aimed; ensure plow markers and heated mirrors for poor visibility.",
    },
    {
      id: "fit-q4",
      question: "What about corrosion protection?",
      answer:
        "Use stainless or coated components where possible, apply dielectric grease to connectors, and spec undercoating in severe salt regions.",
    },
    {
      id: "fit-q5",
      question: "Transport and height limits?",
      answer:
        "Confirm transport width and height with wings stowed and dump body lowered. Follow state oversize rules when applicable.",
    },
    {
      id: "fit-q6",
      question: "Operator ergonomics for long shifts?",
      answer:
        "Seat/joystick positioning, visibility over plow, heated seats, and reduced noise/vibration improve safety and retention.",
    },
    {
      id: "fit-q7",
      question: "Hydraulic capacity and heat management?",
      answer:
        "Size reservoir and coolers for simultaneous wing/underbody operations. Monitor return-line temperature; consider bypass during transport.",
    },
    {
      id: "fit-q8",
      question: "Documentation for audits?",
      answer:
        "Keep weight tickets, as-built wiring/hydraulic diagrams, and operator manuals with the vehicle file for DOT and insurance.",
    },
  ],
  groups: [
    { id: "weights", title: "Weights & Loads", qaIds: ["fit-q1", "fit-q5"] },
    {
      id: "hydraulics",
      title: "Hydraulics & Power",
      qaIds: ["fit-q2", "fit-q7"],
    },
    { id: "lighting", title: "Lighting & Visibility", qaIds: ["fit-q3"] },
    { id: "corrosion", title: "Materials & Corrosion", qaIds: ["fit-q4"] },
    { id: "ergonomics", title: "Ergonomics & Safety", qaIds: ["fit-q6"] },
    { id: "docs", title: "Documentation & Audits", qaIds: ["fit-q8"] },
  ],
  terms: ["GVWR", "FAWR", "RAWR", "PTO", "FMVSS"],
  relatedSlugs: ["plows-101", "procurement-fleet"],
  checklist: {
    title: "Pre-build fit audit & compliance",
    items: [
      "Verify FGAWR/GVWR with plow + ballast",
      "Hydraulics/PTO sizing for simultaneous ops",
      "Electrical loads and lighting integration",
      "Body materials and corrosion protection",
      "Controls integration plan (Olympus)",
      "Legal thresholds (CDL/DOT/weight class)",
      "Document approvals and as-built diagrams",
    ],
  },
  downloads: [
    {
      label: "ARM Dump Body PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Dump-Body.pdf",
    },
  ],
};
