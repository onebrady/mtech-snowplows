import { type KnowledgeSection } from "../types";

export const Operations: KnowledgeSection = {
  slug: "operations",
  title: "Operations", 
  preview: "Safety, training, and regional best practices",
  icon: "ShieldCheck",
  qas: [
    // Safety & Training Q&As
    {
      id: "safe-q1",
      question: "Top operator safety practices in storms?",
      answer:
        "Three points of contact, spotter use in yards, reduced speeds, increased following distance, and no phone use while plowing.",
    },
    {
      id: "safe-q2",
      question: "Pre-trip checks to never skip?",
      answer:
        "Hydraulic leaks, lights/markers, plow pins, spinner free rotation, fluid levels, and functioning backup alarms.",
    },
    {
      id: "safe-q3",
      question: "Certification paths for operators?",
      answer:
        "State DOT/agency programs, vendor training on controls, and NIMS/ICS basics for coordinated storm response.",
    },
    {
      id: "safe-q4",
      question: "What PPE is recommended?",
      answer:
        "Hi-vis outerwear, winter-rated gloves and boots, hearing protection around hydraulics, and eye protection during maintenance.",
    },
    {
      id: "safe-q5",
      question: "Preventing backing incidents?",
      answer:
        "Use spotters when possible, rely on mirrors and cameras, and minimize unnecessary backing through route planning.",
    },
    {
      id: "safe-q6",
      question: "Fatigue management on long shifts?",
      answer:
        "Rotate beats, enforce rest, keep cab snacks/hydration, and use relief drivers on prolonged events.",
    },
    {
      id: "safe-q7",
      question: "Working around live traffic?",
      answer:
        "Arrow boards, cones, and clear comms. Avoid mid-lane stops; plan pull-offs for clearing sensors and checking equipment.",
    },
    {
      id: "safe-q8",
      question: "Post-storm debrief—what to cover?",
      answer:
        "Near misses, equipment failures, salt usage vs. targets, and route congestion to improve next operations.",
    },
    // Regional Snapshots Q&As
    {
      id: "region-q1",
      question: "Ohio—what should we prioritize?",
      answer:
        "Freeze–thaw and lake-effect bursts call for trip-edge plows, corrosion-resistant components, and strong anti-icing programs.",
    },
    {
      id: "region-q2",
      question: "Michigan—equipment notes?",
      answer:
        "Heavy lake-effect demands robust moldboards, wing options for wide corridors, and high-capacity hydraulics.",
    },
    {
      id: "region-q3",
      question: "Western Pennsylvania—terrain impacts?",
      answer:
        "Hills and microclimates favor V-plows, aggressive chains/tires, and precise rate control on grades.",
    },
    {
      id: "region-q4",
      question: "Indiana—wind and drift strategies?",
      answer:
        "Open corridors require taller boards, drift knives, and route plans that minimize crosswind exposure.",
    },
    {
      id: "region-q5",
      question: "Kentucky—ice storm readiness?",
      answer:
        "Mixed precipitation makes liquids and anti-icing critical. Ensure chainsaw/clearance kits for downed limbs.",
    },
    {
      id: "region-q6",
      question: "Brine usage—regional differences?",
      answer:
        "Colder northern routes lean to treated blends; transition climates balance brine with timely plowing to reduce total tons.",
    },
    {
      id: "region-q7",
      question: "Spec changes by district priority?",
      answer:
        "Urban arterials benefit from wing plows and quick-change edges; rural districts prioritize fuel capacity and lighting.",
    },
    {
      id: "region-q8",
      question: "Where to place regional notes in RFPs?",
      answer:
        "Include a 'Regional Considerations' appendix referencing climate, terrain, and maintenance practices with measurable requirements.",
    },
  ],
  groups: [
    {
      id: "operator-safety",
      title: "Operator Safety",
      qaIds: ["safe-q1", "safe-q4", "safe-q5", "safe-q7"],
    },
    {
      id: "training-certification",
      title: "Training & Certification", 
      qaIds: ["safe-q3", "safe-q6"],
    },
    {
      id: "regional-considerations",
      title: "Regional Considerations",
      qaIds: ["region-q1", "region-q2", "region-q3", "region-q4", "region-q5"],
    },
    {
      id: "operational-procedures",
      title: "Operational Procedures",
      qaIds: ["safe-q2", "safe-q8", "region-q6", "region-q7", "region-q8"],
    },
  ],
  terms: [
    "PPE",
    "Three-Point Contact", 
    "NIMS",
    "ICS",
    "Lake-Effect",
    "Brine",
    "Drift Knife",
    "Priority Routes",
  ],
  relatedSlugs: ["equipment", "integration", "environment"],
  checklist: {
    title: "Pre-season inspection checklist",
    items: [
      "Hoses, connectors, and hydraulic leaks",
      "Cutting edges, trip springs, wing pins",
      "Spinner bearings and auger flighting", 
      "Tank lines and pre-wet plumbing",
      "Joystick trigger and controller self-test",
      "Backup cameras, lights, and mirrors",
    ],
  },
};