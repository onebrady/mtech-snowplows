import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Trust & Breadcrumbs", () => {
  test("trust indicators render and are clickable", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const trustGroup = page.getByRole("group", { name: /trust indicators/i });
    await expect(trustGroup).toBeVisible();
    const buttons = trustGroup.getByRole("button");
    await expect(buttons).toHaveCount(3);
    await buttons.first().click();
  });

  test("section page shows breadcrumb trail", async ({ page }) => {
    await page.goto(BASE_URL + "section/plows-101", {
      waitUntil: "domcontentloaded",
    });
    const nav = page.getByRole("navigation", { name: /breadcrumb/i });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: /home/i })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: /knowledge hub/i })
    ).toBeVisible();
  });
});
