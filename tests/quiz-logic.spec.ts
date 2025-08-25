import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Quiz logic (test hook)", () => {
  test("deterministic primary selection", async ({ page }) => {
    await page.goto(BASE_URL + "quiz", { waitUntil: "domcontentloaded" });

    const A = await page.evaluate(() => {
      // @ts-ignore
      return window.__quizCompute?.({ vehicle_class: "heavy", priority: "capacity" })?.primary;
    });
    const B = await page.evaluate(() => {
      // @ts-ignore
      return window.__quizCompute?.({ surface_type: "lot", priority: "precision" })?.primary;
    });
    const C = await page.evaluate(() => {
      // @ts-ignore
      return window.__quizCompute?.({ snow_amount: "gt6" })?.primary;
    });
    const D = await page.evaluate(() => {
      // @ts-ignore
      return window.__quizCompute?.({ salt_strategy: "liquid" })?.primary;
    });

    expect(A).toBe("A");
    expect(B).toBe("B");
    expect(C).toBe("C");
    expect(D).toBe("D");
  });
});


