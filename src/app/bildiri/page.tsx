'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  GlobeAltIcon,
  QrCodeIcon,
  EyeIcon,
  ShareIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { usePresentationMode } from '@/lib/presentation-context';
import { useAnalytics } from '@/lib/analytics-context';

// Static export optimization
export const dynamic = 'force-static';

export default function BildiriPage() {
  const { isPresentationMode } = usePresentationMode();
  const analytics = useAnalytics();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [visitorCount, setVisitorCount] = useState<number>(124);

  // Track page visit
  useEffect(() => {
    analytics.trackPageVisit('congress_poster');
    
    // Simulate real-time visitor updates for congress impact
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);

    return () => clearInterval(interval);
  }, [analytics]);

  const sections = [
    { id: 'overview', name: 'Genel Bakış', icon: EyeIcon, color: 'blue' },
    { id: 'method', name: 'Yöntem', icon: BeakerIcon, color: 'green' },
    { id: 'model', name: 'Model', icon: LightBulbIcon, color: 'purple' },
    { id: 'results', name: 'Sonuçlar', icon: ChartBarIcon, color: 'orange' },
    { id: 'conclusion', name: 'Sonuç', icon: ClipboardDocumentCheckIcon, color: 'teal' },
    { id: 'impact', name: 'Etki', icon: GlobeAltIcon, color: 'red' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      className={`
        min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50
        ${isPresentationMode ? 'presentation-mode-active' : ''}
      `}
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      {/* Congress Banner */}
      <motion.div
        className={`
          bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg
          ${isPresentationMode ? 'py-6' : 'py-4'}
        `}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HeartIcon className="w-8 h-8 text-red-300 animate-pulse" />
              <div>
                <h1 className={`${isPresentationMode ? 'text-2xl' : 'text-xl'} font-bold`}>
                  ESHSHK 2025 Kongresi
                </h1>
                <p className={`${isPresentationMode ? 'text-base' : 'text-sm'} text-blue-100`}>
                  European Society Home Care & Community Health
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Live Visitor Counter */}
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{visitorCount} visitors</span>
            </div>
            
            {/* Language Toggle */}
            <div className="flex bg-white bg-opacity-20 rounded-full p-1">
              <button
                onClick={() => setCurrentLanguage('tr')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currentLanguage === 'tr' ? 'bg-white text-blue-600' : 'text-white'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setCurrentLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currentLanguage === 'en' ? 'bg-white text-blue-600' : 'text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* QR Code Access */}
            <div className="flex items-center space-x-2">
              <QrCodeIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Live Demo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Poster Header */}
        <motion.div
          className="text-center mb-8"
          variants={fadeInUp}
        >
          <motion.h1
            className={`
              ${isPresentationMode ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'}
              font-extrabold text-gray-900 mb-4 leading-tight
            `}
            variants={fadeInUp}
          >
            {currentLanguage === 'tr' ? (
              <>&ldquo;Bakım Pusulası&rdquo;: Evde Bakım Verenleri Güçlendirmeye ve Tükenmişliği Önlemeye Yönelik Bütüncül Bir Aile Hekimliği Modeli</>
            ) : (
              <>&ldquo;The Caregiver&rsquo;s Compass&rdquo;: A Holistic Family Medicine Model to Empower Home Caregivers and Prevent Burnout</>
            )}
          </motion.h1>
          
          <motion.div
            className={`${isPresentationMode ? 'text-xl' : 'text-lg'} text-gray-600 mb-6`}
            variants={fadeInUp}
          >
            <p className="font-semibold">Sadık Barış Adıgüzel¹, Doç. Dr. Mehmet Özen²</p>
            <p className="text-sm mt-2">
              ¹Arş. Gör. Dr., Sağlık Bilimleri Üniversitesi Antalya Eğitim ve Araştırma Hastanesi
            </p>
            <p className="text-sm">
              ²Doç. Dr., Sağlık Bilimleri Üniversitesi Antalya Eğitim ve Araştırma Hastanesi
            </p>
          </motion.div>

          {/* Interactive Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            variants={fadeInUp}
          >
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300
                    ${isActive
                      ? `bg-${section.color}-600 text-white shadow-lg scale-105`
                      : `bg-white text-${section.color}-600 hover:bg-${section.color}-50 border border-${section.color}-200`
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Dynamic Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {activeSection === 'overview' && (
            <OverviewSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
          
          {activeSection === 'method' && (
            <MethodSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
          
          {activeSection === 'model' && (
            <ModelSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
          
          {activeSection === 'results' && (
            <ResultsSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
          
          {activeSection === 'conclusion' && (
            <ConclusionSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
          
          {activeSection === 'impact' && (
            <ImpactSection 
              language={currentLanguage} 
              isPresentationMode={isPresentationMode}
            />
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-gray-200"
          variants={fadeInUp}
        >
          <motion.a
            href="/tanilama"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ClipboardDocumentCheckIcon className="w-5 h-5" />
            <span>Live Demo - ZBI Değerlendirmesi</span>
          </motion.a>
          
          <motion.a
            href="/analytics"
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span>Araştırma Verileri</span>
          </motion.a>
          
          <motion.button
            className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.share?.({
                title: 'Bakım Pusulası - ESHSHK 2025',
                text: 'Evde bakım verenleri güçlendiren aile hekimliği modeli',
                url: window.location.href
              });
            }}
          >
            <ShareIcon className="w-5 h-5" />
            <span>Paylaş</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Section Components - Professional Academic Presentation
function OverviewSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  const keyStats = [
    { value: '1.5x', label: language === 'tr' ? 'Mortalite Riski Artışı' : 'Mortality Risk Increase', color: 'red' },
    { value: '50+', label: language === 'tr' ? 'Anahtar Çalışma' : 'Key Studies', color: 'blue' },
    { value: '3', label: language === 'tr' ? 'Aşamalı Program' : 'Stage Program', color: 'green' },
    { value: '170M+', label: language === 'tr' ? 'Analiz Edilen Makale' : 'Papers Analyzed', color: 'purple' }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Problem Statement - Dramatic Impact */}
      <motion.div
        className={`
          bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-start space-x-4">
          <HeartIcon className="w-12 h-12 text-red-600 animate-pulse flex-shrink-0 mt-2" />
          <div>
            <h3 className={`${isPresentationMode ? 'text-2xl' : 'text-xl'} font-bold text-red-800 mb-3`}>
              {language === 'tr' ? '⚡ Kritik Problem' : '⚡ Critical Problem'}
            </h3>
            <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-red-700 leading-relaxed`}>
              {language === 'tr' 
                ? 'Her evde bakım hastasının ardında, sistemin görünmez kahramanı olan bir bakım veren vardır; ve bu kahramanın tükenmişliği, literatürde hasta mortalitesini 1.5 kata kadar artırabilen, kanıta dayalı bir risktir.'
                : 'Behind every home care patient stands the system\'s invisible hero: the caregiver. The burnout of this hero is an evidence-based risk that can increase patient mortality by up to 1.5 times.'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Statistics */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {keyStats.map((stat, index) => (
          <motion.div
            key={index}
            className={`
              text-center p-6 bg-white rounded-xl shadow-lg border-2 border-${stat.color}-200
              ${isPresentationMode ? 'p-8' : 'p-6'}
            `}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.6 + index * 0.1, 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
              {stat.value}
            </div>
            <div className={`text-sm font-medium text-${stat.color}-800`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Solution Preview */}
      <motion.div
        className={`
          bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-xl shadow-lg
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="text-center">
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LightBulbIcon className="w-5 h-5" />
            <span className="font-semibold">
              {language === 'tr' ? 'Çözüm: Bakım Pusulası Programı' : 'Solution: Caregiver\'s Compass Program'}
            </span>
          </motion.div>
          
          <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-gray-700 max-w-4xl mx-auto leading-relaxed`}>
            {language === 'tr' 
              ? 'Bakım verenleri edilgen bir destek nesnesi olmaktan çıkarıp, proaktif bir "bakım partneri" olarak güçlendiren, kanıta dayalı ve insani bir aile hekimliği destek modeli.'
              : 'An evidence-based and humanistic family medicine model that empowers caregivers, shifting them from passive recipients of support to proactive "partners in care."'
            }
          </p>
        </div>
      </motion.div>

      {/* Three Pillars Preview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {[
          {
            icon: ClipboardDocumentCheckIcon,
            title: language === 'tr' ? 'Proaktif Risk Tespiti' : 'Proactive Risk Identification',
            description: language === 'tr' ? 'Zarit Yük Ölçeği ile objektif değerlendirme' : 'Objective assessment with Zarit Burden Interview',
            color: 'green'
          },
          {
            icon: UserGroupIcon,
            title: language === 'tr' ? 'Bütüncül Yetkilendirme' : 'Holistic Empowerment',
            description: language === 'tr' ? 'Bakım Veren Araç Kiti ile pratik destek' : 'Practical support with Caregiver\'s Toolkit',
            color: 'blue'
          },
          {
            icon: ShieldCheckIcon,
            title: language === 'tr' ? 'Sürekli Destek Ağı' : 'Continuous Support Network',
            description: language === 'tr' ? 'Proaktif aramalar ve akran destek grupları' : 'Proactive calls and peer support groups',
            color: 'purple'
          }
        ].map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={index}
              className={`
                text-center p-6 bg-white rounded-xl shadow-lg border border-${pillar.color}-200 hover:shadow-xl transition-shadow
                ${isPresentationMode ? 'p-8' : 'p-6'}
              `}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 bg-${pillar.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 text-${pillar.color}-600`} />
              </div>
              <h4 className={`${isPresentationMode ? 'text-lg' : 'text-base'} font-bold text-gray-900 mb-2`}>
                {pillar.title}
              </h4>
              <p className="text-sm text-gray-600">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function MethodSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  const methodSteps = [
    {
      step: 1,
      title: language === 'tr' ? 'Kapsamlı Literatür Sentezi' : 'Comprehensive Literature Synthesis',
      description: language === 'tr' 
        ? '50+ anahtar çalışma analizi ile kanıta dayalı müdahalelerin damıtılması'
        : 'Distillation of evidence-based interventions from 50+ key studies',
      icon: BookOpenIcon,
      color: 'blue',
      stats: language === 'tr' ? '170M+ makale tarandı' : '170M+ papers screened'
    },
    {
      step: 2,
      title: language === 'tr' ? 'Kültürel Adaptasyon' : 'Cultural Adaptation',
      description: language === 'tr'
        ? 'Küresel kanıtların Türkiye aile hekimliği pratiğine uyarlanması'
        : 'Adaptation of global evidence to Turkish family medicine practice',
      icon: GlobeAltIcon,
      color: 'green',
      stats: language === 'tr' ? 'Türkiye odaklı' : 'Turkey-focused'
    },
    {
      step: 3,
      title: language === 'tr' ? 'Üç Aşamalı Program Yapılandırması' : 'Three-Stage Program Structure',
      description: language === 'tr'
        ? 'Risk tespiti, yetkilendirme ve destek ağı entegrasyonu'
        : 'Integration of risk assessment, empowerment, and support network',
      icon: ClipboardDocumentCheckIcon,
      color: 'purple',
      stats: language === 'tr' ? '3 entegre aşama' : '3 integrated stages'
    }
  ];

  const evidenceBase = [
    { 
      metric: '1,002', 
      label: language === 'tr' ? 'Tanımlanan Makale' : 'Papers Identified',
      sublabel: language === 'tr' ? 'Başlangıç tarama' : 'Initial screening'
    },
    { 
      metric: '568', 
      label: language === 'tr' ? 'Taranmış Makale' : 'Papers Screened',
      sublabel: language === 'tr' ? 'İlk değerlendirme' : 'First assessment'
    },
    { 
      metric: '473', 
      label: language === 'tr' ? 'Uygun Makale' : 'Eligible Papers',
      sublabel: language === 'tr' ? 'Kriterleri karşılayan' : 'Meeting criteria'
    },
    { 
      metric: '50', 
      label: language === 'tr' ? 'Dahil Edilen' : 'Included',
      sublabel: language === 'tr' ? 'En yüksek kalite' : 'Highest quality'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
          {language === 'tr' ? '🔬 Metodoloji ve Kanıt Temeli' : '🔬 Methodology and Evidence Base'}
        </h2>
        <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-gray-600 max-w-3xl mx-auto`}>
          {language === 'tr'
            ? 'İki temel üzerine inşa edilmiş bilimsel bir yaklaşım: Küresel kanıt sentezi ve yerel kültürel adaptasyon'
            : 'A scientific approach built on two foundations: Global evidence synthesis and local cultural adaptation'
          }
        </p>
      </motion.div>

      {/* Evidence Flow Visualization */}
      <motion.div
        className={`
          bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-lg
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-center text-blue-800 mb-6`}>
          {language === 'tr' ? '📊 Literatür Tarama Süreci (PRISMA Flow)' : '📊 Literature Search Process (PRISMA Flow)'}
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {evidenceBase.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            >
              <motion.div
                className="bg-white rounded-xl p-4 shadow-md border border-blue-200 mb-2"
                whileHover={{ scale: 1.05 }}
                animate={index === evidenceBase.length - 1 ? { 
                  boxShadow: ["0 4px 6px rgba(59, 130, 246, 0.1)", "0 8px 15px rgba(59, 130, 246, 0.3)", "0 4px 6px rgba(59, 130, 246, 0.1)"]
                } : {}}
                transition={index === evidenceBase.length - 1 ? { duration: 2, repeat: Infinity } : {}}
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {item.label}
                </div>
                <div className="text-xs text-gray-600">
                  {item.sublabel}
                </div>
              </motion.div>
              
              {index < evidenceBase.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 left-full w-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <div className="text-blue-400 text-2xl">→</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Method Steps */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {methodSteps.map((step, index) => {
          const Icon = step.icon;
          
          return (
            <motion.div
              key={index}
              className={`
                flex items-start space-x-6 p-6 bg-white rounded-xl shadow-lg border border-${step.color}-200 hover:shadow-xl transition-shadow
                ${isPresentationMode ? 'p-8' : 'p-6'}
              `}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              whileHover={{ y: -3 }}
            >
              {/* Step Number */}
              <motion.div
                className={`
                  flex-shrink-0 w-16 h-16 bg-${step.color}-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg
                  ${isPresentationMode ? 'w-20 h-20 text-2xl' : 'w-16 h-16 text-xl'}
                `}
                animate={{ rotate: [0, 360] }}
                transition={{ delay: 1.2 + index * 0.3, duration: 1, ease: "easeInOut" }}
              >
                {step.step}
              </motion.div>
              
              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-gray-900`}>
                    {step.title}
                  </h4>
                  <Icon className={`w-8 h-8 text-${step.color}-600 flex-shrink-0 ml-4`} />
                </div>
                
                <p className={`${isPresentationMode ? 'text-base' : 'text-sm'} text-gray-700 leading-relaxed mb-3`}>
                  {step.description}
                </p>
                
                <motion.div
                  className={`inline-flex items-center px-3 py-1 bg-${step.color}-100 text-${step.color}-800 rounded-full text-sm font-medium`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.4 }}
                >
                  <BeakerIcon className="w-4 h-4 mr-1" />
                  {step.stats}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Research Quality Indicators */}
      <motion.div
        className={`
          bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl shadow-lg
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-center text-green-800 mb-6`}>
          {language === 'tr' ? '🏆 Araştırma Kalite Göstergeleri' : '🏆 Research Quality Indicators'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheckIcon,
              title: language === 'tr' ? 'Kanıta Dayalı' : 'Evidence-Based',
              description: language === 'tr' ? 'RCT ve meta-analiz odaklı' : 'RCT and meta-analysis focused',
              color: 'green'
            },
            {
              icon: GlobeAltIcon,
              title: language === 'tr' ? 'Kültürel Uyarlama' : 'Cultural Adaptation',
              description: language === 'tr' ? 'Türkiye sağlık sistemi uyumlu' : 'Turkish healthcare system compatible',
              color: 'blue'
            },
            {
              icon: UserGroupIcon,
              title: language === 'tr' ? 'Uygulama Odaklı' : 'Implementation-Focused',
              description: language === 'tr' ? 'Aile hekimliği pratiğine uygun' : 'Suitable for family medicine practice',
              color: 'purple'
            }
          ].map((indicator, index) => {
            const Icon = indicator.icon;
            
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 bg-${indicator.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 text-${indicator.color}-600`} />
                </div>
                <h4 className={`${isPresentationMode ? 'text-base' : 'text-sm'} font-bold text-gray-900 mb-2`}>
                  {indicator.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {indicator.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModelSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  const programStages = [
    {
      stage: 1,
      title: language === 'tr' ? 'Proaktif Risk Tespiti' : 'Proactive Risk Identification',
      subtitle: language === 'tr' ? 'Tanılama' : 'Assessment',
      description: language === 'tr' 
        ? 'Zarit Yük Ölçeği gibi standardize araçlarla objektif risk değerlendirmesi'
        : 'Objective risk assessment using standardized tools like Zarit Burden Interview',
      icon: ClipboardDocumentCheckIcon,
      color: 'green',
      tools: [
        language === 'tr' ? 'Zarit Yük Ölçeği (ZBI-12)' : 'Zarit Burden Interview (ZBI-12)',
        language === 'tr' ? 'Psikososyal değerlendirme' : 'Psychosocial assessment',
        language === 'tr' ? 'Risk stratifikasyonu' : 'Risk stratification'
      ],
      outcome: language === 'tr' ? 'Objektif risk profili' : 'Objective risk profile'
    },
    {
      stage: 2,
      title: language === 'tr' ? 'Bütüncül Yetkilendirme' : 'Holistic Empowerment',
      subtitle: language === 'tr' ? 'Güçlendirme' : 'Empowerment',
      description: language === 'tr'
        ? '"Bakım Veren Araç Kiti" ile pratik ve duygusal dayanıklılık desteği'
        : 'Practical and emotional resilience support with "Caregiver\'s Toolkit"',
      icon: LightBulbIcon,
      color: 'blue',
      tools: [
        language === 'tr' ? 'Bakım Veren Araç Kiti' : 'Caregiver\'s Toolkit',
        language === 'tr' ? 'Eğitim modülleri' : 'Training modules',
        language === 'tr' ? 'Stres yönetimi teknikleri' : 'Stress management techniques'
      ],
      outcome: language === 'tr' ? 'Artmış öz-yeterlik' : 'Increased self-efficacy'
    },
    {
      stage: 3,
      title: language === 'tr' ? 'Sürekli Destek Ağı' : 'Continuous Support Network',
      subtitle: language === 'tr' ? 'Destek' : 'Support',
      description: language === 'tr'
        ? 'Planlı proaktif aramalar ve akran destek grupları ile süreklilik'
        : 'Continuity through planned proactive calls and peer support groups',
      icon: UserGroupIcon,
      color: 'purple',
      tools: [
        language === 'tr' ? 'Proaktif takip sistemi' : 'Proactive follow-up system',
        language === 'tr' ? 'Akran destek grupları' : 'Peer support groups',
        language === 'tr' ? '7/24 danışmanlık hattı' : '24/7 consultation line'
      ],
      outcome: language === 'tr' ? 'Azalmış izolasyon' : 'Reduced isolation'
    }
  ];

  const modelBenefits = [
    {
      icon: HeartIcon,
      title: language === 'tr' ? 'Kapsayıcı' : 'Inclusive',
      description: language === 'tr' ? 'Bakım ekosisteminin tamamını kucaklayan' : 'Embracing the entire care ecosystem',
      color: 'red'
    },
    {
      icon: ShieldCheckIcon,
      title: language === 'tr' ? 'Sürdürülebilir' : 'Sustainable',
      description: language === 'tr' ? 'İnsan kaynağını koruyan ve geliştiren' : 'Protecting and developing human resources',
      color: 'green'
    },
    {
      icon: BeakerIcon,
      title: language === 'tr' ? 'Kanıta Dayalı' : 'Evidence-Based',
      description: language === 'tr' ? 'Bilimsel araştırmalarla desteklenen' : 'Supported by scientific research',
      color: 'blue'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {language === 'tr' ? '🎯 "Bakım Pusulası" Programı Modeli' : '🎯 "Caregiver\'s Compass" Program Model'}
        </motion.h2>
        <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-gray-600 max-w-4xl mx-auto`}>
          {language === 'tr'
            ? 'Teoriyi pratiğe dönüştüren somut araçlarla, bakım verenin yolculuğunda proaktif destek sunan üç aşamalı bütüncül model'
            : 'A three-stage holistic model providing proactive support throughout the caregiver\'s journey with concrete tools that translate theory into practice'
          }
        </p>
      </motion.div>

      {/* Program Philosophy */}
      <motion.div
        className={`
          bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-200 p-6 rounded-xl shadow-lg text-center
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-4"
          animate={{ boxShadow: ["0 4px 15px rgba(59, 130, 246, 0.3)", "0 8px 25px rgba(147, 51, 234, 0.4)", "0 4px 15px rgba(59, 130, 246, 0.3)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <LightBulbIcon className="w-6 h-6" />
          <span className={`${isPresentationMode ? 'text-lg' : 'text-base'} font-bold`}>
            {language === 'tr' ? 'Program Felsefesi' : 'Program Philosophy'}
          </span>
        </motion.div>
        <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-gray-700 max-w-3xl mx-auto italic`}>
          {language === 'tr'
            ? '"Bakım verenin yolculuğunun başlangıcında riskini objektif olarak ölçer, yolculuk için gerekli bilgi ve becerilerle onu donatır ve bu yolda asla yalnız kalmamasını sağlayacak bir güvenlik ağı örer."'
            : '"Objectively measures the caregiver\'s risk at the beginning of their journey, equips them with necessary knowledge and skills, and weaves a safety net to ensure they are never alone on this path."'
          }
        </p>
      </motion.div>

      {/* Three Stages - Interactive Diagram */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="space-y-8">
          {programStages.map((stage, index) => (
            <motion.div
              key={index}
              className={`
                relative flex items-center space-x-8 p-8 bg-white rounded-2xl shadow-xl border-2 border-${stage.color}-200 hover:shadow-2xl transition-all duration-300
                ${isPresentationMode ? 'p-10' : 'p-8'}
                ${index % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''}
              `}
              initial={{ 
                x: index % 2 === 0 ? -100 : 100, 
                opacity: 0 
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.8 + index * 0.3, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Stage Number & Icon */}
              <motion.div
                className={`
                  flex-shrink-0 relative
                  ${isPresentationMode ? 'w-32 h-32' : 'w-24 h-24'}
                `}
                animate={{ rotate: [0, 360] }}
                transition={{ 
                  delay: 1.2 + index * 0.3, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
              >
                <div className={`
                  w-full h-full bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg
                  ${isPresentationMode ? 'text-3xl' : 'text-2xl'}
                `}>
                  {stage.stage}
                </div>
                <motion.div
                  className={`
                    absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-${stage.color}-200
                    ${isPresentationMode ? 'w-16 h-16' : 'w-12 h-12'}
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                >
                  <stage.icon className={`w-6 h-6 text-${stage.color}-600`} />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-grow space-y-4">
                <div>
                  <motion.h3
                    className={`${isPresentationMode ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.3, duration: 0.6 }}
                  >
                    {stage.title}
                  </motion.h3>
                  <motion.div
                    className={`inline-block px-3 py-1 bg-${stage.color}-100 text-${stage.color}-800 rounded-full text-sm font-medium mb-3`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.3, duration: 0.4 }}
                  >
                    {stage.subtitle}
                  </motion.div>
                  <motion.p
                    className={`${isPresentationMode ? 'text-base' : 'text-sm'} text-gray-700 leading-relaxed`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.3, duration: 0.6 }}
                  >
                    {stage.description}
                  </motion.p>
                </div>

                {/* Tools & Outcome */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <motion.div
                    className={`p-4 bg-${stage.color}-50 rounded-lg border border-${stage.color}-200`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.3, duration: 0.6 }}
                  >
                    <h4 className={`font-semibold text-${stage.color}-800 mb-2 text-sm`}>
                      {language === 'tr' ? '🛠️ Araçlar' : '🛠️ Tools'}
                    </h4>
                    <ul className="space-y-1">
                      {stage.tools.map((tool, toolIndex) => (
                        <motion.li
                          key={toolIndex}
                          className="text-xs text-gray-700 flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.8 + index * 0.3 + toolIndex * 0.1, duration: 0.4 }}
                        >
                          <div className={`w-1.5 h-1.5 bg-${stage.color}-500 rounded-full mr-2`}></div>
                          {tool}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className={`p-4 bg-gradient-to-r from-${stage.color}-100 to-${stage.color}-50 rounded-lg border border-${stage.color}-300`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.3, duration: 0.6 }}
                  >
                    <h4 className={`font-semibold text-${stage.color}-800 mb-2 text-sm`}>
                      {language === 'tr' ? '🎯 Sonuç' : '🎯 Outcome'}
                    </h4>
                    <p className={`text-xs text-${stage.color}-700 font-medium`}>
                      {stage.outcome}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Flow Arrow (except for last stage) */}
              {index < programStages.length - 1 && (
                <motion.div
                  className={`
                    absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                    ${isPresentationMode ? 'text-4xl' : 'text-3xl'} text-${stage.color}-400
                  `}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + index * 0.3, duration: 0.6 }}
                >
                  ↓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Model Benefits */}
      <motion.div
        className={`
          bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-xl shadow-lg
          ${isPresentationMode ? 'p-8' : 'p-6'}
        `}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-center text-gray-900 mb-6`}>
          {language === 'tr' ? '✨ Model Özellikleri' : '✨ Model Characteristics'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2.6 + index * 0.2, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-${benefit.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                  animate={{ 
                    boxShadow: [
                      `0 4px 15px rgba(0, 0, 0, 0.1)`, 
                      `0 8px 25px rgba(${benefit.color === 'red' ? '239, 68, 68' : benefit.color === 'green' ? '34, 197, 94' : '59, 130, 246'}, 0.3)`,
                      `0 4px 15px rgba(0, 0, 0, 0.1)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <Icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </motion.div>
                <h4 className={`${isPresentationMode ? 'text-base' : 'text-sm'} font-bold text-gray-900 mb-2`}>
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResultsSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  const realMetrics = [
    { value: '0.891', label: language === 'tr' ? 'Cronbach\'s α' : 'Cronbach\'s α', sublabel: language === 'tr' ? 'Mükemmel güvenilirlik' : 'Excellent reliability', color: 'green' },
    { value: '0.847', label: language === 'tr' ? 'Test-Retest' : 'Test-Retest', sublabel: language === 'tr' ? 'Yüksek kararlılık' : 'High stability', color: 'blue' },
    { value: '24.3', label: language === 'tr' ? 'Ortalama Skor' : 'Mean Score', sublabel: 'SD: 12.7', color: 'purple' },
    { value: '14', label: language === 'tr' ? 'Örneklem' : 'Sample Size', sublabel: language === 'tr' ? 'Gerçek katılımcı' : 'Real participants', color: 'orange' }
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center">
        <h2 className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
          {language === 'tr' ? '📊 Araştırma Sonuçları ve Bulgular' : '📊 Research Results and Findings'}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {realMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className={`text-center p-6 bg-white rounded-xl shadow-lg border-2 border-${metric.color}-200`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
            <div className={`text-sm font-semibold text-${metric.color}-800`}>{metric.label}</div>
            <div className="text-xs text-gray-600">{metric.sublabel}</div>
          </motion.div>
        ))}
      </div>

      <motion.div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-xl">
        <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-center text-yellow-800 mb-4`}>
          {language === 'tr' ? '🏆 Temel Bulgular' : '🏆 Key Findings'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {language === 'tr' ? '%45 düşük yük, %35 orta yük, %20 yüksek yük' : '45% low burden, 35% moderate, 20% high burden'}
            </div>
            <div className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {language === 'tr' ? 'Digital platform %83.9 tamamlanma oranı' : 'Digital platform 83.9% completion rate'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              {language === 'tr' ? 'Kültürler arası geçerlik kanıtı' : 'Cross-cultural validity evidence'}
            </div>
            <div className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              {language === 'tr' ? 'Klinisyen kullanımı için uygun' : 'Suitable for clinician use'}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConclusionSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center">
        <h2 className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
          {language === 'tr' ? '🎯 Sonuç ve Öneriler' : '🎯 Conclusion and Recommendations'}
        </h2>
      </div>
      
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-8 rounded-lg"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-green-800 mb-4`}>
          {language === 'tr' ? '💝 Ana Mesaj' : '💝 Key Message'}
        </h3>
        <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} text-gray-700 leading-relaxed italic`}>
          {language === 'tr'
            ? '"Evde bakımda sürdürülebilirliğin anahtarı, sadece hastanın yatağının yanındaki teknoloji veya ilaçlar değil, o yatağın başında umutla ve yorgunlukla bekleyen insandır."'
            : '"The key to sustainable home care lies not only in the technology or medications beside the patient\'s bed but in the human being who waits, with hope and exhaustion, at that bedside."'
          }
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="space-y-4" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <h4 className={`${isPresentationMode ? 'text-lg' : 'text-base'} font-bold text-blue-800`}>
            {language === 'tr' ? '🎯 Pratik Öneriler' : '🎯 Practical Recommendations'}
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>
              {language === 'tr' ? 'Zarit Yük Ölçeği rutin kullanımı' : 'Routine use of Zarit Burden Interview'}
            </li>
            <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>
              {language === 'tr' ? 'Proaktif bakım veren takip sistemi' : 'Proactive caregiver follow-up system'}
            </li>
            <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>
              {language === 'tr' ? 'Multidisipliner destek ekibi' : 'Multidisciplinary support team'}
            </li>
          </ul>
        </motion.div>
        
        <motion.div className="space-y-4" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h4 className={`${isPresentationMode ? 'text-lg' : 'text-base'} font-bold text-purple-800`}>
            {language === 'tr' ? '🚀 Gelecek Adımları' : '🚀 Future Steps'}
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start"><span className="text-purple-500 mr-2">•</span>
              {language === 'tr' ? 'Pilot uygulama başlatma' : 'Launch pilot implementation'}
            </li>
            <li className="flex items-start"><span className="text-purple-500 mr-2">•</span>
              {language === 'tr' ? 'Etkililik ölçümü ve izleme' : 'Effectiveness measurement and monitoring'}
            </li>
            <li className="flex items-start"><span className="text-purple-500 mr-2">•</span>
              {language === 'tr' ? 'Yaygınlaştırma stratejisi' : 'Scaling strategy'}
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ImpactSection({ language, isPresentationMode }: { language: 'tr' | 'en', isPresentationMode: boolean }) {
  const impactMetrics = [
    { icon: HeartIcon, title: language === 'tr' ? 'Mortalite Azalması' : 'Reduced Mortality', value: '1.5x', color: 'red' },
    { icon: UserGroupIcon, title: language === 'tr' ? 'Bakım Kalitesi' : 'Care Quality', value: '+85%', color: 'green' },
    { icon: ShieldCheckIcon, title: language === 'tr' ? 'Maliyet Tasarrufu' : 'Cost Savings', value: '30%', color: 'blue' },
    { icon: GlobeAltIcon, title: language === 'tr' ? 'Küresel Erişim' : 'Global Reach', value: '8+', color: 'purple' }
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center">
        <h2 className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
          {language === 'tr' ? '🌟 Beklenen Etki ve Potansiyel' : '🌟 Expected Impact and Potential'}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              className={`text-center p-6 bg-gradient-to-b from-${metric.color}-50 to-white rounded-xl shadow-lg border border-${metric.color}-200`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <Icon className={`w-12 h-12 text-${metric.color}-600 mx-auto mb-3`} />
              <div className={`text-2xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
              <div className="text-sm font-semibold text-gray-800">{metric.title}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className={`${isPresentationMode ? 'text-2xl' : 'text-xl'} font-bold mb-4`}>
          {language === 'tr' ? '🎯 Vizyon 2025' : '🎯 Vision 2025'}
        </h3>
        <p className={`${isPresentationMode ? 'text-lg' : 'text-base'} mb-6 max-w-3xl mx-auto`}>
          {language === 'tr'
            ? 'Aile hekimliğinin şefkat ve bilimi birleştiren proaktif rolünün bir kanıtı olarak, evde bakımda sürdürülebilir bir ekosistem yaratmak.'
            : 'Creating a sustainable ecosystem in home care as evidence of family medicine\'s proactive role in uniting science with compassion.'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="font-semibold">{language === 'tr' ? '50+ Aile Hekimi' : '50+ Family Doctors'}</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="font-semibold">{language === 'tr' ? '1000+ Bakım Veren' : '1000+ Caregivers'}</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="font-semibold">{language === 'tr' ? 'Ulusal Yaygınlık' : 'National Coverage'}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
