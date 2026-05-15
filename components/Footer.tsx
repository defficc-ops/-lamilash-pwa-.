'use client'

import { MapPin, Map as MapIcon, ExternalLink, Instagram, Phone, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="mt-12 bg-warm-beige/20 border-t border-gold/10 pt-16 pb-24 px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl font-bold text-espresso mb-3 tracking-tight">Контакты</h2>
          <div className="h-0.5 w-16 bg-gold/40 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[32px] p-8 border border-gold/10 shadow-sm"
          >
            <div className="flex items-start gap-5 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-gold" size={24} />
              </div>
              <div className="text-left pt-0.5">
                <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1.5">Адрес студии</p>
                <p className="text-espresso font-bold text-base leading-snug">
                  Бишкек, 7-й микрорайон, 11А
                </p>
              </div>
            </div>

            <a
              href={siteConfig.contacts.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-5 flex items-center justify-center gap-3 group text-xs uppercase tracking-[0.2em]"
            >
              <MapIcon size={18} />
              <span>Открыть в 2GIS</span>
              <ExternalLink size={14} className="opacity-40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Social & Contact info */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-espresso/40 hover:text-gold transition-all border border-gold/5"
            >
              <Send size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Telegram</span>
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-espresso/40 hover:text-gold transition-all border border-gold/5"
            >
              <Instagram size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Instagram</span>
            </a>
            <a
              href={`tel:${siteConfig.contacts.phone}`}
              className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-espresso/40 hover:text-gold transition-all border border-gold/5"
            >
              <Phone size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Позвонить</span>
            </a>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="font-serif text-2xl font-bold text-gold/30 italic">Lamilash Kari</p>
          <p className="text-[10px] text-espresso/20 mt-4 tracking-[0.3em] uppercase font-bold">
            © 2026 Beauty Studio · Crafted with ♡
          </p>
        </div>
      </div>
    </footer>
  )
}
