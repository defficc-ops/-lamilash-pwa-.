import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'
import { getSlotsSummaryForTelegram } from '@/lib/slots'
import { supabaseAdmin } from '@/lib/supabase'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = body?.message
    if (!message) return NextResponse.json({ ok: true })

    const chatId  = message.chat?.id
    const text    = (message.text ?? '').trim().toLowerCase()
    const ownerChatId = process.env.TELEGRAM_OWNER_CHAT_ID

    // ── /start ──────────────────────────────────────────────
    if (text === '/start') {
      await sendTelegramMessage(chatId,
        `✨ <b>Добро пожаловать в Lamilash Kari!</b>\n\n` +
        `Я помогу вам:\n` +
        `📅 /slots — Показать свободные слоты\n` +
        `📞 /book — Записаться онлайн\n` +
        `ℹ️ /about — О мастере и услугах\n\n` +
        `Или сразу записывайтесь на сайте 👇\n` +
        `${process.env.NEXT_PUBLIC_APP_URL}/booking`
      )
    }

    // ── /slots ──────────────────────────────────────────────
    else if (text === '/slots' || text.includes('слот') || text.includes('время') || text.includes('свободн')) {
      const summary = await getSlotsSummaryForTelegram()
      await sendTelegramMessage(chatId, summary)
    }

    // ── /book ───────────────────────────────────────────────
    else if (text === '/book' || text.includes('запис')) {
      await sendTelegramMessage(chatId,
        `📲 <b>Запись онлайн</b>\n\n` +
        `Перейдите на сайт для выбора удобного времени:\n` +
        `${process.env.NEXT_PUBLIC_APP_URL}/booking\n\n` +
        `Или напишите нам — подберём время вручную 🌸`
      )
    }

    // ── /about ──────────────────────────────────────────────
    else if (text === '/about' || text.includes('услуг') || text.includes('цен') || text.includes('прайс')) {
      await sendTelegramMessage(chatId,
        `🌸 <b>Lamilash Kari — Beauty Studio</b>\n\n` +
        `✨ Ламинирование ресниц — <b>5 500 ₸</b> / 90 мин\n` +
        `🌿 Ламинирование бровей — <b>4 500 ₸</b> / 60 мин\n` +
        `💫 Комбо ресницы+брови — <b>8 500 ₸</b> / 150 мин\n` +
        `🎨 Окрашивание ресниц — <b>2 500 ₸</b> / 45 мин\n` +
        `🎨 Окрашивание бровей — <b>2 500 ₸</b> / 45 мин\n` +
        `✂️ Коррекция бровей — <b>1 500 ₸</b> / 30 мин\n\n` +
        `📅 Записаться: ${process.env.NEXT_PUBLIC_APP_URL}/booking`
      )
    }

    // ── Owner: /mybookings ───────────────────────────────────
    else if (text === '/mybookings' && String(chatId) === String(ownerChatId)) {
      const { data } = await supabaseAdmin
        .from('bookings')
        .select('*, services(name_ru)')
        .eq('status', 'confirmed')
        .gte('booked_at', new Date().toISOString())
        .order('booked_at', { ascending: true })
        .limit(10)

      if (!data || data.length === 0) {
        await sendTelegramMessage(chatId, '📭 Предстоящих записей нет.')
      } else {
        const lines = data.map((b: any) => {
          const dt = parseISO(b.booked_at)
          const dateStr = format(dt, 'd MMMM HH:mm', { locale: ru })
          return `• ${dateStr} — ${(b.services as any)?.name_ru ?? 'Услуга'} (${b.client_name})`
        })
        await sendTelegramMessage(chatId,
          `📋 <b>Предстоящие записи:</b>\n\n${lines.join('\n')}`)
      }
    }

    // ── Default ──────────────────────────────────────────────
    else {
      await sendTelegramMessage(chatId,
        `Привет! 👋 Напишите одну из команд:\n` +
        `📅 /slots — свободные слоты\n` +
        `📞 /book — записаться\n` +
        `ℹ️ /about — услуги и цены`
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Telegram webhook error:', err)
    return NextResponse.json({ ok: true }) // Always 200 to Telegram
  }
}
