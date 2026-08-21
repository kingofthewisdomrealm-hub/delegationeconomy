import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  today: boolean;
  pillToday: string;
  pillNext: string;
  noteToday: string;
  noteNext: string;
  children: ReactNode;
  buttonLabel: string;
  onFlip: () => void;
};

export function StageAid({
  today,
  pillToday,
  pillNext,
  noteToday,
  noteNext,
  children,
  buttonLabel,
  onFlip,
}: Props) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <span
          className={cn(
            "inline-flex px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase",
            today ? "border border-line text-muted" : "bg-ink text-paper",
          )}
        >
          {today ? pillToday : pillNext}
        </span>
        <span className="text-right text-xs text-muted sm:text-sm">
          {today ? noteToday : noteNext}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
        className="mx-auto mt-4 min-h-11 shrink-0 border border-ink bg-ink px-7 py-2.5 text-[13px] font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96] sm:mt-5"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
