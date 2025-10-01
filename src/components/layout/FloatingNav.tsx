'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

/**
 * Floating Navigation with Glassmorphism
 * Auto-hides on scroll down, shows on scroll up
 * Mobile-responsive with drawer menu
 */

export default function FloatingNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Ana Sayfa', href: '/', icon: HomeIcon },
    { name: 'Tanılama', href: '/tanilama', icon: ClipboardDocumentCheckIcon },
    { name: 'İstatistikler', href: '/istatistikler', icon: ChartBarIcon },
    { name: 'Araç Kiti', href: '/arac-kiti', icon: BookOpenIcon },
    { name: 'Destek Ağı', href: '/destek-agi', icon: UserGroupIcon },
  ];

  return (
    <>
      {/* Desktop/Tablet Floating Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-2xl px-6 py-3 flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="mr-4 flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">BP</span>
            </motion.div>
            <span className="font-black text-gray-800 text-lg group-hover:text-teal-600 transition-colors">
              Bakım Pusulası
            </span>
          </Link>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300 mx-2" />

          {/* Nav Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative px-4 py-2 rounded-full font-semibold text-sm transition-all
                    ${isActive
                      ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Floating Nav Button */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-white/70 backdrop-blur-xl border border-white/50 rounded-full p-3 shadow-2xl"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-800" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-800" />
        )}
      </motion.button>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/90 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Logo */}
                <Link href="/" className="flex items-center gap-3 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">BP</span>
                  </div>
                  <span className="font-black text-gray-800 text-xl">
                    Bakım Pusulası
                  </span>
                </Link>

                {/* Mobile Nav Items */}
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className={`
                            flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all
                            ${isActive
                              ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          <Icon className="w-6 h-6" />
                          <span>{item.name}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

