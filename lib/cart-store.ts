'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  type CartLine,
  type Cart,
} from './shopify'

// ─── Tipo del store ──────────────────────────────────────────────────────────
interface CartStore {
  // Estado UI
  isOpen: boolean
  openCart:  () => void
  closeCart: () => void

  // Estado del carrito Shopify
  cartId:      string | null
  checkoutUrl: string | null
  lines:       CartLine[]
  cost:        Cart['cost'] | null
  isLoading:   boolean

  // Acciones
  addItem:    (merchandiseId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

// ─── Helper: mapea edges → array plano ──────────────────────────────────────
function flattenLines(cart: Cart): CartLine[] {
  return cart.lines.edges.map(e => e.node)
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // UI
      isOpen:   false,
      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Carrito
      cartId:      null,
      checkoutUrl: null,
      lines:       [],
      cost:        null,
      isLoading:   false,

      // ── Añadir producto ──────────────────────────────────────────────────
      async addItem(merchandiseId: string) {
        set({ isLoading: true })
        try {
          let { cartId } = get()

          // Crear carrito si no existe
          if (!cartId) {
            const newCart = await cartCreate()
            cartId = newCart.id
            set({
              cartId,
              checkoutUrl: newCart.checkoutUrl,
              lines:       flattenLines(newCart),
              cost:        newCart.cost,
            })
          }

          // Agregar línea
          const cart = await cartLinesAdd(cartId, [{ merchandiseId, quantity: 1 }])
          set({
            lines:       flattenLines(cart),
            cost:        cart.cost,
            checkoutUrl: cart.checkoutUrl,
            isOpen:      true,   // abrir el drawer al agregar
          })
        } catch (err) {
          console.error('[cart] addItem error:', err)
        } finally {
          set({ isLoading: false })
        }
      },

      // ── Actualizar cantidad ──────────────────────────────────────────────
      async updateItem(lineId: string, quantity: number) {
        const { cartId } = get()
        if (!cartId) return

        if (quantity <= 0) {
          return get().removeItem(lineId)
        }

        set({ isLoading: true })
        try {
          const cart = await cartLinesUpdate(cartId, [{ id: lineId, quantity }])
          set({ lines: flattenLines(cart), cost: cart.cost })
        } catch (err) {
          console.error('[cart] updateItem error:', err)
        } finally {
          set({ isLoading: false })
        }
      },

      // ── Eliminar línea ───────────────────────────────────────────────────
      async removeItem(lineId: string) {
        const { cartId } = get()
        if (!cartId) return

        set({ isLoading: true })
        try {
          const cart = await cartLinesRemove(cartId, [lineId])
          set({ lines: flattenLines(cart), cost: cart.cost })
        } catch (err) {
          console.error('[cart] removeItem error:', err)
        } finally {
          set({ isLoading: false })
        }
      },

      // ── Refrescar carrito (ej: al montar la app) ─────────────────────────
      async refreshCart() {
        const { cartId } = get()
        if (!cartId) return

        try {
          const cart = await cartGet(cartId)
          if (!cart) {
            // Carrito expiró — limpiar
            set({ cartId: null, checkoutUrl: null, lines: [], cost: null })
            return
          }
          set({
            lines:       flattenLines(cart),
            cost:        cart.cost,
            checkoutUrl: cart.checkoutUrl,
          })
        } catch (err) {
          console.error('[cart] refreshCart error:', err)
        }
      },
    }),
    {
      name: 'luminae-cart',          // clave en localStorage
      partialize: state => ({
        cartId:      state.cartId,   // solo persistir el ID, no el estado UI
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
)

// ─── Hook auxiliar: número total de items ────────────────────────────────────
export function useCartCount(): number {
  return useCart(state =>
    state.lines.reduce((sum, line) => sum + line.quantity, 0)
  )
}
