'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react'
import { useCart, useCartCount } from '@/lib/cart-store'

const NAV_LEFT  = [
  { label: 'Skin',       href: '/collections/skincare'    },
  { label: 'Perfumería', href: '/collections/perfumeria'  },
  { label: 'Wellness',   href: '/collections/wellness'    },
  { label: 'Marcas',     href: '/collections'             },
]
const NAV_RIGHT = [
  { label: 'Ofertas',    href: '/collections/ofertas'     },
  { label: 'Sets',       href: '/collections/sets'        },
  { label: 'IA Skin',    href: '/ai'                      },
  { label: 'Blog',       href: '/blog'                    },
]

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { openCart }  = useCart()
  const cartCount     = useCartCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announce bar */}
      <div className="bg-[var(--deep)] text-[var(--earth)] text-center py-2.5 px-4 label-xs">
        🌿 Envíos a toda Venezuela &nbsp;·&nbsp;{' '}
        <span className="text-[var(--gold)]">Paga con Zelle, Binance o transferencia USD</span>
        &nbsp;·&nbsp; Envío gratis en pedidos +$60
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-30 transition-all duration-300"
        style={{
          background:   scrolled ? 'rgba(247,242,235,0.97)' : 'var(--cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid rgba(196,168,130,0.2)',
          boxShadow:    scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="section-max section-padding">
          <div className="grid grid-cols-3 items-center h-16 md:h-[72px]">

            {/* Nav izquierda — desktop */}
            <nav className="hidden md:flex gap-7 items-center">
              {NAV_LEFT.map(({ label, href }) => (
                <Link
                  key={label} href={href}
                  className="label-xs text-[var(--warm)] hover:text-[var(--deep)] transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </nav>

            {/* Logo — centro */}
            <Link href="/" className="text-center justify-self-center">
              <span className="block font-display text-[1.9rem] md:text-[2.2rem] tracking-[0.3em] text-[var(--deep)] leading-none">
                LUMINAE
              </span>
              <span className="label-xs text-[var(--gold)] mt-1 block tracking-[0.35em]">
                Venezuela · Latinoamérica
              </span>
            </Link>

            {/* Acciones — derecha */}
            <div className="flex items-center gap-3 md:gap-5 justify-end">
              {/* Nav derecha — desktop */}
              <nav className="hidden md:flex gap-7 items-center mr-4">
                {NAV_RIGHT.map(({ label, href }) => (
                  <Link
                    key={label} href={href}
                    className="label-xs text-[var(--warm)] hover:text-[var(--deep)] transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}
              </nav>

              {/* Buscar */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[var(--warm)] hover:text-[var(--deep)] transition-colors"
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>

              {/* Wishlist — desktop */}
              <Link
                href="/account/wishlist"
                className="hidden md:block p-2 text-[var(--warm)] hover:text-[var(--deep)] transition-colors"
                aria-label="Lista de deseos"
              >
                <Heart size={18} />
              </Link>

              {/* Carrito */}
              <button
                onClick={openCart}
                className="relative p-2 text-[var(--warm)] hover:text-[var(--deep)] transition-colors"
                aria-label="Carrito"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[0.6rem] font-semibold flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Menú hamburguesa — mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-[var(--warm)]"
                aria-label="Menú"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[rgba(196,168,130,0.2)] bg-[var(--cream)] animate-fade-in">
            <nav className="section-padding py-6 flex flex-col gap-5">
              {[...NAV_LEFT, ...NAV_RIGHT].map(({ label, href }) => (
                <Link
                  key={label} href={href}
                  onClick={() => setMenuOpen(false)}
                  className="label-sm text-[var(--warm)] hover:text-[var(--deep)] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link href="/account" onClick={() => setMenuOpen(false)} className="label-sm text-[var(--warm)]">
                Mi cuenta
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <>
          <div className="cart-overlay" onClick={() => setSearchOpen(false)} />
          <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)] p-6 shadow-lg animate-fade-up">
            <div className="section-max flex items-center gap-4">
              <Search size={20} className="text-[var(--earth)]" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/collections?q=${encodeURIComponent(searchQuery)}`
                  }
                  if (e.key === 'Escape') setSearchOpen(false)
                }}
                placeholder="Buscar productos, marcas, ingredientes..."
                className="flex-1 bg-transparent outline-none font-display text-xl text-[var(--deep)] placeholder:text-[var(--earth)] placeholder:opacity-50"
              />
              <button onClick={() => setSearchOpen(false)} className="text-[var(--earth)] hover:text-[var(--deep)]">
                <X size={20} />
              </button>
            </div>
            {searchQuery && (
              <div className="section-max mt-4">
                <p className="label-xs text-[var(--earth)]">
                  Presiona Enter para buscar &ldquo;{searchQuery}&rdquo;
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
