'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

import ro from '@/locales/ro/common.json';
import en from '@/locales/en/common.json';
import es from '@/locales/es/common.json';

import { getSlugForLocale } from '@/lib/getSlugForLocale';

const commonMap = { ro, en, es };
const localeList = ['ro', 'en', 'es'] as const;
type Locale = typeof localeList[number];

type Props = {
  locale: Locale;
};

export default function Navbar({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const common = commonMap[locale] ?? commonMap.ro;

  const changeLocale = (targetLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0];
    const currentSlug = segments[1] || '';

    const targetSlug = getSlugForLocale(currentSlug as Locale, currentLocale as Locale, targetLocale);
    const newPath = `/${targetLocale}/${targetSlug}`;
    router.push(newPath);

    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const front = link.querySelector('.front-text') as HTMLElement;
      const back = link.querySelector('.back-text') as HTMLElement;
      if (!front || !back) return;

      gsap.set(front, { y: 0, opacity: 1, position: 'relative' });
      gsap.set(back, { y: '100%', opacity: 0, position: 'absolute', top: 0, left: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(front, {
        y: '-100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      }).to(
        back,
        {
          y: '0%',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );

      link.addEventListener('mouseenter', () => tl.play());
      link.addEventListener('mouseleave', () => tl.reverse());
    });
  }, [locale]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const items = menuItemsRef.current.filter(Boolean);
    const closeBtn = closeBtnRef.current;

    if (mobileMenuOpen) {
      const tl = gsap.timeline();

      tl.to(menu, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power3.out',
        pointerEvents: 'auto',
      });

      tl.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.fromTo(
        closeBtn,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
        '-=0.5'
      );
    } else {
      gsap.to(menu, {
        x: '100%',
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }
  }, [mobileMenuOpen]);

  return (
    <nav className="w-full border-b border-neutral-800 bg-[#0F0F0F] text-white px-6 py-4 sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link href={`/${locale}`}>
          <img
            src="/images/logo-footer.svg"
            alt={common.navbar.logoAlt}
            className="w-32 h-12"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {common.navbar.menu.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              className="nav-link relative overflow-hidden text-sm font-medium cursor-pointer"
              style={{ display: 'inline-block', position: 'relative', height: '1.2em' }}
            >
              <span className="front-text block">{label}</span>
              <span
                aria-hidden="true"
                className="back-text block"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
              >
                {label}
              </span>
            </Link>
          ))}

          {/* Language dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-sm font-medium border border-white px-2 py-1 rounded hover:bg-neutral-800"
            >
              {locale.toUpperCase()}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-[#0F0F0F] border border-neutral-800 rounded shadow z-50">
                {localeList
                  .filter((l) => l !== locale)
                  .map((loc) => (
                    <li
                      key={loc}
                      onClick={() => changeLocale(loc)}
                      className="px-4 py-2 cursor-pointer hover:bg-neutral-900"
                    >
                      {loc.toUpperCase()}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Hamburger */}
        {!mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded border border-white relative z-60"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-sm
          flex flex-col items-center justify-center space-y-8 text-2xl font-semibold
          pointer-events-none opacity-0 translate-x-full"
          style={{ willChange: 'transform, opacity' }}
          aria-hidden={!mobileMenuOpen}
        >
          {common.navbar.menu.map(({ label, slug }, i) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              onClick={() => setMobileMenuOpen(false)}
              ref={(el) => {
                menuItemsRef.current[i] = el;
              }}
              className="text-white hover:text-[var(--primary)] transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="flex gap-6 mt-6">
            {localeList
              .filter((l) => l !== locale)
              .map((loc) => (
                <button
                  key={loc}
                  onClick={() => changeLocale(loc)}
                  className="text-white text-sm border border-white px-4 py-2 rounded hover:bg-neutral-800"
                >
                  {loc.toUpperCase()}
                </button>
              ))}
          </div>

          <button
            ref={closeBtnRef}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 p-3 rounded-full border border-white text-white hover:bg-neutral-800 transition-transform"
          >
            <X size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}
