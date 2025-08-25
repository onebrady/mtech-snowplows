import { test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const slugs = [
  "plows-101",
  "spreaders-101",
  "controls-101",
  "fit-compliance",
  "environmental-compliance",
  "telematics-maintenance",
  "safety-training",
  "procurement-fleet",
  "regional-snapshots",
];

for (const slug of slugs) {
  test(`screenshot: ${slug}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${BASE_URL}/#/section/${slug}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `tests/__screenshots__/${slug}.png`,
      fullPage: true,
    });
  });

  test(`screenshot mobile: ${slug}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/#/section/${slug}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `tests/__screenshots__/mobile-${slug}.png`,
      fullPage: true,
    });
  });
}
