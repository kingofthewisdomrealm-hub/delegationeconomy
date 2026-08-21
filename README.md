# delegationeconomy.fyi

Landing page and stage visuals for the Delegation Economy talk.

## Where things live — read this before touching hosting

| Thing | Account / service | Note |
|---|---|---|
| Vercel project `delegationeconomy` | **`uberandujar-9502`**, team **JOSIAS** (`josias7`) | The live site. `./deploy.sh` is authenticated as this account. |
| Second Vercel account | `kingofthewisdomrealm@gmail.com`, team **COMMAND CENTRE** | Only has `storm-map`. **Cannot see the site.** Signing in here and hitting a 404 is the usual confusion. |
| Domain registrar | Porkbun, login `josiasandujar` | Nameservers are Porkbun's (`curitiba` / `fortaleza.ns.porkbun.com`). |
| Form capture | Formspree, account `uberandujar@gmail.com` | Submissions notify that address. |
| `joey@delegationeconomy.fyi` | Porkbun forward | → `kingofthewisdomrealm@gmail.com`. Different inbox from Formspree. |

**This folder is a git repo, and pushing to `main` deploys production.** Remote:
`kingofthewisdomrealm-hub/delegationeconomy`. The Vercel project is git-connected —
verified 2026-08-21 at
https://vercel.com/josias7/delegationeconomy/settings/git — so `git push origin main`
builds and promotes to delegationeconomy.fyi by itself. The same push runs the link
check in `.github/workflows/check-links.yml`.

`./deploy.sh` still works and uploads straight from your disk, bypassing git entirely.
Use it for `./deploy.sh preview` on something you have not committed. Shipping
production with it means the live site no longer matches `main`, and then nobody can
tell what is deployed by reading the repo. **Default to push.**

### DNS, and the trap that cost an afternoon

Both `delegationeconomy.fyi` and `www.delegationeconomy.fyi` work. The apex 308-redirects
to www, which is the canonical host.

The apex is an **ALIAS** record pointing at `ccfab9bf76ec010c.vercel-dns-017.com` — not an
A record. That matters:

Porkbun creates an `ALIAS → pixie.porkbun.com` parking record on every new domain. **An ALIAS
and an A record cannot coexist on the same name**, so adding Vercel's recommended
`A → 216.198.79.1` at the root appears to succeed — Porkbun even prints "SUCCESS! A record
created" — and then silently does nothing. The record never appears in the list. Hours
disappear into this.

The fix is to *edit* the existing ALIAS and repoint it, never to add an A record alongside it.

Two more Porkbun quirks worth knowing:

- The DNS page at `/account/dns/<domain>` does **not** list existing records. The real list is
  Domain Management → **Details ▼** → **DNS RECORDS** pencil.
- On that DNS page, "Add Record" only *stages* a record. **"Submit Records"** at the bottom is
  what saves. Records added and never submitted vanish without warning.

Do not touch: the two `MX` records and the `v=spf1` TXT (they run `joey@` forwarding), or the
`_acme-challenge` TXT records (SSL validation).

**No build step.** Plain HTML and CSS. `index.html` embeds the three demos in iframes so
there is one copy of each demo — the version on stage and the version on the site are the
same file.

```
index.html                        the landing page
demos/
  _shared.css                     one stylesheet, six aids, identical look
  _stage.js                       blackout key, shared by all six
  twelve-tabs.html                twelve tabs and ninety minutes vs. one sentence
  customer-disappears.html        47 companies compete, 46 never meet the customer
  the-subscription-bill.html      the annual cost of never getting around to it
  customer-exhaustion.html        nine steps to cancel vs. one instruction
  the-clock-lied.html             a live fake-urgency countdown, then the agent's log
  logo-cannot-charm-api.html      human view vs. agent view of the same business
vercel.json                       static config + security headers
```

## Run it locally

```bash
cd delegationeconomy
python3 -m http.server 4173
# open http://localhost:4173
```

Opening `index.html` directly with `file://` will not load the iframes. Use the server.

## Using the demos on stage

Open a demo file **without** `?embed=1` for the full-size version with the presenter cue
line at the bottom. Add `?embed=1` for the compact version used on the site (type shrinks,
presenter cue hides, blackout disabled).

Every aid has exactly two states and one button.

| Key | Does |
|---|---|
| **space / → / ←** | Flip the state. Works with a presenter remote from the back of the room. |
| **B** or **esc** | **Blackout.** Kills the screen to black. |
| any key | Comes out of a blackout without also advancing the reveal. |

### Use the blackout

This matters more than any individual visual. An aid that stays on screen after its moment
competes with you for the room, and Toastmasters evaluators notice when a prop is doing the
talking. Reveal, let it land for five to eight seconds, then press **B**. You get the
audience's eyes back for free.

### Cue lines, in talk order

| # | Demo | Reveal on / immediately after |
|---|---|---|
| 1 | `twelve-tabs` | “In the Delegation Economy, you say…” |
| 2 | `customer-disappears` | “The human being is leaving the battlefield.” |
| 3 | `the-subscription-bill` | “How many subscriptions do you still pay for because canceling them is annoying?” |
| 4 | `customer-exhaustion` | “Entire industries are protected by customer exhaustion. AI is about to cure it.” |
| 5 | `the-clock-lied` | “It knows the clock said that yesterday.” |
| 6 | `logo-cannot-charm-api` | “Your logo cannot charm an API.” |

### Do not use all six

Six exist so you can pick. In a 5–7 minute speech, **three is the ceiling** — probably
`twelve-tabs`, `the-subscription-bill`, and `the-clock-lied`, because those three make the
audience the victim rather than the business, and a room reacts to its own money before it
reacts to a stranger's. Every extra aid costs setup time you do not have and splits attention
you need.

Two of the aids carry illustrative figures — the subscription prices and the hotel countdown.
They are labelled as illustrative on screen. Say so out loud too, or use your own real
numbers, which are more shocking anyway.

The subscription ledger totals **$143.93 a month, $1,727 a year** across nine services. To
change it, edit the `ITEMS` array in `the-subscription-bill.html`; the monthly and annual
totals are computed from it, so they stay correct on their own.

### Layout constraint

Every aid is built to fit a 16:9 projector (about 1456×829) **without scrolling** — headline,
scene, caption and button all on one screen. If you add rows or lengthen copy, check it at
that size before the talk. `the-subscription-bill` is the tightest of the six and has the
least room left.

## The email capture

Live, via Formspree. `FORM_ENDPOINT` near the bottom of `index.html`:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/mgawddar';
```

**Submissions land in `uberandujar@gmail.com`** — the address the Formspree account was
created with. That is *not* the same inbox as `joey@delegationeconomy.fyi`, which forwards to
`kingofthewisdomrealm@gmail.com`. Two different inboxes; watch the right one.

Free tier is **50 submissions a month**. A big room could burn that in one night. If it fills
up, Formspree stops accepting — check the dashboard the morning after a talk.

Set `FORM_ENDPOINT` back to `''` and the form stops pretending to work: it shows the address
to write to instead. A signup form that silently drops emails is worse than no form, because
you never find out.

Any endpoint accepting `POST` with `{"email": "..."}` as JSON works, so swapping Formspree for
Buttondown, ConvertKit or your own function is a one-line change.

## Deploy

```bash
npx vercel --prod
```

Then in the Vercel dashboard, add `delegationeconomy.fyi` under **Settings → Domains** and
point the registrar's nameservers or A record where Vercel tells you. Static, so it costs
nothing on the hobby tier.

## What this is not

This is the argument, not the product. The product — a scanner that tells a business how
legible it is to an agent — should not get built until the talk has produced ten real
conversations with people who want it. Building first is the expensive way to learn
something a phone call answers.

One design constraint to carry into that build, decided early: score **machine-readability**
(can an agent find your price, policy, availability, cancellation path, structured data),
not reputation. The `SERVICE 2.1/5` figure on the stage demo is illustrative. Publishing an
automated quality verdict about a named real business is a defamation-shaped problem, not a
feature.

