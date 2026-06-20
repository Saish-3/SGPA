import { useState, useEffect } from "react";

export function LoadingState() {
  const msgs = ["Reading the syllabus…", "Cooking exam-style MCQs…", "Double-checking the answer key…"];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % msgs.length), 1100); return () => clearInterval(t); }, []);
  return (
    <div className="loading">
      <div className="loader-ring" />
      <div className="loading-msg">{msgs[i]}</div>
      <div className="skel-stack">
        {[80, 60, 92, 70].map((w, k) => <div className="skel" style={{ width: `${w}%` }} key={k} />)}
      </div>
    </div>
  );
}
