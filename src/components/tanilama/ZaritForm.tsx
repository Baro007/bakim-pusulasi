'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { zaritQuestions, calculateZaritScore, ZaritResult } from '@/lib/zarit-questions';
import Button from '@/components/ui/Button';

interface ZaritFormProps {
  onComplete: (results: ZaritResult) => void;
}

export default function ZaritForm({ onComplete }: ZaritFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(zaritQuestions.length).fill(-1));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
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
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleSubmit = () => {
    const validAnswers = answers.filter(answer => answer !== -1);
    if (validAnswers.length === zaritQuestions.length) {
      const results = calculateZaritScore(answers);
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
    </div>
  );
}
