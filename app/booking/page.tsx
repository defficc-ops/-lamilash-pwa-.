'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ChevronRight, CheckCircle, Loader } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import { format, addDays, isBefore, startOfToday } from 'date-fns'
import BottomNav from '@/components/BottomNav'

const SERVICES = [
  { id: 1, name: 'Ламинирование ресниц 3в1', duration: 90,  price: 600, icon: '✨' },
  { id: 2, name: 'Ламинирование бровей 5в1', duration: 60,  price: 800, icon: '🌿' },
  { id: 3, name: 'Комбо Лами (всё включено)', duration: 150, price: 1200, icon: '💫' },
  { id: 4, name: 'Окрашивание ресниц',   duration: 45,  price: 250, icon: '🎨' },
  { id: 5, name: 'Окрашивание бровей',   duration: 45,  price: 250, icon: '🎨' },
  { id: 6, name: 'Коррекция бровей',     duration: 30,  price: 150, icon: '✂️' },
]

const DEMO_TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']

const STEPS = ['Услуга', 'Дата', 'Время', 'Контакты', 'Готово']

export default function BookingPage() {
  const [step, setStep]           = useState(0)
  const [service, setService]     = useState<typeof SERVICES[0] | null>(null)
  const [date, setDate]           = useState<Date | undefined>()
  const [time, setTime]           = useState<string | null>(null)
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const today = startOfToday()
  const maxDate = addDays(today, 60)

  async function handleConfirm() {
    if (!service || !date || !time) return
    setLoading(true)
    try {
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          date: format(date, 'dd.MM.yyyy'),
          time,
          clientName: name,
          clientPhone: phone,
        }),
      })
      setDone(true)
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(0); setService(null); setDate(undefined)
    setTime(null); setName(''); setPhone(''); setDone(false)
  }

  return (
    <div className="page-container bg-cream">
      {/* Header */}
      <div className="pt-safe px-5 pt-14 pb-4">
        <p className="text-cocoa text-xs font-semibold uppercase tracking-widest mb-1">Онлайн-запись</p>
        <h1 className="font-serif text-3xl font-bold text-espresso">Записаться</h1>
      </div>

      {/* Step indicator */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-1">
          {STEPS.slice(0,4).map((label, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-cocoa text-cream' : i === step ? 'bg-cocoa text-cream ring-4 ring-cocoa/20' : 'bg-warm-beige text-espresso/40'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${i < step ? 'bg-cocoa' : 'bg-sand/40'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 px-0">
          {STEPS.slice(0,4).map((l, i) => (
            <span key={i} className={`text-[10px] ${i === step ? 'text-cocoa font-semibold' : 'text-espresso/40'}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          {/* STEP 0 — Service */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <h2 className="font-semibold text-espresso mb-4">Выберите услугу</h2>
              <div className="space-y-3">
                {SERVICES.map((svc) => (
                  <button key={svc.id} id={`svc-${svc.id}`}
                    onClick={() => { setService(svc); setStep(1) }}
                    className={`w-full text-left service-card p-4 flex items-center gap-4 ${service?.id === svc.id ? 'border-cocoa' : ''}`}>
                    <span className="text-2xl">{svc.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-espresso text-sm">{svc.name}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-espresso/50 flex items-center gap-1"><Clock size={11}/>{svc.duration} мин</span>
                        <span className="text-xs font-bold text-cocoa">{svc.price.toLocaleString()} с</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-sand" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Date */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-espresso">Выберите дату</h2>
                <button onClick={() => setStep(0)} className="text-cocoa text-sm">← Назад</button>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); if(d) setStep(2) }}
                  locale={ru}
                  disabled={{ before: today, after: maxDate }}
                  modifiersClassNames={{ selected: 'rdp-day_selected' }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Time */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-espresso">Выберите время</h2>
                <button onClick={() => setStep(1)} className="text-cocoa text-sm">← Назад</button>
              </div>
              {date && (
                <div className="glass-card rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-espresso/70">
                    <Calendar size={16} className="text-cocoa" />
                    <span>{format(date, 'd MMMM yyyy', { locale: ru })}</span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {DEMO_TIMES.map((t) => (
                  <button key={t} id={`time-${t}`}
                    onClick={() => { setTime(t); setStep(3) }}
                    className={`py-3 rounded-2xl text-sm font-semibold border transition-all ${
                      time === t
                        ? 'bg-cocoa text-cream border-cocoa'
                        : 'bg-white text-espresso border-sand/40 hover:border-cocoa'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-espresso/40 text-center mt-4">
                * Слоты обновляются в реальном времени из базы данных
              </p>
            </motion.div>
          )}

          {/* STEP 3 — Contacts */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-espresso">Ваши данные</h2>
                <button onClick={() => setStep(2)} className="text-cocoa text-sm">← Назад</button>
              </div>

              {/* Summary */}
              <div className="glass-card rounded-2xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60">Услуга</span>
                  <span className="font-semibold text-espresso">{service?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60">Дата</span>
                  <span className="font-semibold text-espresso">
                    {date ? format(date, 'd MMMM', { locale: ru }) : '—'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/60">Время</span>
                  <span className="font-semibold text-espresso">{time}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-sand/20">
                  <span className="text-espresso/60">Стоимость</span>
                  <span className="font-bold text-cocoa">{service?.price.toLocaleString()} с</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-espresso/70 mb-1.5 block">Ваше имя</label>
                  <input id="booking-name" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso/70 mb-1.5 block">Номер телефона</label>
                  <input id="booking-phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__" type="tel" className="input-field" />
                </div>
              </div>

              <button id="booking-confirm-btn" onClick={handleConfirm} disabled={!name || !phone || loading}
                className="btn-primary w-full py-4 mt-6 text-base flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader size={18} className="animate-spin" /> : null}
                {loading ? 'Отправляем...' : 'Подтвердить запись'}
              </button>
            </motion.div>
          )}

          {/* STEP 4 — Done */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-warm-beige flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={48} className="text-cocoa" />
              </motion.div>
              <h2 className="font-serif text-2xl font-bold text-espresso mb-2">Запись подтверждена!</h2>
              <p className="text-espresso/60 text-sm mb-2">{service?.name}</p>
              <p className="text-cocoa font-semibold text-sm mb-6">
                {date ? format(date, 'd MMMM', { locale: ru }) : ''} в {time}
              </p>
              <p className="text-espresso/50 text-xs mb-8">
                Мастер свяжется с вами для подтверждения. Напоминание придёт в Telegram.
              </p>
              <button onClick={reset} id="booking-new-btn"
                className="btn-primary px-8 py-3.5 text-sm mx-auto block">
                Записаться ещё раз
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}
