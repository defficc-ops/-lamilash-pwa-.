'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function ProcessVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Slow parallax effect for the video background
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden rounded-[2.5rem] my-16 shadow-2xl">
      {/* Parallax Video Container */}
      <motion.div 
        className="absolute inset-0 w-full h-[130%]"
        style={{ y }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80"
          poster="/images/work1.png"
        >
          <source src="/images/process.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 pb-16 z-10">
        <ScrollReveal direction="up" blur distance={30}>
          <div className="glass-dark p-6 rounded-3xl max-w-sm ml-auto border-white/10 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-bold">Процесс</span>
            </div>
            <h3 className="heading-premium text-white text-2xl mb-3 leading-snug">Искусство создания идеального взгляда</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Каждый этап процедуры выполняется с ювелирной точностью и максимальной заботой о здоровье ваших ресниц.
            </p>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover-slow bg-white/5 backdrop-blur-sm group cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-gold transition-colors">
                  <path d="M5 3l14 9-14 9V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-white text-xs font-semibold">Смотреть</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest">1 мин</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
