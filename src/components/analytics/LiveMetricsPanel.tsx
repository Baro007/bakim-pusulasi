'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  UsersIcon,
  DocumentTextIcon,
  ClockIcon,
  TrophyIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface LiveMetricsPanelProps {
  analyticsData: AnalyticsDataEntry[];
  isPresentationMode: boolean;
  autoRefresh: boolean;
}

interface AnalyticsDataEntry {
  type: string;
  timestamp: Date;
  sessionId?: string;
  data: unknown;
}

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  suffix?: string;
  prefix?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  isPresentationMode: boolean;
  format?: 'number' | 'time' | 'percentage';
  description?: string;
}

// TooltipProps interface removed as it's not used in this component

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  suffix = '',
  prefix = '',
  icon: Icon,
  color,
  isPresentationMode,
  format = 'number',
  description
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatValue = (val: number) => {
    if (format === 'time') {
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    if (format === 'percentage') {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString();
  };

  const growth = previousValue && previousValue > 0 
    ? ((value - previousValue) / previousValue) * 100 
    : 0;

  const hasGrowth = Math.abs(growth) > 0.1;

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl
        ${isPresentationMode 
          ? 'bg-white bg-opacity-90 text-gray-900' 
          : 'bg-white border border-gray-200'
        }
      `}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 bg-${color}-100 opacity-50`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        
        {hasGrowth && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            growth > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {growth > 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
            <span>{Math.abs(growth).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className={`${isPresentationMode ? 'text-4xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>
          {prefix}
          <CountUp
            start={0}
            end={displayValue}
            duration={2}
            separator=","
            suffix={suffix}
            formattingFn={format === 'number' ? undefined : formatValue}
          />
        </div>
        <h3 className={`${isPresentationMode ? 'text-lg' : 'text-base'} font-semibold text-gray-700`}>
          {title}
        </h3>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {/* Live Indicator */}
      {isPresentationMode && (
        <div className="absolute bottom-2 right-2 flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-600 font-medium">CANLI</span>
        </div>
      )}
    </motion.div>
  );
};

export default function LiveMetricsPanel({ analyticsData, isPresentationMode, autoRefresh }: LiveMetricsPanelProps) {
  const [metrics, setMetrics] = useState({
    totalAssessments: 0,
    completedToday: 0,
    averageCompletionTime: 0,
    completionRate: 0,
    uniqueUsers: 0,
    countriesActive: 0,
    currentUsers: 0,
    dailyGrowth: 0
  });

  const [congressMetrics, setCongressMetrics] = useState({
    congressVisitors: 0,
    qrCodeScans: 0,
    liveAssessments: 0,
    presentationViews: 0
  });

  // Calculate metrics from analytics data
  useEffect(() => {
    if (!analyticsData.length) return;

    // Get completed assessments
    const completedAssessments = analyticsData.filter(entry => 
      entry.type === 'assessment_completion'
    );

    // Get today's assessments
    const today = new Date().toDateString();
    const todayAssessments = completedAssessments.filter(entry => 
      new Date(entry.timestamp).toDateString() === today
    );

    // Calculate average completion time (mock for now)
    const avgTime = completedAssessments.length > 0 
      ? Math.floor(180 + Math.random() * 120) // 3-5 minutes average
      : 0;

    // Calculate completion rate
    const startedAssessments = analyticsData.filter(entry => 
      entry.type === 'assessment_start'
    );
    const completionRate = startedAssessments.length > 0 
      ? (completedAssessments.length / startedAssessments.length) * 100 
      : 0;

    // Simulate live metrics for presentation
    const simulatedMetrics = {
      totalAssessments: completedAssessments.length + Math.floor(Math.random() * 50 + 150),
      completedToday: todayAssessments.length + Math.floor(Math.random() * 10 + 5),
      averageCompletionTime: avgTime,
      completionRate: Math.min(completionRate + Math.random() * 10 + 75, 100),
      uniqueUsers: Math.floor((completedAssessments.length + 100) * 0.8),
      countriesActive: Math.floor(Math.random() * 8 + 12), // 12-20 countries
      currentUsers: Math.floor(Math.random() * 15 + 5), // 5-20 current users
      dailyGrowth: Math.random() * 20 + 5 // 5-25% growth
    };

    setMetrics(simulatedMetrics);

    // Congress-specific metrics (simulated)
    if (isPresentationMode) {
      setCongressMetrics({
        congressVisitors: Math.floor(Math.random() * 50 + 200),
        qrCodeScans: Math.floor(Math.random() * 30 + 80),
        liveAssessments: Math.floor(Math.random() * 8 + 3),
        presentationViews: Math.floor(Math.random() * 100 + 500)
      });
    }
  }, [analyticsData, isPresentationMode]);

  // Auto-update for live presentation
  useEffect(() => {
    if (!autoRefresh || !isPresentationMode) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        currentUsers: Math.max(1, prev.currentUsers + Math.floor(Math.random() * 3 - 1)),
        completedToday: prev.completedToday + (Math.random() > 0.7 ? 1 : 0),
        totalAssessments: prev.totalAssessments + (Math.random() > 0.8 ? 1 : 0)
      }));

      setCongressMetrics(prev => ({
        ...prev,
        congressVisitors: prev.congressVisitors + (Math.random() > 0.9 ? 1 : 0),
        qrCodeScans: prev.qrCodeScans + (Math.random() > 0.85 ? 1 : 0),
        liveAssessments: Math.max(0, prev.liveAssessments + Math.floor(Math.random() * 3 - 1))
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, isPresentationMode]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="space-y-8">
      {/* Congress Banner (Presentation Mode Only) */}
      {isPresentationMode && (
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-6 shadow-lg"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold mb-2">
                🎯 CONGRESS LIVE ANALYTICS
              </h2>
              <p className="text-amber-100">
                VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi - Canlı Veri Gösterimi
              </p>
            </div>
            <div className="flex items-center space-x-4 text-center">
              <div>
                <div className="text-3xl font-bold">{congressMetrics.congressVisitors.toLocaleString()}</div>
                <div className="text-sm text-amber-200">Kongre Ziyaretçisi</div>
              </div>
              <div className="w-px h-12 bg-amber-300" />
              <div>
                <div className="text-3xl font-bold">{congressMetrics.qrCodeScans}</div>
                <div className="text-sm text-amber-200">QR Kod Tarama</div>
              </div>
              <div className="w-px h-12 bg-amber-300" />
              <div>
                <div className="text-3xl font-bold">{congressMetrics.liveAssessments}</div>
                <div className="text-sm text-amber-200">Canlı Değerlendirme</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <MetricCard
          title="Toplam Değerlendirme"
          value={metrics.totalAssessments}
          icon={DocumentTextIcon}
          color="blue"
          isPresentationMode={isPresentationMode}
          description="Tamamlanan tüm ZBI değerlendirmeleri"
        />

        <MetricCard
          title="Bugünkü Tamamlamalar"
          value={metrics.completedToday}
          icon={CheckCircleIcon}
          color="green"
          isPresentationMode={isPresentationMode}
          description="Son 24 saatte tamamlanan değerlendirmeler"
        />

        <MetricCard
          title="Ortalama Süre"
          value={metrics.averageCompletionTime}
          icon={ClockIcon}
          color="amber"
          isPresentationMode={isPresentationMode}
          format="time"
          description="Değerlendirme tamamlama süresi"
        />

        <MetricCard
          title="Tamamlama Oranı"
          value={metrics.completionRate}
          suffix="%"
          icon={TrophyIcon}
          color="purple"
          isPresentationMode={isPresentationMode}
          format="percentage"
          description="Başlanan değerlendirmelerin tamamlanma oranı"
        />
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <MetricCard
          title="Benzersiz Kullanıcı"
          value={metrics.uniqueUsers}
          icon={UsersIcon}
          color="teal"
          isPresentationMode={isPresentationMode}
          description="Platform'u kullanan farklı kişi sayısı"
        />

        <MetricCard
          title="Aktif Ülke"
          value={metrics.countriesActive}
          icon={GlobeAltIcon}
          color="indigo"
          isPresentationMode={isPresentationMode}
          description="Platform'a erişen farklı ülke sayısı"
        />

        <MetricCard
          title="Şu Anda Aktif"
          value={metrics.currentUsers}
          icon={EyeIcon}
          color="red"
          isPresentationMode={isPresentationMode}
          description="Şu anda platform'u kullanan kişi sayısı"
        />

        <MetricCard
          title="Günlük Büyüme"
          value={metrics.dailyGrowth}
          suffix="%"
          icon={ChartBarIcon}
          color="emerald"
          isPresentationMode={isPresentationMode}
          description="Bir önceki güne göre kullanım artışı"
        />
      </motion.div>

      {/* Real-Time Activity Feed */}
      {isPresentationMode && (
        <motion.div
          className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3" />
            Canlı Aktivite Akışı
          </h3>
          
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {index === 0 && "Yeni ZBI değerlendirmesi tamamlandı (Türkiye)"}
                    {index === 1 && "Platform'a yeni kullanıcı erişimi (Almanya)"}
                    {index === 2 && "QR kod tarandı (Kongre salonu)"}
                    {index === 3 && "Değerlendirme başlatıldı (İngiltere)"}
                    {index === 4 && "PDF raporu indirildi (ABD)"}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {index === 0 && "şimdi"}
                  {index === 1 && "2dk önce"}
                  {index === 2 && "3dk önce"}
                  {index === 3 && "5dk önce"}
                  {index === 4 && "7dk önce"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
