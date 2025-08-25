import { type KnowledgeSection } from "../types";

export const RegionalSnapshots: KnowledgeSection = {
  slug: "regional-snapshots",
  title: "Regional Snapshots",
  preview: "OH/MI/PA-W/IN/KY specific requirements",
  icon: "Map",
  qas: [
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
        "Include a ‘Regional Considerations’ appendix referencing climate, terrain, and maintenance practices with measurable requirements.",
    },
  ],
  groups: [
    { id: "oh", title: "Ohio", qaIds: ["region-q1"] },
    { id: "mi", title: "Michigan", qaIds: ["region-q2"] },
    { id: "paw", title: "Pennsylvania – West", qaIds: ["region-q3"] },
    { id: "in", title: "Indiana", qaIds: ["region-q4"] },
    { id: "ky", title: "Kentucky", qaIds: ["region-q5"] },
    { id: "materials", title: "Materials & Brine", qaIds: ["region-q6"] },
    {
      id: "specs",
      title: "Spec & RFP Notes",
      qaIds: ["region-q7", "region-q8"],
    },
  ],
  terms: ["Lake-Effect", "Brine", "Drift Knife", "Priority Routes"],
  relatedSlugs: ["plows-101", "environmental-compliance"],
};
