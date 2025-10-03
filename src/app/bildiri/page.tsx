'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  GlobeAltIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChartBarIcon,
  LightBulbIcon,
  BeakerIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

export default function BildiriPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Congress Info Banner */}
      <motion.div 
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-12 px-4 shadow-2xl relative overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <AcademicCapIcon className="w-12 h-12" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-black text-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi
          </motion.h1>

          <motion.p
            className="text-center text-xl opacity-90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Sözlü Bildiri Sunumu
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300"
            >
              <CalendarIcon className="w-8 h-8" />
              <div>
                <div className="text-sm opacity-90 font-medium">Tarih</div>
                <div className="font-black text-2xl">13-16 Kasım 2025</div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300"
            >
              <MapPinIcon className="w-8 h-8" />
              <div>
                <div className="text-sm opacity-90 font-medium">Konum</div>
                <div className="font-black text-2xl">Ankara, Türkiye</div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300"
            >
              <UserGroupIcon className="w-8 h-8" />
              <div>
                <div className="text-sm opacity-90 font-medium">Format</div>
                <div className="font-black text-2xl">Sözlü Bildiri</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Title Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="inline-block px-6 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <span className="text-teal-700 font-bold text-sm uppercase tracking-wider">Bildiri Özeti</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
              "Bakım Pusulası"
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-4 max-w-5xl mx-auto leading-relaxed">
            Evde Bakım Verenleri Güçlendirmeye ve Tükenmişliği Önlemeye Yönelik Bütüncül Bir Aile Hekimliği Modeli
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Kanıta Dayalı</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Dijital Platform</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Türkiye'de İlk</span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">170M+ Makale Taraması</span>
          </div>
        </motion.div>

        {/* Authors Section */}
        <motion.div
          className="mb-16 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <UsersIcon className="w-8 h-8 text-teal-600" />
            Yazarlar
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
                  SA
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900">Sadık Barış Adıgüzel</h3>
                  <p className="text-gray-600 font-medium">Arş. Gör. Dr.</p>
                  <p className="text-sm text-gray-500 mt-2">Sağlık Bilimleri Üniversitesi Antalya Eğitim ve Araştırma Hastanesi</p>
                  <p className="text-sm text-gray-500">Aile Hekimliği Anabilim Dalı, Antalya</p>
                  <a href="mailto:sadikbarisadiguzel@gmail.com" className="text-teal-600 hover:text-teal-700 text-sm font-medium mt-2 inline-block">
                    sadikbarisadiguzel@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
                  MÖ
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900">Doç. Dr. Mehmet Özen</h3>
                  <p className="text-gray-600 font-medium">Danışman</p>
                  <p className="text-sm text-gray-500 mt-2">Sağlık Bilimleri Üniversitesi Antalya Eğitim ve Araştırma Hastanesi</p>
                  <p className="text-sm text-gray-500">Aile Hekimliği Anabilim Dalı, Antalya</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problem Statement - Why This Project? */}
        <motion.div
          className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-10 shadow-2xl border-2 border-red-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <LightBulbIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Neden Bu Proje?</h2>
              <p className="text-red-600 font-semibold">Önlenebilir Bir Trajedi</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-black text-red-700 mb-4">📊 Bilimsel Kanıt: Görünmez Hasta</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Her evde bakım hastasının ardında, sistemin <span className="font-black text-red-600">görünmez kahramanı</span> olan bir bakım veren vardır. Bu kahramanın tükenmişliği, literatürde hasta mortalitesini <span className="font-black text-red-600">1.5 kata kadar artırabilen</span>, kanıta dayalı bir risktir <span className="text-sm text-gray-500">[Kuzuya et al., 2011]</span>.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-red-100 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-red-600">1.5x</div>
                  <div className="text-sm font-semibold text-red-700 mt-2">Mortalite Riski Artışı</div>
                  <div className="text-xs text-gray-600 mt-1">[Kuzuya, 2011]</div>
                </div>
                <div className="bg-orange-100 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-orange-600">-0.649</div>
                  <div className="text-sm font-semibold text-orange-700 mt-2">Burden ↔ QoL Korelasyonu</div>
                  <div className="text-xs text-gray-600 mt-1">[Akçoban & Eskimez, 2023]</div>
                </div>
                <div className="bg-yellow-100 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-yellow-600">170M+</div>
                  <div className="text-sm font-semibold text-yellow-700 mt-2">Taranan Makale</div>
                  <div className="text-xs text-gray-600 mt-1">[Consensus AI, 2025]</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-black text-orange-700 mb-4">🇹🇷 Türkiye'deki Boşluk</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700"><strong>Veri Eksikliği:</strong> Türkiye'de kapsamlı bakım veren burden çalışması YOK (mevcut studies: n&lt;100)</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700"><strong>Kültürel Bağlam:</strong> Mediterranean pattern → yüksek burden, yetersiz formal support [Zarzycki et al., 2024]</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-700"><strong>Sistematik Model:</strong> Kanıta dayalı, dijital bakım veren destek modeli eksik</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Evidence Base - Literature Synthesis */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Bilimsel Temel</h2>
            <p className="text-xl text-gray-600">50+ Top Paper ile Desteklenen Kanıt Tabanı</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ChartBarIcon, title: '170M+ Makale', subtitle: 'Consensus AI Taraması', color: 'from-teal-500 to-blue-500' },
              { icon: DocumentTextIcon, title: '50 Top Paper', subtitle: 'Dahil Edilen Çalışma', color: 'from-blue-500 to-purple-500' },
              { icon: BeakerIcon, title: '12 Tematik Cluster', subtitle: 'Sistematik Analiz', color: 'from-purple-500 to-pink-500' },
              { icon: ShieldCheckIcon, title: 'ZBI-12 Validated', subtitle: 'Psychometric Excellence', color: 'from-pink-500 to-red-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 text-center mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center text-sm font-medium">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Findings Accordion */}
          <div className="mt-12 space-y-4">
            <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">Kritik Literatür Bulguları</h3>
            
            {[
              {
                id: 'finding-1',
                title: 'Sosyoekonomik Belirleyiciler (Evidence: 9/10)',
                icon: ChartBarIcon,
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700"><strong>Düşük eğitim → Yüksek burden:</strong> Her eğitim kademesi artışı %15-20 burden azalması [Sezek et al., 2023]</p>
                    <p className="text-gray-700"><strong>Finansal strain → #1 predictor:</strong> Bakım saatlerinden daha güçlü etki! [Wang et al., 2022]</p>
                    <p className="text-gray-700"><strong>İş-bakım çatışması → Mental health:</strong> r = 0.51 with depression [Kayaalp et al., 2020]</p>
                  </div>
                )
              },
              {
                id: 'finding-2',
                title: 'Sosyal Destek Ağları (Evidence: 9/10)',
                icon: UsersIcon,
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700"><strong>Perceived support &gt; Received support:</strong> Algılanan destek gerçek destekten daha önemli! [Del-Pino-Casado et al., 2018]</p>
                    <p className="text-gray-700"><strong>Aile desteği → Strong buffer:</strong> Self-efficacy üzerinden burden azaltır [Leung et al., 2020]</p>
                    <p className="text-gray-700"><strong>Emotional &gt; Practical:</strong> Duygusal destek pratik destekten daha etkili</p>
                  </div>
                )
              },
              {
                id: 'finding-3',
                title: 'Müdahale Etkinliği (Evidence: 8/10)',
                icon: BeakerIcon,
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700"><strong>Eğitim programları:</strong> %40-60 burden azalması (RCT'ler) [Ugur & Erci, 2019; Belgacem et al., 2013]</p>
                    <p className="text-gray-700"><strong>Disease-specific training:</strong> En etkili, 1-6 ay programlar optimal</p>
                    <p className="text-gray-700"><strong>Multimodal delivery:</strong> Online + in-person kombinasyonu accessibility artırıyor</p>
                  </div>
                )
              },
              {
                id: 'finding-4',
                title: 'Türkiye Bağlamı (Evidence: 8/10)',
                icon: GlobeAltIcon,
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700"><strong>Mediterranean pattern:</strong> Yüksek burden, strong family values, traditional gender roles [Zarzycki et al., 2024]</p>
                    <p className="text-gray-700"><strong>Healthcare system gaps:</strong> Limited formal support, high out-of-pocket costs [Lambert et al., 2017]</p>
                    <p className="text-gray-700"><strong>Cultural adaptation needed:</strong> Filial piety, collectivist values consideration [Tran et al., 2025]</p>
                  </div>
                )
              }
            ].map((finding, index) => (
              <motion.div
                key={finding.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <button
                  onClick={() => toggleSection(finding.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <finding.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-lg font-black text-gray-900 text-left">{finding.title}</span>
                  </div>
                  {expandedSection === finding.id ? (
                    <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedSection === finding.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 bg-gray-50/50">
                        {finding.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Model - 3 Stages */}
        <motion.div
          className="mb-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-10 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Bakım Pusulası Modeli</h2>
            <p className="text-xl text-gray-600">3 Aşamalı, Kanıta Dayalı Müdahale Programı</p>
          </div>

          <div className="space-y-8">
            {[
              {
                number: '01',
                title: 'Proaktif Risk Tespiti',
                subtitle: 'TANI',
                icon: ClipboardDocumentCheckIcon,
                color: 'from-teal-500 to-cyan-500',
                description: 'Zarit Yük Ölçeği (ZBI-12) ile bakım verenin yolculuğunun başlangıcında riskini objektif olarak ölçme.',
                features: [
                  'ZBI-12: Psychometric excellence (α = 0.77-0.92)',
                  'Türkçe validasyon, kültürel adaptasyon',
                  'Digital platform: Elderly-friendly UX (Instagram-style)',
                  'Comprehensive predictors: 31 caregiver + 16 patient variables',
                  'PHQ-2/GAD-2 mental health screening'
                ],
                evidence: '[Summart et al., 2025; Hagell et al., 2017]'
              },
              {
                number: '02',
                title: 'Bütüncül Yetkilendirme',
                subtitle: 'YETKİLENDİRME',
                icon: BeakerIcon,
                color: 'from-blue-500 to-indigo-500',
                description: 'Bakım Veren Araç Kiti ile pratik beceriler ve duygusal dayanıklılık desteği.',
                features: [
                  'Disease-specific care skills (evidence-based protocols)',
                  'Coping & stress management strategies',
                  'Self-care and emotional support modules',
                  'Communication & healthcare navigation',
                  'Multimodal delivery: Online + in-person + multimedia'
                ],
                evidence: '[Sarmadi et al., 2025; Cheng et al., 2021]'
              },
              {
                number: '03',
                title: 'Sürekli Destek Ağı',
                subtitle: 'DESTEK',
                icon: HeartIcon,
                color: 'from-purple-500 to-pink-500',
                description: 'Planlı proaktif aramalar ve akran destek grupları ile yalnız kalmamanın güvencesi.',
                features: [
                  'Peer support groups (evidence: ↓ burden, ↑ self-efficacy)',
                  'Proactive follow-up calls (bi-weekly to monthly)',
                  'Family support mobilization',
                  'Access to formal services (healthcare, social security)',
                  'Crisis intervention hotline'
                ],
                evidence: '[Del-Pino-Casado et al., 2018; Leung et al., 2020]'
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center flex-shrink-0 relative`}>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-black text-gray-900">{stage.number}</span>
                    </div>
                    <stage.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stage.subtitle}</span>
                      <h3 className="text-3xl font-black text-gray-900 mt-1">{stage.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">{stage.description}</p>
                    
                    <div className="space-y-3">
                      {stage.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-3">
                          <span className="text-teal-600 text-xl mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500 font-medium">
                        📚 Evidence: <span className="text-teal-600">{stage.evidence}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expected Impact */}
        <motion.div
          className="mb-16 bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-10 shadow-2xl border-2 border-green-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <RocketLaunchIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Beklenen Etki</h2>
              <p className="text-green-600 font-semibold">Sürdürülebilir Bakım Ekosistemi</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-black text-green-700 mb-4">🏥 Klinik Sonuçlar</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-0.5">↓</span>
                  <p className="text-gray-700"><strong>Mortalite riski azalması:</strong> 1.5x → 1.0x (burden reduction through intervention)</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-0.5">↓</span>
                  <p className="text-gray-700"><strong>Hospital readmissions:</strong> %30-40 azalma potential [Ng & Wong, 2018]</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-0.5">↑</span>
                  <p className="text-gray-700"><strong>Patient QoL:</strong> r = -0.649 improvement via burden reduction</p>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-black text-teal-700 mb-4">📊 Sistem Etkileri</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl mt-0.5">✓</span>
                  <p className="text-gray-700"><strong>Policy impact:</strong> SGK finansal destek genişletme için kanıt tabanı</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl mt-0.5">✓</span>
                  <p className="text-gray-700"><strong>Cost-effectiveness:</strong> Önlenebilir hospitalizasyon azalması</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl mt-0.5">✓</span>
                  <p className="text-gray-700"><strong>Scalability:</strong> Open-source, dijital platform → ulusal yaygınlaşma</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6">
            <h3 className="text-xl font-black text-gray-900 mb-4">🌍 Uluslararası Potansiyel</h3>
            <p className="text-gray-700 mb-4">
              <strong>Erasmus+ Proje Hedefi:</strong> "COMPASS - Cross-Cultural Online Platform for Mediterranean and Asian Caregiver Support"
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-green-600">6 Ülke</div>
                <div className="text-sm text-gray-600">TR, ES, IT, NL, VN, +1</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-teal-600">€400K</div>
                <div className="text-sm text-gray-600">3-year budget</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">5+ Q1</div>
                <div className="text-sm text-gray-600">Publications target</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Methodology Highlight */}
        <motion.div
          className="mb-16 bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Araştırma Metodolojisi</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-white">n=200</span>
              </div>
              <h3 className="font-black text-gray-900 mb-2">Sample Size</h3>
              <p className="text-gray-600 text-sm">Multi-center (Ankara, İstanbul, İzmir), stratified sampling</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-white">6M</span>
              </div>
              <h3 className="font-black text-gray-900 mb-2">Follow-Up</h3>
              <p className="text-gray-600 text-sm">T0, T1 (1m), T2 (3m), T3 (6m) longitudinal assessment</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-white">47</span>
              </div>
              <h3 className="font-black text-gray-900 mb-2">Variables</h3>
              <p className="text-gray-600 text-sm">31 caregiver + 16 patient comprehensive predictors</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
            <h3 className="font-black text-gray-900 mb-4">Primary Hypotheses</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>H1:</strong> Sosyoekonomik faktörler (eğitim, gelir, finansal strain) → ZBI-12 skoru (β = 0.20-0.35)</p>
              <p><strong>H2:</strong> Sosyal destek (aile, formal) → ZBI-12 skoru (β = -0.25 to -0.40)</p>
              <p><strong>H3:</strong> Hasta faktörleri (ADL/IADL, nöropsikiyatrik) → ZBI-12 skoru (β = 0.30-0.45)</p>
              <p><strong>H4:</strong> Sosyal destek mediates finansal strain → burden ilişkisini</p>
            </div>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          className="mb-16 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 shadow-2xl border-2 border-amber-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Sonuç</h2>
          <blockquote className="text-2xl font-bold text-gray-800 text-center leading-relaxed italic mb-6">
            "Evde bakımda sürdürülebilirliğin anahtarı, sadece hastanın yatağının yanındaki teknoloji veya ilaçlar değil, 
            o yatağın başında <span className="text-amber-600">umutla ve yorgunlukla bekleyen insandır</span>."
          </blockquote>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            <strong>Bakım Pusulası Programı</strong>, bu insana yapılan bir yatırım, 
            aile hekimliğinin <span className="text-amber-600 font-black">şefkat ve bilimi birleştiren proaktif rolünün</span> bir kanıtıdır.
          </p>
        </motion.div>

        {/* CTA Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl font-black mb-4">🔬 Modeli Canlı Deneyin</h3>
            <p className="mb-6 opacity-90">
              Zarit Burden Interview (ZBI-12) ve comprehensive assessment form'u kullanarak platformu test edin.
            </p>
            <Link href="/tanilama">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-teal-600 font-black text-lg rounded-2xl shadow-xl inline-flex items-center gap-3"
              >
                Zarit Ölçeği'ni Deneyin
                <ArrowRightIcon className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl font-black mb-4">📊 Araştırma Verilerini İnceleyin</h3>
            <p className="mb-6 opacity-90">
              170M+ makale taraması sonuçları ve kritik literatür bulgularını görün.
            </p>
            <Link href="/istatistikler">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 font-black text-lg rounded-2xl shadow-xl inline-flex items-center gap-3"
              >
                İstatistikleri Görüntüle
                <ChartBarIcon className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Keywords */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <h3 className="text-lg font-bold text-gray-500 mb-4">Anahtar Kelimeler</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bakım veren', 'Tükenmişlik', 'Dayanıklılık', 'Aile hekimliği', 'Evde bakım', 'Psikososyal destek', 'Kanıta dayalı model', 'Zarit Burden Interview', 'Dijital platform'].map((keyword, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* References Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <h2 className="text-3xl font-black text-gray-900 mb-8">Temel Kaynaklar</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>[1]</strong> Kuzuya, M., et al. (2011). Impact of caregiver burden on adverse health outcomes in community-dwelling dependent older care recipients. <em>American Journal of Geriatric Psychiatry, 19</em>(4). doi:10.1097/JGP.0b013e3181e9b98d</p>
            <p><strong>[2]</strong> Akçoban, S., & Eskimez, Z. (2023). Homecare patients' quality of life and the burden of family caregivers: a descriptive cross-sectional study. <em>Home Health Care Services Quarterly, 42</em>. doi:10.1080/01621424.2023.2177224</p>
            <p><strong>[3]</strong> Del-Pino-Casado, R., et al. (2018). Social support and subjective burden in caregivers of adults and older adults: A meta-analysis. <em>PLoS ONE, 13</em>. doi:10.1371/journal.pone.0189874</p>
            <p><strong>[4]</strong> Leung, D., et al. (2020). Source of Social Support and Caregiving Self-Efficacy on Caregiver Burden and Patient's Quality of Life. <em>Int J Environ Res Public Health, 17</em>. doi:10.3390/ijerph17155457</p>
            <p><strong>[5]</strong> Summart, U., et al. (2025). Psychometric validation of the Thai version of the 12-item Zarit Burden Interview. <em>PLOS One, 20</em>. doi:10.1371/journal.pone.0322852</p>
            <p><strong>[6]</strong> Zarzycki, M., et al. (2024). Cross-country variations in the caregiver role: evidence from the ENTWINE-iCohort study. <em>BMC Public Health, 24</em>. doi:10.1186/s12889-024-18302-6</p>
            <p><strong>[7]</strong> Tran, T., et al. (2025). Caregiver burden among dementia caregivers in low-and middle-income countries in Asia. <em>Aging & Mental Health, 29</em>. doi:10.1080/13607863.2025.2462110</p>
            <p className="mt-6 pt-6 border-t border-gray-200">
              <strong>Full reference list (50+ papers) available in the research documentation.</strong> 
              <a href="https://consensus.app" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 ml-2">
                Powered by Consensus AI
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
