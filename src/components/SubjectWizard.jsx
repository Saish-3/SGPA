import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";

/* ============================ Subject wizard ============================ */
/* skippable steps let the student mark a component as "not conducted yet"
   (stored as null = pending, distinct from a real 0). */
const WIZARD_STEPS = [
  { key: "name",    q: "What subject are we planning?", ph: "e.g. Computer Networks", type: "text", required: true },
  { key: "sprint",  q: "Which sprint is it in?", sub: "the two sprints cover different subjects", type: "choice",
    options: [{ label: "Sprint 1", value: 1 }, { label: "Sprint 2", value: 2 }] },
  { key: "credits", q: "How many credits is it worth?", ph: "e.g. 3", type: "number", required: true },
  { key: "internal",q: "Internal marks", sub: "out of 40 · skip if not conducted yet", ph: "0–40", type: "number", max: 40, skippable: true },
  { key: "mcq",     q: "MCQ marks", sub: "out of 20 · skip if not conducted", ph: "0–20", type: "number", max: 20, skippable: true },
  { key: "external",q: "External exam marks", sub: "out of 40 · skip if the exam is still pending", ph: "0–40", type: "number", max: 40, skippable: true },
  { key: "topics",  q: "Weak / focus topics", sub: "what the prof flagged — comma separated, optional", ph: "e.g. Subnetting, Routing", type: "text", optional: true },
];

export function SubjectWizard({ onAdd, onClose }) {
  const [draft, setDraft] = useState({
    name: "", sprint: 1, credits: "", internal: null, mcq: null, external: null, topics: "",
  });
  const [i, setI] = useState(0);
  const step = WIZARD_STEPS[i];
  const total = WIZARD_STEPS.length;
  const [val, setVal] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const cur = draft[step.key];
    setVal(cur === null || cur === undefined ? "" : String(cur));
    if (step.type !== "choice") {
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [i]); // eslint-disable-line

  const advance = (next) => {
    setDraft(next);
    if (i >= total - 1) return finish(next);
    setI(i + 1);
  };

  const commit = () => {
    const next = { ...draft };
    if (step.type === "number") next[step.key] = val === "" ? null : Number(val);
    else next[step.key] = val;
    advance(next);
  };

  const choose = (v) => advance({ ...draft, [step.key]: v });

  const skip = () => {
    const next = { ...draft, [step.key]: step.type === "number" ? null : "" };
    advance(next);
  };

  const finish = (d) => {
    const topics = String(d.topics || "").split(",").map((t) => t.trim()).filter(Boolean);
    const clamp = (v, max) => (v === null || v === undefined || v === "" ? null : Math.max(0, Math.min(max, Number(v))));
    onAdd({
      id: "u" + Date.now() + Math.random().toString(36).slice(2, 6),
      name: (d.name || "").trim() || "Untitled subject",
      sprint: d.sprint === 2 ? 2 : 1,
      credits: Math.max(1, Number(d.credits) || 1),
      internal: clamp(d.internal, 40), mcq: clamp(d.mcq, 20), external: clamp(d.external, 40),
      topics,
    });
  };

  const canNext = step.required ? String(val).trim() !== "" : true;
  const lastStep = i >= total - 1;

  return (
    <div className="wizard-overlay">
      <div className="wizard-top">
        <span className="wizard-count">{i + 1} / {total}</span>
        <button className="icon-btn" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="wizard-progress">
        <span style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>

      <div className="wizard-stage">
        <div className="wizard-step glide-in" key={i}>
          <div className="wizard-q">{step.q}</div>
          {step.sub && <div className="wizard-sub">{step.sub}</div>}

          {step.type === "choice" ? (
            <div className="choice-row">
              {step.options.map((o) => (
                <button
                  key={o.value}
                  className={`choice-btn ${draft[step.key] === o.value ? "on" : ""}`}
                  onClick={() => choose(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                className="wizard-input"
                type={step.type === "number" ? "number" : "text"}
                placeholder={step.ph}
                value={val}
                max={step.max}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canNext && commit()}
              />

              <div className="wizard-actions">
                <button className="btn-accent wizard-next" disabled={!canNext} onClick={commit}>
                  {lastStep ? "Add subject" : "Next"} <ArrowRight size={16} />
                </button>
                {step.skippable && (
                  <button className="skip-btn" onClick={skip}>Skip — not done yet</button>
                )}
                {step.optional && (
                  <button className="skip-btn" onClick={skip}>{lastStep ? "Skip & add" : "Skip"}</button>
                )}
              </div>
              <div className="wizard-hint">press Enter ↵</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
