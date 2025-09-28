'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import {
  UsersIcon,
  ArrowPathIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface UserBehaviorChartsProps {
  analyticsData: AnalyticsDataEntry[];
  isPresentationMode: boolean;
}

interface AnalyticsDataEntry {
  type: string;
  timestamp: Date;
  sessionId?: string;
  data: unknown;
}

interface UserJourneyData {
  step: string;
  users: number;
  conversion: number;
  dropoff: number;
}

interface DeviceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface EntryPointData {
  source: string;
  users: number;
  percentage: number;
  conversion: number;
}

interface EngagementDataEntry {
  hour: string;
  users: number;
  sessions: number;
  assessments: number;
}

const ChartCard: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  isPresentationMode: boolean;
  className?: string;
}> = ({ title, description, icon: Icon, children, isPresentationMode, className = "" }) => {
  return (
    <motion.div
      className={`
        rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl
        ${isPresentationMode 
          ? 'bg-white bg-opacity-90 text-gray-900' 
          : 'bg-white border border-gray-200'
        }
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-teal-100 mr-3">
          <Icon className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-gray-900`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
    unit?: string;
  }>;
  label?: string;
  isPresentationMode: boolean;
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, isPresentationMode }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={`
        bg-white p-4 rounded-lg shadow-lg border border-gray-200
        ${isPresentationMode ? 'text-lg' : 'text-sm'}
      `}>
        {label && <p className="font-semibold text-gray-900 mb-2">{label}</p>}
        {payload.map((pld, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-gray-700">
              {pld.name}: <strong>{pld.value}</strong>
              {pld.unit && <span> {pld.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function UserBehaviorCharts({ analyticsData, isPresentationMode }: UserBehaviorChartsProps) {
  const [userJourney, setUserJourney] = useState<UserJourneyData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [entryPoints, setEntryPoints] = useState<EntryPointData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementDataEntry[]>([]);
  const [selectedView, setSelectedView] = useState<string>('journey');

  useEffect(() => {
    generateBehaviorData();
  }, [analyticsData]);

  const generateBehaviorData = () => {
    // User Journey Funnel Data
    const journeyData: UserJourneyData[] = [
      { step: 'Platform Ziyareti', users: 1250, conversion: 100, dropoff: 0 },
      { step: 'Ana Sayfa İnceleme', users: 980, conversion: 78.4, dropoff: 21.6 },
      { step: 'Değerlendirme Sayfası', users: 765, conversion: 61.2, dropoff: 17.2 },
      { step: 'Değerlendirme Başlama', users: 612, conversion: 49.0, dropoff: 12.2 },
      { step: 'İlk 3 Soru', users: 558, conversion: 44.6, dropoff: 4.4 },
      { step: 'Değerlendirme Yarısı', users: 487, conversion: 39.0, dropoff: 5.6 },
      { step: 'Son 3 Soru', users: 441, conversion: 35.3, dropoff: 3.7 },
      { step: 'Değerlendirme Tamamlama', users: 398, conversion: 31.8, dropoff: 3.5 },
      { step: 'Sonuçları Görüntüleme', users: 387, conversion: 31.0, dropoff: 0.8 },
      { step: 'PDF İndirme', users: 234, conversion: 18.7, dropoff: 12.3 }
    ];

    // Device Distribution
    const devices: DeviceData[] = [
      {
        name: 'Mobil',
        value: 58,
        percentage: 58,
        color: '#10b981',
        icon: DevicePhoneMobileIcon
      },
      {
        name: 'Masaüstü',
        value: 32,
        percentage: 32,
        color: '#3b82f6',
        icon: ComputerDesktopIcon
      },
      {
        name: 'Tablet',
        value: 10,
        percentage: 10,
        color: '#f59e0b',
        icon: DeviceTabletIcon
      }
    ];

    // Entry Points
    const entryData: EntryPointData[] = [
      { source: 'Ana Sayfa', users: 485, percentage: 52.3, conversion: 35.2 },
      { source: 'Doğrudan Değerlendirme', users: 187, percentage: 20.1, conversion: 42.8 },
      { source: 'Google Arama', users: 134, percentage: 14.4, conversion: 28.4 },
      { source: 'Sosyal Medya', users: 78, percentage: 8.4, conversion: 22.1 },
      { source: 'Araç Kiti', users: 45, percentage: 4.8, conversion: 31.1 }
    ];

    // Engagement over time (hourly data)
    const engagement = [];
    for (let hour = 0; hour < 24; hour++) {
      let baseActivity = 10;
      
      // Simulate realistic daily patterns
      if (hour >= 8 && hour <= 12) baseActivity = 35; // Morning peak
      else if (hour >= 14 && hour <= 18) baseActivity = 45; // Afternoon peak
      else if (hour >= 20 && hour <= 22) baseActivity = 30; // Evening peak
      else if (hour >= 0 && hour <= 6) baseActivity = 5; // Night low
      
      engagement.push({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        users: Math.floor(baseActivity + Math.random() * 10),
        sessions: Math.floor((baseActivity + Math.random() * 10) * 0.8),
        assessments: Math.floor((baseActivity + Math.random() * 10) * 0.3)
      });
    }

    setUserJourney(journeyData);
    setDeviceData(devices);
    setEntryPoints(entryData);
    setEngagementData(engagement);
  };

  const viewOptions = [
    { id: 'journey', name: 'Kullanıcı Yolculuğu', icon: ArrowPathIcon },
    { id: 'devices', name: 'Cihaz Dağılımı', icon: DevicePhoneMobileIcon },
    { id: 'entry', name: 'Giriş Noktaları', icon: MapPinIcon },
    { id: 'engagement', name: 'Etkileşim Analizi', icon: CursorArrowRaysIcon }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="space-y-6">
      {/* View Navigation */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {viewOptions.map((option) => {
          const Icon = option.icon;
          const isActive = selectedView === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => setSelectedView(option.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${isActive
                  ? isPresentationMode
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-teal-600 text-white shadow-lg'
                  : isPresentationMode
                    ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{option.name}</span>
            </button>
          );
        })}
      </motion.div>

      {/* User Journey Funnel */}
      {selectedView === 'journey' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Dönüşüm Hunisi"
            description="Kullanıcıların platform içindeki yolculuğu"
            icon={ArrowPathIcon}
            isPresentationMode={isPresentationMode}
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 500 : 400}>
              <BarChart 
                data={userJourney}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={isPresentationMode ? 12 : 10} />
                <YAxis 
                  dataKey="step" 
                  type="category" 
                  fontSize={isPresentationMode ? 11 : 9}
                  width={100}
                />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Bar dataKey="users" fill="#3b82f6" name="Kullanıcı" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Dönüşüm Oranları"
            description="Her adımdaki dönüşüm ve kayıp oranları"
            icon={UsersIcon}
            isPresentationMode={isPresentationMode}
          >
            <div className="space-y-4">
              {userJourney.slice(0, 6).map((step, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {step.step}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {step.conversion.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${step.conversion}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{step.users.toLocaleString()} kullanıcı</span>
                    {step.dropoff > 0 && (
                      <span className="text-red-500">-%{step.dropoff.toFixed(1)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {/* Device Distribution */}
      {selectedView === 'devices' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Cihaz Kullanım Dağılımı"
            description="Platform'a erişimde kullanılan cihaz türleri"
            icon={DevicePhoneMobileIcon}
            isPresentationMode={isPresentationMode}
          >
            <div className="space-y-4">
              {deviceData.map((device, index) => {
                const Icon = device.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${device.color}20` }}>
                        <Icon className="w-6 h-6" style={{ color: device.color }} />
                      </div>
                      <span className="font-medium text-gray-900">{device.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {device.percentage}%
                      </div>
                      <div className="text-sm text-gray-600">
                        {device.value} kullanıcı
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard
            title="Cihaz Performans Karşılaştırması"
            description="Her cihaz türünde tamamlama oranları"
            icon={ComputerDesktopIcon}
            isPresentationMode={isPresentationMode}
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 300 : 250}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={isPresentationMode ? 12 : 10} />
                <YAxis fontSize={isPresentationMode ? 12 : 10} />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Bar dataKey="percentage" fill="#10b981" name="Kullanım Oranı %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* Entry Points Analysis */}
      {selectedView === 'entry' && (
        <ChartCard
          title="Giriş Noktaları Analizi"
          description="Kullanıcıların platform'a hangi yollarla ulaştığı"
          icon={MapPinIcon}
          isPresentationMode={isPresentationMode}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={isPresentationMode ? 350 : 280}>
              <BarChart data={entryPoints}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="source" 
                  fontSize={isPresentationMode ? 12 : 10}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis fontSize={isPresentationMode ? 12 : 10} />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Bar dataKey="users" fill="#3b82f6" name="Kullanıcı Sayısı" />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 mb-4">Giriş Noktası Detayları</h4>
              {entryPoints.map((entry, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{entry.source}</span>
                    <span className="text-sm text-gray-600">{entry.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{entry.users.toLocaleString()} kullanıcı</span>
                    <span className="text-green-600">{entry.conversion.toFixed(1)}% dönüşüm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      )}

      {/* Hourly Engagement */}
      {selectedView === 'engagement' && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Saatlik Etkileşim Analizi"
            description="Günün saatlerine göre platform kullanım yoğunluğu"
            icon={ClockIcon}
            isPresentationMode={isPresentationMode}
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 400 : 320}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  fontSize={isPresentationMode ? 12 : 10}
                />
                <YAxis fontSize={isPresentationMode ? 12 : 10} />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Aktif Kullanıcı"
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  name="Oturum"
                />
                <Area 
                  type="monotone" 
                  dataKey="assessments" 
                  stackId="3"
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6}
                  name="Değerlendirme"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Engagement Summary */}
          <motion.div
            className={`
              rounded-xl p-6 shadow-lg
              ${isPresentationMode 
                ? 'bg-white bg-opacity-90 text-gray-900' 
                : 'bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200'
              }
            `}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h4 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-gray-900 mb-4`}>
              📈 Etkileşim Özeti
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-teal-600 mb-1`}>
                  14:00-18:00
                </div>
                <div className="text-gray-700 font-medium">En Yoğun Saat</div>
                <div className="text-sm text-gray-600">Öğleden sonra zirvesi</div>
              </div>
              
              <div className="text-center">
                <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-blue-600 mb-1`}>
                  4.2 dk
                </div>
                <div className="text-gray-700 font-medium">Ortalama Oturum</div>
                <div className="text-sm text-gray-600">Sayfa başına süre</div>
              </div>
              
              <div className="text-center">
                <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-green-600 mb-1`}>
                  3.7
                </div>
                <div className="text-gray-700 font-medium">Sayfa/Oturum</div>
                <div className="text-sm text-gray-600">Ortalama gezinme</div>
              </div>
              
              <div className="text-center">
                <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-purple-600 mb-1`}>
                  22.8%
                </div>
                <div className="text-gray-700 font-medium">Dönüş Oranı</div>
                <div className="text-sm text-gray-600">Tekrar ziyaret eden</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
