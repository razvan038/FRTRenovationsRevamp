'use client';

import { FC, JSX } from 'react';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import { Phone, Mail } from 'lucide-react';
import { Squares } from '@/components/Squares';

type ContactType = 'phone' | 'email';

interface Contact {
  icon: ContactType;
  text: string;
}

interface Props {
  messages?: {
    title?: string;
    contacts?: Contact[];
  };
}

const ContactPage: FC<Props> = ({ messages }) => {
  // Valori default pentru cazul în care messages este undefined
  const safeMessages = {
    title: messages?.title || 'Contactează-ne',
    contacts: messages?.contacts || [],
  };

  // Map pentru iconițe cu tip sigur
  const iconMap: Record<ContactType, JSX.Element> = {
    phone: <Phone className="w-5 h-5 text-white" />,
    email: <Mail className="w-5 h-5 text-white" />,
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
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

      <div className="max-w-3xl mx-auto px-4 py-20 space-y-16">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center">
          <StaggeredTextGSAP text={safeMessages.title} />
        </h1>

        {/* Contact Info */}
        <Reveal>
          <div className="space-y-6">
            {safeMessages.contacts.length > 0 ? (
              safeMessages.contacts.map((contact, index) => {
                // Fallback pentru tipuri de contact necunoscute
                const safeIcon = contact.icon in iconMap 
                  ? contact.icon 
                  : 'email';
                
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 hover:bg-neutral-900/70 transition-colors duration-300"
                  >
                    <div className="p-2 bg-neutral-800 rounded-full">
                      {iconMap[safeIcon]}
                    </div>
                    <p className="text-neutral-300">
                      {contact.text || 'Informație indisponibilă'}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-neutral-400">
                <p>Momentan nu sunt informații de contact disponibile</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ContactPage;