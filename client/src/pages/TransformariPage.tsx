'use client';

import { FC } from 'react';
import TextReveal from '@/components/TextReveal';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import {Squares} from '@/components/Squares'

interface BeforeAfterItem {
  before: string;
  after: string;
  title: string;
  description: string;
}

interface Props {
  messages: {
    title: string;
    beforeAfter: BeforeAfterItem[];
  };
}

const TransformariPage: FC<Props> = ({ messages }) => {
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-center mb-12">
        <StaggeredTextGSAP text={messages.title} />
      </h1>

      <div className="grid gap-16">
        {messages.beforeAfter.map((item, index) => (
          <div key={index} className="flex flex-col gap-6">
            <Reveal>
              <BeforeAfterSlider before={item.before} after={item.after} />
            </Reveal>

            <StaggeredTextGSAP
              text={item.title}
              className="text-xl font-display font-semibold text-white"
            />

            <TextReveal
              text={item.description}
              className="text-neutral-300"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default TransformariPage;
