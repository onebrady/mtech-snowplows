import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Quiz logic (test hook)", () => {
  test("deterministic primary selection", async ({ page }) => {
    await page.goto(BASE_URL + "quiz", { waitUntil: "domcontentloaded" });

    const A = await page.evaluate(() => {
      // @ts-expect-error window test hook
      return window.__quizCompute?.({
        primary_environment: "urban",
        vehicle_class: "heavy",
        obstacle_frequency: "frequent",
      })?.primary;
    });
    const B = await page.evaluate(() => {
      // @ts-expect-error window test hook
      return window.__quizCompute?.({
        primary_environment: "highway",
        vehicle_class: "heavy",
      })?.primary;
    });
    const C = await page.evaluate(() => {
      // @ts-expect-error window test hook
      return window.__quizCompute?.({ vehicle_class: "medium" })?.primary;
    });
    const D = await page.evaluate(() => {
      // @ts-expect-error window test hook
      return window.__quizCompute?.({ required_capabilities: "complete" })
        ?.primary;
    });

    expect(A).toBe("A");
    expect(B).toBe("B");
    expect(C).toBe("C");
    expect(D).toBe("D");
  });
});
