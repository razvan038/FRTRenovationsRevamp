import { slugMap } from './slugMap';

type LocaleKeys = 'ro' | 'en' | 'es';

export function getSlugForLocale(currentSlug: string, currentLocale: LocaleKeys, targetLocale: LocaleKeys) {
  for (const entry of Object.values(slugMap)) {
    if (entry[currentLocale] === currentSlug) return entry[targetLocale];
  }
  return currentSlug; 
}