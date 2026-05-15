// Telegram Bot helper — sends notifications to owner
export async function sendTelegramMessage(chatId: string | number, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token || token === 'placeholder-bot-token') {
    console.log('[Telegram MOCK]', text)
    return
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })
}

export async function notifyOwnerNewBooking(data: {
  clientName: string
  clientPhone: string
  service: string
  date: string
  time: string
}) {
  const ownerChatId = process.env.TELEGRAM_OWNER_CHAT_ID ?? ''
  const message =
    `🆕 <b>Новая запись!</b>\n\n` +
    `👤 <b>Клиент:</b> ${data.clientName}\n` +
    `📱 <b>Телефон:</b> ${data.clientPhone}\n` +
    `✨ <b>Услуга:</b> ${data.service}\n` +
    `📅 <b>Дата:</b> ${data.date}\n` +
    `⏰ <b>Время:</b> ${data.time}\n\n` +
    `#новая_запись`
  await sendTelegramMessage(ownerChatId, message)
}

export async function notifyOwnerCancellation(data: {
  clientName: string
  service: string
  date: string
  time: string
}) {
  const ownerChatId = process.env.TELEGRAM_OWNER_CHAT_ID ?? ''
  const message =
    `❌ <b>Отмена записи</b>\n\n` +
    `👤 ${data.clientName}\n` +
    `✨ ${data.service}\n` +
    `📅 ${data.date} в ${data.time}\n` +
    `#отмена`
  await sendTelegramMessage(ownerChatId, message)
}
