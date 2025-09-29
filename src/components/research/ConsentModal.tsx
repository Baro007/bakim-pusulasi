'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon,
  AcademicCapIcon,
  EyeSlashIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

interface ConsentModalProps {
  isOpen: boolean;
  onConsent: (granted: boolean) => void;
  onClose: () => void;
}

export default function ConsentModal({ isOpen, onConsent, onClose }: ConsentModalProps) {
  const handleConsent = (granted: boolean) => {
    onConsent(granted);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-8 h-8 text-teal-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Akademik Araştırma Katılımı
                    </h2>
                    <p className="text-sm text-gray-600">
                      Gönüllü ve anonim veri paylaşımı
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Introduction */}
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-800 mb-2">
                    Bilimsel Araştırmaya Katkıda Bulunun
                  </h3>
                  <p className="text-teal-700 text-sm">
                    Zarit Yük Ölçeği değerlendirmenizi tamamladığınızda, verilerinizi 
                    anonim şekilde akademik araştırmalarda kullanmamıza izin verebilirsiniz. 
                    Bu, gelecekteki bakım verenlere daha iyi destek sağlamamıza yardımcı olur.
                  </p>
                </div>

                {/* What we collect */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Toplanan Veriler
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Zarit Yük Ölçeği değerlendirme sonuçları (anonim)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Değerlendirme tamamlama süresi ve navigasyon desenleri</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Genel kullanım istatistikleri (cihaz tipi, dil tercihi)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Platform kullanım deneyimi verileri</span>
                    </div>
                  </div>
                </div>

                {/* Privacy protection */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <EyeSlashIcon className="w-5 h-5 mr-2 text-purple-600" />
                    Gizlilik Koruması
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span><strong>İsim, e-posta, telefon</strong> gibi kişisel bilgiler toplanmaz</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span><strong>IP adresi veya cihaz kimliği</strong> saklanmaz</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span><strong>Bireysel tanımlama</strong> mümkün değildir</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>Sadece toplu analiz</strong> yapılır ve yayınlanır</span>
                    </div>
                  </div>
                </div>

                {/* Research benefits */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2 text-green-600" />
                    Araştırma Faydaları
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">📊</span>
                      <span>Bakım veren yükü konusunda akademik makaleler</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">🌍</span>
                      <span>Uluslararası kongreler ve bilimsel sunumlar</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">💡</span>
                      <span>Platform kullanım deneyiminin iyileştirilmesi</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">🤝</span>
                      <span>Gelecekteki bakım verenlere daha iyi destek sağlanması</span>
                    </div>
                  </div>
                </div>

                {/* Rights */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 mr-2 text-amber-600" />
                    Haklarınız
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• <strong>Gönüllü katılım:</strong> İstediğiniz zaman vazgeçebilirsiniz</p>
                    <p>• <strong>Veri silme:</strong> Verilerinizin silinmesini talep edebilirsiniz</p>
                    <p>• <strong>Şeffaflık:</strong> Veri kullanımı hakkında tam bilgilendirme</p>
                    <p>• <strong>GDPR uyumlu:</strong> Avrupa veri koruma standartları</p>
                  </div>
                </div>

                {/* Legal information */}
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                  <p className="mb-2">
                    <strong>Yasal Dayanak:</strong> Bu araştırma, Sağlık Bilimleri Üniversitesi 
                    Aile Hekimliği Anabilim Dalı tarafından yürütülmekte olup, akademik 
                    yayın ve kongre sunumları amacıyla kullanılacaktır.
                  </p>
                  <p>
                    <strong>İletişim:</strong> Sorularınız için sadikbarisadiguzel@gmail.com 
                    adresinden bizimle iletişime geçebilirsiniz.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => handleConsent(false)}
                    className="w-full sm:w-auto"
                  >
                    Hayır, Katılmak İstemiyorum
                  </Button>
                  <Button
                    onClick={() => handleConsent(true)}
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
                  >
                    Evet, Araştırmaya Katılıyorum
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Bu seçimi değerlendirme sonrasında değiştirebilirsiniz.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

