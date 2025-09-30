'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, DocumentTextIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline';

interface InformedConsentProps {
  onAccept: () => void;
}

export default function InformedConsent({ onAccept }: InformedConsentProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <DocumentTextIcon className="w-24 h-24 mx-auto text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bakım Pusulası Araştırma Projesi
          </h1>
          <p className="text-xl text-gray-600">
            Bilgilendirilmiş Gönüllü Onam Formu
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <DocumentTextIcon className="w-12 h-12 mx-auto text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Sonuçlarınızı PDF Olarak Alın
            </h3>
            <p className="text-sm text-gray-600">
              Anında analiz + detaylı rapor + öneriler
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <HeartIcon className="w-12 h-12 mx-auto text-red-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Ücretsiz Destek Rehberi
            </h3>
            <p className="text-sm text-gray-600">
              Bakım veren rehberi + kaynak listesi
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <ShieldCheckIcon className="w-12 h-12 mx-auto text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Bilim İçin Anonim Katkı
            </h3>
            <p className="text-sm text-gray-600">
              Verileriniz tamamen gizli ve güvenli
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Araştırma Hakkında</h2>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Araştırmanın Amacı</h3>
              <p className="leading-relaxed">
                Bu araştırma, kronik hastalığı olan bireylere bakım verenlerin yaşadıkları bakım yükünü 
                ve bu yükün ruh sağlığı üzerindeki etkilerini anlamayı amaçlamaktadır. Elde edilen 
                bulgular, bakım verenlere yönelik destek programlarının geliştirilmesine katkı sağlayacaktır.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⏱️ Süre ve İçerik</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Form doldurma süresi: <strong>Yaklaşık 20-25 dakika</strong></li>
                <li>Bölümler: Bakım veren bilgileri, hasta bilgileri, bakım yükü değerlendirmesi, ruh sağlığı taraması (opsiyonel)</li>
                <li>Tüm sorular gönüllülük esasına dayalıdır</li>
                <li>İstediğiniz zaman katılımınızı sonlandırabilirsiniz</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🔒 Gizlilik ve Veri Güvenliği (KVKK Uyumlu)</h3>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 space-y-2">
                <p className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Tam Anonim:</strong> Kimlik bilgileriniz (isim, adres, telefon) asla kaydedilmez</span>
                </p>
                <p className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Şifreli Depolama:</strong> Verileriniz uluslararası güvenlik standartlarında saklanır</span>
                </p>
                <p className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Sadece Bilimsel Amaç:</strong> Veriler sadece akademik araştırma için kullanılır</span>
                </p>
                <p className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Paylaşım Yasağı:</strong> Verileriniz 3. kişi/kurumlara satılmaz veya paylaşılmaz</span>
                </p>
                <p className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>KVKK Uyumlu:</strong> 6698 sayılı Kişisel Verilerin Korunması Kanunu'na uygun</span>
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">✅ Haklarınız</h3>
              <ul className="space-y-2">
                <li>• Katılım tamamen <strong>gönüllülüktür</strong></li>
                <li>• İstediğiniz soruyu <strong>boş bırakabilirsiniz</strong></li>
                <li>• Her an <strong>çıkış yapabilirsiniz</strong> (verileriniz silinir)</li>
                <li>• Sorularınız için iletişime geçebilirsiniz: <strong>bakim-pusulasi@destek.com</strong></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎁 Katılım Sonrası Alacaklarınız</h3>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <ul className="space-y-2">
                  <li>✅ <strong>Kişisel ZBI-12 Raporu (PDF)</strong> - Bakım yükü analizi ve öneriler</li>
                  <li>✅ <strong>Bakım Veren Destek Rehberi</strong> - Kaynak listesi, kurumlar, stratejiler</li>
                  <li>✅ <strong>Acil Destek Numaraları</strong> - Psikolojik destek hatları</li>
                  <li>✅ <strong>Bilimsel Katkı Belgesi</strong> - Araştırmaya katkınız için teşekkür belgesi</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Consent Checkbox */}
          <div className="mt-8 border-t-2 border-gray-200 pt-6">
            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-7 h-7 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 mt-1 flex-shrink-0"
              />
              <span className="ml-4 text-lg text-gray-800 leading-relaxed">
                Yukarıdaki bilgileri okudum ve anladım. <strong>Gönüllü olarak</strong> bu araştırmaya 
                katılmayı kabul ediyorum. Verilerimin anonim olarak bilimsel amaçla kullanılmasına 
                <strong> izin veriyorum</strong>.
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-8 py-5 text-xl font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            Vazgeç
          </button>
          <button
            onClick={onAccept}
            disabled={!accepted}
            className={`flex-1 px-8 py-5 text-xl font-bold text-white rounded-xl transition-all ${
              accepted
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Kabul Ediyorum ve Başla
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Bu araştırma Etik Kurul onaylıdır. Sorularınız için: bakim-pusulasi@destek.com
        </p>
      </div>
    </motion.div>
  );
}
