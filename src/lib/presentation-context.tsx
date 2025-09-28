'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PresentationContextType {
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const togglePresentationMode = () => {
    setIsPresentationMode(prev => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // P tuşu ile sunum modunu aç/kapat
      if (event.key === 'p' || event.key === 'P') {
        // Sadece input alanı içinde değilse çalışsın
        if (!(event.target instanceof HTMLInputElement) && 
            !(event.target instanceof HTMLTextAreaElement)) {
          togglePresentationMode();
        }
      }
      
      // ESC tuşu ile sunum modundan çık
      if (event.key === 'Escape' && isPresentationMode) {
        setIsPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPresentationMode]);

  // Sunum modunda body'ye özel class ekle
  useEffect(() => {
    if (isPresentationMode) {
      document.body.classList.add('presentation-mode');
      // Fare imlecini gizle (opsiyonel)
      document.body.style.cursor = 'none';
    } else {
      document.body.classList.remove('presentation-mode');
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.classList.remove('presentation-mode');
      document.body.style.cursor = 'auto';
    };
  }, [isPresentationMode]);

  return (
    <PresentationContext.Provider value={{ isPresentationMode, togglePresentationMode }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentationMode() {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentationMode must be used within a PresentationProvider');
  }
  return context;
}
