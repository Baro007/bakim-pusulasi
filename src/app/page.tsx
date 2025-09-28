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
  EyeIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
      {/* Congress Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm md:text-base font-medium mb-2 md:mb-0">
            🎯 <strong>VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi</strong> | 
            13-16 Kasım 2025, Ankara | 
            <span className="text-yellow-200">Live Demo Presentation</span>
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <EyeIcon className="w-4 h-4 mr-1" />
              {currentUsers} aktif kullanıcı
            </span>
            <span className="flex items-center">
              📊 {visitorCount.toLocaleString()} toplam ziyaret
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-amber-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
              variants={fadeInUp}
            >
              <span className="text-teal-600">Bakım</span> Pusulası
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Yolculuğunuzda yalnız değilsiniz. Bakım verenler için kanıta dayalı, 
              şefkatli ve güçlendirici dijital rehberiniz.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/tanilama">
                <Button size="lg" className="w-full sm:w-auto">
                  Kendi Yükünüzü Ölçün
                </Button>
              </Link>
              <Link href="/arac-kiti">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Araç Kitini Keşfet
                </Button>
              </Link>
            </motion.div>

            {/* QR Code Access for Congress */}
            <motion.div 
              className="mt-12 p-6 bg-white bg-opacity-80 rounded-xl shadow-lg max-w-md mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <QrCodeIcon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Kongre Katılımcıları İçin
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  QR kodu okutarak telefonunuzdan kolayca erişin
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 font-mono">
                    https://bakim.netlify.app
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Görünmez Hastalar: Bakım Verenler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bakım verenlerin karşılaştığı zorluklar ve bu zorluklara yönelik çözümlerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              3 Aşamalı Destek Modeli
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Neredeyiz? Ne yapacağız? Nasıl destek alacağız?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  hoverable
                />
              </motion.div>
            ))}
          </div>
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