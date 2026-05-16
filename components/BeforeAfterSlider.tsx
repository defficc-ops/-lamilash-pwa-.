'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'До',
  afterLabel = 'После',
  caption,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Framer Motion values for ultra-smooth 60fps updates without React re-renders
  const sliderProgress = useMotionValue(0.5) // 0.0 to 1.0
  const sliderPosPercent = useTransform(sliderProgress, p => `${p * 100}%`)
  const innerWidthPercent = useTransform(sliderProgress, p => `${100 / Math.max(p, 0.001)}%`)
  
  const [dragging, setDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    sliderProgress.set(x / rect.width)
  }, [sliderProgress])

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    updateSlider(e.clientX)
  }
  
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updateSlider(e.clientX)
    const onUp   = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging, updateSlider])

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true)
    updateSlider(e.touches[0].clientX)
  }
  
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: TouchEvent) => { e.preventDefault(); updateSlider(e.touches[0].clientX) }
    const onEnd  = () => setDragging(false)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
    return () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
  }, [dragging, updateSlider])

  const isActive = dragging || isHovered
  const imageScale = isActive ? 1.08 : 1.0

  return (
    <motion.div 
      className="space-y-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={containerRef}
        className="ba-slider-wrapper select-none relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group bg-[#1A110D]"
        style={{ aspectRatio: '3/4', cursor: dragging ? 'ew-resize' : 'default' }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* AFTER image (full width, behind) */}
        <div className="absolute inset-0">
          {afterSrc && afterSrc !== '/placeholder' ? (
            <motion.img 
              src={afterSrc} 
              alt="После" 
              className="w-full h-full object-cover origin-center" 
              draggable={false} 
              animate={{ scale: imageScale }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white/50 text-sm tracking-widest uppercase">После</div>
            </div>
          )}
        </div>

        {/* BEFORE image (clipped to left portion) using motion.div for 60fps */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ width: sliderPosPercent }}
        >
          <motion.div
            className="absolute inset-0 bg-[#2B1F1A]"
            style={{ width: innerWidthPercent }}
          >
            {beforeSrc && beforeSrc !== '/placeholder' ? (
              <motion.img 
                src={beforeSrc} 
                alt="До" 
                className="w-full h-full object-cover origin-center" 
                draggable={false} 
                animate={{ scale: imageScale }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white/50 text-sm tracking-widest uppercase">До</div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Premium Slider Handle Line & Button */}
        <motion.div
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: sliderPosPercent, x: '-50%' }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(201,164,108,0.4)] border border-white/30 flex items-center justify-center gap-1.5"
            style={{ x: '-50%', y: '-50%' }}
            animate={{ 
              scale: dragging ? 0.9 : 1, 
              backgroundColor: dragging ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' 
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="flex gap-1 text-white opacity-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Overlay Labels with Smooth Fade */}
        <motion.div 
          className="absolute top-5 left-5 bg-black/30 text-white/90 text-[10px] tracking-[0.2em] uppercase font-light px-4 py-2 rounded-full backdrop-blur-md border border-white/10 pointer-events-none"
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {beforeLabel}
        </motion.div>
        <motion.div 
          className="absolute top-5 right-5 bg-gold/90 text-black text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-lg pointer-events-none"
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {afterLabel}
        </motion.div>
      </div>

      {caption && (
        <motion.p 
          className="text-center text-sm text-espresso/70 font-serif italic tracking-wide pointer-events-none"
          animate={{ opacity: isActive ? 0.4 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  )
}
