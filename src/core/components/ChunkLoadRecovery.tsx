"use client";

import { useEffect } from 'react';

const CHUNK_RELOAD_KEY = 'chunk_reload_attempted';

export default function ChunkLoadRecovery() {
  useEffect(() => {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);

    const handleChunkError = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = typeof reason === 'object' && reason && 'message' in reason
        ? String(reason.message)
        : String(reason);

      if (!message.includes('ChunkLoadError') && !message.includes('Loading chunk')) {
        return;
      }

      if (sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1') {
        return;
      }

      sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
      window.location.reload();
    };

    window.addEventListener('unhandledrejection', handleChunkError);

    return () => {
      window.removeEventListener('unhandledrejection', handleChunkError);
    };
  }, []);

  return null;
}
