import { type KnowledgeSection } from "../types";

export const SafetyTraining: KnowledgeSection = {
  slug: "safety-training",
  title: "Safety, Training & Certifications",
  preview: "Core winter safety priorities for fleet operations",
  icon: "ShieldCheck",
  qas: [
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
  ],
  terms: ["PPE", "Three-Point Contact", "NIMS", "ICS"],
  relatedSlugs: ["plows-101", "telematics-maintenance"],
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
