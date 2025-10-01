'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  QrCodeIcon,
  EyeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import dynamic from 'next/dynamic';

// Lazy load 3D components (client-side only)
const GradientMesh = dynamic(() => import('@/components/3d/GradientMesh'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-blue-500/20 to-purple-500/20" />
});

const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), {
  ssr: false,
});

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(1247); // Starting count
  const [currentUsers, setCurrentUsers] = useState(23); // Real-time users

  // Simulate real-time visitor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
      setCurrentUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(15, Math.min(35, prev + change));
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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

  const features = [
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: "Bilimsel Tanılama",
      description: "Zarit Bakım Yükü Ölçeği ile yükünüzü nesnel olarak ölçün ve kişiselleştirilmiş öneriler alın."
    },
    {
      icon: <BookOpenIcon className="w-6 h-6" />,
      title: "Kapsamlı Araç Kiti",
      description: "Teknik beceriler, duygusal dayanıklılık ve sistem navigasyonu için kanıta dayalı rehberler."
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: "Güçlü Destek Ağı",
      description: "Türkiye genelindeki destek kaynaklarına kolayca erişin ve yalnız olmadığınızı hissedin."
    }
  ];

  const stats = [
    { value: "1.5x", label: "Hasta mortalitesindeki artış", description: "Desteksiz bakım veren yükü nedeniyle" },
    { value: "%68", label: "Depresyon oranı", description: "Yoğun bakım veren stresindeki kişilerde" },
    { value: "24/7", label: "Sürekli sorumluluk", description: "Bakım verenlerin yaşadığı gerçeklik" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - 3D Enhanced */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* 3D Background */}
        <GradientMesh className="opacity-30" />
        <ParticleField />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-blue-50/80 to-purple-50/90 backdrop-blur-sm" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Kinetic Typography */}
            <motion.div
              className="mb-6 flex items-center justify-center gap-3"
              variants={fadeInUp}
            >
              <SparklesIcon className="w-8 h-8 md:w-12 md:h-12 text-teal-600" />
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                  Bakım
                </span>{' '}
                <span className="text-gray-800">Pusulası</span>
              </motion.h1>
              <SparklesIcon className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              variants={fadeInUp}
            >
              Yolculuğunuzda <span className="text-teal-600 font-bold">yalnız değilsiniz</span>. 
              Bakım verenler için <span className="text-blue-600 font-bold">kanıta dayalı</span>, 
              şefkatli ve güçlendirici dijital rehberiniz.
            </motion.p>

            {/* Enhanced CTA Buttons with 3D Effects */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              variants={fadeInUp}
            >
              <Link href="/tanilama" className="group w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 p-0.5 shadow-2xl shadow-teal-500/50"
                >
                  <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl px-8 py-4">
                    <span className="relative z-10 text-white text-lg font-bold flex items-center justify-center gap-2">
                      <HeartIcon className="w-6 h-6" />
                      Kendi Yükünüzü Ölçün
                    </span>
                  </div>
                </motion.div>
              </Link>

              <Link href="/istatistikler" className="group w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md p-0.5 shadow-xl border border-gray-200"
                >
                  <div className="relative bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4">
                    <span className="relative z-10 text-gray-800 text-lg font-bold flex items-center justify-center gap-2">
                      <ChartBarIcon className="w-6 h-6 text-teal-600" />
                      Araştırma Verileri
                    </span>
                  </div>
                </motion.div>
              </Link>

              <Link href="/arac-kiti" className="group w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md p-0.5 shadow-xl border border-gray-200"
                >
                  <div className="relative bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4">
                    <span className="relative z-10 text-gray-800 text-lg font-bold flex items-center justify-center gap-2">
                      <BookOpenIcon className="w-6 h-6 text-blue-600" />
                      Araç Kiti
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Glassmorphism QR Card for Congress */}
            <motion.div 
              className="mt-12 p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-2xl mx-auto"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <QrCodeIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                  🎯 Kongre Katılımcıları İçin
                </h3>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  QR kodu okutarak telefonunuzdan <span className="font-bold text-teal-600">anında erişim</span> sağlayın
                </p>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-inner">
                  <span className="text-sm text-gray-600 font-mono font-semibold">
                    https://bakim.netlify.app
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* İstatistikler - Enhanced with 3D Cards */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0d9488 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-teal-800 to-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Görünmez Hastalar: Bakım Verenler
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bakım verenlerin karşılaştığı zorluklar ve bu zorluklara yönelik <span className="font-bold text-teal-600">bilimsel çözümlerimiz</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* 3D Card with glassmorphism */}
                <div className="relative h-full p-8 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />
                  
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 text-center">
                    {/* Animated stat value */}
                    <motion.div 
                      className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 mb-3"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.15 + 0.3,
                        type: 'spring',
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <div className="text-xl font-bold text-gray-900 mb-3">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-tl-full" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA for more stats */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/istatistikler">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/90 backdrop-blur-md border-2 border-teal-200 rounded-2xl font-bold text-teal-700 hover:border-teal-400 hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <ChartBarIcon className="w-5 h-5" />
                Detaylı Araştırma Verilerini İnceleyin
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Özellikler - 3D Interactive Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                3 Aşamalı
              </span>{' '}
              Destek Modeli
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-blue-600">Neredeyiz?</span> · 
              <span className="font-bold text-teal-600 mx-2">Ne yapacağız?</span> · 
              <span className="font-bold text-purple-600">Nasıl destek alacağız?</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const gradients = [
                'from-teal-500 to-blue-500',
                'from-blue-500 to-purple-500',
                'from-purple-500 to-pink-500'
              ];
              
              return (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 60, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  style={{ perspective: 1000 }}
                >
                  {/* 3D Card Container */}
                  <div className="relative h-full p-8 bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Gradient top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradients[index]}`} />
                    
                    {/* Icon with animated gradient background */}
                    <motion.div
                      className="relative mb-6"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.2 + 0.3,
                        type: 'spring',
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${gradients[index]} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center relative z-10">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover effect background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Number indicator */}
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-2xl text-gray-300 group-hover:text-teal-500 transition-colors">
                      {index + 1}
                    </div>

                    {/* Bottom corner decoration */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
                      <Icon className="w-full h-full text-gray-900 transform rotate-12" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Her adımda size özel, kanıta dayalı rehberlik
            </p>
            <Link href="/tanilama">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                Hemen Değerlendirme Başlat
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HeartIcon className="w-16 h-16 mx-auto mb-6 text-amber-200" />
            <h2 className="text-3xl font-bold mb-4">
              Bu Yolculukta Yalnız Değilsiniz
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
              Binlerce bakım veren bu platformu kullanarak yüklerini hafifletmiş, 
              güçlerini artırmış ve umutlarını tazelemiştir.
            </p>
            <Link href="/tanilama">
              <Button variant="secondary" size="lg">
                Hemen Başlayın
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Açık Kaynak Mesajı */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-teal-600 mr-3" />
              <CheckBadgeIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Açık Kaynak Topluluk Projesi
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bu platform, tüm dünyayla paylaşılan bir bilimsel hediyedir. 
              Katkıda bulunun, geliştirin ve bu değerli kaynağı daha da güçlendirin.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}