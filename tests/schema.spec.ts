import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

async function getJsonLdTypes(page: import("@playwright/test").Page) {
  const handles = await page.locator('script[type="application/ld+json"]').all();
  const texts = await Promise.all(handles.map(async h => (await h.textContent()) || ""));
  const types: string[] = [];
  for (const t of texts) {
    try {
      const json = JSON.parse(t);
      if (Array.isArray(json)) {
        for (const item of json) {
          if (item["@type"]) types.push(String(item["@type"]));
        }
      } else if (json && typeof json === "object") {
        if (json["@type"]) types.push(String(json["@type"]));
      }
    } catch {
      // ignore parse errors
    }
  }
  return types;
}

test.describe("Schema JSON-LD", () => {
  test("section page includes FAQPage JSON-LD", async ({ page }) => {
    await page.goto(BASE_URL + "section/plows-101", { waitUntil: "domcontentloaded" });
    const types = await getJsonLdTypes(page);
    expect(types.some(t => /FAQPage/i.test(t))).toBeTruthy();
  });

  test("section with checklist includes HowTo JSON-LD", async ({ page }) => {
    await page.goto(BASE_URL + "section/fit-compliance", { waitUntil: "domcontentloaded" });
    const types = await getJsonLdTypes(page);
    expect(types.some(t => /HowTo/i.test(t))).toBeTruthy();
  });
});
