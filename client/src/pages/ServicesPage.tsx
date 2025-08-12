'use client';

import { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import { Squares } from '@/components/Squares';
import { serviceToGalleryMap } from '@/mappings/serviceToGallery';

interface Service {
  title?: string;
  subtitle?: string;
  icon?: string;
}

interface ServicesToggle {
  id: string;
  label?: string;
  services?: Service[];
}

interface Props {
  messages?: {
    title?: string;
    toggle?: ServicesToggle[];
  };
}


const ServicesPage: FC<Props> = ({ messages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const language = pathname ? pathname.split("/")[1] : "ro";

  const safeMessages = {
    title: messages?.title || 'Serviciile Noastre',
    toggle: messages?.toggle || [],
  };

  const hasTabs = safeMessages.toggle.length > 0;
  const [activeTab, setActiveTab] = useState(
    hasTabs ? safeMessages.toggle[0].id : ''
  );

  const activeServices = hasTabs
    ? safeMessages.toggle.find((t) => t.id === activeTab)?.services || []
    : [];

    const galleryRouteByLang: Record<string, string> = {
      ro: "galerie",
      en: "gallery",
      es: "galeria",
    };
    
    const goToGallerySection = (serviceTitle: string) => {
      const slug = serviceToGalleryMap[serviceTitle];
      if (slug) {
        const galleryPath = galleryRouteByLang[language] || "galerie";
        router.push(`/${language}/${galleryPath}#${slug}`);
      }
    };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="#393939"
          hoverFillColor="#111"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <h1 className="text-4xl font-bold text-center">
          <StaggeredTextGSAP text={safeMessages.title} />
        </h1>

        {hasTabs && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {safeMessages.toggle.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-sm font-semibold transition-colors ${
                  tab.id === activeTab
                    ? 'bg-neutral-800 text-white'
                    : 'bg-neutral-200 text-black hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600'
                }`}
                aria-current={tab.id === activeTab ? 'true' : 'false'}
              >
                {tab.label || `Tab ${tab.id}`}
              </button>
            ))}
          </div>
        )}

        {activeServices.length > 0 ? (
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {activeServices.map((service, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  onClick={() => goToGallerySection(service.title || '')}
                  className="flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900/50 hover:dark:bg-neutral-900 cursor-pointer"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    {service.icon ? (
                      <img
                        src={service.icon}
                        alt={service.title || `Serviciu ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-service-icon.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <StaggeredTextGSAP
                      triggerOnMount
                      text={service.title || `Serviciu ${index + 1}`}
                    />
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <StaggeredTextGSAP
                      triggerOnMount
                      text={
                        service.subtitle || 'Descriere indisponibilă momentan'
                      }
                    />
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              {hasTabs
                ? 'Nu există servicii disponibile pentru această categorie'
                : 'Nu există servicii de afișat'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
