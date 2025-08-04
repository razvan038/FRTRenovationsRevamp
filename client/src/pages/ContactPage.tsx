'use client';

import { FC } from 'react';
import StaggeredTextGSAP from '@/components/StaggeredTextGSAP';
import Reveal from '@/components/Reveal';
import { Phone, Mail } from 'lucide-react';
import { Squares } from '@/components/Squares';

interface Contact {
  icon: 'phone' | 'email';
  text: string;
}

interface Props {
  messages: {
    title: string;
    contacts: Contact[];
  };
}

const iconMap = {
  phone: <Phone className="w-5 h-5 text-white" />,
  email: <Mail className="w-5 h-5 text-white" />,
};

const ContactPage: FC<Props> = ({ messages }) => {
  return (
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

      <div className="max-w-3xl mx-auto px-4 py-20 space-y-16">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center">
          <StaggeredTextGSAP text={messages.title} />
        </h1>

        {/* Contact Info */}
        <Reveal>
          <div className="space-y-6">
            {messages.contacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800"
              >
                <div className="p-2 bg-neutral-800 rounded-full">
                  {iconMap[contact.icon]}
                </div>
                <p className="text-neutral-300">{contact.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ContactPage;
