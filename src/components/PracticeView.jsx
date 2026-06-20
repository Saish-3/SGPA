import { useState, useEffect } from "react";
import { ArrowRight, Flag, Trophy, RotateCcw } from "lucide-react";

export function PracticeView({ plan, flagged, toggleFlag }) {
  const order = plan.mcqs.map((_, i) => i).filter((i) => !flagged.has(i));
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState({}); // qIndex -> picked
  const [done, setDone] = useState(false);

  useEffect(() => { setPos(0); setPicked(null); setAnswers({}); setDone(false); }, [flagged.size, plan]);

  if (order.length === 0)
    return <div className="empty-practice">Every question is flagged — unflag some to practise.</div>;

  const qi = order[pos];
  const q = plan.mcqs[qi];
  const answered = picked !== null;
  const correctCount = Object.entries(answers).filter(([k, v]) => plan.mcqs[k].correctIndex === v).length;

  const choose = (oi) => { if (!answered) { setPicked(oi); setAnswers((a) => ({ ...a, [qi]: oi })); } };
  const next = () => {
    if (pos >= order.length - 1) return setDone(true);
    setPos(pos + 1); setPicked(null);
  };

  if (done) {
    const score = Object.entries(answers).filter(([k, v]) => plan.mcqs[k].correctIndex === v).length;
    const pct = Math.round((score / order.length) * 100);
    return (
      <div className="summary-screen">
        <Trophy size={34} style={{ color: pct >= 70 ? "var(--green)" : pct >= 40 ? "var(--amber)" : "var(--red)" }} />
        <div className="summary-score mono">{score}<span>/{order.length}</span></div>
        <div className="summary-pct">{pct}% correct</div>
        <p className="summary-line">
          {pct >= 70 ? "Solid — you're externals-ready on this topic." :
           pct >= 40 ? "Getting there. Re-read the explanations on the misses." :
           "Shaky. Go back to the concepts list, then retry."}
        </p>
        <button className="btn-accent" onClick={() => { setPos(0); setPicked(null); setAnswers({}); setDone(false); }}>
          <RotateCcw size={15} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="practice">
      <div className="practice-bar">
        <span className="mono">{pos + 1}/{order.length}</span>
        <div className="practice-track"><span style={{ width: `${((pos) / order.length) * 100}%` }} /></div>
        <span className="mono" style={{ color: "var(--green)" }}>{correctCount}✓</span>
      </div>
      <div className="practice-q glide-in" key={qi}>
        <div className="qnum">Q{qi + 1}</div>
        <div className="qtext lg">{q.question}</div>
        <div className="opts">
          {q.options.map((o, oi) => {
            let cls = "opt clickable";
            if (answered) {
              if (oi === q.correctIndex) cls += " correct";
              else if (oi === picked) cls += " wrong";
            }
            return (
              <button className={cls} key={oi} onClick={() => choose(oi)} disabled={answered}>
                <span className="opt-key">{"ABCD"[oi]}</span>{o}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="explain">
            <strong style={{ color: picked === q.correctIndex ? "var(--green)" : "var(--red)" }}>
              {picked === q.correctIndex ? "Correct." : `Not quite — answer is ${"ABCD"[q.correctIndex]}.`}
            </strong> {q.explanation}
            <button className="btn-accent next-q" onClick={next}>
              {pos >= order.length - 1 ? "See summary" : "Next"} <ArrowRight size={15} />
            </button>
          </div>
        )}
        <button className={`flag-btn inline ${flagged.has(qi) ? "on" : ""}`} onClick={() => toggleFlag(qi)}>
          <Flag size={12} /> {flagged.has(qi) ? "Flagged" : "Flag this"}
        </button>
      </div>
    </div>
  );
}
