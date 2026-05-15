'use client'

import { MapPin, Map as MapIcon, ExternalLink, Instagram, Phone, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="mt-12 bg-warm-beige/50 border-t border-sand/20 pt-10 pb-24 px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl font-bold text-espresso mb-2">Контакты</h2>
          <div className="h-1 w-12 bg-cocoa/40 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 border border-sand/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cocoa/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-cocoa" size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-cocoa uppercase tracking-wider mb-1">Адрес студии</p>
                <p className="text-espresso font-medium leading-relaxed">
                  Кыргызстан, Бишкек,<br />
                  7-й микрорайон, 11А
                </p>
              </div>
            </div>

            <a
              href={siteConfig.contacts.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 group"
            >
              <MapIcon size={18} />
              <span>Открыть в 2GIS</span>
              <ExternalLink size={14} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Social & Contact info */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-espresso/70 hover:text-[#0088cc] transition-colors"
            >
              <Send size={18} />
              <span className="text-[10px] font-medium">Telegram</span>
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-espresso/70 hover:text-pink-600 transition-colors"
            >
              <Instagram size={18} />
              <span className="text-[10px] font-medium">Instagram</span>
            </a>
            <a
              href={`tel:${siteConfig.contacts.phone}`}
              className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-espresso/70 hover:text-green-600 transition-colors"
            >
              <Phone size={18} />
              <span className="text-[10px] font-medium">Позвонить</span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-serif text-xl font-bold text-cocoa/60 italic">Lamilash Kari</p>
          <p className="text-[10px] text-espresso/40 mt-2 tracking-widest uppercase">
            © 2026 Beauty Studio · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
