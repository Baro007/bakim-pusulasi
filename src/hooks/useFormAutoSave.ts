import { useEffect, useCallback } from 'react';

interface AutoSaveOptions {
  key: string;
  data: any;
  delay?: number; // debounce delay in ms
}

export function useFormAutoSave({ key, data, delay = 1000 }: AutoSaveOptions) {
  // Save to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log('✅ Form auto-saved to localStorage');
      } catch (error) {
        console.error('❌ LocalStorage save failed:', error);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [key, data, delay]);

  // Load from localStorage
  const loadSavedData = useCallback(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('❌ LocalStorage load failed:', error);
    }
    return null;
  }, [key]);

  // Clear localStorage
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      console.log('🗑️ Saved form data cleared');
    } catch (error) {
      console.error('❌ LocalStorage clear failed:', error);
    }
  }, [key]);

  return {
    loadSavedData,
    clearSavedData,
  };
}
