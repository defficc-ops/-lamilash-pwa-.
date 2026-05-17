'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ChevronRight, CheckCircle, Loader } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import { format, addDays, isBefore, startOfToday } from 'date-fns'
import BottomNav from '@/components/BottomNav'
import { siteConfig } from '@/lib/config'

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
  const [slotId, setSlotId]       = useState<number | null>(null)
  const [availableSlots, setAvailableSlots] = useState<{id: number, time: string}[]>([])
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('+996 ')
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const today = startOfToday()
  const maxDate = addDays(today, 60)

  // Fetch slots when date changes
  async function fetchSlots(selectedDate: Date) {
    const formatted = format(selectedDate, 'yyyy-MM-dd')
    try {
      const res = await fetch(`/api/slots?date=${formatted}`)
      const data = await res.json()
      setAvailableSlots(data.slots || [])
    } catch (err) {
      console.error('Failed to fetch slots', err)
    }
  }

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
          slotId,
          clientName: name,
          clientPhone: phone,
        }),
      })
      setDone(true)
      setStep(4)

      // Формируем сообщение для WhatsApp
      const text = `Здравствуйте, Карина! ✨\n\nХочу подтвердить свою онлайн-запись:\nУслуга: ${service.name}\nДата: ${format(date, 'd MMMM', { locale: ru })} в ${time}\nИмя: ${name}`;
      const encodedText = encodeURIComponent(text);
      const waPhone = siteConfig.contacts.phone.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${waPhone}?text=${encodedText}`;
      
      // Перенаправляем клиента в WhatsApp
      window.location.href = waUrl;

    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(0); setService(null); setDate(undefined)
    setTime(null); setSlotId(null); setName(''); setPhone('+996 '); setDone(false)
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val.startsWith('+996 ')) {
      setPhone(val)
    } else if (val.length < 5) {
      setPhone('+996 ')
    }
  }

  return (
    <div className="page-container bg-cream min-h-screen text-espresso">
      {/* Header */}
      <div className="pt-safe px-5 pt-14 pb-4">
        <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Онлайн-запись</p>
        <h1 className="font-serif text-3xl font-bold">Записаться</h1>
      </div>

      {/* Step indicator */}
      <div className="px-5 mb-8">
        <div className="flex items-center gap-1">
          {STEPS.slice(0,4).map((label, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                i < step ? 'bg-gold text-white' : i === step ? 'bg-gold text-white ring-4 ring-gold/20' : 'bg-warm-beige/30 text-espresso/30 border border-gold/5'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${i < step ? 'bg-gold' : 'bg-gold/10'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-0">
          {STEPS.slice(0,4).map((l, i) => (
            <span key={i} className={`text-[9px] font-bold uppercase tracking-widest ${i === step ? 'text-gold' : 'text-espresso/30'}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          {/* STEP 0 — Service */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <h2 className="font-bold text-espresso mb-4 text-[10px] uppercase tracking-[0.2em] opacity-40">Выберите услугу</h2>
              <div className="space-y-3">
                {SERVICES.map((svc) => (
                  <button key={svc.id} id={`svc-${svc.id}`}
                    onClick={() => { setService(svc); setStep(1) }}
                    className={`w-full text-left service-card p-5 flex items-center gap-5 transition-all active:scale-98 ${service?.id === svc.id ? 'border-gold shadow-md' : 'border-gold/10'}`}>
                    <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-2xl">
                      {svc.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-espresso text-sm tracking-tight">{svc.name}</p>
                      <div className="flex gap-4 mt-1.5">
                        <span className="text-[10px] font-bold text-espresso/40 flex items-center gap-1 uppercase tracking-wider"><Clock size={12} className="text-gold/60"/>{svc.duration} мин</span>
                        <span className="text-xs font-bold text-gold">{svc.price.toLocaleString()} с</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gold/30" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Date */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-espresso text-[10px] uppercase tracking-[0.2em] opacity-40">Выберите дату</h2>
                <button onClick={() => setStep(0)} className="text-gold text-xs font-bold uppercase tracking-widest">← Назад</button>
              </div>
              <div className="glass-card rounded-[32px] p-4 border border-gold/10">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={(d) => { 
                    if(d) {
                      setDate(d); 
                      fetchSlots(d);
                      setStep(2);
                    }
                  }}
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
                <h2 className="font-bold text-espresso text-[10px] uppercase tracking-[0.2em] opacity-40">Выберите время</h2>
                <button onClick={() => setStep(1)} className="text-gold text-xs font-bold uppercase tracking-widest">← Назад</button>
              </div>
              {date && (
                <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between border border-gold/10 bg-white">
                  <div className="flex items-center gap-3 text-sm font-bold text-espresso/70">
                    <Calendar size={18} className="text-gold" />
                    <span>{format(date, 'd MMMM yyyy', { locale: ru })}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse" />
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-3">
                {availableSlots.length > 0 ? (
                  availableSlots.map((s) => (
                    <button key={s.id} id={`time-${s.time}`}
                      onClick={() => { setTime(s.time); setSlotId(s.id); setStep(3) }}
                      className={`py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all active:scale-95 ${
                        time === s.time
                          ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20'
                          : 'bg-white text-espresso border-gold/10 hover:border-gold/40'
                      }`}>
                      {s.time}
                    </button>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center glass-card rounded-3xl border-dashed border-gold/20">
                    <p className="text-xs font-bold text-espresso/30 uppercase tracking-widest">Нет свободных мест 😔</p>
                  </div>
                )}
              </div>
              <p className="text-[9px] text-espresso/30 text-center mt-8 uppercase font-bold tracking-[0.2em]">
                * Время по местному часовому поясу
              </p>
            </motion.div>
          )}

          {/* STEP 3 — Contacts */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-espresso text-[10px] uppercase tracking-[0.2em] opacity-40">Ваши данные</h2>
                <button onClick={() => setStep(2)} className="text-gold text-xs font-bold uppercase tracking-widest">← Назад</button>
              </div>

              {/* Summary */}
              <div className="glass-card rounded-[32px] p-8 mb-8 space-y-5 relative overflow-hidden border border-gold/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                <div className="flex justify-between items-start gap-4">
                  <span className="text-espresso/30 uppercase text-[9px] font-bold tracking-[0.2em] pt-1">Услуга</span>
                  <span className="font-bold text-espresso text-sm text-right leading-tight">{service?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-espresso/30 uppercase text-[9px] font-bold tracking-[0.2em]">Время</span>
                  <span className="font-bold text-espresso text-sm">
                    {date ? format(date, 'd MMMM', { locale: ru }) : '—'} в {time}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gold/5">
                  <span className="text-espresso/30 uppercase text-[9px] font-bold tracking-[0.2em]">К оплате</span>
                  <span className="font-bold text-gold text-xl tracking-tight">{service?.price.toLocaleString()} с</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-2 block ml-1">Ваше имя</label>
                  <input id="booking-name" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться?" className="input-field bg-white border-gold/20" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-2 block ml-1">Номер телефона</label>
                  <input id="booking-phone" value={phone} onChange={handlePhoneChange}
                    placeholder="+996 (___) ___-___" type="tel" className="input-field bg-white border-gold/20" />
                </div>
              </div>

              <button id="booking-confirm-btn" onClick={handleConfirm} disabled={!name || phone.length < 10 || loading}
                className="btn-primary w-full py-6 mt-10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-gold/20">
                {loading ? <Loader size={18} className="animate-spin" /> : null}
                {loading ? 'Отправляем...' : 'Записаться'}
              </button>
            </motion.div>
          )}

          {/* STEP 4 — Done */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8 border border-gold/20"
              >
                <CheckCircle size={48} className="text-gold" />
              </motion.div>
              <h2 className="font-serif text-3xl font-bold text-espresso mb-4 leading-tight">Запись успешно создана!</h2>
              <div className="glass-card rounded-3xl p-6 mb-10 border border-gold/10 inline-block px-10">
                 <p className="text-espresso/50 text-xs font-bold uppercase tracking-widest mb-1">{service?.name}</p>
                 <p className="text-gold font-bold text-lg">
                   {date ? format(date, 'd MMMM', { locale: ru }) : ''} в {time}
                 </p>
              </div>
              <p className="text-espresso/40 text-xs mb-10 max-w-[280px] mx-auto leading-relaxed font-medium">
                Сейчас вы будете перенаправлены в WhatsApp для подтверждения записи. Если этого не произошло, нажмите кнопку ниже ✨
              </p>
              <a href={`https://wa.me/${siteConfig.contacts.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Здравствуйте, Карина! ✨\nХочу подтвердить запись на ${service?.name} (${date ? format(date, 'd MMMM', { locale: ru }) : ''} в ${time}). Имя: ${name}`)}`}
                className="btn-primary px-12 py-5 text-[10px] font-bold uppercase tracking-[0.2em] mx-auto block shadow-lg text-center mb-4">
                Перейти в WhatsApp
              </a>
              <button onClick={reset} id="booking-new-btn"
                className="text-espresso/40 text-[10px] font-bold uppercase tracking-widest block w-full">
                На главную
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}
