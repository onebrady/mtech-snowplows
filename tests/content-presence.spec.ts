import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

const SECTION_SLUGS = [
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

test.describe("Content presence", () => {
  test("Q&A list shows 3 then 8 across sections", async ({ page }) => {
    for (const slug of SECTION_SLUGS) {
      await page.goto(BASE_URL + "section/" + slug, {
        waitUntil: "domcontentloaded",
      });
      await page.waitForTimeout(300);

      const qas = page.locator("details.group");
      await expect(qas, `3 QAs visible initially for ${slug}`).toHaveCount(3);

      const toggle = page.getByRole("button", { name: /show more/i });
      if (await toggle.isVisible()) {
        await toggle.click();
        await page.waitForTimeout(150);
        await expect(
          page.locator("details.group"),
          `8 QAs after expand for ${slug}`
        ).toHaveCount(8);
      }
    }
  });

  test("TermsChips present on Telematics section", async ({ page }) => {
    await page.goto(BASE_URL + "section/telematics-maintenance", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { level: 3, name: /key terms/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /AVL/i })).toBeVisible();
  });

  test("FactCard present on Environmental Compliance", async ({ page }) => {
    await page.goto(BASE_URL + "section/environmental-compliance", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { level: 3, name: /quick wins/i })
    ).toBeVisible();
    await expect(
      page.getByText("Pre-wet to reduce bounce/scatter")
    ).toBeVisible();
  });

  test("Checklist present on Fit & Compliance", async ({ page }) => {
    await page.goto(BASE_URL + "section/fit-compliance", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { level: 3, name: /pre-build fit audit/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /print/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /download/i })).toBeVisible();

    const items = await page.locator("ol li").count();
    expect(items).toBeGreaterThanOrEqual(5);
  });
});
