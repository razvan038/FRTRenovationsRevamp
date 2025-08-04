'use client';

import { useRef, useEffect, JSX } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  center?: boolean;
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  triggerOnMount?: boolean; // 👈 nou
}

export default function StaggeredTextGSAP({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  center = false,
  as: Tag = 'div',
  triggerOnMount = false, // 👈 default false
}: StaggeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    const words = containerRef.current.querySelectorAll('.word');

    // Reset initial
    gsap.set(chars, { opacity: 0, y: 20 });

    const tl = gsap.timeline();

    words.forEach((word, wordIndex) => {
      const wordChars = word.querySelectorAll('.char');
      tl.to(
        wordChars,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: stagger,
        },
        delay + wordIndex * 0.1
      );
    });

    if (triggerOnMount) {
      tl.play();
    } else {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        animation: tl,
        toggleActions: 'play none none none',
        once: true,
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, delay, stagger, triggerOnMount]);

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLDivElement>}
      className={clsx(
        'w-full flex flex-wrap',
        center && 'justify-center',
        className
      )}
      key={text} // 👈 force re-render when text changes
    >
      {text.split(' ').map((word, wordIndex) => (
        <div key={`word-${wordIndex}`} className="word whitespace-nowrap mr-1.5 last:mr-0">
          {[...word].map((char, charIndex) => (
            <span key={`char-${wordIndex}-${charIndex}`} className="char inline-block">
              {char}
            </span>
          ))}
          {wordIndex < text.split(' ').length - 1 && '\u00A0'}
        </div>
      ))}
    </Tag>
  );
}
