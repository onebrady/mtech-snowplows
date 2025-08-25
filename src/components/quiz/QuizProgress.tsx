export function QuizProgress({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2" aria-label="Quiz progress" role="status">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          aria-current={n === current ? "step" : undefined}
          className={
            "inline-flex h-2 w-8 rounded-full " +
            (n === current ? "bg-slate-900" : "bg-slate-300")
          }
        />
      ))}
      <span className="sr-only">
        Step {current} of {total}
      </span>
    </div>
  );
}


