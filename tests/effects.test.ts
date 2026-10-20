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
