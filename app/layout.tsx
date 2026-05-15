import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lamilash Kari — Ламинирование ресниц и бровей',
  description: 'Профессиональное ламинирование ресниц и бровей. Стойкий результат до 8 недель. Онлайн-запись, удобный кабинет клиента.',
  keywords: 'ламинирование ресниц, ламинирование бровей, lash lamination, brow lamination, запись онлайн',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lamilash Kari',
  },
  openGraph: {
    title: 'Lamilash Kari — Ламинирование ресниц и бровей',
    description: 'Профессиональное ламинирование. Онлайн запись.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#120A06',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Lamilash" />
        <meta name="application-name" content="Lamilash Kari" />
        <meta name="theme-color" content="#120A06" />
      </head>
      <body className="bg-cream font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
