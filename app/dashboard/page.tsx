'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, Clock, LogOut, ChevronRight, Star, Bell } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import Link from 'next/link'

// Demo data — replaced with real Supabase data when connected
const DEMO_USER = { name: 'Алина Карпова', phone: '+7 701 234 56 78', visits: 3 }
const DEMO_UPCOMING = [
  { id: 1, service: 'Ламинирование ресниц', date: '20 мая 2025', time: '14:00', status: 'confirmed' },
]
const DEMO_HISTORY = [
  { id: 2, service: 'Комбо: ресницы + брови', date: '1 апреля 2025', time: '11:00', status: 'completed' },
  { id: 3, service: 'Ламинирование бровей',  date: '10 марта 2025', time: '13:30', status: 'completed' },
  { id: 4, service: 'Ламинирование ресниц',  date: '5 февраля 2025', time: '15:00', status: 'completed' },
]

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-green-50 text-green-700',
  completed: 'bg-warm-beige text-cocoa',
  cancelled:  'bg-red-50 text-red-500',
  pending:    'bg-yellow-50 text-yellow-700',
}
const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Подтверждено',
  completed: 'Завершено',
  cancelled:  'Отменено',
  pending:    'Ожидает',
}

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [phone, setPhone]           = useState('+996 ')
  const [fullName, setFullName]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [tab, setTab]               = useState<'upcoming' | 'history'>('upcoming')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (phone.length < 10) return
    setLoading(true)
    setTimeout(() => { setIsLoggedIn(true); setLoading(false) }, 1000)
  }

  function handleLogout() { setIsLoggedIn(false); setPhone('+996 '); setFullName('') }

  if (!isLoggedIn) {
    return (
      <div className="page-container bg-cream min-h-screen text-espresso">
        <div className="pt-safe px-5 pt-14 pb-6 text-center">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Личный кабинет</p>
          <h1 className="font-serif text-3xl font-bold">Добро пожаловать</h1>
          <p className="text-espresso/50 text-sm mt-2 max-w-[280px] mx-auto leading-relaxed">
            Войдите по номеру телефона, чтобы увидеть свои записи
          </p>
        </div>

        <div className="px-6">
          <form onSubmit={handleLogin} className="space-y-5 glass-card p-8 rounded-[32px]">
            <div>
              <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-2 block ml-1">Ваше имя</label>
              <input id="auth-name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="Как к вам обращаться?" className="input-field bg-white border-gold/20" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-2 block ml-1">Номер телефона</label>
              <input id="auth-phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+996 (___) ___-___" type="tel" className="input-field bg-white border-gold/20" />
            </div>

            <button type="submit" id="auth-submit-btn" disabled={loading || phone.length < 10}
              className="btn-primary w-full py-5 text-xs uppercase tracking-[0.2em] mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 70" />
                </svg>
              ) : 'Войти в кабинет'}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 gap-4">
            {[
              { icon: Calendar, text: 'История всех ваших записей' },
              { icon: Bell,     text: 'Напоминания о процедурах' },
              { icon: Star,     text: 'Ваш статус постоянного клиента' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 text-xs font-medium text-espresso/60 bg-white/40 p-4 rounded-2xl border border-gold/5">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="page-container bg-cream min-h-screen text-espresso">
      {/* Profile header */}
      <div className="pt-safe px-5 pt-14 pb-8 border-b border-gold/10" style={{ background: 'linear-gradient(160deg, #FFF9F4, #F6F0E8)' }}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Личный кабинет</p>
          <button onClick={handleLogout} id="logout-btn" className="flex items-center gap-1.5 text-espresso/40 text-[10px] font-bold uppercase tracking-widest bg-white/50 px-3 py-1.5 rounded-full border border-gold/10">
            <LogOut size={12} /> Выйти
          </button>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg border-2 border-white"
            style={{ background: 'linear-gradient(135deg, var(--cherry), var(--cherry-dark))' }}>
            {fullName ? fullName.split(' ').map(n=>n[0]).join('') : '👤'}
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-espresso">{fullName || 'Клиент'}</p>
            <p className="text-espresso/50 text-sm font-medium">{phone}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Star size={14} className="fill-gold text-gold" />
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider">Золотой статус</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 py-6">
        <Link href="/booking" id="dashboard-book-btn"
          className="flex items-center justify-between glass-card rounded-3xl p-5 border border-gold/10 active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-gold/20 shadow-lg">
              <Calendar size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-espresso text-sm">Записаться</p>
              <p className="text-espresso/40 text-xs font-medium">Выбрать удобное время</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gold/40" />
        </Link>
      </div>

      {/* Appointments */}
      <div className="px-5">
        {/* Tabs */}
        <div className="flex bg-warm-beige/30 rounded-2xl p-1.5 mb-6 border border-gold/5">
          {(['upcoming', 'history'] as const).map((t) => (
            <button key={t} id={`tab-${t}`} onClick={() => setTab(t)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                tab === t ? 'bg-white text-gold shadow-sm' : 'text-espresso/40'
              }`}>
              {t === 'upcoming' ? 'Предстоящие' : 'История'}
            </button>
          ))}
        </div>

        {tab === 'upcoming' && (
          <div className="space-y-3">
            {DEMO_UPCOMING.length === 0 ? (
              <div className="text-center py-12 text-espresso/40">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">Нет предстоящих записей</p>
              </div>
            ) : (
              DEMO_UPCOMING.map((b) => (
                <motion.div key={b.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  className="glass-card rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-espresso text-sm">{b.service}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status]}`}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-espresso/55">
                    <span className="flex items-center gap-1"><Calendar size={12}/>{b.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/>{b.time}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-3">
            {DEMO_HISTORY.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-espresso text-sm">{b.service}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-espresso/55">
                  <span className="flex items-center gap-1"><Calendar size={12}/>{b.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12}/>{b.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
