'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, CheckCircle2, ScrollText } from 'lucide-react'

export default function Certificates() {
  return (
    <section className="px-5 mt-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <p className="text-cocoa text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Verified Professional</p>
        <h2 className="font-serif text-3xl font-bold text-espresso leading-tight">Сертификаты Качества</h2>
        <div className="h-1 w-12 bg-gold/40 mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="space-y-6">
        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[2.5rem] overflow-hidden border border-white/50 shadow-strong"
        >
          <div className="aspect-[4/5] relative group bg-espresso/5">
            <img
              src="/images/certificates.jpg.png"
              alt="Halal Certification"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                (e.target as any).style.display = 'none';
                (e.target as any).nextSibling.style.display = 'flex';
              }}
            />
            {/* Elegant Fallback for missing image */}
            <div className="hidden absolute inset-0 flex-col items-center justify-center p-10 bg-gradient-to-br from-warm-beige to-cream">
              <div className="w-full h-full border-[12px] border-double border-sand/20 rounded-xl flex flex-col items-center justify-center relative">
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40" />
                
                <ScrollText size={64} className="text-gold/30 mb-6" strokeWidth={1} />
                <h3 className="font-serif text-xl font-bold text-espresso/60 mb-2">Halal Certificate</h3>
                <p className="text-cocoa/50 text-[10px] uppercase tracking-widest font-bold">Official Verification</p>
                
                <div className="mt-8 flex items-center gap-3">
                   <div className="w-8 h-px bg-sand/30" />
                   <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/40 text-[10px] font-serif italic">Seal</div>
                   <div className="w-8 h-px bg-sand/30" />
                </div>
              </div>
            </div>

            {/* Premium Badge Overlay */}
            <div className="absolute top-6 right-6">
               <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-soft flex items-center justify-center border border-gold/20">
                  <Award size={24} className="text-gold" />
               </div>
            </div>
          </div>

          <div className="p-8 bg-white/30 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                 <ShieldCheck className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-espresso mb-1">Стандарт Халяль</h4>
                <p className="text-espresso/60 text-sm leading-relaxed">
                  Мы заботимся о вашем здоровье. Все составы сертифицированы по международным стандартам безопасности.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-sand/20 flex items-center justify-between">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-warm-beige flex items-center justify-center">
                       <CheckCircle2 size={12} className="text-cocoa" />
                    </div>
                  ))}
               </div>
               <span className="text-[10px] font-bold text-cocoa tracking-widest uppercase">Verified Expert</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
