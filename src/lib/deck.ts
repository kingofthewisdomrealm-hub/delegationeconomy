export type SlideKind = "intro" | "bridge" | "demo" | "ask" | "extra";

export type DemoId = "tabs" | "ledger" | "clock" | "cancel" | "compare" | "homepage" | "brand";

export type Slide = {
  id: string;
  kind: SlideKind;
  kicker?: string;
  title: string;
  body?: string;
  demo?: DemoId;
  extra?: boolean;
};

export const SLIDES: Slide[] = [
  {
    id: "title",
    kind: "intro",
    kicker: "A talk in nine screens",
    title: "The Delegation Economy",
    body: "AI agents are becoming the buyer. People will not stop using the internet. They will stop personally operating it.",
  },
  {
    id: "click",
    kind: "intro",
    kicker: "One",
    title: "The click disappears.",
    body: "Your funnel assumes a human is somewhere in the loop — browsing, comparing, hesitating, clicking. The new buyer never arrives at the page.",
  },
  {
    id: "loyalty",
    kind: "intro",
    kicker: "Two",
    title: "Lazy loyalty disappears.",
    body: "Nine steps to cancel, and most people give up at four. An agent gets to step nine before you finish breakfast.",
  },
  {
    id: "manipulation",
    kind: "intro",
    kicker: "Three",
    title: "Manipulation becomes evidence.",
    body: "Fake urgency works on people who are tired. An agent is not tired, and it remembers what your countdown clock said yesterday.",
  },
  {
    id: "bridge",
    kind: "bridge",
    kicker: "Press them yourself",
    title: "Three switches from the talk.",
    body: "Each has two states — the world you sell into today, and the world after the customer delegates. Tap the scene to flip. Space moves on.",
  },
  {
    id: "demo-tabs",
    kind: "demo",
    title: "Twelve tabs, or one sentence",
    demo: "tabs",
  },
  {
    id: "demo-ledger",
    kind: "demo",
    title: "What lazy loyalty costs",
    demo: "ledger",
  },
  {
    id: "demo-clock",
    kind: "demo",
    title: "The clock that never dies",
    demo: "clock",
  },
  {
    id: "ask",
    kind: "ask",
    kicker: "The brief",
    title: "One page on what to change before your buyer is a machine.",
    body: "Pricing, policies, structured data, and the cancellation path you’ve been quietly relying on.",
  },
  {
    id: "demo-cancel",
    kind: "extra",
    title: "The cancel wall",
    demo: "cancel",
    extra: true,
  },
  {
    id: "demo-compare",
    kind: "extra",
    title: "The comparison is silent",
    demo: "compare",
    extra: true,
  },
  {
    id: "demo-homepage",
    kind: "extra",
    title: "The homepage never loads",
    demo: "homepage",
    extra: true,
  },
  {
    id: "demo-brand",
    kind: "extra",
    title: "Brand is not a field",
    demo: "brand",
    extra: true,
  },
];

export const MAIN_COUNT = SLIDES.filter((s) => !s.extra).length;
export const ASK_INDEX = SLIDES.findIndex((s) => s.id === "ask");
