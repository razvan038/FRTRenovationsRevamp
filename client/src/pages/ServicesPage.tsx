'use client';

import { FC, useState } from 'react';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import {Squares} from '@/components/Squares'

interface Service {
  title: string;
  subtitle: string;
  icon: string;
}

interface ServicesToggle {
  id: string;
  label: string;
  services: Service[];
}

interface Props {
  messages: {
    title: string;
    toggle: ServicesToggle[];
  };
}

const ServiciiPage: FC<Props> = ({ messages }) => {
  const [activeTab, setActiveTab] = useState(messages.toggle[0]?.id);

  const activeServices = messages.toggle.find((t) => t.id === activeTab);

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
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center">
        <StaggeredTextGSAP  text={messages.title} />
      </h1>

      {/* Toggle Tabs */}
      <div className="flex justify-center gap-4">
        {messages.toggle.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab.id === activeTab
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-200 text-black hover:bg-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {activeServices && (
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {activeServices.services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900"
              >
                <div className="w-16 h-16 mb-4">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <StaggeredTextGSAP
                triggerOnMount
                  text={service.title}
                />
                <StaggeredTextGSAP
                  text={service.subtitle}
                  triggerOnMount
                />
                
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
    </div>
    </>
  );
};

export default ServiciiPage;
