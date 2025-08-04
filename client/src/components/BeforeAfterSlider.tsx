'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  before: string;
  after: string;
}

export default function BeforeAfterSlider({ before, after }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = (clientX - rect.left) / rect.width;
    setPosition(Math.max(0, Math.min(1, newPosition)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        handleMove(e.touches[0].clientX);
      } else {
        handleMove(e.clientX);
      }
    };

    const stopDrag = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchend', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group select-none cursor-ew-resize bg-black"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* BEFORE image (full) */}
      <Image
        src={before}
        alt="Before"
        fill
        className="object-cover absolute inset-0"
        unoptimized
        priority
      />

      {/* AFTER image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position * 100}%` }}
      >
        <Image
          src={after}
          alt="After"
          fill
          className="object-cover"
          unoptimized
          priority
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center pointer-events-none"
        style={{ left: `${position * 100}%`, transform: 'translateX(-50%)' }}
      >
        <div className="relative w-6 h-full flex items-center justify-center">
          {/* Vertical line */}
          <div className="w-1 h-full bg-white/90 shadow absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Drag circle */}
          <div
            className="w-6 h-6 bg-white rounded-full border border-gray-400 shadow-md pointer-events-auto"
          />
        </div>
      </div>
    </div>
  );
}
