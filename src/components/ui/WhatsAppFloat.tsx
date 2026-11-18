'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappLink } from '@/content/brand';

export default function WhatsAppFloat() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Keep the CTA visible near the footer as well; simple visibility toggle.
    return undefined;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <a
        href={CONTACT.phoneHref}
        aria-label="Call LOGO CAB SERVICES"
        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-slate-900/90 text-cyan-200 shadow-lg backdrop-blur transition hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
      {show && (
        <a
          href={whatsappLink(
            'Hi LOGO CAB SERVICES team, I would like to ask about pricing, a vehicle request or an existing booking.'
          )}
          target="_blank"
          rel="noopener"
          aria-label="Chat on WhatsApp"
          className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp us
        </a>
      )}
    </div>
  );
}
