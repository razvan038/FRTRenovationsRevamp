'use client';

import { FC } from 'react';
import TextReveal from '@/components/TextReveal';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Squares } from '@/components/Squares';

interface BeforeAfterItem {
  before: string;
  after: string;
  title: string;
  description: string;
}

interface Props {
  messages?: {
    title?: string;
    beforeAfter?: BeforeAfterItem[];
  };
}

const TransformariPage: FC<Props> = ({ messages }) => {
  // Valori default pentru cazul în care messages este undefined
  const safeMessages = {
    title: messages?.title || 'Transformări',
    beforeAfter: messages?.beforeAfter || [],
  };

  // Dacă nu există date, afișează un mesaj de încărcare
  if (safeMessages.beforeAfter.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-neutral-300">Se încarcă datele...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background with animated squares */}
      <div className="absolute inset-0 -z-10">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="#393939"
          hoverFillColor="#111"
        />
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-3xl font-display font-bold text-center mb-12">
          <StaggeredTextGSAP text={safeMessages.title} />
        </h1>

        {/* Before/After items grid */}
        <div className="grid gap-16">
          {safeMessages.beforeAfter.map((item, index) => (
            <div key={index} className="flex flex-col gap-6">
              {/* Before/After Slider */}
              <Reveal>
                <BeforeAfterSlider
                  before={item.before || '/placeholder-before.jpg'}
                  after={item.after || '/placeholder-after.jpg'}
                />
              </Reveal>

              {/* Project Title */}
              <StaggeredTextGSAP
                text={item.title || 'Proiect fără titlu'}
                className="text-xl font-display font-semibold text-white"
              />

              {/* Project Description */}
              <TextReveal
                text={item.description || 'Descriere indisponibilă'}
                className="text-neutral-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformariPage;