import { notFound } from 'next/navigation';

import TransformariPage from '@/pages/TransformariPage';
import GaleriePage from '@/pages/GaleriePage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';  

import roTransformari from '@/locales/ro/transformari.json';
import enTransformari from '@/locales/en/transformari.json';
import esTransformari from '@/locales/es/transformari.json';

import roGalerie from '@/locales/ro/galerie.json';
import enGalerie from '@/locales/en/galerie.json';
import esGalerie from '@/locales/es/galerie.json';

import roContact from '@/locales/ro/contact.json';
import enContact from '@/locales/en/contact.json';
import esContact from '@/locales/es/contact.json';

import roServices from '@/locales/ro/servicii.json';      
import enServices from '@/locales/en/servicii.json';      
import esServices from '@/locales/es/servicii.json';      

const pageMap = {
  transformari: TransformariPage,
  transformations: TransformariPage,
  transformaciones: TransformariPage,

  galerie: GaleriePage,
  gallery: GaleriePage,
  galeria: GaleriePage,

  contact: ContactPage,
  contacto: ContactPage,

  servicii: ServicesPage,         // <-- adăugat
  services: ServicesPage,          // <-- adăugat
  servicios: ServicesPage,         // <-- adăugat
};

const contentMap = {
  ro: {
    transformari: roTransformari,
    galerie: roGalerie,
    contact: roContact,
    servicii: roServices,          // <-- adăugat
  },
  en: {
    transformations: enTransformari,
    gallery: enGalerie,
    contact: enContact,
    services: enServices,           // <-- adăugat
  },
  es: {
    transformaciones: esTransformari,
    galeria: esGalerie,
    contacto: esContact,
    servicios: esServices,          // <-- adăugat
  },
};

interface PageProps {
  params: Promise<{
    locale: 'ro' | 'en' | 'es';
    slug: string;
  }>;
}

interface ComponentProps {
  messages: any; 
}

export default async function Page(props: PageProps) {
  const { locale, slug } = await props.params;

  if (!(locale in contentMap)) return notFound();

  const Component = pageMap[slug as keyof typeof pageMap] as React.FC<ComponentProps>;
  if (!Component) return notFound();

  const content = contentMap[locale]?.[slug as keyof typeof contentMap[typeof locale]];
  if (!content) return notFound();

  return <Component messages={content} />;
}
