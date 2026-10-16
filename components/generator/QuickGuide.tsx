"use client";
import { Check } from "lucide-react";

export interface GuideStep {
  id: string;
  title: string;
  text: string;
  done: boolean;
  actionLabel: string;
  onAction: () => void;
}

/* ───────────────────────────────────────────────
   First-time "3 steps" checklist. Not a modal and not a spotlight tour:
   it sits above the form, ticks steps off as the person really does them,
   and every step has a button that jumps to the right field.
   Dismissal is remembered on this device.
─────────────────────────────────────────────── */
export default function QuickGuide({
  steps, accent, onSkip, onClose, onExample, exampleActive,
}: {
  steps: GuideStep[];
  accent: string;
  onSkip: () => void;
  onClose: () => void;
  onExample: () => void;
  exampleActive: boolean;
}) {
  const doneCount = steps.filter((s) => s.done).length;
  const allDone = doneCount === steps.length;
  const current = steps.find((s) => !s.done)?.id;

  return (
    <section className="ig-guide" aria-label="Getting started" style={{ ["--accent" as string]: accent }}>
      <div className="ig-guide__head">
        <div>
          <h2 className="ig-guide__title">{allDone ? "🎉 Your first document is done" : "New here? Three quick steps"}</h2>
          <p className="ig-guide__sub">
            {allDone
              ? "You can make as many as you like — your details are remembered for next time."
              : `${doneCount} of ${steps.length} done. You don't need an account, and nothing is uploaded.`}
          </p>
        </div>
        <button type="button" className="ig-linkbtn" onClick={allDone ? onClose : onSkip}>
          {allDone ? "Close" : "Skip guide"}
        </button>
      </div>

      <ol className="ig-guide__list">
        {steps.map((s, i) => (
          <li key={s.id} className={`ig-guide__step${s.done ? " is-done" : ""}${s.id === current ? " is-current" : ""}`} aria-current={s.id === current ? "step" : undefined}>
            <span className="ig-guide__num" aria-hidden="true">{s.done ? <Check size={13} strokeWidth={3} /> : i + 1}</span>
            <div className="ig-guide__body">
              <p className="ig-guide__stitle">{s.title}{s.done && <span className="sr-only"> (done)</span>}</p>
              <p className="ig-guide__stext">{s.text}</p>
            </div>
            {!s.done && (
              <button type="button" className="ig-chip" onClick={s.onAction}>{s.actionLabel}</button>
            )}
          </li>
        ))}
      </ol>

      {!allDone && (
        <button type="button" className="ig-guide__example" onClick={onExample}>
          {exampleActive ? "✓ Example filled in — look at the preview, then replace it with your own details" : "Not sure what goes where? Fill the form with an example"}
        </button>
      )}
    </section>
  );
}
