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
