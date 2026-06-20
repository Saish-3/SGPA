/* =====================================================================
   Grading model (edit GRADE_SCALE / PASS to match your college exactly)
   Components per subject: Internal /40 · MCQ /20 · External /40  → /100
   Each subject belongs to ONE sprint (the semester's two sprints cover
   different subjects). Any component may be null = "not conducted yet"
   (pending) — distinct from 0. A subject is GRADED only when all three in.
   ===================================================================== */
export const PASS = { internal: 16, mcq: 7, external: 16 }; // internal /40, mcq /20, external /40
export const CAPS = { internal: 40, mcq: 20, external: 40 };
export const GRADE_SCALE = [
  { min: 90, grade: "O",  points: 10 },
  { min: 80, grade: "A+", points: 9 },
  { min: 70, grade: "A",  points: 8 },
  { min: 60, grade: "B+", points: 7 },
  { min: 55, grade: "B",  points: 6 },
  { min: 50, grade: "C",  points: 5 },
  { min: 40, grade: "P",  points: 4 },
  { min: 0,  grade: "F",  points: 0 },
];
export const MAX_POINTS = 10;
export const COMP_KEYS = ["internal", "mcq", "external"];
export const COMP_LABEL = { internal: "Int", mcq: "MCQ", external: "Ext" };
export const SPRINTS = [1, 2];

export const has = (v) => v !== null && v !== undefined && v !== "";
export const num = (v) => (has(v) ? Number(v) : 0);

export const isGraded = (s) => COMP_KEYS.every((k) => has(s[k]));        // all components in
export const enteredOf = (s) => COMP_KEYS.reduce((a, k) => a + (has(s[k]) ? Number(s[k]) : 0), 0);
export const pendingMaxOf = (s) => COMP_KEYS.reduce((a, k) => a + (has(s[k]) ? 0 : CAPS[k]), 0);
export const pendingKeys = (s) => COMP_KEYS.filter((k) => !has(s[k]));

export const internalOf = (s) => num(s.internal);                       // /40
export const totalOf = (s) => enteredOf(s);                             // /100 when graded

export function sectionPass(s) {
  return internalOf(s) >= PASS.internal && num(s.mcq) >= PASS.mcq;
}
export function fullPass(s) {
  return sectionPass(s) && num(s.external) >= PASS.external;
}
export function gradeOf(s) { // only call when isGraded(s)
  if (!fullPass(s)) return GRADE_SCALE[GRADE_SCALE.length - 1]; // F
  return GRADE_SCALE.find((g) => totalOf(s) >= g.min);
}
// smallest grade tier whose points >= target (for "spread evenly" suggestion)
export function tierForPoints(p) {
  const tiers = [...GRADE_SCALE].reverse(); // ascending points
  return tiers.find((t) => t.points >= p) || null;
}

/* ============================ no seed data ============================ */
export const SEED = []; // students add their own subjects via the wizard
