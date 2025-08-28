import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Console/network hygiene", () => {
  test("landing page is free of console errors", async ({ page }) => {
    const logs: Array<{ type: string; text: string }> = [];
    const failed: Array<{ url: string; status: number }> = [];

    page.on("console", (msg) => {
      const type = msg.type();
      if (type === "error" || type === "warning") {
        logs.push({ type, text: msg.text() });
      }
    });
    page.on("pageerror", (err) =>
      logs.push({ type: "pageerror", text: err.message })
    );
    page.on("response", (resp) => {
      const status = resp.status();
      if (status >= 400) failed.push({ url: resp.url(), status });
    });

    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    if (logs.length || failed.length) {
      console.log("Console messages:", JSON.stringify(logs, null, 2));
      console.log("Failed responses:", JSON.stringify(failed, null, 2));
    }

    expect(failed.length, "No network 4xx/5xx on landing").toBe(0);
    // Allow warnings but fail on errors/pageerrors
    expect(
      logs.filter((l) => l.type !== "warning").length,
      "No console errors"
    ).toBe(0);
  });

  test("section page is free of console errors", async ({ page }) => {
    const logs: Array<{ type: string; text: string }> = [];
    const failed: Array<{ url: string; status: number }> = [];
    page.on("console", (msg) => {
      const type = msg.type();
      if (type === "error" || type === "warning")
        logs.push({ type, text: msg.text() });
    });
    page.on("pageerror", (err) =>
      logs.push({ type: "pageerror", text: err.message })
    );
    page.on("response", (resp) => {
      const status = resp.status();
      if (status >= 400) failed.push({ url: resp.url(), status });
    });

    await page.goto(BASE_URL + "section/equipment", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1000);

    if (logs.length || failed.length) {
      console.log("Console messages:", JSON.stringify(logs, null, 2));
      console.log("Failed responses:", JSON.stringify(failed, null, 2));
    }

    expect(failed.length, "No network 4xx/5xx on section").toBe(0);
    expect(
      logs.filter((l) => l.type !== "warning").length,
      "No console errors"
    ).toBe(0);
  });
});
