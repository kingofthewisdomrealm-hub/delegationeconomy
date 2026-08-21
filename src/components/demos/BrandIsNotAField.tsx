import { useState } from "react";
import { StageAid } from "./StageAid";

export function BrandIsNotAField() {
  const [today, setToday] = useState(true);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Brand is why they choose you"
      noteNext="Brand is not a field"
      buttonLabel={today ? "Show what the agent can read" : "Show the brand story again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-4 text-center text-xl font-light tracking-tight sm:text-2xl">
        {today
          ? "Your brand is the reason they buy."
          : "Your brand is not a field the agent can read."}
      </h2>
      {today ? (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface">
          <div className="flex h-20 items-center justify-center bg-ink text-xl font-light tracking-tight text-paper">
            NORTH & CO.
          </div>
          <div className="p-5">
            <div className="mb-2 text-xs font-medium tracking-widest text-muted uppercase">
              Our story
            </div>
            <p className="text-lg font-light leading-snug">
              We exist to make everyday choices feel intentional again.
            </p>
            <p className="mt-3 text-sm text-muted">
              Founded in 2014. Small batches. Trusted by 40,000 customers who care about the details.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface font-mono text-sm text-ink">
          <div className="border-b border-line px-4 py-2 text-[11px] tracking-wider text-faint uppercase">
            Agent · readable fields only
          </div>
          <div className="space-y-1 px-4 py-4">
            <p>price: 89.00</p>
            <p>in_stock: true</p>
            <p>ships_in_days: 3</p>
            <p>return_window: 30</p>
            <p className="text-warn">
              cancel_path: null <span className="text-faint">← missing</span>
            </p>
            <p className="pt-3 text-faint">
              {"// brand, mission, awards"}
              <br />
              {"// → not present"}
              <br />
              {"// → ignored"}
            </p>
          </div>
        </div>
      )}
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "You spent years building a brand people feel."
          : "The mission statement never became a data point."}
      </p>
    </StageAid>
  );
}
