import { supabase } from './supabase'
import { format, addMinutes, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export interface TimeSlot {
  id: number
  slot_datetime: string
  is_booked: boolean
  time: string
  date: string
}

export async function getAvailableSlots(dateStr: string): Promise<TimeSlot[]> {
  const startOfDay = `${dateStr}T00:00:00.000Z`
  const endOfDay   = `${dateStr}T23:59:59.999Z`

  const { data, error } = await supabase
    .from('available_slots')
    .select('*')
    .gte('slot_datetime', startOfDay)
    .lte('slot_datetime', endOfDay)
    .eq('is_booked', false)
    .order('slot_datetime', { ascending: true })

  if (error || !data) return []

  return data.map((slot) => ({
    ...slot,
    time: format(parseISO(slot.slot_datetime), 'HH:mm'),
    date: format(parseISO(slot.slot_datetime), 'd MMMM yyyy', { locale: ru }),
  }))
}

export async function getAvailableDates(): Promise<string[]> {
  const { data, error } = await supabase
    .from('available_slots')
    .select('slot_datetime')
    .eq('is_booked', false)
    .gte('slot_datetime', new Date().toISOString())
    .order('slot_datetime', { ascending: true })

  if (error || !data) return []

  const uniqueDates = Array.from(new Set(data.map((s) =>
    format(parseISO(s.slot_datetime), 'yyyy-MM-dd')
  )))
  return uniqueDates
}

export async function markSlotAsBooked(slotId: number): Promise<void> {
  await supabase
    .from('available_slots')
    .update({ is_booked: true })
    .eq('id', slotId)
}

// Helper for Telegram bot: returns next 3 available days summary
export async function getSlotsSummaryForTelegram(): Promise<string> {
  const dates = await getAvailableDates()
  if (dates.length === 0) return 'На ближайшие дни нет свободных слотов 😔'

  const lines = await Promise.all(
    dates.slice(0, 5).map(async (date) => {
      const slots = await getAvailableSlots(date)
      const timeList = slots.map((s) => s.time).join(', ')
      const dateLabel = format(new Date(date), 'd MMMM (EEEE)', { locale: ru })
      return `📅 <b>${dateLabel}</b>\n⏰ ${timeList}`
    })
  )

  return `✨ <b>Свободные слоты:</b>\n\n${lines.join('\n\n')}\n\n👉 Записаться: ${process.env.NEXT_PUBLIC_APP_URL}/booking`
}
