/* ── Catalog page with sidebar filters ──────────────────── */

const CAT_LABELS = {
  all:'Todo el catálogo', skincare:'Skincare', perfumeria:'Perfumería',
  wellness:'Wellness', ofertas:'Ofertas', sets:'Sets & Regalos', marcas:'Marcas',
};

const CAT_HEROES = {
  skincare:   { eyebrow:'Skincare curado', title:'Tratamientos que respetan tu piel', sub:'Sérums, hidratantes y limpieza con activos reales — formulados para climas cálidos y pieles latinas.', bg:'linear-gradient(160deg,#C4A882,#8E7458)', text:'#F7F2EB' },
  perfumeria: { eyebrow:'Perfumería de autor', title:'Aromas que cuentan tu historia', sub:'Niche, designer y descubrimientos —elegidos por su carácter, no por su volumen.', bg:'linear-gradient(200deg,#1A150D,#3A2E1E)', text:'#F7F2EB' },
  wellness:   { eyebrow:'Wellness', title:'El ritual también es cuidado', sub:'Cuerpo, cabello y aromaterapia. Lo cotidiano, elevado.', bg:'linear-gradient(150deg,#7A8C6E,#5D6E55)', text:'#F7F2EB' },
  ofertas:    { eyebrow:'Ofertas especiales', title:'Hasta 40% off en favoritas', sub:'Selección rotativa de productos en oferta. Stock limitado, siempre auténticos.', bg:'linear-gradient(135deg,#8B2020,#5C1414)', text:'#F7F2EB' },
  sets:       { eyebrow:'Sets & Regalos', title:'Curaduría lista para regalar', sub:'Colecciones pensadas para descubrir, regalar o iniciar un ritual completo.', bg:'linear-gradient(160deg,#B8975A,#856935)', text:'#F7F2EB' },
  all:        { eyebrow:'Catálogo completo', title:'Toda la curaduría Luminae', sub:'Más de 30 productos seleccionados por su honestidad y resultados.', bg:'linear-gradient(160deg,#2C2416,#3D3220)', text:'#F7F2EB' },
};

function CategoryHero({ cat }) {
  const h = CAT_HEROES[cat] || CAT_HEROES.all;
  return React.createElement('div', { style:{ background:h.bg, color:h.text, padding:'56px 0' } },
    React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px' } },
      React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#D4AD6A', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, h.eyebrow),
      React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:300, lineHeight:1.05, marginBottom:16, maxWidth:720 } }, h.title),
      React.createElement('p', { style:{ fontSize:'0.95rem', lineHeight:1.6, maxWidth:560, opacity:0.85, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300 } }, h.sub)
    )
  );
}

function FilterSection({ title, children, defaultOpen=true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return React.createElement('div', { style:{ borderBottom:'1px solid rgba(196,168,130,0.2)', paddingBottom:open?16:0 } },
    React.createElement('button', { onClick:()=>setOpen(!open), style:{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'16px 0', background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'#2C2416', fontWeight:500 } },
      title,
      React.createElement('span', { style:{ color:'#C4A882', fontSize:'0.9rem', transition:'transform 0.2s', display:'inline-block', transform: open?'rotate(0deg)':'rotate(-90deg)' } }, '⌄')
    ),
    open && React.createElement('div', { style:{ paddingTop:4 } }, children)
  );
}

function Checkbox({ checked, onChange, label, count }) {
  return React.createElement('label', {
    style:{ display:'flex', alignItems:'center', gap:10, padding:'6px 0', cursor:'pointer', color:checked?'#2C2416':'#6A5A42', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.78rem', fontWeight:checked?500:300, transition:'color 0.15s' }
  },
    React.createElement('span', {
      style:{ width:14, height:14, border:`1px solid ${checked?'#2C2416':'rgba(196,168,130,0.5)'}`, background:checked?'#2C2416':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }
    },
      checked && React.createElement('svg', { width:9, height:9, viewBox:'0 0 24 24', fill:'none', stroke:'#F7F2EB', strokeWidth:3 }, React.createElement('polyline',{points:'20 6 9 17 4 12'}))
    ),
    React.createElement('input', { type:'checkbox', checked, onChange, style:{ display:'none' } }),
    React.createElement('span', { style:{ flex:1 } }, label),
    typeof count === 'number' && React.createElement('span', { style:{ color:'#C4A882', fontSize:'0.7rem' } }, count)
  );
}

function CatalogPage({ setPage, cat='all', initialQ='', onAddToCart, favs, toggleFav }) {
  const [activeCat, setActiveCat] = React.useState(cat);
  const [subFilter, setSubFilter] = React.useState(new Set());
  const [brandFilter, setBrandFilter] = React.useState(new Set());
  const [tagFilter, setTagFilter] = React.useState(new Set());
  const [priceMax, setPriceMax] = React.useState(250);
  const [minRating, setMinRating] = React.useState(0);
  const [sortBy, setSortBy] = React.useState('relevant');
  const [query, setQuery] = React.useState(initialQ || '');
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  React.useEffect(()=>{ document.body.style.overflow = mobileFiltersOpen ? 'hidden' : ''; return ()=>{ document.body.style.overflow=''; }; }, [mobileFiltersOpen]);

  // Reset filters when category changes
  React.useEffect(() => {
    setActiveCat(cat);
    setSubFilter(new Set()); setBrandFilter(new Set()); setTagFilter(new Set());
    setPriceMax(250); setMinRating(0);
  }, [cat]);

  const base = productsFor(activeCat);
  const subs = SUBCATS[activeCat] || [];
  const brandsInCat = Array.from(new Set(base.map(p => p.vendor))).sort();

  let filtered = base;
  if (subFilter.size) filtered = filtered.filter(p => subFilter.has(p.sub));
  if (brandFilter.size) filtered = filtered.filter(p => brandFilter.has(p.vendor));
  if (tagFilter.size) filtered = filtered.filter(p => tagFilter.has(p.tag));
  filtered = filtered.filter(p => p.price <= priceMax);
  if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q));
  }

  filtered = [...filtered];
  if (sortBy === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
  if (sortBy === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
  if (sortBy === 'rating') filtered.sort((a,b)=>b.rating-a.rating);
  if (sortBy === 'newest') filtered.sort((a,b)=> (b.tag==='new'?1:0) - (a.tag==='new'?1:0) );

  const toggleIn = (set, val, setter) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const clearAll = () => {
    setSubFilter(new Set()); setBrandFilter(new Set()); setTagFilter(new Set());
    setPriceMax(250); setMinRating(0); setQuery('');
  };

  const activeFilterChips = [
    ...Array.from(subFilter).map(s => ({label:SUBCAT_LABELS[s]||s, clear:()=>toggleIn(subFilter,s,setSubFilter)})),
    ...Array.from(brandFilter).map(b => ({label:b, clear:()=>toggleIn(brandFilter,b,setBrandFilter)})),
    ...Array.from(tagFilter).map(t => ({label: t==='new'?'Nuevos': t==='sale'?'En oferta': t==='best'?'Bestsellers':t, clear:()=>toggleIn(tagFilter,t,setTagFilter)})),
    minRating > 0 && {label:`★ ${minRating}+`, clear:()=>setMinRating(0)},
    priceMax < 250 && {label:`Hasta $${priceMax}`, clear:()=>setPriceMax(250)},
    query && {label:`"${query}"`, clear:()=>setQuery('')},
  ].filter(Boolean);

  return React.createElement('div', { style:{ animation:'fadeUp 0.45s ease both' } },
    React.createElement(CategoryHero, { cat: activeCat }),

    // Category sub-tabs (skincare → serum/hidratante/etc., perfumeria → género, etc.)
    subs.length > 0 && React.createElement('div', { style:{ background:'#F0E8DA', borderBottom:'1px solid rgba(196,168,130,0.18)' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px', display:'flex', gap:0, overflowX:'auto' } },
        React.createElement('button', {
          onClick: ()=>setSubFilter(new Set()),
          style:{ padding:'14px 18px', background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color: subFilter.size===0?'#2C2416':'#6A5A42', borderBottom:`2px solid ${subFilter.size===0?'#2C2416':'transparent'}`, fontWeight:subFilter.size===0?500:400, whiteSpace:'nowrap' }
        }, 'Todos'),
        subs.map(s => React.createElement('button', {
          key:s, onClick:()=>toggleIn(subFilter,s,setSubFilter),
          style:{ padding:'14px 18px', background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color: subFilter.has(s)?'#2C2416':'#6A5A42', borderBottom:`2px solid ${subFilter.has(s)?'#2C2416':'transparent'}`, fontWeight:subFilter.has(s)?500:400, whiteSpace:'nowrap' }
        }, SUBCAT_LABELS[s] || s))
      )
    ),

    React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px', display:'grid', gridTemplateColumns:'240px 1fr', gap:36 } },

      // SIDEBAR
      React.createElement('aside', { 'data-r':'catalog-sidebar', 'data-open': mobileFiltersOpen?'true':'false', style:{ alignSelf:'start', position:'sticky', top:200 } },
        React.createElement('div', { 'data-r':'mobile-filter-header', style:{ display:'none', alignItems:'center', justifyContent:'space-between', padding:'16px 18px', borderBottom:'1px solid rgba(196,168,130,0.25)', background:'#F7F2EB', position:'sticky', top:0, zIndex:2 } },
          React.createElement('span', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'#2C2416' } }, 'Filtros'),
          React.createElement('button', { onClick:()=>setMobileFiltersOpen(false), 'aria-label':'Cerrar', style:{ background:'none', border:'none', cursor:'pointer', color:'#2C2416', padding:4, display:'flex' } },
            React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5}, React.createElement('path',{d:'M18 6 6 18M6 6l12 12'}))
          )
        ),
        React.createElement('div', { 'data-r':'sidebar-body', style:{} },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:14, borderBottom:'1px solid rgba(196,168,130,0.3)', marginBottom:4 } },
          React.createElement('span', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'#2C2416', fontWeight:500, display:'flex', alignItems:'center', gap:8 } },
            React.createElement(FilterIcon, { style:{ color:'#B8975A' } }), 'Filtros'),
          activeFilterChips.length > 0 && React.createElement('button', { onClick:clearAll, style:{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#B8975A', textDecoration:'underline' } }, 'Limpiar')
        ),

        // Search within
        React.createElement(FilterSection, { title:'Buscar' },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', background:'#F0E8DA', border:'1px solid rgba(196,168,130,0.22)', height:34, padding:'0 10px', gap:8 } },
            React.createElement(SearchIcon, { style:{ color:'#8E8A6C', flexShrink:0, width:13, height:13 } }),
            React.createElement('input', { value:query, onChange:e=>setQuery(e.target.value), placeholder:'Producto o marca…', style:{ background:'transparent', border:'none', outline:'none', width:'100%', fontSize:'0.75rem', fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#2C2416', fontWeight:300 } })
          )
        ),

        // Brand
        React.createElement(FilterSection, { title:`Marca (${brandsInCat.length})`, defaultOpen:true },
          React.createElement('div', { style:{ maxHeight:200, overflowY:'auto', paddingRight:4 } },
            brandsInCat.map(b => {
              const count = base.filter(p => p.vendor === b).length;
              return React.createElement(Checkbox, { key:b, checked:brandFilter.has(b), onChange:()=>toggleIn(brandFilter,b,setBrandFilter), label:b, count });
            })
          )
        ),

        // Etiquetas
        React.createElement(FilterSection, { title:'Etiquetas' },
          [['new','Nuevos'],['sale','En oferta'],['best','Bestsellers']].map(([k,l]) => {
            const count = base.filter(p => p.tag === k).length;
            return React.createElement(Checkbox, { key:k, checked:tagFilter.has(k), onChange:()=>toggleIn(tagFilter,k,setTagFilter), label:l, count });
          })
        ),

        // Price
        React.createElement(FilterSection, { title:'Precio' },
          React.createElement('div', { style:{ padding:'8px 0' } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.75rem', color:'#2C2416' } },
              React.createElement('span', null, '$0'),
              React.createElement('span', { style:{ fontWeight:500 } }, `Hasta $${priceMax}`)
            ),
            React.createElement('input', {
              type:'range', min:10, max:250, step:5, value:priceMax,
              onChange:e=>setPriceMax(parseInt(e.target.value)),
              style:{ width:'100%', accentColor:'#B8975A', cursor:'pointer' }
            })
          )
        ),

        // Rating
        React.createElement(FilterSection, { title:'Calificación' },
          [4.5, 4, 3.5].map(r => React.createElement('button', {
            key:r, onClick:()=>setMinRating(minRating===r?0:r),
            style:{ display:'flex', alignItems:'center', gap:8, padding:'6px 0', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', color: minRating===r?'#2C2416':'#6A5A42', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.78rem', fontWeight:minRating===r?500:300 }
          },
            React.createElement(Stars, { rating:r, size:12 }),
            React.createElement('span', null, `${r} y más`)
          ))
        )
        ),
        React.createElement('div', { 'data-r':'mobile-filter-footer', style:{ display:'none', padding:'14px 18px', gap:10, borderTop:'1px solid rgba(196,168,130,0.25)', background:'#F7F2EB', position:'sticky', bottom:0 } },
          React.createElement('button', { onClick:clearAll, style:{ flex:1, padding:'12px', background:'transparent', color:'#2C2416', border:'1px solid rgba(44,36,22,0.25)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase' } }, 'Limpiar'),
          React.createElement('button', { onClick:()=>setMobileFiltersOpen(false), style:{ flex:2, padding:'12px', background:'#2C2416', color:'#F7F2EB', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase' } }, `Ver ${filtered.length} productos`)
        )
      ),

      // MAIN COLUMN
      React.createElement('div', null,
        React.createElement('button', {
          'data-r':'mobile-filter-toggle',
          onClick:()=>setMobileFiltersOpen(true),
          style:{ display:'none', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'12px 16px', marginBottom:16, background:'#F7F2EB', border:'1px solid rgba(196,168,130,0.35)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#2C2416' }
        },
          React.createElement('span',{style:{display:'flex',alignItems:'center',gap:10}},
            React.createElement(FilterIcon,{style:{color:'#B8975A'}}),
            'Filtros',
            activeFilterChips.length>0 && React.createElement('span',{style:{display:'inline-flex',alignItems:'center',justifyContent:'center',minWidth:20,height:20,padding:'0 6px',background:'#B8975A',color:'#2C2416',fontSize:'0.65rem',letterSpacing:0,fontWeight:600}},activeFilterChips.length)
          ),
          React.createElement('span',{style:{color:'#B8975A'}},'→')
        ),
        React.createElement('div', { style:{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:12 } },
          React.createElement('div', null,
            React.createElement('h2', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:400, color:'#2C2416' } }, CAT_LABELS[activeCat] || 'Productos'),
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4A882', marginTop:6 } }, `${filtered.length} ${filtered.length===1?'producto':'productos'}`)
          ),
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
            React.createElement('span', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#6A5A42' } }, 'Ordenar'),
            React.createElement('select', {
              value:sortBy, onChange:e=>setSortBy(e.target.value),
              style:{ padding:'8px 14px', border:'1px solid rgba(196,168,130,0.35)', background:'#F0E8DA', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.72rem', color:'#2C2416', cursor:'pointer', outline:'none' }
            },
              React.createElement('option',{value:'relevant'},'Relevancia'),
              React.createElement('option',{value:'newest'},'Más nuevos'),
              React.createElement('option',{value:'rating'},'Mejor calificados'),
              React.createElement('option',{value:'price-asc'},'Precio: menor a mayor'),
              React.createElement('option',{value:'price-desc'},'Precio: mayor a menor')
            )
          )
        ),

        // Active filter chips
        activeFilterChips.length > 0 && React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 } },
          activeFilterChips.map((chip, i) => React.createElement('button', {
            key:i, onClick:chip.clear,
            style:{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px 5px 12px', background:'rgba(184,151,90,0.1)', border:'1px solid rgba(184,151,90,0.3)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', color:'#2C2416' }
          }, chip.label, React.createElement(XIcon, { width:11, height:11, style:{ color:'#B8975A' } })))
        ),

        filtered.length > 0
          ? React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 } },
              filtered.map(p => React.createElement(ProductCard, {
                key:p.id, product:p, onAddToCart, isFav:favs.has(p.id), toggleFav,
                onClick:prod=>setPage({name:'pdp',product:prod})
              }))
            )
          : React.createElement('div', { style:{ textAlign:'center', padding:'80px 20px', background:'#F0E8DA', border:'1px solid rgba(196,168,130,0.2)' } },
              React.createElement('div', { style:{ fontSize:'3rem', color:'rgba(44,36,22,0.15)', marginBottom:16 } }, '◈'),
              React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#2C2416', fontWeight:400, marginBottom:8 } }, 'No encontramos productos'),
              React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.85rem', color:'#6A5A42', marginBottom:20 } }, 'Prueba ajustando los filtros o limpia tu selección.'),
              React.createElement('button', { onClick:clearAll, style:{ padding:'12px 24px', background:'#2C2416', color:'#F7F2EB', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, 'Limpiar filtros')
            )
      )
    ),
    React.createElement(Footer, { setPage }),
    mobileFiltersOpen && React.createElement('div',{'data-r':'mobile-filter-backdrop',onClick:()=>setMobileFiltersOpen(false),style:{position:'fixed',inset:0,background:'rgba(44,36,22,0.5)',zIndex:60,animation:'fadeIn 0.25s ease',display:'none'}})
  );
}

window.CatalogPage = CatalogPage;
