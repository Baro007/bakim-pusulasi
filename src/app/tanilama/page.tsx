'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, HeartIcon } from '@heroicons/react/24/outline';
import ZaritForm from '@/components/tanilama/ZaritForm';
import ZaritResults from '@/components/tanilama/ZaritResults';
import { ZaritResult } from '@/lib/zarit-questions';

export default function TanilamaPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'form' | 'results'>('intro');
  const [results, setResults] = useState<ZaritResult | null>(null);

  const handleFormComplete = (zaritResults: ZaritResult) => {
    setResults(zaritResults);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentStep('intro');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Step */}
        {currentStep === 'intro' && (
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="mb-8">
              <ClipboardDocumentListIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Bakım Yükü Değerlendirmesi
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zarit Bakım Verme Yükü Ölçeği ile mevcut durumunuzu objektif olarak değerlendirin. 
                Bu bilimsel ölçek, yaşadığınız zorlukları anlamanıza ve doğru destek kaynaklarına 
                yönlendirilmenize yardımcı olacaktır.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Değerlendirme Öncesi Bilgilendirme
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <HeartIcon className="w-5 h-5 text-teal-600 mr-2" />
                    Bu ölçek nedir?
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Uluslararası geçerliliği kanıtlanmış bilimsel bir ölçektir</li>
                    <li>• 12 sorudan oluşur ve 5-10 dakikada tamamlanır</li>
                    <li>• Bakım verme yükünüzü nesnel olarak ölçer</li>
                    <li>• Sonuçlar tamamen gizlidir ve kişiseldir</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <HeartIcon className="w-5 h-5 text-teal-600 mr-2" />
                    Nasıl yanıtlamalı?
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• İlk içgüdünüzle, dürüstçe yanıtlayın</li>
                    <li>• Son 1 aydaki durumunuzu değerlendirin</li>
                    <li>• Her soruyu dikkatli okuyun</li>
                    <li>• Kendinizi yargılamayın, bu normal bir süreçtir</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                <p className="text-teal-800 text-sm font-medium">
                  💡 Hatırlatma: Bu değerlendirme bir tanı aracı değildir. Profesyonel sağlık 
                  danışmanlığının yerini tutmaz. Sonuçlarınızı sağlık ekibinizle paylaşmanızı öneriyoruz.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentStep('form')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Değerlendirmeye Başla
            </motion.button>
          </motion.div>
        )}

        {/* Form Step */}
        {currentStep === 'form' && (
          <ZaritForm onComplete={handleFormComplete} />
        )}

        {/* Results Step */}
        {currentStep === 'results' && results && (
          <ZaritResults results={results} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
