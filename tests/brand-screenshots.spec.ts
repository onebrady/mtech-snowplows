import { test } from "@playwright/test";

test("screenshot: mtech website", async ({ page }) => {
  await page.goto("https://www.mtechcompany.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: "tests/__screenshots__/mtech-home.png",
    fullPage: true,
  });
});

test("screenshot: local landing", async ({ page }) => {
  await page.goto(process.env.BASE_URL || "http://localhost:5173/#/", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "tests/__screenshots__/local-landing.png",
    fullPage: true,
  });
});
