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
    id: "vehicle_class",
    title: "What vehicle class are you outfitting?",
    options: [
      { id: "vc_light", label: "Light/1-ton pickup", value: "light" },
      { id: "vc_medium", label: "Medium", value: "medium" },
      { id: "vc_heavy", label: "Heavy", value: "heavy" },
    ],
  },
  {
    id: "plow_width",
    title: "Preferred plow width?",
    options: [
      { id: "pw_8", label: "~8 ft", value: "8" },
      { id: "pw_10", label: "~10 ft", value: "10" },
      { id: "pw_12", label: "~12 ft", value: "12" },
    ],
  },
  {
    id: "surface_type",
    title: "Primary surface type?",
    options: [
      { id: "st_road", label: "Roads", value: "road" },
      { id: "st_lot", label: "Lots/campus", value: "lot" },
      { id: "st_runway", label: "Runway/long", value: "runway" },
    ],
  },
  {
    id: "snow_amount",
    title: "Typical snowfall per event?",
    options: [
      { id: "sa_lt2", label: "< 2 in", value: "lt2" },
      { id: "sa_2to6", label: "2 – 6 in", value: "2to6" },
      { id: "sa_gt6", label: "> 6 in", value: "gt6" },
    ],
  },
  {
    id: "priority",
    title: "Operational priority?",
    options: [
      { id: "pr_speed", label: "Speed", value: "speed" },
      { id: "pr_capacity", label: "Capacity", value: "capacity" },
      { id: "pr_precision", label: "Precision", value: "precision" },
    ],
  },
  {
    id: "salt_strategy",
    title: "Material use strategy?",
    options: [
      { id: "ss_sand", label: "Sand-heavy", value: "sand" },
      { id: "ss_salt", label: "Salt", value: "salt" },
      { id: "ss_liquid", label: "Pre-wet/liquids", value: "liquid" },
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
    if (parsed.version !== QUIZ_VERSION) return null;
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
    loadSession() || ({ step: 0, answers: {}, startedAt: null, completed: false } as State);

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
      <div className="mt-6">
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
              const elapsed = state.startedAt ? (Date.now() - state.startedAt) / 1000 : undefined;
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


