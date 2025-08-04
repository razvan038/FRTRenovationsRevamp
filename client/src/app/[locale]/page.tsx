import { notFound } from 'next/navigation';
import { locales, Locale } from '@/locales/i18n';
import ro from '@/locales/ro/home.json';
import en from '@/locales/en/home.json';
import es from '@/locales/es/home.json';

import DesignTypesSection from '@/components/DesignTypeSection';
import TextReveal from '@/components/TextReveal';
import Reveal from '@/components/Reveal';
import StaggeredText from '@/components/StaggeredTextGSAP';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Squares } from '@/components/Squares';

const messages: Record<Locale, typeof ro> = {
  ro,
  en,
  es,
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default async function HomePage(props: PageProps) {
  const { locale } = await props.params;

  if (!locales.includes(locale as Locale)) notFound();

  const t = messages[locale as Locale];

  return (
    <>
      {/* === START Background Section (with Squares) === */}
      <div className="relative overflow-hidden">
        {/* Squares Background */}
        <div className="absolute inset-0 -z-10">
          <Squares
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="#393939"
            hoverFillColor="#111"
          />
        </div>

        {/* Hero Section */}
        <div className="flex h-screen flex-col items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <StaggeredText
              text={t.hero.title}
              className="text-3xl font-bold font-display md:text-5xl mb-6"
              stagger={0.05}
              center
            />
            <StaggeredText
              text={t.hero.description}
              className="font-sans text-base md:text-lg text-gray-300"
              delay={0.2}
              stagger={0.02}
              center
            />
          </div>
          <InteractiveHoverButton />
        </div>

        {/* Benefits Section */}
        <div className="px-4 py-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg transition hover:scale-[1.015] duration-300"
              >
                <div className="text-3xl mb-4">⭐</div>
                <StaggeredText
                  text={benefit.title}
                  className="text-lg font-display font-bold mb-2"
                  delay={index * 0.1}
                  stagger={0.03}
                />
                <StaggeredText
                  text={benefit.description}
                  className="text-sm text-gray-300"
                  delay={index * 0.1 + 0.2}
                  stagger={0.01}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="relative w-full mt-20">
          <div className="relative w-full h-[80vh] max-h-[800px] overflow-hidden">
            <img 
              src={t.vision.image} 
              alt="Vision" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 pb-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <StaggeredText
                  text={t.vision.title}
                  className="text-3xl md:text-5xl font-display font-bold mb-6"
                  delay={0.1}
                  center
                />
                
                <TextReveal
                  text={t.vision.description}
                  className="text-base md:text-lg text-gray-300"
                  delay={0.3}
                  center
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Section */}
      <DesignTypesSection
        title={t.design.title}
        images={t.design.photos}
      />

      {/* Services Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <StaggeredText
            text={t.services.title}
            className="text-3xl md:text-5xl font-display font-bold"
            center
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => (
            <Reveal
              key={index}
              delay={index * 0.15}
              y={30}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-[1.03]"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={service.photo}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500 ease-out"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/30 transition duration-500" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Outro Section */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {t.outro.logoEnabled && (
            <img
              src={t.outro.logoPath}
              alt="FRTrenovations Logo"
              className="mx-auto h-12"
            />
          )}

          <TextReveal
            text={t.outro.description}
            className="text-base md:text-lg text-gray-300"
            delay={0.2}
            center
          />
        </div>
      </section>
    </>
  );
}
