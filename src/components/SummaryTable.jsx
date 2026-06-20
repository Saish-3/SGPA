import { Check, AlertTriangle, X } from "lucide-react";
import { VERDICT_META } from "../lib/verdict";

/* ============================ Summary table ============================ */
export function SummaryTable({ plan, desired }) {
  const vm = VERDICT_META[plan.verdict];
  const rows = [
    ["Desired SGPA", desired.toFixed(2)],
    ["Current graded SGPA", plan.lockedSGPA == null ? "—" : plan.lockedSGPA.toFixed(2)],
    ...plan.sprintBreakdown.map((b) => [
      `Sprint ${b.sprint} SGPA`,
      b.sgpa == null ? `— (${b.graded}/${b.count} graded)` : `${b.sgpa.toFixed(2)} (${b.graded}/${b.count} graded)`,
    ]),
    ["Total credits", `${plan.allCredits} (${plan.remCredits} pending)`],
    ["Avg grade-points needed (pending)", plan.avgGPRequired == null ? "—" : Math.max(0, plan.avgGPRequired).toFixed(2)],
    ["Suggested uniform target", plan.tier ? `${plan.tier.grade} · ${plan.tier.points} pts (${plan.tier.min}+/100)` : "—"],
    ["Best SGPA still reachable", plan.maxReachable == null ? "—" : plan.maxReachable.toFixed(2)],
  ];
  return (
    <div className="panel">
      <div className="panel-title">Target Summary</div>
      <div className="summary-grid">
        <table className="kv-table">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}><td className="kv-k">{k}</td><td className="kv-v mono">{v}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="verdict-box" style={{ borderColor: vm.color }}>
          <div className="verdict-label" style={{ color: vm.color, background: vm.bg }}>
            {plan.verdict === "ontrack" && <Check size={14} />}
            {(plan.verdict === "tight") && <AlertTriangle size={14} />}
            {plan.verdict === "impossible" && <X size={14} />}
            {vm.label}
          </div>
          <p className="verdict-note">{plan.note}</p>
        </div>
      </div>
    </div>
  );
}
