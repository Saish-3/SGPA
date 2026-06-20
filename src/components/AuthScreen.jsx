import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

/* ============================ Auth ============================ */
export function AuthScreen({ onEnter }) {
  const [roll, setRoll] = useState("");
  const submit = () => { if (roll.trim().length >= 3) onEnter(roll.trim().toUpperCase()); };
  return (
    <div className="auth-wrap">
      <div className="auth-glow" />
      <div className="auth-card fade-up">
        <div className="brand">
          <span className="brand-mark"><Sparkles size={16} /></span>
          <span>Sigma · SGPA Engine</span>
        </div>
        <h1 className="auth-title">Plan the score you<br />actually want.</h1>
        <p className="auth-sub">Lock your internals, set a target SGPA, and see exactly what each external needs.</p>
        <label className="field-label">Roll number</label>
        <div className="auth-input-row">
          <input
            autoFocus
            className="auth-input"
            placeholder="e.g. 21CSE042"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className="btn-accent" onClick={submit}>
            Enter <ArrowRight size={16} />
          </button>
        </div>
        <p className="auth-foot">No password. Your roll number just labels this session.</p>
      </div>
    </div>
  );
}
