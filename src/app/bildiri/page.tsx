'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  GlobeAltIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function BildiriPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Congress Info Banner */}
      <motion.div 
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 px-4 shadow-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <AcademicCapIcon className="w-16 h-16" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-black text-center mb-4">
            VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <CalendarIcon className="w-6 h-6" />
              <div>
                <div className="text-sm opacity-90">Tarih</div>
                <div className="font-bold text-lg">13-16 Kasım 2025</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <MapPinIcon className="w-6 h-6" />
              <div>
                <div className="text-sm opacity-90">Yer</div>
                <div className="font-bold text-lg">Ankara, Türkiye</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <UserGroupIcon className="w-6 h-6" />
              <div>
                <div className="text-sm opacity-90">Sunum</div>
                <div className="font-bold text-lg">Sözlü Bildiri</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Turkish Abstract */}
        <motion.div
          className="mb-12 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-black text-teal-700 mb-6">
            "Bakım Pusulası": Evde Bakım Verenleri Güçlendirmeye ve Tükenmişliği Önlemeye Yönelik Bütüncül Bir Aile Hekimliği Modeli
          </h2>

          <div className="space-y-6 text-gray-700">
            <p><strong>Giriş:</strong> Her evde bakım hastasının ardında, sistemin görünmez kahramanı olan bir bakım veren vardır. Bu çalışma, "Bakım Pusulası Programı"nı tasarlamayı ve sunmayı amaçlamaktadır.</p>
            <p><strong>Yöntem:</strong> 50+ çalışmanın sentezi ile üç aşamalı program: 1) Proaktif Risk Tespiti (Zarit Ölçeği), 2) Bütüncül Yetkilendirme (Araç Kiti), 3) Sürekli Destek Ağı.</p>
          </div>
        </motion.div>

        {/* English Abstract */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-black text-blue-700 mb-6">
            "The Caregiver's Compass": A Holistic Family Medicine Model
          </h2>
          <p className="text-gray-700">
            This study presents an evidence-based family medicine model empowering caregivers through proactive risk identification, holistic empowerment, and continuous support network.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center">
          <Link href="/tanilama">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl inline-flex items-center gap-3"
            >
              🎯 Modeli Canlı Olarak Deneyin
              <ArrowRightIcon className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
