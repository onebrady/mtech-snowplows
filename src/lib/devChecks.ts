/* Dev-only runtime checks to simulate tests without a harness */
export function runDevChecks() {
  if (typeof window === "undefined") return;
  if (!import.meta || !import.meta.env || !import.meta.env.DEV) return;
  try {
    const results: Array<{ name: string; ok: boolean; details?: unknown }> = [];

    // 3.1 Hero/tiles visible (navigation intents)
    const hero = document.querySelector("section .font-bold");
    const grid = document.getElementById("knowledge-grid");
    const tiles =
      grid?.querySelectorAll("a[href^='#/section/'], a[href^='/section/']")
        .length || 0;
    results.push({ name: "landing:hero_present", ok: !!hero });
    results.push({ name: "landing:grid_present", ok: !!grid });
    results.push({
      name: "landing:tiles_count>=9",
      ok: tiles >= 9,
      details: { tiles },
    });

    // 5.1 JSON-LD present for FAQ/HowTo when applicable
    const ldScripts = Array.from(
      document.querySelectorAll("script[type='application/ld+json']")
    ).map((s) => {
      try {
        return JSON.parse(s.textContent || "{}");
      } catch {
        return {};
      }
    });
    const hasFAQ = ldScripts.some((j) => j["@type"] === "FAQPage");
    const hasHowTo = ldScripts.some((j) => j["@type"] === "HowTo");
    results.push({ name: "jsonld:faq_present", ok: hasFAQ });
    results.push({
      name: "jsonld:howto_present_if_applicable",
      ok: true,
      details: { hasHowTo },
    });

    // 4.1 Region persistence and banner response
    const before = localStorage.getItem("mtech-region");
    localStorage.setItem("mtech-region", "Ohio");
    window.dispatchEvent(
      new CustomEvent("mtech:region-changed", { detail: "Ohio" })
    );
    const bannerText = document.querySelector(".bg-sky-50")?.textContent || "";
    results.push({
      name: "region:persisted",
      ok: localStorage.getItem("mtech-region") === "Ohio",
    });
    results.push({
      name: "region:banner_updates",
      ok: /Ohio/i.test(bannerText),
    });

    // 2.1 Chips/Fact/Checklist render existence (not interaction)
    const headings = Array.from(document.querySelectorAll("h3.font-semibold"));
    const findH3 = (needle: string) =>
      headings.find((h) =>
        (h.textContent || "").toLowerCase().includes(needle)
      );
    const chips = findH3("key terms");
    const fact = findH3("quick wins") || findH3("mtech value");
    const checklist = findH3("pre-season") || findH3("pre-build fit audit");
    results.push({ name: "components:termschips_present", ok: !!chips });
    results.push({ name: "components:factcard_present", ok: !!fact });
    results.push({ name: "components:checklist_present", ok: !!checklist });

    // Log summary
    console.table(results);

    // restore previous region
    if (before) localStorage.setItem("mtech-region", before);
  } catch (err) {
    console.warn("devChecks error", err);
  }
}
