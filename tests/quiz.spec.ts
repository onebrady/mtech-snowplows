import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Quiz flow", () => {
  test("complete flow and see results + analytics", async ({ page }) => {
    await page.addInitScript(() => {
      // @ts-ignore
      window.dataLayer = [];
    });
    await page.goto(BASE_URL + "quiz", { waitUntil: "domcontentloaded" });

    // Step through 6 questions
    for (let i = 0; i < 6; i++) {
      const radios = page.locator('input[type="radio"]');
      await expect(radios.first()).toBeVisible();
      await radios.first().check();
      const nextBtn = page.getByRole("button", { name: /next|see results/i });
      await nextBtn.click();
    }

    await expect(
      page.getByRole("heading", { name: /your recommendation/i })
    ).toBeVisible();

    const dataLayer = await page.evaluate(() => {
      // @ts-ignore
      return window.dataLayer as Array<Record<string, unknown>>;
    });

    const events = new Set((dataLayer || []).map((e) => e.event as string));
    expect(events.has("quiz_start")).toBeTruthy();
    expect(events.has("quiz_step_view")).toBeTruthy();
    expect(events.has("quiz_answer_select")).toBeTruthy();
    expect(events.has("quiz_next")).toBeTruthy();
    expect(events.has("quiz_complete")).toBeTruthy();
    expect(events.has("quiz_result_view")).toBeTruthy();

    // Contact capture analytics
    await page.getByRole("textbox", { name: /email/i }).fill("user@example.com");
    await page.getByRole("button", { name: /send/i }).click();
    const dataLayer2 = await page.evaluate(() => {
      // @ts-ignore
      return window.dataLayer as Array<Record<string, unknown>>;
    });
    expect(
      dataLayer2.some((e) => e.event === "quiz_contact_submit")
    ).toBeTruthy();

    // Literature link navigation works (after submit)
    const firstLink = page.locator("ul li a").first();
    await firstLink.click();
    await page.waitForTimeout(100);
    const url = page.url();
    expect(url.includes("downloads") || url.includes("#/section/")).toBeTruthy();
  });

  test("resume after reload", async ({ page }) => {
    await page.goto(BASE_URL + "quiz", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="radio"]').first().check();
    await page.getByRole("button", { name: /next/i }).click();

    await page.reload({ waitUntil: "domcontentloaded" });
    const session = await page.evaluate(() => {
      const raw = localStorage.getItem("mtech.quiz.session");
      return raw ? JSON.parse(raw) : null;
    });
    expect(session).toBeTruthy();
    expect(session.step).toBeGreaterThanOrEqual(1);
  });
});
