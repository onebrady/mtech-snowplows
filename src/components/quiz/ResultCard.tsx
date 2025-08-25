import { Link } from "react-router-dom";

export type ResultContent = {
  code: "A" | "B" | "C" | "D";
  title: string;
  why: string;
  bullets: string[];
  literature: { label: string; url: string }[];
};

export function ResultCard({ content }: { content: ResultContent }) {
  return (
    <article className="mt-4 rounded border bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="md:w-1/3">
          <div
            className="w-full aspect-[16/9] rounded bg-gradient-to-br from-slate-100 to-slate-200"
            aria-hidden
          />
        </div>
        <div className="md:w-2/3">
          <h3 className="font-semibold">
            {content.code}: {content.title}
          </h3>
          <p className="mt-1 text-slate-700">{content.why}</p>
          <ul className="mt-2 list-disc ml-5 text-slate-700">
            {content.bullets.slice(0, 4).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="mt-3">
            <h4 className="font-medium">Literature</h4>
            <ul className="list-disc ml-5">
              {content.literature.map((l) => (
                <li key={l.url}>
                  <a href={l.url} className="text-slate-900 hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 flex gap-2">
            <Link
              to="/downloads"
              className="inline-flex px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 text-sm"
            >
              Download Literature
            </Link>
            <Link
              to="/"
              className="inline-flex px-3 py-2 rounded border text-sm"
            >
              Back to Hub
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}


