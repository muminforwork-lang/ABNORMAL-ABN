# ABNORMAL Store — Phase 2, Batch 3

**Three improvements completed: #50, #51 and #28.**

Your project is already updated. This report contains the full code for all **11 application/test files changed in this batch**, measured against the completed second batch. The earlier work has been preserved.

This report and `phase-2-batch-3-checks.json` are stored in `docs/reports/` so they remain with the project. The older reports were not present in the restored filesystem; their absence did not affect the saved source changes.

## What changed, in plain English

### #50 — Dialogs behave like real dialogs

The artwork viewer, featured shelf and mobile menu now share one dialog system:

- Opening a dialog puts focus on its close button. Tab and Shift+Tab stay inside it.
- The page behind it cannot take focus or receive normal interaction.
- Escape, the close button and genuine backdrop clicks dismiss the relevant dialog. Clicking the artwork itself does not close it.
- Closing restores focus to the opener when it is still visible. A resize can use the visible logo/alternate trigger instead of focusing a hidden button.
- Scroll locking is shared and released cleanly, including after navigation and when motion preferences replace the smooth-scroll engine.
- Arrow-key behavior belongs to the dialog, not a global window listener.
- The normal pointer stays visible above the native browser dialog layer.
- The shelf can scroll vertically on short screens so its product details remain reachable.

Native browser dialogs are used where available; a focus/isolation fallback is included and tested with `showModal` disabled in Chromium. No dialog or animation library was added.

### #51 — Form submission and clear validation

The payment-summary section is now a real form. **Enter** in its fields submits through the same local-only handler as the button.

- Empty fields and malformed sender numbers show field-specific errors, linked to the relevant inputs with accessible descriptions.
- The first invalid field receives focus, with its **label and input** placed below the fixed header.
- `+------` is rejected. Sender checks count **7–15 digits**, not punctuation; a leading plus, spaces and hyphens are allowed.
- Receipt references must contain text and fit the existing 120-character limit without embedded control characters/newlines.
- Binance still does not require a sender phone number. The exact currency-compatible amount and chosen duration remain unchanged.
- A synchronous guard prevents repeated submissions during navigation.
- Without JavaScript, the controls remain disabled and the existing manual-support guidance stays visible.

These are **basic input checks**, not proof that an account exists or that money was received. The form still only prepares a local summary. No backend submission, storage or automatic message was introduced. Custom validation is used (`noValidate`) so errors can be consistently described and focused rather than relying on browser-specific popup bubbles.

### #28 — Header and mobile menu fit their space

The header now switches layout based on available space and text size, rather than forcing all desktop controls into an intermediate-width screen.

- The clock cannot override its responsive wrapper and cause a crowded header.
- A compact menu is used where the full row does not fit, including the tested 1024px and 1280px cases.
- The menu uses the actual header height instead of conflicting 60px/73px offsets.
- Clicking the current route closes the menu too.
- Changing to a desktop layout closes the menu, releases scrolling and restores focus to a visible control.
- At enlarged text sizes, decorative indices/arrows and the wordmark can give way to readable destination words, the brand emblem and the close/menu control.
- The no-JavaScript menu still works, using the same existing destinations.

## Preserved

**All 25 products, every configured price/duration, payment numbers, existing link destinations and routes remain unchanged.** The seven theme mappings, artwork files, exact-currency payment logic, duration handoff and memory-only summary lifecycle are preserved. No app dependency was added or upgraded. Nothing was committed, pushed or deployed, and no real payment or support message was sent.

## Actual verification

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm test` | **51 passed**: the earlier 35 plus 16 new tests |
| `npm run build` | **40 pages** generated successfully |
| `git diff --check` | Passed |
| Dialog lifecycle | Gallery + shelf tested on keyboard desktop, touch phone, landscape and native-dialog-API fallback |
| Header/menu | **11 viewport/text-size cases**, plus an open-menu resize/reopen case |
| Form | Enter submission, invalid-input focus and purchase regression checks passed on desktop, 390px phone and 320px phone |
| Catalog routes | All **25 routes** return HTTP 200 with the correct initial currency-compatible methods |
| Scoped accessibility checks | **8 axe checks, zero violations** in the checked dialog/menu/form scopes |
| Previous motion/no-JS work | No-JS catalog/navigation/form fallback, touch homepage scrolling and live reduced-motion/Lenis cleanup checks passed |
| Browser errors/requests | Final probes recorded no uncaught app errors, console/hydration errors, external requests or non-read requests |

The required commands ran after each logical implementation change and after browser-driven refinements. Test totals progressed from 35 at the restored baseline to 40 after dialog work and 51 after validation; every subsequent check passed with 51 tests and a 40-page build. The existing Node package-module warning remains nonfatal.

### Browser findings corrected before delivery

- An invalid input was visible but its label could sit partly behind the fixed header. Error scrolling now targets the whole field group; final checks assert label visibility too.
- The enlarged-text menu footer overflowed horizontally. It now wraps, and cramped layouts prioritize destination words instead of decorative indices/arrows.

### Scope and limitations

- Tests used **Chromium 153.0.8010.0** with emulated viewports/input/preferences. They do not certify physical Android/iPhone, Safari or Firefox behavior.
- The 200% tests change the root font size. The **header/menu** passed, but unrelated catalog content still overflows at 200% on the narrow phone cases. A full-site enlarged-text/reflow pass remains to be done; this report does not claim it is fixed.
- Axe results are scoped checks, not whole-site WCAG certification.
- Synthetic payment details and a clipboard stub were used. No real transaction was attempted.
- No new Lighthouse score or field-performance claim is made. Before/after Lighthouse measurements and deployment instructions remain part of the overall Phase 2 completion.

## Files changed

| File | Status | Purpose |
|---|---|---|
| `src/app/globals.css` | Updated | Native dialog resets, visible system cursor during dialogs, scrollable short-screen shelf, field-error styling, adaptive header/menu and enlarged-text rules. |
| `src/components/modal.tsx` | New | New shared dialog wrapper: body portal, native modality, focus lifecycle and genuine backdrop-click handling. |
| `src/components/prestige/featured-drop.tsx` | Updated | Uses the shared modal; scoped arrow keys, preserved drag behavior, reliable focus restoration and scroll cleanup. |
| `src/components/prestige/product-gallery.tsx` | Updated | Uses the shared modal; scoped arrow keys, explicit close/backdrop behavior and no delayed focus timer. |
| `src/components/prestige/scroll-lock.ts` | Updated | Each modal owns an idempotent release function; restores previous styles and handles Lenis replacement safely. |
| `src/components/purchase-form.tsx` | Updated | Real local form with Enter submission, linked field errors, basic validation, duplicate-submit guard and label-aware focus scrolling. |
| `src/components/site-header.tsx` | Updated | Content-aware navigation layout, measured header height, accessible menu dialog, current-route closing, resize cleanup and no-JS navigation. |
| `src/lib/dialog.ts` | New | New keyboard/focus/isolation lifecycle helper, including a fallback when native showModal is unavailable. |
| `src/lib/purchase-validation.ts` | New | New pure field validation; digit-counted sender numbers and bounded, single-line receipt references. |
| `tests/purchase-validation.test.ts` | New | 11 new tests covering sender/receipt validation and method-dependent requirements. |
| `tests/scroll-lock.test.ts` | New | 5 new tests covering lock ownership, original-style restoration and scroller lifecycle changes. |

## Please test on your phone and PC

1. Open product artwork, then press **Tab**, **Shift+Tab** and **Escape**. Focus should stay in the viewer until it closes, then return to the artwork button.
2. Open the featured shelf. Try closing it and opening a product. The page should scroll normally again afterward.
3. Open the mobile menu, select the page you are already on, then resize to a wide screen. It should close without leaving the page locked.
4. On a product page, press Enter with empty details or type `+------` as the sender number. You should see a clear error and the focused field's label. You do not need to make a real payment to test this.
5. Try enlarged text and Reduce Motion. Navigation should remain reachable, and the earlier static-mode behavior should remain intact.

The live production preview is running on port 3000. **11 of 77 actionable audit recommendations are complete across three batches; 66 remain.** Original recommendation #72 remains withdrawn as previously corrected. This is not the end of Phase 2.

---

# Complete changed-file code

All 11 application/test files are included verbatim below, including the full stylesheet. There are no omitted sections or placeholder replacements. The companion JSON contains the exact browser results, source hashes, command-cycle results and the carried-forward progress record.

## `src/app/globals.css`

```css
@import 'tailwindcss';

/* --------------------------------------------------------------------------
   Self-hosted accent glyphs.
   The Latin faces below do not contain CJK or the Bengali Taka sign, so we
   ship two tiny subsets (2.7 kB + 0.7 kB) that guarantee 異常 and ৳ render on
   every device instead of showing a tofu box.
   -------------------------------------------------------------------------- */
@font-face {
  font-family: 'ABN Kanji';
  src: url('/fonts/kanji.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'ABN Taka';
  src: url('/fonts/taka.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* ==========================================================================
   ABNORMAL — design tokens
   Deep charcoal + black base, crimson accent, restrained violet highlight.
   Change a value here and it updates everywhere in the store.
   ========================================================================== */

@theme {
  /* Typefaces (loaded with next/font in src/app/layout.tsx) */
  --font-display: var(--font-sora), 'ABN Kanji', ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
    'Noto Sans JP', 'Hiragino Sans', sans-serif;
  --font-sans: var(--font-manrope), 'ABN Taka', 'ABN Kanji', ui-sans-serif, system-ui, -apple-system,
    'Segoe UI', 'Nirmala UI', 'Noto Sans Bengali', 'Noto Sans JP', sans-serif;
  --font-mono: var(--font-mono-price), 'ABN Taka', ui-monospace, 'SFMono-Regular', Consolas, monospace;
  --font-serif: var(--font-instrument), 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;

  /* Ink — the black / charcoal stack */
  --color-ink-950: #030308;
  --color-ink-900: #07070d;
  --color-ink-850: #0a0a12;
  --color-ink-800: #0e0e18;
  --color-ink-750: #12121e;
  --color-ink-700: #171724;
  --color-ink-650: #1d1d2c;
  --color-ink-600: #262638;
  --color-ink-500: #34344a;
  --color-ink-400: #4a4a63;

  /* Bone — text */
  --color-bone-50: #f9f9fd;
  --color-bone-100: #eeeef6;
  --color-bone-200: #d6d6e4;
  --color-bone-300: #adaec2;
  --color-bone-400: #83849b;
  --color-bone-500: #5e5f75;

  /* Crimson — primary accent */
  --color-crimson-200: #ffc2ca;
  --color-crimson-300: #ff8a99;
  --color-crimson-400: #ff5064;
  --color-crimson-500: #e8102f;
  --color-crimson-600: #bd0c26;
  --color-crimson-700: #8c0a1d;
  --color-crimson-900: #38040f;

  /* Aura — restrained violet highlight */
  --color-aura-200: #ded7ff;
  --color-aura-300: #c6b8fd;
  --color-aura-400: #a78bfa;
  --color-aura-500: #7c5cff;
  --color-aura-600: #5b3fd6;
  --color-aura-900: #191141;

  /* Motion */
  --animate-float-slow: float 11s ease-in-out infinite;
  --animate-float-slower: float 17s ease-in-out infinite;
  --animate-drift: drift 34s linear infinite;
  --animate-drift-reverse: drift-reverse 46s linear infinite;
  --animate-pulse-soft: pulse-soft 6s ease-in-out infinite;
  --animate-sheen: sheen 9s ease-in-out infinite;
  --animate-rise: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-spin-slow: spin 46s linear infinite;

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ==========================================================================
   Keyframes
   ========================================================================== */

@keyframes float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -14px, 0);
  }
}

@keyframes drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(26px, -34px, 0) scale(1.06);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes drift-reverse {
  0% {
    transform: translate3d(0, 0, 0) scale(1.04);
  }
  50% {
    transform: translate3d(-30px, 26px, 0) scale(1);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1.04);
  }
}

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.95;
  }
}

@keyframes sheen {
  0% {
    transform: translateX(-120%);
    opacity: 0;
  }
  35% {
    opacity: 0.55;
  }
  100% {
    transform: translateX(220%);
    opacity: 0;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

/* ==========================================================================
   Base
   ========================================================================== */

@layer base {
  * {
    border-color: color-mix(in oklab, var(--color-ink-600) 70%, transparent);
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    scroll-padding-top: calc(var(--site-header-height, 74px) + 1rem);
    scrollbar-gutter: stable;
  }

  body {
    background-color: var(--color-ink-950);
    color: var(--color-bone-200);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  h1,
  h2,
  h3,
  h4 {
    color: var(--color-bone-50);
    text-wrap: balance;
    font-weight: 600;
  }

  p {
    text-wrap: pretty;
  }

  ::selection {
    background: color-mix(in oklab, var(--color-crimson-500) 55%, transparent);
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid var(--color-crimson-400);
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-ink-950);
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(var(--color-ink-600), var(--color-ink-700));
    border-radius: 999px;
    border: 2px solid var(--color-ink-950);
  }
  html[data-effects='on']::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(var(--color-crimson-700), var(--color-ink-700));
  }
}

/* ==========================================================================
   Components / utilities
   ========================================================================== */

@layer components {
  /* Page wrapper -------------------------------------------------------- */
  .shell {
    width: 100%;
    max-width: 84rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
  }
  @media (min-width: 768px) {
    .shell {
      padding-inline: 2rem;
    }
  }
  @media (min-width: 1280px) {
    .shell {
      padding-inline: 2.5rem;
    }
  }

  /* Panels -------------------------------------------------------------- */
  .panel {
    position: relative;
    border-radius: 1.75rem;
    border: 1px solid color-mix(in oklab, var(--color-ink-600) 85%, transparent);
    background:
      linear-gradient(160deg, color-mix(in oklab, var(--color-ink-800) 97%, transparent), color-mix(in oklab, var(--color-ink-900) 99%, transparent));
    box-shadow:
      0 1px 0 0 rgb(255 255 255 / 0.03) inset,
      0 24px 60px -40px rgb(0 0 0 / 0.9);
  }

  .panel-quiet {
    border-radius: 1.35rem;
    border: 1px solid color-mix(in oklab, var(--color-ink-600) 70%, transparent);
    background: color-mix(in oklab, var(--color-ink-850) 94%, transparent);
  }

  /* Hover lift used by cards ------------------------------------------- */
  .lift {
    transition:
      transform 0.5s var(--ease-out-expo),
      border-color 0.4s ease,
      box-shadow 0.5s ease;
  }
  html[data-effects='on'] .lift:hover {
    transform: translateY(-6px);
    border-color: color-mix(in oklab, var(--color-crimson-500) 55%, var(--color-ink-600));
    box-shadow:
      0 1px 0 0 rgb(255 255 255 / 0.04) inset,
      0 30px 70px -40px rgb(0 0 0 / 1),
      0 0 0 1px color-mix(in oklab, var(--color-crimson-500) 12%, transparent),
      0 0 42px -18px color-mix(in oklab, var(--color-crimson-500) 45%, transparent);
  }

  /* Eyebrow label ------------------------------------------------------- */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-bone-400);
  }
  .eyebrow::before {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.2rem;
    transform: rotate(45deg);
    background: linear-gradient(135deg, var(--color-crimson-200), var(--color-crimson-500));
    box-shadow: 0 0 14px color-mix(in oklab, var(--color-crimson-400) 80%, transparent);
  }

  /* Buttons ------------------------------------------------------------- */
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    padding: 0.8rem 1.35rem;
    transition:
      transform 0.35s var(--ease-out-expo),
      background-color 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease,
      box-shadow 0.35s ease;
    overflow: hidden;
    isolation: isolate;
  }
  html[data-effects='on'] .btn:hover {
    transform: translateY(-2px);
  }
  .btn:active {
    transform: translateY(0);
  }

  .btn-primary {
    color: #fff;
    border: 1px solid color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
    background:
      linear-gradient(180deg, color-mix(in oklab, var(--color-crimson-500) 100%, transparent), color-mix(in oklab, var(--color-crimson-700) 100%, transparent));
    box-shadow:
      0 12px 34px -18px color-mix(in oklab, var(--color-crimson-500) 85%, transparent),
      0 1px 0 0 rgb(255 255 255 / 0.16) inset;
  }
  html[data-effects='on'] .btn-primary:hover {
    box-shadow:
      0 18px 44px -16px color-mix(in oklab, var(--color-crimson-400) 90%, transparent),
      0 1px 0 0 rgb(255 255 255 / 0.2) inset;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 20%, rgb(255 255 255 / 0.35) 50%, transparent 80%);
    transform: translateX(-130%);
    z-index: -1;
  }
  html[data-effects='on'] .btn-primary:hover::after {
    animation: sheen 1.1s ease-out;
  }

  .btn-ghost {
    color: var(--color-bone-100);
    border: 1px solid color-mix(in oklab, var(--color-ink-500) 90%, transparent);
    background: color-mix(in oklab, var(--color-ink-800) 70%, transparent);
    backdrop-filter: blur(10px);
  }
  html[data-effects='on'] .btn-ghost:hover {
    border-color: color-mix(in oklab, var(--color-crimson-500) 55%, var(--color-ink-500));
    background: color-mix(in oklab, var(--color-ink-750) 90%, transparent);
    color: #fff;
  }

  .btn-aura {
    color: #fff;
    border: 1px solid color-mix(in oklab, var(--color-aura-400) 55%, transparent);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--color-aura-500) 85%, transparent),
      color-mix(in oklab, var(--color-aura-900) 95%, transparent)
    );
    box-shadow: 0 12px 34px -20px color-mix(in oklab, var(--color-aura-500) 90%, transparent);
  }
  html[data-effects='on'] .btn-aura:hover {
    border-color: color-mix(in oklab, var(--color-aura-300) 70%, transparent);
  }

  .btn:disabled,
  .btn[aria-disabled='true'] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    filter: grayscale(0.35);
  }

  /* Chips --------------------------------------------------------------- */
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--color-ink-500) 80%, transparent);
    background: color-mix(in oklab, var(--color-ink-850) 80%, transparent);
    padding: 0.25rem 0.65rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-bone-300);
  }

  .chip-platform {
    border-color: color-mix(in oklab, var(--color-crimson-500) 45%, transparent);
    background: color-mix(in oklab, var(--color-crimson-900) 55%, transparent);
    color: var(--color-crimson-200);
  }

  .chip-aura {
    border-color: color-mix(in oklab, var(--color-aura-500) 45%, transparent);
    background: color-mix(in oklab, var(--color-aura-900) 60%, transparent);
    color: var(--color-aura-200);
  }

  /* Filter controls ----------------------------------------------------- */
  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--color-ink-600) 85%, transparent);
    background: color-mix(in oklab, var(--color-ink-850) 75%, transparent);
    padding: 0.5rem 0.95rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-bone-300);
    transition:
      color 0.25s ease,
      border-color 0.25s ease,
      background-color 0.25s ease,
      transform 0.25s var(--ease-out-expo);
  }
  html[data-effects='on'] .filter-pill:hover {
    color: #fff;
    border-color: color-mix(in oklab, var(--color-crimson-500) 45%, var(--color-ink-600));
    transform: translateY(-1px);
  }
  .filter-pill[aria-pressed='true'],
  .filter-pill[data-active='true'] {
    color: #fff;
    border-color: color-mix(in oklab, var(--color-crimson-400) 75%, transparent);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--color-crimson-600) 80%, transparent),
      color-mix(in oklab, var(--color-crimson-900) 85%, transparent)
    );
    box-shadow: 0 10px 30px -18px color-mix(in oklab, var(--color-crimson-500) 90%, transparent);
  }

  .field {
    width: 100%;
    border-radius: 0.85rem;
    border: 1px solid color-mix(in oklab, var(--color-ink-600) 90%, transparent);
    background: color-mix(in oklab, var(--color-ink-900) 85%, transparent);
    padding: 0.8rem 1rem;
    font-size: 0.875rem;
    color: var(--color-bone-100);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;
  }
  .field::placeholder {
    color: var(--color-bone-500);
  }
  html[data-effects='on'] .field:hover {
    border-color: color-mix(in oklab, var(--color-ink-500) 90%, transparent);
  }
  .field:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--color-crimson-500) 65%, transparent);
    box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-crimson-500) 14%, transparent);
    background: var(--color-ink-850);
  }

  /* Atmosphere ---------------------------------------------------------- */
  .bg-grid {
    background-image:
      linear-gradient(to right, rgb(255 255 255 / 0.028) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(255 255 255 / 0.028) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }

  .vignette {
    background: radial-gradient(
      120% 90% at 50% 0%,
      transparent 30%,
      color-mix(in oklab, var(--color-ink-950) 75%, transparent) 100%
    );
  }

  /* Card artwork zoom --------------------------------------------------- */
  .art-frame {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: var(--color-ink-900);
  }
  .art-layer {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 0.9s var(--ease-out-expo), filter 0.6s ease;
  }
  html[data-effects='on'] .group:hover .art-layer {
    transform: scale(1.055);
    filter: saturate(1.12) brightness(1.05);
  }

  /* Divider with a crimson core ---------------------------------------- */
  .rule {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in oklab, var(--color-ink-500) 80%, transparent) 35%,
      color-mix(in oklab, var(--color-crimson-500) 70%, transparent) 50%,
      color-mix(in oklab, var(--color-ink-500) 80%, transparent) 65%,
      transparent
    );
  }

  /* Scroll reveal ------------------------------------------------------- */
  .reveal {
    opacity: 1;
    transform: none;
    transition:
      opacity 0.75s var(--ease-out-expo),
      transform 0.75s var(--ease-out-expo),
      filter 0.75s var(--ease-out-expo);
  }
  .reveal[data-reveal-ready='true'][data-visible='false'] {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
    will-change: opacity, transform;
  }
  .reveal[data-visible='true'] {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

/* ==========================================================================
   Reduced motion
   ========================================================================== */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}

/* ==========================================================================
   Section themes — html[data-theme] swaps the whole palette. The @property
   rules let the browser animate the colour change smoothly while you scroll.
   ========================================================================== */

@property --color-ink-950 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-900 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-850 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-800 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-750 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-700 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-650 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-600 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-500 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-ink-400 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-200 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-300 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-400 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-500 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-600 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-700 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-crimson-900 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-200 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-300 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-400 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-500 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-600 { syntax: '<color>'; inherits: true; initial-value: #000; }
@property --color-aura-900 { syntax: '<color>'; inherits: true; initial-value: #000; }

html {
  transition:
    --color-ink-950 1.4s ease,
    --color-ink-900 1.4s ease,
    --color-ink-850 1.4s ease,
    --color-ink-800 1.4s ease,
    --color-ink-750 1.4s ease,
    --color-ink-700 1.4s ease,
    --color-ink-650 1.4s ease,
    --color-ink-600 1.4s ease,
    --color-ink-500 1.4s ease,
    --color-ink-400 1.4s ease,
    --color-crimson-200 1.4s ease,
    --color-crimson-300 1.4s ease,
    --color-crimson-400 1.4s ease,
    --color-crimson-500 1.4s ease,
    --color-crimson-600 1.4s ease,
    --color-crimson-700 1.4s ease,
    --color-crimson-900 1.4s ease,
    --color-aura-200 1.4s ease,
    --color-aura-300 1.4s ease,
    --color-aura-400 1.4s ease,
    --color-aura-500 1.4s ease,
    --color-aura-600 1.4s ease,
    --color-aura-900 1.4s ease;
}

html[data-theme='anemo'] {
  --color-ink-950: oklch(0.13 0.035 190);
  --color-ink-900: oklch(0.16 0.035 190);
  --color-ink-850: oklch(0.18 0.035 190);
  --color-ink-800: oklch(0.205 0.035 190);
  --color-ink-750: oklch(0.23 0.035 190);
  --color-ink-700: oklch(0.255 0.035 190);
  --color-ink-650: oklch(0.285 0.03 190);
  --color-ink-600: oklch(0.325 0.03 190);
  --color-ink-500: oklch(0.4 0.03 190);
  --color-ink-400: oklch(0.48 0.03 190);
  --color-crimson-200: oklch(0.88 0.07 170);
  --color-crimson-300: oklch(0.79 0.12 170);
  --color-crimson-400: oklch(0.71 0.17 170);
  --color-crimson-500: oklch(0.63 0.2 170);
  --color-crimson-600: oklch(0.53 0.18 170);
  --color-crimson-700: oklch(0.43 0.14 170);
  --color-crimson-900: oklch(0.25 0.07 170);
  --color-aura-200: oklch(0.89 0.06 215);
  --color-aura-300: oklch(0.8 0.1 215);
  --color-aura-400: oklch(0.72 0.15 215);
  --color-aura-500: oklch(0.62 0.19 215);
  --color-aura-600: oklch(0.52 0.18 215);
  --color-aura-900: oklch(0.24 0.07 215);
}

html[data-theme='geo'] {
  --color-ink-950: oklch(0.13 0.035 75);
  --color-ink-900: oklch(0.16 0.035 75);
  --color-ink-850: oklch(0.18 0.035 75);
  --color-ink-800: oklch(0.205 0.035 75);
  --color-ink-750: oklch(0.23 0.035 75);
  --color-ink-700: oklch(0.255 0.035 75);
  --color-ink-650: oklch(0.285 0.03 75);
  --color-ink-600: oklch(0.325 0.03 75);
  --color-ink-500: oklch(0.4 0.03 75);
  --color-ink-400: oklch(0.48 0.03 75);
  --color-crimson-200: oklch(0.88 0.07 82);
  --color-crimson-300: oklch(0.79 0.12 82);
  --color-crimson-400: oklch(0.71 0.17 82);
  --color-crimson-500: oklch(0.63 0.2 82);
  --color-crimson-600: oklch(0.53 0.18 82);
  --color-crimson-700: oklch(0.43 0.14 82);
  --color-crimson-900: oklch(0.25 0.07 82);
  --color-aura-200: oklch(0.89 0.06 40);
  --color-aura-300: oklch(0.8 0.1 40);
  --color-aura-400: oklch(0.72 0.15 40);
  --color-aura-500: oklch(0.62 0.19 40);
  --color-aura-600: oklch(0.52 0.18 40);
  --color-aura-900: oklch(0.24 0.07 40);
}

html[data-theme='electro'] {
  --color-ink-950: oklch(0.13 0.035 300);
  --color-ink-900: oklch(0.16 0.035 300);
  --color-ink-850: oklch(0.18 0.035 300);
  --color-ink-800: oklch(0.205 0.035 300);
  --color-ink-750: oklch(0.23 0.035 300);
  --color-ink-700: oklch(0.255 0.035 300);
  --color-ink-650: oklch(0.285 0.03 300);
  --color-ink-600: oklch(0.325 0.03 300);
  --color-ink-500: oklch(0.4 0.03 300);
  --color-ink-400: oklch(0.48 0.03 300);
  --color-crimson-200: oklch(0.88 0.07 305);
  --color-crimson-300: oklch(0.79 0.12 305);
  --color-crimson-400: oklch(0.71 0.17 305);
  --color-crimson-500: oklch(0.63 0.2 305);
  --color-crimson-600: oklch(0.53 0.18 305);
  --color-crimson-700: oklch(0.43 0.14 305);
  --color-crimson-900: oklch(0.25 0.07 305);
  --color-aura-200: oklch(0.89 0.06 345);
  --color-aura-300: oklch(0.8 0.1 345);
  --color-aura-400: oklch(0.72 0.15 345);
  --color-aura-500: oklch(0.62 0.19 345);
  --color-aura-600: oklch(0.52 0.18 345);
  --color-aura-900: oklch(0.24 0.07 345);
}

html[data-theme='dendro'] {
  --color-ink-950: oklch(0.13 0.035 150);
  --color-ink-900: oklch(0.16 0.035 150);
  --color-ink-850: oklch(0.18 0.035 150);
  --color-ink-800: oklch(0.205 0.035 150);
  --color-ink-750: oklch(0.23 0.035 150);
  --color-ink-700: oklch(0.255 0.035 150);
  --color-ink-650: oklch(0.285 0.03 150);
  --color-ink-600: oklch(0.325 0.03 150);
  --color-ink-500: oklch(0.4 0.03 150);
  --color-ink-400: oklch(0.48 0.03 150);
  --color-crimson-200: oklch(0.88 0.07 145);
  --color-crimson-300: oklch(0.79 0.12 145);
  --color-crimson-400: oklch(0.71 0.17 145);
  --color-crimson-500: oklch(0.63 0.2 145);
  --color-crimson-600: oklch(0.53 0.18 145);
  --color-crimson-700: oklch(0.43 0.14 145);
  --color-crimson-900: oklch(0.25 0.07 145);
  --color-aura-200: oklch(0.89 0.06 105);
  --color-aura-300: oklch(0.8 0.1 105);
  --color-aura-400: oklch(0.72 0.15 105);
  --color-aura-500: oklch(0.62 0.19 105);
  --color-aura-600: oklch(0.52 0.18 105);
  --color-aura-900: oklch(0.24 0.07 105);
}

html[data-theme='hydro'] {
  --color-ink-950: oklch(0.13 0.035 250);
  --color-ink-900: oklch(0.16 0.035 250);
  --color-ink-850: oklch(0.18 0.035 250);
  --color-ink-800: oklch(0.205 0.035 250);
  --color-ink-750: oklch(0.23 0.035 250);
  --color-ink-700: oklch(0.255 0.035 250);
  --color-ink-650: oklch(0.285 0.03 250);
  --color-ink-600: oklch(0.325 0.03 250);
  --color-ink-500: oklch(0.4 0.03 250);
  --color-ink-400: oklch(0.48 0.03 250);
  --color-crimson-200: oklch(0.88 0.07 240);
  --color-crimson-300: oklch(0.79 0.12 240);
  --color-crimson-400: oklch(0.71 0.17 240);
  --color-crimson-500: oklch(0.63 0.2 240);
  --color-crimson-600: oklch(0.53 0.18 240);
  --color-crimson-700: oklch(0.43 0.14 240);
  --color-crimson-900: oklch(0.25 0.07 240);
  --color-aura-200: oklch(0.89 0.06 205);
  --color-aura-300: oklch(0.8 0.1 205);
  --color-aura-400: oklch(0.72 0.15 205);
  --color-aura-500: oklch(0.62 0.19 205);
  --color-aura-600: oklch(0.52 0.18 205);
  --color-aura-900: oklch(0.24 0.07 205);
}

html[data-theme='pyro'] {
  --color-ink-950: oklch(0.13 0.035 25);
  --color-ink-900: oklch(0.16 0.035 25);
  --color-ink-850: oklch(0.18 0.035 25);
  --color-ink-800: oklch(0.205 0.035 25);
  --color-ink-750: oklch(0.23 0.035 25);
  --color-ink-700: oklch(0.255 0.035 25);
  --color-ink-650: oklch(0.285 0.03 25);
  --color-ink-600: oklch(0.325 0.03 25);
  --color-ink-500: oklch(0.4 0.03 25);
  --color-ink-400: oklch(0.48 0.03 25);
  --color-crimson-200: oklch(0.88 0.07 35);
  --color-crimson-300: oklch(0.79 0.12 35);
  --color-crimson-400: oklch(0.71 0.17 35);
  --color-crimson-500: oklch(0.63 0.2 35);
  --color-crimson-600: oklch(0.53 0.18 35);
  --color-crimson-700: oklch(0.43 0.14 35);
  --color-crimson-900: oklch(0.25 0.07 35);
  --color-aura-200: oklch(0.89 0.06 75);
  --color-aura-300: oklch(0.8 0.1 75);
  --color-aura-400: oklch(0.72 0.15 75);
  --color-aura-500: oklch(0.62 0.19 75);
  --color-aura-600: oklch(0.52 0.18 75);
  --color-aura-900: oklch(0.24 0.07 75);
}

html[data-theme='cryo'] {
  --color-ink-950: oklch(0.13 0.035 225);
  --color-ink-900: oklch(0.16 0.035 225);
  --color-ink-850: oklch(0.18 0.035 225);
  --color-ink-800: oklch(0.205 0.035 225);
  --color-ink-750: oklch(0.23 0.035 225);
  --color-ink-700: oklch(0.255 0.035 225);
  --color-ink-650: oklch(0.285 0.03 225);
  --color-ink-600: oklch(0.325 0.03 225);
  --color-ink-500: oklch(0.4 0.03 225);
  --color-ink-400: oklch(0.48 0.03 225);
  --color-crimson-200: oklch(0.88 0.07 215);
  --color-crimson-300: oklch(0.79 0.12 215);
  --color-crimson-400: oklch(0.71 0.17 215);
  --color-crimson-500: oklch(0.63 0.2 215);
  --color-crimson-600: oklch(0.53 0.18 215);
  --color-crimson-700: oklch(0.43 0.14 215);
  --color-crimson-900: oklch(0.25 0.07 215);
  --color-aura-200: oklch(0.89 0.06 275);
  --color-aura-300: oklch(0.8 0.1 275);
  --color-aura-400: oklch(0.72 0.15 275);
  --color-aura-500: oklch(0.62 0.19 275);
  --color-aura-600: oklch(0.52 0.18 275);
  --color-aura-900: oklch(0.24 0.07 275);
}


.bloom-a { background: radial-gradient(circle, color-mix(in oklab, var(--color-crimson-500) 24%, transparent), transparent 68%); }
.bloom-b { background: radial-gradient(circle, color-mix(in oklab, var(--color-aura-500) 20%, transparent), transparent 70%); }

.fx { position: absolute; inset: 0; opacity: 0; visibility: hidden; overflow: hidden; transition: opacity 1.2s ease, visibility 0s linear 1.2s; }
html[data-theme='anemo'] .fx-anemo,
html[data-theme='geo'] .fx-geo,
html[data-theme='electro'] .fx-electro,
html[data-theme='dendro'] .fx-dendro,
html[data-theme='hydro'] .fx-hydro,
html[data-theme='pyro'] .fx-pyro,
html[data-theme='cryo'] .fx-cryo { opacity: 1; visibility: visible; transition: opacity 1.2s ease, visibility 0s; }
html[data-theme='anemo'] .fx-anemo .p,
html[data-theme='geo'] .fx-geo .p,
html[data-theme='electro'] .fx-electro .p,
html[data-theme='dendro'] .fx-dendro .p,
html[data-theme='hydro'] .fx-hydro .p,
html[data-theme='pyro'] .fx-pyro .p,
html[data-theme='cryo'] .fx-cryo .p { animation-play-state: running; }
@media (max-width: 767px) { .fx .p:nth-child(n+8) { display: none; } }

.fx .p {
  animation-play-state: paused;
  position: absolute;
  left: calc(var(--x) * 1%);
  pointer-events: none;
  will-change: transform, opacity;
  opacity: 0;
  animation-duration: calc(var(--t) * 1s);
  animation-delay: calc(var(--d) * 1s);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

/* Anemo — wind streaks and leaves */
.fx-anemo .p { left: -12%; top: calc(var(--y) * 1%); width: calc(var(--s) * 110px); height: 3px; border-radius: 99px;
  background: linear-gradient(90deg, transparent, var(--color-crimson-300), transparent); animation-name: fx-wind; animation-duration: calc(var(--t) * 0.45s); }
.fx-anemo .p:nth-child(4n) { width: 11px; height: 11px; border-radius: 0 100% 0 100%; background: var(--color-crimson-300); }

/* Geo — rising crystals */
.fx-geo .p { top: 105%; width: calc(var(--s) * 13px); height: calc(var(--s) * 13px); border-radius: 3px;
  background: linear-gradient(135deg, var(--color-crimson-200), var(--color-crimson-500));
  box-shadow: 0 0 16px color-mix(in oklab, var(--color-crimson-400) 70%, transparent); animation-name: fx-rise; }

/* Electro — flashes and sparks */
.fx-electro .p { top: calc(var(--y) * 1% - 8%); width: 2px; height: calc(var(--s) * 120px);
  background: linear-gradient(var(--color-aura-300), transparent); box-shadow: 0 0 14px var(--color-aura-400);
  animation-name: fx-zap; animation-timing-function: steps(1, end); }
.fx-electro .p:nth-child(2n) { top: calc(var(--y) * 1%); width: 5px; height: 5px; border-radius: 50%; background: var(--color-aura-300);
  animation-name: fx-twinkle; animation-timing-function: ease-in-out; animation-duration: calc(var(--t) * 0.22s); }

/* Dendro — falling leaves */
.fx-dendro .p { top: -6%; width: calc(var(--s) * 16px); height: calc(var(--s) * 10px); border-radius: 0 100% 0 100%;
  background: linear-gradient(135deg, var(--color-crimson-300), var(--color-crimson-600)); animation-name: fx-fall; }

/* Hydro — bubbles */
.fx-hydro .p { top: 105%; width: calc(var(--s) * 18px); height: calc(var(--s) * 18px); border-radius: 50%;
  border: 1px solid color-mix(in oklab, var(--color-crimson-200) 70%, transparent);
  background: radial-gradient(circle at 30% 28%, rgb(255 255 255 / 0.6), transparent 42%), color-mix(in oklab, var(--color-crimson-400) 12%, transparent);
  animation-name: fx-bubble; animation-duration: calc(var(--t) * 0.8s); }

/* Pyro — embers */
.fx-pyro .p { top: 105%; width: calc(var(--s) * 6px); height: calc(var(--s) * 6px); border-radius: 50%;
  background: var(--color-crimson-300); box-shadow: 0 0 12px 2px var(--color-crimson-500);
  animation-name: fx-ember; animation-duration: calc(var(--t) * 0.5s); }

/* Cryo — snow */
.fx-cryo .p { top: -6%; width: calc(var(--s) * 8px); height: calc(var(--s) * 8px); border-radius: 50%;
  background: var(--color-crimson-200); box-shadow: 0 0 10px var(--color-crimson-300);
  animation-name: fx-snow; animation-duration: calc(var(--t) * 0.8s); }
.fx-cryo .p:nth-child(4n) { width: calc(var(--s) * 18px); height: calc(var(--s) * 18px); }

@keyframes fx-wind {
  0% { transform: translate3d(0, 0, 0) rotate(-4deg); opacity: 0; }
  15%, 85% { opacity: var(--o); }
  100% { transform: translate3d(140vw, -70px, 0) rotate(5deg); opacity: 0; }
}
@keyframes fx-rise {
  0% { transform: translate3d(0, 0, 0) rotate(45deg); opacity: 0; }
  12% { opacity: var(--o); }
  50% { transform: translate3d(var(--w), -55vh, 0) rotate(calc(var(--r) + 45deg)); }
  100% { transform: translate3d(calc(var(--w) * -1), -115vh, 0) rotate(calc(var(--r) * 2 + 45deg)); opacity: 0; }
}
@keyframes fx-fall {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
  10% { opacity: var(--o); }
  50% { transform: translate3d(var(--w), 55vh, 0) rotate(var(--r)); }
  100% { transform: translate3d(calc(var(--w) * -1), 115vh, 0) rotate(calc(var(--r) * 2)); opacity: 0; }
}
@keyframes fx-snow {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  10% { opacity: var(--o); }
  50% { transform: translate3d(var(--w), 55vh, 0); }
  100% { transform: translate3d(calc(var(--w) * -1), 115vh, 0); opacity: 0; }
}
@keyframes fx-bubble {
  0% { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
  12% { opacity: var(--o); }
  50% { transform: translate3d(var(--w), -55vh, 0) scale(1); }
  100% { transform: translate3d(calc(var(--w) * -1), -115vh, 0) scale(1.15); opacity: 0; }
}
@keyframes fx-ember {
  0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
  10% { opacity: 0.95; }
  35% { opacity: 0.45; }
  50% { transform: translate3d(var(--w), -55vh, 0) scale(0.8); opacity: 0.9; }
  100% { transform: translate3d(calc(var(--w) * -1), -115vh, 0) scale(0.2); opacity: 0; }
}
@keyframes fx-zap {
  0%, 100% { opacity: 0; transform: skewX(-18deg); }
  92% { opacity: 0; }
  93% { opacity: 0.9; }
  94% { opacity: 0; }
  96% { opacity: 0.7; transform: translate3d(14px, 0, 0) skewX(-18deg); }
  97% { opacity: 0; }
}
@keyframes fx-twinkle {
  0%, 100% { opacity: 0; transform: scale(0.4); }
  50% { opacity: var(--o); transform: scale(1.3); }
}

/* Theme change ripple --------------------------------------- */
.theme-ripple {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 150vmax;
  height: 150vmax;
  margin: -75vmax 0 0 -75vmax;
  border-radius: 50%;
  pointer-events: none;
  z-index: -9;
  background: radial-gradient(circle, transparent 36%, color-mix(in oklab, var(--color-crimson-400) 42%, transparent) 48%, color-mix(in oklab, var(--color-aura-400) 18%, transparent) 54%, transparent 62%);
  animation: theme-ripple 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
@keyframes theme-ripple {
  from { transform: scale(0.04); opacity: 1; }
  to { transform: scale(1); opacity: 0; }
}

/* Per-theme scroll-in animation (each section enters differently) ----------- */
[data-theme-section='anemo'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(-56px, 0, 0) rotate(-1.5deg); }
[data-theme-section='geo'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(0, 44px, 0) scale(0.9); }
[data-theme-section='electro'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(0, 0, 0) skewX(-7deg) scale(0.97); }
[data-theme-section='dendro'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(0, 56px, 0) rotate(2deg) scale(0.95); transform-origin: 0 100%; }
[data-theme-section='hydro'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(0, 32px, 0) scale(1.05); }
[data-theme-section='pyro'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: translate3d(0, 64px, 0) scale(0.84); }
[data-theme-section='cryo'] .reveal[data-reveal-ready='true'][data-visible='false'] { transform: scale(1.07); }

[data-theme-section='geo'] .reveal,
[data-theme-section='pyro'] .reveal { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
[data-theme-section='electro'] .reveal { transition-duration: 0.45s; }
[data-theme-section='hydro'] .reveal,
[data-theme-section='cryo'] .reveal { transition-duration: 1.1s; }

/* ==========================================================================
   Full-page scenes (wipe in from the character side) + character stage
   ========================================================================== */

.scene {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1.1s ease, visibility 0s linear 1.1s;
}
html[data-theme='anemo'] .scene-anemo,
html[data-theme='geo'] .scene-geo,
html[data-theme='electro'] .scene-electro,
html[data-theme='dendro'] .scene-dendro,
html[data-theme='hydro'] .scene-hydro,
html[data-theme='pyro'] .scene-pyro,
html[data-theme='cryo'] .scene-cryo {
  z-index: 2;
  opacity: 1;
  visibility: visible;
  transition: opacity 1.1s ease, visibility 0s;
}
.fx { z-index: 3; }

.scene-glow { position: absolute; inset: 0; }
.scene-anemo .scene-glow { background: radial-gradient(60% 75% at 75% 40%, color-mix(in oklab, var(--color-crimson-400) 34%, transparent), transparent 70%); }
.scene-geo .scene-glow { background: radial-gradient(80% 60% at 50% 105%, color-mix(in oklab, var(--color-crimson-400) 38%, transparent), transparent 70%); }
.scene-electro .scene-glow { background: radial-gradient(55% 55% at 70% 20%, color-mix(in oklab, var(--color-crimson-400) 36%, transparent), transparent 70%), radial-gradient(40% 40% at 15% 80%, color-mix(in oklab, var(--color-aura-400) 22%, transparent), transparent 70%); }
.scene-dendro .scene-glow { background: radial-gradient(60% 70% at 20% 55%, color-mix(in oklab, var(--color-crimson-400) 32%, transparent), transparent 72%), radial-gradient(50% 50% at 85% 20%, color-mix(in oklab, var(--color-aura-400) 22%, transparent), transparent 70%); }
.scene-hydro .scene-glow { background: linear-gradient(0deg, color-mix(in oklab, var(--color-crimson-400) 30%, transparent), transparent 65%); }
.scene-pyro .scene-glow { background: radial-gradient(90% 55% at 50% 108%, color-mix(in oklab, var(--color-crimson-500) 50%, transparent), transparent 72%); }
.scene-cryo .scene-glow { inset: -25%; will-change: transform; background: linear-gradient(115deg, transparent 20%, color-mix(in oklab, var(--color-crimson-300) 20%, transparent) 38%, transparent 52%, color-mix(in oklab, var(--color-aura-300) 18%, transparent) 70%, transparent 86%); animation: aurora 18s ease-in-out infinite alternate; }
@keyframes aurora { from { transform: translate3d(-8%, -5%, 0); } to { transform: translate3d(8%, 5%, 0); } }

.scene-pattern-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, #000 10%, transparent 85%);
  mask-image: linear-gradient(180deg, #000 10%, transparent 85%);
}
.scene-pattern {
  --tile: 120px;
  position: absolute;
  inset: calc(var(--tile) * -2) 0 0 calc(var(--tile) * -2);
  opacity: 0.9;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cpath d='M60 2 L118 60 L60 118 L2 60 Z' fill='none' stroke='white' stroke-opacity='0.085' stroke-width='1.4'/%3E%3C/svg%3E");
  background-size: var(--tile) var(--tile);
  will-change: transform;
  animation: pattern-pan 70s linear infinite;
}
.scene-geo .scene-pattern { --tile: 88px; animation-direction: reverse; }
.scene-electro .scene-pattern { --tile: 150px; }
.scene-dendro .scene-pattern { --tile: 100px; animation-duration: 95s; }
.scene-hydro .scene-pattern { --tile: 130px; animation-direction: reverse; }
.scene-pyro .scene-pattern { --tile: 110px; animation-duration: 55s; }
.scene-cryo .scene-pattern { --tile: 140px; animation-duration: 110s; }
/* Moves by exactly two tiles, so the loop is seamless — and it is a pure
   transform, which the GPU animates without repainting every frame. */
@keyframes pattern-pan { to { transform: translate3d(calc(var(--tile) * 2), calc(var(--tile) * 2), 0); } }

/* Scenes that are not on screen do not animate at all. */
.scene .scene-pattern,
.scene .spark,
.scene .sil,
.scene .scene-glow { animation-play-state: paused; }
html[data-theme='anemo'] .scene-anemo :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='geo'] .scene-geo :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='electro'] .scene-electro :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='dendro'] .scene-dendro :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='hydro'] .scene-hydro :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='pyro'] .scene-pyro :is(.scene-pattern, .spark, .sil, .scene-glow),
html[data-theme='cryo'] .scene-cryo :is(.scene-pattern, .spark, .sil, .scene-glow) { animation-play-state: running; }

.spark {
  position: absolute;
  left: calc(var(--x) * 1%);
  top: calc(var(--y) * 1%);
  width: calc(var(--s) * 22px);
  height: calc(var(--s) * 22px);
  background: var(--color-crimson-200);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  opacity: 0;
  will-change: transform, opacity;
  animation: twinkle-star calc(var(--t) * 1s) ease-in-out calc(var(--d) * 1s) infinite;
}
@keyframes twinkle-star {
  0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
  50% { opacity: 0.95; transform: scale(1) rotate(45deg); }
}

.sil {
  will-change: transform;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 36vh;
  min-height: 190px;
  fill: color-mix(in oklab, var(--color-crimson-700) 38%, var(--color-ink-950));
  opacity: 0.95;
  transform-origin: 50% 100%;
  animation: sil-sway 18s ease-in-out infinite alternate;
}
@keyframes sil-sway { from { transform: translate3d(-8px, 0, 0) scale(1.01); } to { transform: translate3d(8px, 0, 0) scale(1.01); } }

/* Character stage ------------------------------------------------------------
   One fixed stage. Slots cross-fade + slide; only opacity/transform animate so
   everything stays on the GPU. */
.stage {
  position: fixed;
  inset: 0;
  z-index: -8;
  pointer-events: none;
  contain: layout paint style;
}
.stage-frame {
  position: absolute;
  right: -1vw;
  bottom: 0;
  width: min(50vw, 860px);
  height: min(96vh, 1040px);
  will-change: transform;
}
.stage-slot {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(6vw, 0, 0) scale(0.97);
  transition: opacity 0.65s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 1s;
}
.stage-slot[data-on='true'] {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: opacity 0.8s ease 0.12s, transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.05s, visibility 0s;
}
.stage-aura {
  position: absolute;
  right: 4%;
  bottom: 8%;
  width: 84%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in oklab, var(--color-crimson-300) 40%, transparent), transparent 66%);
}
.stage-aura, .stage-ring { will-change: transform, opacity; }
.stage-slot[data-on='true'] .stage-aura { animation: pulse-soft 8s ease-in-out infinite; }
.stage-ring {
  position: absolute;
  right: 9%;
  bottom: 12%;
  width: 68%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px dashed color-mix(in oklab, var(--color-crimson-300) 50%, transparent);
}
.stage-ring--inner {
  right: 14%;
  bottom: 17%;
  width: 58%;
  border: 1.5px solid color-mix(in oklab, var(--color-crimson-200) 36%, transparent);
}
.stage-slot[data-on='true'] .stage-ring { animation: ring-spin 80s linear infinite; }
.stage-slot[data-on='true'] .stage-ring--inner { animation: ring-spin 110s linear infinite reverse; }
@keyframes ring-spin { to { transform: rotate(360deg); } }
.stage-bob { position: absolute; inset: 0; }
.stage-slot[data-on='true'] .stage-bob { animation: stage-bob 9s ease-in-out infinite alternate; }
@keyframes stage-bob {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -12px, 0); }
}
.stage-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 50% 100%;
  user-select: none;
  -webkit-mask-image: linear-gradient(to top, #000 78%, transparent 100%),
    linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(to top, #000 78%, transparent 100%),
    linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-composite: intersect;
}
.stage-credit {
  position: absolute;
  right: 0.9rem;
  bottom: 0.5rem;
  z-index: 2;
  pointer-events: auto;
  font-size: 0.65rem;
  color: var(--color-bone-300);
  opacity: 0.65;
  text-decoration: none;
}
html[data-effects='on'] .stage-credit:hover { opacity: 1; text-decoration: underline; }

/* Tablet + phone: the character is a soft full-screen backdrop. */
@media (max-width: 1023px) {
  .stage { opacity: 0.42; }
  .stage-frame { inset: 0; right: 0; width: 100%; height: 100%; will-change: auto; }
  .stage-slot { transform: none; transition: opacity 0.6s ease, visibility 0s linear 0.6s; }
  .stage-slot[data-on='true'] { transition: opacity 0.7s ease 0.1s, visibility 0s; }
  .stage-img {
    object-position: center bottom;
    -webkit-mask-image: linear-gradient(to top, #000 68%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%);
    mask-image: linear-gradient(to top, #000 68%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%);
  }
  .stage-ring, .stage-credit { display: none; }
  .stage-slot[data-on='true'] .stage-bob,
  .stage-slot[data-on='true'] .stage-aura { animation: none; }
  .stage-aura { opacity: 0.5; }
  .stage { height: 100svh; }
}


/* Small form labels used by the public, non-account checkout. */
.field-label {
  display: block;
  color: var(--color-bone-400);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* Phone-only performance: desktop scene effects and art remain unchanged.
   The coarse-pointer clause also catches phones held in landscape. */
@media (max-width: 767px), (max-width: 1023px) and (pointer: coarse) {
  .scene { visibility: hidden; clip-path: none !important; transition: none !important; }
  html[data-theme='anemo'] .scene-anemo,
  html[data-theme='geo'] .scene-geo,
  html[data-theme='electro'] .scene-electro,
  html[data-theme='dendro'] .scene-dendro,
  html[data-theme='hydro'] .scene-hydro,
  html[data-theme='pyro'] .scene-pyro,
  html[data-theme='cryo'] .scene-cryo { visibility: visible; }
  .bloom { animation: none !important; opacity: 0.48; }
  .scene-pattern { animation: none !important; opacity: 0.42; }
  .scene-glow { animation: none !important; }
  .scene-cryo .scene-glow { animation: none !important; }
  .spark { filter: none; animation-duration: calc(var(--t) * 1.7s); }
  .sil { animation: none !important; opacity: 0.72; }
  .bg-noise { display: none; }
  [data-theme-section] .reveal[data-reveal-ready='true'][data-visible='false'] { filter: none !important; transform: translate3d(0, 18px, 0) !important; }
  [data-theme-section] .reveal { transition-duration: 0.35s !important; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}


/* Lenis (desktop smooth scrolling) ------------------------------------------ */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: clip; }


/* Keep the one-screen composition when it fits, but never lock the document.
   The hero's minimum height allows natural scrolling on short/zoomed screens. */
html:has([data-home]) footer { display: none; }
@media (max-height: 760px) { .hero-lowest { display: none; } }
@media (max-height: 640px) { .hero-stats { display: none; } }

/* ==========================================================================
   PRESTIGE LAYER
   The cinematic chrome: first-visit curtain, custom pointer, kinetic hero,
   magnetic buttons, 3D product cards, marquees and scroll interface.
   Everything below is opt-in and switches itself off for reduced motion.
   ========================================================================== */

@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

html {
  --hero-delay: 0ms;
}
@media (prefers-reduced-motion: no-preference) {
  html[data-effects='on'][data-intro='1'] {
    --hero-delay: 1120ms;
  }
}

/* ==========================================================================
   1. First-visit curtain
   ========================================================================== */

.site-intro {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 300;
  pointer-events: none;
  overflow: hidden;
}

html[data-effects='on'][data-intro='1'] .site-intro {
  display: block;
  animation: intro-dismiss 0ms linear 2000ms forwards;
}

.site-intro__panel {
  position: absolute;
  left: 0;
  right: 0;
  height: 50.4%;
  background:
    radial-gradient(70% 90% at 50% 100%, color-mix(in oklab, var(--color-crimson-600) 16%, transparent), transparent 62%),
    linear-gradient(180deg, #050509, #07070d);
  animation: intro-panel 950ms cubic-bezier(0.76, 0, 0.24, 1) 1120ms both;
}
.site-intro__panel--top {
  top: 0;
  transform-origin: 50% 0;
  border-bottom: 1px solid color-mix(in oklab, var(--color-crimson-400) 35%, transparent);
}
.site-intro__panel--bottom {
  bottom: 0;
  transform-origin: 50% 100%;
  border-top: 1px solid color-mix(in oklab, var(--color-crimson-400) 35%, transparent);
}

@keyframes intro-panel {
  to {
    transform: scaleY(0.0001);
    opacity: 0.9;
  }
}
@keyframes intro-dismiss {
  to {
    visibility: hidden;
  }
}

.site-intro__core {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  animation:
    intro-core-in 700ms var(--ease-out-expo) both,
    intro-core-out 360ms ease 880ms both;
}

.site-intro__mark {
  position: relative;
  display: grid;
  place-items: center;
  width: 124px;
  height: 124px;
}
.site-intro__frame {
  position: absolute;
  inset: 25px;
  width: 74px;
  height: 74px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-400) 26%, transparent);
  transform: rotate(45deg) scale(0.7);
  opacity: 0;
  animation: intro-frame 900ms var(--ease-out-expo) 120ms both;
}
@keyframes intro-frame {
  to {
    transform: rotate(45deg) scale(1);
    opacity: 1;
  }
}

.site-intro__kanji {
  position: relative;
  font-family: var(--font-sans);
  font-size: 1.45rem;
  letter-spacing: 0.42em;
  color: var(--color-bone-50);
  text-shadow: 0 0 26px color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
  padding-left: 0.42em;
}

.site-intro__name {
  position: relative;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.62em;
  color: var(--color-bone-200);
  padding-left: 0.62em;
}

.site-intro__bar {
  position: relative;
  width: 132px;
  height: 1px;
  margin-top: 0.35rem;
  background: color-mix(in oklab, var(--color-ink-500) 70%, transparent);
  overflow: hidden;
}
.site-intro__bar i {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--color-crimson-300), transparent);
  transform-origin: 0 50%;
  animation: intro-bar 1050ms cubic-bezier(0.65, 0, 0.35, 1) 180ms both;
}
@keyframes intro-bar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.site-intro__tag {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}

@keyframes intro-core-in {
  from {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes intro-core-out {
  to {
    opacity: 0;
    transform: translate3d(0, -8px, 0);
  }
}

/* ==========================================================================
   2. Custom pointer
   ========================================================================== */

.pointer-layer {
  position: fixed;
  inset: 0;
  z-index: 400;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
}
html.pointer-visible .pointer-layer {
  opacity: 1;
}

.pointer-dot,
.pointer-ring {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  will-change: transform;
}

.pointer-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--color-crimson-200);
  box-shadow: 0 0 14px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
}

.pointer-ring {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-300) 58%, transparent);
  background: color-mix(in oklab, var(--color-crimson-500) 4%, transparent);
  transition:
    width 0.35s var(--ease-out-expo),
    height 0.35s var(--ease-out-expo),
    background-color 0.3s ease,
    border-color 0.3s ease,
    border-radius 0.3s ease,
    opacity 0.3s ease;
}
.pointer-ring[data-state='link'] {
  width: 54px;
  height: 54px;
  background: color-mix(in oklab, var(--color-crimson-500) 9%, transparent);
  border-color: color-mix(in oklab, var(--color-crimson-300) 80%, transparent);
}
.pointer-ring[data-state='text'] {
  width: 2px;
  height: 26px;
  border-radius: 2px;
  border-color: transparent;
  background: var(--color-crimson-300);
}
.pointer-ring[data-state='label'] {
  width: 78px;
  height: 78px;
  background: color-mix(in oklab, var(--color-ink-950) 82%, transparent);
  border-color: color-mix(in oklab, var(--color-crimson-300) 70%, transparent);
  backdrop-filter: blur(6px);
}
.pointer-ring[data-state='label']::after {
  content: attr(data-label);
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-bone-50);
}
html.pointer-down .pointer-ring {
  width: 28px;
  height: 28px;
}
html.has-pointer,
html.has-pointer a,
html.has-pointer button,
html.has-pointer [role='button'],
html.has-pointer summary {
  cursor: none;
}

/* ==========================================================================
   3. Scroll interface
   ========================================================================== */

.scroll-progress {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  height: 2px;
  pointer-events: none;
}
.scroll-progress span {
  display: block;
  height: 100%;
  transform: scaleX(0);
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--color-crimson-600), var(--color-crimson-300) 45%, var(--color-aura-300));
  box-shadow: 0 0 16px color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
}

.to-top {
  position: fixed;
  right: 1.4rem;
  bottom: 1.4rem;
  z-index: 45;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--color-ink-900) 78%, transparent);
  border: 1px solid color-mix(in oklab, var(--color-ink-600) 80%, transparent);
  color: var(--color-bone-200);
  opacity: 0;
  transform: translate3d(0, 12px, 0);
  pointer-events: none;
  transition:
    opacity 0.4s ease,
    transform 0.5s var(--ease-out-expo),
    border-color 0.3s ease;
  backdrop-filter: blur(10px);
}
.to-top[data-show='true'] {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
html[data-effects='on'] .to-top:hover {
  border-color: color-mix(in oklab, var(--color-crimson-400) 60%, transparent);
}
.to-top svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.to-top__track,
.to-top__ring {
  fill: none;
  stroke-width: 1.6;
}
.to-top__track {
  stroke: color-mix(in oklab, var(--color-ink-600) 70%, transparent);
}
.to-top__ring {
  stroke: var(--color-crimson-400);
  stroke-linecap: round;
}
.to-top__arrow {
  position: relative;
  width: 18px;
  height: 18px;
  transition: transform 0.3s var(--ease-out-expo);
}
.to-top__arrow svg {
  position: static;
  transform: none;
}
html[data-effects='on'] .to-top:hover .to-top__arrow {
  transform: translateY(-2px);
}

/* Keep scroll chrome off the compact homepage, including its overflow fallback. */
html:has([data-home]) .scroll-progress,
html:has([data-home]) .to-top {
  display: none;
}

/* ==========================================================================
   4. Route + text entrances
   ========================================================================== */

html[data-effects='on'] .route-entrance {
  animation: route-in 820ms var(--ease-out-expo) both;
}
@keyframes route-in {
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.split-line {
  display: block;
}
.split-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.16em;
  margin-bottom: -0.16em;
}
.split-word-inner {
  display: inline-block;
  will-change: transform;
}
html[data-effects='on'] .split-text[data-split-ready='true'].is-shown .split-word-inner {
  transition:
    transform 1050ms var(--ease-out-expo),
    opacity 700ms ease;
  transition-delay: calc(var(--split-delay, 0ms) + var(--i, 0) * var(--stagger, 55ms));
}
html[data-effects='on'] .split-text[data-split-ready='true']:not(.is-shown) .split-word-inner {
  opacity: 0;
  transform: translate3d(0, 118%, 0) rotate(2deg);
}
html[data-effects='on'] .split-text.is-shown .split-word-inner {
  opacity: 1;
  transform: none;
}

/* Italic editorial accent, used on a single word at a time. */
.serif-accent {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.015em;
}

/* ==========================================================================
   5. Hero
   ========================================================================== */

.home-hero {
  --spot-x: 62%;
  --spot-y: 38%;
}
.home-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -3;
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 78%, transparent) 0%, transparent 46%),
    radial-gradient(90% 90% at 80% 20%, transparent 40%, color-mix(in oklab, var(--color-ink-950) 72%, transparent) 100%);
  pointer-events: none;
}

.hero-spotlight {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    radial-gradient(34rem 30rem at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--color-crimson-400) 15%, transparent), transparent 64%),
    radial-gradient(50rem 34rem at calc(var(--spot-x) + 14%) calc(var(--spot-y) + 10%), color-mix(in oklab, var(--color-aura-500) 9%, transparent), transparent 68%);
}

.hero-watermark {
  position: absolute;
  left: 0.85rem;
  top: 6.6rem;
  z-index: -1;
  display: none;
  pointer-events: none;
  user-select: none;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: var(--font-sans);
  font-size: min(5.8vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0.06em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklab, var(--color-bone-50) 26%, transparent);
  opacity: 0.4;
  animation: watermark-drift 26s ease-in-out infinite alternate;
}
@media (min-width: 1600px) {
  .hero-watermark {
    display: block;
  }
}
@keyframes watermark-drift {
  from {
    transform: translate3d(0, 10px, 0);
    opacity: 0.34;
  }
  to {
    transform: translate3d(0, -14px, 0);
    opacity: 0.56;
  }
}

.hero-frame {
  position: absolute;
  inset: 6.6rem 1.4rem 5.1rem;
  z-index: 0;
  pointer-events: none;
  opacity: 0.38;
}
.hero-frame__corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: color-mix(in oklab, var(--color-bone-50) 22%, transparent);
  border-style: solid;
}
.hero-frame__corner--tl {
  top: 0;
  left: 0;
  border-width: 1px 0 0 1px;
}
.hero-frame__corner--tr {
  top: 0;
  right: 0;
  border-width: 1px 1px 0 0;
}
.hero-frame__corner--bl {
  bottom: 0;
  left: 0;
  border-width: 0 0 1px 1px;
}
.hero-frame__corner--br {
  bottom: 0;
  right: 0;
  border-width: 0 1px 1px 0;
}

.hero-spine {
  position: absolute;
  left: 1.7rem;
  top: 50%;
  z-index: 2;
  display: none;
  align-items: center;
  gap: 1rem;
  transform: translateY(-50%);
}
@media (min-width: 1536px) {
  .hero-spine {
    display: flex;
  }
}
.hero-spine__label {
  writing-mode: vertical-rl;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--color-bone-500);
  opacity: 0.85;
}
.hero-spine__line {
  width: 1px;
  height: 8.5rem;
  background: linear-gradient(
    to bottom,
    transparent,
    color-mix(in oklab, var(--color-crimson-400) 65%, transparent) 45%,
    transparent
  );
  position: relative;
  overflow: hidden;
}
.hero-spine__line::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 38%;
  background: linear-gradient(to bottom, transparent, var(--color-bone-50), transparent);
  animation: spine-travel 4.5s ease-in-out infinite;
}
@keyframes spine-travel {
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translateY(320%);
    opacity: 0;
  }
}
.hero-spine__seal {
  width: 16px;
  height: 16px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-400) 55%, transparent);
  transform: rotate(45deg);
  display: grid;
  place-items: center;
  animation: seal-pulse 4s ease-in-out infinite;
}
.hero-spine__seal i {
  width: 4px;
  height: 4px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 12px var(--color-crimson-400);
}
@keyframes seal-pulse {
  0%,
  100% {
    transform: rotate(45deg) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: rotate(225deg) scale(1.15);
    opacity: 1;
  }
}

.hero-copy {
  max-width: 46rem;
}

.hero-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-500) 75%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 55%, transparent);
  backdrop-filter: blur(12px);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-bone-300);
  overflow: hidden;
  animation: hero-fade 900ms var(--ease-out-expo) calc(var(--hero-delay) + 60ms) both;
}
.hero-badge__text {
  color: var(--color-bone-100);
}
.hero-badge__rule {
  width: 1px;
  height: 0.7rem;
  background: color-mix(in oklab, var(--color-ink-500) 90%, transparent);
}
.hero-badge__pulse {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 0 0 color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
  animation: live-pulse 2.4s ease-out infinite;
}
@keyframes live-pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--color-crimson-400) 65%, transparent);
  }
  70% {
    box-shadow: 0 0 0 9px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
.hero-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.14) 50%, transparent 65%);
  transform: translateX(-140%);
  animation: badge-sheen 7s ease-in-out 3s infinite;
}
@keyframes badge-sheen {
  0%,
  62% {
    transform: translateX(-140%);
  }
  78%,
  100% {
    transform: translateX(140%);
  }
}

.hero-title {
  margin-top: 1.55rem;
  font-family: var(--font-display);
  font-size: clamp(2.45rem, min(5.6vw, 8.2svh), 4.45rem);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.045em;
  color: var(--color-bone-50);
}
.hero-line {
  display: block;
}
.hero-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}
.hero-word__in,
.hero-line__in {
  display: inline-block;
  animation: hero-in 1250ms var(--ease-out-expo) both;
  animation-delay: calc(var(--hero-delay) + 180ms + var(--i, 0) * 80ms);
}
.hero-line--accent {
  margin-top: 0.02em;
}
.hero-line--accent .hero-line__in {
  animation-delay: calc(var(--hero-delay) + 420ms);
}
@keyframes hero-in {
  from {
    opacity: 0;
    transform: translate3d(0, 118%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-serif {
  position: relative;
  display: inline-block;
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 1.17em;
  line-height: 0.82;
  letter-spacing: -0.02em;
  padding-right: 0.03em;
  transform: translateY(0.035em);
  background: linear-gradient(
    104deg,
    var(--color-bone-50) 8%,
    color-mix(in oklab, var(--color-crimson-200) 70%, white) 42%,
    var(--color-bone-50) 78%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-serif::after {
  content: '';
  position: absolute;
  left: 4%;
  right: 4%;
  bottom: 0.02em;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--color-crimson-400), transparent);
  transform: scaleX(0);
  transform-origin: 0 50%;
  animation: serif-rule 1100ms var(--ease-out-expo) calc(var(--hero-delay) + 1050ms) both;
}
@keyframes serif-rule {
  to {
    transform: scaleX(1);
  }
}

.hero-grad {
  background: linear-gradient(
    100deg,
    var(--color-crimson-200) 0%,
    var(--color-crimson-400) 30%,
    var(--color-aura-300) 62%,
    var(--color-crimson-200) 100%
  );
  background-size: 240% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hero-grad-shift 14s ease-in-out infinite alternate;
}
@keyframes hero-grad-shift {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 100% 50%;
  }
}

.hero-desc {
  margin-top: 1.55rem;
  max-width: 34rem;
  font-size: clamp(0.96rem, 1.05vw, 1.05rem);
  line-height: 1.75;
  color: var(--color-bone-300);
  animation: hero-fade 1000ms var(--ease-out-expo) calc(var(--hero-delay) + 620ms) both;
}
.hero-desc__short {
  display: none;
}
@keyframes hero-fade {
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-top: 1.9rem;
  animation: hero-fade 1000ms var(--ease-out-expo) calc(var(--hero-delay) + 760ms) both;
}
.hero-note {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.72rem;
  color: var(--color-bone-500);
}
.hero-note__line {
  width: 22px;
  height: 1px;
  background: linear-gradient(90deg, var(--color-crimson-500), transparent);
}

.magnetic {
  display: inline-flex;
  will-change: transform;
}
.magnetic__inner {
  display: inline-flex;
  transform: translate3d(var(--mag-x, 0px), var(--mag-y, 0px), 0);
  transition: transform 0.45s var(--ease-out-expo);
}

.hero-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-bottom: 1.2rem;
  animation: hero-fade 1000ms var(--ease-out-expo) calc(var(--hero-delay) + 900ms) both;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 46rem;
  border-top: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
}
@media (min-width: 640px) {
  .hero-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.hero-stat {
  position: relative;
  padding: 0.85rem 1rem 0.15rem 0;
}
.hero-stat:nth-child(2n) {
  padding-left: 1rem;
  border-left: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
}
@media (min-width: 640px) {
  .hero-stat:nth-child(2n) {
    padding-left: 0;
    border-left: 0;
  }
  .hero-stat + .hero-stat {
    padding-left: 1.25rem;
    border-left: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
  }
}
.hero-stat__value {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.1vw, 1.95rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-bone-50);
  transition: color 0.3s ease;
}
.hero-stat__label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.45rem;
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}
.hero-stat__tick {
  width: 9px;
  height: 1px;
  background: var(--color-crimson-400);
  opacity: 0.7;
  transition: width 0.35s var(--ease-out-expo);
}
html[data-effects='on'] .hero-stat:hover .hero-stat__value {
  color: var(--color-crimson-200);
}
html[data-effects='on'] .hero-stat:hover .hero-stat__tick {
  width: 20px;
}

.hero-lowest {
  font-size: 0.68rem;
  color: var(--color-bone-500);
}

/* Sliding index of real product names along the bottom edge. */
.hero-rail {
  display: none;
  position: absolute;
  inset: auto 0 0 0;
  z-index: 4;
  border-top: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
  background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 58%, transparent), color-mix(in oklab, var(--color-ink-950) 92%, transparent));
  backdrop-filter: blur(14px);
  box-shadow: 0 -24px 60px -40px rgb(0 0 0 / 0.9);
}
@media (min-width: 1024px) {
  .hero-rail {
    display: block;
  }
  .home-hero .hero-shell {
    padding-bottom: 3.7rem;
  }
}
.hero-rail__inner {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  height: 3.7rem;
}
.hero-rail__label {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--color-bone-500);
  white-space: nowrap;
}
.hero-rail__label i {
  width: 6px;
  height: 6px;
  background: var(--color-crimson-400);
  transform: rotate(45deg);
  box-shadow: 0 0 12px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
  animation: pulse-soft 3s ease-in-out infinite;
}
.hero-rail__marquee {
  flex: 1;
  min-width: 0;
}
.hero-rail__item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--color-bone-100);
  white-space: nowrap;
  transition: color 0.25s ease;
}
html[data-effects='on'] .hero-rail__item:hover {
  color: var(--color-bone-50);
}
.hero-rail__arrow {
  font-size: 0.7rem;
  color: var(--color-crimson-300);
  opacity: 0.9;
  transform: translateY(-1px);
}
.hero-rail__all {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-bone-200);
  white-space: nowrap;
  transition: color 0.25s ease;
}
html[data-effects='on'] .hero-rail__all:hover {
  color: var(--color-crimson-200);
}

/* ==========================================================================
   6. Header
   ========================================================================== */

.logo-mark {
  transition: transform 0.5s var(--ease-out-expo), box-shadow 0.4s ease;
}
html[data-effects='on'] .logo-link:hover .logo-mark {
  transform: rotate(-6deg) scale(1.05);
  box-shadow: 0 12px 34px -14px color-mix(in oklab, var(--color-crimson-500) 90%, transparent);
}
.logo-name {
  transition: letter-spacing 0.5s var(--ease-out-expo);
}
html[data-effects='on'] .logo-link:hover .logo-name {
  letter-spacing: 0.28em;
}

/* Header layout follows available inline space and the visitor's text size. */
:root {
  --header-row-height: 4.5rem;
  --site-header-height: calc(var(--header-row-height) + 2px);
}
.site-header__bar,
.mobile-nav__header {
  container-name: site-header;
  container-type: inline-size;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--header-row-height);
}
.header-brand { flex: none; }
.header-nav,
.header-actions,
.header-clock { display: none; }
.header-nav { align-items: center; gap: 0.25rem; }
.header-actions { align-items: center; gap: 0.75rem; }
.header-actions .btn,
.header-actions .chip,
.header-nav .nav-link { white-space: nowrap; }
.menu-toggle {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
}
@container site-header (min-width: 80rem) {
  .header-nav,
  .header-actions { display: flex; }
  .header-inner > .menu-toggle:not(.menu-toggle--close),
  .no-js-navigation { display: none; }
}
@container site-header (min-width: 88rem) {
  .header-clock { display: inline-flex; }
}
/* At extreme text enlargement retain the emblem and accessible brand name,
   instead of squeezing or clipping the navigation control off-screen. */
@container site-header (max-width: 18rem) {
  .header-brand .logo-root > span:last-child { display: none; }
}

/* Compact header on phones — more room for the hero, same identity. */
@media (max-width: 767px) {
  :root { --header-row-height: 3.65rem; }
  .logo-root {
    gap: 0.55rem;
  }
  .logo-mark {
    width: 2rem;
    height: 2rem;
  }
  .logo-name {
    font-size: 0.92rem;
    letter-spacing: 0.2em;
  }
  .logo-kanji {
    margin-top: 0.2rem;
    font-size: 0.5rem;
    letter-spacing: 0.34em;
  }
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.015em;
  color: var(--color-bone-300);
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}
html[data-effects='on'] .nav-link:hover {
  color: var(--color-bone-50);
  background: color-mix(in oklab, var(--color-ink-800) 55%, transparent);
}
.nav-link[data-active='true'] {
  color: var(--color-bone-50);
}
.nav-link__dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 10px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
  opacity: 0;
  transform: scale(0.3);
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-out-expo);
}
.nav-link[data-active='true'] .nav-link__dot {
  opacity: 1;
  transform: none;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.12rem;
  width: 16px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-crimson-400), transparent);
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.35s var(--ease-out-expo);
}
.nav-link[data-active='true']::after {
  transform: translateX(-50%) scaleX(1);
}

.chip-live {
  border-color: color-mix(in oklab, var(--color-crimson-500) 35%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 65%, transparent);
  color: var(--color-bone-200);
}
.chip-live__dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 10px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
  animation: pulse-soft 2.6s ease-in-out infinite;
}

.store-clock {
  display: none;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-600) 70%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 45%, transparent);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--color-bone-400);
}
.store-clock__dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 8px color-mix(in oklab, var(--color-crimson-400) 85%, transparent);
}
.store-clock__label {
  color: var(--color-bone-500);
}
.js .store-clock,
html.js .store-clock {
  display: inline-flex;
}
.store-clock__time {
  color: var(--color-bone-200);
  min-width: 4.6em;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* The menu is a full-height modal with its own matching header. Its links
   scroll below that measured row, not below a conflicting hard-coded offset. */
.mobile-nav[open] {
  display: flex;
  flex-direction: column;
}
.modal-dialog.mobile-nav {
  container-name: mobile-menu;
  container-type: inline-size;
  z-index: 270;
  height: 100svh;
  height: 100dvh;
  overflow: hidden;
  background: color-mix(in oklab, var(--color-ink-950) 94%, transparent);
  backdrop-filter: blur(26px) saturate(140%);
}
.mobile-nav__header {
  flex: none;
  min-height: var(--site-header-height);
  border-block: 1px solid color-mix(in oklab, var(--color-ink-600) 60%, transparent);
  background: var(--color-ink-950);
}
.mobile-nav__content {
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 0.375rem;
  padding-block: 1.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.mobile-nav__link {
  display: flex;
  flex: none;
  align-items: center;
  gap: 1rem;
  padding: 1.05rem 0.2rem;
  border-bottom: 1px solid color-mix(in oklab, var(--color-ink-600) 45%, transparent);
}
html[data-effects='on'] .mobile-nav[open] .mobile-nav__link {
  animation: route-in 450ms var(--ease-out-expo) both;
}
.mobile-nav__link:focus-visible {
  animation: none !important;
}
/* At large text sizes give the destination words the full line; the index
   and arrow are decoration, not navigation content. */
@container mobile-menu (max-width: 18rem) {
  .mobile-nav__content { padding-inline: 0.75rem; }
  .mobile-nav__index,
  .mobile-nav__arrow { display: none; }
}
.mobile-nav__index {
  flex: none;
  font-size: 0.6rem;
  color: var(--color-crimson-300);
  opacity: 0.75;
}
.mobile-nav__label {
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--color-bone-100);
}
.mobile-nav__link[data-active='true'] .mobile-nav__label {
  color: var(--color-crimson-200);
}
.mobile-nav__arrow {
  flex: none;
  margin-left: auto;
  color: var(--color-bone-500);
  transition: transform 0.3s ease;
}
html[data-effects='on'] .mobile-nav__link:hover .mobile-nav__arrow {
  transform: translateX(4px);
}
.mobile-nav__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}

/* ==========================================================================
   7. Cards — 3D tilt, specular glare and an orbiting border
   ========================================================================== */

.tilt {
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  height: 100%;
  border-radius: 1.75rem;
  transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift, 0));
  transform-style: preserve-3d;
  transition: transform 0.7s var(--ease-out-expo);
}
html[data-effects='on'] .tilt:hover {
  --lift: -6px;
}
.tilt.is-tilting {
  transition: transform 90ms linear;
}
.tilt::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: 3;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--angle),
    transparent 0deg,
    color-mix(in oklab, var(--color-crimson-400) 75%, transparent) 52deg,
    transparent 118deg,
    transparent 222deg,
    color-mix(in oklab, var(--color-aura-400) 60%, transparent) 292deg,
    transparent 360deg
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  animation: border-spin 7s linear infinite;
  animation-play-state: paused;
  transition: opacity 0.4s ease;
}
html[data-effects='on'] .tilt:hover::before {
  opacity: 0.9;
  animation-play-state: running;
}
@keyframes border-spin {
  to {
    --angle: 360deg;
  }
}
.tilt--glare::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  border-radius: inherit;
  background: radial-gradient(
    24rem 24rem at var(--mx, 50%) var(--my, 50%),
    rgb(255 255 255 / 0.13),
    transparent 55%
  );
  mix-blend-mode: soft-light;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
html[data-effects='on'] .tilt:hover::after {
  opacity: 1;
}

.card-3d {
  transition:
    border-color 0.45s ease,
    box-shadow 0.55s ease;
}
html[data-effects='on'] .card-3d:hover {
  border-color: color-mix(in oklab, var(--color-crimson-500) 42%, var(--color-ink-600));
  box-shadow:
    0 1px 0 0 rgb(255 255 255 / 0.05) inset,
    0 34px 80px -44px rgb(0 0 0 / 1),
    0 0 60px -30px color-mix(in oklab, var(--color-crimson-500) 80%, transparent);
}

.card-sheen {
  position: absolute;
  inset: -40%;
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgb(255 255 255 / 0.07) 47%,
    rgb(255 255 255 / 0.14) 50%,
    rgb(255 255 255 / 0.07) 53%,
    transparent 62%
  );
}
html[data-effects='on'] .card-3d:hover .card-sheen {
  animation: card-sweep 1150ms ease-out;
}
@keyframes card-sweep {
  0% {
    opacity: 0;
    transform: translate3d(-60%, 0, 0) rotate(6deg);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(60%, 0, 0) rotate(6deg);
  }
}

.card-hover-veil {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(to top, color-mix(in oklab, var(--color-ink-950) 78%, transparent), transparent 58%);
  transition: opacity 0.5s ease;
  pointer-events: none;
}
html[data-effects='on'] .card-3d:hover .card-hover-veil {
  opacity: 1;
}

.card-view {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-300) 45%, transparent);
  background: color-mix(in oklab, var(--color-ink-950) 72%, transparent);
  backdrop-filter: blur(8px);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-50);
  opacity: 0;
  transform: translate(-50%, -42%) scale(0.92);
  transition:
    opacity 0.4s ease,
    transform 0.5s var(--ease-out-expo);
  pointer-events: none;
}
html[data-effects='on'] .card-3d:hover .card-view {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.card-stretch::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
}

.featured-badge {
  overflow: hidden;
}

/* ==========================================================================
   8. Marquees
   ========================================================================== */

.marquee {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll var(--marquee-duration, 42s) linear infinite;
  will-change: transform;
}
.marquee__track.is-reverse {
  animation-direction: reverse;
}
html[data-effects='on'] .marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__group {
  display: flex;
  align-items: center;
}
.hero-rail__marquee .marquee__group {
  gap: 2.4rem;
  padding-right: 2.4rem;
}
@keyframes marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

/* ==========================================================================
   9. Footer invitation + exhibition type
   ========================================================================== */

.footer-cta {
  position: relative;
  overflow: hidden;
  border-top: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
  background:
    radial-gradient(70% 120% at 50% 0%, color-mix(in oklab, var(--color-crimson-600) 14%, transparent), transparent 70%),
    color-mix(in oklab, var(--color-ink-950) 92%, transparent);
}
.footer-cta__glow {
  position: absolute;
  left: 50%;
  top: -18rem;
  width: 52rem;
  height: 34rem;
  transform: translateX(-50%);
  background: radial-gradient(circle, color-mix(in oklab, var(--color-crimson-500) 20%, transparent), transparent 66%);
  pointer-events: none;
  animation: pulse-soft 9s ease-in-out infinite;
}
.footer-cta__inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-block: 4.5rem 3.5rem;
}
.footer-cta__title {
  margin-top: 1.1rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.4vw, 3.3rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--color-bone-50);
  max-width: 24ch;
}
.footer-cta__title .serif-accent {
  color: var(--color-crimson-200);
}
.footer-cta__note {
  margin-top: 1rem;
  max-width: 34rem;
  font-size: 0.93rem;
  line-height: 1.7;
  color: var(--color-bone-400);
}
.footer-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.footer-marquee {
  border-block: 1px solid color-mix(in oklab, var(--color-ink-600) 45%, transparent);
  padding-block: 0.7rem;
}
.footer-marquee .marquee__group {
  gap: 2.2rem;
  padding-right: 2.2rem;
}
.footer-marquee__word {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7.5vw, 6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklab, var(--color-bone-50) 15%, transparent);
  white-space: nowrap;
}
.footer-marquee__dot {
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background: var(--color-crimson-500);
  box-shadow: 0 0 18px color-mix(in oklab, var(--color-crimson-400) 80%, transparent);
  flex: none;
}

/* ==========================================================================
   10. Small refinements around the site
   ========================================================================== */

/* Category index watermark */
.index-ghost {
  position: absolute;
  right: 0.4rem;
  top: -0.6rem;
  z-index: 0;
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 8vw, 7.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklab, var(--color-bone-50) 9%, transparent);
  pointer-events: none;
  user-select: none;
}

/* Price rows feel clickable and alive */
.panel a[href='#purchase'] .font-display {
  transition: color 0.25s ease;
}
html[data-effects='on'] .panel a[href='#purchase']:hover .font-display {
  color: var(--color-crimson-200);
}

/* Large page titles get a soft aura behind them */
.eyebrow::before {
  box-shadow:
    0 0 14px color-mix(in oklab, var(--color-crimson-400) 80%, transparent),
    0 0 30px color-mix(in oklab, var(--color-crimson-500) 35%, transparent);
}

/* Section headings read better with the new display face */
h2.font-display,
h3.font-display {
  letter-spacing: -0.035em;
}

/* Frosted glass on desktop only: keeps text readable over the character art
   without paying for a blur filter on phones. */
@media (min-width: 1024px) {
  @supports (backdrop-filter: blur(6px)) {
    .panel {
      backdrop-filter: blur(14px) saturate(112%);
    }
    .panel-quiet {
      backdrop-filter: blur(10px) saturate(110%);
    }
  }
}

/* Film grain — static, so it is composited once and costs nothing per frame. */
.grain-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-size: 180px 180px;
}

/* ==========================================================================
   11. Responsive + motion safety
   ========================================================================== */

@media (max-width: 1023px) {
  .hero-frame,
  .hero-watermark {
    display: none;
  }
  .hero-spotlight {
    opacity: 0.75;
  }
  .home-hero::before {
    background:
      radial-gradient(80% 62% at 24% 42%, color-mix(in oklab, var(--color-ink-950) 92%, transparent), transparent 74%),
      linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 70%, transparent) 0%, transparent 30%, transparent 58%, color-mix(in oklab, var(--color-ink-950) 92%, transparent) 100%);
  }
  .home-hero .hero-desc,
  .home-hero .hero-note,
  .home-hero .hero-badge {
    text-shadow: 0 1px 18px color-mix(in oklab, var(--color-ink-950) 80%, transparent);
  }
}

/* Small phones: four compact stats in one row, never a wrapped label. */
@media (max-width: 420px) {
  .hero-stat__value {
    font-size: 1.08rem;
  }
  .hero-stat__label {
    font-size: 0.4rem;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .hero-stat__tick {
    display: none;
  }
}

@media (max-width: 767px) and (max-height: 700px) {
  .hero-stats {
    display: none;
  }
  .hero-body {
    padding-top: 1.4rem !important;
  }
}

@media (max-width: 767px) {
  .site-intro__core {
    gap: 0.75rem;
  }
  .home-hero .hero-shell {
    padding-top: 1.6rem;
  }
  .hero-body {
    padding-top: 3.6rem !important;
    padding-bottom: 0.4rem;
  }
  .hero-title {
    margin-top: 1.1rem;
    font-size: clamp(2.05rem, 8.9vw, 2.75rem);
    line-height: 1.06;
  }
  .hero-body {
    padding-top: 2.15rem !important;
  }
  .hero-copy {
    max-width: 100%;
  }
  .hero-desc {
    margin-top: 0.85rem;
    font-size: 0.88rem;
    line-height: 1.6;
    max-width: 32rem;
  }
  .hero-desc__long {
    display: none;
  }
  .hero-desc__short {
    display: inline;
  }
  .hero-badge {
    gap: 0.45rem;
    font-size: 0.5rem;
    letter-spacing: 0.12em;
    padding: 0.4rem 0.7rem;
  }
  .hero-badge .hero-badge__rule--end,
  .hero-badge .font-mono:last-child {
    display: none;
  }
  .hero-actions {
    margin-top: 1.1rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .hero-actions > .magnetic {
    flex: 1 1 9rem;
    min-width: 0;
  }
  .hero-actions > .magnetic > .magnetic__inner {
    width: 100%;
  }
  .hero-actions .btn {
    width: 100%;
    min-width: 0;
    padding: 0.8rem 0.55rem !important;
    font-size: 0.79rem !important;
    white-space: normal;
    text-align: center;
  }
  .hero-actions .btn {
    gap: 0.35rem;
  }
  .hero-actions .btn svg {
    flex: none;
    width: 0.8rem;
    height: 0.8rem;
  }
  .hero-note {
    display: none;
  }
  .hero-bottom {
    gap: 0.45rem;
    padding-bottom: 0.75rem;
  }
  .hero-stats {
    margin-top: 0.4rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .hero-stat {
    padding: 0.5rem 0.55rem 0 0;
  }
  .hero-stat:nth-child(2n) {
    padding-left: 0.55rem;
    border-left: 1px solid color-mix(in oklab, var(--color-ink-600) 45%, transparent);
  }
  .hero-stat + .hero-stat {
    padding-left: 0.55rem;
    border-left: 1px solid color-mix(in oklab, var(--color-ink-600) 45%, transparent);
  }
  .hero-stat__value {
    font-size: 1.15rem;
  }
  .hero-stat__label {
    margin-top: 0.25rem;
    font-size: 0.42rem;
    letter-spacing: 0.08em;
    gap: 0.3rem;
  }
  .hero-stat__tick {
    width: 5px;
  }
  .hero-lowest {
    display: none;
  }
  .footer-cta__inner {
    padding-block: 3.25rem 2.5rem;
  }
  .mobile-nav__label {
    font-size: 1.35rem;
  }
  .to-top {
    right: 0.9rem;
    bottom: 0.9rem;
    width: 42px;
    height: 42px;
  }
}

@media (max-height: 820px) and (min-width: 1024px) {
  .hero-title {
    font-size: clamp(2.3rem, min(5vw, 7.4svh), 3.9rem);
  }
  .hero-desc {
    margin-top: 1rem;
    line-height: 1.6;
  }
  .hero-actions {
    margin-top: 1.3rem;
  }
  .hero-stat__value {
    font-size: 1.5rem;
  }
  .hero-stat {
    padding-top: 0.6rem;
  }
  .hero-stat__label {
    margin-top: 0.3rem;
  }
  .hero-bottom {
    gap: 0.4rem;
  }
}

@media (hover: none), (pointer: coarse) {
  .tilt {
    transform: none;
  }
  .tilt::before,
  .tilt::after,
  .card-sheen {
    display: none;
  }
  .card-hover-veil,
  .card-view {
    display: none;
  }
  .hero-frame {
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-intro {
    display: none !important;
  }
  .pointer-layer,
  .hero-spotlight {
    display: none !important;
  }
  .hero-word__in,
  .hero-line__in,
  .hero-badge,
  .hero-desc,
  .hero-actions,
  .hero-bottom,
  .hero-serif::after,
  .split-word-inner,
  .route-entrance {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .marquee__track {
    animation: none !important;
  }
  .tilt {
    transform: none !important;
  }
  .tilt::before,
  .tilt::after,
  .card-sheen,
  .hero-watermark,
  .hero-spine__line::after,
  .hero-spine__seal {
    animation: none !important;
  }
  .hero-grad {
    animation: none !important;
    background-position: 50% 50%;
  }
}

/* Platform media strip ---------------------------------------------------- */
.platform-strip {
  border-block: 1px solid color-mix(in oklab, var(--color-ink-600) 45%, transparent);
  background: color-mix(in oklab, var(--color-ink-950) 55%, transparent);
  padding-block: 0.65rem;
  margin-bottom: 2.5rem;
}
.platform-strip__item {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  white-space: nowrap;
}
.platform-strip .marquee__group {
  gap: 1.8rem;
  padding-right: 1.8rem;
}
.platform-strip__glyph {
  font-size: 1.05rem;
  color: var(--color-crimson-300);
  opacity: 0.85;
}
.platform-strip__value {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-300);
}
.platform-strip__sep {
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
  background: color-mix(in oklab, var(--color-crimson-400) 55%, transparent);
}

/* ==========================================================================
   12. Product gallery — a lit exhibition frame + full-screen viewer
   ========================================================================== */

.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.gallery__frame {
  --gx: 50%;
  --gy: 38%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 1.9rem;
}
@media (min-width: 640px) {
  .gallery__frame {
    aspect-ratio: 5 / 4;
  }
}

.gallery__stage {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  cursor: zoom-in;
  background:
    radial-gradient(65% 60% at 50% 42%, color-mix(in oklab, var(--color-crimson-500) 8%, transparent), transparent 70%),
    var(--color-ink-950);
}

.gallery__stage::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 55%, transparent), transparent 22%, transparent 78%, color-mix(in oklab, var(--color-ink-950) 70%, transparent));
}

.gallery__glow {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: radial-gradient(
    18rem 18rem at var(--gx) var(--gy),
    color-mix(in oklab, var(--color-crimson-300) 22%, transparent),
    transparent 68%
  );
}
html[data-effects='on'] .gallery__frame:hover .gallery__glow {
  opacity: 1;
}

.gallery__scan {
  position: absolute;
  inset: -40% -10%;
  z-index: 3;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: overlay;
  background: repeating-linear-gradient(
    to bottom,
    rgb(255 255 255 / 0.055) 0 1px,
    transparent 1px 4px
  );
  animation: gallery-scan 9s linear infinite;
}
@keyframes gallery-scan {
  to {
    transform: translate3d(0, 4px, 0);
  }
}

.gallery__brackets i {
  position: absolute;
  z-index: 4;
  width: 18px;
  height: 18px;
  border-color: color-mix(in oklab, var(--color-bone-50) 26%, transparent);
  border-style: solid;
  pointer-events: none;
  transition:
    border-color 0.4s ease,
    width 0.5s var(--ease-out-expo),
    height 0.5s var(--ease-out-expo);
}
.gallery__brackets i:nth-child(1) {
  top: 16px;
  left: 16px;
  border-width: 1px 0 0 1px;
}
.gallery__brackets i:nth-child(2) {
  top: 16px;
  right: 16px;
  border-width: 1px 1px 0 0;
}
.gallery__brackets i:nth-child(3) {
  bottom: 16px;
  left: 16px;
  border-width: 0 0 1px 1px;
}
.gallery__brackets i:nth-child(4) {
  bottom: 16px;
  right: 16px;
  border-width: 0 1px 1px 0;
}
html[data-effects='on'] .gallery__frame:hover .gallery__brackets i {
  width: 26px;
  height: 26px;
  border-color: color-mix(in oklab, var(--color-crimson-300) 70%, transparent);
}

.gallery__index {
  position: absolute;
  left: 20px;
  bottom: 16px;
  z-index: 5;
  font-size: 0.54rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-bone-500);
  pointer-events: none;
}

.gallery__badges {
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 6;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  pointer-events: none;
}

.gallery__zoom {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 6;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-bone-50) 18%, transparent);
  background: color-mix(in oklab, var(--color-ink-950) 68%, transparent);
  backdrop-filter: blur(10px);
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-100);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.45s var(--ease-out-expo),
    border-color 0.3s ease;
}
.gallery__zoom svg {
  width: 14px;
  height: 14px;
}
html[data-effects='on'] .gallery__frame:hover .gallery__zoom,
.gallery__stage:focus-visible .gallery__zoom {
  opacity: 1;
  transform: none;
  border-color: color-mix(in oklab, var(--color-crimson-300) 55%, transparent);
}

.gallery__alt {
  position: absolute;
  inset: 0;
  display: block;
  animation: gallery-swap 700ms var(--ease-out-expo) both;
}
@keyframes gallery-swap {
  from {
    opacity: 0;
    transform: scale(1.04);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

.gallery__thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.gallery__thumb {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.75rem 0.35rem 0.35rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-600) 80%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 60%, transparent);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.35s var(--ease-out-expo);
}
html[data-effects='on'] .gallery__thumb:hover {
  transform: translateY(-1px);
  border-color: color-mix(in oklab, var(--color-crimson-500) 45%, var(--color-ink-600));
}
.gallery__thumb[data-active='true'] {
  border-color: color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
  background: color-mix(in oklab, var(--color-crimson-900) 35%, transparent);
  box-shadow: 0 0 26px -14px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
}
.gallery__thumb-art {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--color-ink-950);
}
.gallery__thumb-art img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 2px;
}
.gallery__thumb-label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-bone-300);
}
.gallery__thumb[data-active='true'] .gallery__thumb-label {
  color: var(--color-bone-50);
}

/* Shared native dialog reset. Closed portals are never visible or tabbable. */
.modal-dialog {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.modal-dialog:not([open]) { display: none !important; }
.modal-dialog::backdrop { background: transparent; }
/* The decorative cursor is below the browser's top layer. Keep a real cursor. */
html.has-pointer .modal-dialog,
html.has-pointer .modal-dialog * { cursor: revert !important; }
html:has(.modal-dialog[open]) .pointer-layer { visibility: hidden; }

/* Viewer --------------------------------------------------------------- */
html.scroll-locked {
  overflow: hidden;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 260;
  display: grid;
  place-items: center;
  align-items: safe center;
  padding: clamp(0.75rem, 3vw, 2.5rem);
}
.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in oklab, #020206 82%, transparent);
  backdrop-filter: blur(18px) saturate(120%);
  animation: lightbox-fade 400ms ease both;
  cursor: zoom-out;
}
@keyframes lightbox-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.lightbox__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(1080px, 100%);
  animation: lightbox-in 600ms var(--ease-out-expo) both;
}
@keyframes lightbox-in {
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.lightbox__bar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-inline: 0.2rem;
}
.lightbox__cap {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-bone-200);
}
.lightbox__dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 12px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
}
.lightbox__count {
  margin-left: auto;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  color: var(--color-bone-500);
}
.lightbox__close {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-500) 80%, transparent);
  background: color-mix(in oklab, var(--color-ink-800) 80%, transparent);
  color: var(--color-bone-100);
  transition:
    border-color 0.3s ease,
    transform 0.4s var(--ease-out-expo);
}
html[data-effects='on'] .lightbox__close:hover {
  border-color: color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
  transform: rotate(90deg);
}
.lightbox__close svg {
  width: 16px;
  height: 16px;
}
.lightbox__stage {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 1.7rem;
  border: 1px solid color-mix(in oklab, var(--color-ink-600) 75%, transparent);
  background:
    radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, var(--color-crimson-500) 12%, transparent), transparent 72%),
    color-mix(in oklab, var(--color-ink-950) 96%, transparent);
  box-shadow:
    0 1px 0 0 rgb(255 255 255 / 0.04) inset,
    0 60px 120px -60px rgb(0 0 0 / 1);
  padding: clamp(0.75rem, 3vw, 2.25rem);
}
.lightbox__img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: min(68svh, 720px);
  object-fit: contain;
  animation: lightbox-img 650ms var(--ease-out-expo) both;
  filter: drop-shadow(0 24px 48px rgb(0 0 0 / 0.55));
}
@keyframes lightbox-img {
  from {
    opacity: 0;
    transform: scale(0.965);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.lightbox__foot {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.lightbox__arrow {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-500) 75%, transparent);
  background: color-mix(in oklab, var(--color-ink-850) 75%, transparent);
  color: var(--color-bone-100);
  font-size: 0.95rem;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}
html[data-effects='on'] .lightbox__arrow:hover {
  border-color: color-mix(in oklab, var(--color-crimson-400) 65%, transparent);
  background: color-mix(in oklab, var(--color-crimson-900) 45%, transparent);
}
.lightbox__dots {
  display: inline-flex;
  gap: 0.4rem;
}
.lightbox__dotbtn {
  width: 22px;
  height: 3px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--color-ink-500) 80%, transparent);
  transition:
    background-color 0.3s ease,
    width 0.4s var(--ease-out-expo);
}
.lightbox__dotbtn[aria-current='true'] {
  width: 34px;
  background: var(--color-crimson-400);
}
.lightbox__hint {
  text-align: center;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}

/* ==========================================================================
   13. Featured drop — the shelf that rises from the bottom edge
   ========================================================================== */

.hero-rail__drop {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-500) 32%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 62%, transparent);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-100);
  white-space: nowrap;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
}
html[data-effects='on'] .hero-rail__drop:hover {
  border-color: color-mix(in oklab, var(--color-crimson-400) 75%, transparent);
  background: color-mix(in oklab, var(--color-crimson-900) 45%, transparent);
  color: #fff;
}
.hero-rail__drop-icon {
  position: relative;
  width: 13px;
  height: 12px;
}
.hero-rail__drop-icon i {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  border: 1px solid color-mix(in oklab, var(--color-crimson-300) 70%, transparent);
  background: color-mix(in oklab, var(--color-ink-950) 90%, transparent);
}
.hero-rail__drop-icon i:nth-child(1) {
  left: 0;
  top: 0;
  opacity: 0.45;
}
.hero-rail__drop-icon i:nth-child(2) {
  left: 2px;
  top: 2px;
  opacity: 0.7;
}
.hero-rail__drop-icon i:nth-child(3) {
  left: 4px;
  top: 4px;
  background: color-mix(in oklab, var(--color-crimson-500) 40%, var(--color-ink-950));
}
.hero-rail__drop-count {
  font-size: 0.56rem;
  color: var(--color-crimson-200);
  letter-spacing: 0.08em;
}

/* Phone / tablet peek strip */
.hero-peek {
  display: none;
}
@media (max-width: 1023px) {
  .hero-peek {
    display: flex;
    position: absolute;
    inset: auto 0 0 0;
    z-index: 6;
    align-items: center;
    gap: 0.75rem;
    height: 3.15rem;
    padding-inline: 0.9rem;
    border-top: 1px solid color-mix(in oklab, var(--color-ink-600) 55%, transparent);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--color-ink-950) 55%, transparent),
      color-mix(in oklab, var(--color-ink-950) 94%, transparent)
    );
    backdrop-filter: blur(16px);
  }
  .home-hero .hero-shell {
    padding-bottom: 3.15rem;
  }
  .hero-peek__label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex: none;
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-bone-100);
  }
  .hero-peek__label .font-mono {
    color: var(--color-crimson-200);
    letter-spacing: 0.06em;
  }
  .hero-peek__dot {
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--color-crimson-300);
    box-shadow: 0 0 10px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
    animation: pulse-soft 2.6s ease-in-out infinite;
  }
  .hero-peek__art {
    display: inline-flex;
    align-items: center;
    margin-left: 0.1rem;
  }
  .hero-peek__art img {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    object-fit: contain;
    padding: 2px;
    background: color-mix(in oklab, var(--color-ink-900) 90%, transparent);
    border: 1px solid color-mix(in oklab, var(--color-ink-500) 70%, transparent);
  }
  .hero-peek__art img + img {
    margin-left: -8px;
  }
  .hero-peek__open {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;
    font-size: 0.54rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-crimson-200);
  }
  .hero-peek__open svg {
    width: 13px;
    height: 13px;
  }
}
@media (max-width: 767px) and (max-height: 660px) {
  .hero-peek {
    display: none;
  }
  .home-hero .hero-shell {
    padding-bottom: 0.6rem;
  }
}

.drop {
  position: fixed;
  inset: 0;
  z-index: 250;
}
.drop__backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in oklab, #020206 62%, transparent);
  backdrop-filter: blur(10px);
  animation: lightbox-fade 400ms ease both;
  cursor: default;
}
.drop__panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-height: 88svh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: clamp(1rem, 2.2vw, 1.75rem) 0 0.9rem;
  border-top: 1px solid color-mix(in oklab, var(--color-crimson-400) 32%, transparent);
  border-radius: 1.9rem 1.9rem 0 0;
  background:
    radial-gradient(80% 120% at 50% 0%, color-mix(in oklab, var(--color-crimson-600) 14%, transparent), transparent 62%),
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-900) 97%, transparent), var(--color-ink-950));
  box-shadow: 0 -50px 120px -50px rgb(0 0 0 / 1);
  animation: drop-up 640ms var(--ease-out-expo) both;
}
@keyframes drop-up {
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: none;
  }
}
.drop__head {
  position: sticky;
  top: 0;
  z-index: 8;
  flex: none;
  background: var(--color-ink-900);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  padding-inline: clamp(1.15rem, 4vw, 2.5rem);
}
.drop__title {
  margin-top: 0.45rem;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--color-bone-50);
}
.drop__sub {
  margin-top: 0.5rem;
  max-width: 46rem;
  font-size: 0.84rem;
  line-height: 1.6;
  color: var(--color-bone-400);
}
.drop__close {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-500) 80%, transparent);
  background: color-mix(in oklab, var(--color-ink-800) 80%, transparent);
  color: var(--color-bone-100);
  transition:
    border-color 0.3s ease,
    transform 0.4s var(--ease-out-expo);
}
html[data-effects='on'] .drop__close:hover {
  border-color: color-mix(in oklab, var(--color-crimson-400) 70%, transparent);
  transform: rotate(90deg);
}
.drop__close svg {
  width: 16px;
  height: 16px;
}
.drop__progress {
  height: 1px;
  margin: 0.9rem clamp(1.15rem, 4vw, 2.5rem) 0;
  background: color-mix(in oklab, var(--color-ink-600) 60%, transparent);
  overflow: hidden;
}
.drop__progress span {
  display: block;
  height: 100%;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--color-crimson-500), var(--color-crimson-200));
  transition: transform 0.25s ease;
}
.drop__track {
  flex: none;
  display: flex;
  gap: 0.9rem;
  overscroll-behavior-x: contain;
  scroll-padding-inline: 1.15rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1.05rem clamp(1.15rem, 4vw, 2.5rem) 0.6rem;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  cursor: grab;
  outline: none;
}
.drop__track::-webkit-scrollbar {
  display: none;
}
.drop__track.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
}
.drop__track:focus-visible {
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--color-crimson-400) 40%, transparent);
}
.drop__card {
  position: relative;
  flex: 0 0 268px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem;
  border-radius: 1.35rem;
  border: 1px solid color-mix(in oklab, var(--color-ink-600) 72%, transparent);
  background: linear-gradient(
    165deg,
    color-mix(in oklab, var(--color-ink-800) 92%, transparent),
    color-mix(in oklab, var(--color-ink-900) 96%, transparent)
  );
  scroll-snap-align: start;
  transition:
    transform 0.5s var(--ease-out-expo),
    border-color 0.35s ease,
    box-shadow 0.5s ease;
}
html[data-effects='on'] .drop__card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in oklab, var(--color-crimson-500) 50%, var(--color-ink-600));
  box-shadow:
    0 30px 60px -40px rgb(0 0 0 / 1),
    0 0 46px -24px color-mix(in oklab, var(--color-crimson-500) 90%, transparent);
}
.drop__index {
  position: absolute;
  right: 0.9rem;
  top: 0.85rem;
  z-index: 2;
  font-size: 0.55rem;
  letter-spacing: 0.16em;
  color: var(--color-bone-500);
}
.drop__art {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.95rem;
  background:
    radial-gradient(70% 70% at 50% 45%, color-mix(in oklab, var(--color-crimson-500) 12%, transparent), transparent 72%),
    var(--color-ink-950);
}
.drop__art img {
  position: relative;
  z-index: 1;
  width: 74%;
  height: 74%;
  object-fit: contain;
  filter: drop-shadow(0 14px 26px rgb(0 0 0 / 0.55));
  transition: transform 0.6s var(--ease-out-expo);
}
html[data-effects='on'] .drop__card:hover .drop__art img {
  transform: scale(1.06) rotate(-1.5deg);
}
.drop__art-glow {
  position: absolute;
  inset: auto -20% -40% -20%;
  height: 60%;
  background: radial-gradient(50% 100% at 50% 100%, color-mix(in oklab, var(--color-crimson-400) 22%, transparent), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
html[data-effects='on'] .drop__card:hover .drop__art-glow {
  opacity: 1;
}
.drop__art-fallback {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.1em;
  color: var(--color-bone-400);
}
.drop__platform {
  margin-top: 0.45rem;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-crimson-300);
}
.drop__name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-bone-50);
  line-height: 1.2;
}
.drop__summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--color-bone-400);
}
.drop__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.7rem;
  border-top: 1px solid color-mix(in oklab, var(--color-ink-700) 70%, transparent);
}
.drop__from {
  display: block;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}
.drop__price {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.8rem;
  color: var(--color-bone-100);
}
.drop__arrow {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--color-ink-500) 75%, transparent);
  font-size: 0.7rem;
  color: var(--color-bone-300);
  transition:
    transform 0.4s var(--ease-out-expo),
    color 0.3s ease,
    border-color 0.3s ease;
}
html[data-effects='on'] .drop__card:hover .drop__arrow {
  transform: translate(3px, -3px);
  color: var(--color-crimson-200);
  border-color: color-mix(in oklab, var(--color-crimson-400) 60%, transparent);
}
.drop__card--all {
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  border-style: dashed;
  border-color: color-mix(in oklab, var(--color-ink-500) 70%, transparent);
  background: color-mix(in oklab, var(--color-ink-900) 55%, transparent);
}
html[data-effects='on'] .drop__card--all:hover {
  border-style: solid;
}
.drop__all-mark {
  font-size: 2.4rem;
  line-height: 1;
  color: var(--color-crimson-300);
  opacity: 0.85;
}
.drop__all-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
 letter-spacing: -0.02em;
  color: var(--color-bone-50);
}
.drop__all-sub {
  font-size: 0.76rem;
  line-height: 1.5;
  color: var(--color-bone-400);
}
.drop__all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-crimson-200);
}
.drop__hint {
  padding: 0.35rem clamp(1.15rem, 4vw, 2.5rem) 0;
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-bone-500);
}
.drop__hint span {
  color: var(--color-bone-300);
  margin-right: 0.3rem;
}

@media (max-width: 767px) {
  .drop__panel {
    max-height: 90svh;
    border-radius: 1.4rem 1.4rem 0 0;
  }
  .drop__head {
    align-items: flex-start;
  }
  .drop__track {
    scroll-padding-inline: 0.9rem;
    padding-inline: 0.9rem;
  }
  .drop__progress {
    margin-inline: 0.9rem;
  }
  .drop__card {
    flex-basis: 228px;
  }
  .drop__card--all {
    flex-basis: 190px;
  }
  .drop__sub {
    display: none;
  }
  .drop__hint {
    display: none;
  }
}

/* ==========================================================================
   14. PC atmosphere — CRT scanlines + pointer comet
   ========================================================================== */

.fx-screen {
  position: fixed;
  inset: 0;
  z-index: -5;
  overflow: hidden;
  pointer-events: none;
}
.fx-screen__lines {
  position: absolute;
  inset: -10% 0;
  background: repeating-linear-gradient(
    to bottom,
    rgb(255 255 255 / 0.05) 0 1px,
    transparent 1px 3px
  );
  opacity: 0.5;
  mix-blend-mode: overlay;
  animation: screen-drift 12s linear infinite;
}
@keyframes screen-drift {
  to {
    transform: translate3d(0, 3px, 0);
  }
}
.fx-screen__beam {
  position: absolute;
  left: 0;
  right: 0;
  height: 30vh;
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in oklab, var(--color-crimson-400) 7%, transparent) 50%,
    transparent
  );
  animation: screen-beam 11s ease-in-out infinite;
}
@keyframes screen-beam {
  0% {
    transform: translate3d(0, -35vh, 0);
    opacity: 0;
  }
  18% {
    opacity: 1;
  }
  82% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 105vh, 0);
    opacity: 0;
  }
}
.fx-screen__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 45%, transparent 55%, color-mix(in oklab, var(--color-ink-950) 68%, transparent) 100%);
}

.trail {
  position: fixed;
  inset: 0;
  z-index: 6;
  pointer-events: none;
}
.trail-dot {
  position: fixed;
  left: 0;
  top: 0;
  width: var(--trail-size, 7px);
  height: var(--trail-size, 7px);
  border-radius: 999px;
  background: var(--color-crimson-300);
  box-shadow: 0 0 14px color-mix(in oklab, var(--color-crimson-400) 90%, transparent);
  opacity: 0;
  will-change: transform, opacity;
}
.trail-dot.is-fading {
  animation: trail-fade var(--trail-life, 620ms) cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
@keyframes trail-fade {
  0% {
    opacity: 0.7;
    transform: translate3d(var(--tx, 0), var(--ty, 0), 0) translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(var(--tx, 0), var(--ty, 0), 0) translate(-50%, -50%) scale(0.15);
  }
}

@media (max-width: 767px) {
  .fx-screen__lines {
    opacity: 0.28;
  }
  .fx-screen__beam {
    display: none;
  }
  .trail {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery__scan,
  .gallery__glow,
  .lightbox__backdrop,
  .lightbox__panel,
  .lightbox__img,
  .drop__backdrop,
  .drop__panel,
  .fx-screen__lines,
  .fx-screen__beam,
  .gallery__alt {
    animation: none !important;
  }
  .trail {
    display: none !important;
  }
}

/* Validation uses readable words as well as a field border, never colour alone. */
.field[aria-invalid='true'] {
  border-color: var(--color-crimson-300);
  box-shadow: 0 0 0 1px var(--color-crimson-300);
}
.field-error {
  margin-top: 0.5rem;
  color: var(--color-crimson-200);
  font-size: 0.8125rem;
  line-height: 1.5;
}

/* Progressive enhancement: real links and a native mobile menu without JS. */
html:not(.js) :is(.menu-toggle, #mobile-navigation, [data-drop-trigger], .gallery__zoom, .to-top) {
  display: none !important;
}
.no-js-navigation {
  position: relative;
}
.no-js-navigation summary {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-ink-500);
  border-radius: 999px;
  background: var(--color-ink-900);
  color: var(--color-bone-100);
  cursor: pointer;
}
.no-js-navigation nav {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: min(22rem, calc(100vw - 2.5rem));
  max-height: calc(100svh - var(--site-header-height) - 0.75rem);
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid var(--color-ink-600);
  border-radius: 1rem;
  background: var(--color-ink-950);
}
.no-js-navigation a {
  display: block;
  padding: 0.85rem 1rem;
  color: var(--color-bone-100);
}
.no-js-navigation a[aria-current='page'] {
  color: var(--color-crimson-200);
  background: var(--color-ink-800);
}

/* ==========================================================================
   Shared effects policy — static unless JavaScript positively opts in.
   Keep this final safety layer after the decorative rules and utilities.
   ========================================================================== */

html:not([data-effects='on']),
html:not([data-effects='on']) *,
html:not([data-effects='on']) *::before,
html:not([data-effects='on']) *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
  will-change: auto !important;
  cursor: revert !important;
}

/* Effects without useful static content are removed, not frozen mid-frame. */
html:not([data-effects='on']) :is(
  .site-intro, .pointer-layer, .hero-spotlight, .theme-ripple, .fx, .spark,
  .fx-screen, .trail, .stage-ring, .card-sheen, .card-hover-veil, .card-view,
  .gallery__glow, .gallery__scan, .scroll-progress, .to-top__ring
) {
  display: none !important;
}
html:not([data-effects='on']) :is(.tilt, .btn-primary, .hero-badge)::after,
html:not([data-effects='on']) .tilt::before,
html:not([data-effects='on']) .hero-spine__line::after {
  display: none !important;
}

/* Never leave text off-screen, cards tilted, or artwork displaced. Do not
   reset layout transforms (e.g. centered icons or the menu's open symbol). */
html:not([data-effects='on']) :is(
  .reveal, .split-word-inner, .route-entrance, .hero-word__in, .hero-line__in,
  .hero-badge, .hero-desc, .hero-actions, .hero-bottom
) {
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
}
html:not([data-effects='on']) :is(.tilt, .magnetic__inner, .parallax, .stage-frame, .stage-bob) {
  transform: none !important;
}
html:not([data-effects='on']) .scene {
  clip-path: none !important;
}
html:not([data-effects='on']) .hero-grad {
  background-position: 50% 50%;
}
html:not([data-effects='on']) .hero-serif::after {
  transform: scaleX(1);
}

/* Tailwind group-hover transforms also need the same opt-in. */
html:not([data-effects='on']) :is([class*='group-hover:scale-'], [class*='group-hover:translate-']) {
  transform: none !important;
  scale: none !important;
  translate: none !important;
}

/* A stopped ticker becomes a manually scrollable, single copy of its links. */
html:not([data-effects='on']) .marquee {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-mask-image: none;
  mask-image: none;
}
html:not([data-effects='on']) .marquee__track {
  transform: none !important;
}
html:not([data-effects='on']) .marquee__group[inert] {
  display: none;
}

/* Immediate browser-level safety while a media-query change is delivered to
   the shared JS policy. This also protects against a stalled/failed script. */
@media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse), (any-pointer: coarse) {
  html, *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
    will-change: auto !important;
  }
  .site-intro, .pointer-layer, .hero-spotlight, .theme-ripple, .trail {
    display: none !important;
  }
  .reveal, .split-word-inner {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}

```

## `src/components/modal.tsx`

```tsx
'use client';

import { useLayoutEffect, useRef, type KeyboardEventHandler, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { activateDialog } from '@/lib/dialog';
import { useHydrated } from '@/components/use-hydrated';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  initialFocusRef: RefObject<HTMLElement | null>;
  /** Keep this callback stable; it is evaluated when the modal closes. */
  returnFocus?: () => HTMLElement | null;
  children: ReactNode;
  className: string;
  label: string;
  id?: string;
  dismissOnBackdrop?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
};

/** Shared dialog semantics, focus containment, top-layer rendering and cleanup. */
export function Modal({
  open, onClose, initialFocusRef, returnFocus, children, className, label, id,
  dismissOnBackdrop = true, onKeyDown,
}: ModalProps) {
  const hydrated = useHydrated();
  const ref = useRef<HTMLDialogElement | null>(null);
  const backdropPress = useRef(false);

  useLayoutEffect(() => {
    if (!open || !hydrated || !ref.current) return;
    return activateDialog(ref.current, {
      initialFocus: initialFocusRef.current,
      returnFocus,
      onDismiss: onClose,
    });
  }, [open, hydrated, initialFocusRef, returnFocus, onClose]);

  if (!hydrated) return null;
  return createPortal(
    <dialog
      ref={ref}
      id={id}
      className={`modal-dialog ${className}`}
      aria-label={label}
      aria-modal="true"
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={(event) => {
        // A queued close from Strict Mode cleanup must not close a re-opened dialog.
        if (open && !event.currentTarget.open) onClose();
      }}
      onKeyDown={onKeyDown}
      onPointerDown={(event) => {
        backdropPress.current = event.target === event.currentTarget ||
          (event.target instanceof HTMLElement && event.target.hasAttribute('data-dialog-backdrop'));
      }}
      onClick={(event) => {
        const onBackdrop = event.target === event.currentTarget ||
          (event.target instanceof HTMLElement && event.target.hasAttribute('data-dialog-backdrop'));
        if (dismissOnBackdrop && backdropPress.current && onBackdrop && !event.defaultPrevented) onClose();
        backdropPress.current = false;
      }}
    >
      {open ? children : null}
    </dialog>,
    document.body,
  );
}

```

## `src/components/prestige/featured-drop.tsx`

```tsx
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { Modal } from '@/components/modal';
import { canFocus } from '@/lib/dialog';
import { useEffects } from '@/components/effects-provider';

export type DropItem = {
  slug: string;
  name: string;
  platform: string;
  summary: string;
  price: string;
  from: string;
  image: string | null;
};

/**
 * "Featured drop" — a shelf that rises from the bottom edge.
 *
 * Featured products live in a drawer, keeping the home hero compact while the
 * page itself can still scroll when its content needs more room. The shelf
 * scrolls horizontally (wheel, drag, keyboard arrows) and closes on Esc, the
 * close button or a backdrop click. Any element with `data-drop-trigger` opens
 * it, which lets the desktop rail and the phone peek-strip share one panel.
 */
export function FeaturedDrop({ items }: { items: DropItem[] }) {
  const { enabled } = useEffects();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const returnFocus = useCallback(() => {
    if (canFocus(opener.current)) return opener.current;
    return Array.from(document.querySelectorAll<HTMLElement>('[data-drop-trigger]')).find(canFocus) ?? null;
  }, []);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false, id: 0, captured: false });

  // Opening is delegated, so any trigger anywhere can pull the shelf up.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-drop-trigger]');
      if (!trigger) return;
      event.preventDefault();
      opener.current = trigger;
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const track = trackRef.current;
    if (!enabled && track) track.scrollTo({ left: track.scrollLeft, behavior: 'instant' });

    const onWheel = (event: WheelEvent) => {
      if (!track || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      // On a short screen let the panel scroll vertically to its real prices.
      const panel = panelRef.current;
      if (panel && panel.scrollHeight > panel.clientHeight) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      const atStart = track.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = track.scrollLeft >= max - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    };

    track?.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      track?.removeEventListener('wheel', onWheel);
    };
  }, [open, enabled]);

  const onShelfKey = (event: ReactKeyboardEvent<HTMLDialogElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      trackRef.current?.scrollBy({ left: event.key === 'ArrowRight' ? 320 : -320, behavior: enabled ? 'smooth' : 'instant' });
    }
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max <= 0 ? 1 : Math.min(1, Math.max(0, track.scrollLeft / max)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.pointerType === 'touch') return;
    drag.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: false, id: event.pointerId, captured: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const dx = event.clientX - drag.current.startX;

    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true;
      track.classList.add('is-dragging');
      // Capture only once a real drag has begun. Capturing on pointerdown
      // would retarget the following click away from the product link.
      try {
        track.setPointerCapture(event.pointerId);
        drag.current.captured = true;
      } catch {
        /* the pointer may already be gone – dragging still works without it */
      }
    }

    if (drag.current.moved) track.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track && drag.current.captured && event) {
      try {
        track.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
    drag.current.active = false;
    drag.current.captured = false;
    track?.classList.remove('is-dragging');
  };

  // A drag must never be mistaken for a click on a product link.
  const onClickCapture = (event: ReactMouseEvent) => {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  };

  const count = items.length;

  return (
    <Modal
      open={open}
      onClose={close}
      initialFocusRef={closeRef}
      returnFocus={returnFocus}
      className="drop"
      label="Featured drop"
      onKeyDown={onShelfKey}
    >
      <div className="drop__backdrop" data-dialog-backdrop aria-hidden="true" />
          <div className="drop__panel" ref={panelRef}>
            <div className="drop__head">
              <div>
                <span className="eyebrow">Featured drop · {String(count).padStart(2, '0')} builds</span>
                <h2 className="drop__title">This week&apos;s picks</h2>
                <p className="drop__sub">
                  Hand-picked from the catalog. Add one to your shortlist, or open it for every duration
                  and price.
                </p>
              </div>
              <button ref={closeRef} type="button" className="drop__close" onClick={close} aria-label="Close featured drop">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="drop__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${Math.max(0.06, progress)})` }} />
            </div>

            <div
              className="drop__track"
              ref={trackRef}
              onScroll={onScroll}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onClickCapture={onClickCapture}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              tabIndex={0}
              aria-label="Featured products, scroll horizontally"
            >
              {items.map((item, index) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="drop__card">
                  <span className="drop__index font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="drop__art">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="drop__art-fallback">{item.name.slice(0, 3)}</span>
                    )}
                    <span className="drop__art-glow" aria-hidden="true" />
                  </span>
                  <span className="drop__platform">{item.platform}</span>
                  <span className="drop__name">{item.name}</span>
                  <span className="drop__summary">{item.summary}</span>
                  <span className="drop__foot">
                    <span>
                      <span className="drop__from">{item.from}</span>
                      <span className="drop__price font-mono">{item.price}</span>
                    </span>
                    <span className="drop__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </Link>
              ))}
              <Link href="/products" className="drop__card drop__card--all">
                <span className="drop__all-mark serif-accent">全</span>
                <span className="drop__all-title">The full catalog</span>
                <span className="drop__all-sub">Every product, every duration, every price.</span>
                <span className="drop__all-link">
                  Browse all
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>

            <p className="drop__hint">
              <span aria-hidden="true">← →</span> or drag to explore · Esc to close
            </p>
          </div>
    </Modal>
  );
}

```

## `src/components/prestige/product-gallery.tsx`

```tsx
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from 'react';
import { Modal } from '@/components/modal';
import { useHydrated } from '@/components/use-hydrated';
import { useEffects } from '@/components/effects-provider';

export type GalleryImage = {
  src: string;
  alt: string;
  /** 'logo' keeps the padding tight, 'artwork' shows the full frame. */
  kind?: 'logo' | 'artwork';
};

/**
 * The product stage: a lit exhibition frame around the product artwork.
 *
 *  - the light follows the pointer across the frame (screen-blended sheen),
 *  - corner brackets, a catalogue number and a scanline shimmer make it feel
 *    mounted rather than dropped on the page,
 *  - clicking the frame opens a full-screen viewer (Esc closes, ← → move
 *    between real images, focus returns to the trigger afterwards),
 *  - thumbnails only appear when a product really has more than one asset, so
 *    nothing is invented for products with a single image.
 *
 * `first` is the server-rendered composite (ProductVisual) so the default view
 * keeps every product-specific detail — the viewer and thumbnails use the real
 * files returned by getProductImages().
 */
export function ProductGallery({
  images,
  first,
  name,
  label,
  badges,
}: {
  images: GalleryImage[];
  first: ReactNode;
  name: string;
  label?: string;
  badges?: ReactNode;
}) {
  const hydrated = useHydrated();
  const { enabled } = useEffects();
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const frameRef = useRef<HTMLButtonElement | null>(null);
  const frameBox = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const thumbs = images.length > 1 ? images : [];
  const returnFocus = useCallback(() => frameRef.current, []);

  // The light inside the frame follows the pointer. Two CSS variables, no
  // layout work. The shared policy also handles touch and live changes.
  useEffect(() => {
    if (!enabled) return;
    const node = frameBox.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--gx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      node.style.setProperty('--gy', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };

    node.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.style.removeProperty('--gx');
      node.style.removeProperty('--gy');
    };
  }, [enabled]);

  const openViewer = useCallback((index: number) => {
    setLightboxIndex(index);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const step = useCallback(
    (direction: number) => {
      setLightboxIndex((current) => {
        if (images.length === 0) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  const onViewerKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  };

  const pick = (index: number) => {
    setView(index);
    setLightboxIndex(index);
  };

  const alternate = view > 0 ? images[view - 1] : null;
  const current = images[lightboxIndex] ?? images[0];

  return (
    <div className="gallery">
      <div className="gallery__frame panel" ref={frameBox}>
        <span className="gallery__brackets" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="gallery__scan" aria-hidden="true" />
        <span className="gallery__glow" aria-hidden="true" />
        <span className="gallery__index font-mono" aria-hidden="true">
          {label ?? 'PRODUCT'} · 01
        </span>

        <button
          ref={frameRef}
          type="button"
          onClick={() => openViewer(view)}
          disabled={!hydrated}
          className="gallery__stage"
          aria-label={`Open ${name} artwork full screen`}
          data-cursor="view"
        >
          {alternate ? (
            <span className="gallery__alt">
              <Image
                key={alternate.src}
                src={alternate.src}
                alt={alternate.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={alternate.kind === 'artwork' ? 'object-contain p-3' : 'object-contain p-10'}
              />
            </span>
          ) : (
            first
          )}

          <span className="gallery__zoom" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <circle cx="9" cy="9" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 6.6v4.8M6.6 9h4.8M13.3 13.3 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Expand</span>
          </span>
        </button>

        {badges ? <div className="gallery__badges">{badges}</div> : null}
      </div>

      {thumbs.length > 0 ? (
        <div className="gallery__thumbs" role="tablist" aria-label={`${name} artwork views`}>
          {thumbs.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              role="tab"
              aria-selected={view === index}
              onClick={() => pick(index)}
              disabled={!hydrated}
              className="gallery__thumb"
              data-active={view === index ? 'true' : 'false'}
            >
              <span className="gallery__thumb-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="gallery__thumb-label">
                {image.kind === 'artwork' ? 'Artwork' : 'Emblem'}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <Modal
        open={open && !!current}
        onClose={close}
        initialFocusRef={closeRef}
        returnFocus={returnFocus}
        className="lightbox"
        label={`${name} artwork`}
        onKeyDown={onViewerKey}
      >
        <div className="lightbox__backdrop" data-dialog-backdrop aria-hidden="true" />
          <div className="lightbox__panel">
            <div className="lightbox__bar">
              <span className="lightbox__cap">
                <span className="lightbox__dot" aria-hidden="true" />
                {name}
              </span>
              <span className="lightbox__count font-mono">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <button ref={closeRef} type="button" onClick={close} className="lightbox__close" aria-label="Close">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="lightbox__stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {current ? <img key={current.src} src={current.src} alt={current.alt} className="lightbox__img" /> : null}
            </div>

            {images.length > 1 ? (
              <div className="lightbox__foot">
                <button type="button" className="lightbox__arrow" onClick={() => step(-1)} aria-label="Previous image">
                  ←
                </button>
                <div className="lightbox__dots">
                  {images.map((image, index) => (
                    <button
                      key={`${image.src}-${index}`}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Image ${index + 1}`}
                      aria-current={index === lightboxIndex}
                      className="lightbox__dotbtn"
                    />
                  ))}
                </div>
                <button type="button" className="lightbox__arrow" onClick={() => step(1)} aria-label="Next image">
                  →
                </button>
              </div>
            ) : (
              <p className="lightbox__hint">Press Esc or click outside the artwork to close</p>
            )}
          </div>
      </Modal>
    </div>
  );
}

```

## `src/components/prestige/scroll-lock.ts`

```ts
/** A shared, reference-counted scroll lock for all modal interfaces. */
type LenisLike = { stop: () => void; start: () => void; isStopped?: boolean };

function lenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

let locks = 0;
let restore: (() => void) | undefined;

/** Each owner receives an idempotent release function; the last owner restores. */
export function lockScroll(): () => void {
  if (locks === 0) {
    const root = document.documentElement;
    const body = document.body;
    const overflow = body.style.overflow;
    const overscroll = body.style.overscrollBehavior;
    const alreadyLocked = root.classList.contains('scroll-locked');
    const scroller = lenis();
    const wasStopped = scroller?.isStopped === true;

    root.classList.add('scroll-locked');
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    scroller?.stop();

    restore = () => {
      if (!alreadyLocked) root.classList.remove('scroll-locked');
      body.style.overflow = overflow;
      body.style.overscrollBehavior = overscroll;
      const current = lenis();
      // Preferences can replace/destroy Lenis while a dialog is open. Resume
      // the current instance, unless it was already stopped for another reason.
      if (!alreadyLocked && (current !== scroller || !wasStopped)) current?.start();
    };
  }
  locks += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks !== 0) return;
    restore?.();
    restore = undefined;
  };
}

```

## `src/components/purchase-form.tsx`

```tsx
'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type Lenis from 'lenis';
import { useRouter } from 'next/navigation';
import type { Product } from '@/data/products';
import { PAYMENT_METHODS } from '@/data/store';
import { formatPriceOption } from '@/lib/format';
import { getPaymentOptions, selectPaymentOption } from '@/lib/purchase';
import { PURCHASE_FIELD_ORDER, SENDER_NUMBER_MAX_LENGTH, TRANSACTION_ID_MAX_LENGTH, validatePurchaseDetails, type PurchaseErrors, type PurchaseField } from '@/lib/purchase-validation';
import { CopyButton } from '@/components/copy-button';
import { useOrderContext } from '@/components/order-context';
import { usePurchaseSelection } from '@/components/purchase-selection';
import { useHydrated } from '@/components/use-hydrated';

export function PurchaseForm({ product }: { product: Product }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const { setOrder } = useOrderContext();
  const { duration, setDuration } = usePurchaseSelection();
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState<string>(PAYMENT_METHODS[0]?.id ?? '');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<PurchaseErrors>({});
  const [attempt, setAttempt] = useState(0);
  const focusTarget = useRef<PurchaseField | 'summary' | null>(null);
  const errorSummary = useRef<HTMLParagraphElement | null>(null);
  const preparing = useRef(false);
  const [busy, setBusy] = useState(false);

  const price = useMemo(
    () => product.prices.find((item) => item.duration === duration),
    [duration, product.prices],
  );
  const paymentOptions = useMemo(() => getPaymentOptions(price), [price]);
  const selectedPayment = selectPaymentOption(paymentOptions, preferredPaymentMethod);
  const payment = selectedPayment?.method;
  const paymentMethod = payment?.id ?? '';
  const needsSenderNumber = !!payment && payment.id !== 'binance';
  const paymentHelpId = `payment-help-${product.slug}`;

  const clearError = useCallback((field: PurchaseField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  // A changed duration/method must not leave an irrelevant error behind.
  useEffect(() => {
    clearError('duration');
    clearError('payment');
    if (!needsSenderNumber) clearError('sender');
  }, [duration, paymentMethod, needsSenderNumber, clearError]);

  useLayoutEffect(() => {
    const field = focusTarget.current;
    focusTarget.current = null;
    if (!field) return;
    const input = field === 'summary' ? null : document.getElementById(`${field}-${product.slug}`);
    const target = input && !input.matches(':disabled') ? input : errorSummary.current;
    if (!target) return;
    target.focus({ preventScroll: true });
    const scrollTarget = target.closest<HTMLElement>('[data-purchase-field]') ?? target;
    const top = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 72) + 16;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(scrollTarget, { immediate: true, offset: -top });
    else window.scrollTo({ top: window.scrollY + scrollTarget.getBoundingClientRect().top - top, behavior: 'instant' });
  }, [attempt, product.slug]);

  const fieldError = (field: PurchaseField) => errors[field] ? (
    <p id={`${field}-error-${product.slug}`} className="field-error">Error: {errors[field]}</p>
  ) : null;

  const prepareSummary = (event: FormEvent<HTMLFormElement>) => {
    // This form is local only: never allow a browser request with payment data.
    event.preventDefault();
    if (!hydrated || preparing.current) return;
    setFormError('');
    const nextErrors = validatePurchaseDetails({
      duration: price?.duration,
      paymentMethod: selectedPayment?.method.id,
      senderNumber,
      transactionId,
    });
    setErrors(nextErrors);
    const firstError = PURCHASE_FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstError) {
      focusTarget.current = firstError;
      setAttempt((count) => count + 1);
      return;
    }
    // Defensive guard; valid real options always reach this point together.
    if (!price || !payment || !selectedPayment) return;
    preparing.current = true;
    setBusy(true);
    try {
      const reference = `ABN-${Date.now().toString(36).toUpperCase()}`;
      setOrder({
        reference,
        productSlug: product.slug,
        productName: product.name,
        platform: product.platform,
        duration: price.duration,
        priceLabel: selectedPayment.amountLabel,
        paymentMethod: payment.id,
        paymentDestination: payment.value,
        senderNumber: needsSenderNumber ? senderNumber.trim() : '',
        transactionId: transactionId.trim(),
      });
      router.push('/order-confirmation');
    } catch {
      setFormError('Could not prepare the payment summary. Please try again.');
      setBusy(false);
      preparing.current = false;
      focusTarget.current = 'summary';
      setAttempt((count) => count + 1);
    }
  };

  return (
    <form className="panel overflow-hidden" onSubmit={prepareSummary} noValidate aria-labelledby={`purchase-title-${product.slug}`}>
      <div className="border-b border-ink-700/70 bg-ink-900/45 p-5 sm:p-6">
        <span className="eyebrow">Manual payment · no account required</span>
        <h3 id={`purchase-title-${product.slug}`} className="mt-2 font-display text-2xl text-bone-50">Prepare your payment summary</h3>
        <p className="mt-2 text-sm leading-relaxed text-bone-400">
          Before paying, confirm the product, duration, amount and payment method with support. After you pay, enter the details below to prepare a copyable summary. No login is needed, and nothing is sent to support by this website.
        </p>
        <noscript>
          <p className="panel-quiet mt-4 p-4 text-sm leading-relaxed text-bone-100">
            JavaScript is off, so this page cannot prepare a summary. Read the full
            duration and price list above, then use the support links below to confirm
            your choice before paying. After payment, send your product, duration,
            payment method, amount, transaction ID and receipt directly to support.
            You can select the displayed account number to copy it manually.
          </p>
        </noscript>
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        {formError || Object.keys(errors).length > 0 ? (
          <p ref={errorSummary} tabIndex={-1} role="alert" className="rounded-xl border border-crimson-700/70 bg-crimson-950/50 p-3 text-sm leading-relaxed text-crimson-200">
            {formError || 'Your summary has not been prepared. Please check the highlighted details below.'}
          </p>
        ) : null}
        <div data-purchase-field="duration">
          <label htmlFor={`duration-${product.slug}`} className="field-label">Choose duration</label>
          <select disabled={!hydrated} id={`duration-${product.slug}`} value={duration} onChange={(event) => setDuration(event.target.value)} className="field mt-2 w-full" required aria-invalid={!!errors.duration} aria-describedby={errors.duration ? `duration-error-${product.slug}` : undefined}>
            {product.prices.map((item) => (
              <option key={item.duration} value={item.duration}>{item.duration} — {formatPriceOption(item)}</option>
            ))}
          </select>
          {fieldError('duration')}
        </div>

        {price ? (
          <div
            id={`duration-summary-${product.slug}`}
            tabIndex={-1}
            className="panel-quiet flex flex-wrap items-center justify-between gap-2 p-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-sm text-bone-300">Total for {price.duration}</span>
            <strong className="font-mono text-lg text-bone-50">{formatPriceOption(price)}</strong>
          </div>
        ) : null}

        <div data-purchase-field="payment">
          <label htmlFor={`payment-${product.slug}`} className="field-label">Payment method</label>
          <select
            id={`payment-${product.slug}`}
            value={paymentMethod}
            onChange={(event) => setPreferredPaymentMethod(event.target.value)}
            className="field mt-2 w-full"
            aria-invalid={!!errors.payment}
            aria-describedby={[paymentHelpId, errors.payment ? `payment-error-${product.slug}` : ''].filter(Boolean).join(' ')}
            required
            disabled={!hydrated || paymentOptions.length === 0}
          >
            {paymentOptions.length === 0 ? <option value="">Confirm with support</option> : null}
            {paymentOptions.map((option) => (
              <option key={option.method.id} value={option.method.id}>
                {option.method.name} — {option.amountLabel}
              </option>
            ))}
          </select>
          {fieldError('payment')}
          <p id={paymentHelpId} className="mt-2 text-xs leading-relaxed text-bone-400">
            Only methods with a listed amount for this duration are shown. For another currency,
            confirm the amount with support before paying. No automatic conversion is used.
          </p>
        </div>

        {payment && selectedPayment ? (
          <div className="panel-quiet p-4 sm:p-5">
            <p className="text-sm text-bone-300" aria-live="polite" aria-atomic="true">
              Amount for {payment.name}:{' '}
              <strong className="font-mono text-lg text-bone-50">{selectedPayment.amountLabel}</strong>
            </p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="eyebrow">Send payment to</span>
                <h4 className="mt-2 font-display text-lg text-bone-50">{payment.name}{payment.kind ? ` · ${payment.kind}` : ''}</h4>
                <p className="mt-1 break-all font-mono text-base text-bone-100">{payment.value}</p>
              </div>
              <CopyButton value={payment.value} label="Copy account" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-bone-400">
              Confirm this product, duration and amount with support before sending payment.
              Never share a PIN, OTP, password or wallet private key.
            </p>
          </div>
        ) : (
          <p className="panel-quiet p-4 text-sm leading-relaxed text-bone-300">
            No payment method has a listed amount for this duration. Please contact support before paying.
          </p>
        )}

        {needsSenderNumber ? (
          <div data-purchase-field="sender">
            <label htmlFor={`sender-${product.slug}`} className="field-label">Your payment phone number</label>
            <input
              disabled={!hydrated}
              id={`sender-${product.slug}`}
              value={senderNumber}
              onChange={(event) => { setSenderNumber(event.target.value); clearError('sender'); }}
              className="field mt-2 w-full"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Number you sent the payment from"
              required
              maxLength={SENDER_NUMBER_MAX_LENGTH}
              aria-invalid={!!errors.sender}
              aria-describedby={[`sender-help-${product.slug}`, errors.sender ? `sender-error-${product.slug}` : ''].filter(Boolean).join(' ')}
            />
            {fieldError('sender')}
            <p id={`sender-help-${product.slug}`} className="mt-1.5 text-xs text-bone-400">Use the number that sent the bKash/Nagad transfer, not the recipient account shown above.</p>
          </div>
        ) : payment ? (
          <div className="panel-quiet p-4 text-sm leading-relaxed text-bone-300">For Binance, only the transaction number/ID is required. No phone number is needed.</div>
        ) : null}

        <div data-purchase-field="transaction">
          <label htmlFor={`transaction-${product.slug}`} className="field-label">{paymentMethod === 'binance' ? 'Binance transaction number / ID' : 'Transaction ID'}</label>
          <input
            id={`transaction-${product.slug}`}
            value={transactionId}
            onChange={(event) => { setTransactionId(event.target.value); clearError('transaction'); }}
            className="field mt-2 w-full"
            autoComplete="off"
            placeholder="Copy it exactly from your receipt"
            required
            maxLength={TRANSACTION_ID_MAX_LENGTH}
            disabled={!hydrated || !payment}
            aria-invalid={!!errors.transaction}
            aria-describedby={[`transaction-help-${product.slug}`, errors.transaction ? `transaction-error-${product.slug}` : ''].filter(Boolean).join(' ')}
          />
          {fieldError('transaction')}
          <p id={`transaction-help-${product.slug}`} className="mt-1.5 text-xs text-bone-400">Enter the transaction reference only. Never enter a PIN or OTP.</p>
        </div>

        <button type="submit" disabled={!hydrated || busy || !selectedPayment} className="btn btn-primary w-full justify-center">{busy ? 'Preparing summary…' : 'Prepare summary & continue'}</button>
        <p className="text-xs leading-relaxed text-bone-500">Next, copy your summary and send it yourself through WhatsApp, Telegram or Discord with your payment screenshot. Preparing a summary does not submit an order or verify a payment. Staff verify the proof you send before delivery.</p>
      </div>
    </form>
  );
}

```

## `src/components/site-header.tsx`

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV_LINKS, CATALOG_HREF, STORE_NAME, STORE_NAME_KANJI } from '@/data/store';
import { canFocus } from '@/lib/dialog';
import { Logo } from '@/components/logo';
import { Modal } from '@/components/modal';
import { ArrowIcon } from '@/components/ui';
import { Magnetic } from '@/components/prestige/magnetic';
import { StoreClock } from '@/components/prestige/clock';
import { useHydrated } from '@/components/use-hydrated';

export function SiteHeader({ productCount }: { productCount: number }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const returnFocus = useCallback(() => canFocus(toggleRef.current) ? toggleRef.current : logoRef.current, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(close, [pathname, close]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const previous = root.style.getPropertyValue('--site-header-height');
    const measure = () => {
      root.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
      // Follow the actual CSS layout, including enlarged text/container queries,
      // rather than assuming a viewport breakpoint is always enough room.
      if (toggleRef.current && getComputedStyle(toggleRef.current).display === 'none') close();
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(header);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      if (previous) root.style.setProperty('--site-header-height', previous);
      else root.style.removeProperty('--site-header-height');
    };
  }, [close]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const closeForNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // This also handles clicking the current route, which does not change pathname.
    close();
  };

  return (
    <>
      <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50" data-menu={open ? 'open' : 'closed'}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-crimson-600/70 to-transparent" />
        <div
          className={`site-header__bar transition-all duration-500 ${
            scrolled
              ? 'border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-xl shadow-[0_18px_50px_-35px_rgba(0,0,0,1)]'
              : 'border-b border-transparent bg-gradient-to-b from-ink-950/90 to-transparent'
          }`}
        >
          <div className="shell header-inner">
            <Link ref={logoRef} href="/" aria-label={`${STORE_NAME} — home`} className="header-brand logo-link group flex items-center transition-opacity hover:opacity-100">
              <Logo />
            </Link>

            <nav aria-label="Main navigation" className="header-nav">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined} className="nav-link" data-active={active ? 'true' : 'false'}>
                    <span className="nav-link__dot" aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="header-actions">
              <span className="header-clock"><StoreClock /></span>
              <span className="chip chip-live font-mono">
                <span className="chip-live__dot" aria-hidden="true" />
                {productCount} live
              </span>
              <Magnetic strength={5}>
                <Link href={CATALOG_HREF} className="btn btn-primary btn-browse !px-4 !py-2.5 !text-[0.8rem]">
                  Browse all products
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              disabled={!hydrated}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls={hydrated ? 'mobile-navigation' : undefined}
              aria-label="Open menu"
              className="menu-toggle btn btn-ghost"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between" aria-hidden="true">
                <span className="h-[2px] w-full rounded bg-current" />
                <span className="h-[2px] w-full rounded bg-current" />
                <span className="h-[2px] w-full rounded bg-current" />
              </span>
            </button>

            <noscript>
              <details className="no-js-navigation">
                <summary>Menu</summary>
                <nav aria-label="Navigation without JavaScript">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                      {link.label}
                    </Link>
                  ))}
                  <Link href={CATALOG_HREF}>Browse all {productCount} products</Link>
                </nav>
              </details>
            </noscript>
          </div>
        </div>
      </header>

      <Modal
        id="mobile-navigation"
        open={open}
        onClose={close}
        initialFocusRef={closeRef}
        returnFocus={returnFocus}
        className="mobile-nav"
        label="Site menu"
        dismissOnBackdrop={false}
      >
        {/* An equivalent header inside the modal keeps its close button operable;
            the real page header is inert while the dialog is open. */}
        <div className="mobile-nav__header">
          <div className="shell header-inner">
            <Link href="/" onClick={closeForNavigation} aria-label={`${STORE_NAME} — home`} className="header-brand logo-link group flex items-center">
              <Logo />
            </Link>
            <button ref={closeRef} type="button" onClick={close} className="menu-toggle menu-toggle--close btn btn-ghost" aria-label="Close menu">
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="shell mobile-nav__content">
          {NAV_LINKS.map((link, index) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeForNavigation}
                aria-current={active ? 'page' : undefined}
                className="mobile-nav__link"
                data-active={active ? 'true' : 'false'}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <span className="mobile-nav__index font-mono">{String(index + 1).padStart(2, '0')}</span>
                <span className="mobile-nav__label">{link.label}</span>
                <ArrowIcon className="mobile-nav__arrow h-5 w-5" />
              </Link>
            );
          })}
          <Link href={CATALOG_HREF} onClick={closeForNavigation} className="btn btn-primary mt-6 !py-4">
            Browse all {productCount} products
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <div className="mobile-nav__foot">
            <StoreClock />
            <span className="font-mono">{STORE_NAME_KANJI} · ABNORMAL</span>
          </div>
        </nav>
      </Modal>
    </>
  );
}

```

## `src/lib/dialog.ts`

```ts
import { lockScroll } from '@/components/prestige/scroll-lock';

const stack: HTMLDialogElement[] = [];
const isolated = new Map<HTMLElement, { count: number; inert: boolean; hidden: string | null }>();

/** A resized-away or unmounted trigger must never receive restored focus. */
export function canFocus(element: HTMLElement | null): element is HTMLElement {
  if (!element?.isConnected || element.matches(':disabled') || element.closest('[inert]')) return false;
  const style = getComputedStyle(element);
  return element.getClientRects().length > 0 && style.visibility !== 'hidden' && style.visibility !== 'collapse';
}

function focusable(dialog: HTMLDialogElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]',
  )).filter((element) => element.tabIndex >= 0 && canFocus(element));
}

/** Fallback isolation for browsers without showModal; native dialogs do this. */
function isolateBackground(dialog: HTMLDialogElement): () => void {
  const siblings = Array.from(document.body.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement && element !== dialog,
  );
  for (const element of siblings) {
    const previous = isolated.get(element);
    if (previous) previous.count += 1;
    else {
      isolated.set(element, { count: 1, inert: element.inert, hidden: element.getAttribute('aria-hidden') });
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    }
  }
  return () => {
    for (const element of siblings) {
      const previous = isolated.get(element);
      if (!previous || --previous.count > 0) continue;
      element.inert = previous.inert;
      if (previous.hidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', previous.hidden);
      isolated.delete(element);
    }
  };
}

/** Activate one modal and return all focus, isolation and scroll cleanup. */
export function activateDialog(
  dialog: HTMLDialogElement,
  {
    initialFocus,
    returnFocus,
    onDismiss,
  }: {
    initialFocus: HTMLElement | null;
    returnFocus?: () => HTMLElement | null;
    onDismiss: () => void;
  },
): () => void {
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const releaseScroll = lockScroll();
  const native = typeof dialog.showModal === 'function';
  stack.push(dialog);
  let releaseBackground: (() => void) | undefined;

  const focusInside = () => {
    const target = canFocus(initialFocus) ? initialFocus : focusable(dialog)[0] ?? dialog;
    target.focus({ preventScroll: true });
  };
  if (native) dialog.showModal();
  else {
    dialog.setAttribute('open', '');
    // Move focus before aria-hiding the trigger's ancestors.
    focusInside();
    releaseBackground = isolateBackground(dialog);
  }
  focusInside();

  const onKey = (event: KeyboardEvent) => {
    if (stack.at(-1) !== dialog || event.defaultPrevented) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
    } else if (event.key === 'Tab') {
      const items = focusable(dialog);
      const first = items[0];
      const last = items.at(-1);
      const active = document.activeElement;
      if (!first) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
      } else if (event.shiftKey && (active === first || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (active === last || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  const onFocus = (event: FocusEvent) => {
    if (stack.at(-1) === dialog && event.target instanceof Node && !dialog.contains(event.target)) focusInside();
  };
  dialog.addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocus);
  let released = false;

  return () => {
    if (released) return;
    released = true;
    const wasTop = stack.at(-1) === dialog;
    stack.splice(stack.indexOf(dialog), 1);
    dialog.removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', onFocus);
    if (native && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    releaseBackground?.();
    releaseScroll();
    if (wasTop) {
      const target = returnFocus ? returnFocus() : previousFocus;
      if (canFocus(target)) target.focus({ preventScroll: true });
    }
  };
}

```

## `src/lib/purchase-validation.ts`

```ts
import { PAYMENT_METHODS } from '@/data/store';

export const SENDER_NUMBER_MAX_LENGTH = 32;
export const TRANSACTION_ID_MAX_LENGTH = 120;
export const PURCHASE_FIELD_ORDER = ['duration', 'payment', 'sender', 'transaction'] as const;
export type PurchaseField = (typeof PURCHASE_FIELD_ORDER)[number];
export type PurchaseErrors = Partial<Record<PurchaseField, string>>;

type PurchaseInput = {
  duration: string | undefined;
  paymentMethod: string | undefined;
  senderNumber: string;
  transactionId: string;
};

/** Basic format checking only: this cannot verify an account or a payment. */
export function isValidSenderNumber(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length > SENDER_NUMBER_MAX_LENGTH || !/^\+?[0-9][0-9 -]*[0-9]$/.test(trimmed)) return false;
  const digits = trimmed.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Independent, field-specific errors; never changes prices or payment options. */
export function validatePurchaseDetails(input: PurchaseInput): PurchaseErrors {
  const errors: PurchaseErrors = {};
  if (!input.duration?.trim()) errors.duration = 'Choose a listed duration, or contact support if none is available.';
  if (!PAYMENT_METHODS.some((method) => method.id === input.paymentMethod)) {
    errors.payment = 'Choose a payment method with a listed amount. Otherwise, confirm with support before paying.';
  }
  if (input.paymentMethod === 'bkash' || input.paymentMethod === 'nagad') {
    if (!isValidSenderNumber(input.senderNumber)) {
      errors.sender = 'Enter 7–15 digits. A leading +, spaces and hyphens are allowed.';
    }
  }
  const transaction = input.transactionId.trim();
  if (!transaction) errors.transaction = 'Enter the transaction ID/number from your payment receipt.';
  else if (transaction.length > TRANSACTION_ID_MAX_LENGTH || /[\u0000-\u001f\u007f]/.test(transaction)) {
    errors.transaction = 'Use a single-line transaction ID of 120 characters or fewer.';
  }
  return errors;
}

```

## `tests/purchase-validation.test.ts`

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isValidSenderNumber, validatePurchaseDetails } from '../src/lib/purchase-validation.ts';

const valid = { duration: '10 Days', paymentMethod: 'bkash', senderNumber: '+880 1700-000000', transactionId: 'TEST-ONLY-123' };

describe('local payment-summary validation', () => {
  it('accepts a formatted or plain sender number without changing the input', () => {
    for (const senderNumber of ['01700000000', '+8801700000000', ' +880 1700-000000 ']) {
      assert.equal(isValidSenderNumber(senderNumber), true);
      const input = { ...valid, senderNumber };
      const original = { ...input };
      assert.deepEqual(validatePurchaseDetails(input), {});
      assert.deepEqual(input, original);
    }
  });

  it('rejects the previously accepted punctuation-only phone value', () => {
    for (const senderNumber of ['+------', '-------', '       ', '']) {
      assert.ok(validatePurchaseDetails({ ...valid, senderNumber }).sender);
    }
  });

  it('counts digits rather than separators or total characters', () => {
    assert.equal(isValidSenderNumber('1 - 2 - 3 - 4 - 5 - 6'), false);
    assert.equal(isValidSenderNumber('1234567'), true);
    assert.equal(isValidSenderNumber('+123456789012345'), true);
    assert.equal(isValidSenderNumber('+1234567890123456'), false);
  });

  it('rejects letters, misplaced plus signs, controls and excessive raw length', () => {
    for (const senderNumber of ['abc1234567', '123+456789', '++8801700000000', '123\t456789', '123\n456789', `1${' '.repeat(40)}234567`]) {
      assert.equal(isValidSenderNumber(senderNumber), false);
    }
  });

  it('requires a sender number for Nagad as well as bKash', () => {
    assert.ok(validatePurchaseDetails({ ...valid, paymentMethod: 'nagad', senderNumber: '' }).sender);
  });

  it('does not require or validate a sender phone number for Binance', () => {
    assert.deepEqual(validatePurchaseDetails({ ...valid, paymentMethod: 'binance', senderNumber: '+------' }), {});
  });

  it('rejects a missing or whitespace-only receipt reference', () => {
    for (const transactionId of ['', '  ', '\n\t ']) assert.ok(validatePurchaseDetails({ ...valid, transactionId }).transaction);
  });

  it('allows real-world receipt punctuation and text without inventing a provider format', () => {
    for (const transactionId of ['TX-123_ABC', 'Receipt 123/ABC', 'ট্রানজ্যাকশন-123', 'a'.repeat(120)]) {
      assert.deepEqual(validatePurchaseDetails({ ...valid, transactionId }), {});
    }
  });

  it('rejects oversized or multi-line references', () => {
    for (const transactionId of ['a'.repeat(121), 'ABC\nDEF', 'ABC\rDEF', 'ABC\u0000DEF']) {
      assert.ok(validatePurchaseDetails({ ...valid, transactionId }).transaction);
    }
  });

  it('reports an unavailable duration or payment method before preparing anything', () => {
    const errors = validatePurchaseDetails({ ...valid, duration: undefined, paymentMethod: 'unknown' });
    assert.ok(errors.duration);
    assert.ok(errors.payment);
  });

  it('returns all applicable field errors so a submit can explain and focus them', () => {
    const errors = validatePurchaseDetails({ ...valid, duration: '', senderNumber: '+------', transactionId: '' });
    assert.deepEqual(Object.keys(errors), ['duration', 'sender', 'transaction']);
  });
});

```

## `tests/scroll-lock.test.ts`

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { lockScroll } from '../src/components/prestige/scroll-lock.ts';

function environment({ locked = false, stopped = false } = {}) {
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const classes = new Set(locked ? ['scroll-locked'] : []);
  const style = { overflow: 'auto', overscrollBehavior: 'contain' };
  const calls = { start: 0, stop: 0 };
  const scroller = { isStopped: stopped, start() { calls.start += 1; }, stop() { calls.stop += 1; } };
  const win: { __lenis?: typeof scroller } = { __lenis: scroller };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: win });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    body: { style },
    documentElement: { classList: { contains: (s: string) => classes.has(s), add: (s: string) => classes.add(s), remove: (s: string) => classes.delete(s) } },
  } });
  return {
    classes, style, calls, win,
    restore() {
      if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow);
      else Reflect.deleteProperty(globalThis, 'window');
      if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument);
      else Reflect.deleteProperty(globalThis, 'document');
    },
  };
}

describe('shared modal scroll locks', () => {
  it('restores the existing inline styles and resumes scrolling', () => {
    const env = environment();
    try {
      const release = lockScroll();
      assert.ok(env.classes.has('scroll-locked'));
      assert.equal(env.style.overflow, 'hidden');
      assert.equal(env.calls.stop, 1);
      release();
      assert.deepEqual(env.style, { overflow: 'auto', overscrollBehavior: 'contain' });
      assert.equal(env.classes.has('scroll-locked'), false);
      assert.equal(env.calls.start, 1);
    } finally { env.restore(); }
  });

  it('only the last owner restores scrolling, regardless of release order', () => {
    const env = environment();
    try {
      const first = lockScroll();
      const second = lockScroll();
      first();
      first();
      assert.equal(env.style.overflow, 'hidden');
      assert.equal(env.calls.start, 0);
      second();
      second();
      assert.equal(env.calls.start, 1);
      assert.equal(env.style.overflow, 'auto');
    } finally { env.restore(); }
  });

  it('does not restart a scroller that was already stopped', () => {
    const env = environment({ stopped: true });
    try { lockScroll()(); assert.equal(env.calls.start, 0); }
    finally { env.restore(); }
  });

  it('does not remove a pre-existing root lock', () => {
    const env = environment({ locked: true });
    try {
      lockScroll()();
      assert.equal(env.classes.has('scroll-locked'), true);
      assert.equal(env.calls.start, 0);
    } finally { env.restore(); }
  });

  it('supports a scroller being removed or replaced by a preference change', () => {
    const env = environment();
    try {
      const release = lockScroll();
      delete env.win.__lenis;
      release();
      const nextRelease = lockScroll();
      let resumed = false;
      env.win.__lenis = { isStopped: true, stop() {}, start() { resumed = true; } };
      nextRelease();
      assert.equal(resumed, true);
    } finally { env.restore(); }
  });
});

```

# Browser verification probe (reference)

This is an audit-only script, not an app dependency. It was run from an external installation in `/home/user/.cache/abn-audit` containing `playwright-core`, `@sparticuz/chromium` and `@axe-core/playwright`. Its four groups are `header`, `form`, `dialogs` and `regression`. Runtime logs/screenshots were reviewed in `/home/user/abn-batch-3-work`; the final machine-readable results are preserved in the companion repository JSON.

```bash
node --import /home/user/ABNORMAL-ABN/tests/lib/aliases.mjs batch-three-browser.mjs header
```

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import chromium, { inflate, setupLambdaEnvironment } from './node_modules/@sparticuz/chromium/build/index.js';
import { chromium as playwright } from './node_modules/playwright-core/index.mjs';
import AxeBuilder from './node_modules/@axe-core/playwright/dist/index.mjs';
import { PRODUCTS } from '/home/user/ABNORMAL-ABN/src/data/products.ts';
import { getPaymentOptions } from '/home/user/ABNORMAL-ABN/src/lib/purchase.ts';

await inflate(path.resolve('node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
setupLambdaEnvironment('/tmp/al2023/lib');
const browser = await playwright.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args.filter(arg => !['--disable-web-security', '--allow-running-insecure-content', '--single-process'].includes(arg)),
  headless: true,
});
const group = process.argv[2];
const dir = '/home/user/abn-batch-3-work';
const root = 'http://127.0.0.1:3000';
const report = { group, browser: browser.version(), runs: [], errors: [], consoleErrors: [], externalRequests: [], nonReadRequests: [] };
const save = () => fs.writeFileSync(`${dir}/browser-${group}.json`, JSON.stringify(report, null, 2));

async function context(name, options = {}, init) {
  const ctx = await browser.newContext(options);
  if (options.javaScriptEnabled !== false) {
    await ctx.addInitScript(() => {
      Math.random = () => 0.1;
      sessionStorage.setItem('abn-intro-seen', '1');
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copied = text; } } });
    });
    if (init) await ctx.addInitScript(init);
  }
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.errors.push({ name, error: error.message }));
  page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push({ name, message: message.text() }); });
  page.on('request', request => {
    if (!request.url().startsWith(root) && !request.url().startsWith('data:')) report.externalRequests.push({ name, url: request.url() });
    if (!['GET', 'HEAD'].includes(request.method())) report.nonReadRequests.push({ name, url: request.url(), method: request.method() });
  });
  return { ctx, page };
}
async function open(page, url, js = true) {
  const response = await page.goto(root + url, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200);
  if (js) await page.waitForFunction(() => !document.querySelector('header .menu-toggle')?.disabled, null, { polling: 100 });
  await page.waitForTimeout(120);
}
async function assertFocusVisible(page, selector) {
  const result = await page.locator(selector).evaluate(el => {
    const r = el.getBoundingClientRect();
    const header = document.querySelector('header').getBoundingClientRect().bottom;
    const label = el.closest('[data-purchase-field]')?.querySelector('label');
    return { active: el === document.activeElement, labelTop: label?.getBoundingClientRect().top ?? null, x: r.x, top: r.top, bottom: r.bottom, right: r.right, header, width: innerWidth, height: innerHeight };
  });
  assert.ok(result.active && result.top >= result.header && result.bottom <= result.height && result.x >= 0 && result.right <= result.width, JSON.stringify(result));
  if (result.labelTop !== null) assert.ok(result.labelTop >= result.header, `field label is visible: ${JSON.stringify(result)}`);
  return result;
}
async function noMotion(page) {
  const s = await page.evaluate(() => ({
    enabled: document.documentElement.dataset.effects,
    lenis: !!window.__lenis,
    running: document.getAnimations().filter(a => a.playState === 'running' || a.playState === 'pending').map(a => a.animationName || a.transitionProperty),
    stage: document.querySelector('.stage-frame').style.transform,
  }));
  assert.notEqual(s.enabled, 'on');
  assert.equal(s.lenis, false);
  assert.deepEqual(s.running, []);
  assert.equal(s.stage, '');
}
async function modalChecks(page, selector, initialSelector, { native = true } = {}) {
  const dialog = page.locator(selector);
  await dialog.waitFor({ state: 'visible' });
  assert.equal(await dialog.evaluate(el => el.open), true);
  if (native) assert.equal(await dialog.evaluate(el => el.matches(':modal')), true);
  assert.ok(await page.locator(initialSelector).evaluate(el => el === document.activeElement));
  const initialScroll = await page.evaluate(() => scrollY);
  await page.evaluate(() => document.querySelector('header .logo-link').focus());
  assert.ok(await dialog.evaluate(el => el.contains(document.activeElement)), 'background cannot steal focus');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press(i < 6 ? 'Tab' : 'Shift+Tab');
    const focus = await dialog.evaluate(el => {
      const a = document.activeElement;
      const r = a.getBoundingClientRect();
      return { inside: el.contains(a), label: a.getAttribute('aria-label') || a.textContent?.trim().slice(0, 50), top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: innerHeight, width: innerWidth };
    });
    assert.ok(focus.inside, JSON.stringify(focus));
    // A product card may exceed the viewport on a tiny landscape screen, but
    // focus must at least reveal part of it rather than remain off-screen.
    assert.ok(focus.bottom > 0 && focus.top < focus.height && focus.right > 0 && focus.left < focus.width, JSON.stringify(focus));
  }
  assert.equal(await page.evaluate(() => scrollY), initialScroll, 'background document must not scroll');
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  return { native, focusContained: true, backgroundInert: true, backgroundScrollLocked: true };
}
async function unlocked(page) {
  await page.waitForFunction(() => !document.querySelector('dialog[open]') && !document.documentElement.classList.contains('scroll-locked'));
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
}
async function axe(page, selector) {
  const results = await new AxeBuilder({ page }).include(selector).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  return results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
}

try {
  if (group === 'dialogs') {
    for (const [name, options, init] of [
      ['keyboard-desktop', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }],
      ['phone', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }],
      ['landscape', { viewport: { width: 812, height: 375 }, hasTouch: true, isMobile: true }],
      ['dialog-api-fallback', { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }, () => { HTMLDialogElement.prototype.showModal = undefined; }],
    ]) {
      const { ctx, page } = await context(name, options, init);
      const native = !init;
      await open(page, '/products/br-mods-pc');
      await page.locator('.gallery__stage').click();
      const gallery = await modalChecks(page, '.lightbox[open]', '.lightbox__close', { native });
      await noMotion(page);
      if (name === 'phone') {
        await page.screenshot({ path: `${dir}/gallery-phone.png` });
        gallery.axe = await axe(page, '.lightbox');
      }
      await page.keyboard.press('Escape');
      await unlocked(page);
      assert.ok(await page.locator('.gallery__stage').evaluate(el => el === document.activeElement));
      // Clicking the artwork must not close the viewer; a true backdrop click does.
      await page.locator('.gallery__stage').click();
      await page.locator('.lightbox__img').click();
      assert.equal(await page.locator('.lightbox[open]').count(), 1);
      await page.locator('.lightbox__backdrop').click({ position: { x: 2, y: 2 } });
      await unlocked(page);
      await page.locator('.gallery__stage').click();
      await page.locator('.lightbox__close').click();
      await unlocked(page);

      await open(page, '/');
      const trigger = options.viewport.width >= 1024 ? '.hero-rail__drop' : '.hero-peek';
      await page.locator(trigger).click();
      const shelf = await modalChecks(page, '.drop[open]', '.drop__close', { native });
      await noMotion(page);
      if (name === 'phone') {
        shelf.axe = await axe(page, '.drop');
        await page.screenshot({ path: `${dir}/shelf-phone.png` });
      }
      await page.keyboard.press('Escape');
      await unlocked(page);
      assert.ok(await page.locator(trigger).evaluate(el => el === document.activeElement));
      await page.locator(trigger).click();
      await page.locator('.drop__backdrop').click({ position: { x: 2, y: 2 } });
      await unlocked(page);
      await page.locator(trigger).click();
      await page.locator('.drop__card[href="/products/br-mods-pc"]').click();
      await page.waitForURL('**/products/br-mods-pc');
      await unlocked(page);
      if (!native) assert.equal(await page.locator('body > [inert]').count(), 0);
      report.runs.push({ name, gallery, shelf, escapeAndButtonsAndBackdrop: true, restoreFocus: true, navigationCleansUp: true });
      save(); await ctx.close(); console.log(`${name}: gallery and shelf modal lifecycle PASS`);
    }
  } else if (group === 'header') {
    for (const [name, viewport, text] of [
      ['small-phone', { width: 320, height: 568 }, 100],
      ['phone', { width: 390, height: 844 }, 100],
      ['landscape', { width: 812, height: 375 }, 100],
      ['intermediate', { width: 1024, height: 600 }, 100],
      ['laptop', { width: 1280, height: 720 }, 100],
      ['desktop', { width: 1440, height: 900 }, 100],
      ['wide-desktop', { width: 1920, height: 1080 }, 100],
      ['phone-large-text', { width: 390, height: 844 }, 200],
      ['small-large-text', { width: 320, height: 568 }, 200],
      ['desktop-large-text', { width: 1440, height: 900 }, 200],
      ['landscape-large-text', { width: 812, height: 375 }, 200],
    ]) {
      const { ctx, page } = await context(name, { viewport, reducedMotion: 'reduce' });
      await open(page, '/products');
      if (text !== 100) await page.addStyleTag({ content: `html { font-size: ${text}% !important; }` });
      await page.waitForTimeout(150);
      const layout = await page.locator('header').evaluate(el => ({
        height: el.getBoundingClientRect().height,
        cssHeight: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')),
        overflowing: document.documentElement.scrollWidth > innerWidth,
        controls: [...el.querySelectorAll('a, button, summary')].filter(e => e.getClientRects().length).map(e => {
          const r = e.getBoundingClientRect();
          return { label: e.textContent.trim() || e.getAttribute('aria-label'), x: r.x, right: r.right, top: r.top, bottom: r.bottom };
        }),
      }));
      // Larger-text assertions below cover this batch's header/menu, not unrelated
      // catalog headings/cards that already need a separate reflow pass.
      if (text === 100) assert.equal(layout.overflowing, false, `${name}: no horizontal page overflow`);
      assert.ok(Math.abs(layout.height - layout.cssHeight) < 1, `${name}: actual header height shared`);
      for (const c of layout.controls) assert.ok(c.x >= 0 && c.right <= viewport.width + 1 && c.top >= 0 && c.bottom <= layout.height + 1, `${name}: ${JSON.stringify(c)}`);
      const menu = await page.locator('header .menu-toggle').isVisible();
      if (menu) {
        await page.locator('header .menu-toggle').click();
        const result = await modalChecks(page, '#mobile-navigation[open]', '.menu-toggle--close');
        const bounds = await page.locator('.mobile-nav__header').boundingBox();
        assert.ok(Math.abs(bounds.y + bounds.height - layout.height) < 1, `${name}: menu starts below actual header`);
        const closeBounds = await page.locator('.menu-toggle--close').boundingBox();
        assert.ok(closeBounds.x >= 0 && closeBounds.y >= 0 && closeBounds.x + closeBounds.width <= viewport.width && closeBounds.y + closeBounds.height <= viewport.height);
        const menuWidth = await page.locator('#mobile-navigation').evaluate(el => ({ width: el.clientWidth, scrollWidth: el.scrollWidth, navWidth: el.querySelector('nav').clientWidth, navScrollWidth: el.querySelector('nav').scrollWidth }));
        assert.ok(menuWidth.scrollWidth <= menuWidth.width && menuWidth.navScrollWidth <= menuWidth.navWidth, `${name}: no clipped menu content ${JSON.stringify(menuWidth)}`);
        await noMotion(page);
        if (['phone', 'intermediate', 'phone-large-text'].includes(name)) {
          await page.screenshot({ path: `${dir}/menu-${name}.png` });
          result.axe = await axe(page, '#mobile-navigation');
        }
        // The catalog link targets the current URL: it still closes the menu.
        await page.locator('#mobile-navigation a[href="/products"]').click();
        await unlocked(page);
        assert.ok(await page.locator('header .menu-toggle').evaluate(el => el === document.activeElement));
        await page.locator('header .menu-toggle').click();
        await page.locator('#mobile-navigation a[href="/payments"]').click();
        await page.waitForURL('**/payments');
        await unlocked(page);
        layout.menuChecks = result;
      } else {
        assert.ok(await page.locator('header .header-nav').isVisible());
        await page.locator('header .header-nav a[href="/payments"]').click();
        await page.waitForURL('**/payments');
      }
      report.runs.push({ name, viewport, textPercent: text, menu, layout });
      save(); await ctx.close(); console.log(`${name}: header fit and navigation PASS`);
    }
    const { ctx, page } = await context('menu-resize', { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await open(page, '/products');
    await page.locator('header .menu-toggle').click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await unlocked(page);
    assert.ok(await page.locator('header .logo-link').evaluate(el => el === document.activeElement));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('header .menu-toggle').click();
    await page.keyboard.press('Escape');
    await unlocked(page);
    report.runs.push({ name: 'menu-resize', closesOnDesktopLayout: true, visibleFocusFallback: true, opensAgain: true });
    await ctx.close();
  } else if (group === 'form') {
    for (const [name, options] of [
      ['desktop', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }],
      ['phone', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }],
      ['small-phone', { viewport: { width: 320, height: 568 }, hasTouch: true, isMobile: true }],
    ]) {
      const { ctx, page } = await context(name, options);
      await open(page, '/products/br-mods-pc');
      assert.equal(await page.locator('#purchase form').count(), 1);
      await page.locator('#transaction-br-mods-pc').focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.getElementById('sender-br-mods-pc').getAttribute('aria-invalid') === 'true');
      const focus = await assertFocusVisible(page, '#sender-br-mods-pc');
      assert.equal(await page.locator('#transaction-br-mods-pc').getAttribute('aria-invalid'), 'true');
      assert.ok(await page.locator('#sender-br-mods-pc').getAttribute('aria-describedby').then(v => v.includes('sender-error-br-mods-pc')));
      assert.ok((await page.locator('#sender-error-br-mods-pc').textContent()).includes('7–15 digits'));
      await page.locator('#sender-br-mods-pc').fill('+------');
      await page.locator('#transaction-br-mods-pc').fill('TEST-NO-PAYMENT');
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.getElementById('sender-br-mods-pc').getAttribute('aria-invalid') === 'true');
      assert.ok(page.url().includes('/products/br-mods-pc'));
      const invalidAxe = await axe(page, '#purchase form');
      if (name === 'phone') await page.screenshot({ path: `${dir}/form-error-phone.png` });
      await page.locator('#sender-br-mods-pc').fill('+8801700000000');
      await page.locator('#transaction-br-mods-pc').fill('   ');
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.getElementById('transaction-br-mods-pc').getAttribute('aria-invalid') === 'true');
      await assertFocusVisible(page, '#transaction-br-mods-pc');
      await page.locator('#payment-br-mods-pc').selectOption('nagad');
      await page.locator('a[href="#purchase"][data-selected]').filter({ hasText: '10 Days' }).click();
      await page.waitForFunction(() => document.getElementById('duration-br-mods-pc').value === '10 Days');
      const handoff = await assertFocusVisible(page, '#duration-summary-br-mods-pc');
      assert.equal(await page.locator('#payment-br-mods-pc').inputValue(), 'nagad');
      await page.locator('#transaction-br-mods-pc').fill('TEST-NO-PAYMENT');
      await page.keyboard.press('Enter');
      await page.waitForURL('**/order-confirmation');
      assert.ok((await page.locator('main').innerText()).includes('৳399 BDT'));
      await page.getByRole('button', { name: /^Copy payment summary / }).click();
      const copied = await page.evaluate(() => window.__copied);
      assert.ok(copied.includes('Duration: 10 Days') && copied.includes('Payment amount: ৳399 BDT'));
      assert.ok(copied.includes('Prepared locally; not automatically sent to support.'));
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: 'No payment summary is open' }).waitFor();
      await open(page, '/products/gbox-esign');
      assert.deepEqual(await page.locator('#payment-gbox-esign option').evaluateAll(els => els.map(el => el.value)), ['binance']);
      assert.equal(await page.locator('#sender-gbox-esign').count(), 0);
      await page.locator('#transaction-gbox-esign').fill('TEST-USD-NO-PAYMENT');
      await page.keyboard.press('Enter');
      await page.waitForURL('**/order-confirmation');
      assert.ok((await page.locator('main').innerText()).includes('$5 USD'));
      await open(page, '/products/bala-mod-android');
      assert.deepEqual(await page.locator('#payment-bala-mod-android option').evaluateAll(els => els.map(el => el.value)), ['bkash', 'nagad']);
      assert.ok((await page.locator('#purchase').innerText()).includes('৳21.12 BDT'));
      const stored = await page.evaluate(() => `${JSON.stringify(localStorage)} ${JSON.stringify(sessionStorage)}`);
      assert.ok(!stored.includes('TEST-') && !stored.includes('1700000000'));
      await noMotion(page);
      report.runs.push({ name, invalidEnterFocus: focus, durationHandoff: handoff, invalidAxe, punctuationRejected: true, whitespaceRejected: true, nativeEnterSubmits: true, exactAmounts: true, clipboardSummary: true, refreshClears: true, memoryOnly: true });
      save(); await ctx.close(); console.log(`${name}: validation/Enter and purchase regressions PASS`);
    }
    report.routes = [];
    for (const product of PRODUCTS) {
      const response = await fetch(`${root}/products/${product.slug}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      const select = html.match(new RegExp(`<select[^>]*id="payment-${product.slug}"[^>]*>([\\s\\S]*?)<\\/select>`));
      assert.ok(select);
      const values = [...select[1].matchAll(/<option value="([^"]*)"/g)].map(m => m[1]);
      assert.deepEqual(values, getPaymentOptions(product.prices[0]).map(p => p.method.id));
      report.routes.push({ slug: product.slug, status: 200, paymentMethods: values });
    }
  } else if (group === 'regression') {
    for (const [name, options] of [
      ['nojs-phone', { viewport: { width: 390, height: 844 }, javaScriptEnabled: false }],
      ['nojs-intermediate', { viewport: { width: 1024, height: 600 }, javaScriptEnabled: false }],
      ['nojs-desktop', { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }],
    ]) {
      const { ctx, page } = await context(name, options);
      await open(page, '/products', false);
      assert.equal(await page.locator('article.card-3d').count(), 25);
      assert.equal(await page.locator('.reveal').evaluateAll(els => els.filter(el => getComputedStyle(el).opacity !== '1').length), 0);
      await noMotion(page);
      if (await page.locator('.no-js-navigation summary').isVisible()) {
        await page.locator('.no-js-navigation summary').click();
        await page.locator('.no-js-navigation a[href="/pc"]').click();
        await page.waitForURL('**/pc');
      }
      await open(page, '/products/br-mods-pc', false);
      assert.ok(await page.getByRole('button', { name: 'Prepare summary & continue' }).isDisabled());
      assert.ok((await page.locator('#purchase').innerText()).includes('JavaScript is off'));
      report.runs.push({ name, visibleCatalog: true, nativeMenu: true, localFormDisabled: true });
      await ctx.close();
    }
    // A native modal must keep focus/scroll locked while motion preferences change.
    const { ctx, page } = await context('live-motion', { viewport: { width: 1440, height: 900 } });
    await open(page, '/products/br-mods-pc');
    await page.waitForFunction(() => !!window.__lenis);
    await page.locator('.gallery__stage').click();
    await page.waitForFunction(() => document.querySelector('.lightbox')?.matches(':modal'));
    assert.equal(await page.evaluate(() => window.__lenis.isStopped), true);
    assert.notEqual(await page.locator('.lightbox__close').evaluate(el => getComputedStyle(el).cursor), 'none');
    const focused = await page.evaluate(() => document.activeElement.className);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(200);
    await noMotion(page);
    assert.equal(await page.evaluate(() => document.activeElement.className), focused);
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => !!window.__lenis);
    assert.equal(await page.evaluate(() => window.__lenis.isStopped), true);
    await page.keyboard.press('Escape'); await unlocked(page);
    assert.equal(await page.evaluate(() => window.__lenis.isStopped), false);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(150);
    report.runs.push({ name: 'live-motion', nativeCursor: true, focusPreserved: true, replacementLenisStaysLocked: true, closeResumesScrolling: true });
    await ctx.close();

    for (const [name, viewport] of [['home-landscape', { width: 812, height: 375 }], ['home-small', { width: 320, height: 568 }]]) {
      const { ctx, page } = await context(name, { viewport, hasTouch: true, isMobile: true });
      await open(page, '/');
      if (name === 'home-landscape') {
        const cdp = await ctx.newCDPSession(page);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 600, y: 300 }] });
        for (const y of [260, 210, 160, 110]) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 600, y }] }); await page.waitForTimeout(60); }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await page.waitForTimeout(150);
        assert.ok(await page.evaluate(() => scrollY > 0));
      }
      const buttons = await page.locator('.hero-actions a').evaluateAll(els => els.map(el => {
        const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, height: innerHeight, header: document.querySelector('header').getBoundingClientRect().bottom };
      }));
      assert.ok(buttons.every(b => b.top >= b.header && b.bottom <= b.height));
      await noMotion(page);
      report.runs.push({ name, touchScrolling: true, buttonsReachable: true });
      await ctx.close();
    }
  } else throw new Error('Choose dialogs, header, form, or regression');

  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.consoleErrors, []);
  assert.deepEqual(report.externalRequests, []);
  assert.deepEqual(report.nonReadRequests, []);
  report.passed = true;
  console.log(`${group}: PASS`);
} catch (error) {
  report.failure = error.stack;
  console.error(error);
  process.exitCode = 1;
} finally {
  save();
  await browser.close();
}

```
