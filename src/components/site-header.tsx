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
