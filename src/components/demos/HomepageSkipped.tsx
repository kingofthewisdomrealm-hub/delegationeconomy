import { useState } from "react";
import { StageAid } from "./StageAid";

export function HomepageSkipped() {
  const [today, setToday] = useState(true);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Your homepage is the product"
      noteNext="The agent never requests the page"
      buttonLabel={today ? "Show the agent view" : "Show the homepage again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-4 text-center text-xl font-light tracking-tight sm:text-2xl">
        {today
          ? "The customer arrives at your homepage."
          : "The agent never arrives at your homepage."}
      </h2>
      {today ? (
        <div className="mx-auto w-full max-w-lg overflow-hidden border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
            <i className="size-2 rounded-full bg-line" />
            <i className="size-2 rounded-full bg-line" />
            <i className="size-2 rounded-full bg-line" />
            <span className="ml-2 flex-1 rounded-sm border border-line bg-surface px-2 py-0.5 text-[11px] text-muted">
              yourbrand.com
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 flex h-20 items-center justify-center bg-paper text-lg font-light tracking-tight text-ink">
              Your Brand · Summer
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-sm bg-paper p-2">
                <div className="text-faint tracking-wider uppercase">Hero copy</div>
                Free shipping over $75
              </div>
              <div className="rounded-sm bg-paper p-2">
                <div className="text-faint tracking-wider uppercase">Social proof</div>
                4.8 · 12,400 reviews
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface font-mono text-sm text-ink">
          <div className="border-b border-line px-4 py-2 text-[11px] tracking-wider text-faint uppercase">
            GET /v1/products/sku-48291
          </div>
          <pre className="px-4 py-4 text-xs leading-relaxed sm:text-sm">{`{
  "price": 89.00,
  "in_stock": true,
  "ships_in_days": 2,
  "return_window_days": 30,
  "cancel_path": "/api/cancel"
}`}</pre>
        </div>
      )}
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "You spent the budget on the page the human sees."
          : "No homepage requested. No video played. No brand film seen."}
      </p>
    </StageAid>
  );
}
