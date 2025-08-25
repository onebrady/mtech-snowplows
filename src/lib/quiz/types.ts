export type QuizOption = {
  id: string;
  label: string;
  value: string;
};

export type QuizQuestion = {
  id: string;
  title: string;
  description?: string;
  options: QuizOption[];
};

export type QuizAnswerMap = Record<string, string | undefined>;

export type QuizResult = {
  primary: "A" | "B" | "C" | "D";
  alternatives: Array<"A" | "B" | "C" | "D">;
  rationale: string;
  literature: { label: string; url: string }[];
};

export const QUIZ_VERSION = "v1";


