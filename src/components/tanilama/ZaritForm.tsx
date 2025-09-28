'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { zaritQuestions, calculateZaritScore, ZaritResult } from '@/lib/zarit-questions';
import Button from '@/components/ui/Button';
import { useAnalytics } from '@/lib/analytics-context';
import ConsentModal from '@/components/research/ConsentModal';

interface ZaritFormProps {
  onComplete: (results: ZaritResult) => void;
}

export default function ZaritForm({ onComplete }: ZaritFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(zaritQuestions.length).fill(-1));
  const [isAnimating, setIsAnimating] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));

  // Analytics hooks
  const analytics = useAnalytics();

  // Initialize assessment session and show consent modal if needed
  useEffect(() => {
    // Show consent modal if user hasn't decided yet
    if (analytics.hasResearchConsent === null) {
      analytics.setShowConsentModal(true);
    }

    // Start assessment session
    analytics.startAssessmentSession({
      language: 'tr',
      referralSource: document.referrer || 'direct'
    });
    setQuestionStartTime(new Date());

    // Track page visit
    analytics.trackPageVisit('assessment_form');

    return () => {
      // Clean up if component unmounts before completion
      const currentSession = analytics.getSessionData();
      if (currentSession && !currentSession.metadata.isCompleted) {
        analytics.trackUserJourney({
          exitPoint: `question_${currentQuestion}`,
          navigationPattern: Array.from(visitedQuestions).map(q => `question_${q}`)
        });
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    const wasAlreadyAnswered = newAnswers[currentQuestion] !== -1;
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Track question response analytics
    if (analytics.hasResearchConsent) {
      const responseTime = Date.now() - questionStartTime.getTime();
      analytics.trackQuestionResponse({
        questionId: currentQuestion + 1,
        response: value,
        responseTime: Math.round(responseTime / 1000), // Convert to seconds
        revisited: wasAlreadyAnswered,
        skipped: false,
        timestamp: new Date()
      });
    }
    
    // Auto-advance to next question after selection
    if (currentQuestion < zaritQuestions.length - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 300);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < zaritQuestions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        const nextQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(nextQuestionIndex);
        setQuestionStartTime(new Date());
        setVisitedQuestions(prev => new Set(prev).add(nextQuestionIndex));
        setIsAnimating(false);

        // Track navigation
        analytics.trackPageVisit(`question_${nextQuestionIndex + 1}`);
      }, 150);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        const prevQuestionIndex = currentQuestion - 1;
        setCurrentQuestion(prevQuestionIndex);
        setQuestionStartTime(new Date());
        setVisitedQuestions(prev => new Set(prev).add(prevQuestionIndex));
        setIsAnimating(false);

        // Track backward navigation
        analytics.trackPageVisit(`question_${prevQuestionIndex + 1}_revisit`);
      }, 150);
    }
  };

  const handleSubmit = () => {
    const validAnswers = answers.filter(answer => answer !== -1);
    if (validAnswers.length === zaritQuestions.length) {
      const results = calculateZaritScore(answers);
      
      // Track assessment completion analytics
      if (analytics.hasResearchConsent) {
        const missedQuestions = answers
          .map((answer, index) => answer === -1 ? index + 1 : null)
          .filter(q => q !== null) as number[];

        const riskLevelMapping = {
          'düşük': 'low' as const,
          'orta': 'moderate' as const,
          'yüksek': 'severe' as const,
          'çok yüksek': 'severe' as const
        };

        analytics.trackAssessmentCompletion({
          totalScore: results.score,
          riskLevel: riskLevelMapping[results.riskLevel],
          questionScores: answers,
          missedQuestions,
          assessmentValidity: missedQuestions.length === 0,
          completionTimestamp: new Date()
        });

        // Track user journey completion
        analytics.trackUserJourney({
          entryPoint: 'assessment_form',
          exitPoint: 'assessment_completed',
          navigationPattern: Array.from(visitedQuestions).map(q => `question_${q + 1}`),
          timeOnInstructions: 0, // Could be tracked if instructions page exists
          helpSectionAccessed: false, // Could be tracked if help section exists
          pdfDownloaded: false, // Will be tracked when user downloads PDF
          sessionEvents: ['assessment_start', 'assessment_completed']
        });

        // End the assessment session
        analytics.endAssessmentSession({
          totalScore: results.score,
          riskLevel: riskLevelMapping[results.riskLevel],
          questionScores: answers,
          missedQuestions,
          assessmentValidity: true,
          completionTimestamp: new Date()
        });
      }
      
      onComplete(results);
    }
  };

  const isFormComplete = answers.every(answer => answer !== -1);
  const progress = ((currentQuestion + 1) / zaritQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Soru {currentQuestion + 1} / {zaritQuestions.length}
          </span>
          <span className="text-sm text-gray-600">
            %{Math.round(progress)} tamamlandı
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-teal-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: isAnimating ? 0 : 1, 
          x: isAnimating ? -50 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {zaritQuestions[currentQuestion].text}
        </h2>

        <div className="space-y-3">
          {zaritQuestions[currentQuestion].options.map((option) => (
            <motion.label
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                ${answers[currentQuestion] === option.value
                  ? 'border-teal-500 bg-teal-50 text-teal-800'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option.value}
                checked={answers[currentQuestion] === option.value}
                onChange={() => handleAnswerSelect(option.value)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                ${answers[currentQuestion] === option.value
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-gray-300'
                }
              `}>
                {answers[currentQuestion] === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="text-lg">{option.label}</span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Önceki
        </Button>

        <div className="flex space-x-3">
          {currentQuestion < zaritQuestions.length - 1 ? (
            <Button
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === -1}
              className="flex items-center"
            >
              Sonraki
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isFormComplete}
              variant="secondary"
              className="flex items-center"
            >
              Sonuçları Görüntüle
            </Button>
          )}
        </div>
      </div>

      {/* Answer Summary (Desktop) */}
      <div className="hidden md:block mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Yanıtlarınız:</h3>
        <div className="grid grid-cols-12 gap-2">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                ${answer !== -1
                  ? 'bg-teal-600 text-white'
                  : index === currentQuestion
                  ? 'bg-amber-200 text-amber-800'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Research Consent Modal */}
      <ConsentModal
        isOpen={analytics.showConsentModal}
        onConsent={analytics.setResearchConsent}
        onClose={() => analytics.setShowConsentModal(false)}
      />
    </div>
  );
}
