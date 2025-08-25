import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

const STORAGE_KEY = "mtech-region";

test.describe("Region persistence & banner", () => {
  test("selector persists region and banner updates", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // Set to Ohio
    await page.selectOption("select", { label: "Ohio" });

    // Verify localStorage saved
    const saved = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY
    );
    expect(saved).toBe("Ohio");

    // Banner should appear with Ohio text
    const banner = page.locator(".bg-sky-50");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/Ohio/i);

    // Change to Michigan, text changes
    await page.selectOption("select", { label: "Michigan" });
    await expect(banner).toContainText(/Michigan/i);

    // Change to Other, banner disappears
    await page.selectOption("select", { label: "Other" });
    await expect(banner).toHaveCount(0);
  });
});
