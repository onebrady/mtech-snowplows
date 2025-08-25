import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("plows-101 group titles order", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/plows-101`, {
    waitUntil: "domcontentloaded",
  });
  const titles = await page
    .locator('[data-testid="group-title"]')
    .allTextContents();
  expect(titles[0]).toMatch(/Plow Types/i);
  expect(titles[1]).toMatch(/Sizing/i);
});

test("controls-101 group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/controls-101`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Overview & Rationale/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Operation & UX/ })
  ).toBeVisible();
});

test("fit-compliance group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/fit-compliance`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Weights & Loads/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Hydraulics & Power/ })
  ).toBeVisible();
});

test("environmental-compliance group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/environmental-compliance`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Programs & Planning/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Strategy & Liquids/ })
  ).toBeVisible();
});
