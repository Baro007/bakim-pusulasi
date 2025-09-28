'use client';

import React from 'react';
import { usePresentationMode } from '@/lib/presentation-context';

interface PresentationLayoutProps {
  children: React.ReactNode;
}

export default function PresentationLayout({ children }: PresentationLayoutProps) {
  const { isPresentationMode } = usePresentationMode();

  return (
    <>
      {/* Sunum modu göstergesi */}
      {isPresentationMode && (
        <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          Sunum Modu Aktif (ESC ile çık)
        </div>
      )}
      
      {/* Ana içerik */}
      <div className={isPresentationMode ? 'presentation-mode-content' : ''}>
        {children}
      </div>

      {/* Sunum modu için özel CSS stilleri */}
      <style jsx global>{`
        .presentation-mode {
          overflow: hidden !important;
        }
        
        .presentation-mode-content {
          width: 100vw !important;
          height: 100vh !important;
          overflow: auto;
        }

        /* Sunum modunda navbar ve footer'ı gizle */
        .presentation-mode nav,
        .presentation-mode footer {
          display: none !important;
        }

        /* Sunum modunda ana içeriği tam ekran yap */
        .presentation-mode main {
          width: 100% !important;
          height: 100vh !important;
          overflow: auto;
          padding: 0 !important;
        }

        /* Sunum modunda her şeyi büyüt */
        .presentation-mode {
          font-size: 1.2em;
        }

        .presentation-mode h1 {
          font-size: 4rem !important;
        }

        .presentation-mode h2 {
          font-size: 3rem !important;
        }

        .presentation-mode h3 {
          font-size: 2.5rem !important;
        }

        .presentation-mode p {
          font-size: 1.5rem !important;
          line-height: 1.6 !important;
        }

        /* Sunum modunda kartları ve bileşenleri optimize et */
        .presentation-mode .bg-white {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }

        /* Butonları büyüt */
        .presentation-mode button {
          padding: 1rem 2rem !important;
          font-size: 1.25rem !important;
        }

        /* Scroll bar'ı gizle (webkit browsers) */
        .presentation-mode-content::-webkit-scrollbar {
          display: none;
        }

        /* Scroll bar'ı gizle (Firefox) */
        .presentation-mode-content {
          scrollbar-width: none;
        }

        /* Animasyonları hızlandır */
        .presentation-mode * {
          animation-duration: 0.3s !important;
          transition-duration: 0.3s !important;
        }
      `}</style>
    </>
  );
}
