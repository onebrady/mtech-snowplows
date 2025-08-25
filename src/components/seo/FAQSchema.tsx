import { type QAItem } from "../../content/types";

function toJsonLd(sectionTitle: string, items: QAItem[]) {
  const mainEntity = items.slice(0, 8).map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: qa.answer,
    },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${sectionTitle} – Frequently Asked Questions`,
    mainEntity,
  };
}

export function FAQSchema({
  title,
  items,
}: {
  title: string;
  items: QAItem[];
}) {
  const json = toJsonLd(title, items);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}


