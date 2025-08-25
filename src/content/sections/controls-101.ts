import { type KnowledgeSection } from "../types";

export const Controls101: KnowledgeSection = {
  slug: "controls-101",
  title: "Controls (Olympus) 101",
  preview: "Integrated vs. piecemeal control systems",
  icon: "Sliders",
  qas: [
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
  ],
  groups: [
    {
      id: "overview",
      title: "Overview & Rationale",
      qaIds: ["controls-q1", "controls-q2"],
    },
    {
      id: "operation",
      title: "Operation & UX",
      qaIds: ["controls-q3", "controls-q4"],
    },
    {
      id: "service",
      title: "Diagnostics & Serviceability",
      qaIds: ["controls-q5", "controls-q7"],
    },
    {
      id: "integration",
      title: "Telematics & Integration",
      qaIds: ["controls-q6"],
    },
    { id: "training", title: "Training & Adoption", qaIds: ["controls-q8"] },
  ],
  terms: ["Preset", "Interlock", "CAN Bus", "PWM", "Joystick"],
  relatedSlugs: ["telematics-maintenance", "plows-101"],
  downloads: [
    {
      label: "Olympus Controls Manual",
      href: "/wp-content/uploads/2025/05/Olympus_Hydraulic_Control_System_v1-1.pdf",
    },
  ],
};
