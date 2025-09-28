'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon, 
  UsersIcon, 
  GlobeAltIcon,
  DocumentChartBarIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline';
import { useAnalytics } from '@/lib/analytics-context';
import { usePresentationMode } from '@/lib/presentation-context';
import LiveMetricsPanel from '@/components/analytics/LiveMetricsPanel';
import ZBIAnalyticsCharts from '@/components/analytics/ZBIAnalyticsCharts';
import UserBehaviorCharts from '@/components/analytics/UserBehaviorCharts';
import GeographicVisualization from '@/components/analytics/GeographicVisualization';
import ResearchInsights from '@/components/analytics/ResearchInsights';

// Static export optimization
export const dynamic = 'force-static';

export default function AnalyticsPage() {
  const analytics = useAnalytics();
  const { isPresentationMode } = usePresentationMode();
  const [activeTab, setActiveTab] = useState<string>('overview');
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
    analytics.trackPageVisit('analytics_dashboard');
  }, [analytics]);

  const tabs = [
    {
      id: 'overview',
      name: 'Genel Bakış',
      icon: ChartBarIcon,
      description: 'Canlı metriklerin ve genel istatistiklerin özeti'
    },
    {
      id: 'zbi',
      name: 'ZBI Analitik',
      icon: DocumentChartBarIcon,
      description: 'Zarit değerlendirme sonuçları ve soru analizleri'
    },
    {
      id: 'behavior',
      name: 'Kullanıcı Davranışı',
      icon: UsersIcon,
      description: 'Kullanıcı yolculukları ve etkileşim desenleri'
    },
    {
      id: 'geographic',
      name: 'Coğrafi Analiz',
      icon: GlobeAltIcon,
      description: 'Dünya çapında kullanım ve kültürler arası veriler'
    },
    {
      id: 'research',
      name: 'Araştırma İçgörüleri',
      icon: PresentationChartBarIcon,
      description: 'Akademik yayın ve kongre sunumu destekleri'
    }
  ];

  // Get analytics data
  const analyticsData = analytics.getStoredAnalytics();
  const hasData = analyticsData.length > 0;

  // Presentation mode styles available if needed

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
              <div className={`p-3 rounded-xl ${isPresentationMode ? 'bg-white bg-opacity-20' : 'bg-teal-100'}`}>
                <ChartBarIcon className={`w-8 h-8 ${isPresentationMode ? 'text-white' : 'text-teal-600'}`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isPresentationMode ? 'text-white' : 'text-gray-900'}`}>
                  Analytics Dashboard
                </h1>
                <p className={`text-lg ${isPresentationMode ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                  {isPresentationMode ? 'LIVE CONGRESS PRESENTATION' : 'Araştırma Verilerinin Gerçek Zamanlı Analizi'}
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

      {/* No Data State */}
      {!hasData && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            className={`text-center py-12 ${isPresentationMode ? 'bg-white bg-opacity-10' : 'bg-white'} rounded-xl shadow-lg`}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <ChartBarIcon className={`w-16 h-16 mx-auto mb-4 ${isPresentationMode ? 'text-white text-opacity-60' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isPresentationMode ? 'text-white' : 'text-gray-900'}`}>
              Henüz Analitik Veri Yok
            </h3>
            <p className={`${isPresentationMode ? 'text-white text-opacity-80' : 'text-gray-600'} mb-6`}>
              Analitik verilerini görmek için önce Zarit değerlendirmesini tamamlayın.
            </p>
            <a
              href="/tanilama"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isPresentationMode 
                  ? 'bg-white text-purple-900 hover:bg-gray-100' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              Değerlendirmeye Git
            </a>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      {hasData && (
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
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
                      ${isActive
                        ? isPresentationMode
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-white text-teal-600 shadow-lg'
                        : isPresentationMode
                          ? 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                          : 'bg-white text-gray-600 hover:text-teal-600 hover:shadow-md'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 pb-12">
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
              
              {activeTab === 'behavior' && (
                <UserBehaviorCharts 
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
      )}

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
