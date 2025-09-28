'use client';

import React, { useState } from 'react';

// Static export optimization
export const dynamic = 'force-static';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  PhoneIcon, 
  GlobeAltIcon,
  HeartIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  MapPinIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DestekAgiPage() {
  const [activeRegion, setActiveRegion] = useState<string>('ulusal');

  const supportTypes = [
    { 
      id: 'dernekler', 
      name: 'Dernekler & Vakıflar', 
      icon: <UserGroupIcon className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: 'hastaneler', 
      name: 'Sağlık Kurumları', 
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: 'egitim', 
      name: 'Eğitim & Araştırma', 
      icon: <AcademicCapIcon className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      id: 'sosyal', 
      name: 'Sosyal Hizmetler', 
      icon: <HeartIcon className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  const regions = [
    { id: 'ulusal', name: 'Türkiye Geneli' },
    { id: 'istanbul', name: 'İstanbul' },
    { id: 'ankara', name: 'Ankara' },
    { id: 'izmir', name: 'İzmir' },
    { id: 'diger', name: 'Diğer Şehirler' }
  ];

  const supportResources = [
    // Ulusal Dernekler & Vakıflar
    {
      id: 1,
      name: 'Türkiye Alzheimer Derneği (ALZ-DER)',
      type: 'dernekler',
      region: 'ulusal',
      description: 'Alzheimer ve demans hastalarına ve ailelerine yönelik destek, eğitim ve farkındalık çalışmaları.',
      services: ['Aile danışmanlığı', 'Eğitim programları', 'Destek grupları', 'Bilgilendirme materyalleri'],
      contact: {
        phone: '0212 292 00 28',
        website: 'www.alzheimerdernegi.org.tr',
        email: 'info@alzheimerdernegi.org.tr'
      },
      address: 'İstanbul'
    },
    {
      id: 2,
      name: 'Türkiye Palyatif Bakım Derneği',
      type: 'dernekler',
      region: 'ulusal',
      description: 'Yaşam sonu bakım, ağrı yönetimi ve hasta yakını destek hizmetleri.',
      services: ['Palyatif bakım eğitimi', 'Yas danışmanlığı', 'Hasta hakları bilgilendirme', 'Aile desteği'],
      contact: {
        phone: '0312 440 00 00',
        website: 'www.tpbd.org.tr',
        email: 'info@tpbd.org.tr'
      },
      address: 'Ankara'
    },
    {
      id: 3,
      name: 'Spina Bifida Türkiye Derneği',
      type: 'dernekler',
      region: 'ulusal',
      description: 'Spina bifida hastası çocuklar ve aileleri için kapsamlı destek hizmetleri.',
      services: ['Rehabilitasyon desteği', 'Eğitim danışmanlığı', 'Sosyal etkinlikler', 'Peer destek'],
      contact: {
        phone: '0212 234 56 78',
        website: 'www.spinabifidaturkiye.org',
        email: 'info@spinabifidaturkiye.org'
      },
      address: 'İstanbul'
    },

    // Sağlık Kurumları
    {
      id: 4,
      name: 'Hacettepe Üniversitesi Erişkin Hastanesi Evde Sağlık Birimi',
      type: 'hastaneler',
      region: 'ankara',
      description: 'Evde sağlık hizmetleri, hasta ve aile eğitimi, tıbbi cihaz desteği.',
      services: ['Evde hemşirelik', 'Fizyoterapi', 'Tıbbi cihaz kiralama', 'Aile eğitimi'],
      contact: {
        phone: '0312 305 15 53',
        website: 'www.hacettepe.edu.tr',
        email: 'evdesaglik@hacettepe.edu.tr'
      },
      address: 'Sıhhiye, Ankara'
    },
    {
      id: 5,
      name: 'İstanbul Üniversitesi İstanbul Tıp Fakültesi Evde Bakım Merkezi',
      type: 'hastaneler',
      region: 'istanbul',
      description: 'Kronik hastalıklarda evde bakım, hasta takibi ve aile danışmanlığı.',
      services: ['Doktor ziyaretleri', 'Hemşire bakımı', 'Aile danışmanlığı', 'Tıbbi malzeme'],
      contact: {
        phone: '0212 414 20 00',
        website: 'www.itf.istanbul.edu.tr',
        email: 'evdebakim@istanbul.edu.tr'
      },
      address: 'Çapa, İstanbul'
    },

    // Sosyal Hizmetler
    {
      id: 6,
      name: 'Aile ve Sosyal Hizmetler Bakanlığı - Evde Bakım Desteği',
      type: 'sosyal',
      region: 'ulusal',
      description: 'Devlet tarafından sağlanan evde bakım maaşı ve destek hizmetleri.',
      services: ['Evde bakım maaşı', 'Sosyal yardım', 'Psikososyal destek', 'Hukuki danışmanlık'],
      contact: {
        phone: '0312 705 50 00',
        website: 'www.aile.gov.tr',
        email: 'evdebakim@aile.gov.tr'
      },
      address: 'Türkiye geneli'
    },
    {
      id: 7,
      name: 'İstanbul Büyükşehir Belediyesi Evde Sağlık Hizmetleri',
      type: 'sosyal',
      region: 'istanbul',
      description: 'Belediye bünyesinde sunulan ücretsiz evde sağlık ve sosyal destek hizmetleri.',
      services: ['Evde hemşire', 'Sosyal yardım', 'Ulaşım desteği', 'Gıda yardımı'],
      contact: {
        phone: '0212 153',
        website: 'www.ibb.gov.tr',
        email: 'evdesaglik@ibb.gov.tr'
      },
      address: 'İstanbul'
    },

    // Eğitim & Araştırma
    {
      id: 8,
      name: 'Koç Üniversitesi Aile Bakım Verme Araştırma Merkezi',
      type: 'egitim',
      region: 'istanbul',
      description: 'Bakım verme konusunda araştırma, eğitim ve danışmanlık hizmetleri.',
      services: ['Araştırma projeleri', 'Eğitim programları', 'Online kurslar', 'Danışmanlık'],
      contact: {
        phone: '0212 338 10 00',
        website: 'www.ku.edu.tr',
        email: 'caregiving@ku.edu.tr'
      },
      address: 'Sarıyer, İstanbul'
    }
  ];

  const filteredResources = supportResources.filter(resource => {
    return activeRegion === 'ulusal' || resource.region === activeRegion || resource.region === 'ulusal';
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
          <UserGroupIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Destek Ağınız
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bu yolculukta yalnız değilsiniz. Türkiye genelindeki destek kaynaklarına kolayca 
            ulaşın ve sizin gibi deneyimler yaşayan binlerce kişiyle bağlantı kurun.
          </p>
        </motion.div>

        {/* Proaktif Destek Modeli */}
        <motion.div 
          className="mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Card>
            <div className="text-center">
              <HeartIcon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Proaktif &ldquo;Nasılsınız?&rdquo; Modeli
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Geleneksel yaklaşım &ldquo;bir sorun olduğunda arayın&rdquo; der. Bizim yaklaşımımız farklı: 
                &ldquo;Nasılsınız?&rdquo; sorusunu düzenli olarak sorarak, sorunlar büyümeden önce destek sağlamak.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Düzenli İletişim</h3>
                  <p className="text-gray-600 text-sm">Haftalık/aylık &ldquo;nasılsınız?&rdquo; kontrolü</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Erken Müdahale</h3>
                  <p className="text-gray-600 text-sm">Sorunlar büyümeden destek sağlama</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Kişisel Yaklaşım</h3>
                  <p className="text-gray-600 text-sm">Her bireyin ihtiyacına özel çözümler</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`
                  flex items-center px-4 py-2 rounded-lg font-medium transition-colors
                  ${activeRegion === region.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <MapPinIcon className="w-4 h-4 mr-2" />
                {region.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {supportTypes.map((type) => (
              <div
                key={type.id}
                className={`flex items-center px-3 py-2 rounded-lg text-sm ${type.color}`}
              >
                {type.icon}
                <span className="ml-2">{type.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Resources */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      supportTypes.find(t => t.id === resource.type)?.color || 'bg-gray-100'
                    }`}>
                      {supportTypes.find(t => t.id === resource.type)?.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {resource.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {resource.description}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Hizmetler:</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`tel:${resource.contact.phone}`} className="text-teal-600 hover:underline">
                      {resource.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <GlobeAltIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a 
                      href={`https://${resource.contact.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline truncate"
                    >
                      {resource.contact.website}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{resource.address}</span>
                  </div>
                  <div className="flex items-center">
                    <InformationCircleIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`mailto:${resource.contact.email}`} className="text-teal-600 hover:underline">
                      E-posta Gönder
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div 
          className="mt-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Card>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Acil Durum İletişim Hattı
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <PhoneIcon className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Sağlık Acil</h4>
                <p className="text-2xl font-bold text-red-600">112</p>
              </div>
              <div className="text-center">
                <HeartIcon className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Psikososyal Destek</h4>
                <p className="text-lg font-semibold text-teal-600">0850 455 99 00</p>
                <p className="text-sm text-gray-600">7/24 Çözüm Merkezi</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Sosyal Hizmetler</h4>
                <p className="text-lg font-semibold text-amber-600">183</p>
                <p className="text-sm text-gray-600">Aile Sosyal Destek</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Community Message */}
        <motion.div 
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl p-8">
            <HeartIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Birlikte Güçlüyüz
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Bu platformu kullanan binlerce bakım veren, deneyimlerini paylaşarak birbirlerini destekliyor. 
              Siz de bu büyük ailinin bir parçasısınız.
            </p>
            <Button variant="secondary" size="lg">
              Hikayenizi Paylaşın
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
