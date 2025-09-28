'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ===== TYPE DEFINITIONS =====

interface ZBIAssessmentMetadata {
  assessmentId: string;
  startTime: Date;
  completionTime?: Date;
  completionDuration?: number;
  isCompleted: boolean;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  userAgent: string;
  referralSource: string;
  language: 'tr' | 'en';
  sessionId: string;
}

interface ZBIQuestionAnalytics {
  questionId: number;
  response: number;
  responseTime: number;
  revisited: boolean;
  skipped: boolean;
  timestamp: Date;
}

interface ZBIResults {
  totalScore: number;
  riskLevel: 'low' | 'moderate' | 'severe';
  questionScores: number[];
  missedQuestions: number[];
  assessmentValidity: boolean;
  completionTimestamp: Date;
}

interface ZBIUserJourney {
  entryPoint: string;
  exitPoint?: string;
  navigationPattern: string[];
  timeOnInstructions: number;
  helpSectionAccessed: boolean;
  pdfDownloaded: boolean;
  sessionEvents: string[];
}

interface AssessmentSession {
  sessionId: string;
  startTime: Date;
  currentQuestion: number;
  responses: (number | null)[];
  metadata: ZBIAssessmentMetadata;
  userJourney: string[];
  questionAnalytics: ZBIQuestionAnalytics[];
}

interface AnalyticsDataEntry {
  type: 'assessment_start' | 'question_response' | 'assessment_completion';
  timestamp: Date;
  sessionId?: string;
  data: ZBIAssessmentMetadata | ZBIQuestionAnalytics | ZBIResults;
}

interface UserJourneyEntry {
  timestamp: Date;
  sessionId?: string;
  data: Partial<ZBIUserJourney>;
}

// ===== CONTEXT INTERFACE =====

interface AnalyticsContextType {
  // Consent Management
  hasResearchConsent: boolean | null;
  setResearchConsent: (consent: boolean) => void;
  showConsentModal: boolean;
  setShowConsentModal: (show: boolean) => void;
  
  // Session Management
  currentSession: AssessmentSession | null;
  startAssessmentSession: (metadata: Partial<ZBIAssessmentMetadata>) => string;
  endAssessmentSession: (results: ZBIResults) => void;
  
  // Data Tracking
  trackAssessmentStart: (metadata: ZBIAssessmentMetadata) => void;
  trackQuestionResponse: (analytics: ZBIQuestionAnalytics) => void;
  trackAssessmentCompletion: (results: ZBIResults) => void;
  trackUserJourney: (journey: Partial<ZBIUserJourney>) => void;
  trackPageVisit: (page: string) => void;
  
  // Data Retrieval
  getSessionData: () => AssessmentSession | null;
  getStoredAnalytics: () => AnalyticsDataEntry[];
  exportResearchData: () => string;
  
  // Utility Functions
  generateSessionId: () => string;
  getDeviceType: () => 'mobile' | 'desktop' | 'tablet';
  clearAllData: () => void;
}

// ===== CONTEXT CREATION =====

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// ===== UTILITY FUNCTIONS =====

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

const getReferralSource = (): string => {
  if (typeof window === 'undefined') return 'direct';
  
  const referrer = document.referrer;
  if (!referrer) return 'direct';
  if (referrer.includes('google')) return 'google';
  if (referrer.includes('facebook')) return 'facebook';
  if (referrer.includes('twitter')) return 'twitter';
  if (referrer.includes('linkedin')) return 'linkedin';
  return 'external';
};

// ===== STORAGE FUNCTIONS =====

const STORAGE_KEYS = {
  RESEARCH_CONSENT: 'zbi_research_consent',
  CURRENT_SESSION: 'zbi_current_session',
  ANALYTICS_DATA: 'zbi_analytics_data',
  USER_JOURNEY: 'zbi_user_journey'
};

const saveToStorage = (key: string, data: unknown): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = (key: string): unknown => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return null;
  }
};

// ===== PROVIDER COMPONENT =====

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State Management
  const [hasResearchConsent, setHasResearchConsent] = useState<boolean | null>(null);
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);

  // Initialize from storage
  useEffect(() => {
    const savedConsent = loadFromStorage(STORAGE_KEYS.RESEARCH_CONSENT);
    if (savedConsent !== null) {
      setHasResearchConsent(savedConsent as boolean);
    }

    const savedSession = loadFromStorage(STORAGE_KEYS.CURRENT_SESSION) as AssessmentSession | null;
    if (savedSession) {
      // Convert dates from strings back to Date objects
      savedSession.startTime = new Date(savedSession.startTime);
      savedSession.metadata.startTime = new Date(savedSession.metadata.startTime);
      setCurrentSession(savedSession);
    }
  }, []);

  // Consent Management
  const setResearchConsent = (consent: boolean): void => {
    setHasResearchConsent(consent);
    saveToStorage(STORAGE_KEYS.RESEARCH_CONSENT, consent);
    
    if (!consent) {
      // If consent withdrawn, clear all stored data
      clearAllData();
    }
  };

  // Session Management
  const generateSessionId = (): string => {
    return `session_${Date.now()}_${generateUUID().substr(0, 8)}`;
  };

  const startAssessmentSession = (metadata: Partial<ZBIAssessmentMetadata>): string => {
    const sessionId = generateSessionId();
    const now = new Date();
    
    const fullMetadata: ZBIAssessmentMetadata = {
      assessmentId: generateUUID(),
      startTime: now,
      isCompleted: false,
      deviceType: getDeviceType(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      referralSource: getReferralSource(),
      language: 'tr', // Default, can be overridden
      sessionId,
      ...metadata
    };

    const session: AssessmentSession = {
      sessionId,
      startTime: now,
      currentQuestion: 0,
      responses: Array(12).fill(null),
      metadata: fullMetadata,
      userJourney: ['assessment_start'],
      questionAnalytics: []
    };

    setCurrentSession(session);
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, session);

    // Track assessment start if consent given
    if (hasResearchConsent) {
      trackAssessmentStart(fullMetadata);
    }

    return sessionId;
  };

  const endAssessmentSession = (results: ZBIResults): void => {
    if (!currentSession) return;

    const completedSession = {
      ...currentSession,
      metadata: {
        ...currentSession.metadata,
        completionTime: new Date(),
        completionDuration: Date.now() - currentSession.startTime.getTime(),
        isCompleted: true
      }
    };

    // Track completion if consent given
    if (hasResearchConsent) {
      trackAssessmentCompletion(results);
    }

    // Archive completed session
    const archivedSessions = (loadFromStorage('zbi_archived_sessions') as AssessmentSession[]) || [];
    archivedSessions.push(completedSession);
    saveToStorage('zbi_archived_sessions', archivedSessions);

    // Clear current session
    setCurrentSession(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  };

  // Data Tracking Functions
  const trackAssessmentStart = (metadata: ZBIAssessmentMetadata): void => {
    if (!hasResearchConsent) return;

    const analyticsData = (loadFromStorage(STORAGE_KEYS.ANALYTICS_DATA) as AnalyticsDataEntry[]) || [];
    analyticsData.push({
      type: 'assessment_start',
      timestamp: new Date(),
      data: metadata
    });
    saveToStorage(STORAGE_KEYS.ANALYTICS_DATA, analyticsData);
  };

  const trackQuestionResponse = (analytics: ZBIQuestionAnalytics): void => {
    if (!hasResearchConsent || !currentSession) return;

    // Update current session
    const updatedSession = {
      ...currentSession,
      questionAnalytics: [...currentSession.questionAnalytics, analytics],
      responses: [...currentSession.responses]
    };
    updatedSession.responses[analytics.questionId - 1] = analytics.response;

    setCurrentSession(updatedSession);
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, updatedSession);

    // Store in analytics data
    const analyticsData = (loadFromStorage(STORAGE_KEYS.ANALYTICS_DATA) as AnalyticsDataEntry[]) || [];
    analyticsData.push({
      type: 'question_response',
      timestamp: new Date(),
      sessionId: currentSession.sessionId,
      data: analytics
    });
    saveToStorage(STORAGE_KEYS.ANALYTICS_DATA, analyticsData);
  };

  const trackAssessmentCompletion = (results: ZBIResults): void => {
    if (!hasResearchConsent) return;

    const analyticsData = (loadFromStorage(STORAGE_KEYS.ANALYTICS_DATA) as AnalyticsDataEntry[]) || [];
    analyticsData.push({
      type: 'assessment_completion',
      timestamp: new Date(),
      sessionId: currentSession?.sessionId,
      data: results
    });
    saveToStorage(STORAGE_KEYS.ANALYTICS_DATA, analyticsData);
  };

  const trackUserJourney = (journey: Partial<ZBIUserJourney>): void => {
    if (!hasResearchConsent) return;

    const journeyData = (loadFromStorage(STORAGE_KEYS.USER_JOURNEY) as UserJourneyEntry[]) || [];
    journeyData.push({
      timestamp: new Date(),
      sessionId: currentSession?.sessionId,
      data: journey
    });
    saveToStorage(STORAGE_KEYS.USER_JOURNEY, journeyData);
  };

  const trackPageVisit = (page: string): void => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      userJourney: [...currentSession.userJourney, page]
    };

    setCurrentSession(updatedSession);
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, updatedSession);
  };

  // Data Retrieval
  const getSessionData = (): AssessmentSession | null => {
    return currentSession;
  };

  const getStoredAnalytics = (): AnalyticsDataEntry[] => {
    if (!hasResearchConsent) return [];
    return (loadFromStorage(STORAGE_KEYS.ANALYTICS_DATA) as AnalyticsDataEntry[]) || [];
  };

  const exportResearchData = (): string => {
    if (!hasResearchConsent) return '';

    const data = {
      analyticsData: (loadFromStorage(STORAGE_KEYS.ANALYTICS_DATA) as AnalyticsDataEntry[]) || [],
      userJourneyData: (loadFromStorage(STORAGE_KEYS.USER_JOURNEY) as UserJourneyEntry[]) || [],
      archivedSessions: (loadFromStorage('zbi_archived_sessions') as AssessmentSession[]) || [],
      exportTimestamp: new Date(),
      consentGranted: hasResearchConsent
    };

    return JSON.stringify(data, null, 2);
  };

  const clearAllData = (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem('zbi_archived_sessions');
    setCurrentSession(null);
  };

  // Context Value
  const contextValue: AnalyticsContextType = {
    hasResearchConsent,
    setResearchConsent,
    showConsentModal,
    setShowConsentModal,
    currentSession,
    startAssessmentSession,
    endAssessmentSession,
    trackAssessmentStart,
    trackQuestionResponse,
    trackAssessmentCompletion,
    trackUserJourney,
    trackPageVisit,
    getSessionData,
    getStoredAnalytics,
    exportResearchData,
    generateSessionId,
    getDeviceType,
    clearAllData
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// ===== CUSTOM HOOK =====

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// ===== EXPORT TYPES =====

export type {
  ZBIAssessmentMetadata,
  ZBIQuestionAnalytics,
  ZBIResults,
  ZBIUserJourney,
  AssessmentSession,
  AnalyticsContextType
};
