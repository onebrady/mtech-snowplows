import { type KnowledgeSection } from "../../types";

export const Spreaders101: KnowledgeSection = {
  slug: "spreaders-101",
  title: "Spreaders & De-icing 101",
  preview: "Why an under-tailgate like the TG-505?",
  icon: "Siren",
  qas: [
    {
      id: "spreaders-q1",
      question: "Why an under-tailgate like the TG-505?",
      answer:
        "Under-tailgates keep your dump bed open for hauling and handle winter salt plus off-season aggregates. TG-505 adds stainless construction and clean mounting.",
    },
    {
      id: "spreaders-q2",
      question: "What's my target application rate?",
      answer:
        "Set lbs/lane-mile by route priority, pavement temperature, and storm phase. Adjust down with pre-wetting or anti-icing when appropriate.",
    },
    {
      id: "spreaders-q3",
      question: "How do we calibrate correctly?",
      answer:
        "Time output at a set auger speed, weigh material, and tune controller tables to hit your target rate at cruise speed.",
    },
    {
      id: "spreaders-q4",
      question: "Spinner vs. chute—how does pattern control work?",
      answer:
        "Spinner diameter, baffling, and gate opening shape the pattern. Use deflectors for sidewalks/medians; keep salt off lawns and waterways.",
    },
    {
      id: "spreaders-q5",
      question: "Liquids: pre-wet vs. anti-ice?",
      answer:
        "<strong>Pre-wet:</strong> sprays brine onto salt at the spinner to reduce bounce and improve activation. <strong>Anti-ice:</strong> applies brine before storms to prevent bonding—use on high-priority routes and bridges.",
    },
    {
      id: "spreaders-q6",
      question: "Material choice—rock salt vs. blends?",
      answer:
        "Rock salt is most common. Blends with calcium/magnesium work at lower temps but cost more; sand adds traction but increases cleanup and stormwater load.",
    },
    {
      id: "spreaders-q7",
      question: "Maintenance that preserves accuracy?",
      answer:
        "Clean and dry post-storm, inspect harnesses, check encoder and gate positions, and lube bearings. Replace worn flighting to keep feed consistent.",
    },
    {
      id: "spreaders-q8",
      question: "What telemetry should I log?",
      answer:
        "Rate setpoint, ground speed, actual output (if measured), liquid on/off, and spinner state. Log GPS with time for proof-of-service and compliance.",
    },
  ],
  terms: [
    "Pre-wet",
    "Brine",
    "Application Rate",
    "Swath",
    "Bounce/Scatter",
    "Closed-loop",
    "Stainless 304",
    "Spinner Shield",
  ],
  hasSaltUsageTool: true,
  relatedSlugs: ["environmental-compliance", "controls-101"],
  downloads: [
    {
      label: "TG-505 Under-tailgate Spreader",
      href: "https://www.truckcorpllc.com/wp-content/uploads/2021/06/2021-TG-505-Spreader-Literature.pdf",
    },
    {
      label: "ARM Spreaders PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Spreaders.pdf",
    },
  ],
};
