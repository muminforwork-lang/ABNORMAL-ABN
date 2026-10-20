# ABNORMAL Store — Final handoff

## Approved release scope

Finalized at the owner's request after acceptance of **batches 1–3**. This release completes **11 of 77 actionable recommendations**; the other **66 are deferred**, not silently marked complete. Original recommendation #72 remains withdrawn.

No further application changes were made during finalization. This handoff documents the accepted source, the final checks and the release/deployment process. The pull request's GitHub state is the authoritative record of whether merging has completed.

## Summary of the completed work

1. **Buying flow — #34, #35, #33, #36:** exact-currency payment choices; consistent duration handoff and visible focus; confirmation-before-payment guidance; an honest, memory-only local summary that the customer must personally send to support.
2. **Static-mode safety and home layout — #49, #9, #10, #27:** readable no-JS content/native navigation; effects disabled for touch, reduced motion and no-JS; live cleanup when preferences change; reachable homepage actions on short screens.
3. **Interaction and accessibility — #50, #51, #28:** shared modal focus/isolation/scroll cleanup; Enter submission and linked form validation; an adaptive header/mobile menu with correct current-route and resize handling.

All 25 products, prices, configured payment destinations, existing link destinations and routes are preserved. Theme mappings, character/artwork assets and prior privacy behavior are unchanged. No application dependency was added or upgraded. Tests used synthetic references; no real payment or support message was sent.

## Final verification

- `npm run typecheck` — passed.
- `npm test` — **51 passed, 0 failed**.
- `npm run build` — **40 pages** generated successfully.
- `git diff --check` — passed.
- The accepted batch-3 browser evidence remains in `phase-2-batch-3-checks.json`: all 25 product routes; dialog lifecycle checks; 11 header/text configurations plus resize; form/purchase regressions; no-JS, touch and live-motion checks; eight scoped axe scans with zero violations in those scopes.
- The existing Node module-type warning is nonfatal.

## Actual Lighthouse comparison

Final measurements use Lighthouse **13.5.0**, Chromium **153**, a local production server, a fresh browser profile for every run, and **three-run medians** for each case. Mobile uses 412×823 / DPR 1.75 / 4× CPU / 150ms RTT / 1638.4 Kbps; desktop uses 1440×900 / DPR 1 / 1× CPU / 40ms RTT / 10240 Kbps.

“Before” is the recorded Phase 1 baseline, not a new baseline run. The same stated presets were used, but sandbox load and timing can differ. These are lab observations, **not field/physical-device results or a controlled claim of causation**.

| Case | Performance score | LCP, before → final | TBT, before → final | CLS |
|---|---:|---:|---:|---:|
| Mobile `/` | 44 → **48** | 5.053 → 5.274s | 7.460 → 6.009s | 0 → 0 |
| Mobile `/products` | 44 → **48** | 5.341 → 4.772s | 7.030 → 6.897s | 0 → 0 |
| Mobile `/products/br-mods-pc` | 46 → **49** | 4.818 → 4.621s | 7.054 → 7.922s | 0 → 0 |
| Mobile `/payments` | 45 → **47** | 4.998 → 4.968s | 6.514 → 7.102s | 0 → 0 |
| Desktop `/` | 59 → **62** | 1.135 → 1.049s | 3.798 → 2.913s | 0 → 0 |

Scores improved modestly, but performance is **not finished**: mobile-home LCP and product/payment TBT medians worsened. Do not interpret the functional/accessibility fixes as a complete performance optimization. `final-verification.json` preserves all 15 final run metrics, settings, report hashes and the reproduction script. Large raw Lighthouse reports were kept outside Git.

## Deferred work and limitations

- **66 audit recommendations:** deferred because the owner asked to finalize and merge the accepted batches now. No additional batch was implicitly authorized or claimed complete.
- Full-site enlarged-text reflow: the header/menu passes the tested 200% cases, but narrow catalog pages still have overflowing content at 200% text size.
- Remaining visual, asset/performance, SEO, accessibility, code-quality and security/reliability recommendations remain follow-up work. Scoped axe scans are not whole-site WCAG certification.
- Physical Android/iPhone and Safari/Firefox validation was not performed; Chromium emulation and an API fallback mock are not substitutes for those tests.
- `STORE_URL` remains `https://your-store.vercel.app`, as required by the instruction not to change existing URLs. A real canonical domain requires the owner's explicit approval, including updating its contract-test expectation.
- No deployment is asserted here. A merge may trigger an already-connected hosting project, but its status must be checked separately.

## Numbered Vercel deployment steps

1. Use the existing repository, **`muminforwork-lang/ABNORMAL-ABN`**. After the merge, select `main` as the production branch. Do not create duplicate repositories or delete older projects as part of this handoff.
2. If a Vercel project already imports this repository, open that project and check its latest deployment. Otherwise, choose **Add New → Project** and import this existing repository.
3. Choose the **Next.js** framework preset, repository-root directory, and **Node.js 22.x**, which matches the verified test runtime. Keep the framework's output-directory default.
4. Use `npm ci` to install dependencies and `npm run build` for the build command. No new application environment variables were introduced. This remains a manual-payment storefront, not an automated order/payment backend.
5. Deploy or wait for the connected project's automatic deployment to finish. Inspect the build log and open the preview before treating it as production-ready.
6. Test home scrolling, catalog links, product prices, currency choices, duration handoff, dialog keyboard behavior, the mobile menu, form errors and summary preparation on your own phone and PC. Use clearly fake details; do not make a real payment just to test the form.
7. Before public launch, supply and approve the actual public domain. Update `STORE_URL` and the corresponding protected-contract expectation together, rerun all three checks, then deploy that separately approved change. Until then, canonical/sitemap URLs still contain the placeholder.
8. If using a custom domain, configure it in the chosen project's domain settings. Keep existing projects/domain configuration until the new site and DNS have been verified; no deletion or domain transfer was performed by this merge task.

## Complete code and historical reports

- **`final-source-code.md`** contains the current full code for all **47 changed application/test files** across the three batches, without omitted sections.
- **`phase-2-batch-3.md`** is the earlier batch-3 explanation and complete batch-3 code; its “not committed/pushed” statement describes the time that batch was delivered, not a later merge status.
- **`phase-2-batch-3-checks.json`** preserves the accepted browser evidence and historical progress.
- **`final-verification.json`** records the fresh final checks and measurements.
