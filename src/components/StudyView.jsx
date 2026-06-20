import { useState } from "react";
import { Lightbulb, AlertTriangle, ListChecks, Flag } from "lucide-react";

export function StudyView({ plan, flagged, toggleFlag }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div className="study-view">
      <section>
        <h3 className="sec-h"><Lightbulb size={15} /> Must-know concepts</h3>
        <ul className="bullet-list">{plan.concepts.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </section>
      <section>
        <h3 className="sec-h"><AlertTriangle size={15} /> Common mistakes</h3>
        <ul className="bullet-list warn">{plan.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
      </section>
      <section>
        <h3 className="sec-h"><ListChecks size={15} /> Question bank · {plan.mcqs.length}</h3>
        {plan.mcqs.map((q, i) => {
          const isOpen = open.has(i), isFlag = flagged.has(i);
          return (
            <div className={`qcard ${isFlag ? "flagged" : ""}`} key={i}>
              {isFlag && <div className="flag-banner"><Flag size={12} /> answer may be wrong — excluded from scoring</div>}
              <div className="qhead">
                <span className="qnum">Q{i + 1}</span>
                <button className={`flag-btn ${isFlag ? "on" : ""}`} onClick={() => toggleFlag(i)} title="Flag this question">
                  <Flag size={13} />
                </button>
              </div>
              <div className="qtext">{q.question}</div>
              <div className="opts">
                {q.options.map((o, oi) => (
                  <div className={`opt ${isOpen && oi === q.correctIndex ? "correct" : ""}`} key={oi}>
                    <span className="opt-key">{"ABCD"[oi]}</span>{o}
                  </div>
                ))}
              </div>
              <button className="reveal-btn" onClick={() => toggle(i)}>
                {isOpen ? "Hide answer" : "Show answer & explanation"}
              </button>
              {isOpen && (
                <div className="explain">
                  <strong style={{ color: "var(--green)" }}>Answer: {"ABCD"[q.correctIndex]}.</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
