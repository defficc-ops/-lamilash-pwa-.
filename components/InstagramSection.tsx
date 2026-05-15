'use client'

import { Instagram, ArrowRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function InstagramSection() {
  // We'll use static placeholders until the user provides an API or specific images
  const mockPosts = [
    '/images/work1.png',
    '/images/work2.png',
    '/images/work3.png',
    '/images/work4.png',
    '/images/work5.png',
    '/images/work6.png',
    '/images/work7.png',
    '/images/work8.png',
    '/images/work9.png',
  ];

  return (
    <motion.section
      className="px-5 mt-16 mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-espresso">Следите за нами</h2>
          <p className="text-cocoa text-sm">@lamilash_kari в Instagram</p>
        </div>
        <a 
          href={siteConfig.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white shadow-glow"
        >
          <Instagram size={20} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {mockPosts.map((src, i) => (
          <a 
            key={i}
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-square rounded-2xl overflow-hidden relative group"
          >
            <img 
              src={src} 
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8 opacity-80" />
            </div>
          </a>
        ))}
      </div>

      <a 
        href={siteConfig.socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 border border-cocoa/30 rounded-2xl flex items-center justify-center gap-2 text-espresso font-semibold hover:bg-cocoa/5 transition-colors"
      >
        <span>Перейти в профиль</span>
        <ExternalLink size={16} className="opacity-60" />
      </a>
    </motion.section>
  )
}
