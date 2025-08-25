import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test("jumpnav keyboard and active state", async ({ page }) => {
  await page.goto(`${BASE_URL}/#/section/spreaders-101`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByTestId("jumpnav")).toBeVisible();

  // Buttons should be focusable and reflect aria-current when clicked
  const materialsBtn = page.getByRole("button", {
    name: "Materials & Liquids",
  });
  await materialsBtn.click();
  await expect(materialsBtn).toHaveAttribute("aria-current", "true");

  // Tab through ensures focus lands on jump buttons
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  const active = await page.evaluate(() =>
    document.activeElement?.textContent?.trim()
  );
  expect(active && active.length > 0).toBeTruthy();
});
