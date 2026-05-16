'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  blur?: boolean
  distance?: number
  duration?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  blur = true,
  distance = 40,
  duration = 1.2
}: ScrollRevealProps) {
  const getInitialY = () => {
    if (direction === 'up') return distance
    if (direction === 'down') return -distance
    return 0
  }

  const getInitialX = () => {
    if (direction === 'left') return distance
    if (direction === 'right') return -distance
    return 0
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: getInitialY(), 
        x: getInitialX(),
        filter: blur ? 'blur(12px)' : 'none' 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Custom smooth ease
      }}
    >
      {children}
    </motion.div>
  )
}
