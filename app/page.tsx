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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-end overflow-hidden bg-[#000000]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 4, ease: [0.33, 1, 0.68, 1] }}
            >
              <img
                src="/images/founder.jpg.png"
                alt="Lamilash Kari"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as any).parentElement.style.background = 'linear-gradient(to bottom, #110A08, #000000)';
                }}
              />
            </motion.div>
            
            {/* Subtle Overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>



          {/* Main Content Container */}
          <div className="relative z-10 w-full px-10 pb-20 flex flex-col items-center">
            
            {/* Brand Identity */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-6 justify-center mb-6"
              >
                <div className="h-[0.5px] w-12 bg-gold/30" />
                <span className="text-gold text-[10px] tracking-[0.6em] uppercase font-light">Premium Beauty</span>
                <div className="h-[0.5px] w-12 bg-gold/30" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl md:text-6xl font-normal text-white/90 tracking-widest leading-none"
              >
                Lamilash
                <motion.span 
                  className="block text-gold/90 italic text-3xl md:text-4xl mt-3 font-light tracking-wider"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
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
