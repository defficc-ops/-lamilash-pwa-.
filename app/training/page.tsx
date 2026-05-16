'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Award, Star, CheckCircle2, GraduationCap, ArrowRight, MessageCircle } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default function TrainingPage() {
  return (
    <div className="page-container bg-cream">
      {/* ── Hero Banner Section ── */}
      <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden bg-espresso">
        <motion.div 
          className="absolute inset-0"
          style={{
            y: useTransform(useScroll().scrollY, [0, 500], [0, 150]) // Parallax effect
          }}
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.15, filter: 'blur(10px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img 
              src="/images/90.png" 
              alt="Обучение" 
              className="h-full w-full object-cover object-[center_top] md:object-center"
            />
          </motion.div>
          {/* Enhanced Luxury Gradient: Darker at bottom for text readability, clearer at top for the face */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-transparent opacity-50" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0.6} distance={40} duration={1.5}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-flex items-center gap-2 bg-gold/30 backdrop-blur-xl px-4 py-1.5 rounded-full mb-6 border border-white/20 shadow-glow">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase shadow-sm">Premium Academy</span>
              </span>
            </motion.div>
            
            <h1 className="heading-premium text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl">
              <span className="block text-gold/90 text-xl md:text-2xl mb-2 font-sans tracking-[0.3em] uppercase">Master Class</span>
              Обучение от Kari
            </h1>
            
            <p className="text-cream/80 text-base md:text-lg max-w-[400px] leading-relaxed font-light drop-shadow-md">
              Раскройте свой потенциал и освойте искусство идеального взгляда под руководством эксперта.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-2xl mx-auto">
        {/* ── For Whom Section ── */}
        <section className="px-6 -mt-10 relative z-20">
          <div className="glass-premium rounded-[32px] p-8 shadow-strong border-white/40">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="heading-premium text-2xl text-espresso mb-6">Для кого подходит курс?</h2>
            </ScrollReveal>
            
            <div className="space-y-4">
              {[
                { title: 'Новичкам', desc: 'Тем, кто хочет освоить профессию с нуля и начать зарабатывать.' },
                { title: 'Действующим мастерам', desc: 'Для тех, кто хочет повысить квалификацию и улучшить технику.' },
                { title: 'Смена профессии', desc: 'Всем, кто мечтает о свободном графике и работе на себя.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} direction="right" delay={0.3 + i * 0.1} distance={20}>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-warm-beige/10 border border-gold/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-espresso text-sm">{item.title}</h3>
                      <p className="text-espresso/60 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Training Section ── */}
        <section className="px-6 mt-12">
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="heading-premium text-2xl text-espresso mb-8 text-center">Преимущества обучения</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Сертификат', desc: 'Именной сертификат об окончании.' },
              { icon: BookOpen, title: 'Практика', desc: 'Отработка на моделях 90% времени.' },
              { icon: Star, title: 'Поддержка', desc: 'Сопровождение после курса.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={0.3 + i * 0.1} distance={20}>
                <div className="flex md:flex-col gap-4 md:text-center md:items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-espresso text-sm mb-1">{item.title}</h3>
                    <p className="text-espresso/60 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── After Training Section ── */}
        <section className="px-6 mt-16">
          <div className="bg-espresso rounded-[40px] p-8 md:p-12 text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-[80px] rounded-full" />
            
            <ScrollReveal direction="up">
              <h2 className="heading-premium text-3xl mb-10">После обучения вы сможете:</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Выполнять лами любой сложности',
                'Подбирать бигуди безошибочно',
                'Создавать идеальный инста-контент',
                'Работать с премиальными составами',
                'Привлекать платежеспособных клиентов',
                'Окупить курс за 10-15 процедур'
              ].map((text, i) => (
                <ScrollReveal key={i} direction="up" delay={0.1 * i} distance={15}>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-gold" />
                    </div>
                    <span className="text-cream/80 text-sm font-light tracking-wide">{text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Call to Action ── */}
        <section className="px-6 mt-16 mb-8">
          <ScrollReveal direction="up" blur>
            <div className="bg-white rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden border border-gold/10 shadow-soft">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] rounded-full" />
              
              <GraduationCap size={40} className="text-gold/40 mx-auto mb-4" />
              <h2 className="heading-premium text-2xl md:text-3xl text-espresso mb-4">Начните карьеру в beauty сегодня</h2>
              <p className="text-espresso/50 text-xs md:text-sm mb-8 leading-relaxed max-w-md mx-auto">
                Запишитесь на консультацию, чтобы узнать подробности и забронировать место.
              </p>
              
              <Link 
              href={siteConfig.socials.whatsapp} 
              target="_blank"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg active:scale-95 bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-green-500/20"
            >
              <MessageCircle size={18} fill="currentColor" />
              Написать в WhatsApp
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
