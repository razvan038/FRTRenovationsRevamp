'use client';

import Link from 'next/link';
import ro from '@/locales/ro/common.json';
import en from '@/locales/en/common.json';
import es from '@/locales/es/common.json';

const commonMap = { ro, en, es };
const localeList = ['ro', 'en', 'es'] as const;
type Locale = typeof localeList[number];

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const common = commonMap[locale] ?? commonMap.ro;

  return (
    <footer className="bg-[#090909] text-white px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm border-t border-neutral-800">
      <div className="space-y-3">
        <img
          src="/images/logo-footer.svg"
          alt={common.footer.left.logoAlt}
          className="h-10 w-auto"
        />
        <div className='flex flex-row items-center'>
        <img src="/images/location.webp" alt="" />
        <p className='w-[30%]'>{common.footer.left.location}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">{common.footer.center.navigationTitle}</h4>
        <ul className="space-y-1">
          {common.footer.center.links.map(({ label, slug }) => (
            <li key={slug}>
              <Link href={`/${locale}/${slug}`} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3">{common.footer.right.contactTitle}</h4>
        <ul className="space-y-1">
          <li>{common.footer.right.phone1}</li>
          <li>{common.footer.right.phone2}</li>
          <li>
            <a href={`mailto:${common.footer.right.email}`} className="underline">
              {common.footer.right.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
