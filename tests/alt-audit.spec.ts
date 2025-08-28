import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

async function assertAllImgsHaveAlt(page: import("@playwright/test").Page) {
  const imgs = await page.locator("img").all();
  for (const img of imgs) {
    const alt = await img.getAttribute("alt");
    // Decorative images can be empty alt; but we expect descriptive alt for content images
    expect(alt).not.toBeNull();
    if (alt) expect(alt.length).toBeGreaterThanOrEqual(3);
  }
}

test.describe("Alt text audit", () => {
  test("landing page images have alt text", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await assertAllImgsHaveAlt(page);
  });

  test("section page images have alt text", async ({ page }) => {
    await page.goto(BASE_URL + "section/equipment", {
      waitUntil: "domcontentloaded",
    });
    await assertAllImgsHaveAlt(page);
  });
});
