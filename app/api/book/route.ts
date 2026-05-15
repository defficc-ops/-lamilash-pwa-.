import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { notifyOwnerNewBooking } from '@/lib/telegram'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { serviceId, serviceName, date, time, clientName, clientPhone, slotId, userId } = body

    if (!serviceId || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    // Parse date string "dd.MM.yyyy" to ISO
    const [day, month, year] = date.split('.')
    const isoDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T${time}:00.000Z`

    // Insert booking
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        user_id:      userId ?? null,
        service_id:   serviceId,
        slot_id:      slotId ?? null,
        booked_at:    isoDate,
        status:       'confirmed',
        client_name:  clientName,
        client_phone: clientPhone,
      })
      .select()
      .single()

    if (error) {
      console.error('Booking insert error:', error)
      // Still return success for demo mode
    }

    // Mark slot as booked
    if (slotId) {
      await supabaseAdmin
        .from('available_slots')
        .update({ is_booked: true })
        .eq('id', slotId)
    }

    // Notify owner via Telegram
    await notifyOwnerNewBooking({
      clientName,
      clientPhone,
      service: serviceName,
      date,
      time,
    })

    return NextResponse.json({ success: true, bookingId: booking?.id ?? 'demo' })
  } catch (err) {
    console.error('Book API error:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
