import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { format, parseISO } from 'date-fns'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date') // yyyy-MM-dd

  if (!date) {
    return NextResponse.json({ error: 'date param required' }, { status: 400 })
  }

  try {
    const startOfDay = `${date}T00:00:00.000Z`
    const endOfDay   = `${date}T23:59:59.999Z`

    const { data, error } = await supabaseAdmin
      .from('available_slots')
      .select('*')
      .gte('slot_datetime', startOfDay)
      .lte('slot_datetime', endOfDay)
      .order('slot_datetime', { ascending: true })

    if (error) throw error

    const slots = (data ?? []).map((slot) => ({
      id: slot.id,
      time: format(parseISO(slot.slot_datetime), 'HH:mm'),
      slot_datetime: slot.slot_datetime,
      is_booked: slot.is_booked,
    }))

    // If no real slots yet, return demo slots for display
    if (slots.length === 0) {
      return NextResponse.json({
        slots: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map((t, i) => ({
          id: -(i + 1),
          time: t,
          slot_datetime: `${date}T${t}:00.000Z`,
          demo: true,
          is_booked: false,
        })),
      })
    }

    return NextResponse.json({ slots })
  } catch (err) {
    console.error('Slots API error:', err)
    // Graceful fallback
    return NextResponse.json({
      slots: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map((t, i) => ({
        id: -(i + 1),
        time: t,
        slot_datetime: `${date}T${t}:00.000Z`,
        demo: true,
        is_booked: false,
      })),
    })
  }
}
