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
