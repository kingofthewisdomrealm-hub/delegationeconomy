import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const FORM_ENDPOINT = "https://formspree.io/f/mgawddar";
const FALLBACK = "joey@delegationeconomy.fyi";

export function AskForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "warn">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value || value.indexOf("@") < 1 || value.lastIndexOf(".") < value.indexOf("@")) {
      setStatus("warn");
      setMessage("That address doesn’t look right — check it and try again.");
      return;
    }
    setStatus("sending");
    setMessage("Sending…");
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!r.ok) throw new Error("fail");
      setEmail("");
      setStatus("ok");
      setMessage("Got it. The brief is on its way.");
    } catch {
      setStatus("warn");
      setMessage(`That didn’t go through. Email ${FALLBACK} and I’ll add you by hand.`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md text-left" noValidate>
      <label htmlFor="email" className="mb-2 block text-sm font-medium">
        Where should I send it?
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          inputMode="email"
          className="min-h-12 flex-1 border border-faint bg-paper px-4 text-base text-ink outline-none placeholder:text-faint focus:border-ink"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
        >
          Send me the brief
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p className="mt-2 text-xs text-faint">One email. No cadence promises. Unsubscribe in one click.</p>
      {message ? (
        <p
          role="status"
          className={`mt-3 text-sm ${status === "ok" ? "text-ink" : "text-muted"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
