'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { 
  PrinterIcon, 
  ArrowPathIcon, 
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { ZaritResult, getColorByRiskLevel } from '@/lib/zarit-questions';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ZaritResultsProps {
  results: ZaritResult;
  onRestart: () => void;
}

export default function ZaritResults({ results, onRestart }: ZaritResultsProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = React.useState(false);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Bakım Yükü Değerlendirmesi - ${new Date().toLocaleDateString('tr-TR')}`,
    onBeforePrint: () => {
      console.log('PDF hazırlanıyor...');
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('PDF yazdırma tamamlandı');
      setIsPrinting(false);
    },
    onPrintError: (error) => {
      console.error('PDF yazdırma hatası:', error);
      setIsPrinting(false);
      alert('PDF oluştururken bir hata oluştu. Lütfen tarayıcınızın pop-up engellemesini kontrol edin.');
    },
    removeAfterPrint: false,
    suppressErrors: false,
    pageStyle: `
      @page {
        size: A4;
        margin: 1in;
      }
      @media print {
        body {
          font-family: 'Inter', sans-serif;
          color: black !important;
          background: white !important;
        }
        .print\\:hidden {
          display: none !important;
        }
        h1, h2, h3 {
          color: black !important;
          break-after: avoid;
        }
        .bg-white {
          background: white !important;
          border: 1px solid #e5e7eb !important;
        }
        .text-gray-800 {
          color: black !important;
        }
        .text-gray-600 {
          color: #4b5563 !important;
        }
        .text-teal-600 {
          color: #0d9488 !important;
        }
        .text-amber-600 {
          color: #d97706 !important;
        }
        .text-red-600 {
          color: #dc2626 !important;
        }
        .text-green-600 {
          color: #16a34a !important;
        }
        .bg-teal-100 {
          background: #ccfbf1 !important;
        }
        .bg-amber-50 {
          background: #fffbeb !important;
        }
      }
    `,
  });

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'düşük':
        return <CheckCircleIcon className="w-8 h-8 text-green-600" />;
      case 'orta':
        return <InformationCircleIcon className="w-8 h-8 text-yellow-600" />;
      case 'yüksek':
        return <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />;
      case 'çok yüksek':
        return <XCircleIcon className="w-8 h-8 text-red-600" />;
      default:
        return <InformationCircleIcon className="w-8 h-8 text-gray-600" />;
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Section - Printable */}
      <div ref={printRef} className="bg-white">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Değerlendirme Sonuçlarınız
          </h1>
          <p className="text-lg text-gray-600">
            Zarit Bakım Verme Yükü Ölçeği Sonucu
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Değerlendirme Tarihi: {new Date().toLocaleDateString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Card className="text-center">
            <div className="flex items-center justify-center mb-4">
              {getRiskIcon(results.riskLevel)}
            </div>
            
            <div className="text-5xl font-bold text-teal-600 mb-2">
              {results.score}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              48 puan üzerinden
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getColorByRiskLevel(results.riskLevel)}`}>
              {results.interpretation}
            </div>
          </Card>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Durumunuz Hakkında
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {results.description}
            </p>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Önerilerimiz
            </h3>
            <ul className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start">
              <InformationCircleIcon className="w-6 h-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">
                  Önemli Hatırlatma
                </h4>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Bu değerlendirme bir tanı aracı değildir ve profesyonel sağlık danışmanlığının 
                  yerini tutmaz. Sonuçlarınızı sağlık ekibinizle paylaşmanızı ve gerekirse 
                  profesyonel destek almanızı öneriyoruz. Bakım Pusulası ekibi olarak, 
                  bu zorlu yolculukta yanınızda olduğumuzu bilin.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information for Print */}
        <div className="print:block hidden text-center text-gray-500 text-sm border-t pt-4">
          <p>Bu rapor Bakım Pusulası (bakimpusulasi.com) tarafından oluşturulmuştur.</p>
          <p>Daha fazla kaynak ve destek için web sitemizi ziyaret ediniz.</p>
        </div>
      </div>

      {/* Action Buttons - Not Printable */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 print:hidden"
      >
        <Button
          onClick={handlePrint}
          variant="primary"
          size="lg"
          className="flex items-center w-full sm:w-auto"
          loading={isPrinting}
          loadingText="PDF Hazırlanıyor..."
        >
          <PrinterIcon className="w-5 h-5 mr-2" />
          Sonuçları Yazdır / PDF Kaydet
        </Button>

        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="flex items-center w-full sm:w-auto"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          Yeni Değerlendirme
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mt-12 text-center print:hidden"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Sonraki Adımlar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            title="Araç Kitini Keşfedin"
            description="Bakım verme becerilerinizi artıracak rehberler ve kaynaklara göz atın."
            hoverable
            onClick={() => window.location.href = '/arac-kiti'}
          />
          <Card 
            title="Destek Ağına Katılın"
            description="Türkiye genelindeki destek kaynaklarını keşfedin ve yalnız olmadığınızı bilin."
            hoverable
            onClick={() => window.location.href = '/destek-agi'}
          />
        </div>
      </motion.div>
    </div>
  );
}
