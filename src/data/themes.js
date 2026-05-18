const makeGradient = (primary, secondary, baseA, baseB, baseC = "#111827") =>
  `radial-gradient(circle at 18% 16%, ${primary}40, transparent 30%), radial-gradient(circle at 82% 10%, ${secondary}2e, transparent 28%), linear-gradient(135deg, ${baseA} 0%, ${baseB} 50%, ${baseC} 100%)`;

export const themes = {
  study: {
    label: "Study Motivation",
    accent: "#7dd3fc",
    gradient: makeGradient("#7dd3fc", "#2dd4bf", "#06111f", "#0c1220"),
  },
  exam: {
    label: "Exam Motivation",
    accent: "#fda4af",
    gradient: makeGradient("#fda4af", "#fbbf24", "#16070d", "#1f1424"),
  },
  coding: {
    label: "Coding Motivation",
    accent: "#86efac",
    gradient: makeGradient("#86efac", "#22c55e", "#04150e", "#0b1720"),
  },
  discipline: {
    label: "Discipline & Consistency",
    accent: "#c4b5fd",
    gradient: makeGradient("#c4b5fd", "#6366f1", "#0e0b1f", "#141827"),
  },
  gym: {
    label: "Gym Motivation",
    accent: "#fb7185",
    gradient: makeGradient("#fb7185", "#f97316", "#18070b", "#1d1519"),
  },
  productivity: {
    label: "Productivity Motivation",
    accent: "#5eead4",
    gradient: makeGradient("#5eead4", "#38bdf8", "#061815", "#0b1722"),
  },
  career: {
    label: "Career Motivation",
    accent: "#facc15",
    gradient: makeGradient("#facc15", "#34d399", "#171304", "#121f18"),
  },
  confidence: {
    label: "Confidence Boost",
    accent: "#f0abfc",
    gradient: makeGradient("#f0abfc", "#818cf8", "#180b1f", "#141827"),
  },
  stress: {
    label: "Stress Relief",
    accent: "#67e8f9",
    gradient: makeGradient("#67e8f9", "#0ea5e9", "#06141a", "#0d1b2a"),
  },
  burnout: {
    label: "Burnout Recovery",
    accent: "#f9a8d4",
    gradient: makeGradient("#f9a8d4", "#fb923c", "#180b18", "#171826"),
  },
  emotional: {
    label: "Emotional Strength",
    accent: "#c084fc",
    gradient: makeGradient("#c084fc", "#f472b6", "#12081c", "#171326"),
  },
  heartbreak: {
    label: "Heartbreak Healing",
    accent: "#fb7185",
    gradient: makeGradient("#fb7185", "#a78bfa", "#1a070d", "#141326"),
  },
  failure: {
    label: "Failure Recovery",
    accent: "#fdba74",
    gradient: makeGradient("#fdba74", "#ef4444", "#180f05", "#1d1720"),
  },
  lateNight: {
    label: "Late Night Grind",
    accent: "#a5b4fc",
    gradient: makeGradient("#a5b4fc", "#38bdf8", "#080a1f", "#111827", "#05070d"),
  },
  placement: {
    label: "Placement Preparation",
    accent: "#fde68a",
    gradient: makeGradient("#fde68a", "#34d399", "#161207", "#132018"),
  },
  aiDeveloper: {
    label: "AI/Developer Motivation",
    accent: "#93c5fd",
    gradient: makeGradient("#93c5fd", "#d946ef", "#071225", "#111827", "#150f24"),
  },
  selfImprovement: {
    label: "Self Improvement",
    accent: "#bef264",
    gradient: makeGradient("#bef264", "#2dd4bf", "#101604", "#0d1f1a"),
  },
  minimal: {
    label: "Minimal Focus",
    accent: "#e5e7eb",
    gradient: makeGradient("#e5e7eb", "#94a3b8", "#090b10", "#111827", "#05070d"),
  },
  funny: {
    label: "Funny Motivation",
    accent: "#fdba74",
    gradient: makeGradient("#fdba74", "#facc15", "#160f05", "#1c1721"),
  },
  deepThoughts: {
    label: "Deep Thought Quotes",
    accent: "#d8b4fe",
    gradient: makeGradient("#d8b4fe", "#2dd4bf", "#10081f", "#111827", "#071018"),
  },
};

export const defaultThemeKey = "study";
