import { test } from "@playwright/test";

test("screenshot: current landing page with new 6-section structure", async ({ page }) => {
  await page.goto("http://localhost:5173/", {
    waitUntil: "domcontentloaded",
  });
  
  // Wait for the knowledge grid to load
  await page.waitForSelector('[data-testid="knowledge-grid"], .knowledge-grid, .grid');
  
  // Give time for fonts/theme to apply
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: "tests/__screenshots__/current-landing-6-sections.png",
    fullPage: true,
  });
});

test("screenshot: current landing page mobile with new 6-section structure", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("http://localhost:5173/", {
    waitUntil: "domcontentloaded",
  });
  
  // Wait for the knowledge grid to load
  await page.waitForSelector('[data-testid="knowledge-grid"], .knowledge-grid, .grid');
  
  // Give time for fonts/theme to apply
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: "tests/__screenshots__/mobile-current-landing-6-sections.png",
    fullPage: true,
  });
});