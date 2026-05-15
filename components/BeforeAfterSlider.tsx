'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

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
  const [sliderPos, setSliderPos] = useState(50) // percentage
  const [dragging, setDragging] = useState(false)

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPos((x / rect.width) * 100)
  }, [])

  // Mouse events
  const onMouseDown = () => setDragging(true)
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updateSlider(e.clientX)
    const onUp   = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging, updateSlider])

  // Touch events
  const onTouchStart = () => setDragging(true)
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: TouchEvent) => { e.preventDefault(); updateSlider(e.touches[0].clientX) }
    const onEnd  = () => setDragging(false)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
    return () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
  }, [dragging, updateSlider])

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="ba-slider-wrapper select-none"
        style={{ aspectRatio: '3/4', cursor: dragging ? 'ew-resize' : 'ew-resize' }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* AFTER image (full width, behind) */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #D4B896 0%, #C4A882 100%)' }}
        >
          {afterSrc && afterSrc !== '/placeholder' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={afterSrc} alt="После" className="w-full h-full object-cover" draggable={false} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-espresso/50">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-sm font-medium">После</p>
              </div>
            </div>
          )}
        </div>

        {/* BEFORE image (clipped to left portion) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0"
            style={{ width: `${100 / (sliderPos / 100)}%`, background: 'linear-gradient(135deg, #F2E8DC 0%, #D4B896 100%)' }}
          >
            {beforeSrc && beforeSrc !== '/placeholder' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={beforeSrc} alt="До" className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-espresso/50">
                  <div className="text-4xl mb-2">👁</div>
                  <p className="text-sm font-medium">До</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="ba-slider-handle"
          style={{ left: `${sliderPos}%` }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center gap-0.5"
            style={{ zIndex: 20 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#8B6348" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#8B6348" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 bg-cocoa/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>
      {caption && (
        <p className="text-center text-sm text-espresso/60 font-medium px-2">{caption}</p>
      )}
    </div>
  )
}
