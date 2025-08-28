import { type KnowledgeSection } from "../types";

export const Integration: KnowledgeSection = {
  slug: "integration",
  title: "Integration",
  preview: "Controls, mounting, and chassis compliance",
  icon: "Settings",
  qas: [
    // Controls Q&As
    {
      id: "controls-q1",
      question: "What is Olympus?",
      answer:
        'An integrated plow/spreader/dump control platform with a 12" touch display and a 2-axis joystick. One harness, one brain, less troubleshooting.',
    },
    {
      id: "controls-q2",
      question: "Why integrated vs. piecemeal?",
      answer:
        "Unified wiring, shared diagnostics, and faster upfits; features added via configuration, not rewiring.",
    },
    {
      id: "controls-q3",
      question: "Operator UX highlights",
      answer:
        "Dead-man trigger, day/night modes, glove-friendly targets, and logical function grouping reduce errors in storms.",
    },
    {
      id: "controls-q4",
      question: "How do presets and interlocks help?",
      answer:
        "Route presets set rates and blade modes in one tap. Interlocks prevent unsafe combos (e.g., travel speed with wing extended).",
    },
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
    {
      id: "controls-q7",
      question: "Installation considerations?",
      answer:
        "Protect harness runs, use drip loops, avoid pinch points, and label connections. Allow service access around hydraulic valves.",
    },
    {
      id: "controls-q8",
      question: "Training the crew—what matters most?",
      answer:
        "Keep it hands-on. Cover presets, safe recovery from faults, and how to run manual overrides if needed.",
    },
    // Fit & Compliance Q&As
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
    {
      id: "control-systems",
      title: "Control Systems",
      qaIds: ["controls-q1", "controls-q2"],
    },
    {
      id: "installation-setup",
      title: "Installation & Setup",
      qaIds: ["controls-q7", "controls-q5"],
    },
    {
      id: "chassis-mounting",
      title: "Chassis & Mounting",
      qaIds: ["fit-q1", "fit-q2", "fit-q5"],
    },
    {
      id: "power-systems",
      title: "Power Systems",
      qaIds: ["fit-q7", "controls-q6"],
    },
    {
      id: "compliance-documentation",
      title: "Compliance & Documentation",
      qaIds: ["fit-q3", "fit-q4", "fit-q6", "fit-q8"],
    },
    {
      id: "operation-training",
      title: "Operation & Training",
      qaIds: ["controls-q3", "controls-q4", "controls-q8"],
    },
  ],
  terms: [
    "Preset",
    "Interlock", 
    "CAN Bus",
    "PWM",
    "Joystick",
    "GVWR",
    "FAWR",
    "RAWR",
    "PTO",
    "FMVSS",
  ],
  relatedSlugs: ["equipment", "technology", "procurement"],
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
      label: "Olympus Controls Manual",
      href: "/wp-content/uploads/2025/05/Olympus_Hydraulic_Control_System_v1-1.pdf",
    },
    {
      label: "ARM Dump Body PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Dump-Body.pdf",
    },
  ],
};