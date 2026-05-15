'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashPage() {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => handleEnter(), 6000)
    return () => clearTimeout(timer)
  }, [])

  function handleEnter() {
    setVisible(false)
    setTimeout(() => router.push('/home'), 800)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-end overflow-hidden bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 4, ease: 'easeOut' }}
            >
              <img
                src="/images/founder.jpg.png"
                alt="Lamilash Kari"
                className="w-full h-full object-cover object-top opacity-50 contrast-[1.1] saturate-[0.9]"
                onError={(e) => {
                  (e.target as any).parentElement.style.background = 'linear-gradient(to bottom, #5C3D2E, #2C1810)';
                }}
              />
            </motion.div>
            
            {/* Artistic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-transparent" />
          </div>



          {/* Main Content Container */}
          <div className="relative z-10 w-full px-10 pb-20 flex flex-col items-center">
            
            {/* Brand Identity */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex items-center gap-4 justify-center mb-6"
              >
                <div className="h-[1px] w-8 bg-gold/40" />
                <span className="text-gold/60 text-[10px] tracking-[0.4em] uppercase font-bold">Premium Beauty</span>
                <div className="h-[1px] w-8 bg-gold/40" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                className="font-serif text-6xl font-bold text-white tracking-tight"
              >
                Lamilash
                <motion.span 
                  className="block text-gold italic text-3xl mt-1 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                >
                  by Kari
                </motion.span>
              </motion.h1>
            </div>

            {/* Sparkle Decoration */}
            <div className="flex gap-4 mb-10">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    delay: 2 + (i * 0.4), 
                    duration: 3, 
                    repeat: Infinity 
                  }}
                  className="text-gold/40 text-xl"
                >
                  ✦
                </motion.div>
              ))}
            </div>

            {/* Animated Button */}
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 overflow-hidden rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10"
            >

              <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase">Войти в студию</span>
            </motion.button>

            {/* Refined Progress Bar */}
            <div className="w-48 h-[2px] bg-white/10 mt-12 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/40 to-gold"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
