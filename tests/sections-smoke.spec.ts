import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const slugs = [
  "equipment",
  "integration", 
  "operations",
  "environment",
  "procurement",
  "technology",
];

for (const slug of slugs) {
  test.describe(`${slug} smoke`, () => {
    test(`desktop: renders and has groups or QAs`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`${BASE_URL}/#/section/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      const h1 = page.locator("main h1");
      await expect(h1).toBeVisible();
      const groupHeadings = page.getByRole("heading", { level: 3 });
      const rows = page.getByTestId("qa-row");
      const gCount = await groupHeadings.count();
      const rCount = await rows.count();
      expect(gCount > 0 || rCount >= 3).toBeTruthy();
    });

    test(`mobile: sticky jumpnav visible when groups exist`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/#/section/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      const groupHeadings = page.getByRole("heading", { level: 3 });
      if (await groupHeadings.count()) {
        const jumpNav = page.locator("text=Jump to:");
        await expect(jumpNav).toBeVisible();
      }
    });
  });
}
