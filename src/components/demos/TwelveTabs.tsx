import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { StageAid } from "./StageAid";

const TABS: [string, number, number, number, boolean?][] = [
  ["Flights — 6 stops, 19 hrs", 2, 4, -3],
  ["Hotels near the beach (page 7 of 40)", 24, 0, 2],
  ["Is this hotel a scam? — forum", 50, 10, -2],
  ["promo code 2032 reddit", 74, 2, 4],
  ["Cheapest week to fly?", 6, 92, 3],
  ["Reviews: “rooms smell fine now”", 28, 100, -3],
  ["Baggage fees explained", 52, 88, 2],
  ["Travel insurance — 41 options", 74, 96, -4],
  ["Same hotel, different site, $60 less", 8, 180, -2],
  ["Weather in October", 34, 188, 3],
  ["Do I need a visa?", 56, 178, -3],
  ["Notes: ask spouse (again)", 76, 186, 2, true],
];

export function TwelveTabs() {
  const [today, setToday] = useState(true);
  const tabs = useMemo(() => TABS, []);

  return (
    <StageAid
      today={today}
      pillToday="Today"
      pillNext="Delegated"
      noteToday="Ninety minutes, twelve tabs"
      noteNext="One instruction, then silence"
      buttonLabel={today ? "Delegate it instead" : "Show the tabs again"}
      onFlip={() => setToday((v) => !v)}
    >
      <h2 className="mb-3 text-center text-lg font-light tracking-tight sm:text-2xl">
        {today ? "Planning a holiday, today." : "Planning a holiday, soon."}
      </h2>
      <div className="relative mx-auto h-[200px] w-full max-w-2xl overflow-hidden sm:h-[240px]">
        <div
          className={`absolute inset-y-0 left-0 right-10 transition-opacity duration-300 ${today ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {tabs.map((t, i) => (
            <div
              key={i}
              className={`absolute w-32 overflow-hidden border border-line bg-surface text-[10px] sm:w-40 sm:text-xs ${t[4] ? "border-ink" : ""}`}
              style={{
                left: `${Math.min(t[1] * 0.72, 50)}%`,
                top: `${t[2] * 0.62}px`,
                transform: `rotate(${t[3]}deg)`,
              }}
            >
              <div className="flex items-center gap-1 border-b border-line bg-paper px-1.5 py-1">
                <i className="size-1.5 rounded-full bg-line" />
                <i className="size-1.5 rounded-full bg-line" />
                <i className="size-1.5 rounded-full bg-line" />
              </div>
              <div className="truncate px-2 py-1.5">{t[0]}</div>
            </div>
          ))}
        </div>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${today ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <p className="w-full max-w-xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed sm:text-base">
            <span className="mr-2 font-medium text-ink">›</span>
            Seven days, under $3,000. No overnight flights. Good food. Quiet hotel. Skip anyone with terrible service. Use my points. Book it.
          </p>
          <div className="flex items-center gap-2 bg-ink px-6 py-3 text-xs font-medium tracking-widest text-paper uppercase">
            <Check className="size-4" strokeWidth={2.5} />
            Booked
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-semibold sm:text-base">
        {today
          ? "Twelve tabs. Ninety minutes. You stay home."
          : "Eleven companies were compared. None of them were seen."}
      </p>
      <p className="mt-1 text-center text-xs text-muted sm:text-sm">
        {today
          ? "Every one of those companies got a look. That was their whole business model."
          : "No abandoned cart. They simply stopped being chosen."}
      </p>
    </StageAid>
  );
}
