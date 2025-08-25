import { type KnowledgeSection } from "../types";

export const PLows101: KnowledgeSection = {
  slug: "plows-101",
  title: "Plows 101",
  preview: "Trip-edge vs. full-trip—what's the practical difference?",
  icon: "Snowflake",
  qas: [
    {
      id: "plows-q1",
      question: "Trip-edge vs. full-trip—what's the practical difference?",
      answer:
        "Trip-edge plows let only the cutting edge give on impact, keeping your load and avoiding false trips in heavy, wet snow. Full-trip plows hinge the entire moldboard; they're gentler on the truck/driver on impact but can flip forward under load and need a reset. <strong>City grids:</strong> trip-edge. <strong>Smoother routes/lighter chassis:</strong> full-trip.",
    },
    {
      id: "plows-q2",
      question: "Straight, V, or Wing—when should I choose each?",
      answer:
        "<strong>Straight:</strong> simple and versatile. <strong>V-plow:</strong> breaks drifts/windrows with scoop/vee/straight modes. <strong>Side Wing:</strong> multiplies cleared width on arterials/highways and reduces passes.",
    },
    {
      id: "plows-q3",
      question: "How do I size moldboard width and height?",
      answer:
        "Match width to lane width and turning envelope; ensure the truck covers tire tracks when angled. Taller, more curved boards cast snow farther; lower profiles help intersection sightlines.",
    },
    {
      id: "plows-q4",
      question:
        "What cutting edge should we run (steel vs. carbide vs. rubber)?",
      answer:
        "<strong>Carbon steel:</strong> lowest cost, faster wear. <strong>Carbide-insert:</strong> highest life for heavy routes. <strong>Rubber/poly:</strong> quieter, protects surfaces (e.g., parking decks) but less aggressive.",
    },
    {
      id: "plows-q5",
      question: "Hydraulics: single vs. dual cylinders and float?",
      answer:
        "Dual-angle cylinders maintain authority under load and reduce drift. A properly set float lets the blade follow contours without overloading the frame; lock-out for transport.",
    },
    {
      id: "plows-q6",
      question: "Mount systems—what matters for uptime?",
      answer:
        "Quick-couple frames, positive pin engagement, and protected connectors speed changeovers. Stainless hardware and sealed connectors prevent corrosion; grease points accessible from ground.",
    },
    {
      id: "plows-q7",
      question: "How do plow shoes and curb guards affect performance?",
      answer:
        "Shoes lift the edge to spare surfaces during early/late season; curb guards protect end ribs from impacts. Remove shoes for full scraping during peak season.",
    },
    {
      id: "plows-q8",
      question: "What about backdragging and stacking?",
      answer:
        "Reinforced top ribs and proper attack angle help stacking. For backdragging docks/garages, consider a backdrag edge or V-plow in scoop mode to pull snow cleanly.",
    },
  ],
  groups: [
    {
      id: "types",
      title: "Plow Types & Dynamics",
      qaIds: ["plows-q1", "plows-q2"],
    },
    { id: "sizing", title: "Sizing & Geometry", qaIds: ["plows-q3"] },
    {
      id: "edges",
      title: "Edges & Accessories",
      qaIds: ["plows-q4", "plows-q7"],
    },
    {
      id: "hydraulics",
      title: "Hydraulics & Mounts",
      qaIds: ["plows-q5", "plows-q6"],
    },
    {
      id: "operations",
      title: "Operations (Backdrag & Stacking)",
      qaIds: ["plows-q8"],
    },
  ],
  terms: [
    "Trip-edge",
    "Full-trip",
    "Moldboard",
    "Cutting Edge",
    "Wing Plow",
    "Underbody Scraper",
    "Deflector",
    "Down-pressure",
  ],
  relatedSlugs: ["controls-101", "fit-compliance", "procurement-fleet"],
  downloads: [
    {
      label: "ARM Snow Plows PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Snow-Plows.pdf",
    },
  ],
};
