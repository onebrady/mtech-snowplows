import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("equipment section has Salt Usage tool and downloads", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/equipment`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Salt Usage Quick-Check/)).toBeVisible();
  await expect(page.getByText(/Downloads/)).toBeVisible();
});

test("technology section has Lane Coverage tool", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/technology`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Lane Coverage Estimator/)).toBeVisible();
});

test("terms chips render for equipment section", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/equipment`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Key Terms/)).toBeVisible();
});
