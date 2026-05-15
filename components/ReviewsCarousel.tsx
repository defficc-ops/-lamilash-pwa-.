'use client'

// Simplified carousel that doesn't need embla-carousel-autoplay
// Uses CSS scroll-snap for smooth auto-scrolling behavior
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Review {
  id: number
  client_name: string
  rating: number
  text: string
  service?: string
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#8B6348,#5C3D2E)',
  'linear-gradient(135deg,#C9A96E,#8B6348)',
  'linear-gradient(135deg,#D4B896,#C9A96E)',
  'linear-gradient(135deg,#5C3D2E,#8B6348)',
  'linear-gradient(135deg,#A8835A,#5C3D2E)',
  'linear-gradient(135deg,#C4A882,#8B6348)',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={13} strokeWidth={1.5}
          className={s <= rating ? 'fill-gold text-gold' : 'text-sand'} />
      ))}
    </div>
  )
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)

  // Auto-scroll
  useEffect(() => {
    if (!reviews.length) return
    const timer = setInterval(() => {
      setIdx((i) => {
        const next = (i + 1) % reviews.length
        const card = scrollRef.current?.children[next] as HTMLElement
        card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        return next
      })
    }, 3500)
    return () => clearInterval(timer)
  }, [reviews.length])

  if (!reviews.length) return null

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-2 pl-5"
      style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
    >
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          className="glass-card rounded-2xl p-5 flex-shrink-0 w-72"
          style={{ scrollSnapAlign: 'start' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
            >
              {review.client_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-espresso text-sm">{review.client_name}</p>
              <StarRating rating={review.rating} />
            </div>
          </div>
          <p className="text-espresso/75 text-sm leading-relaxed line-clamp-3">
            &ldquo;{review.text}&rdquo;
          </p>
          {review.service && (
            <div className="mt-3">
              <span className="text-xs bg-warm-beige text-cocoa px-2.5 py-1 rounded-full font-medium">
                {review.service}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
