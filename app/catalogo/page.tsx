'use client'
import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/* ─── Data ─────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id:1, brand:'CeraVe',          name:'Crema Hidratante SPF 30',       cat:'hidratacion spf', price:29.99, oldPrice:38.00, rating:5, reviews:247, badge:'best', skin:['seca','sensible'],   desc:'Con ceramidas, ácido hialurónico y SPF 30. Hidratación 24h sin residuo blanco.', color:'#d4ad6a' },
  { id:2, brand:'The Ordinary',    name:'Niacinamida 10% + Zinc 1%',     cat:'serums',          price:12.99, oldPrice:null,  rating:5, reviews:512, badge:'new',  skin:['grasa','mixta'],     desc:'Reduce poros visibles y controla el sebo. Fórmula ligera para uso diario.', color:'#e8e0d0' },
  { id:3, brand:'La Roche-Posay',  name:'Anthelios SPF 50+ Fluido',      cat:'spf',             price:34.99, oldPrice:null,  rating:4, reviews:189, badge:null,   skin:['todo tipo'],         desc:'Protección solar invisible, sin residuo blanco. Resistente al calor venezolano.', color:'#2c2416' },
  { id:4, brand:'Drunk Elephant',  name:'Protini Polypeptide Cream',     cat:'hidratacion',     price:68.99, oldPrice:86.00, rating:5, reviews:94,  badge:'sale', skin:['todo tipo'],         desc:'Señalización de proteínas para firmeza y elasticidad visible desde semana 2.', color:'#7a8c6e' },
  { id:5, brand:'The Ordinary',    name:'Vitamina C 23% + HA 2%',        cat:'serums',          price:11.99, oldPrice:null,  rating:4, reviews:301, badge:'ai',   skin:['apagada','manchas'], desc:'Iluminador potente con vitamina C pura. Aclara manchas en 4 semanas.', color:'#c4b090' },
  { id:6, brand:'Thayers',         name:'Tónico de Rosa Witch Hazel',    cat:'limpieza',        price:16.99, oldPrice:null,  rating:4, reviews:156, badge:'new',  skin:['mixta','grasa'],     desc:'Sin alcohol. Equilibra el pH y afina la textura.', color:'#d4b896' },
  { id:7, brand:"Kiehl's",         name:'Ultra Facial Cream 24H',        cat:'hidratacion',     price:42.99, oldPrice:null,  rating:5, reviews:78,  badge:null,   skin:['seca','normal'],     desc:'Hidratante clásico con extracto glacial. 24h en climas extremos.', color:'#1a150d' },
  { id:8, brand:'Rhode',           name:'Barrier Restore Cream',         cat:'hidratacion',     price:31.99, oldPrice:null,  rating:5, reviews:203, badge:'best', skin:['sensible','seca'],   desc:'Restaura la barrera cutánea con ceramidas y péptidos.', color:'#d4ad6a55' },
  { id:9, brand:'CeraVe',          name:'Limpiador en Espuma Suave',     cat:'limpieza',        price:18.99, oldPrice:null,  rating:5, reviews:334, badge:null,   skin:['normal','grasa'],    desc:'Limpieza profunda sin resecar. Elimina impurezas manteniendo la hidratación.', color:'#9e8a6a' },
  { id:10,brand:'The Ordinary',    name:'Ácido Hialurónico 2% + B5',    cat:'serums',          price:9.99,  oldPrice:null,  rating:5, reviews:621, badge:'best', skin:['todo tipo'],         desc:'Hidratación inmediata y profunda. Suaviza líneas de deshidratación.', color:'#c4d4b0' },
  { id:11,brand:"Kiehl's",         name:'Creamy Eye Treatment Avocado', cat:'ojos',            price:54.99, oldPrice:null,  rating:4, reviews:67,  badge:'ai',   skin:['seca'],              desc:'Contorno de ojos ultra nutritivo. Reduce ojeras y líneas finas.', color:'#d4a880' },
  { id:12,brand:'CeraVe',          name:'Kit Rutina Completa AM/PM',     cat:'sets',            price:89.99, oldPrice:105.0, rating:5, reviews:42,  badge:'sale', skin:['todo tipo'],         desc:'Set completo: limpiador + hidratante AM con SPF + hidratante PM.', color:'#e8e0d0' },
]

const CATS = ['Todo','Limpieza','Hidratación','Serums','SPF','Ojos','Sets']
const CAT_MAP: Record<string,string> = { 'Todo':'','Limpieza':'limpieza','Hidratación':'hidratacion','Serums':'serums','SPF':'spf','Ojos':'ojos','Sets':'sets' }
const BRANDS = ['CeraVe','The Ordinary','La Roche-Posay','Drunk Elephant',"Kiehl's",'Rhode','Thayers']

const badgeCfg: Record<string,{label:string;bg:string;color:string}> = {
  best: { label:'★ Bestseller', bg:'var(--deep)',  color:'var(--gold)' },
  new:  { label:'Nuevo',        bg:'var(--moss)',  color:'white'       },
  sale: { label:'Oferta',       bg:'#8B2020',      color:'white'       },
  ai:   { label:'✦ IA',         bg:'transparent',  color:'var(--gold)' },
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [activeBrands, setActiveBrands] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(120)
  const [sortBy, setSortBy] = useState('relevance')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState(0)
  const [toast, setToast] = useState('')
  const [openGroups, setOpenGroups] = useState<string[]>(['precio','tipo','marca'])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  const toggleBrand = (b: string) => setActiveBrands(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev,b])
  const toggleGroup = (id: string) => setOpenGroups(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])
  const toggleWish  = (id: number) => { setWishlist(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]); showToast(wishlist.includes(id)?'Eliminado de deseos':'Guardado en deseos ♥') }
  const addToCart   = (name: string) => { setCart(c => c+1); showToast(name + ' agregado') }
  const clearAll    = () => { setActiveBrands([]); setActiveCategory('Todo'); setPriceMax(120) }

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    const catKey = CAT_MAP[activeCategory]
    if (catKey) list = list.filter(p => p.cat.includes(catKey))
    if (activeBrands.length) list = list.filter(p => activeBrands.includes(p.brand))
    list = list.filter(p => p.price <= priceMax)
    if (sortBy === 'price-asc') list.sort((a,b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price)
    if (sortBy === 'rating') list.sort((a,b) => b.rating - a.rating)
    return list
  }, [activeCategory, activeBrands, priceMax, sortBy])

  const activeFilterTags = activeBrands.map(b => ({ type:'marca', value:b }))

  return (
    <>
      <style>{`
        .cat-hero{background:linear-gradient(120deg,#ede5d8,#f7f2eb,#e0d5c5);padding:48px 40px;border-bottom:1px solid rgba(196,168,130,.15);position:relative;overflow:hidden}
        .cat-hero::after{content:'SKINCARE';position:absolute;font-family:var(--font-display);font-size:16vw;font-weight:300;color:rgba(184,151,90,.04);top:50%;right:-2%;transform:translateY(-50%);letter-spacing:.15em;pointer-events:none}
        .cat-eyebrow{font-size:.6rem;letter-spacing:.4em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:flex;align-items:center;gap:12px}
        .cat-eyebrow::before{content:'';width:28px;height:1px;background:var(--earth);opacity:.5}
        .cat-tab{padding:9px 20px;border:1px solid rgba(196,168,130,.3);background:transparent;cursor:pointer;font-family:var(--font-body);font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;color:var(--warm);transition:all .2s;margin-right:-1px;position:relative}
        .cat-tab:hover{color:var(--deep);border-color:rgba(44,36,22,.3);z-index:1}
        .cat-tab.active{background:var(--deep);color:var(--cream);border-color:var(--deep);z-index:1}
        .catalog-layout{max-width:1440px;margin:0 auto;padding:36px 40px;display:grid;grid-template-columns:260px 1fr;gap:40px;align-items:start}
        .sidebar{position:sticky;top:88px}
        .filter-group{border-top:1px solid rgba(196,168,130,.18);padding:18px 0}
        .filter-group:last-child{border-bottom:1px solid rgba(196,168,130,.18)}
        .fg-head{display:flex;align-items:center;justify-content:space-between;cursor:pointer}
        .fg-title{font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--warm);font-weight:500}
        .fg-body{overflow:hidden;max-height:0;transition:max-height .35s ease}
        .fg-body.open{max-height:400px}
        .fg-content{padding-top:14px;display:flex;flex-direction:column;gap:8px}
        .f-check{display:flex;align-items:center;gap:10px;cursor:pointer;padding:3px 0}
        .f-box{width:16px;height:16px;border:1px solid rgba(196,168,130,.4);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .f-box.checked{background:var(--deep);border-color:var(--deep)}
        .f-label{font-size:.78rem;color:var(--warm);flex:1}
        .f-count{font-size:.62rem;color:rgba(196,168,130,.5)}
        .af-tag{display:flex;align-items:center;gap:6px;background:var(--deep);color:var(--cream);font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;padding:5px 10px;cursor:pointer;transition:all .2s}
        .af-tag:hover{background:var(--gold);color:var(--deep)}
        .product-grid-cat{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(196,168,130,.15)}
        .p-card{background:var(--cream);position:relative;overflow:hidden;cursor:pointer;transition:transform .35s,box-shadow .35s}
        .p-card:hover{transform:translateY(-4px);z-index:2;box-shadow:var(--shadow-md)}
        .p-img{aspect-ratio:1;background:var(--beige);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        .p-img-swatch{width:70px;height:100px;border-radius:50% 50% 30% 30% / 40% 40% 20% 20%;transition:transform .6s ease;box-shadow:0 12px 28px rgba(0,0,0,.15)}
        .p-card:hover .p-img-swatch{transform:scale(1.08) rotate(-2deg)}
        .p-add-overlay{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:14px}
        .p-add-btn{background:var(--deep);color:var(--cream);border:none;padding:10px 26px;font-family:var(--font-body);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transform:translateY(50px);opacity:0;transition:all .3s}
        .p-card:hover .p-add-btn{transform:translateY(0);opacity:1}
        .p-add-btn:hover{background:var(--gold);color:var(--deep)}
        .p-badge-wrap{position:absolute;top:12px;left:12px;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;padding:4px 9px;font-weight:600;z-index:1;border:1px solid transparent}
        .p-wish-btn{position:absolute;top:12px;right:12px;width:30px;height:30px;border-radius:50%;background:rgba(247,242,235,.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;opacity:0;transition:all .2s;z-index:1}
        .p-card:hover .p-wish-btn{opacity:1}
        .p-wish-btn:hover{background:var(--deep);color:var(--gold)}
        .p-wish-btn.active{opacity:1;color:#c0392b}
        .p-body{padding:16px 16px 20px}
        .p-name{font-family:var(--font-display);font-size:1rem;color:var(--deep);line-height:1.25;margin-bottom:6px;transition:color .2s}
        .p-card:hover .p-name{color:var(--gold)}
        .stars{color:var(--gold);font-size:.58rem;letter-spacing:1px}
        .sort-select{appearance:none;background:transparent;border:1px solid rgba(196,168,130,.3);padding:9px 32px 9px 14px;font-family:var(--font-body);font-size:.68rem;letter-spacing:.12em;color:var(--warm);cursor:pointer;outline:none;text-transform:uppercase}
        .sort-select:focus{border-color:var(--gold)}
        .no-results{text-align:center;padding:72px 40px}
        .toast-fixed{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--deep);color:var(--cream);padding:13px 26px;font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;z-index:100;opacity:0;transition:all .4s;pointer-events:none;white-space:nowrap;display:flex;align-items:center;gap:9px}
        .toast-fixed.show{opacity:1;transform:translateX(-50%) translateY(0)}
        @media(max-width:960px){.catalog-layout{grid-template-columns:1fr}.sidebar{display:none}}
        @media(max-width:640px){.cat-hero{padding:32px 20px}.catalog-layout{padding:24px 20px}}
      `}</style>

      <Header />

      {/* Breadcrumb */}
      <div style={{background:'var(--light)',borderBottom:'1px solid rgba(196,168,130,.15)',padding:'10px 40px'}}>
        <div style={{maxWidth:1440,margin:'0 auto',display:'flex',alignItems:'center',gap:8,fontSize:'.62rem',color:'var(--earth)'}}>
          <a href="/" style={{color:'var(--warm)'}}>Inicio</a>
          <span style={{opacity:.4}}>›</span>
          <span style={{color:'var(--deep)'}}>Skincare</span>
        </div>
      </div>

      {/* Category hero */}
      <div className="cat-hero">
        <div style={{maxWidth:1440,margin:'0 auto',position:'relative',zIndex:1}}>
          <div className="cat-eyebrow">Colección 2026</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:300,color:'var(--deep)',marginBottom:10,lineHeight:1.1}}>
            Skincare para<br/>la piel <em style={{fontStyle:'italic',color:'var(--gold)'}}>latina</em>
          </h1>
          <p style={{fontSize:'.85rem',color:'var(--warm)',marginBottom:24,lineHeight:1.6,maxWidth:520}}>
            Curado para el calor venezolano. Ingredientes reales, resultados visibles.
          </p>
          <div style={{display:'flex',flexWrap:'wrap'}}>
            {CATS.map(cat => (
              <button key={cat} className={`cat-tab ${activeCategory===cat?'active':''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog layout */}
      <div className="catalog-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <span className="label-sm" style={{color:'var(--deep)'}}>Filtros</span>
            <button onClick={clearAll} style={{background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'.6rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--earth)'}}>Limpiar todo</button>
          </div>

          {/* Active filters */}
          {activeFilterTags.length > 0 && (
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
              {activeFilterTags.map(f => (
                <div key={f.value} className="af-tag" onClick={() => toggleBrand(f.value)}>
                  {f.value} <span>×</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="filter-group">
            <div className="fg-head" onClick={() => toggleGroup('precio')}>
              <span className="fg-title">Precio máximo (USD)</span>
              <span style={{fontSize:'.65rem',color:'var(--earth)'}}>{openGroups.includes('precio')?'▴':'▾'}</span>
            </div>
            <div className={`fg-body ${openGroups.includes('precio')?'open':''}`}>
              <div style={{paddingTop:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem',color:'var(--warm)',marginBottom:8}}>
                  <span>$0</span><span style={{color:'var(--gold)',fontWeight:500}}>${priceMax}</span>
                </div>
                <input type="range" min={5} max={120} value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                  style={{width:'100%',accentColor:'var(--gold)'}} />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="filter-group">
            <div className="fg-head" onClick={() => toggleGroup('marca')}>
              <span className="fg-title">Marca</span>
              <span style={{fontSize:'.65rem',color:'var(--earth)'}}>{openGroups.includes('marca')?'▴':'▾'}</span>
            </div>
            <div className={`fg-body ${openGroups.includes('marca')?'open':''}`}>
              <div className="fg-content">
                {BRANDS.map(b => (
                  <label key={b} className="f-check" style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',padding:'3px 0'}}>
                    <div className={`f-box ${activeBrands.includes(b)?'checked':''}`}
                      onClick={() => toggleBrand(b)}
                      style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {activeBrands.includes(b) && <span style={{fontSize:'.55rem',color:'var(--gold)'}}>✓</span>}
                    </div>
                    <span className="f-label" onClick={() => toggleBrand(b)}>{b}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div>
          {/* Toolbar */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,paddingBottom:20,borderBottom:'1px solid rgba(196,168,130,.15)',flexWrap:'wrap',gap:12}}>
            <span style={{fontSize:'.75rem',color:'var(--earth)'}}>
              <strong style={{color:'var(--deep)'}}>{filtered.length}</strong> productos
            </span>
            <div style={{position:'relative'}}>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
              <span style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',fontSize:'.6rem',color:'var(--earth)',pointerEvents:'none'}}>▾</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <div style={{fontSize:'3rem',marginBottom:16,opacity:.4}}>🌿</div>
              <p style={{fontFamily:'var(--font-display)',fontSize:'1.8rem',color:'var(--deep)',marginBottom:8}}>Sin resultados</p>
              <p style={{fontSize:'.85rem',color:'var(--warm)'}}>Prueba ajustando los filtros</p>
            </div>
          ) : (
            <div className="product-grid-cat">
              {filtered.map(p => (
                <div key={p.id} className="p-card">
                  <div className="p-img">
                    <div className="p-img-swatch" style={{background:`linear-gradient(160deg, ${p.color}cc, ${p.color})`}} />
                    <div className="p-add-overlay">
                      <button className="p-add-btn" onClick={() => addToCart(p.name)}>+ Agregar</button>
                    </div>
                    {p.badge && badgeCfg[p.badge] && (
                      <span className="p-badge-wrap" style={{background:badgeCfg[p.badge].bg,color:badgeCfg[p.badge].color}}>
                        {badgeCfg[p.badge].label}
                      </span>
                    )}
                    <button className={`p-wish-btn ${wishlist.includes(p.id)?'active':''}`} onClick={() => toggleWish(p.id)}>
                      {wishlist.includes(p.id)?'♥':'♡'}
                    </button>
                  </div>
                  <div className="p-body">
                    <div style={{fontSize:'.55rem',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--earth)',marginBottom:5}}>{p.brand}</div>
                    <div className="p-name">{p.name}</div>
                    <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:8}}>
                      {p.skin.map(s => <span key={s} style={{fontSize:'.52rem',letterSpacing:'.1em',textTransform:'uppercase',border:'1px solid rgba(196,168,130,.22)',padding:'2px 7px',color:'var(--earth)'}}>{s}</span>)}
                    </div>
                    <p style={{fontSize:'.72rem',color:'var(--warm)',lineHeight:1.45,marginBottom:10,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{p.desc}</p>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                      <div>
                        <span style={{fontSize:'.9rem',color:'var(--deep)'}}>${p.price.toFixed(2)}</span>
                        {p.oldPrice && <span style={{fontSize:'.7rem',color:'var(--earth)',textDecoration:'line-through',marginLeft:6}}>${p.oldPrice.toFixed(2)}</span>}
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:4}}>
                        <span className="stars">{'★'.repeat(p.rating)}{'☆'.repeat(5-p.rating)}</span>
                        <span style={{fontSize:'.6rem',color:'var(--earth)'}}>({p.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:48,paddingTop:32,borderTop:'1px solid rgba(196,168,130,.15)'}}>
              {[1,2,3,'…',8].map((p,i) => (
                <button key={i} style={{width:38,height:38,border:'1px solid rgba(196,168,130,.25)',background:p===1?'var(--deep)':'transparent',color:p===1?'var(--cream)':'var(--warm)',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'.78rem'}}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Toast */}
      <div className={`toast-fixed ${toast?'show':''}`}>
        <span style={{color:'var(--gold)'}}>✓</span> {toast}
      </div>
    </>
  )
}
