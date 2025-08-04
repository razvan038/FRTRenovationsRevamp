'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggeredText from '@/components/StaggeredTextGSAP';

gsap.registerPlugin(ScrollTrigger);

interface DesignTypesSectionProps {
  title: string;
  images: string[];
}

export default function DesignTypesSection({ title, images }: DesignTypesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const direction = i % 2 === 0 ? 1 : -1;
        const moveY = 120 + i * 40;
        const rotate = direction * (8 + i * 2);
        const moveX = direction * (20 + i * 10);

        gsap.fromTo(
          card,
          {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
          },
          {
            y: `-${moveY}px`,
            x: `${moveX}px`,
            rotate,
            scale: 1.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2, // foarte fluid
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[70vh] md:h-[80vh] overflow-hidden bg-black text-white px-4 py-24 md:px-12"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 before:absolute before:inset-0 before:bg-gradient-to-l before:from-black before:to-transparent before:to-60% after:absolute after:inset-0 after:bg-gradient-to-b after:from-black after:to-transparent after:to-70%" />

      {/* Left text */}
      <div className="relative text-6xl z-20 flex-1 pr-8 flex items-center">
        <StaggeredText
        className='font-display font-bold'
          text={title}
        />
      </div>

      {/* Right cards */}
      <div className="flex-1 relative z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-[-160px] md:gap-[-200px]">
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative w-[200px] h-[260px] md:w-[300px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
              style={{ zIndex: 4 - i }}
            >
              <img
                src={src}
                alt={`design-${i}`}
                className="w-full h-full object-cover filter grayscale"
              />
              <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
