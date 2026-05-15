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
  const [loginView, setLoginView]   = useState<'login' | 'register'>('login')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [fullName, setFullName]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [tab, setTab]               = useState<'upcoming' | 'history'>('upcoming')

  // For demo: just simulate login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setIsLoggedIn(true); setLoading(false) }, 1000)
  }

  function handleLogout() { setIsLoggedIn(false); setEmail(''); setPassword('') }

  if (!isLoggedIn) {
    return (
      <div className="page-container bg-cream">
        <div className="pt-safe px-5 pt-14 pb-6">
          <p className="text-cocoa text-xs font-semibold uppercase tracking-widest mb-1">Личный кабинет</p>
          <h1 className="font-serif text-3xl font-bold text-espresso">
            {loginView === 'login' ? 'Войти' : 'Регистрация'}
          </h1>
        </div>

        <div className="px-5">
          {/* Toggle */}
          <div className="flex bg-warm-beige rounded-2xl p-1 mb-6">
            {(['login', 'register'] as const).map((v) => (
              <button key={v} id={`auth-tab-${v}`} onClick={() => setLoginView(v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  loginView === v ? 'bg-white text-cocoa shadow-soft' : 'text-espresso/50'
                }`}>
                {v === 'login' ? 'Войти' : 'Создать аккаунт'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginView === 'register' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="text-sm font-medium text-espresso/70 mb-1.5 block">Имя и фамилия</label>
                <input id="auth-name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  placeholder="Алина Карпова" className="input-field" />
              </motion.div>
            )}
            <div>
              <label className="text-sm font-medium text-espresso/70 mb-1.5 block">Email</label>
              <input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-espresso/70 mb-1.5 block">Пароль</label>
              <input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" className="input-field" />
            </div>

            <button type="submit" id="auth-submit-btn" disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 70" />
                </svg>
              ) : (loginView === 'login' ? 'Войти' : 'Зарегистрироваться')}
            </button>
          </form>

          <p className="text-center text-xs text-espresso/40 mt-6">
            {loginView === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button onClick={() => setLoginView(loginView === 'login' ? 'register' : 'login')}
              className="text-cocoa font-semibold">
              {loginView === 'login' ? 'Создать' : 'Войти'}
            </button>
          </p>

          {/* Benefits of signing up */}
          <div className="mt-10 space-y-3">
            {[
              { icon: Calendar, text: 'История всех ваших записей' },
              { icon: Bell,     text: 'Напоминания о процедурах' },
              { icon: Star,     text: 'Специальные предложения для клиентов' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-espresso/60">
                <div className="w-8 h-8 rounded-xl bg-warm-beige flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-cocoa" />
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
    <div className="page-container bg-cream">
      {/* Profile header */}
      <div className="pt-safe px-5 pt-14 pb-6" style={{ background: 'linear-gradient(160deg, #FDF8F3, #F2E8DC)' }}>
        <div className="flex items-center justify-between mb-5">
          <p className="text-cocoa text-xs font-semibold uppercase tracking-widest">Личный кабинет</p>
          <button onClick={handleLogout} id="logout-btn" className="flex items-center gap-1 text-espresso/50 text-sm">
            <LogOut size={15} /> Выйти
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-cream"
            style={{ background: 'linear-gradient(135deg, #8B6348, #5C3D2E)' }}>
            {DEMO_USER.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <p className="font-serif text-xl font-bold text-espresso">{DEMO_USER.name}</p>
            <p className="text-espresso/55 text-sm">{DEMO_USER.phone}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Star size={12} className="fill-gold text-gold" />
              <span className="text-xs text-espresso/60">Постоянный клиент · {DEMO_USER.visits} визита</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 py-4">
        <Link href="/booking" id="dashboard-book-btn"
          className="flex items-center justify-between glass-card rounded-2xl p-4 border border-cocoa/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cocoa flex items-center justify-center">
              <Calendar size={18} className="text-cream" />
            </div>
            <div>
              <p className="font-semibold text-espresso text-sm">Записаться</p>
              <p className="text-espresso/50 text-xs">Выбрать удобное время</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-sand" />
        </Link>
      </div>

      {/* Appointments */}
      <div className="px-5">
        {/* Tabs */}
        <div className="flex bg-warm-beige rounded-2xl p-1 mb-5">
          {(['upcoming', 'history'] as const).map((t) => (
            <button key={t} id={`tab-${t}`} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t ? 'bg-white text-cocoa shadow-soft' : 'text-espresso/50'
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
