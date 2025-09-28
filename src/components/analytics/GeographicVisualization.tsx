'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  GlobeAltIcon,
  MapPinIcon,
  LanguageIcon,
  ChartBarIcon,
  ClockIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

interface GeographicVisualizationProps {
  analyticsData: AnalyticsDataEntry[];
  isPresentationMode: boolean;
}

interface AnalyticsDataEntry {
  type: string;
  timestamp: Date;
  sessionId?: string;
  data: unknown;
}

interface CountryData {
  country: string;
  code: string;
  users: number;
  assessments: number;
  averageScore: number;
  completionRate: number;
  flag: string;
  timezone: string;
  growth: number;
}

interface RegionData {
  region: string;
  countries: number;
  users: number;
  averageScore: number;
  color: string;
  [key: string]: string | number;
}

interface LanguageData {
  language: string;
  users: number;
  percentage: number;
  color: string;
  [key: string]: string | number;
}

interface TimeZoneDataEntry {
  hour: string;
  turkey: number;
  europe: number;
  americas: number;
  asia: number;
  total: number;
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
        <div className="p-2 rounded-lg bg-green-100 mr-3">
          <Icon className="w-6 h-6 text-green-600" />
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

export default function GeographicVisualization({ analyticsData, isPresentationMode }: GeographicVisualizationProps) {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [languageData, setLanguageData] = useState<LanguageData[]>([]);
  const [timeZoneActivity, setTimeZoneActivity] = useState<TimeZoneDataEntry[]>([]);
  const [selectedView, setSelectedView] = useState<string>('countries');

  useEffect(() => {
    generateGeographicData();
  }, [analyticsData]);

  const generateGeographicData = () => {
    // Country usage data (sample)
    const countries: CountryData[] = [
      {
        country: 'Türkiye',
        code: 'TR',
        users: 342,
        assessments: 287,
        averageScore: 24.3,
        completionRate: 83.9,
        flag: '🇹🇷',
        timezone: 'Europe/Istanbul',
        growth: 12.4
      },
      {
        country: 'Almanya',
        code: 'DE',
        users: 89,
        assessments: 76,
        averageScore: 22.1,
        completionRate: 85.4,
        flag: '🇩🇪',
        timezone: 'Europe/Berlin',
        growth: 8.7
      },
      {
        country: 'Amerika Birleşik Devletleri',
        code: 'US',
        users: 67,
        assessments: 54,
        averageScore: 26.8,
        completionRate: 80.6,
        flag: '🇺🇸',
        timezone: 'America/New_York',
        growth: 15.2
      },
      {
        country: 'İngiltere',
        code: 'UK',
        users: 43,
        assessments: 38,
        averageScore: 23.9,
        completionRate: 88.4,
        flag: '🇬🇧',
        timezone: 'Europe/London',
        growth: 6.3
      },
      {
        country: 'Fransa',
        code: 'FR',
        users: 38,
        assessments: 31,
        averageScore: 21.7,
        completionRate: 81.6,
        flag: '🇫🇷',
        timezone: 'Europe/Paris',
        growth: 9.1
      },
      {
        country: 'Kanada',
        code: 'CA',
        users: 29,
        assessments: 25,
        averageScore: 25.4,
        completionRate: 86.2,
        flag: '🇨🇦',
        timezone: 'America/Toronto',
        growth: 11.7
      },
      {
        country: 'Avustralya',
        code: 'AU',
        users: 24,
        assessments: 19,
        averageScore: 27.2,
        completionRate: 79.2,
        flag: '🇦🇺',
        timezone: 'Australia/Sydney',
        growth: 18.5
      },
      {
        country: 'İtalya',
        code: 'IT',
        users: 21,
        assessments: 18,
        averageScore: 22.8,
        completionRate: 85.7,
        flag: '🇮🇹',
        timezone: 'Europe/Rome',
        growth: 4.9
      }
    ];

    // Regional aggregation
    const regions: RegionData[] = [
      {
        region: 'Avrupa',
        countries: 15,
        users: 245,
        averageScore: 23.1,
        color: '#3b82f6'
      },
      {
        region: 'Kuzey Amerika',
        countries: 3,
        users: 96,
        averageScore: 26.1,
        color: '#10b981'
      },
      {
        region: 'Asya-Pasifik',
        countries: 8,
        users: 67,
        averageScore: 25.8,
        color: '#f59e0b'
      },
      {
        region: 'Orta Doğu',
        countries: 6,
        users: 89,
        averageScore: 24.7,
        color: '#ef4444'
      },
      {
        region: 'Afrika',
        countries: 4,
        users: 23,
        averageScore: 28.2,
        color: '#8b5cf6'
      }
    ];

    // Language distribution
    const languages: LanguageData[] = [
      { language: 'Türkçe', users: 425, percentage: 71.2, color: '#dc2626' },
      { language: 'İngilizce', users: 142, percentage: 23.8, color: '#2563eb' },
      { language: 'Almanca', users: 18, percentage: 3.0, color: '#059669' },
      { language: 'Fransızca', users: 12, percentage: 2.0, color: '#d97706' }
    ];

    // Time zone activity (24-hour cycle)
    const timezones = [];
    for (let hour = 0; hour < 24; hour++) {
      // Simulate global usage patterns
      let activity = 5; // Base activity
      
      // European peak (Turkish time)
      if (hour >= 9 && hour <= 17) activity += 45;
      // US peak (evening in Turkey)
      if (hour >= 20 && hour <= 23) activity += 25;
      // Asian peak (early morning in Turkey)
      if (hour >= 4 && hour <= 8) activity += 15;
      
      timezones.push({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        turkey: hour >= 9 && hour <= 17 ? activity : Math.max(5, activity - 20),
        europe: hour >= 8 && hour <= 16 ? activity * 0.6 : Math.max(3, activity * 0.3),
        americas: hour >= 14 && hour <= 22 ? activity * 0.4 : Math.max(2, activity * 0.2),
        asia: hour >= 2 && hour <= 10 ? activity * 0.3 : Math.max(1, activity * 0.1),
        total: activity
      });
    }

    setCountryData(countries);
    setRegionData(regions);
    setLanguageData(languages);
    setTimeZoneActivity(timezones);
  };

  const viewOptions = [
    { id: 'countries', name: 'Ülkeler', icon: FlagIcon },
    { id: 'regions', name: 'Bölgeler', icon: GlobeAltIcon },
    { id: 'languages', name: 'Diller', icon: LanguageIcon },
    { id: 'timezone', name: 'Zaman Dilimi', icon: ClockIcon }
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
                    : 'bg-green-600 text-white shadow-lg'
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

      {/* Countries View */}
      {selectedView === 'countries' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Ülke Bazlı Kullanım"
            description="En aktif ülkeler ve kullanım istatistikleri"
            icon={FlagIcon}
            isPresentationMode={isPresentationMode}
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 400 : 320}>
              <BarChart data={countryData.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="code" 
                  fontSize={isPresentationMode ? 12 : 10}
                />
                <YAxis fontSize={isPresentationMode ? 12 : 10} />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Bar dataKey="users" fill="#10b981" name="Kullanıcı Sayısı" />
                <Bar dataKey="assessments" fill="#3b82f6" name="Değerlendirme Sayısı" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Top Ülkeler"
            description="En yüksek kullanıma sahip ülkeler"
            icon={MapPinIcon}
            isPresentationMode={isPresentationMode}
          >
            <div className="space-y-3">
              {countryData.slice(0, 6).map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">{country.country}</div>
                      <div className="text-sm text-gray-600">
                        {country.assessments} değerlendirme
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {country.users}
                    </div>
                    <div className="text-xs text-gray-500">
                      +{country.growth.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {/* Regions View */}
      {selectedView === 'regions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Bölgesel Dağılım"
            description="Dünya bölgelerine göre kullanıcı dağılımı"
            icon={GlobeAltIcon}
            isPresentationMode={isPresentationMode}
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 350 : 280}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, users }: any) => `${region}: ${users}`} // eslint-disable-line @typescript-eslint/no-explicit-any
                  outerRadius={isPresentationMode ? 100 : 80}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Bölgesel Ortalama Skorlar"
            description="Her bölgenin ZBI ortalama skorları"
            icon={ChartBarIcon}
            isPresentationMode={isPresentationMode}
          >
            <ResponsiveContainer width="100%" height={isPresentationMode ? 350 : 280}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="region" 
                  fontSize={isPresentationMode ? 11 : 9}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis fontSize={isPresentationMode ? 12 : 10} />
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
                <Bar dataKey="averageScore" fill="#f59e0b" name="Ortalama ZBI Skoru" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* Languages View */}
      {selectedView === 'languages' && (
        <ChartCard
          title="Dil Tercihleri"
          description="Platform'da kullanılan dillerin dağılımı"
          icon={LanguageIcon}
          isPresentationMode={isPresentationMode}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={isPresentationMode ? 300 : 250}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ language, percentage }: any) => `${language}: ${percentage.toFixed(1)}%`} // eslint-disable-line @typescript-eslint/no-explicit-any
                  outerRadius={isPresentationMode ? 90 : 75}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {languageData.map((lang, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{lang.language}</span>
                    <span className="text-lg font-bold" style={{ color: lang.color }}>
                      {lang.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {lang.users.toLocaleString()} kullanıcı
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      )}

      {/* Time Zone Activity */}
      {selectedView === 'timezone' && (
        <ChartCard
          title="Zaman Dilimi Aktivitesi"
          description="24 saat boyunca global kullanım desenleri"
          icon={ClockIcon}
          isPresentationMode={isPresentationMode}
        >
          <ResponsiveContainer width="100%" height={isPresentationMode ? 400 : 320}>
            <LineChart data={timeZoneActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" fontSize={isPresentationMode ? 12 : 10} />
              <YAxis fontSize={isPresentationMode ? 12 : 10} />
              <Tooltip content={<CustomTooltip isPresentationMode={isPresentationMode} />} />
              <Line 
                type="monotone" 
                dataKey="turkey" 
                stroke="#dc2626" 
                strokeWidth={3}
                name="Türkiye"
              />
              <Line 
                type="monotone" 
                dataKey="europe" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Avrupa"
              />
              <Line 
                type="monotone" 
                dataKey="americas" 
                stroke="#059669" 
                strokeWidth={2}
                name="Amerika"
              />
              <Line 
                type="monotone" 
                dataKey="asia" 
                stroke="#d97706" 
                strokeWidth={2}
                name="Asya"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Global Impact Summary */}
      <motion.div
        className={`
          rounded-xl p-6 shadow-lg
          ${isPresentationMode 
            ? 'bg-white bg-opacity-90 text-gray-900' 
            : 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200'
          }
        `}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h4 className={`${isPresentationMode ? 'text-xl' : 'text-lg'} font-bold text-gray-900 mb-4`}>
          🌍 Global Etki Özeti
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-green-600 mb-2`}>
              {countryData.length}
            </div>
            <div className="text-gray-700 font-medium">Aktif Ülke</div>
            <div className="text-sm text-gray-600">Platform erişimi</div>
          </div>
          
          <div className="text-center">
            <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-blue-600 mb-2`}>
              {regionData.reduce((sum, region) => sum + region.countries, 0)}
            </div>
            <div className="text-gray-700 font-medium">Toplam Ülke</div>
            <div className="text-sm text-gray-600">Tüm bölgelerde</div>
          </div>
          
          <div className="text-center">
            <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-purple-600 mb-2`}>
              {languageData.length}
            </div>
            <div className="text-gray-700 font-medium">Desteklenen Dil</div>
            <div className="text-sm text-gray-600">Çok dilli erişim</div>
          </div>
          
          <div className="text-center">
            <div className={`${isPresentationMode ? 'text-3xl' : 'text-2xl'} font-bold text-amber-600 mb-2`}>
              24/7
            </div>
            <div className="text-gray-700 font-medium">Kesintisiz Erişim</div>
            <div className="text-sm text-gray-600">Global zaman dilimi</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
