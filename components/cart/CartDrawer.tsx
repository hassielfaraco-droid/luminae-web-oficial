'use client'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { formatPrice } from '@/lib/shopify'

export default function CartDrawer() {
  const { isOpen, closeCart, lines, cost, updateItem, removeItem, checkoutUrl, isLoading } = useCart()

  if (!isOpen) return null

  const isEmpty = lines.length === 0

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <aside className="cart-drawer">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(196,168,130,0.2)]">
          <div>
            <h2 className="font-display text-xl text-[var(--deep)]">Tu carrito</h2>
            <p className="label-xs text-[var(--earth)] mt-0.5">
              {lines.length} {lines.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[var(--earth)] hover:text-[var(--deep)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
              <ShoppingBag size={48} className="text-[var(--earth)] opacity-30" />
              <div>
                <p className="font-display text-xl text-[var(--deep)] mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-[var(--warm)]">Descubre nuestra selección curada de skincare y perfumería</p>
              </div>
              <button onClick={closeCart} className="btn-primary text-xs">
                Explorar catálogo
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[rgba(196,168,130,0.15)]">
              {lines.map(line => (
                <li key={line.id} className="flex gap-4 px-6 py-5">
                  {/* Imagen */}
                  <div className="w-20 h-20 flex-shrink-0 bg-[var(--beige)] relative overflow-hidden">
                    {line.merchandise.product.featuredImage?.url ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[var(--earth)] opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="font-display text-sm text-[var(--deep)] hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug"
                    >
                      {line.merchandise.product.title}
                    </Link>

                    {/* Variante */}
                    {line.merchandise.selectedOptions?.some(o => o.value !== 'Default Title') && (
                      <p className="label-xs text-[var(--earth)] mt-1">
                        {line.merchandise.selectedOptions.map(o => o.value).join(' / ')}
                      </p>
                    )}

                    {/* Precio + controles */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-[var(--deep)]">
                        {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Qty */}
                        <div className="flex items-center border border-[rgba(196,168,130,0.3)]">
                          <button
                            onClick={() => updateItem(line.id, line.quantity - 1)}
                            disabled={line.quantity <= 1 || isLoading}
                            className="p-1.5 text-[var(--warm)] hover:text-[var(--deep)] disabled:opacity-30 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-sm text-[var(--deep)] min-w-[2rem] text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="p-1.5 text-[var(--warm)] hover:text-[var(--deep)] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Eliminar */}
                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={isLoading}
                          className="p-1.5 text-[var(--earth)] hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — totales + checkout */}
        {!isEmpty && cost && (
          <div className="border-t border-[rgba(196,168,130,0.2)] px-6 py-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--warm)]">Subtotal</span>
                <span className="text-[var(--deep)]">
                  {formatPrice(cost.subtotalAmount.amount, cost.subtotalAmount.currencyCode)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--warm)]">Envío</span>
                <span className="text-[var(--moss)] text-xs">Calculado al finalizar</span>
              </div>
            </div>

            <div className="divider-gold" />

            <div className="flex justify-between">
              <span className="font-display text-lg text-[var(--deep)]">Total</span>
              <span className="font-medium text-[var(--deep)] text-lg">
                {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
              </span>
            </div>

            {/* Checkout — redirige a Shopify checkout nativo */}
            <a
              href={checkoutUrl ?? '#'}
              className="btn-primary w-full justify-center text-center block"
              style={{ textAlign: 'center' }}
            >
              Finalizar compra →
            </a>

            <button
              onClick={closeCart}
              className="btn-secondary w-full justify-center text-xs"
            >
              Seguir comprando
            </button>

            {/* Métodos de pago */}
            <div className="flex gap-2 justify-center flex-wrap pt-1">
              {['Zelle', 'Binance', 'Zinli', 'PayPal'].map(m => (
                <span key={m} className="label-xs text-[var(--earth)] opacity-50 border border-[rgba(196,168,130,0.2)] px-2 py-0.5">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
