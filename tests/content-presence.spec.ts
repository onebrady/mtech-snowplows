import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

const SECTION_SLUGS = [
  "equipment",
  "integration",
  "operations",
  "environment",
  "procurement",
  "technology",
];

test.describe("Content presence", () => {
  test("Q&A content renders with groups or >=3 rows across sections", async ({
    page,
  }) => {
    for (const slug of SECTION_SLUGS) {
      await page.goto(BASE_URL + "section/" + slug, {
        waitUntil: "domcontentloaded",
      });
      await page.waitForTimeout(300);

      const groupHeadings = page.getByRole("heading", { level: 3 });
      const rows = page.getByTestId("qa-row");
      const gCount = await groupHeadings.count();
      const rCount = await rows.count();
      expect(gCount > 0 || rCount >= 3).toBeTruthy();
    }
  });

  test("TermsChips present on Technology section", async ({ page }) => {
    await page.goto(BASE_URL + "section/technology", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { level: 3, name: /key terms/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /AVL/i })).toBeVisible();
  });

  test("FactCard present on Environment section", async ({ page }) => {
    await page.goto(BASE_URL + "section/environment", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { level: 3, name: /quick wins/i })
    ).toBeVisible();
    await expect(
      page.getByText("Pre-wet to reduce bounce/scatter")
    ).toBeVisible();
  });

  test("Checklist present on Integration section", async ({ page }) => {
    await page.goto(BASE_URL + "section/integration", {
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
