import { useState } from "react";
import { StageAid } from "./StageAid";
import { cn } from "@/lib/utils";

const ITEMS = [
  { name: "Streaming A", price: 15.99, waste: true },
  { name: "Streaming B", price: 12.99, waste: false },
  { name: "Cloud storage (extra)", price: 9.99, waste: true },
  { name: "Productivity suite", price: 14.99, waste: false },
  { name: "News + magazines", price: 8.0, waste: true },
  { name: "Fitness app (unused)", price: 12.99, waste: true },
  { name: "Music", price: 10.99, waste: false },
  { name: "VPN (duplicate)", price: 7.99, waste: true },
  { name: "Photo storage", price: 2.99, waste: true },
];

const TOTAL = ITEMS.reduce((s, i) => s + i.price, 0);
const KEPT = ITEMS.filter((i) => !i.waste).reduce((s, i) => s + i.price, 0);
const CUT = TOTAL - KEPT;

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function SubscriptionLedger() {
  const [today, setToday] = useState(true);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Still paying because cancelling is annoying"
      noteNext="Six cancelled. Three kept."
      buttonLabel={today ? "Show the agent cleanup" : "Show the full ledger again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-3 text-center text-lg font-light tracking-tight sm:text-2xl">
        {today ? "What lazy loyalty costs you every month." : "The agent cleaned the ledger."}
      </h2>
      <div className="mx-auto w-full max-w-md overflow-hidden border border-line bg-surface">
        {ITEMS.map((item) => (
          <div
            key={item.name}
            className={cn(
              "flex items-center justify-between border-b border-line px-3 py-1.5 text-xs last:border-b-0 sm:text-sm",
              today
                ? item.waste && "text-muted"
                : item.waste
                  ? "text-faint line-through"
                  : "bg-accent-soft text-ink",
            )}
          >
            <span>{item.name}</span>
            <span className="tabular-nums">{money(item.price)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-ink px-3 py-2.5 text-xs font-semibold text-paper sm:text-sm">
          <span>{today ? "Monthly total" : "What you keep"}</span>
          <span className="tabular-nums">{today ? money(TOTAL) : money(KEPT)}</span>
        </div>
      </div>
      <p className="mt-3 hidden text-center text-sm font-semibold sm:block sm:text-base">
        {today
          ? "You are still paying for things you stopped using."
          : `Kept ${money(KEPT)} · Cut ${money(CUT)} / month`}
      </p>
      <p className="mt-1 hidden text-center text-xs text-muted sm:block sm:text-sm">
        {today
          ? "Not because they are valuable. Because cancelling is more work than the charge."
          : `Annual saving: $${Math.round(CUT * 12)}. No retention offers accepted.`}
      </p>
    </StageAid>
  );
}
