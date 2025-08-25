import { KNOWLEDGE_SECTIONS } from "../content/knowledge";

export default function DownloadsPage() {
  const sectionsWithDownloads = KNOWLEDGE_SECTIONS.filter(
    (s) => s.downloads && s.downloads.length > 0
  );
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Product Literature</h1>
      <p className="text-slate-600 mt-1 text-sm">
        Download product manuals and specifications referenced throughout the
        hub.
      </p>
      <div className="mt-6 space-y-6">
        {sectionsWithDownloads.map((s) => (
          <section key={s.slug}>
            <h2 className="font-semibold">{s.title}</h2>
            <ul className="list-disc pl-6 text-sm mt-2">
              {s.downloads!.map((d) => (
                <li key={d.href}>
                  <a
                    className="text-blue-600 hover:underline"
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
