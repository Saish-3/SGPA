import { useState, useEffect } from "react";
import { Sparkles, GraduationCap, LogOut, Target, Plus } from "lucide-react";

import { safeStorage } from "./services/storage";
import { planCacheKey } from "./services/ai";
import { SEED } from "./lib/grading";
import { usePlan } from "./hooks/usePlan";

import { AuthScreen } from "./components/AuthScreen";
import { SubjectWizard } from "./components/SubjectWizard";
import { StatCards } from "./components/StatCards";
import { RequiredTable } from "./components/RequiredTable";
import { SummaryTable } from "./components/SummaryTable";
import { StudyDrawer } from "./components/StudyDrawer";
import { PrintRoot } from "./components/PrintRoot";
import { Styles } from "./components/Styles";

/* ============================ App ============================ */
export default function App() {
  const [roll, setRoll] = useState(null);
  const [subjects, setSubjects] = useState(SEED);
  const [desired, setDesired] = useState(8.5);
  const [wizard, setWizard] = useState(false);
  const [drawer, setDrawer] = useState(null); // {topic, subject}
  const [drawerPlan, setDrawerPlan] = useState(null);

  const plan = usePlan(subjects, desired);

  // mirror the open drawer's plan into PrintRoot (so Export PDF prints it)
  useEffect(() => {
    if (!drawer) { setDrawerPlan(null); return; }
    const cached = safeStorage.get(planCacheKey(drawer.subject, drawer.topic));
    if (cached) { try { setDrawerPlan(JSON.parse(cached)); } catch {} }
    const id = setInterval(() => {
      const c = safeStorage.get(planCacheKey(drawer.subject, drawer.topic));
      if (c) { try { setDrawerPlan(JSON.parse(c)); } catch {} }
    }, 800);
    return () => clearInterval(id);
  }, [drawer]);

  const removeSubject = (id) => setSubjects((s) => s.filter((x) => x.id !== id));

  return (
    <div className="app-root">
      <Styles />
      {!roll ? (
        <AuthScreen onEnter={setRoll} />
      ) : (
        <div className="dash fade-up">
          <header className="topbar">
            <div className="brand sm">
              <span className="brand-mark"><Sparkles size={14} /></span>
              Sigma · SGPA Engine
            </div>
            <div className="topbar-right">
              <span className="roll-chip"><GraduationCap size={13} /> {roll}</span>
              <button className="ghost-btn" onClick={() => setRoll(null)}><LogOut size={14} /> Exit</button>
            </div>
          </header>

          {/* desired SGPA control */}
          <div className="goal-bar panel">
            <div className="goal-left">
              <Target size={18} style={{ color: "var(--accent)" }} />
              <div>
                <div className="goal-label">Desired SGPA</div>
                <div className="goal-sub">Drag or type — everything updates live</div>
              </div>
            </div>
            <div className="goal-right">
              <input
                className="goal-range"
                type="range" min="4" max="10" step="0.1"
                value={desired} onChange={(e) => setDesired(Number(e.target.value))}
              />
              <input
                className="goal-num mono"
                type="number" min="4" max="10" step="0.1"
                value={desired} onChange={(e) => setDesired(Math.min(10, Math.max(0, Number(e.target.value) || 0)))}
              />
            </div>
          </div>

          <StatCards plan={plan} desired={desired} subjects={subjects} />

          {subjects.length === 0 ? (
            <div className="panel first-run">
              <Plus size={22} style={{ color: "var(--accent)" }} />
              <div className="first-run-title">Add your first subject</div>
              <p className="first-run-sub">
                Pick its sprint, enter whatever marks are out so far, and skip anything not conducted yet — internal, MCQ, or the external. The planner works around the gaps.
              </p>
              <button className="btn-accent" onClick={() => setWizard(true)}><Plus size={16} /> Add subject</button>
            </div>
          ) : (
            <div className="add-row">
              <button className="btn-accent" onClick={() => setWizard(true)}><Plus size={16} /> Add subject</button>
              <span className="add-hint">{subjects.length} subject{subjects.length !== 1 ? "s" : ""} · {plan.remaining.length} in progress</span>
            </div>
          )}

          <RequiredTable plan={plan} subjects={subjects} onTopic={(topic, subject) => setDrawer({ topic, subject })} />
          {subjects.length > 0 && <SummaryTable plan={plan} desired={desired} />}

          <footer className="foot">
            Grade scale &amp; passing rules are configurable at the top of the file. Estimates are credit-weighted; verify against your college handbook.
          </footer>
        </div>
      )}

      {wizard && <SubjectWizard onClose={() => setWizard(false)} onAdd={(s) => { setSubjects((p) => [...p, s]); setWizard(false); }} />}
      {drawer && <StudyDrawer topic={drawer.topic} subject={drawer.subject} onClose={() => setDrawer(null)} />}
      <PrintRoot topic={drawer?.topic} subject={drawer?.subject} plan={drawerPlan} />
    </div>
  );
}
