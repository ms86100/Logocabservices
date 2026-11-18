'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/content/brand';

export default function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById('book');
      const nearBook = book ? window.scrollY + window.innerHeight > book.offsetTop + 120 : false;
      setShow(window.scrollY > 600 && !nearBook);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href="#book"
      className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 text-sm font-bold text-cyan-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] lg:hidden"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      {BRAND.primaryCta} <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
