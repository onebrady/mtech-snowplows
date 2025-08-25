import type { QuizQuestion } from "../../lib/quiz/types";

export function QuestionStep({
  question,
  selected,
  onSelect,
}: {
  question: QuizQuestion;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-medium">{question.title}</legend>
      <div className="mt-3 flex flex-col gap-2">
        {question.options.map((opt) => (
          <label key={opt.id} className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={question.id}
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onSelect(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}


