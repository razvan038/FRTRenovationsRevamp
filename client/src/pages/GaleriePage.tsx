'use client';

import { FC } from 'react';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';

interface GalleryCategory {
  title?: string;
  images?: string[];
}

interface Props {
  messages?: {
    title?: string;
    categories?: GalleryCategory[];
  };
}

const GaleriePage: FC<Props> = ({ messages }) => {
  // Valori default pentru cazul în care messages este undefined
  const safeMessages = {
    title: messages?.title || 'Galerie Foto',
    categories: messages?.categories || [],
  };

  // Dacă nu există categorii, afișează un mesaj
  if (safeMessages.categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-neutral-400">Nu există categorii de afișat</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center">
        <StaggeredTextGSAP text={safeMessages.title} />
      </h1>

      {/* Categories */}
      {safeMessages.categories.map((category, index) => {
        // Verifică dacă categoria există și are imagini
        const safeCategory = {
          title: category?.title || `Categoria ${index + 1}`,
          images: category?.images || [],
        };

        return (
          <section key={index} className="space-y-6">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold">
              <StaggeredTextGSAP text={safeCategory.title} />
            </h2>

            {/* Images Grid */}
            <Reveal>
              {safeCategory.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {safeCategory.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-neutral-800 hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl"
                    >
                      <img
                        src={img || '/placeholder-image.jpg'}
                        alt={`${safeCategory.title} ${i + 1}`}
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-400 text-center py-8">
                  Nu există imagini în această categorie
                </p>
              )}
            </Reveal>
          </section>
        );
      })}
    </div>
  );
};

export default GaleriePage;