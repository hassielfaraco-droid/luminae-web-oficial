'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { formatPrice } from '@/lib/shopify'

interface ProductCardProps {
  product: {
    id:     string
    title:  string
    handle: string
    vendor: string
    tags:   string[]
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string }
    }
    compareAtPriceRange?: {
      minVariantPrice: { amount: string; currencyCode: string }
    }
    featuredImage?: { url: string; altText?: string | null } | null
    variants: {
      edges: Array<{
        node: {
          id:               string
          availableForSale: boolean
          price:            { amount: string; currencyCode: string }
        }
      }>
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [added,      setAdded]      = useState(false)
  const { addItem, isLoading } = useCart()

  const price       = product.priceRange.minVariantPrice
  const compareAt   = product.compareAtPriceRange?.minVariantPrice
  const firstVariant= product.variants.edges[0]?.node
  const isOnSale    = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
  const isSoldOut   = !firstVariant?.availableForSale

  const isNew    = product.tags.includes('new') || product.tags.includes('nuevo')
  const isBest   = product.tags.includes('bestseller')

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!firstVariant || isSoldOut || isLoading) return
    await addItem(firstVariant.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="bg-[var(--cream)] relative overflow-hidden transition-all duration-400 hover:-translate-y-1"
           style={{ boxShadow: '0 0 0 1px rgba(196,168,130,0.15)' }}>

        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-[var(--beige)]">
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-[var(--earth)] opacity-20" />
            </div>
          )}

          {/* Tags */}
          {isNew    && <span className="product-tag tag-new">Nuevo</span>}
          {isBest   && !isNew && <span className="product-tag tag-best">Bestseller</span>}
          {isOnSale && !isNew && !isBest && <span className="product-tag tag-sale">Oferta</span>}
          {isSoldOut && <span className="product-tag" style={{background:'rgba(44,36,22,0.6)',color:'var(--cream)'}}>Agotado</span>}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWishlisted(!wishlisted) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(247,242,235,0.9)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--deep)]"
            aria-label="Lista de deseos"
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-[var(--warm)] group-hover:text-[var(--gold)]'}
            />
          </button>

          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut || isLoading}
              className="btn-primary py-2.5 text-xs disabled:opacity-50"
              style={{ minWidth: '160px', justifyContent: 'center' }}
            >
              {isSoldOut ? 'Agotado' : added ? '✓ Agregado' : 'Agregar al carrito'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="label-xs text-[var(--earth)] mb-1.5">{product.vendor}</p>
          <h3 className="font-display text-[1.05rem] text-[var(--deep)] leading-snug mb-2 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--deep)]">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {isOnSale && compareAt && (
              <span className="text-xs text-[var(--earth)] line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
