import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'SOC Tools',
  description: 'Collection of Security Operations Center analysis tools',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-background font-sans antialiased dark', fontSans.variable)}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
