import { useState } from "react";
import { StageAid } from "./StageAid";

export function ComparisonSilent() {
  const [today, setToday] = useState(true);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Three options still feel open"
      noteNext="The decision already happened"
      buttonLabel={today ? "Show what the agent already did" : "Show the open shortlist again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-4 text-center text-xl font-light tracking-tight sm:text-2xl">
        {today ? "You are still being compared." : "The comparison finished without you."}
      </h2>
      {today ? (
        <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Brand A", "$94", "Ships in 3 days"],
            ["Brand B", "$89", "Ships in 2 days"],
            ["Brand C", "$97", "Ships tomorrow"],
          ].map(([name, price, meta]) => (
            <div key={name} className="border border-line bg-surface p-4">
              <div className="text-xs font-semibold tracking-wider uppercase">{name}</div>
              <div className="mt-2 text-2xl font-bold tracking-tight">{price}</div>
              <div className="mt-1 text-sm text-muted">{meta}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface font-mono text-sm leading-relaxed text-ink">
          <div className="border-b border-line px-4 py-2 text-[11px] tracking-wider text-faint uppercase">
            Agent comparison · 1.4s
          </div>
          <div className="space-y-3 px-4 py-4">
            <p className="text-muted">
              Brand A · rejected
              <span className="mt-0.5 block text-faint">reason: no machine-readable cancel path</span>
            </p>
            <p className="text-muted">
              Brand C · rejected
              <span className="mt-0.5 block text-faint">reason: “was $149” for 11 months</span>
            </p>
            <p className="text-ink">
              Brand B · selected
              <span className="mt-0.5 block text-faint">booked · confirmation sent</span>
            </p>
          </div>
        </div>
      )}
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "The shortlist still feels open to you."
          : "Two brands never knew they were evaluated. One never knew it lost."}
      </p>
    </StageAid>
  );
}
