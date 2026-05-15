'use client'

import { MessageCircle, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col gap-3">
      {/* Telegram Button */}
      <motion.a
        href={siteConfig.socials.telegram}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-glow-blue border border-white/20"
      >
        <Send size={24} fill="currentColor" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={siteConfig.socials.whatsapp}
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-glow-green border border-white/20"
      >
        <MessageCircle size={24} fill="currentColor" />
      </motion.a>
    </div>
  )
}

