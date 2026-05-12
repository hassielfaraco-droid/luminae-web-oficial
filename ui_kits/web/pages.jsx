/* ── Pages: Favorites, Marcas, Blog, Help, About, Contact ── */

function FavoritesPage({ setPage, favs, toggleFav, onAddToCart }) {
  const items = PRODUCTS.filter(p => favs.has(p.id));
  return React.createElement('div', { style:{ animation:'fadeUp 0.45s ease both' } },
    React.createElement('div', { style:{ background:'linear-gradient(160deg,#2C2416,#3D3220)', color:'#F7F2EB', padding:'56px 0' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#D4AD6A', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Tu colección'),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:300, lineHeight:1.05, marginBottom:16 } }, 'Favoritos'),
        React.createElement('p', { style:{ fontSize:'0.95rem', lineHeight:1.6, maxWidth:520, opacity:0.85, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300 } },
          items.length === 0
            ? 'Aún no has guardado favoritos. Toca el corazón en cualquier producto para empezar tu colección.'
            : `${items.length} ${items.length===1?'producto guardado':'productos guardados'} en tu lista personal.`
        )
      )
    ),

    React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'40px 40px 80px' } },
      items.length === 0
        ? React.createElement('div', { style:{ textAlign:'center', padding:'80px 20px', background:'#F0E8DA', border:'1px solid rgba(196,168,130,0.2)' } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'center', marginBottom:20 } },
              React.createElement(HeartIcon, { width:54, height:54, style:{ color:'#C4A882', opacity:0.5 } })),
            React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#2C2416', fontWeight:400, marginBottom:10 } }, 'Tu lista de favoritos espera'),
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', color:'#6A5A42', marginBottom:24, maxWidth:420, margin:'0 auto 24px' } }, 'Guarda los productos que te llaman la atención y vuelve a ellos cuando quieras.'),
            React.createElement('div', { style:{ display:'inline-flex', gap:10 } },
              React.createElement('button', { onClick:()=>setPage({name:'catalog',cat:'skincare'}), style:{ padding:'14px 28px', background:'#2C2416', color:'#F7F2EB', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, 'Explorar Skincare'),
              React.createElement('button', { onClick:()=>setPage({name:'catalog',cat:'perfumeria'}), style:{ padding:'14px 28px', background:'transparent', color:'#2C2416', border:'1px solid rgba(44,36,22,0.3)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, 'Ver Perfumería')
            )
          )
        : React.createElement(React.Fragment, null,
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 } },
              React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4A882' } }, `${items.length} ${items.length===1?'producto':'productos'}`),
              React.createElement('div', { style:{ display:'flex', gap:10 } },
                React.createElement('button', { onClick:()=>{ items.forEach(p=>onAddToCart(p)); }, style:{ padding:'10px 20px', background:'#2C2416', color:'#F7F2EB', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, 'Agregar todo al carrito'),
                React.createElement('button', { onClick:()=>{ if(confirm('¿Vaciar lista de favoritos?')) items.forEach(p=>toggleFav(p.id)); }, style:{ padding:'10px 20px', background:'transparent', color:'#6A5A42', border:'1px solid rgba(44,36,22,0.2)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, 'Vaciar')
              )
            ),
            React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 } },
              items.map(p => React.createElement(ProductCard, { key:p.id, product:p, onAddToCart, isFav:true, toggleFav, onClick:prod=>setPage({name:'pdp',product:prod}) }))
            )
          )
    ),
    React.createElement(Footer, { setPage })
  );
}

function MarcasPage({ setPage }) {
  const grouped = {};
  PRODUCTS.forEach(p => { (grouped[p.vendor] ||= []).push(p); });
  const brandList = Object.keys(grouped).sort();
  const groupedAlpha = {};
  brandList.forEach(b => { const l = b[0].toUpperCase(); (groupedAlpha[l] ||= []).push(b); });
  const letters = Object.keys(groupedAlpha).sort();

  return React.createElement('div', { style:{ animation:'fadeUp 0.45s ease both' } },
    React.createElement('div', { style:{ background:'linear-gradient(160deg,#1A150D,#3A2E1E)', color:'#F7F2EB', padding:'64px 0' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#D4AD6A', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, `${brandList.length} marcas curadas`),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4.2rem)', fontWeight:300, lineHeight:1.05, marginBottom:18 } }, 'Marcas'),
        React.createElement('p', { style:{ fontSize:'0.95rem', lineHeight:1.65, maxWidth:560, opacity:0.85, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300 } }, 'Cada marca en Luminae fue elegida con criterio: ingredientes honestos, fórmulas probadas, y casas que respetan la piel y el planeta.')
      )
    ),

    React.createElement('div', { 'data-r':'marcas-letters', style:{ background:'#F0E8DA', position:'sticky', top:152, zIndex:5, borderBottom:'1px solid rgba(196,168,130,0.2)' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'14px 40px', display:'flex', gap:0, justifyContent:'flex-start', overflowX:'auto', flexWrap:'wrap' } },
        letters.map(l => React.createElement('a', {
          key:l, href:`#letter-${l}`,
          style:{ padding:'4px 12px', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.72rem', letterSpacing:'0.15em', color:'#2C2416', textDecoration:'none', cursor:'pointer', fontWeight:500 }
        }, l))
      )
    ),

    React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'48px 40px 80px' } },
      letters.map(letter => React.createElement('div', { key:letter, id:`letter-${letter}`, style:{ marginBottom:48, scrollMarginTop:220 } },
        React.createElement('div', { style:{ display:'flex', alignItems:'baseline', gap:16, marginBottom:24, paddingBottom:12, borderBottom:'1px solid rgba(196,168,130,0.3)' } },
          React.createElement('span', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', color:'#B8975A', fontWeight:300, lineHeight:1 } }, letter),
          React.createElement('span', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#C4A882' } }, `${groupedAlpha[letter].length} marcas`)
        ),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 } },
          groupedAlpha[letter].map(brand => {
            const ps = grouped[brand];
            return React.createElement('button', {
              key:brand, onClick:()=>setPage({name:'catalog',cat:'all',brand}),
              style:{ background:'#F7F2EB', border:'1px solid rgba(196,168,130,0.2)', padding:'20px 22px', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, transition:'all 0.2s' },
              onMouseEnter:e=>{ e.currentTarget.style.borderColor='#2C2416'; e.currentTarget.style.transform='translateY(-2px)'; },
              onMouseLeave:e=>{ e.currentTarget.style.borderColor='rgba(196,168,130,0.2)'; e.currentTarget.style.transform='translateY(0)'; }
            },
              React.createElement('div', null,
                React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.25rem', color:'#2C2416', fontWeight:400, marginBottom:4 } }, brand),
                React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4A882' } }, `${ps.length} ${ps.length===1?'producto':'productos'}`)
              ),
              React.createElement('span', { style:{ color:'#B8975A', fontSize:'0.9rem' } }, '→')
            );
          })
        )
      ))
    ),
    React.createElement(Footer, { setPage })
  );
}

function BlogPage({ setPage }) {
  const [activeCat, setActiveCat] = React.useState('all');
  const cats = Array.from(new Set(BLOG_POSTS.map(p=>p.cat)));
  const posts = activeCat === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.cat === activeCat);
  const featured = posts[0];
  const rest = posts.slice(1);

  return React.createElement('div', { style:{ animation:'fadeUp 0.45s ease both' } },
    React.createElement('div', { style:{ background:'#F0E8DA', padding:'56px 0 32px' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#B8975A', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Diario Luminae'),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4.2rem)', fontWeight:300, lineHeight:1.05, marginBottom:18, color:'#2C2416' } }, 'Educación honesta sobre tu piel'),
        React.createElement('p', { style:{ fontSize:'0.95rem', lineHeight:1.65, maxWidth:560, color:'#6A5A42', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300 } }, 'Rutinas, ingredientes y rituales — sin promesas mágicas. Solo lo que funciona.'),
        React.createElement('div', { style:{ display:'flex', gap:6, marginTop:28, flexWrap:'wrap' } },
          [['all','Todo'], ...cats.map(c=>[c,c])].map(([k,l])=>React.createElement('button', {
            key:k, onClick:()=>setActiveCat(k),
            style:{ padding:'8px 16px', background:activeCat===k?'#2C2416':'transparent', color:activeCat===k?'#F7F2EB':'#6A5A42', border:`1px solid ${activeCat===k?'#2C2416':'rgba(44,36,22,0.2)'}`, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase', transition:'all 0.2s' }
          }, l))
        )
      )
    ),

    React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'48px 40px 80px' } },
      featured && React.createElement('div', {
        style:{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:0, marginBottom:48, cursor:'pointer', background:'#F7F2EB' },
        onClick:()=>setPage({name:'blogPost',post:featured})
      },
        React.createElement('div', { style:{ background:featured.bg, aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center' } },
          React.createElement('span', { style:{ fontSize:'4rem', color:'rgba(247,242,235,0.2)', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic' } }, '"')
        ),
        React.createElement('div', { style:{ padding:'40px 36px', display:'flex', flexDirection:'column', justifyContent:'center' } },
          React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#B8975A', marginBottom:14 } }, `Destacado · ${featured.cat}`),
          React.createElement('h2', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:400, lineHeight:1.15, marginBottom:14, color:'#2C2416' } }, featured.title),
          React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', lineHeight:1.7, color:'#6A5A42', marginBottom:18, fontWeight:300 } }, featured.excerpt),
          React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:'#C4A882' } }, `${featured.date} · ${featured.read} de lectura`)
        )
      ),

      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 } },
        rest.map(p => React.createElement('article', {
          key:p.id, onClick:()=>setPage({name:'blogPost',post:p}),
          style:{ background:'#F7F2EB', border:'1px solid rgba(196,168,130,0.18)', cursor:'pointer', transition:'transform 0.2s' },
          onMouseEnter:e=>e.currentTarget.style.transform='translateY(-3px)',
          onMouseLeave:e=>e.currentTarget.style.transform='translateY(0)'
        },
          React.createElement('div', { style:{ background:p.bg, aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement('span', { style:{ fontSize:'2.5rem', color:'rgba(247,242,235,0.2)', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic' } }, '"')
          ),
          React.createElement('div', { style:{ padding:'20px 22px 24px' } },
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.55rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'#B8975A', marginBottom:10 } }, p.cat),
            React.createElement('h3', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.35rem', fontWeight:400, lineHeight:1.2, marginBottom:10, color:'#2C2416' } }, p.title),
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.78rem', lineHeight:1.6, color:'#6A5A42', marginBottom:14, fontWeight:300, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' } }, p.excerpt),
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.15em', color:'#C4A882' } }, `${p.date} · ${p.read}`)
          )
        ))
      )
    ),
    React.createElement(Footer, { setPage })
  );
}

function BlogPostPage({ setPage, post }) {
  return React.createElement('div', { style:{ animation:'fadeUp 0.4s ease both' } },
    React.createElement('div', { style:{ background:post.bg, height:380, display:'flex', alignItems:'flex-end' } },
      React.createElement('div', { style:{ maxWidth:760, margin:'0 auto', padding:'0 40px 40px', width:'100%' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(247,242,235,0.7)', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, post.cat),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3.4rem)', fontWeight:300, lineHeight:1.1, color:'#F7F2EB', marginBottom:14 } }, post.title),
        React.createElement('p', { style:{ fontSize:'0.7rem', letterSpacing:'0.15em', color:'rgba(247,242,235,0.7)', fontFamily:"'Plus Jakarta Sans',sans-serif" } }, `${post.date} · ${post.read} de lectura`)
      )
    ),
    React.createElement('div', { style:{ maxWidth:720, margin:'0 auto', padding:'56px 40px 80px' } },
      React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', lineHeight:1.5, color:'#6A5A42', marginBottom:32, paddingLeft:20, borderLeft:'2px solid #B8975A' } }, post.excerpt),
      [
        'Cada piel cuenta una historia distinta. La nuestra, en climas cálidos y latinos, pide rituales que respeten su humedad natural y la temperatura del entorno. Empezar con menos productos es casi siempre el mejor consejo.',
        'En este artículo cubrimos los principios básicos: identificar tu tipo de piel sin diagnósticos invasivos, elegir activos que coexisten bien (no todos lo hacen), y construir una rutina que puedas sostener — porque la consistencia gana siempre.',
        'No hay atajos honestos. Pero sí hay caminos cortos: elegir productos con ingredientes que entiendas, evitar los que prometen demasiado, y dar tiempo a las fórmulas para mostrar resultados. Cuatro a seis semanas es la ventana mínima realista.',
      ].map((para, i) => React.createElement('p', { key:i, style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'1rem', lineHeight:1.85, color:'#2C2416', marginBottom:22, fontWeight:300 } }, para)),
      React.createElement('div', { style:{ height:1, background:'linear-gradient(90deg,transparent,#C4A882,transparent)', opacity:0.3, margin:'40px 0' } }),
      React.createElement('button', { onClick:()=>setPage({name:'blog'}), style:{ padding:'12px 28px', background:'transparent', color:'#2C2416', border:'1px solid rgba(44,36,22,0.25)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase' } }, '← Volver al blog')
    ),
    React.createElement(Footer, { setPage })
  );
}

const HELP_TOPICS = {
  comprar: { title:'¿Cómo comprar?', body:[
    'Explora el catálogo o busca por marca, ingrediente o categoría.',
    'Agrega tus favoritos al carrito y revisa el resumen en cualquier momento.',
    'Al finalizar, elige tu método de pago (Zelle, Binance, Zinli, PayPal o transferencia USD).',
    'Confirmamos tu pedido por WhatsApp en menos de 2 horas hábiles.',
  ]},
  pago: { title:'Métodos de pago', body:[
    'Aceptamos pagos en USD por Zelle, Binance, Zinli, PayPal y transferencia internacional.',
    'No procesamos tarjetas de crédito directamente — solo a través de PayPal.',
    'Todos los precios están listados en dólares estadounidenses (USD).',
    'Una vez confirmado el pago, despachamos en 24-48 horas hábiles.',
  ]},
  envios: { title:'Envíos en Venezuela', body:[
    'Caracas: 24-48 horas hábiles vía MRW o entrega propia.',
    'Interior del país: 3-5 días hábiles vía MRW o Zoom.',
    'Envío gratis en pedidos superiores a $60 USD.',
    'Empacamos cada pedido con cuidado — productos sensibles llevan protección térmica.',
  ]},
  devoluciones: { title:'Devoluciones', body:[
    'Aceptamos devoluciones dentro de los 7 días siguientes a la entrega.',
    'El producto debe estar sin abrir y en su empaque original.',
    'No aceptamos devoluciones en perfumería abierta ni productos personalizados.',
    'Coordina tu devolución por WhatsApp y nosotros nos encargamos del resto.',
  ]},
  faq: { title:'Preguntas frecuentes', body:[
    '¿Los productos son originales? Sí. Trabajamos directo con marcas o distribuidores autorizados.',
    '¿Tienen tienda física? Aún no — somos 100% online con entrega coordinada.',
    '¿Hacen envíos al exterior? Por ahora servimos a toda Venezuela. Pronto: Latam.',
    '¿Cómo sé qué producto me sirve? Usa nuestra IA Skin o escríbenos por WhatsApp para asesoría.',
  ]},
};

function HelpPage({ setPage, topic='faq' }) {
  const [active, setActive] = React.useState(topic);
  const t = HELP_TOPICS[active] || HELP_TOPICS.faq;
  return React.createElement('div', { style:{ animation:'fadeUp 0.4s ease both' } },
    React.createElement('div', { style:{ background:'#F0E8DA', padding:'48px 0' } },
      React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 40px' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#B8975A', marginBottom:12, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Centro de ayuda'),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3.4rem)', fontWeight:300, color:'#2C2416' } }, '¿En qué te ayudamos?')
      )
    ),
    React.createElement('div', { style:{ maxWidth:1100, margin:'0 auto', padding:'48px 40px 80px', display:'grid', gridTemplateColumns:'240px 1fr', gap:40 } },
      React.createElement('aside', null,
        Object.entries(HELP_TOPICS).map(([k,v]) => React.createElement('button', {
          key:k, onClick:()=>setActive(k),
          style:{ display:'block', width:'100%', textAlign:'left', padding:'12px 16px', background:active===k?'rgba(184,151,90,0.1)':'transparent', borderLeft:`2px solid ${active===k?'#B8975A':'transparent'}`, border:'none', borderLeftWidth:2, borderLeftStyle:'solid', borderLeftColor:active===k?'#B8975A':'transparent', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.78rem', color:active===k?'#2C2416':'#6A5A42', fontWeight:active===k?500:300, marginBottom:2 }
        }, v.title))
      ),
      React.createElement('div', { style:{ background:'#F7F2EB', border:'1px solid rgba(196,168,130,0.2)', padding:'40px 44px' } },
        React.createElement('h2', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, color:'#2C2416', marginBottom:24 } }, t.title),
        React.createElement('ol', { style:{ paddingLeft:0, listStyle:'none', counterReset:'item' } },
          t.body.map((line, i) => React.createElement('li', { key:i, style:{ display:'flex', gap:18, padding:'14px 0', borderBottom:i<t.body.length-1?'1px solid rgba(196,168,130,0.15)':'none' } },
            React.createElement('span', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'#B8975A', lineHeight:1, minWidth:24 } }, String(i+1).padStart(2,'0')),
            React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', lineHeight:1.7, color:'#2C2416', fontWeight:300 } }, line)
          ))
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}

function AboutPage({ setPage }) {
  return React.createElement('div', { style:{ animation:'fadeUp 0.4s ease both' } },
    React.createElement('div', { style:{ background:'linear-gradient(160deg,#C4A882,#8E7458)', padding:'80px 0', color:'#F7F2EB' } },
      React.createElement('div', { style:{ maxWidth:760, margin:'0 auto', padding:'0 40px', textAlign:'center' } },
        React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#F7F2EB', marginBottom:18, opacity:0.85, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Nuestra historia'),
        React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:300, lineHeight:1.05 } }, 'Donde la luz se encuentra con tu piel')
      )
    ),
    React.createElement('div', { style:{ maxWidth:720, margin:'0 auto', padding:'72px 40px' } },
      ['Luminae nació de una pregunta sencilla: ¿por qué cuidar la piel se volvió tan complicado? La respuesta está en el ruido — fórmulas excesivas, promesas vacías, marketing que no respeta a quien compra.',
      'Curamos cada producto con un único filtro: ¿funciona, sin engañar? Si la respuesta es sí, llega a Luminae. Si no, no importa qué tan famoso sea.',
      'Servimos a Venezuela y a Latinoamérica con un compromiso simple: productos auténticos, entrega cuidada, y atención humana cuando la necesites.'].map((p,i) => React.createElement('p', { key:i, style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'1.05rem', lineHeight:1.85, color:'#2C2416', marginBottom:24, fontWeight:300 } }, p)),
      React.createElement('div', { style:{ height:1, background:'linear-gradient(90deg,transparent,#C4A882,transparent)', opacity:0.3, margin:'40px 0' } }),
      React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.5rem', textAlign:'center', color:'#B8975A', lineHeight:1.4 } }, '"Curaduría · claridad · ritual · lujo cotidiano."')
    ),
    React.createElement(Footer, { setPage })
  );
}

function ContactPage({ setPage }) {
  return React.createElement('div', { style:{ animation:'fadeUp 0.4s ease both' } },
    React.createElement('div', { style:{ maxWidth:1100, margin:'0 auto', padding:'56px 40px 80px' } },
      React.createElement('p', { style:{ fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#B8975A', marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Hablemos'),
      React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3.4rem)', fontWeight:300, color:'#2C2416', marginBottom:48 } }, 'Contacto'),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 } },
        React.createElement('div', null,
          [['WhatsApp','+58 412-LUMINAE','La forma más rápida'],['Correo','hola@luminae.com.ve','Respuesta en 24h'],['Instagram','@luminae.ve','DM siempre abiertos']].map(([k,v,sub])=>React.createElement('div',{key:k,style:{paddingBottom:20,marginBottom:20,borderBottom:'1px solid rgba(196,168,130,0.2)'}},
            React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.58rem',letterSpacing:'0.25em',textTransform:'uppercase',color:'#B8975A',marginBottom:8}},k),
            React.createElement('p',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.4rem',color:'#2C2416',marginBottom:4}},v),
            React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.78rem',color:'#6A5A42'}},sub)
          ))
        ),
        React.createElement('form', { onSubmit:e=>{e.preventDefault();alert('Mensaje enviado (demo)');}, style:{ background:'#F0E8DA', padding:32 } },
          [['Nombre','text'],['Correo','email'],['Asunto','text']].map(([l,t])=>React.createElement('div',{key:l,style:{marginBottom:16}},
            React.createElement('label',{style:{display:'block',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.55rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A',marginBottom:6}},l),
            React.createElement('input',{type:t,required:true,style:{width:'100%',padding:'10px 12px',background:'rgba(255,255,255,0.6)',border:'1px solid rgba(196,168,130,0.3)',color:'#2C2416',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',outline:'none'}})
          )),
          React.createElement('div',{style:{marginBottom:18}},
            React.createElement('label',{style:{display:'block',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.55rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A',marginBottom:6}},'Mensaje'),
            React.createElement('textarea',{rows:5,required:true,style:{width:'100%',padding:'10px 12px',background:'rgba(255,255,255,0.6)',border:'1px solid rgba(196,168,130,0.3)',color:'#2C2416',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',outline:'none',resize:'vertical'}})
          ),
          React.createElement('button',{type:'submit',style:{padding:'14px 28px',background:'#2C2416',color:'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.22em',textTransform:'uppercase'}},'Enviar mensaje →')
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}

Object.assign(window, { FavoritesPage, MarcasPage, BlogPage, BlogPostPage, HelpPage, AboutPage, ContactPage });
