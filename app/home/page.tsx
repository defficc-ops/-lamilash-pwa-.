'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Star, ChevronRight, Sparkles, Clock, Award } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import Footer from '@/components/Footer'
import Certificates from '@/components/Certificates'
import FloatingContact from '@/components/FloatingContact'
import InstagramSection from '@/components/InstagramSection'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'

const SERVICES_PREVIEW = [
  { icon: '✨', name: 'Ламинирование ресниц 3в1', price: '600 с', time: '90 мин', href: '/booking' },
  { icon: '🌿', name: 'Ламинирование бровей 5в1', price: '800 с', time: '60 мин', href: '/booking' },
  { icon: '💫', name: 'Комбо Лами (всё вкл)', price: '1200 с', time: '150 мин', href: '/booking' },
  { icon: '🎨', name: 'Окрашивание', price: '250 с', time: '45 мин', href: '/booking' },
]

const STATS = [
  { value: '500+', label: 'Клиентов' },
  { value: '45м', label: 'Быстро' },
  { value: '100%', label: 'Гарантия' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function HomePage() {
  return (
    <div className="page-container bg-cream">
      {/* ── Hero ── */}
      <div
        className="relative pt-safe overflow-hidden bg-cream"
        style={{
          minHeight: '40vw',
          paddingBottom: '1rem',
        }}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-warm-beige/20 blur-[80px] rounded-full" />

        <div className="relative z-10 px-6 pt-10 pb-6">
          {/* Greeting tag */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-3 py-1 rounded-lg mb-4 border border-gold/20 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-espresso/70 text-[10px] font-bold tracking-[0.2em] uppercase">Professional Studio</span>
          </motion.div>

          <motion.h1
            className="font-serif text-4xl font-bold text-espresso leading-tight mb-2 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Lamilash Kari
          </motion.h1>

          <motion.p
            className="text-espresso/60 text-sm leading-relaxed mb-6 max-w-[280px] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Идеальный взгляд без макияжа. Ламинирование ресниц и бровей премиум-класса.
          </motion.p>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/booking" className="btn-primary flex-1 py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              <Calendar size={14} />
              Записаться
            </Link>
            <Link href="/portfolio" className="bg-white border border-gold/20 text-espresso px-5 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/5 transition-all flex items-center justify-center shadow-sm">
              Работы
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mx-6 glass-card rounded-2xl p-4 flex justify-around border border-gold/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-xl font-bold text-gold tracking-tighter">{s.value}</p>
              <p className="text-espresso/40 text-[9px] uppercase font-bold tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Master Highlights (Bio-style) */}
        <motion.div 
          className="px-6 mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-6 border border-gold/10 relative overflow-hidden bg-white/40">
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-xl shadow-inner">
                  ✨
                </div>
                <p className="font-serif text-lg font-bold text-espresso">Я Карина — твой мастер Лами</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { text: 'Яркий изгиб за 45 минут', icon: '⚡' },
                  { text: 'Лами ресниц и бровей за 1 час', icon: '⏳' },
                  { text: 'Гарантия на носку и результат', icon: '✅' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-espresso/80">
                    <span className="text-gold font-bold">{item.icon}</span>
                    <p className="text-xs font-medium tracking-wide">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-espresso/5 mt-2">
                <p className="text-[10px] text-espresso/40 uppercase font-bold tracking-[0.2em]">
                  7 mkr 11 a, Bishkek, Kyrgyzstan
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Services ── */}
      <motion.section
        className="px-5 mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl font-bold text-espresso">Услуги</h2>
          <Link href="/booking" className="text-gold text-sm font-semibold flex items-center gap-1">
            Все <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {SERVICES_PREVIEW.map((svc, i) => (
            <motion.div key={svc.name} variants={itemVariants}>
              <Link href={svc.href} id={`service-card-${i}`}>
                <div className="service-card p-4">
                  <span className="text-2xl block mb-2">{svc.icon}</span>
                  <p className="font-semibold text-espresso text-[13px] leading-snug mb-2">{svc.name}</p>
                  <div className="flex items-center gap-1 text-espresso/40 text-[11px] mb-2">
                    <Clock size={11} />
                    <span>{svc.time}</span>
                  </div>
                  <p className="text-gold font-bold text-sm">{svc.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Why Choose Me ── */}
      <motion.section
        className="px-5 mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.h2 variants={itemVariants} className="font-serif text-2xl font-bold text-espresso mb-5">
          Почему выбирают меня
        </motion.h2>
        <div className="space-y-3">
          {[
            { icon: Award, title: 'Сертифицированный мастер', desc: 'Международный сертификат по технике ламинирования' },
            { icon: Sparkles, title: 'Премиальные составы', desc: 'Только проверенные профессиональные формулы' },
            { icon: Star, title: 'Индивидуальный подход', desc: 'Подбор под тип ресниц и желаемый результат' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex gap-4 glass-card rounded-2xl p-4"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-gold" />
              </div>
              <div>
                <p className="font-semibold text-espresso text-sm">{title}</p>
                <p className="text-espresso/55 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA Banner ── */}
      <motion.section
        className="px-5 mt-10 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="rounded-3xl p-8 text-center relative overflow-hidden border border-gold/20"
          style={{ background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--warm-beige) 100%)' }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[60px] rounded-full" />
          <p className="font-serif text-2xl font-bold text-espresso mb-2">
            Готовы к преображению?
          </p>
          <p className="text-espresso/60 text-sm mb-6 font-medium">Запишитесь онлайн прямо сейчас</p>
          <Link
            href="/booking"
            id="cta-book-btn"
            className="btn-primary inline-block px-10 py-4 rounded-full text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            Выбрать время ✨
          </Link>
        </div>
      </motion.section>

      {/* ── Recent Works ── */}
      <motion.section
        className="px-5 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl font-bold text-espresso">Мои работы</h2>
          <Link href="/portfolio" className="text-cocoa text-sm font-medium flex items-center gap-1">
            Галерея <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div className="scroll-x pb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden glass-card border-white/40 relative group"
            >
              <img 
                src={`/images/work${i}.png`} 
                alt={`Результат ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as any).src = 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                 <p className="text-white text-xs font-medium backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full">Посмотреть детали ✧</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <InstagramSection />
      <Certificates />
      <FloatingContact />
      <PWAInstallPrompt />
      <Footer />
      <BottomNav />
    </div>
  )
}
