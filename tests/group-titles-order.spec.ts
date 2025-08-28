import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("equipment section group titles order", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/equipment`, {
    waitUntil: "domcontentloaded",
  });
  const titles = await page
    .locator('[data-testid="group-title"]')
    .allTextContents();
  expect(titles[0]).toMatch(/Plow Types/i);
  expect(titles[1]).toMatch(/Spreader Systems|Sizing/i);
});

test("integration section group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/integration`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Control Systems|Overview & Rationale/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Installation & Setup|Operation & UX/ })
  ).toBeVisible();
});

test("integration section chassis group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/integration`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Chassis & Mounting|Weights & Loads/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Power Systems|Hydraulics & Power/ })
  ).toBeVisible();
});

test("environment section group titles present", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/environment`, {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { level: 3, name: /Salt Management Plans|Programs & Planning/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Application Strategy|Strategy & Liquids/ })
  ).toBeVisible();
});
