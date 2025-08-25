export function FactCard({
  title,
  bullets,
}: {
  title?: string;
  bullets: string[];
}) {
  if (!bullets || bullets.length === 0) return null;
  return (
    <div className="mt-8 rounded-lg border bg-white p-4 shadow-sm">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <ul className="list-disc pl-5 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}


