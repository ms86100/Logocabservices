'use client';

import { useEffect } from 'react';

export default function ServiceWorker() {
  useEffect(() => {
    // Only register in production static export. In dev, the service worker's
    // aggressive caching can serve stale Next.js chunk URLs and break hot reload.
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }
  }, []);

  return null;
}
