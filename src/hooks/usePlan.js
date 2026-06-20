import { useMemo } from "react";
import {
  MAX_POINTS, SPRINTS, isGraded, enteredOf, pendingMaxOf, pendingKeys,
  gradeOf, tierForPoints,
} from "../lib/grading";

/* ============================ SGPA planner ============================ */
export function usePlan(subjects, desired) {
  return useMemo(() => {
    const completed = subjects.filter(isGraded);        // every component entered
    const remaining = subjects.filter((s) => !isGraded(s)); // something still pending
    const allCredits = subjects.reduce((a, s) => a + (Number(s.credits) || 0), 0);
    const remCredits = remaining.reduce((a, s) => a + (Number(s.credits) || 0), 0);
    const compCredits = completed.reduce((a, s) => a + (Number(s.credits) || 0), 0);
    const lockedQP = completed.reduce((a, s) => a + (Number(s.credits) || 0) * gradeOf(s).points, 0);

    const empty = subjects.length === 0;
    const lockedSGPA = compCredits ? lockedQP / compCredits : null;

    const needTotalQP = desired * allCredits;
    const needFromRem = needTotalQP - lockedQP;
    const avgGPRequired = remCredits > 0 ? needFromRem / remCredits : null;
    const maxReachable = allCredits ? (lockedQP + remCredits * MAX_POINTS) / allCredits : null;

    let verdict = "n/a", note = "";
    if (empty) {
      verdict = "n/a";
      note = "Add your subjects and enter whatever marks are out so far. Skip anything not conducted yet — the plan fills in around it.";
    } else if (remCredits === 0) {
      verdict = (lockedSGPA ?? 0) >= desired ? "achieved" : "locked";
      note = (lockedSGPA ?? 0) >= desired
        ? `Everything's graded and your SGPA is ${(lockedSGPA ?? 0).toFixed(2)} — target met.`
        : `Everything's graded at SGPA ${(lockedSGPA ?? 0).toFixed(2)}. Nothing left to move the number for this target.`;
    } else if (avgGPRequired <= 0) {
      verdict = "achieved";
      note = `You're already at or past ${desired.toFixed(2)} on graded credits. Just don't fail a pending subject — each still needs to clear every section.`;
    } else if (avgGPRequired > MAX_POINTS) {
      verdict = "impossible";
      note = `Hitting ${desired.toFixed(2)} would need an average of ${avgGPRequired.toFixed(2)} grade-points from the pending subjects, but ${MAX_POINTS} is the ceiling. The best you can still reach is about ${(maxReachable ?? 0).toFixed(2)}.`;
    } else if (avgGPRequired > 8.6) {
      verdict = "tight";
      note = `Doable but no slack — you need ~${avgGPRequired.toFixed(2)} GP across pending subjects, basically A+/O everywhere. One weak paper drops you under target.`;
    } else {
      verdict = "ontrack";
      note = `Comfortable. Averaging ~${avgGPRequired.toFixed(2)} GP across pending subjects gets you there, with room to absorb a softer result.`;
    }

    const tier = avgGPRequired != null && avgGPRequired > 0 ? tierForPoints(avgGPRequired) : null;
    const perSubject = remaining.map((s) => {
      const have = enteredOf(s);            // marks already in
      const pendMax = pendingMaxOf(s);      // max still available
      const pend = pendingKeys(s);          // which components are pending
      const reqTotal = tier ? tier.min : 0; // /100 needed for the target grade
      const needFromPending = Math.max(0, Math.round(reqTotal - have));
      const reachable = needFromPending <= pendMax;
      return {
        ...s,
        have, pendMax, pend,
        targetGrade: tier ? tier.grade : "—",
        targetPoints: tier ? tier.points : 0,
        needFromPending, reachable,
      };
    });

    return {
      empty, completed, remaining, allCredits, remCredits, lockedQP,
      lockedSGPA, avgGPRequired, verdict, note, perSubject, tier, maxReachable,
      sprintBreakdown: SPRINTS.map((sp) => {
        const inSp = subjects.filter((s) => (s.sprint || 1) === sp);
        const gradedSp = inSp.filter(isGraded);
        const cr = gradedSp.reduce((a, s) => a + (Number(s.credits) || 0), 0);
        const qp = gradedSp.reduce((a, s) => a + (Number(s.credits) || 0) * gradeOf(s).points, 0);
        return {
          sprint: sp,
          count: inSp.length,
          graded: gradedSp.length,
          sgpa: cr ? qp / cr : null,
        };
      }).filter((b) => b.count > 0),
    };
  }, [subjects, desired]);
}
