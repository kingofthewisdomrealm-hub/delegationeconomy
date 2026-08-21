import { useState } from "react";
import { Check } from "lucide-react";
import { StageAid } from "./StageAid";
import { cn } from "@/lib/utils";

const STEPS = [
  ["Log in to your account", "2 min"],
  ["Find Settings → Billing", "hunt"],
  ["Click “Manage subscription”", ""],
  ["Scroll past the upgrade offers", "trap"],
  ["“Are you sure? Here’s 30% off”", "quit point"],
  ["Select a cancellation reason", "survey"],
  ["Confirm you understand the loss", ""],
  ["Wait for the email to arrive", "hours"],
  ["Click the final confirm link", "done?"],
];

export function CancelWall() {
  const [today, setToday] = useState(true);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Nine steps. Most people quit at four."
      noteNext="One instruction. Then silence."
      buttonLabel={today ? "Show the agent version" : "Show the nine steps again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-4 text-center text-xl font-light tracking-tight sm:text-2xl">
        {today ? "Cancelling is designed to exhaust you." : "The agent does not get exhausted."}
      </h2>
      {today ? (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface">
          {STEPS.map(([label, friction], i) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-3 border-b border-line px-3 py-2 text-sm last:border-b-0",
                i === 4 && "bg-warn-soft text-warn",
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center border border-line text-[11px] font-medium text-muted">
                {i + 1}
              </span>
              <span className="flex-1">{label}</span>
              <span className="text-xs text-faint">{friction}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md">
          <div className="overflow-hidden border border-line bg-surface font-mono text-sm text-ink">
            <div className="border-b border-line px-4 py-2 text-[11px] tracking-wider text-faint uppercase">
              Agent · subscription cancellation
            </div>
            <div className="space-y-3 px-4 py-4">
              <p>
                <span className="text-ink">›</span> Cancel my [Service] subscription effective today. Do not accept any retention offer.
              </p>
              <p className="text-faint">{"// 1.4 seconds later"}</p>
              <p className="text-ink">Cancelled. Confirmation ID: CX-48291. No further charges.</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium tracking-widest text-paper uppercase">
            <Check className="size-4" strokeWidth={2.5} />
            Done in one instruction
          </div>
        </div>
      )}
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "Entire industries are protected by customer exhaustion."
          : "The wall was never a feature. It was a filter."}
      </p>
    </StageAid>
  );
}
