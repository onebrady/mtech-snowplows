import { useEffect, useMemo, useReducer } from "react";
import { emitAnalytics } from "../../lib/analytics";
import { QuizProgress } from "./QuizProgress";
import { QuestionStep } from "./QuestionStep";
import { RecommendationResults } from "./RecommendationResults";
import {
  QUIZ_VERSION,
  type QuizAnswerMap,
  type QuizQuestion,
} from "../../lib/quiz/types";
import { computeRecommendation } from "../../lib/quiz/logic";

type State = {
  step: number; // 0..5
  answers: QuizAnswerMap;
  startedAt: number | null;
  completed: boolean;
};

type Action =
  | { type: "start" }
  | { type: "select"; questionId: string; value: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "complete" };

const STORAGE_KEY = "mtech.quiz.session";

const QUESTIONS: QuizQuestion[] = [
  {
    id: "primary_environment",
    title: "What type of areas will you primarily be clearing?",
    description:
      "Urban areas have more obstacles; highways focus on speed and width coverage.",
    options: [
      { id: "env_urban", label: "Urban streets and city roads", value: "urban" },
      { id: "env_highway", label: "Highways and rural roads", value: "highway" },
      { id: "env_open", label: "Large open areas (lots, airports)", value: "open" },
      { id: "env_mixed", label: "Mixed applications", value: "mixed" },
    ],
  },
  {
    id: "vehicle_class",
    title: "What class of vehicle will you be using?",
    options: [
      { id: "vc_medium", label: "Medium-duty (Class 4-6)", value: "medium" },
      { id: "vc_heavy", label: "Heavy-duty (Class 7-8)", value: "heavy" },
    ],
  },
  {
    id: "obstacle_frequency",
    title: "How often will you encounter obstacles like curbs or manholes?",
    options: [
      { id: "ob_freq", label: "Frequently (urban routes, tight spaces)", value: "frequent" },
      { id: "ob_some", label: "Occasionally (mixed terrain)", value: "occasional" },
      { id: "ob_rare", label: "Rarely (mostly open areas)", value: "rare" },
    ],
  },
  {
    id: "required_capabilities",
    title: "Which capabilities do you need?",
    description: "Consider your full winter operation needs.",
    options: [
      { id: "cap_plow", label: "Snow plowing only", value: "plow_only" },
      { id: "cap_plow_spreader", label: "Plow + Spreader", value: "plow_spreader" },
      { id: "cap_plow_underbody", label: "Plow + Underbody", value: "plow_underbody" },
      {
        id: "cap_complete",
        label: "Complete winter maintenance (plow + spread + scrape)",
        value: "complete",
      },
    ],
  },
  {
    id: "multi_lane",
    title: "Do you need to clear multiple lanes or extra-wide areas in single passes?",
    options: [
      { id: "ml_yes", label: "Yes, maximum width coverage", value: "yes" },
      { id: "ml_no", label: "No, single-lane focus", value: "no" },
    ],
  },
  {
    id: "snow_profile",
    title: "What's your typical snow profile?",
    options: [
      { id: "sp_heavy", label: "Heavy and frequent", value: "heavy" },
      { id: "sp_moderate", label: "Moderate", value: "moderate" },
      { id: "sp_light", label: "Light", value: "light" },
    ],
  },
];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { ...state, startedAt: Date.now() };
    case "select":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    case "next":
      return { ...state, step: Math.min(5, state.step + 1) };
    case "prev":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "complete":
      return { ...state, completed: true };
    default:
      return state;
  }
}

function loadSession(): State | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      version: string;
      step: number;
      answers: QuizAnswerMap;
      startedAt?: number | null;
    };
    if (parsed.version !== QUIZ_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      step: Math.min(5, Math.max(0, parsed.step || 0)),
      answers: parsed.answers || {},
      startedAt: parsed.startedAt ?? null,
      completed: false,
    };
  } catch {
    return null;
  }
}

export function QuizEngine() {
  const initial: State =
    loadSession() ||
    ({ step: 0, answers: {}, startedAt: null, completed: false } as State);

  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    emitAnalytics("quiz_step_view", { stepIndex: state.step });
  }, [state.step]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: QUIZ_VERSION,
          step: state.step,
          answers: state.answers,
          startedAt: state.startedAt,
        })
      );
    } catch {
      // no-op
    }
  }, [state.step, state.answers, state.startedAt]);

  useEffect(() => {
    if (state.startedAt === null) {
      dispatch({ type: "start" });
      emitAnalytics("quiz_start", { quizVersion: QUIZ_VERSION });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canAdvance = useMemo(() => {
    const q = QUESTIONS[state.step];
    if (!q) return false;
    return Boolean(state.answers[q.id]);
  }, [state.step, state.answers]);

  if (state.completed) {
    const result = computeRecommendation(state.answers);
    return <RecommendationResults result={result} />;
  }

  const current = QUESTIONS[state.step];

  return (
    <div>
      <QuizProgress total={6} current={state.step + 1} />
      <div className="mt-6" aria-live="polite">
        <QuestionStep
          key={current.id}
          question={current}
          selected={state.answers[current.id]}
          onSelect={(value) => {
            dispatch({ type: "select", questionId: current.id, value });
            emitAnalytics("quiz_answer_select", {
              stepIndex: state.step,
              optionValue: value,
            });
          }}
        />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded border bg-white hover:bg-slate-50"
          onClick={() => {
            dispatch({ type: "prev" });
            emitAnalytics("quiz_prev", { stepIndex: state.step });
          }}
          disabled={state.step === 0}
        >
          Previous
        </button>
        {state.step < 5 ? (
          <button
            type="button"
            className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
            onClick={() => {
              if (!canAdvance) return;
              dispatch({ type: "next" });
              emitAnalytics("quiz_next", { stepIndex: state.step });
            }}
            disabled={!canAdvance}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            onClick={() => {
              dispatch({ type: "complete" });
              const elapsed = state.startedAt
                ? (Date.now() - state.startedAt) / 1000
                : undefined;
              const result = computeRecommendation(state.answers);
              emitAnalytics("quiz_complete", {
                totalSeconds: elapsed,
                primary: result.primary,
              });
            }}
            disabled={!canAdvance}
          >
            See Results
          </button>
        )}
      </div>
    </div>
  );
}
