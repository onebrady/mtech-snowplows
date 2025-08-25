import { test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test("brand comparison: mtech, local-before, local-after", async ({ page }) => {
  // 1) MTech website screenshot (reference)
  await page.goto("https://www.mtechcompany.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: "tests/__screenshots__/mtech-ref.png",
    fullPage: true,
  });

  // 2) Local BEFORE (simulate pre-brand by removing classes)
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    // revert hero background
    document.querySelectorAll<HTMLElement>(".bg-hero").forEach((el) => {
      el.classList.remove("bg-hero");
      el.classList.add("bg-gradient-to-b", "from-slate-50", "to-white");
    });
    // revert brand text colors
    document.querySelectorAll<HTMLElement>(".text-brand").forEach((el) => {
      el.classList.remove("text-brand");
    });
    // revert primary buttons
    document.querySelectorAll<HTMLElement>(".btn-primary").forEach((el) => {
      el.classList.remove("btn-primary");
      el.classList.add("bg-slate-900", "text-white", "hover:bg-slate-800");
    });
  });
  await page.waitForTimeout(200);
  await page.screenshot({
    path: "tests/__screenshots__/local-before-brand.png",
    fullPage: true,
  });

  // 3) Local AFTER (actual current styles)
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "tests/__screenshots__/local-after-brand.png",
    fullPage: true,
  });
});
