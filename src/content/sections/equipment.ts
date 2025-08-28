import { type KnowledgeSection } from "../types";

export const Equipment: KnowledgeSection = {
  slug: "equipment",
  title: "Equipment",
  preview: "Plows, spreaders, and core equipment basics",
  icon: "Snowflake",
  qas: [
    // Plow Q&As
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
    // Spreader Q&As
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
  groups: [
    {
      id: "plow-types",
      title: "Plow Types & Dynamics",
      qaIds: ["plows-q1", "plows-q2"],
    },
    {
      id: "spreader-systems",
      title: "Spreader Systems",
      qaIds: ["spreaders-q1", "spreaders-q4"],
    },
    {
      id: "sizing-selection",
      title: "Sizing & Selection",
      qaIds: ["plows-q3", "spreaders-q2", "spreaders-q3"],
    },
    {
      id: "materials-components",
      title: "Materials & Components",
      qaIds: ["plows-q4", "plows-q7", "spreaders-q6"],
    },
    {
      id: "application-basics",
      title: "Application Basics",
      qaIds: ["spreaders-q5", "spreaders-q7", "spreaders-q8"],
    },
    {
      id: "hydraulics-mounting",
      title: "Hydraulics & Mounting",
      qaIds: ["plows-q5", "plows-q6", "plows-q8"],
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
  relatedSlugs: ["integration", "operations", "procurement"],
  downloads: [
    {
      label: "ARM Snow Plows PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Snow-Plows.pdf",
    },
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