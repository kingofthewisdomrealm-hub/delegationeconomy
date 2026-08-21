import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import { ASK_INDEX, MAIN_COUNT, SLIDES } from "@/lib/deck";
import { DemoStage } from "@/components/demos";
import { AskForm } from "@/components/AskForm";
import { cn } from "@/lib/utils";

export function Deck() {
  const [index, setIndex] = useState(0);
  const [present, setPresent] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [extras, setExtras] = useState(false);
  const touchX = useRef<number | null>(null);

  const last = extras ? SLIDES.length - 1 : MAIN_COUNT - 1;
  const slide = SLIDES[Math.min(index, last)];
  const atAsk = slide.kind === "ask";

  const go = useCallback(
    (dir: 1 | -1) => {
      setBlackout(false);
      setIndex((i) => Math.min(last, Math.max(0, i + dir)));
    },
    [last],
  );

  const openExtras = () => {
    setExtras(true);
    setIndex(ASK_INDEX + 1);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const k = e.key.toLowerCase();
      if (present && (k === "b" || k === "escape")) {
        e.preventDefault();
        setBlackout((v) => !v);
        return;
      }
      if (blackout) {
        e.preventDefault();
        setBlackout(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, present, blackout]);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.changedTouches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchX.current;
    touchX.current = null;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) < 50) return;
    go(dx < 0 ? 1 : -1);
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col bg-paper text-ink"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header className="flex items-center justify-between px-4 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase"
        >
          Delegation Economy
        </button>
        <div className="flex items-center gap-2">
          {index > 0 && index < ASK_INDEX ? (
            <button
              type="button"
              onClick={() => setIndex(ASK_INDEX)}
              className="hidden min-h-11 px-3 text-xs text-muted sm:inline"
            >
              Skip to the brief
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setPresent((p) => !p);
              setBlackout(false);
            }}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 px-3 text-[11px] font-medium tracking-wide uppercase",
              present ? "bg-ink text-paper" : "text-faint",
            )}
          >
            <Presentation className="size-4" />
            Present
          </button>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-y-auto px-5 pb-2 sm:px-10">
        <div key={slide.id} className="slide-enter flex min-h-0 flex-1 flex-col justify-center py-2">
          {slide.kind === "intro" || slide.kind === "bridge" ? (
            <IntroSlide slide={slide} />
          ) : null}
          {slide.demo ? <DemoStage id={slide.demo} /> : null}
          {atAsk ? <AskSlide onMore={openExtras} extras={extras} present={present} /> : null}
        </div>
      </main>

      <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink disabled:opacity-20"
          aria-label="Previous"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex flex-wrap justify-center gap-1.5">
          {SLIDES.slice(0, last + 1).map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to ${s.title}`}
              onClick={() => setIndex(i)}
              className={cn(
                "size-1.5 transition-all",
                i === index ? "w-5 bg-ink" : "bg-faint",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === last}
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink disabled:opacity-20"
          aria-label="Next"
        >
          <ChevronRight className="size-6" />
        </button>
      </nav>

      <p className="pb-5 text-center text-[10px] tracking-[0.16em] text-faint uppercase">
        {present
          ? "space / → next · ← back · B blackout"
          : "space / arrows to move · tap a scene to flip"}
      </p>

      {blackout ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-paper pb-10"
          onClick={() => setBlackout(false)}
        >
          <span className="text-xs tracking-widest text-faint uppercase">press any key</span>
        </div>
      ) : null}
    </div>
  );
}

function IntroSlide({
  slide,
}: {
  slide: { kicker?: string; title: string; body?: string };
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {slide.kicker ? (
        <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-faint uppercase">
          {slide.kicker}
        </p>
      ) : null}
      <h1 className="font-display text-[clamp(2.1rem,7.5vw,4.5rem)] leading-[1.02] font-light tracking-tight">
        {slide.title}
      </h1>
      {slide.body ? (
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {slide.body}
        </p>
      ) : null}
    </div>
  );
}

function AskSlide({
  onMore,
  extras,
  present,
}: {
  onMore: () => void;
  extras: boolean;
  present: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <p className="mb-5 text-[11px] font-medium tracking-[0.22em] text-faint uppercase">
        The brief
      </p>
      <h1 className="font-display text-[clamp(1.7rem,5vw,3.1rem)] leading-[1.08] font-light tracking-tight">
        One page on what to change before your buyer is a machine.
      </h1>
      <p className="mx-auto mt-4 mb-8 max-w-lg text-base text-muted">
        Pricing, policies, structured data, and the cancellation path you’ve been quietly relying
        on.
      </p>
      {!present ? <AskForm /> : (
        <p className="text-sm text-muted">delegationeconomy.fyi — leave this up after the talk.</p>
      )}
      {!present && !extras ? (
        <button
          type="button"
          onClick={onMore}
          className="mt-10 min-h-11 text-sm text-muted underline-offset-4 hover:underline"
        >
          Four more switches
        </button>
      ) : null}
      <p className="mt-8 text-sm text-faint">
        Want this talk:{" "}
        <a className="text-ink" href="mailto:joey@delegationeconomy.fyi">
          joey@delegationeconomy.fyi
        </a>
      </p>
    </div>
  );
}
