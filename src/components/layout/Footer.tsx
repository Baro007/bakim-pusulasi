import React from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-teal-600">Bakım Pusulası</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              Bu proje, açık kaynak kodlu bir topluluk armağanıdır. Bakım verenlerin yolculuğunda 
              kanıta dayalı rehberlik sunan bu platform, tüm dünyayla paylaşılan bir bilimsel hediyedir.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <span>Sevgiyle</span>
              <HeartIcon className="h-4 w-4 text-red-500 mx-1" />
              <span>geliştirilmiştir</span>
            </div>
          </div>

          {/* Katkıda Bulun */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Katkıda Bulun
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://github.com/bakim-pusulasi" 
                  className="text-gray-600 hover:text-teal-600 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link 
                  href="/hakkinda" 
                  className="text-gray-600 hover:text-teal-600 text-sm transition-colors"
                >
                  Proje Hakkında
                </Link>
              </li>
              <li>
                <Link 
                  href="/iletisim" 
                  className="text-gray-600 hover:text-teal-600 text-sm transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bilgi */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Bakım Pusulası. Tüm hakları saklıdır.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              MIT Lisansı ile açık kaynak kodlu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
