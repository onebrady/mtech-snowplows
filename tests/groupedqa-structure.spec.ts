import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("grouped qa renders with expected groups and rows", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/spreaders-101`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForSelector("h1:text('Spreaders & De-icing 101')");

  // Expect group titles to exist
  await expect(
    page.getByRole("heading", { level: 3, name: /Equipment Selection/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: /Application Rates/ })
  ).toBeVisible();

  // Expect at least 8 Q/A rows total
  const rows = page.getByTestId("qa-row");
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(8);
});
