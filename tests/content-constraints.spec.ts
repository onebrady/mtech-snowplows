import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

type FaqAnswer = { "@type": "Answer"; text: string };
type FaqQuestion = {
  "@type": "Question";
  name: string;
  acceptedAnswer: FaqAnswer;
};
type FaqPage = { "@type": "FAQPage"; mainEntity: FaqQuestion[] };

const SECTION_SLUGS = [
  "equipment",
  "integration",
  "operations", 
  "environment",
  "procurement",
  "technology",
] as const;

function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  return text.split(/\s+/).filter(Boolean).length;
}

function countAnchors(html: string): number {
  const matches = html.match(/<a\b[^>]*>/gi);
  return matches ? matches.length : 0;
}

async function getFaqJson(page: Page): Promise<FaqPage | null> {
  const handles = await page
    .locator('script[type="application/ld+json"]')
    .all();
  for (const h of handles) {
    const t = (await h.textContent()) || "";
    try {
      const json = JSON.parse(t) as unknown;
      const docs = Array.isArray(json) ? (json as unknown[]) : [json];
      for (const d of docs) {
        const doc = d as Partial<FaqPage>;
        if (
          doc &&
          doc["@type"] === "FAQPage" &&
          Array.isArray(doc.mainEntity)
        ) {
          return doc as FaqPage;
        }
      }
    } catch {
      // ignore
    }
  }
  return null;
}

test("FAQ answers meet ≤120 words and ≤1 link across sections", async ({
  page,
}) => {
  for (const slug of SECTION_SLUGS) {
    await page.goto(BASE_URL + "section/" + slug, {
      waitUntil: "domcontentloaded",
    });
    const faq = await getFaqJson(page);
    expect(faq, `FAQPage present for ${slug}`).toBeTruthy();
    const main = (faq as FaqPage).mainEntity;
    expect(Array.isArray(main)).toBeTruthy();
    const firstEight = main.slice(0, 8);
    for (const qa of firstEight) {
      const html = qa.acceptedAnswer?.text || "";
      expect(
        countWords(html),
        `≤120 words for ${slug}/${qa.name}`
      ).toBeLessThanOrEqual(120);
      expect(
        countAnchors(html),
        `≤1 link for ${slug}/${qa.name}`
      ).toBeLessThanOrEqual(1);
    }
  }
});
