import { QuizEngine } from "../components/quiz/QuizEngine";

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Equipment Fit Quiz</h1>
      <p className="text-slate-700 mb-6">
        Answer six quick questions to get a recommendation and literature links.
      </p>
      <QuizEngine />
    </main>
  );
}


