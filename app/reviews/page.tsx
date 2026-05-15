'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import Link from 'next/link'

const REVIEWS = [
  { id: 1, client_name: 'Алина К.', rating: 5, service: 'Ламинирование ресниц', text: 'Невероятный результат! Ресницы выглядят как после наращивания, но абсолютно натурально. Каждое утро просыпаюсь красивой — экономлю 20 минут на макияже!', date: 'Апрель 2025' },
  { id: 2, client_name: 'Марина В.', rating: 5, service: 'Ламинирование бровей', text: 'Kari — настоящий мастер своего дела. Ламинирование бровей держится уже 7 недель, форма идеальная. Обязательно вернусь!', date: 'Март 2025' },
  { id: 3, client_name: 'Диана Р.', rating: 5, service: 'Комбо', text: 'Комбо-процедура превзошла все мои ожидания. Глаза сразу стали выглядеть больше и выразительнее. Муж спросил, сменила ли я макияж 😄', date: 'Март 2025' },
  { id: 4, client_name: 'Сания О.', rating: 5, service: 'Ламинирование ресниц', text: 'Очень уютная атмосфера, Кари объяснила весь процесс и подобрала состав под мои чувствительные ресницы. Результат — огонь!', date: 'Февраль 2025' },
  { id: 5, client_name: 'Жанар М.', rating: 5, service: 'Ламинирование бровей', text: 'Делаю ламинирование уже 3-й раз, только у Кари. Лучший специалист в городе без преувеличений!', date: 'Февраль 2025' },
  { id: 6, client_name: 'Катя Л.', rating: 4, service: 'Ламинирование бровей', text: 'Всё отлично, брови держатся хорошо. Единственное — немного долго ждала записи, но результат стоит того!', date: 'Январь 2025' },
]

const GRADIENTS = [
  'linear-gradient(135deg,#8B6348,#5C3D2E)',
  'linear-gradient(135deg,#C9A96E,#8B6348)',
  'linear-gradient(135deg,#D4B896,#C9A96E)',
  'linear-gradient(135deg,#5C3D2E,#8B6348)',
  'linear-gradient(135deg,#A8835A,#5C3D2E)',
  'linear-gradient(135deg,#C4A882,#8B6348)',
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={14} strokeWidth={1.5} className={s <= rating ? 'fill-gold text-gold' : 'text-sand'} />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length)
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <div className="page-container bg-cream">
      <div className="pt-safe px-5 pt-14 pb-2">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-cocoa text-xs font-semibold uppercase tracking-widest mb-1">Репутация</p>
          <h1 className="font-serif text-3xl font-bold text-espresso">Отзывы клиентов</h1>
        </motion.div>
      </div>

      {/* Summary */}
      <motion.div className="mx-5 mt-5 glass-card rounded-2xl p-5 flex items-center gap-5"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="text-center">
          <p className="font-serif text-5xl font-bold text-cocoa">{avg}</p>
          <StarRow rating={5} />
          <p className="text-espresso/50 text-xs mt-1">{REVIEWS.length} отзывов</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5,4,3,2,1].map((star) => {
            const count = REVIEWS.filter((r) => r.rating === star).length
            const pct = Math.round((count / REVIEWS.length) * 100)
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-espresso/50 w-3">{star}</span>
                <Star size={10} className="fill-gold text-gold flex-shrink-0" />
                <div className="flex-1 bg-warm-beige rounded-full h-1.5 overflow-hidden">
                  <motion.div className="h-full bg-gold rounded-full" initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }} transition={{ delay: 0.5, duration: 0.6 }} />
                </div>
                <span className="text-xs text-espresso/40 w-4 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="px-5 mt-8">
        <h2 className="font-serif text-xl font-bold text-espresso mb-4">Что говорят клиенты</h2>
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }} className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: GRADIENTS[current % GRADIENTS.length] }}>
                {REVIEWS[current].client_name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-espresso">{REVIEWS[current].client_name}</p>
                <StarRow rating={REVIEWS[current].rating} />
              </div>
              <span className="ml-auto text-espresso/35 text-xs">{REVIEWS[current].date}</span>
            </div>
            <p className="text-espresso/80 text-[15px] leading-relaxed">{REVIEWS[current].text}</p>
            <div className="mt-4 pt-4 border-t border-sand/20">
              <span className="text-xs bg-warm-beige text-cocoa px-3 py-1 rounded-full font-medium">
                {REVIEWS[current].service}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-4">
          <button onClick={prev} id="reviews-prev" className="w-11 h-11 rounded-full bg-warm-beige flex items-center justify-center border border-sand/40">
            <ChevronLeft size={20} className="text-cocoa" />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-cocoa' : 'w-2 h-2 bg-sand'}`} />
            ))}
          </div>
          <button onClick={next} id="reviews-next" className="w-11 h-11 rounded-full bg-warm-beige flex items-center justify-center border border-sand/40">
            <ChevronRight size={20} className="text-cocoa" />
          </button>
        </div>
      </div>

      {/* CTA */}
      <motion.div className="mx-5 mt-8 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="rounded-3xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #8B6348, #5C3D2E)' }}>
          <MessageCircle size={28} className="text-gold mx-auto mb-3" />
          <p className="font-serif text-xl font-bold text-cream mb-1">Были у меня?</p>
          <p className="text-cream/65 text-sm mb-4">Оставьте отзыв — это очень важно!</p>
          <Link href="/dashboard" id="leave-review-btn"
            className="inline-block bg-white text-cocoa font-bold px-7 py-3 rounded-full text-sm">
            Оставить отзыв
          </Link>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
