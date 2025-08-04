'use client';

import { FC } from 'react';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import TextReveal from '@/components/TextReveal';
import Reveal from '@/components/Reveal';

interface GalleryCategory {
  title: string;
  images: string[];
}

interface Props {
  messages: {
    title: string;
    categories: GalleryCategory[];
  };
}

const GaleriePage: FC<Props> = ({ messages }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center">
        <StaggeredTextGSAP text={messages.title} />
      </h1>

      {/* Categories */}
      {messages.categories.map((category, index) => (
        <section key={index} className="space-y-6">
          {/* Category Title */}
          <StaggeredTextGSAP
          text={category.title}
          />
          

          {/* Images Grid */}
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-neutral-800 hover:scale-[1.02] transition-transform duration-300 shadow"
                >
                  <img
                    src={img}
                    alt={`${category.title} ${i + 1}`}
                    className="w-full h-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ))}
    </div>
  );
};

export default GaleriePage;
