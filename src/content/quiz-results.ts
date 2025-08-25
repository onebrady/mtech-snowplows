import type { ResultContent } from "../components/quiz/ResultCard";

// PRD-mapped result content
export const QUIZ_RESULTS: Record<"A" | "B" | "C" | "D", ResultContent> = {
  A: {
    code: "A",
    title: "Urban Streets Configuration (Trip-Edge + TG-505 + Olympus)",
    why:
      "Trip-edge maintains your load over curbs/manholes; TG-505 enables immediate deicing with unified controls.",
    bullets: [
      "Trip-edge prevents load loss on impact",
      "Municipal Hardox® construction",
      "Edge options: steel/rubber/poly/carbide",
      "Stainless TG-505; integrated Olympus controls",
    ],
    literature: [
      { label: "ARM Snow Plows PDF", url: "/downloads" },
      {
        label: "TG-505 Spreader PDF",
        url: "https://www.truckcorpllc.com/wp-content/uploads/2021/06/2021-TG-505-Spreader-Literature.pdf",
      },
      { label: "Olympus Controls PDF", url: "/downloads" },
    ],
  },
  B: {
    code: "B",
    title: "Highways/Wide Areas (Front + Side Wing + TG-505 + Olympus)",
    why:
      "Wing plow multiplies clearing width; integrated system enables one-pass plow + treat operations.",
    bullets: [
      "Hydraulic wing to 12–16 ft total width",
      "High-curve moldboard reduces blow-back",
      "TG-505 for material application",
      "Olympus manages all functions",
    ],
    literature: [
      { label: "ARM Snow Plows PDF", url: "/downloads" },
      {
        label: "TG-505 Spreader PDF",
        url: "https://www.truckcorpllc.com/wp-content/uploads/2021/06/2021-TG-505-Spreader-Literature.pdf",
      },
      { label: "Olympus Controls PDF", url: "/downloads" },
    ],
  },
  C: {
    code: "C",
    title: "Medium-Duty Configuration (Full-Trip + Compact TG-505)",
    why:
      "Full-trip dynamics reduce stress on lighter front axles while maintaining pro clearing capability.",
    bullets: [
      "Scaled 7–9 ft municipal-grade plow",
      "Full-trip protects lighter chassis",
      "Compact TG-505 keeps GVWR in check",
      "Compatible with existing hydraulics",
    ],
    literature: [
      { label: "ARM Snow Plows PDF", url: "/downloads" },
      { label: "TG-505 Spreader PDF", url: "/downloads" },
    ],
  },
  D: {
    code: "D",
    title: "Complete Winter Maintenance (Trip-Edge + Underbody + TG-505 + Olympus)",
    why:
      "Single-truck solution handles plow, hard-pack scraping, and immediate treatment with unified controls.",
    bullets: [
      "Trip-edge front plow for obstacle-heavy routes",
      "Underbody scraper for hard pack/ice",
      "TG-505 stainless spreader",
      "Complete Olympus integration",
    ],
    literature: [
      { label: "Complete Equipment Package PDF", url: "/downloads" },
      { label: "Olympus Controls PDF", url: "/downloads" },
      { label: "ARM Dump Body PDF", url: "/downloads" },
    ],
  },
};


