import { ChevronRight, BookOpen } from "lucide-react";
import {
  SPRINTS, COMP_LABEL, isGraded, gradeOf, enteredOf, pendingMaxOf, fullPass,
} from "../lib/grading";

/* ============================ Tables ============================ */
function SubjectRow({ s, ps, onTopic }) {
  const graded = isGraded(s);
  const g = graded ? gradeOf(s) : null;
  return (
    <tr>
      <td className="subj">{s.name}</td>
      <td className="num">{s.credits}</td>
      <td className="num mono">{enteredOf(s)}{!graded && <span className="of-max">/{enteredOf(s) + pendingMaxOf(s)}</span>}</td>
      <td>
        {graded ? (
          <span className="pill" style={{ color: fullPass(s) ? "var(--green)" : "var(--red)", background: fullPass(s) ? "rgba(52,211,153,.12)" : "rgba(244,63,94,.14)" }}>
            {fullPass(s) ? `${g.grade} · ${g.points}` : "Fail"}
          </span>
        ) : (
          <span className="pending-cell">
            <span className="pill" style={{ color: "var(--amber)", background: "rgba(251,191,36,.12)" }}>In progress</span>
            <span className="pending-keys">
              {ps && ps.pend.map((k) => <span key={k} className="pend-chip">{COMP_LABEL[k]}</span>)}
            </span>
          </span>
        )}
      </td>
      <td>
        {graded ? <span className="muted-sm">locked</span> :
          ps && ps.targetGrade !== "—" ? (
            <span className="mono" style={{ color: ps.reachable ? "var(--text)" : "var(--red)" }}>
              {ps.targetGrade} · {ps.targetPoints}
            </span>
          ) : <span className="muted-sm">—</span>}
      </td>
      <td className="num mono">
        {graded ? <span className="muted-sm">—</span> :
          ps && ps.targetGrade !== "—" ? (
            <span style={{ color: ps.reachable ? "var(--accent)" : "var(--red)" }}>
              {ps.needFromPending}<span className="of-max">/{ps.pendMax}</span>{!ps.reachable && " ✕"}
            </span>
          ) : "—"}
      </td>
      <td>
        <div className="chips">
          {s.topics.length === 0 && <span className="muted-sm">none</span>}
          {s.topics.map((t) => (
            <button key={t} className="chip" onClick={() => onTopic(t, s.name)}>
              {t} <ChevronRight size={12} />
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}

export function RequiredTable({ plan, subjects, onTopic }) {
  if (subjects.length === 0) {
    return (
      <div className="panel">
        <div className="panel-title">Required Marks &amp; Focus Plan</div>
        <div className="empty-state">
          <BookOpen size={26} style={{ color: "var(--muted2)" }} />
          <p>No subjects yet. Add one to see required marks and focus topics.</p>
        </div>
      </div>
    );
  }
  const groups = SPRINTS
    .map((sp) => ({ sprint: sp, items: subjects.filter((s) => (s.sprint || 1) === sp) }))
    .filter((grp) => grp.items.length > 0);
  return (
    <div className="panel">
      <div className="panel-title">Required Marks &amp; Focus Plan</div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th><th className="num">Cr</th><th className="num">Have</th>
              <th>Status</th><th>Target</th><th className="num">Need</th><th>Focus topics</th>
            </tr>
          </thead>
          {groups.map((grp) => {
            const b = plan.sprintBreakdown.find((x) => x.sprint === grp.sprint);
            return (
              <tbody key={grp.sprint} className="sprint-group">
                <tr className="sprint-head">
                  <td colSpan={7}>
                    <span className="sprint-badge">Sprint {grp.sprint}</span>
                    <span className="sprint-meta">
                      {grp.items.length} subject{grp.items.length !== 1 ? "s" : ""}
                      {b && b.sgpa != null && <> · graded SGPA {b.sgpa.toFixed(2)}</>}
                    </span>
                  </td>
                </tr>
                {grp.items.map((s) => (
                  <SubjectRow key={s.id} s={s} ps={plan.perSubject.find((p) => p.id === s.id)} onTopic={onTopic} />
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="table-foot">
        Grouped by sprint — the two sprints cover different subjects. <b>Have</b> = marks already in (of marks possible
        so far). <b>Need</b> = marks required from the still-pending components (chips: {Object.values(COMP_LABEL).join(" / ")})
        to reach the target grade — each pending exam must also clear its own passing mark.
        <span style={{ color: "var(--red)" }}> ✕</span> = can't reach it in this subject alone; lean harder on another.
      </div>
    </div>
  );
}
