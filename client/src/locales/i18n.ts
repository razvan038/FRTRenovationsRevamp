// i18n.ts
export const locales = ['ro', 'en', 'es'] as const;
export const defaultLocale = 'ro';

export type Locale = typeof locales[number];
