import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Media attributes", () => {
  test("hero picture has webp source and img with alt/loading/sizes", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const picture = page.locator("section.bg-hero picture");
    await expect(picture).toBeVisible();

    const webpSource = picture.locator('source[type="image/webp"]');
    await expect(webpSource).toHaveCount(1);

    const img = picture.locator("img");
    await expect(img).toHaveAttribute("alt", /plow|snow|ARM|municipal/i);
    await expect(img).toHaveAttribute("loading", /lazy|eager/i);
    await expect(img).toHaveAttribute("sizes", /.*/);
  });
});
