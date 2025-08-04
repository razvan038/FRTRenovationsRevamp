// app/page.tsx
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/locales/i18n';


export default function Page() {
  redirect(`/${defaultLocale}`);
}
