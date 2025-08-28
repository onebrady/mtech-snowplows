import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Downloads", () => {
  test("Integration section shows downloads with labels and target", async ({
    page,
  }) => {
    await page.goto(BASE_URL + "section/integration", {
      waitUntil: "domcontentloaded",
    });
    const header = page.getByRole("heading", { level: 3, name: /downloads/i });
    await expect(header).toBeVisible();
    const links = page.locator("ul li a");
    await expect(links).toHaveCount(2); // Integration section has downloads from both controls and fit-compliance
    await expect(links.first()).toHaveAttribute("target", "_blank");
    await expect(links.first()).toHaveText(/pdf/i);
  });
});
