/* print layout — questions first, answer key after a page break */
export function PrintRoot({ topic, subject, plan }) {
  if (!plan) return <div id="print-root" />;
  return (
    <div id="print-root">
      <h1>{subject} — {topic}</h1>
      <h2>Practice Questions</h2>
      {plan.mcqs.map((q, i) => (
        <div className="p-q" key={i}>
          <p><b>Q{i + 1}.</b> {q.question}</p>
          <ol type="A">{q.options.map((o, oi) => <li key={oi}>{o}</li>)}</ol>
        </div>
      ))}
      <div className="page-break" />
      <h2>Answer Key</h2>
      {plan.mcqs.map((q, i) => (
        <div className="p-a" key={i}>
          <p><b>Q{i + 1}: {"ABCD"[q.correctIndex]}</b> — {q.explanation}</p>
        </div>
      ))}
    </div>
  );
}
