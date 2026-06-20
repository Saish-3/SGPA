import { useState, useEffect } from "react";
import { X, Printer, RefreshCw, BookOpen, ListChecks, AlertTriangle } from "lucide-react";
import { generateStudyPlan } from "../services/ai";
import { safeStorage } from "../services/storage";
import { LoadingState } from "./LoadingState";
import { StudyView } from "./StudyView";
import { PracticeView } from "./PracticeView";

/* ============================ Study drawer ============================ */
export function StudyDrawer({ topic, subject, onClose }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [mode, setMode] = useState("study"); // study | practice
  const [flagged, setFlagged] = useState(() => new Set());
  const flagPrefix = `flag:${String(subject).toLowerCase()}:${String(topic).toLowerCase()}:`;

  const load = async (force = false) => {
    setLoading(true); setErr("");
    try {
      const p = await generateStudyPlan({ topic, subject, force });
      setPlan(p);
    } catch (e) {
      setErr(e.message || "Something went wrong generating the plan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(false);
    // hydrate flags
    const next = new Set();
    for (let i = 0; i < 8; i++) if (safeStorage.get(flagPrefix + i) === "1") next.add(i);
    setFlagged(next);
  }, [topic, subject]); // eslint-disable-line

  const toggleFlag = (i) => {
    setFlagged((prev) => {
      const n = new Set(prev);
      if (n.has(i)) { n.delete(i); safeStorage.del(flagPrefix + i); }
      else { n.add(i); safeStorage.set(flagPrefix + i, "1"); }
      return n;
    });
  };

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer drawer-in">
        <div className="drawer-head">
          <div>
            <div className="drawer-topic">{topic}</div>
            <div className="drawer-subject">{subject}</div>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="drawer-tabs">
          <button className={`dtab ${mode === "study" ? "on" : ""}`} onClick={() => setMode("study")}>
            <BookOpen size={14} /> Study
          </button>
          <button className={`dtab ${mode === "practice" ? "on" : ""}`} onClick={() => setMode("practice")} disabled={!plan}>
            <ListChecks size={14} /> Practice
          </button>
          <div className="dtab-spacer" />
          <button className="ghost-btn" onClick={() => window.print()} disabled={!plan} title="Export / Print">
            <Printer size={14} /> PDF
          </button>
          <button className="ghost-btn" onClick={() => load(true)} disabled={loading} title="Regenerate">
            <RefreshCw size={14} className={loading ? "spin" : ""} /> Regen
          </button>
        </div>

        <div className="drawer-body">
          {loading && <LoadingState />}
          {err && !loading && (
            <div className="error-box">
              <AlertTriangle size={18} style={{ color: "var(--red)" }} />
              <p>{err}</p>
              <button className="btn-accent" onClick={() => load(true)}>Try again</button>
            </div>
          )}
          {plan && !loading && !err && (
            mode === "study"
              ? <StudyView plan={plan} flagged={flagged} toggleFlag={toggleFlag} />
              : <PracticeView plan={plan} flagged={flagged} toggleFlag={toggleFlag} />
          )}
        </div>
      </aside>
    </>
  );
}
