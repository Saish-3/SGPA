import { TrendingUp } from "lucide-react";
import { isGraded, fullPass } from "../lib/grading";
import { VERDICT_META } from "../lib/verdict";
import { Tag } from "./Tag";

/* ============================ Stat cards ============================ */
export function StatCards({ plan, desired, subjects }) {
  const atRisk = subjects.filter((s) => isGraded(s) && !fullPass(s)).length;
  const vm = VERDICT_META[plan.verdict];
  const sgpa = (v) => (v == null ? "—" : v.toFixed(2));
  const cards = [
    { tag: "NOW", val: sgpa(plan.lockedSGPA), color: "var(--text)", desc: "Current SGPA on graded credits", src: `${plan.completed.length} fully graded` },
    { tag: "GOAL", val: desired.toFixed(2), color: "var(--accent)", desc: "Desired SGPA target", src: "credit-weighted" },
    { tag: "NEED", val: plan.avgGPRequired == null ? "—" : Math.max(0, plan.avgGPRequired).toFixed(2), color: vm.color, desc: "Avg grade-points needed from pending", src: `${plan.remaining.length} in progress` },
    { tag: "CR", val: `${plan.allCredits - plan.remCredits}/${plan.allCredits}`, color: "var(--text)", desc: "Credits graded of total", src: "this semester" },
    { tag: "MAX", val: sgpa(plan.maxReachable), color: "var(--green)", desc: "Best SGPA still reachable", src: "if you ace the rest" },
    { tag: "RISK", val: String(atRisk), color: atRisk ? "var(--red)" : "var(--green)", desc: "Graded subjects failing a section", src: "internal / mcq / external" },
  ];
  return (
    <div className="panel">
      <div className="panel-head"><TrendingUp size={16} style={{ color: "var(--accent)" }} /> Semester by the Numbers</div>
      <div className="card-grid">
        {cards.map((c, idx) => (
          <div className="stat-card fade-up" style={{ animationDelay: `${idx * 50}ms` }} key={idx}>
            <Tag>{c.tag}</Tag>
            <div className="stat-val" style={{ color: c.color }}>{c.val}</div>
            <div className="stat-desc">{c.desc}</div>
            <div className="stat-src">{c.src}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
