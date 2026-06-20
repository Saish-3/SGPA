/* =====================================================================
   ============================  ai.js  ================================
   generateStudyPlan({ topic, subject, force })
   - calls https://api.anthropic.com/v1/messages (no key; Claude artifact)
   - returns validated JSON, throws a clean error on failure
   - caches per topic+subject in localStorage; only hits AI on miss/force
   ===================================================================== */
import { safeStorage } from "./storage";

export const planCacheKey = (subject, topic) =>
  `studyplan:${String(subject).toLowerCase().trim()}:${String(topic).toLowerCase().trim()}`;

/* --- tolerant JSON recovery ---------------------------------------------
   The model occasionally returns JSON that's truncated (hit the token
   limit mid-array) or wrapped in prose/fences. coerceJSON tries, in order:
   strict parse → fence-strip + brace-slice → trailing-comma fix →
   truncation repair (balance open strings/brackets) → drop the partial
   last element then balance. Returns an object or null. ----------------- */
function tryParse(s) { try { return JSON.parse(s); } catch { return null; } }
function stripFences(s) { return String(s).replace(/```json/gi, "").replace(/```/g, "").trim(); }
function dropTrailingCommas(s) { return s.replace(/,(\s*[}\]])/g, "$1"); }

function balanceTruncated(s) {
  let inStr = false, esc = false; const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "{" || c === "[") stack.push(c);
    else if (c === "}" || c === "]") stack.pop();
  }
  let out = s;
  if (inStr) out += '"';
  for (let i = stack.length - 1; i >= 0; i--) out += stack[i] === "{" ? "}" : "]";
  return out;
}

function coerceJSON(raw) {
  const txt = stripFences(raw);
  const a = txt.indexOf("{");
  if (a === -1) return null;
  const b = txt.lastIndexOf("}");

  let p = tryParse(txt.slice(a)); if (p) return p;                                   // 1
  if (b > a) { p = tryParse(txt.slice(a, b + 1)); if (p) return p; }                 // 2
  if (b > a) { p = tryParse(dropTrailingCommas(txt.slice(a, b + 1))); if (p) return p; } // 3

  let t = dropTrailingCommas(balanceTruncated(txt.slice(a)));                        // 4 close truncation
  p = tryParse(t); if (p) return p;

  const lastObj = txt.lastIndexOf("}");                                              // 5 drop partial tail
  if (lastObj > a) {
    let t2 = dropTrailingCommas(balanceTruncated(txt.slice(a, lastObj + 1)));
    p = tryParse(t2); if (p) return p;
  }
  return null;
}

/* Normalize + sanity-check. Lenient on counts so a slightly short (e.g.
   salvaged) response still renders instead of throwing a hard error. */
function normalizePlan(p, topic, subject) {
  const fail = (m) => { throw new Error("Invalid study plan: " + m); };
  if (!p || typeof p !== "object") fail("not an object");

  const concepts = (Array.isArray(p.concepts) ? p.concepts : [])
    .filter((x) => typeof x === "string" && x.trim()).slice(0, 7);
  const mistakes = (Array.isArray(p.mistakes) ? p.mistakes : [])
    .filter((x) => typeof x === "string" && x.trim()).slice(0, 5);

  const mcqs = (Array.isArray(p.mcqs) ? p.mcqs : []).filter((q) =>
    q && typeof q.question === "string" &&
    Array.isArray(q.options) && q.options.length === 4 &&
    q.options.every((o) => typeof o === "string") &&
    Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex <= 3 &&
    typeof q.explanation === "string"
  ).slice(0, 8);

  if (concepts.length < 3) fail("too few concepts");
  if (mcqs.length < 4) fail("too few usable MCQs");

  return { topic: p.topic || topic, subject: p.subject || subject, concepts, mistakes, mcqs };
}

export async function generateStudyPlan({ topic, subject, force = false }) {
  const key = planCacheKey(subject, topic);
  if (!force) {
    const cached = safeStorage.get(key);
    if (cached) {
      try { return normalizePlan(JSON.parse(cached), topic, subject); } catch { /* fall through */ }
    }
  }

  const prompt = `You are an expert study coach for an Indian engineering college student preparing for end-semester EXTERNAL exams.

Subject: "${subject}"
Focus topic: "${topic}"

Build a tight, exam-focused study plan for this EXACT topic as it appears inside the subject "${subject}". Everything must be specific to how this topic is tested in that subject's external paper — not generic textbook filler.

Return ONLY a valid JSON object — no markdown, no code fences, no commentary before or after. Exact shape:
{
  "topic": string,
  "subject": string,
  "concepts": [ 5 to 7 short, must-know concept strings ],
  "mistakes": [ 3 to 5 common mistakes students actually make on this topic ],
  "mcqs": [
    // EXACTLY 8 objects
    {
      "question": string,
      "options": [ four distinct option strings ],
      "correctIndex": 0,            // integer 0-3
      "explanation": string         // why the correct option is right AND why each other option is wrong
    }
  ]
}

Rules:
- Tie every MCQ to "${subject}" specifically; make them exam-style and conceptually testing.
- Mix difficulty; include at least 2 applied / numerical / scenario questions if the topic allows.
- Each explanation MUST justify the answer and briefly dismiss the three distractors, but keep it to 2–3 tight sentences (no rambling) so the whole JSON stays compact.
- Keep concept and mistake strings to one line each.
- The output must be parseable by JSON.parse() with no surrounding text and no trailing commas.`;

  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (e) {
    throw new Error("Network error while contacting the study engine. Check your connection and retry.");
  }
  if (!res.ok) throw new Error(`Study engine returned ${res.status}. Try regenerating in a moment.`);

  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
  if (!text) throw new Error("Empty response from the study engine.");

  const parsed = coerceJSON(text);
  if (!parsed) throw new Error("The study engine returned a response we couldn't read. Tap Regenerate to try again.");
  const plan = normalizePlan(parsed, topic, subject);
  safeStorage.set(key, JSON.stringify(plan));
  return plan;
}
