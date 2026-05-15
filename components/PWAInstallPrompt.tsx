'use client'

import { useState, useEffect } from 'react'
import { X, Share, PlusSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PWAInstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent;
    const webkit = !!ua.match(/WebKit/i);
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const isIOSSafari = isIPad || isIPhone && webkit && !ua.match(/CriOS/i);

    // Detect if already installed (standalone mode)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                             (window.navigator as any).standalone || 
                             document.referrer.includes('android-app://');

    setIsIOS(isIOSSafari)
    setIsStandalone(isStandaloneMode)

    // Show prompt if iOS and not installed, and hasn't been dismissed recently
    if (isIOSSafari && !isStandaloneMode) {
      const dismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        // Delay prompt to not interrupt immediate user experience
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [])

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  }

  if (!isIOS || isStandalone) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 z-50 p-4 bg-espresso text-cream rounded-2xl shadow-2xl border border-gold/20"
        >
          <button 
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-cream/60 hover:text-cream"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-cream/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <img src="/icons/icon-192.svg" alt="App Icon" className="w-8 h-8 opacity-80" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">Установите приложение</h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Нажмите <Share size={12} className="inline mx-1" /> в меню браузера, 
                затем выберите <br/>
                <span className="font-medium text-cream flex items-center gap-1 mt-1">
                  «На экран Домой» <PlusSquare size={12} />
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
