'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircleIcon, 
  HeartIcon, 
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import type { CaregiverProfile, PatientInformation, MentalHealthScreening } from '@/lib/zarit-questions';
import { zaritQuestions, calculateZaritScore } from '@/lib/zarit-questions';
import { submitAssessment } from '@/lib/supabase-client';
import ZaritResults from './ZaritResults';
import InformedConsent from './InformedConsent';

// Mobile-first, elderly-friendly form for ZBI-12 assessment
// 3 sections: A) Caregiver Profile, B) Patient Info, C) ZBI-12 Questions

type FormSection = 'caregiver' | 'patient' | 'zbi' | 'mental_health' | 'results';

interface FormState {
  caregiver: Partial<CaregiverProfile>;
  patient: Partial<PatientInformation>;
  zaritAnswers: number[];
  mentalHealth: Partial<MentalHealthScreening>;
}

export default function NewZaritForm() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [currentSection, setCurrentSection] = useState<FormSection>('caregiver');
  const [formData, setFormData] = useState<FormState>({
    caregiver: {},
    patient: {},
    zaritAnswers: Array(12).fill(-1),
    mentalHealth: {},
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  // Calculate progress percentage
  const getProgress = () => {
    if (currentSection === 'caregiver') return 0;
    if (currentSection === 'patient') return 33;
    if (currentSection === 'zbi') {
      const answeredCount = formData.zaritAnswers.filter((a) => a !== -1).length;
      return 33 + (answeredCount / 12) * 34;
    }
    return 100;
  };

  // Section navigation
  const goToNextSection = () => {
    if (currentSection === 'caregiver') setCurrentSection('patient');
    else if (currentSection === 'patient') setCurrentSection('zbi');
  };

  const goToPreviousSection = () => {
    if (currentSection === 'patient') setCurrentSection('caregiver');
    else if (currentSection === 'zbi') setCurrentSection('patient');
  };

  // ZBI answer handler
  const handleZBIAnswer = (value: number) => {
    const newAnswers = [...formData.zaritAnswers];
    newAnswers[currentQuestionIndex] = value;
    setFormData({ ...formData, zaritAnswers: newAnswers });

    // Auto-advance to next question
    if (currentQuestionIndex < 11) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    } else {
      // All ZBI questions answered, proceed to mental health screening (optional)
      setTimeout(() => setCurrentSection('mental_health'), 500);
    }
  };

  // Form submission
  const handleSubmit = async (answers: number[]) => {
    setIsSubmitting(true);

    const completedAt = new Date().toISOString();
    const completionTimeSeconds = Math.floor(
      (new Date(completedAt).getTime() - new Date(startTime).getTime()) / 1000
    );

    const zaritResult = calculateZaritScore(answers);

    const submission = {
      caregiver: formData.caregiver as CaregiverProfile,
      patient: formData.patient as PatientInformation,
      zarit_answers: answers,
      zarit_result: zaritResult,
      mental_health: formData.mentalHealth, // Optional PHQ-2 & GAD-2
      session_metadata: {
        device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        user_agent: navigator.userAgent,
        completion_time_seconds: completionTimeSeconds,
        started_at: startTime,
        completed_at: completedAt,
      },
    };

    const response = await submitAssessment(submission);

    if (response.success) {
      console.log('✅ Assessment submitted successfully:', response.data);
      setCurrentSection('results');
    } else {
      console.error('❌ Assessment submission failed:', response.error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }

    setIsSubmitting(false);
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="h-2 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="px-4 py-2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {currentSection === 'caregiver' && 'Bölüm A: Sizin Hikayeniz'}
          {currentSection === 'patient' && 'Bölüm B: Onun Dünyası'}
          {currentSection === 'zbi' && `Bölüm C: Duygularınız (${currentQuestionIndex + 1}/12)`}
          {currentSection === 'results' && 'Sonuçlarınız'}
        </p>
      </div>
    </div>
  );

  // Show consent screen first
  if (!consentGiven) {
    return <InformedConsent onAccept={() => setConsentGiven(true)} />;
  }

  if (currentSection === 'results') {
    const result = calculateZaritScore(formData.zaritAnswers);
    const handleRestart = () => {
      setCurrentSection('caregiver');
      setFormData({
        caregiver: {},
        patient: {},
        zaritAnswers: Array(12).fill(-1),
        mentalHealth: {},
      });
      setCurrentQuestionIndex(0);
    };
    return <ZaritResults results={result} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ProgressBar />

      {/* Main Content - Mobile Optimized */}
      <div className="pt-24 px-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {currentSection === 'caregiver' && (
            <CaregiverSection
              data={formData.caregiver}
              onChange={(data) => setFormData({ ...formData, caregiver: data })}
              onNext={goToNextSection}
            />
          )}

          {currentSection === 'patient' && (
            <PatientSection
              data={formData.patient}
              onChange={(data) => setFormData({ ...formData, patient: data })}
              onNext={goToNextSection}
              onBack={goToPreviousSection}
            />
          )}

          {currentSection === 'zbi' && (
            <ZBISection
              currentQuestion={currentQuestionIndex}
              answers={formData.zaritAnswers}
              onAnswer={handleZBIAnswer}
              onBack={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                } else {
                  goToPreviousSection();
                }
              }}
              isSubmitting={isSubmitting}
            />
          )}

          {currentSection === 'mental_health' && (
            <MentalHealthSection
              data={formData.mentalHealth}
              onChange={(data) => setFormData({ ...formData, mentalHealth: data })}
              onSkip={() => handleSubmit(formData.zaritAnswers)}
              onSubmit={() => handleSubmit(formData.zaritAnswers)}
              onBack={() => {
                setCurrentQuestionIndex(11);
                setCurrentSection('zbi');
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// SECTION A: Caregiver Profile (31 fields - Accordion UI)
function CaregiverSection({
  data,
  onChange,
  onNext,
}: {
  data: Partial<CaregiverProfile>;
  onChange: (data: Partial<CaregiverProfile>) => void;
  onNext: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('A1');

  // Validation for each category
  const isCategoryComplete = (category: string) => {
    switch (category) {
      case 'A1': // Temel Demografik
        return data.name && data.age && data.gender;
      case 'A2': // Eğitim & Literacy
        return data.educationLevel;
      case 'A3': // Çalışma & Ekonomi
        return data.employmentStatus;
      case 'A4': // Sağlık & Sigorta (all optional)
        return true;
      case 'A5': // Bakım Verme Özellikleri
        return (
          data.relationshipToPatient &&
          data.primaryCaregiver !== undefined &&
          data.hoursPerDay !== undefined &&
          data.hoursPerDay >= 0 &&
          data.hoursPerDay <= 24 &&
          data.caregivingDurationMonths !== undefined &&
          data.caregivingDurationMonths >= 0 &&
          data.livingArrangement
        );
      case 'A6': // Sosyal Destek (all optional)
        return true;
      default:
        return false;
    }
  };

  const isComplete = 
    isCategoryComplete('A1') && 
    isCategoryComplete('A2') && 
    isCategoryComplete('A3') && 
    isCategoryComplete('A5'); // A4 & A6 optional

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <UserCircleIcon className="w-20 h-20 mx-auto text-purple-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bölüm A: Sizin Hikayeniz</h2>
        <p className="text-lg text-gray-600">Pusulanın merkezi sizsiniz</p>
      </div>

      {/* A1: Temel Demografik */}
      <AccordionCategory
        id="A1"
        title="1️⃣ Temel Bilgiler"
        isActive={activeCategory === 'A1'}
        isComplete={isCategoryComplete('A1')}
        onClick={() => setActiveCategory('A1')}
      >
        <FormField label="Adınız Soyadınız" required>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="form-input-large"
            placeholder="Adınızı yazın..."
          />
        </FormField>

        <FormField label="Yaşınız" required>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => onChange({ ...data, age: parseInt(e.target.value) })}
            className="form-input-large"
            placeholder="Örn: 45"
          />
        </FormField>

        <FormField label="Cinsiyetiniz" required>
          <div className="grid grid-cols-2 gap-3">
            {['Kadın', 'Erkek'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({ ...data, gender: option === 'Kadın' ? 'female' : 'male' })
                }
                className={`btn-option ${
                  data.gender === (option === 'Kadın' ? 'female' : 'male') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Medeni Haliniz">
          <select
            value={data.maritalStatus || ''}
            onChange={(e) => onChange({ ...data, maritalStatus: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="married">Evli</option>
            <option value="single">Bekar</option>
            <option value="widowed">Dul</option>
            <option value="divorced">Boşanmış</option>
          </select>
        </FormField>

        <FormField label="Doğum Yeriniz (İl)">
          <input
            type="text"
            value={data.birthplace || ''}
            onChange={(e) => onChange({ ...data, birthplace: e.target.value })}
            className="form-input-large"
            placeholder="Örn: İstanbul"
          />
        </FormField>
      </AccordionCategory>

      {/* A2: Eğitim & Literacy */}
      <AccordionCategory
        id="A2"
        title="2️⃣ Eğitim Durumu"
        isActive={activeCategory === 'A2'}
        isComplete={isCategoryComplete('A2')}
        onClick={() => setActiveCategory('A2')}
      >
        <FormField label="Eğitim Seviyeniz" required>
          <select
            value={data.educationLevel || ''}
            onChange={(e) => onChange({ ...data, educationLevel: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="illiterate">Okur-Yazar Değil</option>
            <option value="primary">İlkokul</option>
            <option value="secondary">Ortaokul</option>
            <option value="high_school">Lise</option>
            <option value="university">Üniversite</option>
            <option value="graduate">Lisansüstü</option>
          </select>
        </FormField>

        <FormField label="Sağlık bilginizi nasıl değerlendirirsiniz? (1-5)">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, healthLiteracy: val })}
                className={`flex-1 py-4 text-xl font-semibold rounded-xl transition-all ${
                  data.healthLiteracy === val
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">1: Çok Kötü → 5: Çok İyi</p>
        </FormField>

        <FormField label="Bakım verme eğitimi aldınız mı?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({ ...data, receivedCaregivingTraining: option === 'Evet' })
                }
                className={`btn-option ${
                  data.receivedCaregivingTraining === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        {data.receivedCaregivingTraining && (
          <FormField label="Eğitim Türü">
            <select
              value={data.trainingType || ''}
              onChange={(e) => onChange({ ...data, trainingType: e.target.value as any })}
              className="form-input-large"
            >
              <option value="">Seçiniz...</option>
              <option value="disease_specific">Hastalığa Özel</option>
              <option value="general_care">Genel Bakım</option>
              <option value="online">Online</option>
              <option value="other">Diğer</option>
            </select>
          </FormField>
        )}
      </AccordionCategory>

      {/* A3: Çalışma & Ekonomi */}
      <AccordionCategory
        id="A3"
        title="3️⃣ İş ve Ekonomi"
        isActive={activeCategory === 'A3'}
        isComplete={isCategoryComplete('A3')}
        onClick={() => setActiveCategory('A3')}
      >
        <FormField label="Çalışma Durumunuz" required>
          <select
            value={data.employmentStatus || ''}
            onChange={(e) => onChange({ ...data, employmentStatus: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="full_time">Tam Zamanlı Çalışıyor</option>
            <option value="part_time">Yarı Zamanlı Çalışıyor</option>
            <option value="unemployed">İşsiz</option>
            <option value="retired">Emekli</option>
            <option value="homemaker">Ev Hanımı/Ev Erkeği</option>
            <option value="unable_to_work">Çalışamıyor</option>
          </select>
        </FormField>

        <FormField label="Mesleğiniz">
          <input
            type="text"
            value={data.occupation || ''}
            onChange={(e) => onChange({ ...data, occupation: e.target.value })}
            className="form-input-large"
            placeholder="Örn: Öğretmen"
          />
        </FormField>

        <FormField label="Bakım vermek için işinizi kaybettiniz mi?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({ ...data, jobLossDueToCaregiving: option === 'Evet' })
                }
                className={`btn-option ${
                  data.jobLossDueToCaregiving === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="İş-bakım çatışması ne sıklıkta? (1-5)">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, workCaregivingConflict: val })}
                className={`flex-1 py-4 text-xl font-semibold rounded-xl transition-all ${
                  data.workCaregivingConflict === val
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">1: Hiç Yok → 5: Her Zaman Var</p>
        </FormField>

        <FormField label="Aylık Hane Geliri">
          <select
            value={data.monthlyHouseholdIncome || ''}
            onChange={(e) => onChange({ ...data, monthlyHouseholdIncome: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="<15K">15.000 TL'den Az</option>
            <option value="15-30K">15.000 - 30.000 TL</option>
            <option value="30-50K">30.000 - 50.000 TL</option>
            <option value="50-75K">50.000 - 75.000 TL</option>
            <option value="75K+">75.000 TL Üzeri</option>
          </select>
        </FormField>

        <FormField label="Mali destek alıyor musunuz?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({ ...data, receivingFinancialSupport: option === 'Evet' })
                }
                className={`btn-option ${
                  data.receivingFinancialSupport === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Mali baskı seviyeniz">
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'none', label: 'Yok' },
              { value: 'mild', label: 'Hafif' },
              { value: 'moderate', label: 'Orta' },
              { value: 'severe', label: 'Şiddetli' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, financialStrain: option.value as any })}
                className={`btn-option ${
                  data.financialStrain === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>
      </AccordionCategory>

      {/* A4: Sağlık & Sigorta */}
      <AccordionCategory
        id="A4"
        title="4️⃣ Sağlık Durumu"
        isActive={activeCategory === 'A4'}
        isComplete={isCategoryComplete('A4')}
        onClick={() => setActiveCategory('A4')}
      >
        <FormField label="Sağlık Sigorta Türü">
          <select
            value={data.healthInsurance || ''}
            onChange={(e) => onChange({ ...data, healthInsurance: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="sgk">SGK</option>
            <option value="private">Özel Sigorta</option>
            <option value="both">Her İkisi</option>
            <option value="none">Yok</option>
          </select>
        </FormField>

        <FormField label="Kronik hastalığınız var mı?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...data, hasChronicDisease: option === 'Evet' })}
                className={`btn-option ${
                  data.hasChronicDisease === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        {data.hasChronicDisease && (
          <FormField label="Kronik Hastalıklarınız (birden fazla seçebilirsiniz)">
            <div className="space-y-2">
              {[
                '🩺 Hipertansiyon (Tansiyon)',
                '💉 Diyabet (Şeker)',
                '❤️ Kalp Hastalığı',
                '🫁 Astım/KOAH',
                '🦴 Kemik-Eklem Hastalığı',
                '🧠 Migren/Baş Ağrısı',
                '📋 Diğer',
              ].map((disease) => (
                <button
                  key={disease}
                  type="button"
                  onClick={() => {
                    const current = data.chronicDiseaseTypes || [];
                    const updated = current.includes(disease)
                      ? current.filter((d) => d !== disease)
                      : [...current, disease];
                    onChange({ ...data, chronicDiseaseTypes: updated });
                  }}
                  className={`w-full btn-option text-left ${
                    data.chronicDiseaseTypes?.includes(disease) ? 'active' : ''
                  }`}
                >
                  {disease}
                </button>
              ))}
            </div>
          </FormField>
        )}

        <FormField label="Düzenli ilaç kullanıyor musunuz?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...data, regularMedicationUse: option === 'Evet' })}
                className={`btn-option ${
                  data.regularMedicationUse === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Ruh sağlığı geçmişi">
          <select
            value={data.mentalHealthHistory || ''}
            onChange={(e) => onChange({ ...data, mentalHealthHistory: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="none">Yok</option>
            <option value="depression">Depresyon</option>
            <option value="anxiety">Anksiyete</option>
            <option value="other">Diğer</option>
          </select>
        </FormField>
      </AccordionCategory>

      {/* A5: Bakım Verme Özellikleri */}
      <AccordionCategory
        id="A5"
        title="5️⃣ Bakım Verme Bilgileri"
        isActive={activeCategory === 'A5'}
        isComplete={isCategoryComplete('A5')}
        onClick={() => setActiveCategory('A5')}
      >
        <FormField label="Hasta ile yakınlığınız" required>
          <select
            value={data.relationshipToPatient || ''}
            onChange={(e) => onChange({ ...data, relationshipToPatient: e.target.value })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="Eş">Eş</option>
            <option value="Çocuk">Çocuk</option>
            <option value="Kardeş">Kardeş</option>
            <option value="Torun">Torun</option>
            <option value="Diğer">Diğer Akraba</option>
          </select>
        </FormField>

        <FormField label="Birincil bakım veren siz misiniz?" required>
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...data, primaryCaregiver: option === 'Evet' })}
                className={`btn-option ${
                  data.primaryCaregiver === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Günde kaç saat bakım veriyorsunuz?" required>
          <input
            type="number"
            min="0"
            max="24"
            value={data.hoursPerDay || ''}
            onChange={(e) => onChange({ ...data, hoursPerDay: parseInt(e.target.value) || 0 })}
            className="form-input-large"
            placeholder="Örn: 8"
          />
        </FormField>

        <FormField label="Kaç aydır bakım veriyorsunuz?" required>
          <input
            type="number"
            min="0"
            value={data.caregivingDurationMonths || ''}
            onChange={(e) =>
              onChange({ ...data, caregivingDurationMonths: parseInt(e.target.value) || 0 })
            }
            className="form-input-large"
            placeholder="Örn: 12"
          />
        </FormField>

        <FormField label="Yaşam Düzeni" required>
          <select
            value={data.livingArrangement || ''}
            onChange={(e) => onChange({ ...data, livingArrangement: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="same_house">Aynı Evde</option>
            <option value="separate_houses">Ayrı Evlerde</option>
            <option value="other">Diğer</option>
          </select>
        </FormField>

        <FormField label="Başka bakım verenler var mı?">
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'yes_regular', label: 'Evet, Düzenli' },
              { value: 'yes_occasional', label: 'Evet, Ara Sıra' },
              { value: 'no', label: 'Hayır' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, otherCaregivers: option.value as any })}
                className={`btn-option ${
                  data.otherCaregivers === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>
      </AccordionCategory>

      {/* A6: Sosyal Destek */}
      <AccordionCategory
        id="A6"
        title="6️⃣ Sosyal Destek"
        isActive={activeCategory === 'A6'}
        isComplete={isCategoryComplete('A6')}
        onClick={() => setActiveCategory('A6')}
      >
        <FormField label="Aile desteğini nasıl değerlendirirsiniz? (1-5)">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, familySupportPerception: val })}
                className={`flex-1 py-4 text-xl font-semibold rounded-xl transition-all ${
                  data.familySupportPerception === val
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">1: Çok Kötü → 5: Çok İyi</p>
        </FormField>

        <FormField label="Arkadaş/komşu desteği (1-5)">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, friendNeighborSupport: val })}
                className={`flex-1 py-4 text-xl font-semibold rounded-xl transition-all ${
                  data.friendNeighborSupport === val
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">1: Hiç Yok → 5: Çok Var</p>
        </FormField>

        <FormField label="Evde bakım hizmetlerinden yararlanıyor musunuz?">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...data, usingHomeCareServices: option === 'Evet' })}
                className={`btn-option ${
                  data.usingHomeCareServices === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Devlet desteği alıyor musunuz? (Valilik/Belediye)">
          <div className="grid grid-cols-2 gap-3">
            {['Evet', 'Hayır'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({ ...data, receivingGovernmentSupport: option === 'Evet' })
                }
                className={`btn-option ${
                  data.receivingGovernmentSupport === (option === 'Evet') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>
      </AccordionCategory>

      <button
        onClick={onNext}
        disabled={!isComplete}
        className="btn-primary-large w-full"
      >
        Devam Et <ArrowRightIcon className="w-6 h-6 ml-2" />
      </button>
    </motion.div>
  );
}

// SECTION B: Patient Information (16 fields - Literature-based)
function PatientSection({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Partial<PatientInformation>;
  onChange: (data: Partial<PatientInformation>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const isComplete = data.age && data.gender && data.primaryDiagnosis && data.mobilityStatus && data.cognitionStatus;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <HeartIcon className="w-20 h-20 mx-auto text-red-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bölüm B: Onun Dünyası</h2>
        <p className="text-lg text-gray-600">Sizin gözünüzden hastanız</p>
      </div>

      {/* B1: Demografik (3 alan) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Temel Bilgiler</h3>
        
        <FormField label="Hasta yaşı" required>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => onChange({ ...data, age: parseInt(e.target.value) })}
            className="form-input-large"
            placeholder="Örn: 75"
          />
        </FormField>

        <FormField label="Hasta cinsiyeti" required>
          <div className="grid grid-cols-2 gap-3">
            {['Kadın', 'Erkek'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...data, gender: option === 'Kadın' ? 'female' : 'male' })}
                className={`btn-option ${
                  data.gender === (option === 'Kadın' ? 'female' : 'male') ? 'active' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Eğitim seviyesi">
          <select
            value={data.educationLevel || ''}
            onChange={(e) => onChange({ ...data, educationLevel: e.target.value as any })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="illiterate">Okur-Yazar Değil</option>
            <option value="primary">İlkokul</option>
            <option value="secondary">Ortaokul</option>
            <option value="high_school">Lise</option>
            <option value="university">Üniversite</option>
            <option value="graduate">Lisansüstü</option>
          </select>
        </FormField>
      </div>

      {/* B2: Klinik Durum (6 alan) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🏥 Sağlık Durumu</h3>
        
        <FormField label="Ana hastalığı nedir?" required>
          <select
            value={data.primaryDiagnosis || ''}
            onChange={(e) => onChange({ ...data, primaryDiagnosis: e.target.value })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <optgroup label="🧠 Hafıza ve Beyin Hastalıkları">
              <option value="Alzheimer Hastalığı">Alzheimer (Hafıza Kaybı)</option>
              <option value="Demans">Demans (Bunama)</option>
              <option value="Parkinson Hastalığı">Parkinson (Titreme, Hareket Zorluğu)</option>
              <option value="İnme (Felç)">İnme (Felç)</option>
              <option value="MS (Multipl Skleroz)">MS (Sinir Hastalığı)</option>
            </optgroup>
            <optgroup label="❤️ Kalp ve Damar Hastalıkları">
              <option value="Kalp Yetmezliği">Kalp Yetmezliği</option>
              <option value="Kalp Krizi Geçmişi">Kalp Krizi Geçmişi</option>
              <option value="Damar Tıkanıklığı">Damar Tıkanıklığı</option>
            </optgroup>
            <optgroup label="🫁 Solunum Hastalıkları">
              <option value="KOAH">KOAH (Nefes Darlığı)</option>
              <option value="Astım">Astım</option>
              <option value="Akciğer Hastalığı">Akciğer Hastalığı</option>
            </optgroup>
            <optgroup label="🦴 Kas-İskelet Hastalıkları">
              <option value="Felç (Yatalak)">Felç (Yatalak)</option>
              <option value="Kırık Sonrası Hareket Kısıtlılığı">Kırık Sonrası Hareket Kısıtlılığı</option>
              <option value="Omurga Sorunları">Omurga/Bel Sorunları</option>
              <option value="Romatizma">Romatizma (Eklem Ağrısı)</option>
            </optgroup>
            <optgroup label="🩺 Diğer Kronik Hastalıklar">
              <option value="Kanser">Kanser</option>
              <option value="Böbrek Yetmezliği">Böbrek Yetmezliği (Diyaliz)</option>
              <option value="Diyabet Komplikasyonları">Diyabet Komplikasyonları (Şeker Hastalığı)</option>
              <option value="Karaciğer Hastalığı">Karaciğer Hastalığı</option>
            </optgroup>
            <option value="Diğer">Diğer (Listede yok)</option>
          </select>
        </FormField>

        {data.primaryDiagnosis === 'Diğer' && (
          <FormField label="Lütfen hastalığı yazınız" required>
            <input
              type="text"
              value={
                data.primaryDiagnosis?.startsWith('Diğer: ')
                  ? data.primaryDiagnosis.replace('Diğer: ', '')
                  : ''
              }
              onChange={(e) =>
                onChange({
                  ...data,
                  primaryDiagnosis: e.target.value ? `Diğer: ${e.target.value}` : 'Diğer',
                })
              }
              className="form-input-large"
              placeholder="Hastalık adını yazınız..."
            />
          </FormField>
        )}

        <FormField label="Tanı süresi (yıl)">
          <input
            type="number"
            min="0"
            value={data.diagnosisDurationYears || ''}
            onChange={(e) => onChange({ ...data, diagnosisDurationYears: parseInt(e.target.value) || undefined })}
            className="form-input-large"
            placeholder="Örn: 3"
          />
        </FormField>

        <FormField label="Başka hastalıkları var mı? (birden fazla seçebilirsiniz)">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Hastanızın ana hastalığı dışında başka kronik hastalıkları varsa işaretleyin
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: 'Yok', label: '✅ Başka hastalığı yok' },
              { value: 'Hipertansiyon (Tansiyon)', label: '🩺 Hipertansiyon (Tansiyon Yüksekliği)' },
              { value: 'Diyabet (Şeker)', label: '💉 Diyabet (Şeker Hastalığı)' },
              { value: 'Kalp Hastalığı', label: '❤️ Kalp Hastalığı' },
              { value: 'KOAH (Nefes Darlığı)', label: '🫁 KOAH (Nefes Darlığı)' },
              { value: 'Astım', label: '🌬️ Astım' },
              { value: 'Böbrek Hastalığı', label: '🩺 Böbrek Hastalığı' },
              { value: 'Karaciğer Hastalığı', label: '🩺 Karaciğer Hastalığı' },
              { value: 'Osteoporoz (Kemik Erimesi)', label: '🦴 Osteoporoz (Kemik Erimesi)' },
              { value: 'Romatizma (Eklem Ağrısı)', label: '🦴 Romatizma (Eklem Ağrısı)' },
              { value: 'Tiroid Hastalığı', label: '🩺 Tiroid Hastalığı' },
              { value: 'Anemi (Kansızlık)', label: '🩸 Anemi (Kansızlık)' },
              { value: 'Göz Hastalığı (Katarakt vb.)', label: '👁️ Göz Hastalığı (Katarakt, Glokom)' },
              { value: 'Diğer', label: '📋 Diğer' },
            ].map((disease) => (
              <button
                key={disease.value}
                type="button"
                onClick={() => {
                  const current = data.comorbidities || [];
                  // "Yok" seçiliyse diğerlerini temizle
                  if (disease.value === 'Yok') {
                    onChange({ ...data, comorbidities: ['Yok'] });
                  } else {
                    // "Yok" varsa kaldır, yeni hastalık ekle
                    const filtered = current.filter((d) => d !== 'Yok');
                    const updated = filtered.includes(disease.value)
                      ? filtered.filter((d) => d !== disease.value)
                      : [...filtered, disease.value];
                    onChange({ ...data, comorbidities: updated.length > 0 ? updated : undefined });
                  }
                }}
                className={`w-full btn-option text-left ${
                  data.comorbidities?.includes(disease.value) ? 'active' : ''
                }`}
              >
                {disease.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Hastalık Evresi">
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'early', label: 'Erken' },
              { value: 'moderate', label: 'Orta' },
              { value: 'advanced', label: 'İleri' },
              { value: 'terminal', label: 'Terminal' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, diseaseStage: option.value as any })}
                className={`btn-option ${
                  data.diseaseStage === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Davranış değişiklikleri var mı?">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Sinirlilik, saldırganlık, huzursuzluk, halüsinasyon (olmayan şeyler görmek) gibi
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'no', label: '✅ Yok, sakin' },
              { value: 'yes_mild', label: '⚠️ Hafif (Bazen sinirli, huzursuz olur)' },
              { value: 'yes_severe', label: '🔴 Şiddetli (Sık sık agresif, kontrol zor)' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, neuropsychiatricSymptoms: option.value as any })}
                className={`btn-option ${
                  data.neuropsychiatricSymptoms === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Ağrı seviyesi (0-10)">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, painLevel: val })}
                className={`flex-1 py-4 text-lg font-semibold rounded-xl transition-all ${
                  data.painLevel === val
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">0: Ağrı Yok → 10: Dayanılmaz Ağrı</p>
        </FormField>
      </div>

      {/* B3: Fonksiyonel Durum (4 alan) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🚶 Fonksiyonel Durum</h3>
        
        <FormField label="Hareket durumu" required>
          <select
            value={data.mobilityStatus || ''}
            onChange={(e) => onChange({ ...data, mobilityStatus: e.target.value })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="Bağımsız">Bağımsız</option>
            <option value="Yardımla yürüyebiliyor">Yardımla Yürüyebiliyor</option>
            <option value="Tekerlekli sandalye">Tekerlekli Sandalye</option>
            <option value="Yatalak">Yatalak</option>
          </select>
        </FormField>

        <FormField label="Zihinsel durum" required>
          <select
            value={data.cognitionStatus || ''}
            onChange={(e) => onChange({ ...data, cognitionStatus: e.target.value })}
            className="form-input-large"
          >
            <option value="">Seçiniz...</option>
            <option value="Normal">Normal</option>
            <option value="Hafif unutkanlık">Hafif Unutkanlık</option>
            <option value="Orta demans">Orta Demans</option>
            <option value="İleri demans">İleri Demans</option>
          </select>
        </FormField>

        <FormField label="Temel ihtiyaçlarını karşılayabiliyor mu?">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Yemek yeme, giyinme, banyo yapma, tuvalete gitme gibi günlük işler
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'independent', label: '✅ Bağımsız (Hepsini kendi başına yapabilir)' },
              { value: 'partially_dependent', label: '⚠️ Kısmen Bağımlı (Bazılarında yardım lazım)' },
              { value: 'fully_dependent', label: '🔴 Tam Bağımlı (Hepsinde yardım lazım)' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, adlDependencyLevel: option.value as any })}
                className={`btn-option text-left ${
                  data.adlDependencyLevel === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Ev işleri ve sosyal aktiviteleri yapabiliyor mu?">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Alışveriş, temizlik, yemek pişirme, telefon kullanma, ilaç takibi, para yönetimi
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'independent', label: '✅ Bağımsız (Kendi başına yapabilir)' },
              { value: 'partially_dependent', label: '⚠️ Kısmen Bağımlı (Bazılarında yardım lazım)' },
              { value: 'fully_dependent', label: '🔴 Tam Bağımlı (Hiçbirini yapamıyor)' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, iadlDependencyLevel: option.value as any })}
                className={`btn-option text-left ${
                  data.iadlDependencyLevel === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>
      </div>

      {/* B4: Bakım & Tedavi (3 alan) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">💊 Bakım ve Tedavi</h3>
        
        <FormField label="Hangi tıbbi cihazları kullanıyor? (birden fazla seçebilirsiniz)">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Hastanızın kullandığı tıbbi cihaz veya yardımcı malzemeler
          </p>
          <div className="space-y-2">
            {[
              { value: 'Hiçbiri', label: '✅ Hiçbiri kullanmıyor' },
              { value: 'Oksijen Cihazı', label: '🫁 Oksijen Cihazı (Evde oksijen desteği)' },
              { value: 'Gıda Sondası (PEG/NG)', label: '🍽️ Gıda Sondası (Burnu/Midesi ile beslenme)' },
              { value: 'İdrar Sondası (Kateter)', label: '💧 İdrar Sondası (Kateter)' },
              { value: 'Yara Bakım Malzemeleri', label: '🩹 Yara Bakım Malzemeleri (Pansuman)' },
              { value: 'Tekerlekli Sandalye', label: '♿ Tekerlekli Sandalye' },
              { value: 'Yatak (Hasta Yatağı)', label: '🛏️ Hasta Yatağı (Özel yatak)' },
              { value: 'Hasta Kaldırma Lifti', label: '⚙️ Hasta Kaldırma Lifti' },
              { value: 'Nebulizatör (İlaç Buharlaştırıcı)', label: '🌬️ Nebulizatör (Solunum cihazı)' },
              { value: 'Aspiratör (Balgam Alma)', label: '🩺 Aspiratör (Balgam alma cihazı)' },
              { value: 'Tansiyon/Şeker Ölçüm Cihazı', label: '📊 Tansiyon/Şeker Ölçüm Cihazı' },
              { value: 'Diğer', label: '📋 Diğer' },
            ].map((equipment) => (
              <button
                key={equipment.value}
                type="button"
                onClick={() => {
                  const current = data.medicalEquipmentUsed || [];
                  if (equipment.value === 'Hiçbiri') {
                    onChange({ ...data, medicalEquipmentUsed: ['Hiçbiri'] });
                  } else {
                    const filtered = current.filter((e) => e !== 'Hiçbiri');
                    const updated = filtered.includes(equipment.value)
                      ? filtered.filter((e) => e !== equipment.value)
                      : [...filtered, equipment.value];
                    onChange({ ...data, medicalEquipmentUsed: updated.length > 0 ? updated : undefined });
                  }
                }}
                className={`w-full btn-option text-left ${
                  data.medicalEquipmentUsed?.includes(equipment.value) ? 'active' : ''
                }`}
              >
                {equipment.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Evde hangi sağlık hizmetlerinden yararlanıyor? (birden fazla seçebilirsiniz)">
          <p className="text-sm text-gray-600 mb-3">
            ℹ️ Eve gelen sağlık personeli veya destek hizmetleri
          </p>
          <div className="space-y-2">
            {[
              { value: 'Hiçbiri', label: '✅ Hiçbir hizmet almıyoruz' },
              { value: 'Hemşire Ziyareti', label: '👩‍⚕️ Hemşire Ziyareti (İğne, pansuman vb.)' },
              { value: 'Fizyoterapi', label: '🤸 Fizyoterapi (Egzersiz, masaj)' },
              { value: 'Doktor Ziyareti', label: '👨‍⚕️ Doktor Ziyareti (Evde muayene)' },
              { value: 'Evde Bakım Elemanı', label: '🧑‍🦳 Evde Bakım Elemanı (7/24 veya günlük)' },
              { value: 'Solunum Terapisti', label: '🫁 Solunum Terapisti' },
              { value: 'Beslenme Danışmanı', label: '🍎 Beslenme Danışmanı (Diyetisyen)' },
              { value: 'Psikolojik Destek', label: '🧠 Psikolojik Destek (Hasta veya yakın için)' },
              { value: 'Sosyal Hizmet Desteği', label: '🤝 Sosyal Hizmet Desteği (Belediye/Valilik)' },
              { value: 'Diğer', label: '📋 Diğer' },
            ].map((service) => (
              <button
                key={service.value}
                type="button"
                onClick={() => {
                  const current = data.homeHealthcareServices || [];
                  if (service.value === 'Hiçbiri') {
                    onChange({ ...data, homeHealthcareServices: ['Hiçbiri'] });
                  } else {
                    const filtered = current.filter((s) => s !== 'Hiçbiri');
                    const updated = filtered.includes(service.value)
                      ? filtered.filter((s) => s !== service.value)
                      : [...filtered, service.value];
                    onChange({ ...data, homeHealthcareServices: updated.length > 0 ? updated : undefined });
                  }
                }}
                className={`w-full btn-option text-left ${
                  data.homeHealthcareServices?.includes(service.value) ? 'active' : ''
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Son 6 ayda kaç kez hastaneye yatırıldı?">
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '0', label: 'Hiç' },
              { value: '1-2', label: '1-2 Kez' },
              { value: '3+', label: '3+ Kez' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ ...data, hospitalizationLast6Months: option.value as any })}
                className={`btn-option ${
                  data.hospitalizationLast6Months === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary-large flex-1">
          <ArrowLeftIcon className="w-6 h-6 mr-2" /> Geri
        </button>
        <button type="button" onClick={onNext} disabled={!isComplete} className="btn-primary-large flex-1">
          Devam Et <ArrowRightIcon className="w-6 h-6 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}

// SECTION C: ZBI-12 Questions
function ZBISection({
  currentQuestion,
  answers,
  onAnswer,
  onBack,
  isSubmitting,
}: {
  currentQuestion: number;
  answers: number[];
  onAnswer: (value: number) => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  const question = zaritQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <ClipboardDocumentCheckIcon className="w-20 h-20 mx-auto text-blue-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bölüm C: Duygularınız</h2>
        <p className="text-lg text-gray-600">
          Soru {currentQuestion + 1} / 12
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
        <p className="text-2xl font-medium text-gray-900 leading-relaxed mb-8">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`btn-option-zbi ${currentAnswer === option.value ? 'active' : ''}`}
            >
              <CheckCircleIcon
                className={`w-6 h-6 mr-3 ${
                  currentAnswer === option.value ? 'text-white' : 'text-gray-400'
                }`}
              />
              <span className="text-xl">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={onBack} className="btn-secondary-large w-full" disabled={isSubmitting}>
        <ArrowLeftIcon className="w-6 h-6 mr-2" /> Geri Dön
      </button>

      {isSubmitting && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Sonuçlarınız hazırlanıyor...</p>
        </div>
      )}
    </motion.div>
  );
}

// SECTION D: Mental Health Screening (PHQ-2 + GAD-2) - Optional
function MentalHealthSection({
  data,
  onChange,
  onSkip,
  onSubmit,
  onBack,
}: {
  data: Partial<MentalHealthScreening>;
  onChange: (data: Partial<MentalHealthScreening>) => void;
  onSkip: () => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'phq2' | 'gad2'>('intro');

  const handlePHQ2Complete = () => {
    const phq2Total = (data.phq2_anhedonia || 0) + (data.phq2_depressed || 0);
    onChange({
      ...data,
      phq2_total: phq2Total,
      phq2_positive: phq2Total >= 3,
    });
    setCurrentScreen('gad2');
  };

  const handleGAD2Complete = () => {
    const gad2Total = (data.gad2_nervous || 0) + (data.gad2_worry || 0);
    onChange({
      ...data,
      gad2_total: gad2Total,
      gad2_positive: gad2Total >= 3,
    });
    onSubmit();
  };

  const phqGadOptions = [
    { value: 0, label: 'Hiç' },
    { value: 1, label: 'Birkaç Gün' },
    { value: 2, label: 'Günlerin Yarısından Fazlası' },
    { value: 3, label: 'Hemen Hemen Her Gün' },
  ];

  if (currentScreen === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <HeartIcon className="w-20 h-20 mx-auto text-teal-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Opsiyonel: Ruh Sağlığı Taraması</h2>
          <p className="text-lg text-gray-600 mb-6">
            Son 2 haftada kendinizi nasıl hissettiğinizle ilgili 4 kısa soru. İsterseniz atlayabilirsiniz.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">📊 Neden Soruyoruz?</h3>
          <p className="text-blue-800">
            Bakım verme yükü, bazen depresyon ve anksiyete belirtilerini tetikleyebilir. Bu kısa tarama, erken fark edilmesi için yardımcı olabilir. Tamamen gizlidir ve opsiyoneldir.
          </p>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onSkip} className="btn-secondary-large flex-1">
            Atla
          </button>
          <button type="button" onClick={() => setCurrentScreen('phq2')} className="btn-primary-large flex-1">
            Devam Et <ArrowRightIcon className="w-6 h-6 ml-2" />
          </button>
        </div>

        <button type="button" onClick={onBack} className="text-center w-full text-gray-500 py-2">
          ← Önceki Bölüme Dön
        </button>
      </motion.div>
    );
  }

  if (currentScreen === 'phq2') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <HeartIcon className="w-20 h-20 mx-auto text-purple-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Depresyon Taraması (PHQ-2)</h2>
          <p className="text-lg text-gray-600">Son 2 haftada ne sıklıkta yaşadınız?</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-2xl font-medium text-gray-900 mb-4">
              1. Yaptığınız işlerden zevk almama veya ilgi duymama?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phqGadOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ ...data, phq2_anhedonia: option.value as any })}
                  className={`btn-option ${data.phq2_anhedonia === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-2xl font-medium text-gray-900 mb-4">
              2. Kendinizi üzgün, depresif veya umutsuz hissetme?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phqGadOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ ...data, phq2_depressed: option.value as any })}
                  className={`btn-option ${data.phq2_depressed === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePHQ2Complete}
          disabled={data.phq2_anhedonia === undefined || data.phq2_depressed === undefined}
          className="btn-primary-large w-full"
        >
          Devam Et <ArrowRightIcon className="w-6 h-6 ml-2" />
        </button>
      </motion.div>
    );
  }

  if (currentScreen === 'gad2') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <HeartIcon className="w-20 h-20 mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Anksiyete Taraması (GAD-2)</h2>
          <p className="text-lg text-gray-600">Son 2 haftada ne sıklıkta yaşadınız?</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-2xl font-medium text-gray-900 mb-4">
              3. Sinirli, endişeli veya gergin hissetme?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phqGadOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ ...data, gad2_nervous: option.value as any })}
                  className={`btn-option ${data.gad2_nervous === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-2xl font-medium text-gray-900 mb-4">
              4. Endişelenmeyi durduramama veya kontrol edememe?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phqGadOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ ...data, gad2_worry: option.value as any })}
                  className={`btn-option ${data.gad2_worry === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGAD2Complete}
          disabled={data.gad2_nervous === undefined || data.gad2_worry === undefined}
          className="btn-primary-large w-full"
        >
          Tamamla ve Sonuçlara Git <ArrowRightIcon className="w-6 h-6 ml-2" />
        </button>
      </motion.div>
    );
  }

  return null;
}

// Accordion Category Component (Collapsible Section)
function AccordionCategory({
  id,
  title,
  isActive,
  isComplete,
  onClick,
  children,
}: {
  id: string;
  title: string;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
      <button
        type="button"
        onClick={onClick}
        className={`w-full px-6 py-5 flex items-center justify-between transition-all ${
          isActive ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-50'
        }`}
      >
        <span className="text-xl font-bold">{title}</span>
        <div className="flex items-center space-x-3">
          {isComplete && (
            <CheckCircleIcon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-green-500'}`} />
          )}
          <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg
              className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Form Field Component
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xl font-semibold text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
