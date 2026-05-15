'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import BottomNav from '@/components/BottomNav'

const CATEGORIES = [
  { id: 'all',     label: 'Все'        },
  { id: 'lash',    label: 'Ресницы'    },
  { id: 'brow',    label: 'Брови'      },
  { id: 'combo',   label: 'Комбо'      },
]

const PORTFOLIO_ITEMS = [
  { id: 1, category: 'lash',  caption: 'Идеальный изгиб и разделение ресниц',          before: '/images/work1.png', after: '/images/work1.png' },
  { id: 2, category: 'combo', caption: 'Ламинирование ресниц + оформление бровей',    before: '/images/work2.png', after: '/images/work2.png' },
  { id: 3, category: 'lash',  caption: 'Распахнутый взгляд: эффект 24/7',             before: '/images/work3.png', after: '/images/work3.png' },
  { id: 4, category: 'lash',  caption: 'Натуральный объем и питание ресниц',          before: '/images/work4.png', after: '/images/work4.png' },
  { id: 5, category: 'combo', caption: 'Комплексное преображение Kari Studio',         before: '/images/work5.png', after: '/images/work5.png' },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((p) => p.category === activeCategory)

  return (
    <div className="page-container bg-cream">
      {/* Header */}
      <div className="pt-safe px-5 pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cocoa text-xs font-semibold uppercase tracking-widest mb-1">Портфолио</p>
          <h1 className="font-serif text-3xl font-bold text-espresso">Мои работы</h1>
          <p className="text-espresso/55 text-sm mt-1">Перетащите ползунок для сравнения</p>
        </motion.div>
      </div>

      {/* Category filter */}
      <div className="scroll-x px-5 py-3 gap-2">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-cocoa text-cream shadow-soft'
                : 'bg-warm-beige text-espresso/70 border border-sand/40'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-5 pt-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="aspect-square relative">
                   <img 
                      src={item.after} 
                      alt={item.caption}
                      className="w-full h-full object-cover"
                   />
                   <div className="absolute top-2 left-2 bg-gold/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                      <p className="text-[8px] font-bold text-white uppercase tracking-tighter">After</p>
                   </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] text-espresso font-medium leading-tight line-clamp-2 h-7">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Upload placeholder notice */}
        <motion.div
          className="mt-8 mb-4 glass-card rounded-2xl p-5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl mb-2">📸</p>
          <p className="font-semibold text-espresso text-sm">Ваши фото появятся здесь</p>
          <p className="text-espresso/50 text-xs mt-1">Загрузите фото До/После через панель администратора</p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  )
}
