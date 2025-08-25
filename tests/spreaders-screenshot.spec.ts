import { test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("screenshot: spreaders-101 section", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/spreaders-101`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForSelector("h1:text('Spreaders & De-icing 101')");
  // give time for fonts/theme to apply
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "tests/__screenshots__/spreaders-101.png",
    fullPage: true,
  });
});
