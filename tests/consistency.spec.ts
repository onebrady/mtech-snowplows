import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("spreaders-101 has Salt Usage tool and downloads", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/spreaders-101`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Salt Usage Quick-Check/)).toBeVisible();
  await expect(page.getByText(/Downloads/)).toBeVisible();
});

test("telematics-maintenance has Lane Coverage tool", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/telematics-maintenance`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Lane Coverage Estimator/)).toBeVisible();
});

test("terms chips render for plows-101", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/plows-101`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByText(/Key Terms/)).toBeVisible();
});
