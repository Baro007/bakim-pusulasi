'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon, 
  GlobeAltIcon,
  DocumentChartBarIcon,
  PresentationChartBarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics-context';
import { usePresentationMode } from '@/lib/presentation-context';
import LiveMetricsPanel from '@/components/analytics/LiveMetricsPanel';
import ZBIAnalyticsCharts from '@/components/analytics/ZBIAnalyticsCharts';
import GeographicVisualization from '@/components/analytics/GeographicVisualization';
import ResearchInsights from '@/components/analytics/ResearchInsights';

/**
 * PUBLIC ANALYTICS DASHBOARD - Accessible without form submission
 * Always shows research data and example metrics for demonstration
 */
export default function IstatistiklerPage() {
  const analytics = useAnalytics();
  const { isPresentationMode } = usePresentationMode();
  const [activeTab, setActiveTab] = useState<string>('research');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [refreshInterval] = useState<number>(30); // seconds

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Force re-render to update analytics data
      setActiveTab(prev => prev);
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Track page visit
  useEffect(() => {
    analytics.trackPageVisit('public_statistics');
  }, [analytics]);

  interface TabData {
    id: string;
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
    isReal: boolean;
  }

  const tabs: TabData[] = [
    {
      id: 'research',
      name: 'Araştırma Sonuçları',
      icon: PresentationChartBarIcon,
      description: 'Gerçek psikometrik veriler ve akademik bulgular',
      isReal: true
    },
    {
      id: 'zbi',
      name: 'ZBI Dağılımları',
      icon: DocumentChartBarIcon,
      description: 'Skor analizi ve istatistiksel görselleştirmeler',
      isReal: true
    },
    {
      id: 'overview',
      name: 'Platform Metrikleri',
      icon: ChartBarIcon,
      description: 'Demo amaçlı platform örnekleri',
      isReal: false
    },
    {
      id: 'geographic',
      name: 'Global Potansiyel',
      icon: GlobeAltIcon,
      description: 'Uluslararası erişim örnekleri',
      isReal: false
    }
  ];

  // Get analytics data (if any)
  const analyticsData = analytics.getStoredAnalytics();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen ${isPresentationMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isPresentationMode ? 'bg-white bg-opacity-10 text-white' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center space-x-4">
              {/* Back button */}
              <Link 
                href="/"
                className={`p-2 rounded-lg transition-colors ${
                  isPresentationMode 
                    ? 'hover:bg-white hover:bg-opacity-20' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </Link>

              <div className={`p-3 rounded-xl ${isPresentationMode ? 'bg-white bg-opacity-20' : 'bg-teal-100'}`}>
                <ChartBarIcon className={`w-8 h-8 ${isPresentationMode ? 'text-white' : 'text-teal-600'}`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isPresentationMode ? 'text-white' : 'text-gray-900'}`}>
                  İstatistikler & Araştırma Verileri
                </h1>
                <p className={`text-lg ${isPresentationMode ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                  {isPresentationMode ? 'LIVE CONGRESS PRESENTATION' : 'Bakım Veren Yükü Araştırması - Gerçek Zamanlı Analiz'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Auto-refresh toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label 
                  htmlFor="autoRefresh" 
                  className={`text-sm ${isPresentationMode ? 'text-white' : 'text-gray-700'}`}
                >
                  Otomatik yenileme ({refreshInterval}s)
                </label>
              </div>

              {/* Live indicator */}
              {autoRefresh && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${isPresentationMode ? 'text-white' : 'text-green-600'}`}>
                    CANLI
                  </span>
                </div>
              )}

              {/* Presentation mode indicator */}
              {isPresentationMode && (
                <div className="flex items-center space-x-2 bg-amber-500 bg-opacity-20 px-3 py-1 rounded-full">
                  <PresentationChartBarIcon className="w-4 h-4 text-amber-300" />
                  <span className="text-sm font-medium text-amber-300">
                    SUNUM MODU
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Public Notice */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <motion.div
          className={`
            rounded-xl p-4 border-2
            ${isPresentationMode 
              ? 'bg-blue-100 bg-opacity-20 text-blue-200 border-blue-400' 
              : 'bg-blue-50 text-blue-800 border-blue-200'
            }
          `}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-start space-x-3">
            <ChartBarIcon className="w-6 h-6 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">📊 Açık Erişim Araştırma Verileri</h4>
              <p className="text-sm leading-relaxed">
                Bu dashboard, bakım veren yükü araştırmamızın temel istatistiklerini ve literatür bulgularını içerir. 
                Tüm veriler anonim ve toplanmış formdadır. Kendi değerlendirmenizi yapmak için <Link href="/tanilama" className="underline font-semibold">Tanılama sayfasını</Link> ziyaret edin.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content - Always Visible */}
      <>
        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div
            className="flex flex-wrap gap-2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${isActive
                      ? isPresentationMode
                        ? 'bg-white text-purple-900 shadow-lg'
                        : tab.isReal 
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-600 to-slate-600 text-white shadow-lg'
                      : isPresentationMode
                        ? 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                        : tab.isReal
                          ? 'bg-white text-green-700 hover:text-green-800 hover:shadow-md border-2 border-green-200'
                          : 'bg-white text-gray-600 hover:text-gray-700 hover:shadow-md border-2 border-gray-200'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">{tab.name}</span>
                    <span className="text-xs opacity-75 font-medium">
                      {tab.isReal ? 'GERÇEK VERİ' : 'ÖRNEK VERİ'}
                    </span>
                  </div>
                  
                  {/* Data indicator */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    tab.isReal ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                  }`} />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          {/* Example Data Warning */}
          {tabs.find(t => t.id === activeTab)?.isReal === false && (
            <motion.div
              className={`
                mb-6 rounded-xl p-4 border-2 border-yellow-400
                ${isPresentationMode 
                  ? 'bg-yellow-100 bg-opacity-20 text-yellow-200' 
                  : 'bg-yellow-50 text-yellow-800'
                }
              `}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">⚠️ ÖRNEK VERİ UYARISI</h4>
                  <p className="text-sm">
                    Bu bölümdeki veriler demonstration amaçlı örnek verilerdir. 
                    Gerçek araştırma verileri için &ldquo;Araştırma Sonuçları&rdquo; sekmesini kullanın.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            key={activeTab}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {activeTab === 'overview' && (
              <LiveMetricsPanel 
                analyticsData={analyticsData}
                isPresentationMode={isPresentationMode}
                autoRefresh={autoRefresh}
              />
            )}
            
            {activeTab === 'zbi' && (
              <ZBIAnalyticsCharts 
                analyticsData={analyticsData}
                isPresentationMode={isPresentationMode}
              />
            )}
            
            {activeTab === 'geographic' && (
              <GeographicVisualization 
                analyticsData={analyticsData}
                isPresentationMode={isPresentationMode}
              />
            )}
            
            {activeTab === 'research' && (
              <ResearchInsights 
                analyticsData={analyticsData}
                isPresentationMode={isPresentationMode}
              />
            )}
          </motion.div>
        </div>
      </>

      {/* Congress Footer */}
      {isPresentationMode && (
        <motion.div
          className="bg-white bg-opacity-10 text-white py-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-lg font-medium">
              🎯 VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi | 
              13-16 Kasım 2025, Ankara | 
              <span className="text-yellow-300">Live Research Analytics Demo</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}


