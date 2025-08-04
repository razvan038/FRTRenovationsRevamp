// app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { locales, Locale } from '@/locales/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await props.params;
  const typedLocale = locale as Locale;

  if (!locales.includes(typedLocale)) notFound();

  return (
    <>
      <Navbar locale={typedLocale} />
      <main>{props.children}</main>
      <Footer locale={typedLocale} />
    </>
  );
}
