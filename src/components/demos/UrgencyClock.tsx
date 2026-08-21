import { useEffect, useState } from "react";
import { StageAid } from "./StageAid";

const START = 4 * 3600 + 12 * 60 + 37;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function UrgencyClock() {
  const [today, setToday] = useState(true);
  const [total, setTotal] = useState(START);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTotal((t) => (t > 0 ? t - 1 : START));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="The clock is running. Act now."
      noteNext="The same number, every day"
      buttonLabel={today ? "Show what the agent sees" : "Show the urgency offer again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-4 text-center text-xl font-light tracking-tight sm:text-2xl">
        {today ? "The offer ends in a few hours." : "The clock said that yesterday."}
      </h2>
      {today ? (
        <div className="mx-auto w-full max-w-sm border border-warn bg-warn-soft px-6 py-7 text-center">
          <div className="mb-2 text-xs font-medium tracking-widest text-warn uppercase">
            Limited time only
          </div>
          <div className="text-xl font-light">Summer Flash Sale</div>
          <div className="mt-3 text-4xl font-light tracking-tight">$89</div>
          <div className="mb-5 text-sm text-muted line-through">was $149</div>
          <div className="mb-5 flex justify-center gap-2">
            {[
              [pad(h), "hrs"],
              [pad(m), "min"],
              [pad(s), "sec"],
            ].map(([n, l]) => (
              <div key={l} className="min-w-16 bg-ink px-3 py-2 text-paper">
                <div className="font-sans text-2xl font-light tabular-nums">{n}</div>
                <div className="text-[10px] tracking-wider uppercase opacity-70">{l}</div>
              </div>
            ))}
          </div>
          <div className="inline-block bg-warn px-5 py-2.5 text-sm font-medium text-paper">
            Claim before it expires
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface font-mono text-sm leading-relaxed text-ink">
          <div className="border-b border-line px-4 py-2 text-[11px] tracking-wider text-faint uppercase">
            Agent · urgency integrity check
          </div>
          <div className="space-y-1 px-4 py-4">
            <p className="text-faint">{"// observed same product across sessions"}</p>
            <p>
              Today  countdown: <span className="text-ink">{pad(h)}:{pad(m)}:{pad(s)}</span>
            </p>
            <p>
              Yesterday  <span className="text-ink">04:12:37</span>
            </p>
            <p>
              7 days ago  <span className="text-ink">04:12:37</span>
            </p>
            <p>
              11 months  <span className="text-ink">04:12:37</span>
            </p>
            <p className="pt-2 text-warn">Flag: permanent artificial urgency</p>
            <p className="text-warn">“was $149” has been the strikethrough for 11 months</p>
            <p className="pt-2 text-ink">Action: excluded from shortlist</p>
          </div>
        </div>
      )}
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "Fake urgency works on people who are tired."
          : "Permanent urgency is just a lie with a timer."}
      </p>
      <p className="mt-1 text-center text-xs text-muted sm:text-sm">
        {today
          ? "An agent is not tired. And it remembers what the clock said yesterday."
          : "Once the buyer remembers, the tactic becomes evidence against you."}
      </p>
    </StageAid>
  );
}
