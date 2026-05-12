'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ── mock data ── */
const PRODUCTS: Record<string, any> = {
  'cerave-hydrating-cleanser': {
    id: '1', name: 'CeraVe Hydrating Facial Cleanser', brand: 'CeraVe',
    price: 18.99, comparePrice: 24.99, badge: 'Best Seller',
    rating: 4.8, reviews: 234,
    description: 'Limpiador facial hidratante con 3 ceramidas esenciales y ácido hialurónico. Limpia profundamente sin alterar la barrera protectora de la piel. Ideal para piel normal a seca.',
    ingredients: 'Aqua, Glycerin, Cetearyl Alcohol, Phenoxyethanol, Stearyl Alcohol, Cetyl Alcohol, PEG-40 Stearate, Behentrimonium Methosulfate, Glyceryl Stearate, Polysorbate 20, Ethoxydiglycol, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Xanthan Gum, Sodium Chloride, Sodium Lauroyl Lactylate, Cholesterol, Disodium EDTA, Phytosphingosine, Hyaluronic Acid.',
    howToUse: 'Humedece tu rostro. Aplica una cantidad generosa masajeando suavemente con movimientos circulares. Enjuaga con agua tibia. Usa mañana y noche como primer paso de tu rutina.',
    sizes: [
      { label: '236 ml', price: 18.99 },
      { label: '473 ml', price: 29.99 },
    ],
    category: 'Limpieza', skinType: 'Normal a Seca',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop',
    ],
    reviewsList: [
      { name: 'María V.', date: 'Hace 2 semanas', rating: 5, text: 'Mi piel nunca se había sentido tan limpia e hidratada al mismo tiempo. Lo amo.', verified: true },
      { name: 'Valentina R.', date: 'Hace 1 mes', rating: 5, text: 'Perfecto para mi piel sensible. No irrita nada y deja la piel suavecita.', verified: true },
      { name: 'Carolina M.', date: 'Hace 2 meses', rating: 4, text: 'Muy bueno, lo único es que tarda en llegar pero el producto vale la pena.', verified: false },
    ],
  },
  'the-ordinary-niacinamide': {
    id: '2', name: 'The Ordinary Niacinamide 10% + Zinc 1%', brand: 'The Ordinary',
    price: 12.50, comparePrice: null, badge: 'Popular',
    rating: 4.6, reviews: 189,
    description: 'Sérum ligero con alta concentración de niacinamida y zinc. Reduce la apariencia de poros, controla el brillo y mejora la textura de la piel.',
    ingredients: 'Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol.',
    howToUse: 'Aplica unas gotas sobre el rostro limpio antes de cremas más densas. Usa mañana y/o noche. Evita combinar con vitamina C pura.',
    sizes: [
      { label: '30 ml', price: 12.50 },
      { label: '60 ml', price: 19.90 },
    ],
    category: 'Serums', skinType: 'Grasa / Mixta',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    reviewsList: [
      { name: 'Sofía L.', date: 'Hace 1 semana', rating: 5, text: 'Mis poros se ven mucho más chiquitos. Se nota desde la primera semana.', verified: true },
      { name: 'Andrea P.', date: 'Hace 3 semanas', rating: 4, text: 'Buen producto, pero el gotero a veces gotea de más.', verified: true },
    ],
  },
}

const RELATED = [
  { handle: 'cerave-hydrating-cleanser', name: 'CeraVe Hydrating Cleanser', brand: 'CeraVe', price: 18.99, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
  { handle: 'the-ordinary-niacinamide', name: 'Niacinamide 10% + Zinc', brand: 'The Ordinary', price: 12.50, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { handle: 'la-roche-posay-spf', name: 'Anthelios SPF 50', brand: 'La Roche-Posay', price: 24.00, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop' },
  { handle: 'laneige-lip-mask', name: 'Lip Sleeping Mask', brand: 'Laneige', price: 22.00, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400&h=400&fit=crop' },
]

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= Math.round(rating) ? 'var(--gold)' : 'var(--beige)'}>
          <path d="M10 1l2.39 4.84L17.82 6.7l-3.91 3.81.92 5.39L10 13.42l-4.83 2.48.92-5.39L2.18 6.7l5.43-.86z"/>
        </svg>
      ))}
    </span>
  )
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = PRODUCTS[params.handle] || PRODUCTS['cerave-hydrating-cleanser']
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [qty, setQty] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const [wishlist, setWishlist] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [tab, setTab] = useState<'reviews' | 'qa'>('reviews')

  const handleAdd = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const currentPrice = product.sizes[selectedSize].price

  return (
    <>
      <style>{`
        :root {
          --cream: #F7F2EB; --beige: #E8DDD0; --sand: #D4B896; --earth: #C4A882;
          --gold: #B8975A; --gold-lt: #D4AD6A; --moss: #7A8C6E; --deep: #2C2416;
          --deep2: #1A150D; --warm: #6A5A42; --light: #F0E8DA;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--cream); color: var(--deep); font-family: 'Jost', sans-serif; }

        /* ── Breadcrumb ── */
        .pdp-breadcrumb { padding: 16px 0; font-size: 13px; color: var(--warm); }
        .pdp-breadcrumb a { color: var(--warm); text-decoration: none; }
        .pdp-breadcrumb a:hover { color: var(--gold); }
        .pdp-breadcrumb span { margin: 0 8px; opacity: .5; }

        /* ── Main layout ── */
        .pdp-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .pdp-main { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding-bottom: 80px; }

        /* ── Gallery ── */
        .pdp-gallery { position: sticky; top: 100px; align-self: start; }
        .pdp-gallery-main { width: 100%; aspect-ratio: 1; border-radius: 16px; overflow: hidden; background: var(--light); margin-bottom: 12px; }
        .pdp-gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
        .pdp-gallery-main:hover img { transform: scale(1.05); }
        .pdp-gallery-thumbs { display: flex; gap: 10px; }
        .pdp-thumb { width: 72px; height: 72px; border-radius: 10px; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: border-color .2s; }
        .pdp-thumb.active { border-color: var(--gold); }
        .pdp-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* ── Info ── */
        .pdp-info { padding-top: 8px; }
        .pdp-badge { display: inline-block; background: var(--gold); color: var(--cream); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .pdp-brand { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--warm); margin-bottom: 8px; }
        .pdp-name { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; line-height: 1.2; margin-bottom: 12px; }
        .pdp-rating-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-size: 14px; color: var(--warm); }
        .pdp-rating-row a { color: var(--gold); text-decoration: underline; cursor: pointer; }
        .pdp-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px; }
        .pdp-price { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; color: var(--deep); }
        .pdp-compare { font-size: 16px; text-decoration: line-through; color: var(--warm); opacity: .6; }
        .pdp-save { font-size: 13px; color: var(--moss); font-weight: 500; }

        /* ── Size selector ── */
        .pdp-sizes { margin-bottom: 24px; }
        .pdp-sizes-label { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--warm); margin-bottom: 10px; }
        .pdp-sizes-row { display: flex; gap: 10px; }
        .pdp-size-btn { padding: 10px 20px; border-radius: 8px; border: 1.5px solid var(--beige); background: transparent; font-family: 'Jost', sans-serif; font-size: 14px; cursor: pointer; transition: all .2s; color: var(--deep); }
        .pdp-size-btn:hover { border-color: var(--gold); }
        .pdp-size-btn.active { background: var(--deep); color: var(--cream); border-color: var(--deep); }

        /* ── Qty + Add ── */
        .pdp-actions { display: flex; gap: 12px; margin-bottom: 16px; }
        .pdp-qty { display: flex; align-items: center; border: 1.5px solid var(--beige); border-radius: 8px; overflow: hidden; }
        .pdp-qty button { width: 40px; height: 44px; background: transparent; border: none; font-size: 18px; cursor: pointer; color: var(--deep); transition: background .2s; }
        .pdp-qty button:hover { background: var(--light); }
        .pdp-qty span { width: 40px; text-align: center; font-size: 15px; font-weight: 500; }
        .pdp-add-btn { flex: 1; height: 44px; background: var(--deep); color: var(--cream); border: none; border-radius: 8px; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: all .3s; }
        .pdp-add-btn:hover { background: var(--gold); }
        .pdp-add-btn.added { background: var(--moss); }
        .pdp-wish-btn { width: 44px; height: 44px; border-radius: 8px; border: 1.5px solid var(--beige); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .pdp-wish-btn:hover { border-color: var(--gold); }
        .pdp-wish-btn.active { background: var(--gold); border-color: var(--gold); }
        .pdp-wish-btn.active svg { stroke: var(--cream); fill: var(--cream); }

        /* ── Perks ── */
        .pdp-perks { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; padding: 16px; background: var(--light); border-radius: 12px; }
        .pdp-perk { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--warm); }
        .pdp-perk svg { flex-shrink: 0; }

        /* ── Accordions ── */
        .pdp-accordion { border-top: 1px solid var(--beige); }
        .pdp-accordion:last-child { border-bottom: 1px solid var(--beige); }
        .pdp-acc-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 16px 0; background: transparent; border: none; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: var(--deep); cursor: pointer; }
        .pdp-acc-header svg { transition: transform .3s; }
        .pdp-acc-header.open svg { transform: rotate(180deg); }
        .pdp-acc-body { overflow: hidden; max-height: 0; transition: max-height .4s ease; }
        .pdp-acc-body.open { max-height: 500px; }
        .pdp-acc-content { padding: 0 0 16px; font-size: 14px; line-height: 1.7; color: var(--warm); }

        /* ── Reviews section ── */
        .pdp-reviews { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }
        .pdp-reviews-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; text-align: center; margin-bottom: 32px; }
        .pdp-tabs { display: flex; justify-content: center; gap: 32px; margin-bottom: 32px; border-bottom: 1px solid var(--beige); padding-bottom: 0; }
        .pdp-tab { padding: 0 0 12px; background: none; border: none; font-family: 'Jost', sans-serif; font-size: 14px; letter-spacing: .06em; text-transform: uppercase; color: var(--warm); cursor: pointer; border-bottom: 2px solid transparent; transition: all .2s; }
        .pdp-tab.active { color: var(--deep); border-bottom-color: var(--gold); }
        .pdp-review-card { padding: 24px; background: var(--light); border-radius: 12px; margin-bottom: 12px; }
        .pdp-review-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .pdp-review-name { font-weight: 500; font-size: 15px; }
        .pdp-review-date { font-size: 12px; color: var(--warm); }
        .pdp-review-text { font-size: 14px; line-height: 1.6; color: var(--warm); margin-top: 8px; }
        .pdp-verified { display: inline-block; font-size: 11px; color: var(--moss); font-weight: 500; margin-left: 8px; }

        /* ── Related ── */
        .pdp-related { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }
        .pdp-related-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; text-align: center; margin-bottom: 32px; }
        .pdp-related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .pdp-rel-card { background: white; border-radius: 12px; overflow: hidden; transition: transform .3s; }
        .pdp-rel-card:hover { transform: translateY(-4px); }
        .pdp-rel-img { aspect-ratio: 1; overflow: hidden; }
        .pdp-rel-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
        .pdp-rel-card:hover .pdp-rel-img img { transform: scale(1.05); }
        .pdp-rel-info { padding: 14px 16px; }
        .pdp-rel-brand { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--warm); margin-bottom: 4px; }
        .pdp-rel-name { font-size: 14px; font-weight: 400; margin-bottom: 6px; }
        .pdp-rel-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; }

        /* ── Toast ── */
        .pdp-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(100px); background: var(--deep); color: var(--cream); padding: 14px 28px; border-radius: 10px; font-size: 14px; z-index: 999; opacity: 0; transition: all .4s; display: flex; align-items: center; gap: 8px; }
        .pdp-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .pdp-main { grid-template-columns: 1fr; gap: 24px; }
          .pdp-gallery { position: static; }
          .pdp-related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pdp-container { padding: 0 16px; }
          .pdp-name { font-size: 24px; }
          .pdp-price { font-size: 24px; }
          .pdp-gallery-main { border-radius: 12px; }
          .pdp-thumb { width: 56px; height: 56px; }
          .pdp-perks { grid-template-columns: 1fr; }
          .pdp-actions { flex-wrap: wrap; }
          .pdp-add-btn { min-width: 0; }
          .pdp-related-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .pdp-reviews { padding: 0 16px 60px; }
          .pdp-related { padding: 0 16px 60px; }
        }
      `}</style>

      <div className="pdp-container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo">Catálogo</Link>
          <span>/</span>
          {product.name}
        </nav>

        {/* Main grid */}
        <div className="pdp-main">
          {/* Gallery */}
          <div className="pdp-gallery">
            <div className="pdp-gallery-main">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="pdp-gallery-thumbs">
              {product.images.map((img: string, i: number) => (
                <div key={i} className={`pdp-thumb ${i === selectedImage ? 'active' : ''}`} onClick={() => setSelectedImage(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pdp-info">
            {product.badge && <span className="pdp-badge">{product.badge}</span>}
            <div className="pdp-brand">{product.brand}</div>
            <h1 className="pdp-name">{product.name}</h1>
            <div className="pdp-rating-row">
              <Stars rating={product.rating} />
              <span>{product.rating}</span>
              <a>({product.reviews} reseñas)</a>
            </div>

            <div className="pdp-price-row">
              <span className="pdp-price">${currentPrice.toFixed(2)}</span>
              {product.comparePrice && <span className="pdp-compare">${product.comparePrice.toFixed(2)}</span>}
              {product.comparePrice && <span className="pdp-save">Ahorras ${(product.comparePrice - currentPrice).toFixed(2)}</span>}
            </div>

            {/* Size */}
            <div className="pdp-sizes">
              <div className="pdp-sizes-label">Tamaño</div>
              <div className="pdp-sizes-row">
                {product.sizes.map((s: any, i: number) => (
                  <button key={i} className={`pdp-size-btn ${i === selectedSize ? 'active' : ''}`} onClick={() => setSelectedSize(i)}>
                    {s.label} — ${s.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Cart + Wishlist */}
            <div className="pdp-actions">
              <div className="pdp-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className={`pdp-add-btn ${addedToCart ? 'added' : ''}`} onClick={handleAdd}>
                {addedToCart ? '✓ Agregado' : 'Agregar al carrito'}
              </button>
              <button className={`pdp-wish-btn ${wishlist ? 'active' : ''}`} onClick={() => setWishlist(!wishlist)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>

            {/* Perks */}
            <div className="pdp-perks">
              <div className="pdp-perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Envío gratis +$60
              </div>
              <div className="pdp-perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                100% Original
              </div>
              <div className="pdp-perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
                Entrega 3-7 días
              </div>
              <div className="pdp-perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/></svg>
                Venezuela y LATAM
              </div>
            </div>

            {/* Accordions */}
            {[
              { key: 'description', label: 'Descripción', content: product.description },
              { key: 'howto', label: 'Modo de uso', content: product.howToUse },
              { key: 'ingredients', label: 'Ingredientes', content: product.ingredients },
            ].map(acc => (
              <div className="pdp-accordion" key={acc.key}>
                <button className={`pdp-acc-header ${openAccordion === acc.key ? 'open' : ''}`} onClick={() => setOpenAccordion(openAccordion === acc.key ? null : acc.key)}>
                  {acc.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div className={`pdp-acc-body ${openAccordion === acc.key ? 'open' : ''}`}>
                  <div className="pdp-acc-content">{acc.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="pdp-reviews">
        <h2 className="pdp-reviews-title">Lo que dicen nuestras clientas</h2>
        <div className="pdp-tabs">
          <button className={`pdp-tab ${tab === 'reviews' ? 'active' : ''}`} onClick={() => setTab('reviews')}>Reseñas ({product.reviewsList.length})</button>
          <button className={`pdp-tab ${tab === 'qa' ? 'active' : ''}`} onClick={() => setTab('qa')}>Preguntas</button>
        </div>
        {tab === 'reviews' && product.reviewsList.map((r: any, i: number) => (
          <div className="pdp-review-card" key={i}>
            <div className="pdp-review-top">
              <div>
                <span className="pdp-review-name">{r.name}</span>
                {r.verified && <span className="pdp-verified">✓ Compra verificada</span>}
              </div>
              <span className="pdp-review-date">{r.date}</span>
            </div>
            <Stars rating={r.rating} size={12} />
            <p className="pdp-review-text">{r.text}</p>
          </div>
        ))}
        {tab === 'qa' && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--warm)', fontSize: 14 }}>
            Aún no hay preguntas. ¿Tienes alguna duda?
          </div>
        )}
      </section>

      {/* Related */}
      <section className="pdp-related">
        <h2 className="pdp-related-title">También te puede gustar</h2>
        <div className="pdp-related-grid">
          {RELATED.map((p, i) => (
            <Link href={`/products/${p.handle}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="pdp-rel-card">
                <div className="pdp-rel-img"><img src={p.image} alt={p.name} /></div>
                <div className="pdp-rel-info">
                  <div className="pdp-rel-brand">{p.brand}</div>
                  <div className="pdp-rel-name">{p.name}</div>
                  <div className="pdp-rel-price">${p.price.toFixed(2)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Toast */}
      <div className={`pdp-toast ${addedToCart ? 'show' : ''}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
        Producto agregado al carrito
      </div>
    </>
  )
}
