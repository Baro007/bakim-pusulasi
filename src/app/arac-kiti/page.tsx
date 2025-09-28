'use client';

import React, { useState } from 'react';

// Static export optimization
export const dynamic = 'force-static';
import { motion } from 'framer-motion';
import { 
  WrenchScrewdriverIcon,
  HeartIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AracKitiPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingPdf, setLoadingPdf] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Tümü', icon: <DocumentIcon className="w-5 h-5" /> },
    { id: 'teknik', name: 'Teknik Beceriler', icon: <WrenchScrewdriverIcon className="w-5 h-5" /> },
    { id: 'duygusal', name: 'Duygusal Dayanıklılık', icon: <HeartIcon className="w-5 h-5" /> },
    { id: 'sistem', name: 'Sistem Navigasyonu', icon: <DocumentIcon className="w-5 h-5" /> }
  ];

  const resources = [
    // Teknik Beceriler
    {
      id: 1,
      category: 'teknik',
      title: 'Bası Yarası Önleme Rehberi',
      description: 'Bası yaralarının nasıl önleneceği, erken belirtilerin tanınması ve temel bakım teknikleri.',
      downloadUrl: '/pdf/basi-yarasi-onleme.pdf',
      pages: 12,
      readTime: '15 dk'
    },
    {
      id: 2,
      category: 'teknik', 
      title: 'Güvenli Transfer Teknikleri',
      description: 'Hasta transferinde doğru teknikler, yaralanmaları önleme ve ergonomik pozisyonlar.',
      downloadUrl: '/pdf/guvenli-transfer.pdf',
      pages: 8,
      readTime: '10 dk'
    },
    {
      id: 3,
      category: 'teknik',
      title: 'İlaç Yönetimi Kılavuzu',
      description: 'İlaçların doğru saklama, dozajlama ve yan etki takibi için kapsamlı rehber.',
      downloadUrl: '/pdf/ilac-yonetimi.pdf',
      pages: 16,
      readTime: '20 dk'
    },
    {
      id: 4,
      category: 'teknik',
      title: 'Beslenme ve Yutma Güçlüğü',
      description: 'Disfaji hastalarında güvenli beslenme teknikleri ve aspirasyon riskini azaltma.',
      downloadUrl: '/pdf/beslenme-yutma.pdf',
      pages: 14,
      readTime: '18 dk'
    },

    // Duygusal Dayanıklılık
    {
      id: 5,
      category: 'duygusal',
      title: 'Stres Yönetimi Teknikleri',
      description: 'Bakım verme stresini azaltmak için nefes teknikleri, meditasyon ve zihin egzersizleri.',
      downloadUrl: '/pdf/stres-yonetimi.pdf',
      pages: 10,
      readTime: '12 dk'
    },
    {
      id: 6,
      category: 'duygusal',
      title: 'Kendine Zaman Ayırma Rehberi',
      description: 'Self-care stratejileri, sınır koyma ve kendi ihtiyaçlarınızı ihmal etmeme yolları.',
      downloadUrl: '/pdf/kendine-zaman.pdf',
      pages: 8,
      readTime: '10 dk'
    },
    {
      id: 7,
      category: 'duygusal',
      title: 'Suçluluk Hissiyle Başa Çıkma',
      description: 'Bakım verenlerde yaygın olan suçluluk hissini anlama ve aşma stratejileri.',
      downloadUrl: '/pdf/sucluluk-hissi.pdf',
      pages: 6,
      readTime: '8 dk'
    },
    {
      id: 8,
      category: 'duygusal',
      title: 'Yas ve Kayıp Süreci',
      description: 'Progresif hastalıklarda yaşanan önceden yas süreci ve duygusal destek stratejileri.',
      downloadUrl: '/pdf/yas-kayip.pdf',
      pages: 12,
      readTime: '15 dk'
    },

    // Sistem Navigasyonu
    {
      id: 9,
      category: 'sistem',
      title: 'Sağlık Sistemi Haklarınız',
      description: 'SGK hakları, evde sağlık hizmetleri ve hasta hakları hakkında kapsamlı bilgi.',
      downloadUrl: '/pdf/saglik-hakları.pdf',
      pages: 20,
      readTime: '25 dk'
    },
    {
      id: 10,
      category: 'sistem',
      title: 'Mali Destek İmkanları',
      description: 'Engelli maaşı, bakım parası ve diğer sosyal yardım imkanları için başvuru rehberi.',
      downloadUrl: '/pdf/mali-destek.pdf',
      pages: 18,
      readTime: '22 dk'
    },
    {
      id: 11,
      category: 'sistem',
      title: 'Yasal Haklar Rehberi',
      description: 'Velayet, vesayet işlemleri ve yasal sorumluluklar hakkında temel bilgiler.',
      downloadUrl: '/pdf/yasal-haklar.pdf',
      pages: 14,
      readTime: '18 dk'
    },
    {
      id: 12,
      category: 'sistem',
      title: 'Kurumsal Bakım Seçenekleri',
      description: 'Gündüz bakım merkezleri, uzun dönem bakım ve kaliteli kurum seçimi kriterleri.',
      downloadUrl: '/pdf/kurumsal-bakim.pdf',
      pages: 16,
      readTime: '20 dk'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <WrenchScrewdriverIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bakım Verme Araç Kiti
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bakım verme yolculuğunuzda size rehberlik edecek kanıta dayalı kaynaklar. 
            Her rehber, uzmanlar tarafından hazırlanmış ve pratik kullanım için tasarlanmıştır.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rehberlerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center px-4 py-2 rounded-lg font-medium transition-colors
                  ${activeCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{resource.pages} sayfa</span>
                <span>{resource.readTime} okuma</span>
              </div>

              <Button 
                variant="primary" 
                size="sm" 
                className="w-full flex items-center justify-center"
                loading={loadingPdf === resource.id}
                loadingText="İndiriliyor..."
                onClick={() => {
                  setLoadingPdf(resource.id);
                  // Gerçek PDF indirme simülasyonu
                  setTimeout(() => {
                    setLoadingPdf(null);
                    // Gerçek implementasyonda burada PDF indirme yapılacak
                    const link = document.createElement('a');
                    link.href = resource.downloadUrl;
                    link.download = `${resource.title}.pdf`;
                    document.body.appendChild(link);
                    // link.click(); // Gerçek PDF olduğunda aktif edilecek
                    document.body.removeChild(link);
                    
                    // Şimdilik bilgilendirme gösterelim
                    alert(`${resource.title} PDF'i hazırlanıyor... Yakında kullanıma sunulacak!`);
                  }, 2000);
                }}
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                PDF İndir
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div 
            className="text-center py-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <p className="text-gray-500 text-lg">
              Aradığınız kriterlere uygun rehber bulunamadı.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
              }}
              className="mt-4"
            >
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}

        {/* Coming Soon Section */}
        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Card>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Yakında Gelecek Özellikler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">🎥 Video Rehberler</h4>
                <p className="text-gray-600 text-sm">
                  Teknik becerileri görsel olarak öğrenebileceğiniz video kütüphanesi
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📱 Mobil Uygulama</h4>
                <p className="text-gray-600 text-sm">
                  Rehberlere offline erişim için mobil uygulama desteği
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">👥 Topluluk Forumu</h4>
                <p className="text-gray-600 text-sm">
                  Deneyimlerinizi paylaşabileceğiniz güvenli topluluk alanı
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
