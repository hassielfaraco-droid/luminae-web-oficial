import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import CartDrawer from '@/components/cart/CartDrawer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Luminae — Donde la luz se encuentra con tu piel',
  description: 'Skincare, perfumería y wellness curado para Venezuela y Latinoamérica.',
  keywords: ['skincare', 'belleza', 'venezuela', 'perfumería', 'wellness', 'luminae'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
