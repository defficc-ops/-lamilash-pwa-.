'use client'

import { motion } from 'framer-motion'
import { BookOpen, Award, Star, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

export default function TrainingPage() {
  return (
    <div className="page-container bg-cream">
      {/* ── Hero Banner Section ── */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src="/images/founder.jpg.png" 
            alt="Обучение" 
            className="h-full w-full object-cover object-center"
          />
          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12 max-w-2xl mx-auto">
          <ScrollReveal direction="up" delay={0.4} distance={30}>
            <span className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-md px-3 py-1 rounded-full mb-4 border border-gold/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">Academy of Beauty</span>
            </span>
            <h1 className="heading-premium text-4xl md:text-5xl text-cream mb-3">Обучение от Kari</h1>
            <p className="text-cream/70 text-sm md:text-base max-w-[320px] leading-relaxed font-light">
              Освойте востребованную профессию в мире красоты под руководством опытного наставника.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-2xl mx-auto">
        {/* ── Why Training Section ── */}
        <section className="px-6 -mt-8 relative z-20">
          <div className="glass-premium rounded-[32px] p-8 shadow-strong border-white/40">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="heading-premium text-2xl text-espresso mb-6">Почему выбирают нас?</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Award, title: 'Сертификат', desc: 'Выдача именного сертификата после успешного окончания курса.' },
                { icon: BookOpen, title: 'Практика', desc: '90% обучения — это практика на моделях под контролем мастера.' },
                { icon: Star, title: 'Поддержка', desc: 'Доступ в закрытый чат выпускников и помощь после обучения.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} direction="up" delay={0.3 + i * 0.1} distance={20}>
                  <div className="flex md:flex-col gap-4 md:text-center md:items-center">
                    <div className="w-12 h-12 rounded-2xl bg-warm-beige/30 flex items-center justify-center flex-shrink-0">
                      <item.icon size={24} className="text-cocoa" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-espresso text-sm mb-1">{item.title}</h3>
                      <p className="text-espresso/60 text-[11px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Course Info Placeholder ── */}
        <section className="px-6 mt-12">
          <ScrollReveal direction="up">
            <div className="text-center mb-8">
              <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Программа</p>
              <h2 className="heading-premium text-3xl text-espresso">Что входит в курс?</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Теоретическая база и разбор составов',
              'Техника идеальной выкладки',
              'Работа со сложными ресницами',
              'Маркетинг и поиск первых клиентов',
              'Постановка руки и практика на моделях'
            ].map((text, i) => (
              <ScrollReveal key={i} direction="right" delay={0.1 * i} distance={15}>
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/60 h-full">
                  <CheckCircle2 size={18} className="text-gold flex-shrink-0" />
                  <span className="text-espresso/80 text-sm font-medium">{text}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Call to Action ── */}
        <section className="px-6 mt-16 mb-8">
          <ScrollReveal direction="up" blur>
            <div className="bg-dark-cocoa rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cocoa/20 blur-[60px] rounded-full" />
              
              <GraduationCap size={40} className="text-gold/40 mx-auto mb-4" />
              <h2 className="heading-premium text-2xl md:text-3xl text-cream mb-4">Начните свой путь в beauty-индустрии</h2>
              <p className="text-cream/60 text-xs md:text-sm mb-8 leading-relaxed max-w-md mx-auto">
                Количество мест в группе ограничено для максимального внимания каждому студенту.
              </p>
              
              <Link 
                href="https://t.me/your_username" 
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-widest"
              >
                Узнать подробности
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
