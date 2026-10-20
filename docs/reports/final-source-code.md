# Final source code — approved batches 1–3

Complete current contents of all 47 changed application/test files relative to starting commit `a55cb0deaa0672fde57c396a53d69994637239f0`. Application code is already updated; this is a reference copy, not a request to paste it back. See `final-handoff.md` for release scope, verification and deferred work.

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

## `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { EffectsProvider } from '@/components/effects-provider';
import { EFFECTS_BOOT_SCRIPT } from '@/lib/effects';
import { Atmosphere } from '@/components/atmosphere';
import { SiteIntro } from '@/components/prestige/site-intro';
import { PointerLayer } from '@/components/prestige/pointer';
import { ScrollHud } from '@/components/prestige/scroll-hud';
import { RouteEntrance } from '@/components/prestige/route-entrance';
import { OrderContextProvider } from '@/components/order-context';
import { CharacterStage } from '@/components/character-stage';
import { THEME_BOOT_SCRIPT } from '@/lib/themes';
import { SmoothScroll } from '@/components/smooth-scroll';
import { ThemeController } from '@/components/theme-controller';
import { findLocalCharacters } from '@/lib/local-art';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { PRODUCTS } from '@/data/products';
import { STORE_DESCRIPTION, STORE_NAME, STORE_TAGLINE, STORE_URL } from '@/data/store';

// Self-hosted fonts: no request to Google at build or run time, so builds never
// fail offline and the first paint is faster.
const display = localFont({
  src: '../fonts/sora-latin-wght-normal.woff2',
  weight: '100 800',
  variable: '--font-sora',
  display: 'swap',
  preload: true,
});

const sans = localFont({
  src: '../fonts/manrope-latin-wght-normal.woff2',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
});

const serif = localFont({
  src: [
    { path: '../fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

const mono = localFont({
  src: [
    { path: '../fonts/jetbrains-mono-400.woff2', weight: '400' },
    { path: '../fonts/jetbrains-mono-500.woff2', weight: '500' },
    { path: '../fonts/jetbrains-mono-600.woff2', weight: '600' },
  ],
  variable: '--font-mono-price',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(STORE_URL),
  title: {
    default: `${STORE_NAME} — ${STORE_TAGLINE}`,
    template: `%s · ${STORE_NAME}`,
  },
  description: STORE_DESCRIPTION,
  applicationName: STORE_NAME,
  keywords: [
    'ABNORMAL',
    'premium products',
    'PC products',
    'Android APK',
    'iOS products',
    'price list',
    'USD BDT pricing',
  ],
  openGraph: {
    type: 'website',
    siteName: STORE_NAME,
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: STORE_DESCRIPTION,
    url: STORE_URL,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${STORE_NAME} — ${STORE_TAGLINE}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: STORE_DESCRIPTION,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#04040a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dendro"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: EFFECTS_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-ink-950 text-bone-200 antialiased">
        <EffectsProvider>
          <Atmosphere />
          <SiteIntro />
          <PointerLayer />
          <ScrollHud />
          <ThemeController />
          <SmoothScroll />
          <CharacterStage local={findLocalCharacters()} />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-crimson-500 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-bone-50"
          >
            Skip to content
          </a>

          <SiteHeader productCount={PRODUCTS.length} />

          <OrderContextProvider>
            <main id="main">
              <RouteEntrance>{children}</RouteEntrance>
            </main>
          </OrderContextProvider>

          <SiteFooter />
        </EffectsProvider>
      </body>
    </html>
  );
}

```

## `src/app/order-confirmation/page.tsx`

```tsx
import type { Metadata } from 'next';
import { OrderConfirmationClient } from '@/components/order-confirmation-client';

export const metadata: Metadata = {
  title: 'Payment summary',
  description: 'This website only prepares a local payment summary. Copy it and send it with payment proof to support for manual verification.',
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return <section className="shell pb-24 pt-32 sm:pt-36"><OrderConfirmationClient /></section>;
}

```

## `src/app/page.tsx`

```tsx
import type { Metadata } from 'next';

import { Hero } from '@/components/hero';
import { STORE_DESCRIPTION, STORE_NAME, STORE_TAGLINE } from '@/data/store';

export const metadata: Metadata = {
  title: `${STORE_NAME} — ${STORE_TAGLINE}`,
  description: STORE_DESCRIPTION,
  alternates: { canonical: '/' },
};

/** A compact hero that can grow when a short screen or larger text needs room. */
export default function HomePage() {
  return <Hero />;
}

```

## `src/app/payments/page.tsx`

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

import { PaymentCards, PaymentSafetyNote } from '@/components/payment-cards';
import { Breadcrumbs } from '@/components/platform-page';
import { Reveal } from '@/components/reveal';
import { ContactChecklist, SupportPanel } from '@/components/support-panel';
import { ArrowIcon, Rule, SectionHeading, ShieldIcon } from '@/components/ui';
import { SplitText } from '@/components/prestige/split-text';
import { ORDER_STEPS, PAYMENT_METHODS } from '@/data/store';

export const metadata: Metadata = {
  title: 'Payment methods',
  description:
    'bKash (Personal) +880 1629-835648, Nagad +880 1629-835648 and Binance account ID 1220374728 — with copy buttons and clear order instructions.',
  alternates: { canonical: '/payments' },
};

const FAQ = [
  {
    question: 'How do I pay with bKash or Nagad?',
    answer:
      'First confirm the product, duration and BDT amount with support. Then send that amount to the listed account, keep your transaction ID, and prepare a summary. Send the summary and payment proof yourself through Discord, Telegram or WhatsApp.',
  },
  {
    question: 'Which currency should I send?',
    answer:
      'Use a currency listed for your exact duration. bKash and Nagad use BDT; Binance uses the listed USD amount. If a currency is not listed, ask support to confirm an amount before paying. This website never converts prices automatically.',
  },
  {
    question: 'Where do I receive my access?',
    answer:
      'On Discord, Telegram or WhatsApp. Our team confirms your payment and coordinates delivery with you there, so keep the channel open after you pay.',
  },
  {
    question: 'What should I never share?',
    answer:
      'Never send a PIN, password, OTP, or a wallet private key — to us or to anyone else. A payment transfer never requires those.',
  },
];

export default function PaymentsPage() {
  return (
    <div data-theme-section="geo">
      <section className="shell pb-10 pt-32 sm:pt-36">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Payments' }]} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="eyebrow">Payment methods · {PAYMENT_METHODS.length} options</span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-bone-50">
              <SplitText text={'Confirm, pay, send proof'} playOnMount stagger={85} />
            </h1>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-bone-300">
              Confirm the product, duration, amount and payment method with support before paying.
              After payment, prepare a summary on the product page using your transaction ID
              and sender phone number for bKash/Nagad. Copy it, then send it with payment proof
              through Discord, Telegram or WhatsApp. This website does not submit your details;
              staff verify the proof you send before delivery.
            </p>
          </div>

          <div className="panel p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-crimson-700/50 bg-crimson-900/25 text-crimson-200">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base tracking-wide text-bone-50">
                  Before you send anything
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-bone-300">
                  <li>1. Choose the exact product and duration.</li>
                  <li>2. Check the listed amount and currency for that duration.</li>
                  <li>3. Confirm availability, the amount and payment method with support before paying.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="shell pb-16">
        <PaymentCards />
        <PaymentSafetyNote className="mt-8" />
      </section>

      <Rule className="shell" />

      <section className="shell py-20">
        <SectionHeading
          eyebrow="Step by step"
          title="How an order is completed"
          description="Four steps, and you always know exactly what happens next."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="h-full">
            <div className="panel h-full p-6 sm:p-8">
              <ol className="space-y-6">
                {ORDER_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-crimson-700/60 bg-crimson-900/30 font-mono text-[0.72rem] text-crimson-200">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-bone-100">{step.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-bone-400">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <ContactChecklist />
          </Reveal>
        </div>
      </section>

      <section className="shell pb-20">
        <SectionHeading eyebrow="Questions" title="Payment questions, answered plainly" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FAQ.map((item) => (
            <Reveal key={item.question} className="h-full">
              <article className="panel-quiet h-full p-6">
                <h3 className="font-display text-base tracking-wide text-bone-50">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-400">{item.answer}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <SectionHeading
          eyebrow="Support"
          title="Confirm with us before you pay"
          description="Send the product name, duration and the amount you are about to send. We will confirm it is correct."
          action={
            <Link href="/support" className="btn btn-ghost">
              Support centre
              <ArrowIcon className="h-4 w-4" />
            </Link>
          }
        />
        <SupportPanel className="mt-10" />
      </section>
    </div>
  );
}

```

## `src/app/products/[slug]/page.tsx`

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductVisual, getProductImages } from '@/components/product-visual';
import { ProductGallery } from '@/components/prestige/product-gallery';
import { PaymentCards, PaymentSafetyNote } from '@/components/payment-cards';
import { Breadcrumbs } from '@/components/platform-page';
import { PriceList } from '@/components/price-list';
import { PurchaseForm } from '@/components/purchase-form';
import { PurchaseSelectionProvider } from '@/components/purchase-selection';
import { ProductGrid } from '@/components/product-grid';
import { Reveal } from '@/components/reveal';
import { ContactChecklist, SupportPanel } from '@/components/support-panel';
import { ArrowIcon, Chip, PlatformBadge, PricePair, Rule, SectionHeading } from '@/components/ui';
import { PLATFORM_LABEL } from '@/data/products';
import { ORDER_STEPS } from '@/data/store';
import {
  getAllSlugs,
  getPlatformMeta,
  getProductBySlug,
  getRelatedProducts,
  getStartingPrice,
} from '@/lib/catalog';
import { formatPriceOption } from '@/lib/format';

/** Only the slugs that exist in the catalog are built — anything else is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  const priceLine = product.prices
    .map((price) => `${price.duration} ${formatPriceOption(price)}`)
    .join(' · ');

  return {
    title: `${product.name} — ${PLATFORM_LABEL[product.platform]} prices`,
    description: `${product.summary} Full price list: ${priceLine}. Confirm availability and the amount with Discord, Telegram or WhatsApp support before paying. After payment, prepare a local summary and send it with your proof.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${PLATFORM_LABEL[product.platform]}`,
      description: `${product.summary} ${priceLine}`,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const platform = getPlatformMeta(product.platform);
  const starting = getStartingPrice(product);
  const related = getRelatedProducts(product, 3);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    category: PLATFORM_LABEL[product.platform],
    offers: product.prices.flatMap((price) => {
      const offers: Record<string, string | number>[] = [];
      if (typeof price.usd === 'number') {
        offers.push({
          '@type': 'Offer',
          name: price.duration,
          price: price.usd,
          priceCurrency: 'USD',
        });
      }
      if (typeof price.bdt === 'number') {
        offers.push({
          '@type': 'Offer',
          name: price.duration,
          price: price.bdt,
          priceCurrency: 'BDT',
        });
      }
      return offers;
    }),
  };

  return (
    <PurchaseSelectionProvider key={product.slug} initialDuration={product.prices[0]?.duration ?? ''}>
      <script
        type="application/ld+json"
        // Static, owner-controlled data — no user input is interpolated here.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Overview                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell pb-14 pt-32 sm:pt-36">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: platform.label, href: platform.href },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          {/* artwork + facts */}
          <div className="flex flex-col gap-6">
            <ProductGallery
              images={getProductImages(product)}
              name={product.name}
              label={`${PLATFORM_LABEL[product.platform]} build`.toUpperCase()}
              badges={
                <>
                  <PlatformBadge platform={product.platform} />
                  {(product.tags ?? []).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </>
              }
              first={<ProductVisual product={product} priority context="detail" />}
            />

            <div className="panel p-6">
              <h2 className="font-display text-base tracking-wide text-bone-50">
                Product information
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-6 border-b border-ink-700/60 pb-4">
                  <dt className="text-bone-500">Platform</dt>
                  <dd className="text-right text-bone-100">{PLATFORM_LABEL[product.platform]}</dd>
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-ink-700/60 pb-4">
                  <dt className="text-bone-500">Compatible with</dt>
                  <dd className="text-right text-bone-100">
                    {product.compatibility ?? platform.compatibility}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-ink-700/60 pb-4">
                  <dt className="text-bone-500">Durations</dt>
                  <dd className="text-right text-bone-100">
                    {product.prices.length} option{product.prices.length === 1 ? '' : 's'}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-bone-500">Checkout</dt>
                  <dd className="text-right text-bone-100">Manual, via support</dd>
                </div>
              </dl>

              {product.details && product.details.length > 0 ? (
                <ul className="mt-6 space-y-2.5 border-t border-ink-700/60 pt-5 text-sm text-bone-300">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* purchase column — first on mobile so the name is never below the fold */}
          <div className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">{PLATFORM_LABEL[product.platform]} build</span>
            <h1 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,2.9rem)] font-semibold leading-[1.08] tracking-tight text-bone-50">
              {product.name}
            </h1>

            <p className="mt-5 text-[0.98rem] leading-relaxed text-bone-300">{product.summary}</p>
            {product.description ? (
              <p className="mt-4 text-sm leading-relaxed text-bone-400">{product.description}</p>
            ) : null}

            {starting ? (
              <div className="panel mt-7 flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-bone-500">
                    Starting from · {starting.duration}
                  </div>
                  <div className="mt-1.5 text-2xl font-semibold">
                    <PricePair usd={starting.usd} bdt={starting.bdt} />
                  </div>
                </div>
                <a href="#purchase" className="btn btn-primary">
                  Purchase instructions
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            ) : null}

            <div className="mt-6">
              <PriceList product={product} />
            </div>
          </div>
        </div>
      </section>

      <Rule className="shell" />

      {/* ---------------------------------------------------------------- */}
      {/* Purchase                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="purchase" className="shell scroll-mt-28 py-20">
        <SectionHeading
          eyebrow="Purchase instructions"
          title={`How to order ${product.name}`}
          description="Confirm the product, duration and amount with support before paying. After payment, prepare a local summary and send it with your proof for manual verification."
        />

        <div className="mt-8"><PurchaseForm product={product} /></div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="h-full">
            <div className="panel h-full p-6 sm:p-8">
              <ol className="space-y-6">
                {ORDER_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-crimson-700/60 bg-crimson-900/30 font-mono text-[0.72rem] text-crimson-200">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-bone-100">{step.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-bone-400">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-ink-700/70 pt-6">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-bone-400">
                  Every price for this product
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {product.prices.map((price) => (
                    <li key={price.duration} className="flex items-center justify-between gap-4">
                      <span className="text-bone-300">{price.duration}</span>
                      <PricePair usd={price.usd} bdt={price.bdt} className="text-bone-100" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col gap-6">
              <ContactChecklist productName={product.name} />
              <PaymentSafetyNote />
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-bone-400">
            Store payment methods
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-bone-400">
            The selector above shows which methods have a listed amount for your chosen duration.
            Confirm any other currency with support before paying; this site does not convert prices.
          </p>
          <PaymentCards className="mt-5" />
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl tracking-wide text-bone-50">
            Contact to purchase
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-400">
            All three channels reach the same team. Mention <span className="text-bone-200">{product.name}</span>{' '}
            and the duration you want so nothing gets mixed up.
          </p>
          <SupportPanel productName={product.name} className="mt-6" />
        </div>
      </section>

      <Rule className="shell" />

      {/* ---------------------------------------------------------------- */}
      {/* Related                                                           */}
      {/* ---------------------------------------------------------------- */}
      {related.length > 0 ? (
        <section className="shell py-20">
          <SectionHeading
            eyebrow={`More ${platform.label} products`}
            title="You might also want these"
            action={
              <Link
                href={platform.href}
                className="btn btn-ghost !px-4 !py-2.5 !text-xs"
              >
                All {platform.label} products
                <ArrowIcon className="h-4 w-4" />
              </Link>
            }
          />
          <ProductGrid products={related} className="mt-10" />
        </section>
      ) : null}
    </PurchaseSelectionProvider>
  );
}

```

## `src/components/catalog-explorer.tsx`

```tsx
'use client';

import { useMemo, useState } from 'react';
import { PLATFORMS, PLATFORM_LABEL, type Platform, type Product } from '@/data/products';
import {
  DURATION_FILTERS,
  SORT_OPTIONS,
  filterProducts,
  type DurationFilterId,
  type SortId,
} from '@/lib/catalog';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { ArrowIcon } from '@/components/ui';
import { Reveal } from '@/components/reveal';
import { useHydrated } from '@/components/use-hydrated';

type PlatformOption = Platform | 'all';

export function CatalogExplorer({
  products,
  initialPlatform = 'all',
  showPlatformFilter = true,
  id,
  className = '',
  /**
   * Show at most this many results, with a link to the full catalogue. The
   * home page uses a small number so the search sits above a few sample
   * products instead of a grid that needs its own scrolling.
   */
  limit,
}: {
  products: Product[];
  initialPlatform?: PlatformOption;
  showPlatformFilter?: boolean;
  id?: string;
  className?: string;
  limit?: number;
}) {
  const hydrated = useHydrated();
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<PlatformOption>(initialPlatform);
  const [duration, setDuration] = useState<DurationFilterId>('all');
  const [sort, setSort] = useState<SortId>('featured');

  const results = useMemo(
    () => filterProducts(products, { query, platform, duration, sort }),
    [products, query, platform, duration, sort],
  );

  const platformOptions: { id: PlatformOption; label: string; count: number }[] = [
    { id: 'all', label: 'All platforms', count: products.length },
    ...PLATFORMS.map((item) => ({
      id: item.id as PlatformOption,
      label: item.label,
      count: products.filter((product) => product.platform === item.id).length,
    })),
  ];

  const filtersActive = query.trim() !== '' || platform !== 'all' || duration !== 'all';
  const shown = typeof limit === 'number' ? results.slice(0, limit) : results;
  const hidden = results.length - shown.length;

  const clearFilters = () => {
    setQuery('');
    setPlatform(initialPlatform);
    setDuration('all');
    setSort('featured');
  };

  const activePlatformLabel =
    platform === 'all' ? 'all platforms' : PLATFORM_LABEL[platform as Platform];

  return (
    <div id={id} className={`scroll-mt-28 ${className}`}>
      {/* ---------------------------------------------------------------- */}
      {/* Controls                                                          */}
      {/* ---------------------------------------------------------------- */}
      <noscript>
        <p className="panel-quiet mb-4 p-4 text-sm leading-relaxed text-bone-300">
          Search and filters need JavaScript. The available products are listed below;
          open any product to see every duration and price. The navigation links also
          let you browse PC, Android and iOS separately.
        </p>
      </noscript>
      <div className="panel p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div role="search">
            <label
              htmlFor="catalog-search"
              className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-bone-500"
            >
              Search the catalog
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-500">
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m13.2 13.2 3.3 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="catalog-search"
                disabled={!hydrated}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name — e.g. DRIP, PATO, iOS, proxy…"
                className="field pl-10"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="catalog-duration"
              className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-bone-500"
            >
              Duration
            </label>
            <select
              id="catalog-duration"
                disabled={!hydrated}
              value={duration}
              onChange={(event) => setDuration(event.target.value as DurationFilterId)}
              className="field mt-2"
            >
              {DURATION_FILTERS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="catalog-sort"
              className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-bone-500"
            >
              Sort by
            </label>
            <select
              id="catalog-sort"
                disabled={!hydrated}
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="field mt-2"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showPlatformFilter ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-700/70 pt-5">
            <span className="mr-1 hidden text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-bone-500 sm:inline">
              Platform
            </span>
            {platformOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPlatform(option.id)}
                disabled={!hydrated}
                aria-pressed={platform === option.id}
                className="filter-pill"
              >
                {option.label}
                <span className="font-mono text-[0.68rem] text-bone-500">{option.count}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Result meta                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-bone-400" aria-live="polite">
          {hidden > 0 ? (
            <>
              Showing <span className="font-mono text-bone-100">{shown.length}</span> of{' '}
              <span className="font-mono text-bone-100">{results.length}</span>
            </>
          ) : (
            <span className="font-mono text-bone-100">{results.length}</span>
          )}{' '}
          {results.length === 1 ? 'product' : 'products'} on {activePlatformLabel}
          {query.trim() ? (
            <>
              {' '}
              matching <span className="text-bone-100">“{query.trim()}”</span>
            </>
          ) : null}
        </p>

        {filtersActive ? (
          <button type="button" disabled={!hydrated} onClick={clearFilters} className="btn btn-ghost !px-4 !py-2 !text-xs">
            Clear filters
          </button>
        ) : null}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Results                                                           */}
      {/* ---------------------------------------------------------------- */}
      {results.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((product, index) => (
              <Reveal key={product.slug} delay={Math.min(index, 5) * 50} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          {hidden > 0 ? (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <p className="text-sm text-bone-400">
                <span className="font-mono text-bone-100">+{hidden}</span> more{' '}
                {hidden === 1 ? 'product' : 'products'} in the full catalogue
              </p>
              <Link href="/products" className="btn btn-primary !px-5 !py-2.5 !text-[0.82rem]">
                Browse all {results.length} products
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </>
      ) : (
        <div className="panel mt-6 flex flex-col items-center gap-4 p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-bone-400">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <h3 className="font-display text-lg text-bone-50">Nothing matches those filters</h3>
            <p className="mt-2 max-w-md text-sm text-bone-400">
              Try a shorter search term, switch the platform, or clear the filters to see the full
              catalog again.
            </p>
          </div>
          <button type="button" disabled={!hydrated} onClick={clearFilters} className="btn btn-primary">
            Show every product
          </button>
        </div>
      )}
    </div>
  );
}

```

## `src/components/character-stage.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { DEFAULT_THEME, THEME_IDS, isTheme, type ThemeId } from '@/lib/themes';
import type { LocalArtCollection } from '@/lib/local-art';
import { useEffects } from '@/components/effects-provider';
import { watchMediaQuery } from '@/lib/effects';

/**
 * The character that stands behind the page. One stage for the whole site:
 *
 *  - Every element (theme) has its own "slot". Only the slot of the section you
 *    are looking at is visible; the others wait invisibly, already loaded, so a
 *    swap is a clean slide-and-fade and never a pop-in.
 *  - Animation uses only opacity + transform (the two things the GPU can do
 *    without repainting), no blur or drop-shadow filters on the big artwork.
 *  - Desktop: the character drifts gently with the mouse and with scroll
 *    (soft parallax), and dims once you leave the hero so text stays readable.
 *  - Phone: no parallax, no extra loops. Just the active character, using the
 *    small `.mobile.webp` file when one exists.
 *  - When an element has several pictures (anemo.webp, anemo2.webp ...) a
 *    random one is shown on every visit, and a different one each time you
 *    come back to that element.
 */
export function CharacterStage({ local }: { local: LocalArtCollection }) {
  const { enabled } = useEffects();
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState<ThemeId[]>([DEFAULT_THEME]);
  const [desktop, setDesktop] = useState(false);
  const [variant, setVariant] = useState<Partial<Record<ThemeId, number>>>({});
  const [ready, setReady] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const previous = useRef<ThemeId>(DEFAULT_THEME);

  // Pick a random picture for every element on each visit. Images are only
  // rendered after this runs, so the first one you see is already the random one.
  useEffect(() => {
    const picks: Partial<Record<ThemeId, number>> = {};
    for (const theme of THEME_IDS) {
      const count = local[theme]?.length ?? 0;
      if (count > 1) picks[theme] = Math.floor(Math.random() * count);
    }
    setVariant(picks);
    setReady(true);
  }, [local]);

  // Follow <html data-theme>, which ThemeController updates while you scroll.
  useEffect(() => {
    const html = document.documentElement;
    const read = () => {
      const value = html.dataset.theme;
      if (isTheme(value)) setActive(value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(min-width: 1024px)');
    const sync = () => setDesktop(query.matches);
    sync();
    return watchMediaQuery(query, sync);
  }, []);

  // Only eligible desktops need inactive slots for cross-fades. Static modes
  // keep the real active character, without fade timers or background prewarming.
  useEffect(() => {
    if (!enabled || !desktop) {
      setMounted([active]);
      return;
    }
    setMounted((list) => (list.includes(active) ? list : [...list, active]));
  }, [active, desktop, enabled]);

  useEffect(() => {
    if (!enabled || !desktop) return;
    let cancelled = false;
    const warm = () => {
      if (!cancelled) setMounted([...THEME_IDS]);
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const handle = idle ? idle(warm, { timeout: 3500 }) : window.setTimeout(warm, 2200);
    return () => {
      cancelled = true;
      if (idle) (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(handle);
      else window.clearTimeout(handle);
    };
  }, [desktop, enabled]);

  // Each time you leave an element, quietly line up its next picture.
  useEffect(() => {
    const left = previous.current;
    previous.current = active;
    if (left === active) return;
    const options = local[left] ?? [];
    if (options.length < 2) return;
    const chooseNext = () => {
      setVariant((current) => {
        const now = current[left] ?? 0;
        const next = (now + 1 + Math.floor(Math.random() * (options.length - 1))) % options.length;
        return { ...current, [left]: next };
      });
    };
    if (!enabled) {
      chooseNext();
      return;
    }
    const timer = window.setTimeout(chooseNext, 1100);
    return () => window.clearTimeout(timer);
  }, [active, local, enabled]);

  // Desktop only: soft parallax + dimming, driven by ONE requestAnimationFrame
  // loop that sleeps as soon as everything has settled.
  useEffect(() => {
    if (!enabled || !desktop) return;
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let opacity = 1;
    let running = false;
    let raf = 0;

    const targetOpacity = () => {
      const h = window.innerHeight;
      const t = Math.min(1, Math.max(0, (window.scrollY - h * 0.25) / (h * 0.6)));
      return 1 - t * 0.78;
    };

    const tick = () => {
      const tx = mouseX * 18;
      const ty = mouseY * 10 - Math.min(window.scrollY, 1600) * 0.035;
      const to = targetOpacity();
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      opacity += (to - opacity) * 0.08;
      frame.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      stage.style.opacity = opacity.toFixed(3);
      if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(to - opacity) * 100 > 0.15) {
        raf = window.requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
      wake();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    wake();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      window.cancelAnimationFrame(raf);
      frame.style.transform = '';
      stage.style.opacity = '';
    };
  }, [desktop, enabled]);

  return (
    <div ref={stageRef} className="stage" aria-hidden="true">
      <div ref={frameRef} className="stage-frame">
        {THEME_IDS.map((theme) => {
          const options = local[theme] ?? [];
          const art = options.length ? options[(variant[theme] ?? 0) % options.length] : undefined;
          const on = theme === active;
          const render = ready && !!art && mounted.includes(theme);
          return (
            <div key={theme} className={`stage-slot stage-${theme}`} data-on={on ? 'true' : 'false'}>
              <div className="stage-aura" />
              <div className="stage-ring" />
              <div className="stage-ring stage-ring--inner" />
              <div className="stage-bob">
                {render && art ? (
                  <picture>
                    {art.mobileUrl ? (
                      <source media="(max-width: 1023px)" srcSet={art.mobileUrl} type="image/webp" />
                    ) : null}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={art.url}
                      className="stage-img"
                      src={art.url}
                      alt=""
                      decoding="async"
                      loading="eager"
                      fetchPriority={on ? 'high' : 'low'}
                      draggable={false}
                    />
                  </picture>
                ) : null}
                {theme === DEFAULT_THEME && art ? (
                  <noscript>
                    <picture>
                      {art.mobileUrl ? <source media="(max-width: 1023px)" srcSet={art.mobileUrl} type="image/webp" /> : null}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="stage-img" src={art.url} alt="" decoding="async" draggable={false} />
                    </picture>
                  </noscript>
                ) : null}
              </div>
              {art?.artist && on ? (
                <a className="stage-credit" href={art.link} target="_blank" rel="noopener noreferrer">
                  Art: {art.artist}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

```

## `src/components/copy-button.tsx`

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/components/use-hydrated';

type CopyState = 'idle' | 'copied' | 'error';

/**
 * Copy-to-clipboard button with a graceful fallback for older browsers and
 * for non-secure contexts (plain http), where navigator.clipboard is missing.
 */
export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  className = '',
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const hydrated = useHydrated();
  const [state, setState] = useState<CopyState>('idle');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const flash = useCallback((next: CopyState) => {
    setState(next);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setState('idle'), 2200);
  }, []);

  const copy = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        flash('copied');
        return;
      }

      // Fallback: hidden textarea + execCommand.
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      flash(ok ? 'copied' : 'error');
    } catch {
      flash('error');
    }
  }, [flash, value]);

  const isCopied = state === 'copied';
  const isError = state === 'error';

  return (
    <button
      type="button"
      onClick={copy}
      disabled={!hydrated}
      title={!hydrated ? 'Select the displayed text to copy it manually.' : undefined}
      aria-label={`${label} ${value}`}
      className={`btn ${isCopied ? 'btn-aura' : 'btn-ghost'} !px-3.5 !py-2 !text-[0.75rem] ${className}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {isCopied ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <rect
              x="5.5"
              y="5.5"
              width="8"
              height="8"
              rx="1.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M10.5 3.5v-.4A1.6 1.6 0 0 0 8.9 1.5H3.1A1.6 1.6 0 0 0 1.5 3.1v5.8a1.6 1.6 0 0 0 1.6 1.6h.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span>{!hydrated ? 'Select text to copy' : isCopied ? copiedLabel : isError ? 'Press Ctrl+C' : label}</span>
      <span aria-live="polite" className="sr-only">
        {isCopied ? `${value} copied to clipboard` : isError ? 'Copy failed' : ''}
      </span>
    </button>
  );
}

```

## `src/components/effects-provider.tsx`

```tsx
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { canEnableEffects, EFFECTS_MEDIA, TOUCH_MEDIA, watchMediaQuery } from '@/lib/effects';

type EffectsPolicy = { enabled: boolean; ready: boolean };
const EffectsContext = createContext<EffectsPolicy>({ enabled: false, ready: false });

/**
 * A single live policy, independent of viewport width. Touch laptops also keep
 * the static experience. Components use `enabled` to attach/clean up their own
 * effects; the root attribute gives CSS exactly the same decision.
 */
export function EffectsProvider({ children }: { children: ReactNode }) {
  const [policy, setPolicy] = useState<EffectsPolicy>({ enabled: false, ready: false });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    if (typeof window.matchMedia !== 'function') {
      root.dataset.effects = 'off';
      delete root.dataset.intro;
      setPolicy({ enabled: false, ready: true });
      return;
    }

    const eligible = window.matchMedia(EFFECTS_MEDIA);
    const coarse = window.matchMedia(TOUCH_MEDIA);
    let touchSeen = false;
    let wasEnabled = root.dataset.effects === 'on';

    const sync = () => {
      const enabled = canEnableEffects({
        eligibleMedia: eligible.matches,
        coarsePointer: coarse.matches,
        maxTouchPoints: navigator.maxTouchPoints,
        touchSeen,
      });
      // Apply CSS safety immediately, before React cleans up JS subscribers.
      if (wasEnabled && !enabled) {
        window.scrollTo({ top: window.scrollY, left: window.scrollX, behavior: 'instant' });
      }
      wasEnabled = enabled;
      root.dataset.effects = enabled ? 'on' : 'off';
      if (!enabled) {
        delete root.dataset.intro;
        root.classList.remove('has-pointer', 'pointer-visible', 'pointer-down');
      }
      setPolicy((current) => current.ready && current.enabled === enabled ? current : { enabled, ready: true });
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || touchSeen) return;
      touchSeen = true;
      sync();
    };

    sync();
    const stopEligible = watchMediaQuery(eligible, sync);
    const stopCoarse = watchMediaQuery(coarse, sync);
    window.addEventListener('pointerdown', onPointer, { capture: true, passive: true });
    window.addEventListener('resize', sync);
    window.addEventListener('pageshow', sync);
    return () => {
      stopEligible();
      stopCoarse();
      window.removeEventListener('pointerdown', onPointer, true);
      window.removeEventListener('resize', sync);
      window.removeEventListener('pageshow', sync);
      root.dataset.effects = 'off';
      delete root.dataset.intro;
      root.classList.remove('has-pointer', 'pointer-visible', 'pointer-down');
    };
  }, []);

  return <EffectsContext.Provider value={policy}>{children}</EffectsContext.Provider>;
}

export function useEffects() {
  return useContext(EffectsContext);
}

```

## `src/components/hero.tsx`

```tsx
import fs from 'node:fs';
import type { CSSProperties } from 'react';
import path from 'node:path';
import Link from 'next/link';
import {
  CATALOG_HREF,
  FEATURED_LIMIT,
  STORE_DESCRIPTION,
  STORE_NAME,
  STORE_NAME_KANJI,
} from '@/data/store';
import { PLATFORM_LABEL } from '@/data/products';
import {
  getAllProducts,
  getCatalogStats,
  getFeaturedProducts,
  getStartingPrice,
} from '@/lib/catalog';
import { formatBdt, formatPriceOption, formatUsd } from '@/lib/format';
import { ArrowIcon, LinkButton } from '@/components/ui';
import { HeroSpotlight } from '@/components/prestige/pointer';
import { CountUp } from '@/components/prestige/count-up';
import { Magnetic } from '@/components/prestige/magnetic';
import { Marquee } from '@/components/prestige/marquee';
import { FeaturedDrop, type DropItem } from '@/components/prestige/featured-drop';
import { getProductImages } from '@/components/product-visual';

/** Drop public/art/hero.jpg (or .png/.webp/.avif) in and it replaces the generated hero art. */
function findHeroImage(): string | null {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'art', `hero.${ext}`))) return `/art/hero.${ext}`;
  }
  return null;
}

export function Hero() {
  const heroImage = findHeroImage();
  const stats = getCatalogStats();
  const products = getAllProducts();
  const rail = products.slice(0, 12);
  const featured = getFeaturedProducts(FEATURED_LIMIT);
  const dropItems: DropItem[] = featured.map((product) => {
    const starting = getStartingPrice(product);
    return {
      slug: product.slug,
      name: product.name,
      platform: PLATFORM_LABEL[product.platform],
      summary: product.summary,
      price: starting ? formatPriceOption(starting) : 'Ask support',
      from: starting ? `From · ${starting.duration}` : 'Price',
      image: getProductImages(product)[0]?.src ?? null,
    };
  });

  return (
    <section data-home className="home-hero relative isolate min-h-[100svh] overflow-x-clip">
      {heroImage ? (
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
        </div>
      ) : null}

      {/* Mouse-tracked light + giant kanji watermark, both pure decoration. */}
      <HeroSpotlight />
      <div className="hero-watermark" aria-hidden="true">
        <span>{STORE_NAME_KANJI}</span>
      </div>
      <div className="hero-frame" aria-hidden="true">
        <span className="hero-frame__corner hero-frame__corner--tl" />
        <span className="hero-frame__corner hero-frame__corner--tr" />
        <span className="hero-frame__corner hero-frame__corner--bl" />
        <span className="hero-frame__corner hero-frame__corner--br" />
      </div>

      {/* vertical kanji accent (desktop) */}
      <div aria-hidden="true" className="hero-spine">
        <span className="hero-spine__label">{STORE_NAME_KANJI} · PREMIUM PRODUCTS</span>
        <span className="hero-spine__line" />
      </div>

      <div className="hero-shell shell relative flex min-h-[100svh] flex-col">
        <div className="hero-body flex flex-1 flex-col justify-center pb-1 pt-24 sm:pt-28">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="hero-badge__pulse" aria-hidden="true" />
              <span className="hero-badge__text">Live catalog</span>
              <span className="hero-badge__rule" aria-hidden="true" />
              <span className="font-mono">{stats.products} products</span>
              <span className="hero-badge__rule hero-badge__rule--end" aria-hidden="true" />
              <span className="font-mono">USD / BDT</span>
            </span>

            <h1
              className="hero-title"
              aria-label="Premium products for PC, Android and iOS"
            >
              <span className="hero-line" aria-hidden="true">
                <span className="hero-word" style={{ '--i': 0 } as CSSProperties}>
                  <span className="hero-word__in">
                    <em className="hero-serif">Premium</em>
                  </span>
                </span>{' '}
                <span className="hero-word" style={{ '--i': 1 } as CSSProperties}>
                  <span className="hero-word__in">products</span>
                </span>
              </span>
              <span className="hero-line hero-line--accent" aria-hidden="true">
                <span className="hero-line__in">
                  <span className="hero-grad">for PC · Android · iOS</span>
                </span>
              </span>
            </h1>

            <p className="hero-desc">
              <span className="hero-desc__long">{STORE_DESCRIPTION}</span>
              <span className="hero-desc__short">
                Hand-picked PC, Android and iOS builds with fixed prices in USD and BDT —
                confirmed by a real person before you pay.
              </span>
            </p>

            <div className="hero-actions">
              <Magnetic strength={7}>
                <LinkButton href={CATALOG_HREF} className="!px-7 !py-4 !text-[0.95rem]">
                  Explore products
                  <ArrowIcon className="h-4 w-4" />
                </LinkButton>
              </Magnetic>
              <Magnetic strength={5}>
                <LinkButton
                  href="/payments"
                  variant="ghost"
                  className="!px-6 !py-4 !text-[0.9rem]"
                >
                  Payment methods
                </LinkButton>
              </Magnetic>
              <span className="hero-note">
                <span className="hero-note__line" aria-hidden="true" />
                {STORE_NAME} · {stats.products} products ·{' '}
                {stats.lowestUsd !== null ? `from ${formatUsd(stats.lowestUsd)}` : 'USD & BDT pricing'}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <dl className="hero-stats">
            <HeroStat value={stats.products} label="Products listed" />
            <HeroStat value={stats.platforms} label="Platforms" />
            <HeroStat value={stats.durationLabels} label="Durations" />
            <HeroStat value={stats.lifetimeProducts} label="With lifetime" />
          </dl>

          <p className="hero-lowest">
            Lowest listed price{' '}
            <span className="font-mono text-bone-300">
              {stats.lowestUsd !== null ? formatUsd(stats.lowestUsd) : '—'}
            </span>
            {stats.lowestBdt !== null ? (
              <>
                {' '}
                / <span className="font-mono text-bone-300">{formatBdt(stats.lowestBdt)}</span>
              </>
            ) : null}
          </p>
        </div>
      </div>

      {/* Full-bleed ticker along the bottom edge of the screen. */}
      <div className="hero-rail">
        <div className="shell hero-rail__inner">
          <button type="button" className="hero-rail__drop" data-drop-trigger aria-haspopup="dialog">
            <span className="hero-rail__drop-icon" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>Featured drop</span>
            <span className="hero-rail__drop-count font-mono">{String(dropItems.length).padStart(2, '0')}</span>
          </button>
          <Marquee speed={58} className="hero-rail__marquee">
            {rail.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="hero-rail__item">
                <span>{product.name}</span>
                <span className="hero-rail__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </Marquee>
          <Link href={CATALOG_HREF} className="hero-rail__all">
            <span>All {stats.products}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Phone / tablet: a peek strip along the bottom edge opens the same shelf. */}
      <button type="button" className="hero-peek" data-drop-trigger aria-haspopup="dialog">
        <span className="hero-peek__label">
          <span className="hero-peek__dot" aria-hidden="true" />
          Featured drop
          <span className="font-mono">{String(dropItems.length).padStart(2, '0')}</span>
        </span>
        <span className="hero-peek__art" aria-hidden="true">
          {dropItems.slice(0, 3).map((item) =>
            item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={item.slug} src={item.image} alt="" loading="lazy" decoding="async" />
            ) : null,
          )}
        </span>
        <span className="hero-peek__open" aria-hidden="true">
          Open
          <svg viewBox="0 0 20 20">
            <path d="M10 15V5m0 0-4.2 4.2M10 5l4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <FeaturedDrop items={dropItems} />
    </section>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="hero-stat">
      <dt className="hero-stat__value">
        <CountUp value={value} />
      </dt>
      <dd className="hero-stat__label">
        <span aria-hidden="true" className="hero-stat__tick" />
        {label}
      </dd>
    </div>
  );
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

## `src/components/order-confirmation-client.tsx`

```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '@/components/order-context';
import { formatOrderSummary } from '@/lib/order-summary';
import { CopyButton } from '@/components/copy-button';
import { DISCORD_URL, TELEGRAM_URL, WHATSAPP_URL } from '@/data/store';

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="field-label">{label}</div>
      <div className={`mt-1.5 break-words text-sm text-bone-100 ${mono ? 'font-mono' : ''}`}>{value}</div>
    </div>
  );
}

export function OrderConfirmationClient() {
  const router = useRouter();
  const { order, clearOrder } = useOrderContext();

  if (!order) {
    return (
      <div className="panel mx-auto max-w-3xl p-7 sm:p-9">
        <span className="eyebrow">Payment summary</span>
        <h1 className="mt-4 font-display text-3xl text-bone-50">No payment summary is open</h1>
        <p className="mt-3 text-sm leading-relaxed text-bone-300">
          For privacy, payment details are kept only in memory and are never saved to an account or database. If you have already paid, return to the product page and prepare the summary again using the same payment reference. Do not pay again just because this summary is missing.
        </p>
        <Link href="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  const summary = formatOrderSummary(order);
  const backToProducts = () => {
    clearOrder();
    router.push('/products');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="panel overflow-hidden">
        <div className="border-b border-ink-700/70 bg-ink-900/50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-crimson-700/60 bg-crimson-900/30 text-crimson-200" aria-hidden="true">✓</span>
            <div>
              <span className="eyebrow">Payment summary prepared</span>
              <h1 className="mt-1 font-display text-2xl text-bone-50 sm:text-3xl">Now send your summary and proof</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone-300">
            Your summary is ready on this device, but <strong className="text-bone-100">nothing has been sent to support</strong>. Copy it, then contact us on Discord, Telegram or WhatsApp, paste it there and attach your payment screenshot. Preparing this summary does not submit an order or verify payment.
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl text-bone-50">{order.productName}</h2>
              <p className="mt-1 text-sm text-bone-400">{order.platform.toUpperCase()} · {order.duration}</p>
            </div>
            <span className="chip">Not sent by this website</span>
          </div>

          <div className="mt-6 grid gap-4 border-y border-ink-700/70 py-5 sm:grid-cols-2">
            <Info label="Payment amount" value={order.priceLabel} />
            <Info label="Payment method" value={order.paymentMethod.toUpperCase()} />
            <Info label={order.paymentMethod === 'binance' ? 'Binance transaction number / ID' : 'Transaction ID'} value={order.transactionId} mono />
            <Info label="Sender phone number" value={order.senderNumber || 'Not required for Binance'} mono />
            <Info label="Payment destination" value={order.paymentDestination} mono />
            <Info label="Local support reference" value={order.reference} mono />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CopyButton value={summary} label="Copy payment summary" />
            <a href={DISCORD_URL} target="_blank" rel="noreferrer noopener" className="btn btn-primary">Open Discord ↗</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">Open Telegram ↗</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer noopener" className="btn btn-aura">Open WhatsApp ↗</a>
          </div>

          <div className="panel-quiet mt-5 p-4 text-sm leading-relaxed text-bone-300">
            <strong className="text-bone-50">Your next step:</strong> copy the payment summary, create a Discord ticket or message us on Telegram or WhatsApp, then paste it and attach your proof. Staff can verify payment only after you send those details. Make sure the transaction ID and the bKash/Nagad sender number are visible. Never share your PIN or OTP.
          </div>
          <p className="mt-4 text-xs leading-relaxed text-bone-500">Privacy: this website does not create accounts, track orders, or store payment details. These details stay in the current page session and disappear when you refresh, navigate away, or close the tab.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={backToProducts} className="btn btn-ghost">Back to products</button>
      </div>
    </div>
  );
}

```

## `src/components/prestige/clock.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useEffects } from '@/components/effects-provider';

const FORMAT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** A desktop clock, or a static time-zone label when effects are disabled. */
export function StoreClock({ className = '' }: { className?: string }) {
  const { enabled } = useEffects();
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    if (!enabled) return;
    const tick = () => setTime(FORMAT.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [enabled]);

  return (
    <span className={`store-clock ${className}`} title="Bangladesh Standard Time (UTC+6)">
      <span className="store-clock__dot" aria-hidden="true" />
      <span className="store-clock__label">UTC+6</span>
      <span className="store-clock__time">{enabled ? time : 'Dhaka'}</span>
    </span>
  );
}

```

## `src/components/prestige/count-up.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useEffects } from '@/components/effects-provider';

/**
 * Counts up to a number the first time it scrolls into view (or immediately on
 * the home screen). The server renders the final value, so crawlers and
 * no-JavaScript visitors always see the real number; the animation only starts
 * on the client.
 */
export function CountUp({
  value,
  duration = 1100,
  className = '',
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || value <= 0 || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }
    setDisplay(0);

    let started = false;
    let raf = 0;
    let timer = 0;

    // Safety nets, independent of animation frames: the true number is always
    // reached, even if the browser throttles rAF or the observer never fires.
    const snap = window.setTimeout(() => setDisplay(value), duration + 1500);
    const kick = window.setTimeout(() => {
      if (!started) run();
    }, 700);

    const run = () => {
      started = true;
      const begin = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - begin) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.max(0, Math.min(value, Math.round(value * eased))));
        if (progress < 1) raf = window.requestAnimationFrame(step);
      };
      raf = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          observer.disconnect();
          window.clearTimeout(kick);
          timer = window.setTimeout(run, 180);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(kick);
      window.clearTimeout(snap);
    };
  }, [enabled, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {enabled ? display : value}
    </span>
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

## `src/components/prestige/magnetic.tsx`

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';

/** A gentle magnetic pull towards the pointer — used on primary buttons. */
export function Magnetic({
  children,
  strength = 8,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      node.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
      node.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const wake = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      targetX = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength;
      targetY = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength;
      wake();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      wake();
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      window.cancelAnimationFrame(raf);
      node.style.removeProperty('--mag-x');
      node.style.removeProperty('--mag-y');
    };
  }, [enabled, strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      <span className="magnetic__inner">{children}</span>
    </span>
  );
}

```

## `src/components/prestige/parallax.tsx`

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';
import { watchMediaQuery } from '@/lib/effects';

/**
 * Soft scroll parallax. Desktop only, and only when motion is welcome: the
 * element drifts a few pixels against the scroll to add depth. It never changes
 * layout, so headings and buttons stay exactly where they were.
 */
export function Parallax({
  children,
  speed = 22,
  className = '',
}: {
  children: ReactNode;
  /** Maximum drift in pixels. */
  speed?: number;
  className?: string;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    const wide = window.matchMedia('(min-width: 1024px)');

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wide.matches) {
        node.style.removeProperty('transform');
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = Math.max(-1.5, Math.min(1.5, progress)) * speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const stopQuery = watchMediaQuery(wide, onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      stopQuery();
      window.cancelAnimationFrame(raf);
      node.style.transform = '';
    };
  }, [enabled, speed]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}

```

## `src/components/prestige/pointer.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useEffects } from '@/components/effects-provider';

/**
 * Bespoke pointer for mouse/trackpad visitors: a precise crimson dot with a
 * lagging ring. The ring grows over anything interactive and can show a short
 * label (data-cursor-label) — product cards use it to say "View".
 *
 * It switches itself off for touch screens, "reduce motion" visitors and old
 * browsers, in which case the normal system cursor stays visible.
 */
export function PointerLayer() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const { enabled } = useEffects();

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add('has-pointer');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf = 0;
    let seen = false;
    let hovered: Element | null = null;

    const paint = () => {
      raf = 0;
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;

      if (Math.abs(x - ringX) + Math.abs(y - ringY) > 0.2) {
        raf = window.requestAnimationFrame(paint);
      }
    };

    const wake = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    const setState = (target: Element | null) => {
      const interactive =
        target && target.closest
          ? target.closest(
              'a, button, [role="button"], input, select, textarea, summary, [data-cursor]',
            )
          : null;
      if (interactive === hovered) return;
      hovered = interactive;

      if (!interactive) {
        ring.dataset.state = 'idle';
        ring.dataset.label = '';
        return;
      }

      const label = interactive.getAttribute('data-cursor-label');
      if (label) {
        ring.dataset.state = 'label';
        ring.dataset.label = label;
      } else if (interactive.matches('input, textarea')) {
        ring.dataset.state = 'text';
        ring.dataset.label = '';
      } else {
        ring.dataset.state = 'link';
        ring.dataset.label = '';
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!seen) {
        seen = true;
        ringX = x;
        ringY = y;
        root.classList.add('pointer-visible');
      }
      setState(event.target as Element | null);
      wake();
    };

    const onDown = () => root.classList.add('pointer-down');
    const onUp = () => root.classList.remove('pointer-down');
    const onLeave = () => {
      root.classList.remove('pointer-visible');
      seen = false;
    };
    const onEnter = () => {
      if (!seen) return;
      root.classList.add('pointer-visible');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.cancelAnimationFrame(raf);
      root.classList.remove('has-pointer', 'pointer-visible', 'pointer-down');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-layer" aria-hidden="true">
      <div ref={ringRef} className="pointer-ring" data-state="idle" data-label="" />
      <div ref={dotRef} className="pointer-dot" />
    </div>
  );
}

/**
 * A soft light that follows the mouse inside the home hero. It only writes two
 * CSS custom properties. Its frame loop sleeps once the light settles, and
 * the shared policy removes the light and listeners on ineligible devices.
 */
export function HeroSpotlight() {
  const { enabled } = useEffects();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    const host = node?.closest<HTMLElement>('[data-home]');
    if (!host) return;

    let targetX = 62;
    let targetY = 38;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      host.style.setProperty('--spot-x', `${currentX.toFixed(2)}%`);
      host.style.setProperty('--spot-y', `${currentY.toFixed(2)}%`);
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.05) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 100;
      targetY = ((event.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      host.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(raf);
      host.style.removeProperty('--spot-x');
      host.style.removeProperty('--spot-y');
    };
  }, [enabled]);

  return <div ref={ref} className="hero-spotlight" aria-hidden="true" />;
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

## `src/components/prestige/scanlines.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useEffects } from '@/components/effects-provider';

/**
 * PC-only atmosphere: a quiet CRT scanline sheet behind the page content and a
 * short-lived comet trail behind the pointer.
 *
 * Both are decorative, both are opt-in for fine pointers, and both disappear
 * for "reduce motion" visitors. The trail uses a small pool of DOM nodes that
 * is reused, never appended to, so it cannot grow while you move the mouse.
 */
export function CursorTrail({ size = 7, life = 620 }: { size?: number; life?: number }) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const host = ref.current;
    if (!host) return;

    const COUNT = 14;
    const nodes = Array.from({ length: COUNT }, () => {
      const dot = document.createElement('span');
      dot.className = 'trail-dot';
      host.appendChild(dot);
      return dot;
    });

    let cursor = 0;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const paint = () => {
      raf = 0;
      const dx = pendingX - lastX;
      const dy = pendingY - lastY;
      if (Math.abs(dx) + Math.abs(dy) < 2) return;
      lastX = pendingX;
      lastY = pendingY;

      const dot = nodes[cursor];
      cursor = (cursor + 1) % COUNT;
      dot.style.setProperty('--tx', `${pendingX.toFixed(1)}px`);
      dot.style.setProperty('--ty', `${pendingY.toFixed(1)}px`);
      dot.classList.remove('is-fading');
      // Force the fade to restart even when a pooled dot is reused quickly.
      void dot.offsetWidth;
      dot.classList.add('is-fading');
    };

    const onMove = (event: PointerEvent) => {
      pendingX = event.clientX;
      pendingY = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(raf);
      for (const node of nodes) node.remove();
    };
  }, [enabled, life]);

  return <div ref={ref} className="trail" aria-hidden="true" style={{ ['--trail-size' as string]: `${size}px`, ['--trail-life' as string]: `${life}ms` }} />;
}

/** Scanline sheet + slow beam. Rendered only on the PC catalogue. */
export function Scanlines() {
  return (
    <div className="fx-screen" aria-hidden="true">
      <div className="fx-screen__lines" />
      <div className="fx-screen__beam" />
      <div className="fx-screen__vignette" />
    </div>
  );
}

```

## `src/components/prestige/scroll-hud.tsx`

```tsx
'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { useEffects } from '@/components/effects-provider';

const CIRCUMFERENCE = 2 * Math.PI * 17;

/**
 * Two small pieces of interface chrome:
 *  - a hairline progress bar under the header,
 *  - a "back to top" button with a progress ring that fades in after the first
 *    screen. Both stay hidden on the compact home page.
 */
export function ScrollHud() {
  const { enabled } = useEffects();
  const barRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const topRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (enabled && barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      if (enabled && ringRef.current) {
        ringRef.current.style.strokeDashoffset = `${(CIRCUMFERENCE * (1 - progress)).toFixed(2)}`;
      }
      if (topRef.current) {
        const show = window.scrollY > window.innerHeight * 0.75;
        topRef.current.dataset.show = show ? 'true' : 'false';
        topRef.current.tabIndex = show ? 0 : -1;
      }
    };

    const onScroll = () => {
      if (!enabled) update();
      else if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(raf);
      barRef.current?.style.removeProperty('transform');
      ringRef.current?.style.removeProperty('stroke-dashoffset');
    };
  }, [enabled]);

  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis;
    if (enabled && lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: enabled ? 'smooth' : 'instant' });
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>

      <a
        ref={topRef}
        href="#main"
        onClick={backToTop}
        className="to-top"
        data-show="false"
        tabIndex={-1}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle className="to-top__track" cx="20" cy="20" r="17" />
          <circle
            ref={ringRef}
            className="to-top__ring"
            cx="20"
            cy="20"
            r="17"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <span className="to-top__arrow" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="M10 15V5m0 0-4.2 4.2M10 5l4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </>
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

## `src/components/prestige/site-intro.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useEffects } from '@/components/effects-provider';
import { STORE_NAME, STORE_NAME_KANJI, STORE_TAGLINE } from '@/data/store';

/**
 * First-visit curtain, pre-paint opt-in for eligible desktop visitors only.
 * It never blocks clicks. Disabling effects dismisses it, cancels its timer,
 * and prevents it replaying when preferences change back.
 */
export function SiteIntro() {
  const { enabled, ready } = useEffects();
  const played = useRef(false);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    if (!enabled) {
      delete root.dataset.intro;
      return;
    }
    if (played.current) return;
    played.current = true;

    // The preview flag never overrides the shared accessibility policy.
    if (new URLSearchParams(window.location.search).get('intro') === '1') root.dataset.intro = '1';
    if (root.dataset.intro !== '1') return;

    const dismiss = () => {
      delete root.dataset.intro;
      try {
        sessionStorage.setItem('abn-intro-seen', '1');
      } catch {
        // Storage is optional; this mount still cannot replay the curtain.
      }
    };
    const timer = window.setTimeout(dismiss, 2050);
    return () => {
      window.clearTimeout(timer);
      dismiss();
    };
  }, [enabled, ready]);

  return (
    <div className="site-intro" aria-hidden="true">
      <span className="site-intro__panel site-intro__panel--top" />
      <span className="site-intro__panel site-intro__panel--bottom" />

      <div className="site-intro__core">
        <span className="site-intro__mark">
          <span className="site-intro__frame" />
          <span className="site-intro__kanji">{STORE_NAME_KANJI}</span>
        </span>
        <span className="site-intro__name">{STORE_NAME}</span>
        <span className="site-intro__bar">
          <i />
        </span>
        <span className="site-intro__tag">{STORE_TAGLINE}</span>
      </div>
    </div>
  );
}

```

## `src/components/prestige/split-text.tsx`

```tsx
'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react';
import { useEffects } from '@/components/effects-provider';

type SplitTextProps = {
  /** Words are revealed one by one. Use \n to force a new line. */
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  /** Runs as soon as the component mounts instead of waiting for scroll. */
  playOnMount?: boolean;
  /** Milliseconds of extra delay before the first word. */
  delay?: number;
  /** Milliseconds between words. */
  stagger?: number;
};

/**
 * A tiny, dependency-free text reveal: every word sits in its own mask and
 * slides up with a stagger. The visible text is duplicated for screen readers
 * via aria-label, so the effect never hurts accessibility or search engines,
 * and without JavaScript the words are simply visible.
 */
export function SplitText({
  text,
  as,
  className = '',
  wordClassName = '',
  playOnMount = false,
  delay = 0,
  stagger = 55,
}: SplitTextProps) {
  const Tag = (as ?? 'span') as ElementType;
  const { enabled } = useEffects();
  const ref = useRef<HTMLElement | null>(null);
  const played = useRef(false);
  const [shown, setShown] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || played.current) {
      setArmed(false);
      setShown(true);
      return;
    }

    const show = () => {
      played.current = true;
      setShown(true);
    };
    if (playOnMount) {
      setArmed(true);
      setShown(false);
      const timer = window.setTimeout(show, 40);
      return () => window.clearTimeout(timer);
    }

    const rect = node.getBoundingClientRect();
    if (typeof IntersectionObserver === 'undefined' || (rect.top < window.innerHeight && rect.bottom > 0)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    observer.observe(node);
    setArmed(true);
    setShown(false);
    return () => observer.disconnect();
  }, [enabled, playOnMount]);

  const lines = text.split('\n');
  let wordIndex = 0;

  return (
    <Tag
      ref={ref}
      data-split-ready={enabled && armed ? 'true' : 'false'}
      className={`split-text ${shown ? 'is-shown' : ''} ${className}`}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ').filter(Boolean);
        return (
          <span className="split-line" key={`line-${lineIndex}`} aria-hidden="true">
            {words.map((word, index) => {
              const current = wordIndex++;
              return (
                <Fragment key={`${word}-${index}`}>
                  <span className="split-word">
                    <span
                      className={`split-word-inner ${wordClassName}`}
                      style={
                        {
                          '--i': current,
                          '--stagger': `${stagger}ms`,
                          '--split-delay': `${delay}ms`,
                        } as CSSProperties
                      }
                    >
                      {word}
                    </span>
                  </span>
                  {index < words.length - 1 ? ' ' : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

```

## `src/components/prestige/tilt.tsx`

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';

/**
 * A 3D card shell. It writes --rx / --ry / --mx / --my and CSS does the rest,
 * so hover feels like a physical object without a single frame of layout work.
 * Phones, keyboards and "reduce motion" keep a perfectly flat card.
 */
export function Tilt({
  children,
  className = '',
  max = 6,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  glare?: boolean;
}) {
  const { enabled } = useEffects();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    let rect: DOMRect | null = null;
    const measure = () => {
      rect = node.getBoundingClientRect();
    };

    const onEnter = () => {
      measure();
      node.classList.add('is-tilting');
    };

    const onMove = (event: PointerEvent) => {
      if (!rect) measure();
      if (!rect) return;
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      node.style.setProperty('--rx', ((0.5 - py) * max).toFixed(2) + 'deg');
      node.style.setProperty('--ry', ((px - 0.5) * max * 1.25).toFixed(2) + 'deg');
      node.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      node.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    };

    const onLeave = () => {
      rect = null;
      node.classList.remove('is-tilting');
      node.style.setProperty('--rx', '0deg');
      node.style.setProperty('--ry', '0deg');
    };

    node.addEventListener('pointerenter', onEnter);
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', measure);

    return () => {
      node.removeEventListener('pointerenter', onEnter);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', measure);
      node.classList.remove('is-tilting');
      for (const property of ['--rx', '--ry', '--mx', '--my']) node.style.removeProperty(property);
    };
  }, [enabled, max]);

  return (
    <div ref={ref} className={`tilt ${glare ? 'tilt--glare' : ''} ${className}`}>
      {children}
    </div>
  );
}

```

## `src/components/price-list.tsx`

```tsx
'use client';

import type { MouseEvent } from 'react';
import type Lenis from 'lenis';
import type { Product } from '@/data/products';
import { durationHours, isLifetime } from '@/lib/format';
import { ArrowIcon, Chip, PricePair } from '@/components/ui';
import { usePurchaseSelection } from '@/components/purchase-selection';

/**
 * Every configured duration of one product, with its exact price.
 * Each row selects its duration, then follows the existing purchase anchor.
 */
export function PriceList({ product }: { product: Product }) {
  const { duration, setDuration } = usePurchaseSelection();
  const prices = [...product.prices].sort(
    (a, b) => durationHours(a.duration) - durationHours(b.duration),
  );

  const chooseDuration = (event: MouseEvent<HTMLAnchorElement>, next: string) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    setDuration(next);
    if (window.location.hash !== '#purchase') window.history.pushState(null, '', '#purchase');

    // Keep the original anchor URL, but show the selected amount rather than
    // leaving keyboard focus below a long introduction. This is an immediate
    // jump on every device; it adds no touch/reduced-motion scroll animation.
    window.requestAnimationFrame(() => {
      const summary = document.getElementById(`duration-summary-${product.slug}`);
      if (!summary) return;
      const rect = summary.getBoundingClientRect();
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
      const top = Math.max(headerBottom + 16, (window.innerHeight - rect.height) / 2);
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;

      if (lenis) lenis.scrollTo(summary, { immediate: true, offset: -top });
      else window.scrollTo({ top: window.scrollY + rect.top - top, behavior: 'instant' });
      summary.focus({ preventScroll: true });
    });
  };

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink-700/70 px-5 py-4">
        <h2 className="font-display text-base tracking-wide text-bone-50">
          Durations &amp; prices
        </h2>
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-bone-500">
          {prices.length} option{prices.length === 1 ? '' : 's'}
        </span>
      </div>

      <ul className="divide-y divide-ink-700/60">
        {prices.map((price) => {
          const hourly = durationHours(price.duration) < 24;
          const selected = duration === price.duration;
          return (
            <li key={price.duration}>
              <a
                href="#purchase"
                onClick={(event) => chooseDuration(event, price.duration)}
                aria-current={selected ? 'true' : undefined}
                data-selected={selected ? 'true' : 'false'}
                className={`group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-ink-800/70 ${selected ? 'bg-ink-800/70' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-[0.95rem] tracking-wide text-bone-50">
                    {price.duration}
                  </span>
                  {selected ? <span className="sr-only">Selected duration</span> : null}
                  {isLifetime(price.duration) ? <Chip tone="aura">Lifetime</Chip> : null}
                  {hourly ? <Chip>Hourly</Chip> : null}
                </span>

                <span className="flex items-center gap-4">
                  <PricePair usd={price.usd} bdt={price.bdt} className="text-[1.05rem] font-semibold" />
                  <ArrowIcon className="h-4 w-4 text-bone-500 transition-all group-hover:translate-x-1 group-hover:text-crimson-300" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-ink-700/70 bg-ink-900/60 px-5 py-4 text-xs leading-relaxed text-bone-400">
        Only the currencies shown for each duration are listed prices. Confirm the amount and payment method with support before paying.
      </div>
    </div>
  );
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

## `src/components/purchase-selection.tsx`

```tsx
'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type PurchaseSelection = {
  duration: string;
  setDuration: (duration: string) => void;
};

const PurchaseSelectionContext = createContext<PurchaseSelection | null>(null);

/**
 * One local duration selection for the price rows and purchase controls.
 * The product page keys this provider by slug, so another product starts with
 * its own duration. Nothing is stored, sent over the network, or added to URLs.
 */
export function PurchaseSelectionProvider({
  initialDuration,
  children,
}: {
  initialDuration: string;
  children: ReactNode;
}) {
  const [duration, setDuration] = useState(initialDuration);
  const value = useMemo(() => ({ duration, setDuration }), [duration]);

  return (
    <PurchaseSelectionContext.Provider value={value}>
      {children}
    </PurchaseSelectionContext.Provider>
  );
}

export function usePurchaseSelection() {
  const selection = useContext(PurchaseSelectionContext);
  if (!selection) throw new Error('Purchase controls must be inside PurchaseSelectionProvider.');
  return selection;
}

```

## `src/components/reveal.tsx`

```tsx
'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { useEffects } from '@/components/effects-provider';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Server output is always visible. Only off-screen content with an attached
 * observer opts into a reveal. Disabling effects makes everything visible.
 */
export function Reveal({ children, delay = 0, className = '', as }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const { enabled } = useEffects();
  const ref = useRef<HTMLElement | null>(null);
  const revealed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof IntersectionObserver === 'undefined') {
      setArmed(false);
      setVisible(true);
      return;
    }

    // Never hide content that the visitor is already reading.
    const rect = node.getBoundingClientRect();
    if (revealed.current || (rect.top < window.innerHeight && rect.bottom > 0)) {
      revealed.current = true;
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealed.current = true;
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    setVisible(false);
    setArmed(true);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <Tag
      ref={ref}
      data-reveal-ready={enabled && armed ? 'true' : 'false'}
      data-visible={visible ? 'true' : 'false'}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
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

## `src/components/smooth-scroll.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useEffects } from '@/components/effects-provider';
import { watchMediaQuery } from '@/lib/effects';

/**
 * Buttery desktop scrolling.
 *
 * - Runs ONLY on desktop-class devices (wide screen + mouse/trackpad) and only
 *   when the visitor has not asked for reduced motion. Phones and tablets keep
 *   their own native touch scrolling, which is already the best there is.
 * - It is real document scrolling underneath (no nested scroll box, no snap, no
 *   hijacked wheel events), so the scrollbar, Page Down, Space, Home/End, find
 *   in page and the browser's back/forward position all behave normally.
 * - Anchor links (#catalog, #payments ...) glide to their target.
 * - Anything inside a `[data-lenis-prevent]` element keeps native scrolling
 *   (use it on inner scroll boxes such as menus).
 */
export function SmoothScroll() {
  const { enabled } = useEffects();
  useEffect(() => {
    if (!enabled) return;
    const query = window.matchMedia('(min-width: 1024px)');

    let lenis: Lenis | null = null;
    let frame = 0;
    let removeAnchors: (() => void) | null = null;

    const raf = (time: number) => {
      lenis?.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        // Lower = longer glide. 0.085 is soft but never feels laggy.
        lerp: 0.085,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
      });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      if (document.documentElement.classList.contains('scroll-locked')) lenis.stop();
      frame = window.requestAnimationFrame(raf);

      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
        if (!anchor || anchor.target === '_blank') return;
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
        if (!url.hash || url.hash === '#') return;
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        lenis?.scrollTo(target, { offset: -88, duration: 1.4 });
        window.history.pushState(null, '', url.hash);
      };
      document.addEventListener('click', onClick);
      removeAnchors = () => document.removeEventListener('click', onClick);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      removeAnchors?.();
      removeAnchors = null;
      lenis?.destroy();
      lenis = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };

    const sync = () => (query.matches ? start() : stop());
    sync();
    const stopQuery = watchMediaQuery(query, sync);
    return () => {
      stopQuery();
      stop();
    };
  }, [enabled]);

  return null;
}

```

## `src/components/support-panel.tsx`

```tsx
import Link from 'next/link';
import { DISCORD_URL, TELEGRAM_URL, WHATSAPP_URL } from '@/data/store';
import { resolveSupportLink } from '@/lib/links';
import { ArrowIcon } from '@/components/ui';

function DiscordIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M7.6 17.2c-1.4-.4-3.1-1.2-3.1-1.2.6-3.2 1.9-6.1 3.6-8.4l1.9-.6 1 1.7a13 13 0 0 1 4 0l1-1.7 1.9.6c1.7 2.3 3 5.2 3.6 8.4 0 0-1.7.8-3.1 1.2l-1-1.7c.7-.2 1.4-.6 2-1.1a9.6 9.6 0 0 1-9.8 0c-.6.5-1.3.9-2 1.1l-1 1.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="9.4" cy="12.4" r="1.2" fill="currentColor" />
      <circle cx="14.6" cy="12.4" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20.4 4.3 3.9 10.6c-1 .4-1 1.7.1 1.9l3.9.9 1.5 4.6c.3.9 1.1 1 1.7.4l2.1-2 3.7 2.7c.7.5 1.6.1 1.8-.8l2.4-12.4c.2-1-.6-1.7-1.7-1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.2 13.1 17 6.6l-6.4 7.2-.3 3.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M20.1 11.7a8.1 8.1 0 0 1-11.9 7.1L3 20l1.3-5a8.1 8.1 0 1 1 15.8-3.3Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.6 7.9c-.3-.6-.6-.6-.9-.6h-.5c-.2 0-.6.1-.9.5s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2c.2.2 2.1 3.3 5.2 4.5 2.6 1 3.1.8 3.7.7.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.7-.4l-2.1-1c-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2Z" fill="currentColor" transform="translate(2 0) scale(.82)" />
    </svg>
  );
}

type Channel = {
  id: string;
  label: string;
  title: string;
  body: string;
  href?: string;
  configured: boolean;
  icon: typeof DiscordIcon;
  accentClass: string;
  buttonClass: string;
  buttonLabel: string;
};

export function SupportPanel({
  productName,
  className = '',
}: {
  productName?: string;
  className?: string;
}) {
  const discord = resolveSupportLink(DISCORD_URL);
  const telegram = resolveSupportLink(TELEGRAM_URL);
  const whatsapp = resolveSupportLink(WHATSAPP_URL);

  const channels: Channel[] = [
    {
      id: 'discord',
      label: 'Discord',
      title: 'Discord support',
      body: productName
        ? `Open a message and send us "${productName}" with the duration you want — we confirm the price and payment before anything else.`
        : 'Send us a message with the product, duration and payment details — we confirm everything before you pay.',
      href: discord.href,
      configured: discord.configured,
      icon: DiscordIcon,
      accentClass: 'from-[#5865F2]/18 to-transparent',
      buttonClass: 'btn-primary',
      buttonLabel: 'Open Discord',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      title: 'Telegram support',
      body: productName
        ? `Prefer Telegram? Confirm "${productName}", the duration and payment amount before paying. If you have already paid, send your summary and proof here.`
        : 'Prefer Telegram? Confirm the product, duration and amount before paying. After payment, send your summary and proof here.',
      href: telegram.href,
      configured: telegram.configured,
      icon: TelegramIcon,
      accentClass: 'from-[#2AABEE]/16 to-transparent',
      buttonClass: 'btn-aura',
      buttonLabel: 'Open Telegram',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      title: 'WhatsApp support',
      body: productName
        ? `Message us on WhatsApp to confirm "${productName}", the duration and amount before paying. If you have already paid, send your summary and proof here.`
        : 'Message us on WhatsApp to confirm the product, duration and amount before paying. After payment, send your summary and proof here.',
      href: whatsapp.href,
      configured: whatsapp.configured,
      icon: WhatsAppIcon,
      accentClass: 'from-[#25D366]/18 to-transparent',
      buttonClass: 'btn-aura',
      buttonLabel: 'Open WhatsApp',
    },
  ];

  return (
    <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${className}`}>
      {channels.map((channel) => {
        const Icon = channel.icon;
        return (
          <article key={channel.id} className="panel lift relative overflow-hidden p-6 sm:p-7">
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${channel.accentClass}`}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-600/80 bg-ink-900/80 text-bone-100">
                  <Icon />
                </span>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-bone-50">{channel.title}</h3>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-bone-500">
                    {channel.label}
                  </p>
                </div>
              </div>
              <span className="chip">{channel.label}</span>
            </div>

            <p className="relative mt-5 text-sm leading-relaxed text-bone-300">{channel.body}</p>

            <div className="relative mt-6">
              {channel.configured && channel.href ? (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`btn ${channel.buttonClass} w-full sm:w-auto`}
                >
                  {channel.buttonLabel}
                  <ArrowIcon className="h-4 w-4" />
                </a>
              ) : (
                <div className="rounded-xl border border-dashed border-ink-500/70 bg-ink-900/60 p-4">
                  <button type="button" className="btn btn-ghost w-full sm:w-auto" disabled>
                    {channel.buttonLabel}
                  </button>
                  <p className="mt-3 text-xs leading-relaxed text-bone-500">
                    This channel is unavailable right now — please use the other support option, or
                    try again a little later.
                  </p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** What a buyer should include in their message — shown next to the channels. */
export function ContactChecklist({ productName }: { productName?: string }) {
  const items = [
    productName ? `Product: ${productName}` : 'Product name',
    'The exact duration you want',
    'The price shown on the product page',
    'Payment method you plan to use, or already used (bKash / Nagad / Binance)',
    'If you have already paid: your transaction ID and payment proof',
  ];

  return (
    <div className="panel-quiet p-6">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-bone-400">
        What to send us
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-bone-200">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500 shadow-[0_0_10px_rgba(232,16,47,0.9)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-ink-700/70 pt-4 text-xs leading-relaxed text-bone-500">
        Never send a PIN, password, OTP or wallet private key.{' '}
        <Link href="/payments" className="text-crimson-300 underline decoration-crimson-700/70 underline-offset-4 hover:text-crimson-200">
          See payment details
        </Link>
        .
      </p>
    </div>
  );
}

```

## `src/components/theme-controller.tsx`

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_THEME, isTheme, themeForPath, type ThemeId } from '@/lib/themes';
import { useEffects } from '@/components/effects-provider';

/**
 * Watches which [data-theme-section] is under the middle of the screen and
 * switches <html data-theme>. The theme always works; its colour transition
 * and ripple are decoration, enabled only by the shared effects policy.
 */
export function ThemeController() {
  const pathname = usePathname();
  const { enabled } = useEffects();
  const [burst, setBurst] = useState(0);
  const current = useRef<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    if (!enabled) setBurst(0);
    const apply = (next: ThemeId) => {
      if (next === current.current) return;
      current.current = next;
      document.documentElement.dataset.theme = next;
      if (enabled) setBurst((n) => n + 1);
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme-section]'));
    if (sections.length === 0) {
      apply(themeForPath(pathname));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight * 0.5;
      let found: string | undefined;
      // later elements in the DOM are the more deeply nested ones, so they win
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) found = el.dataset.themeSection;
      }
      if (isTheme(found)) apply(found);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, enabled]);

  return enabled && burst > 0 ? <div key={`ripple-${burst}`} aria-hidden="true" className="theme-ripple" /> : null;
}

```

## `src/components/use-hydrated.ts`

```ts
'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Keep JavaScript-only controls disabled until their handlers are available. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

```

## `src/data/store.ts`

```ts
/**
 * ============================================================================
 *  STORE CONFIGURATION
 * ============================================================================
 *  This is the file you edit to make the store *yours*.
 *
 *  Everything here is public information — it is sent to every visitor's
 *  browser. Never put passwords, API keys or private data in this file.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. BRANDING
 * ------------------------------------------------------------------------ */

/** Store name shown in the logo, the page titles and the footer. */
export const STORE_NAME = 'ABNORMAL';

/** Short Japanese subtitle printed under the logo. Purely decorative. */
export const STORE_NAME_KANJI = '異常';

/** One-line positioning statement used in the hero and in SEO metadata. */
export const STORE_TAGLINE = 'Premium products for PC, Android & iOS';

/** Short paragraph shown under the hero headline. */
export const STORE_DESCRIPTION =
  'A curated catalog of PC, Android and iOS products with clear, fixed pricing in USD and BDT. Browse everything, then finish your order directly with our team.';

/** ⚠️ Replace with your real public URL after you deploy (used for SEO tags + sitemap). */
export const STORE_URL = 'https://your-store.vercel.app';

/* ---------------------------------------------------------------------------
 * 2. SUPPORT LINKS
 * ------------------------------------------------------------------------ */

/** Discord invite link. */
export const DISCORD_URL = 'https://discord.gg/abnormal';

/** Telegram support link. */
export const TELEGRAM_URL = 'https://t.me/ARAFATMooDZ';

/** WhatsApp support link. */
export const WHATSAPP_URL = 'https://wa.me/message/4FO2O2VCWZZQB1';

/* ---------------------------------------------------------------------------
 * 3. PAYMENT METHODS
 * ------------------------------------------------------------------------ */

export type PaymentMethod = {
  id: 'bkash' | 'nagad' | 'binance';
  /** Currency accepted for the listed amount; never an exchange-rate conversion. */
  currency: 'BDT' | 'USD';
  /** Method name, e.g. 'bKash'. */
  name: string;
  /** Optional label under the name, e.g. 'Personal'. */
  kind?: string;
  /** Label for the value row, e.g. 'Account' or 'Account ID'. */
  fieldLabel: string;
  /** The exact value a visitor must copy. */
  value: string;
  /** Short guidance line shown inside the payment card. */
  note: string;
  /** Accent colour of the card. */
  accent: 'crimson' | 'violet' | 'amber';
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bkash',
    currency: 'BDT',
    name: 'bKash',
    kind: 'Personal',
    fieldLabel: 'Account',
    value: '+880 1629-835648',
    note: 'Personal account — send the exact amount, then keep the transaction ID.',
    accent: 'crimson',
  },
  {
    id: 'nagad',
    currency: 'BDT',
    name: 'Nagad',
    fieldLabel: 'Account',
    value: '+880 1629-835648',
    note: 'Send the exact amount, then keep the transaction ID.',
    accent: 'violet',
  },
  {
    id: 'binance',
    currency: 'USD',
    name: 'Binance',
    fieldLabel: 'Account ID',
    value: '1220374728',
    note: 'Binance Pay / internal transfer. Keep the transaction ID after sending.',
    accent: 'amber',
  },
];

/** Safety line printed next to every payment card. */
export const PAYMENT_SAFETY_NOTE =
  'We never ask for your PIN, password, OTP or wallet private key. Always confirm the product, duration and exact price with support before you pay.';

/* ---------------------------------------------------------------------------
 * 4. CATALOG BEHAVIOUR
 * ------------------------------------------------------------------------ */

/**
 * Sorting-only exchange rate.
 *
 * Some products are priced in USD, others only in BDT. To be able to sort a
 * mixed list by price we need one common number. This rate is used ONLY to
 * order results — it is never displayed anywhere and never changes a price
 * you configured in `src/data/products.ts`.
 */
export const SORT_BDT_PER_USD = 120;

/** How many products the "Featured" shelf on the homepage shows. */
export const FEATURED_LIMIT = 6;

/* ---------------------------------------------------------------------------
 * 5. NAVIGATION
 * ------------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'PC', href: '/pc' },
  { label: 'Android', href: '/android' },
  { label: 'iOS', href: '/ios' },
  { label: 'Payments', href: '/payments' },
  { label: 'Support', href: '/support' },
] as const;

/** Extra link used by the hero and the footer. */
export const CATALOG_HREF = '/products';

/* ---------------------------------------------------------------------------
 * 6. SHORT COPY BLOCKS (edit freely — these are your words, not data)
 * ------------------------------------------------------------------------ */

export const ORDER_STEPS = [
  {
    title: 'Confirm with support before paying',
    body: 'Choose the exact product and duration. Ask support to confirm availability, the listed amount and the payment method before you send money.',
  },
  {
    title: 'Send the confirmed payment',
    body: 'After support confirms, send the exact amount to the selected bKash, Nagad or Binance account. Keep the transaction ID and, for bKash/Nagad, the sender phone number.',
  },
  {
    title: 'Prepare your payment summary',
    body: 'Choose the duration and payment method you used, then enter the transaction ID and sender number if required. This website only prepares a local summary; nothing is sent to support.',
  },
  {
    title: 'Send the summary and proof to support',
    body: 'Copy the summary, then create a Discord ticket or message us on Telegram or WhatsApp. Paste the details and attach your payment proof. Staff verify payment manually before delivery.',
  },
] as const;

export const FOOTER_NOTE =
  'Availability and delivery are confirmed by support before any payment is completed.';

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

## `src/lib/effects.ts`

```ts
/** One capability policy for the pre-paint script and hydrated effects. */
export const EFFECTS_MEDIA = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)';
export const TOUCH_MEDIA = '(any-pointer: coarse)';

export type EffectsCapabilities = {
  eligibleMedia: boolean;
  coarsePointer: boolean;
  maxTouchPoints: number | undefined;
  touchSeen?: boolean;
};

/** Unknown capabilities and hybrid touch/mouse devices stay static. */
export function canEnableEffects({
  eligibleMedia,
  coarsePointer,
  maxTouchPoints,
  touchSeen = false,
}: EffectsCapabilities): boolean {
  return eligibleMedia && !coarsePointer && maxTouchPoints === 0 && !touchSeen;
}

/**
 * Runs before paint. Static is the default, including when an API is missing.
 * Storage is optional: blocking it must not block the page or motion policy.
 * Tests keep this tiny browser script in agreement with canEnableEffects.
 */
export const EFFECTS_BOOT_SCRIPT = `(function(){
var d=document.documentElement;d.classList.add('js');d.dataset.effects='off';
try{if(window.matchMedia('${EFFECTS_MEDIA}').matches&&!window.matchMedia('${TOUCH_MEDIA}').matches&&navigator.maxTouchPoints===0){
d.dataset.effects='on';try{if(!sessionStorage.getItem('abn-intro-seen'))d.dataset.intro='1';}catch(e){}
}}catch(e){}
})();`;

/** Support both current media-query events and the older Safari listener API. */
export function watchMediaQuery(query: MediaQueryList, onChange: () => void): () => void {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }
  query.addListener(onChange);
  return () => query.removeListener(onChange);
}

```

## `src/lib/order-summary.ts`

```ts
import type { OrderDetails } from '@/components/order-context';

/** Plain text for the buyer to copy and send; this function submits nothing. */
export function formatOrderSummary(order: Readonly<OrderDetails>): string {
  return [
    'ABNORMAL — Payment summary for support',
    `Local support reference: ${order.reference}`,
    `Product: ${order.productName}`,
    `Platform: ${order.platform.toUpperCase()}`,
    `Duration: ${order.duration}`,
    `Payment amount: ${order.priceLabel}`,
    `Payment method: ${order.paymentMethod.toUpperCase()}`,
    `Payment destination: ${order.paymentDestination}`,
    order.senderNumber ? `Payment sender phone number: ${order.senderNumber}` : 'Payment sender phone number: Not required for Binance',
    `Transaction ID/number: ${order.transactionId}`,
    'Website status: Prepared locally; not automatically sent to support.',
    'Please verify my payment. I will attach my payment proof screenshot. Thank you.',
  ].join('\n');
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

## `src/lib/purchase.ts`

```ts
import type { PriceOption } from '@/data/products';
import { PAYMENT_METHODS, type PaymentMethod } from '@/data/store';
import { formatBdt, formatUsd } from '@/lib/format';

export type PaymentOption = {
  method: PaymentMethod;
  amount: number;
  amountLabel: string;
};

/**
 * Only offer a payment method when this exact duration has a usable amount in
 * that method's currency. Missing prices are never inferred or converted.
 */
export function getPaymentOptions(
  price: PriceOption | undefined,
  methods: readonly PaymentMethod[] = PAYMENT_METHODS,
): PaymentOption[] {
  if (!price) return [];

  return methods.flatMap((method) => {
    const amount = method.currency === 'BDT' ? price.bdt : price.usd;
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return [];

    const formatted = method.currency === 'BDT' ? formatBdt(amount) : formatUsd(amount);
    return [{ method, amount, amountLabel: `${formatted} ${method.currency}` }];
  });
}

/** Keep a buyer's choice if it is still valid; otherwise use a listed option. */
export function selectPaymentOption(
  options: readonly PaymentOption[],
  preferredMethodId: string,
): PaymentOption | undefined {
  return options.find((option) => option.method.id === preferredMethodId) ?? options[0];
}

```

## `tests/effects.test.ts`

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runInNewContext } from 'node:vm';
import { canEnableEffects, EFFECTS_BOOT_SCRIPT, EFFECTS_MEDIA, TOUCH_MEDIA, watchMediaQuery } from '../src/lib/effects.ts';

function boot({
  eligible = true,
  coarse = false,
  touches = 0 as number | undefined,
  seen = false,
  storageBlocked = false,
  mediaMissing = false,
} = {}) {
  const dataset: Record<string, string> = {};
  const classes = new Set<string>();
  let storageReads = 0;
  runInNewContext(EFFECTS_BOOT_SCRIPT, {
    document: { documentElement: { dataset, classList: { add: (name: string) => classes.add(name) } } },
    navigator: { maxTouchPoints: touches },
    window: {
      matchMedia: mediaMissing ? undefined : (query: string) => ({
        matches: query === EFFECTS_MEDIA ? eligible : query === TOUCH_MEDIA ? coarse : false,
      }),
    },
    sessionStorage: {
      getItem: () => {
        storageReads += 1;
        if (storageBlocked) throw new Error('Storage blocked');
        return seen ? '1' : null;
      },
    },
  });
  return { dataset, classes, storageReads };
}

describe('static-by-default effects policy', () => {
  it('opts in only a fine, hovering, non-touch device with no motion restriction', () => {
    assert.equal(canEnableEffects({ eligibleMedia: true, coarsePointer: false, maxTouchPoints: 0 }), true);
  });

  it('rejects reduced-motion / non-hovering / non-fine media', () => {
    assert.equal(canEnableEffects({ eligibleMedia: false, coarsePointer: false, maxTouchPoints: 0 }), false);
  });

  it('rejects both coarse pointers and touch laptops with a mouse', () => {
    assert.equal(canEnableEffects({ eligibleMedia: true, coarsePointer: true, maxTouchPoints: 0 }), false);
    for (const maxTouchPoints of [1, 5, 10]) {
      assert.equal(canEnableEffects({ eligibleMedia: true, coarsePointer: false, maxTouchPoints }), false);
    }
  });

  it('fails closed for unknown touch capabilities and an observed touch input', () => {
    for (const maxTouchPoints of [undefined, NaN, -1]) {
      assert.equal(canEnableEffects({ eligibleMedia: true, coarsePointer: false, maxTouchPoints }), false);
    }
    assert.equal(canEnableEffects({ eligibleMedia: true, coarsePointer: false, maxTouchPoints: 0, touchSeen: true }), false);
  });

  it('keeps the pre-paint script and hydrated policy in agreement', () => {
    for (const eligible of [false, true]) {
      for (const coarse of [false, true]) {
        for (const touches of [0, 1, 5]) {
          const expected = canEnableEffects({ eligibleMedia: eligible, coarsePointer: coarse, maxTouchPoints: touches });
          const result = boot({ eligible, coarse, touches });
          assert.equal(result.dataset.effects, expected ? 'on' : 'off');
          assert.equal(result.dataset.intro, expected ? '1' : undefined);
          assert.equal(result.storageReads, expected ? 1 : 0);
          assert.ok(result.classes.has('js'));
        }
      }
    }
  });

  it('does not show an intro again after it has been seen', () => {
    assert.deepEqual(boot({ seen: true }).dataset, { effects: 'on' });
  });

  it('works without session storage and fails safely without media queries', () => {
    assert.deepEqual(boot({ storageBlocked: true }).dataset, { effects: 'on' });
    assert.deepEqual(boot({ mediaMissing: true }).dataset, { effects: 'off' });
  });
});

describe('media-query subscription cleanup', () => {
  it('subscribes and unsubscribes with the current event API', () => {
    const target = new EventTarget();
    const query = target as unknown as MediaQueryList;
    let calls = 0;
    const stop = watchMediaQuery(query, () => { calls += 1; });
    target.dispatchEvent(new Event('change'));
    assert.equal(calls, 1);
    stop();
    target.dispatchEvent(new Event('change'));
    assert.equal(calls, 1);
  });

  it('also cleans up the older Safari listener API', () => {
    const listeners = new Set<() => void>();
    const query = {
      addListener: (listener: () => void) => listeners.add(listener),
      removeListener: (listener: () => void) => listeners.delete(listener),
    } as unknown as MediaQueryList;
    let calls = 0;
    const stop = watchMediaQuery(query, () => { calls += 1; });
    for (const listener of listeners) listener();
    assert.equal(calls, 1);
    stop();
    assert.equal(listeners.size, 0);
  });
});

```

## `tests/order-summary.test.ts`

```ts
import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import type { OrderDetails } from '../src/components/order-context.tsx';
import { ORDER_STEPS } from '../src/data/store.ts';
import { formatOrderSummary } from '../src/lib/order-summary.ts';

const draft: OrderDetails = {
  reference: 'ABN-TEST-ONLY',
  productSlug: 'br-mods-pc',
  productName: 'BR MODS PC',
  platform: 'pc',
  duration: '10 Days',
  priceLabel: '৳399 BDT',
  paymentMethod: 'bkash',
  paymentDestination: '+880 1629-835648',
  senderNumber: '+8801700000000',
  transactionId: 'TEST-NO-PAYMENT',
};

describe('truthful local payment summaries', () => {
  it('includes the selected duration, exact amount and payment destination', () => {
    const summary = formatOrderSummary(draft);
    assert.match(summary, /^ABNORMAL — Payment summary for support/);
    assert.ok(summary.includes('Product: BR MODS PC\nPlatform: PC\nDuration: 10 Days'));
    assert.ok(summary.includes('Payment amount: ৳399 BDT'));
    assert.ok(summary.includes('Payment method: BKASH'));
    assert.ok(summary.includes('Payment destination: +880 1629-835648'));
    assert.ok(summary.includes('Transaction ID/number: TEST-NO-PAYMENT'));
  });

  it('does not imply that the website submitted or verified an order', () => {
    const summary = formatOrderSummary(draft);
    assert.ok(summary.includes('Local support reference: ABN-TEST-ONLY'));
    assert.ok(summary.includes('Prepared locally; not automatically sent to support.'));
    assert.doesNotMatch(summary, /Awaiting manual payment verification|Order confirmed|Payment verified|Order submitted/i);
  });

  it('does not request a sender phone number for Binance', () => {
    const summary = formatOrderSummary({
      ...draft,
      paymentMethod: 'binance',
      paymentDestination: '1220374728',
      priceLabel: '$3 USD',
      senderNumber: '',
    });
    assert.ok(summary.includes('Payment amount: $3 USD'));
    assert.ok(summary.includes('Payment sender phone number: Not required for Binance'));
    assert.ok(!summary.includes(draft.senderNumber));
  });

  it('preserves decimal amounts and does not mutate the local draft', () => {
    const local = Object.freeze({ ...draft, priceLabel: '৳21.12 BDT' });
    const before = JSON.stringify(local);
    assert.ok(formatOrderSummary(local).includes('Payment amount: ৳21.12 BDT'));
    assert.equal(JSON.stringify(local), before);
  });

  it('keeps confirmation before payment and manual sending after preparation', () => {
    assert.deepEqual(ORDER_STEPS.map((step) => step.title), [
      'Confirm with support before paying',
      'Send the confirmed payment',
      'Prepare your payment summary',
      'Send the summary and proof to support',
    ]);
    assert.match(ORDER_STEPS[2].body, /nothing is sent to support/);
  });
});

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

## `tests/purchase.test.ts`

```ts
import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { PRODUCTS, type PriceOption } from '../src/data/products.ts';
import { PAYMENT_METHODS } from '../src/data/store.ts';
import { getPaymentOptions, selectPaymentOption } from '../src/lib/purchase.ts';

const dualCurrency: PriceOption = { duration: '1 Day', usd: 2, bdt: 250 };
const bdtOnly: PriceOption = { duration: '1 Hour', bdt: 21.12 };
const usdOnly: PriceOption = { duration: '1 Year', usd: 5 };

describe('currency-safe payment options', () => {
  it('preserves the exact dual-currency amounts without converting them', () => {
    assert.deepEqual(
      getPaymentOptions(dualCurrency).map(({ method, amount, amountLabel }) => ({
        id: method.id,
        amount,
        amountLabel,
      })),
      [
        { id: 'bkash', amount: 250, amountLabel: '৳250 BDT' },
        { id: 'nagad', amount: 250, amountLabel: '৳250 BDT' },
        { id: 'binance', amount: 2, amountLabel: '$2 USD' },
      ],
    );
  });

  it('offers only Binance for a USD-only option', () => {
    const options = getPaymentOptions(usdOnly);
    assert.deepEqual(options.map((option) => option.method.id), ['binance']);
    assert.equal(options[0].amountLabel, '$5 USD');
  });

  it('offers only bKash and Nagad for a BDT-only option, preserving decimals', () => {
    const options = getPaymentOptions(bdtOnly);
    assert.deepEqual(options.map((option) => option.method.id), ['bkash', 'nagad']);
    assert.ok(options.every((option) => option.amount === 21.12));
    assert.ok(options.every((option) => option.amountLabel === '৳21.12 BDT'));
  });

  it('keeps the preferred method when its currency is still listed', () => {
    assert.equal(selectPaymentOption(getPaymentOptions(dualCurrency), 'nagad')?.method.id, 'nagad');
    assert.equal(selectPaymentOption(getPaymentOptions(bdtOnly), 'nagad')?.method.id, 'nagad');
  });

  it('falls back immediately when a duration no longer supports the preferred method', () => {
    assert.equal(selectPaymentOption(getPaymentOptions(usdOnly), 'bkash')?.method.id, 'binance');
    assert.equal(selectPaymentOption(getPaymentOptions(bdtOnly), 'binance')?.method.id, 'bkash');
  });

  it('does not offer a payment for an absent, non-finite or non-positive amount', () => {
    assert.deepEqual(getPaymentOptions(undefined), []);
    assert.deepEqual(getPaymentOptions({ duration: '1 Day' }), []);
    for (const amount of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      assert.deepEqual(getPaymentOptions({ duration: '1 Day', usd: amount, bdt: amount }), []);
    }
    assert.equal(selectPaymentOption([], 'bkash'), undefined);
  });

  it('keeps a valid currency available when the other configured amount is invalid', () => {
    assert.deepEqual(
      getPaymentOptions({ duration: '1 Day', usd: Number.NaN, bdt: 250 }).map((option) => option.method.id),
      ['bkash', 'nagad'],
    );
  });

  it('does not mutate prices or payment-method configuration', () => {
    const price = Object.freeze({ ...dualCurrency });
    const methods = Object.freeze(PAYMENT_METHODS.map((method) => Object.freeze({ ...method })));
    const before = JSON.stringify({ price, methods });
    getPaymentOptions(price, methods);
    assert.equal(JSON.stringify({ price, methods }), before);
  });

  it('provides only exact configured amounts for every real catalog duration', () => {
    for (const product of PRODUCTS) {
      for (const price of product.prices) {
        const options = getPaymentOptions(price);
        assert.ok(options.length > 0, `${product.slug} / ${price.duration} needs a payment option`);
        for (const option of options) {
          const expected = option.method.currency === 'BDT' ? price.bdt : price.usd;
          assert.equal(option.amount, expected, `${product.slug} / ${price.duration} must not be converted`);
          assert.equal(option.method.value, PAYMENT_METHODS.find((method) => method.id === option.method.id)?.value);
        }
      }
    }
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

## `tests/store-contract.test.ts`

```ts
import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';
import { describe, it } from 'node:test';

import { PRODUCTS } from '../src/data/products.ts';
import {
  CATALOG_HREF,
  DISCORD_URL,
  NAV_LINKS,
  PAYMENT_METHODS,
  SORT_BDT_PER_USD,
  STORE_URL,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from '../src/data/store.ts';
import { themeForPath } from '../src/lib/themes.ts';

/**
 * Phase 1 baseline: every product field, including names, slugs, duration labels,
 * exact prices and configured artwork paths. Change only with owner approval.
 */
const CATALOG_SHA256 = '0fb339034224131a7eb90d8618e005d58ca23fa73d32c3bd29a7902990a2d75b';

describe('protected store contract', () => {
  it('keeps every existing product, duration and price exactly as audited', () => {
    assert.equal(createHash('sha256').update(JSON.stringify(PRODUCTS)).digest('hex'), CATALOG_SHA256);
    assert.equal(PRODUCTS.length, 25);
  });

  it('keeps payment destinations and support URLs unchanged', () => {
    assert.deepEqual(PAYMENT_METHODS.map(({ id, value }) => ({ id, value })), [
      { id: 'bkash', value: '+880 1629-835648' },
      { id: 'nagad', value: '+880 1629-835648' },
      { id: 'binance', value: '1220374728' },
    ]);
    assert.equal(DISCORD_URL, 'https://discord.gg/abnormal');
    assert.equal(TELEGRAM_URL, 'https://t.me/ARAFATMooDZ');
    assert.equal(WHATSAPP_URL, 'https://wa.me/message/4FO2O2VCWZZQB1');
    assert.equal(STORE_URL, 'https://your-store.vercel.app', 'domain replacement requires explicit approval');
    assert.equal(SORT_BDT_PER_USD, 120, 'the sorting-only rate must not change');
  });

  it('keeps existing navigation destinations', () => {
    assert.deepEqual(NAV_LINKS.map((link) => link.href), ['/', '/pc', '/android', '/ios', '/payments', '/support']);
    assert.equal(CATALOG_HREF, '/products');
  });

  it('keeps every existing page route', () => {
    const root = new URL('../src/app/', import.meta.url);
    const pages: string[] = [];
    const visit = (relative = '') => {
      for (const entry of readdirSync(new URL(relative, root), { withFileTypes: true })) {
        const next = `${relative}${entry.name}`;
        if (entry.isDirectory()) visit(`${next}/`);
        else if (entry.name === 'page.tsx') pages.push(next);
      }
    };
    visit();
    assert.deepEqual(pages.sort(), [
      'android/page.tsx',
      'ios/page.tsx',
      'order-confirmation/page.tsx',
      'page.tsx',
      'payments/page.tsx',
      'pc/page.tsx',
      'products/[slug]/page.tsx',
      'products/page.tsx',
      'support/page.tsx',
    ]);
  });

  it('keeps the seven route themes', () => {
    assert.deepEqual(
      ['/', '/pc', '/android', '/ios', '/payments', '/support', '/products', '/order-confirmation'].map(themeForPath),
      ['dendro', 'electro', 'cryo', 'pyro', 'geo', 'anemo', 'hydro', 'hydro'],
    );
  });
});

```
