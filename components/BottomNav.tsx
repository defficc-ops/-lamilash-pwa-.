'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Grid, Calendar, Star, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/home',      icon: Home,     label: 'Главная'  },
  { href: '/portfolio', icon: Grid,     label: 'Работы'   },
  { href: '/booking',   icon: Calendar, label: 'Запись'   },
  { href: '/reviews',   icon: Star,     label: 'Отзывы'   },
  { href: '/dashboard', icon: User,     label: 'Кабинет'  },
]

export default function BottomNav() {
  const pathname = usePathname()

  // Hide on splash screen
  if (pathname === '/') return null

  return (
    <nav className="bottom-nav">
      <div className="flex items-stretch justify-around px-2 pt-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              id={`nav-${label.toLowerCase()}`}
              className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[52px] relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl bg-warm-beige"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.6}
                  className={active ? 'text-cocoa' : 'text-sand'}
                />
              </span>
              <span
                className={`relative z-10 text-[10px] font-medium tracking-wide transition-colors ${
                  active ? 'text-cocoa' : 'text-sand'
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
