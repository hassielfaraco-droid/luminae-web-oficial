/* ── Header + Footer + CartDrawer ─────────────────────────── */

function Header({ setPage, cartCount, openCart, favCount, currentPage }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState('');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; }, [mobileOpen]);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const NAV = [
    ['Inicio',     {name:'home'}],
    ['Skin',       {name:'catalog',cat:'skincare'}],
    ['Perfumería', {name:'catalog',cat:'perfumeria'}],
    ['Wellness',   {name:'catalog',cat:'wellness'}],
    ['Marcas',     {name:'marcas'}],
    ['Ofertas',    {name:'catalog',cat:'ofertas'}],
    ['Sets',       {name:'catalog',cat:'sets'}],
    ['Blog',       {name:'blog'}],
  ];

  const isActive = (target) => {
    if (target.name === 'home' && currentPage?.name === 'home') return true;
    if (target.name === 'catalog' && currentPage?.name === 'catalog' && currentPage?.cat === target.cat) return true;
    if (target.name === currentPage?.name && target.name !== 'catalog') return true;
    return false;
  };

  return React.createElement(React.Fragment, null,
    React.createElement('div', { 'data-r':'announce', style:{ background:'#2C2416', color:'#C4A882', textAlign:'center', padding:'9px 20px', fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase' } },
      '🌿 Envíos a toda Venezuela\u00a0·\u00a0',
      React.createElement('span', { style:{ color:'#B8975A' } }, 'Paga con Zelle, Binance o transferencia USD'),
      '\u00a0·\u00a0Envío gratis en pedidos +$60'
    ),
    React.createElement('header', {
      style:{
        position:'sticky', top:0, zIndex:30, background: scrolled?'rgba(247,242,235,0.97)':'#F7F2EB',
        backdropFilter: scrolled?'blur(12px)':'none',
        borderBottom:'1px solid rgba(196,168,130,0.18)',
        boxShadow: scrolled?'0 2px 12px rgba(44,36,22,0.06)':'none',
        transition:'all 0.3s',
      }
    },
      React.createElement('div', { 'data-r':'header-grid', style:{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', columnGap:48, height:84 } },
        React.createElement('button', { 'data-r':'hamburger', onClick:()=>setMobileOpen(true), 'aria-label':'Abrir menú', style:{ display:'none', alignItems:'center', justifyContent:'center', width:38, height:38, background:'transparent', border:'1px solid rgba(196,168,130,0.3)', cursor:'pointer', color:'#2C2416', justifySelf:'start' } },
          React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.6}, React.createElement('path',{d:'M3 6h18M3 12h18M3 18h18'}))
        ),
        React.createElement('div', { 'data-r':'header-search', style:{ display:'flex', alignItems:'center', width:'100%', maxWidth:320, background:'#F0E8DA', border:'1px solid rgba(196,168,130,0.22)', height:38, padding:'0 14px', gap:10, justifySelf:'start' } },
          React.createElement(SearchIcon, { style:{ color:'#8E8A6C', flexShrink:0 } }),
          React.createElement('input', {
            type:'text', placeholder:'Buscar productos, marcas…', value:searchVal,
            onChange: e=>setSearchVal(e.target.value),
            onKeyDown: e=>{ if(e.key==='Enter' && searchVal.trim()) setPage({name:'catalog',cat:'all',q:searchVal.trim()}); },
            style:{ background:'transparent', border:'none', outline:'none', fontFamily:"'Inter',sans-serif", fontSize:'0.78rem', color:'#2C2416', width:'100%', fontWeight:300 }
          })
        ),
        React.createElement('button', { 'data-r':'header-logo', onClick:()=>setPage({name:'home'}), style:{ background:'none', border:'none', cursor:'pointer', textAlign:'center', justifySelf:'center', padding:'0 24px' } },
          React.createElement('div', { style:{ fontFamily:"'Satoshi',sans-serif", fontSize:'1.6rem', letterSpacing:'0.22em', color:'#2C2416', lineHeight:1, fontWeight:900, textTransform:'uppercase' } }, 'LUMINAE')
        ),
        React.createElement('div', { 'data-r':'header-actions', style:{ display:'flex', alignItems:'center', gap:28, justifySelf:'end' } },
          React.createElement('button', { 'data-r':'account-icon', onClick:()=>setPage({name:'account',tab:'datos'}), style:{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2, color:'#6A5A42', transition:'color 0.2s' },
            onMouseEnter:e=>e.currentTarget.style.color='#2C2416', onMouseLeave:e=>e.currentTarget.style.color='#6A5A42' },
            React.createElement(UserIcon),
            React.createElement('span', { 'data-r':'header-action-label', style:{ fontSize:'0.5rem', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:"'Plus Jakarta Sans',sans-serif", whiteSpace:'nowrap' } }, 'Mi cuenta')
          ),
          React.createElement('button', { onClick:()=>setPage({name:'favorites'}), style:{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2, color:'#6A5A42', transition:'color 0.2s', position:'relative' },
            onMouseEnter:e=>e.currentTarget.style.color='#2C2416', onMouseLeave:e=>e.currentTarget.style.color='#6A5A42' },
            React.createElement(HeartIcon),
            React.createElement('span', { 'data-r':'header-action-label', style:{ fontSize:'0.5rem', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Favoritos'),
            favCount > 0 && React.createElement('span', { style:{ position:'absolute', top:-4, right:-4, width:16, height:16, borderRadius:'50%', background:'#B8975A', color:'#2C2416', fontSize:'0.5rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' } }, favCount)
          ),
          React.createElement('button', { onClick:openCart, style:{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2, color:'#6A5A42', transition:'color 0.2s', position:'relative' },
            onMouseEnter:e=>e.currentTarget.style.color='#2C2416', onMouseLeave:e=>e.currentTarget.style.color='#6A5A42' },
            React.createElement(BagIcon),
            React.createElement('span', { 'data-r':'header-action-label', style:{ fontSize:'0.5rem', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:"'Plus Jakarta Sans',sans-serif" } }, 'Carrito'),
            cartCount > 0 && React.createElement('span', { style:{ position:'absolute', top:-4, right:-4, width:16, height:16, borderRadius:'50%', background:'#B8975A', color:'#2C2416', fontSize:'0.5rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' } }, cartCount)
          )
        )
      ),
      React.createElement('div', { 'data-r':'nav-bar', style:{ background:'#2C2416' } },
        React.createElement('div', { style:{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', alignItems:'stretch', overflowX:'auto' } },
          NAV.map(([label, target]) =>
            React.createElement('button', {
              key:label, onClick:()=>setPage(target),
              style:{ padding:'13px 20px', background: isActive(target)?'rgba(255,255,255,0.06)':'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', color: isActive(target)?'#F7F2EB':'#C4A882',
              transition:'color 0.2s, background 0.2s', whiteSpace:'nowrap' },
              onMouseEnter:e=>{ e.currentTarget.style.color='#F7F2EB'; e.currentTarget.style.background='rgba(255,255,255,0.06)'; },
              onMouseLeave:e=>{ if(!isActive(target)){ e.currentTarget.style.color='#C4A882'; e.currentTarget.style.background='none'; } },
            }, label)
          )
        )
      ),
      mobileOpen && React.createElement('div', { onClick:()=>setMobileOpen(false), style:{ position:'fixed',inset:0,background:'rgba(44,36,22,0.5)',zIndex:60,animation:'fadeIn 0.25s ease' } }),
      mobileOpen && React.createElement('aside', { style:{ position:'fixed',top:0,left:0,bottom:0,width:'min(320px,82vw)',background:'#F7F2EB',zIndex:70,display:'flex',flexDirection:'column',boxShadow:'8px 0 32px rgba(44,36,22,0.18)',animation:'slideRight 0.3s cubic-bezier(0.4,0,0.2,1)' } },
        React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 20px',borderBottom:'1px solid rgba(196,168,130,0.2)'}},
          React.createElement('span',{style:{fontFamily:"'Satoshi',sans-serif",fontSize:'1.05rem',letterSpacing:'0.2em',fontWeight:900,color:'#2C2416'}},'LUMINAE'),
          React.createElement('button',{onClick:()=>setMobileOpen(false),style:{background:'none',border:'none',cursor:'pointer',color:'#2C2416',padding:4,display:'flex'}},
            React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5},React.createElement('path',{d:'M18 6 6 18M6 6l12 12'}))
          )
        ),
        React.createElement('div',{style:{padding:'14px 20px',borderBottom:'1px solid rgba(196,168,130,0.2)'}},
          React.createElement('div',{style:{display:'flex',alignItems:'center',background:'#F0E8DA',border:'1px solid rgba(196,168,130,0.22)',height:38,padding:'0 12px',gap:10}},
            React.createElement(SearchIcon,{style:{color:'#8E8A6C',flexShrink:0}}),
            React.createElement('input',{type:'text',placeholder:'Buscar productos…',value:searchVal,onChange:e=>setSearchVal(e.target.value),onKeyDown:e=>{ if(e.key==='Enter'&&searchVal.trim()){ setMobileOpen(false); setPage({name:'catalog',cat:'all',q:searchVal.trim()}); } },style:{background:'transparent',border:'none',outline:'none',fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'#2C2416',width:'100%',fontWeight:300}})
          )
        ),
        React.createElement('nav',{style:{flex:1,overflowY:'auto',padding:'10px 0'}},
          NAV.map(([label,target])=>React.createElement('button',{
            key:label,onClick:()=>{ setMobileOpen(false); setPage(target); },
            style:{display:'block',width:'100%',textAlign:'left',padding:'14px 22px',background:isActive(target)?'rgba(184,151,90,0.08)':'none',border:'none',borderLeft:`2px solid ${isActive(target)?'#B8975A':'transparent'}`,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.78rem',letterSpacing:'0.18em',textTransform:'uppercase',color:isActive(target)?'#2C2416':'#6A5A42',fontWeight:isActive(target)?500:400}
          },label)),
          React.createElement('div',{style:{height:1,background:'rgba(196,168,130,0.2)',margin:'10px 22px'}}),
          [['Mi cuenta',{name:'account',tab:'datos'}],['Favoritos',{name:'favorites'}],['Contacto',{name:'contact'}]].map(([l,t])=>React.createElement('button',{
            key:l,onClick:()=>{ setMobileOpen(false); setPage(t); },
            style:{display:'block',width:'100%',textAlign:'left',padding:'12px 22px',background:'none',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.72rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#6A5A42'}
          },l))
        )
      )
    )
  );
}

function Footer({ setPage }) {
  const SHOP = [
    ['Skincare',   {name:'catalog',cat:'skincare'}],
    ['Perfumería', {name:'catalog',cat:'perfumeria'}],
    ['Wellness',   {name:'catalog',cat:'wellness'}],
    ['Marcas',     {name:'marcas'}],
    ['Ofertas',    {name:'catalog',cat:'ofertas'}],
    ['Sets',       {name:'catalog',cat:'sets'}],
  ];
  const HELP = [
    ['¿Cómo comprar?',    {name:'help',topic:'comprar'}],
    ['Métodos de pago',    {name:'help',topic:'pago'}],
    ['Envíos Venezuela',   {name:'help',topic:'envios'}],
    ['Devoluciones',       {name:'help',topic:'devoluciones'}],
    ['Preguntas frecuentes',{name:'help',topic:'faq'}],
  ];
  const BRAND = [
    ['Nuestra historia',   {name:'about'}],
    ['Blog de skincare',   {name:'blog'}],
    ['Contacto',           {name:'contact'}],
  ];
  return React.createElement('footer',{style:{background:'#1A150D',paddingTop:72,paddingBottom:36}},
    React.createElement('div',{style:{maxWidth:1280,margin:'0 auto',padding:'0 64px'}},
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1fr',gap:48,paddingBottom:48,borderBottom:'1px solid rgba(196,168,130,0.1)'}},
        React.createElement('div',null,
          React.createElement('div',{style:{fontFamily:"'Satoshi',sans-serif",fontSize:'1.5rem',letterSpacing:'0.2em',color:'#FFF8F0',fontWeight:900,textTransform:'uppercase'}},'LUMINAE'),
          React.createElement('p',{style:{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'rgba(196,168,130,0.55)',fontSize:'0.95rem',lineHeight:1.6,marginTop:18}},'"Donde la luz se encuentra con tu piel."'),
          React.createElement('div',{style:{display:'flex',gap:8,marginTop:22}},
            ['IG','TK','WA','YT'].map(s=>React.createElement('button',{key:s,style:{width:32,height:32,border:'1px solid rgba(184,151,90,0.25)',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.5rem',letterSpacing:'0.08em',textTransform:'uppercase',color:'#C4A882',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}},s))
          )
        ),
        [
          ['Tienda', SHOP],
          ['Ayuda', HELP],
          ['Luminae', BRAND],
        ].map(([title,items])=>React.createElement('div',{key:title},
          React.createElement('div',{style:{fontSize:'0.58rem',letterSpacing:'0.28em',textTransform:'uppercase',color:'#B8975A',marginBottom:18}},title),
          React.createElement('ul',{style:{listStyle:'none',padding:0}},items.map(([l,target])=>React.createElement('li',{key:l,style:{marginBottom:10}},
            React.createElement('button',{onClick:()=>setPage(target),style:{background:'none',border:'none',padding:0,color:'rgba(196,168,130,0.65)',fontSize:'0.875rem',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'color 0.2s'},
              onMouseEnter:e=>e.currentTarget.style.color='#F7F2EB',
              onMouseLeave:e=>e.currentTarget.style.color='rgba(196,168,130,0.65)'},l)
          )))
        ))
      ),
      React.createElement('div',{'data-r':'footer-bottom',style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:28,flexWrap:'wrap',gap:12}},
        React.createElement('p',{style:{fontSize:'0.52rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(196,168,130,0.32)'}},'© 2026 Luminae · Venezuela & Latinoamérica · Todos los derechos reservados'),
        React.createElement('div',{style:{display:'flex',gap:5}},['Zelle','Binance','Zinli','PayPal','USD'].map(m=>React.createElement('span',{key:m,style:{fontSize:'0.52rem',letterSpacing:'0.1em',textTransform:'uppercase',border:'1px solid rgba(196,168,130,0.18)',padding:'2px 7px',color:'rgba(196,168,130,0.48)',fontFamily:"'Plus Jakarta Sans',sans-serif"}},m)))
      )
    )
  );
}

function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, setPage }) {
  if (!isOpen) return null;
  const total = items.reduce((s,i) => s + parseFloat(i.price)*i.qty, 0);
  return React.createElement(React.Fragment, null,
    React.createElement('div', { onClick:onClose, style:{ position:'fixed',inset:0,background:'rgba(44,36,22,0.5)',zIndex:40,animation:'fadeIn 0.3s ease' } }),
    React.createElement('aside', {
      'data-r':'cart-drawer',
      style:{ position:'fixed',top:0,right:0,bottom:0,width:'min(420px,100vw)',background:'#F7F2EB',zIndex:50,display:'flex',flexDirection:'column',boxShadow:'0 20px 60px rgba(44,36,22,0.14)',animation:'slideLeft 0.35s cubic-bezier(0.4,0,0.2,1)' }
    },
      React.createElement('div', { style:{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid rgba(196,168,130,0.2)' } },
        React.createElement('div', null,
          React.createElement('h2', { style:{ fontFamily:"'Satoshi',sans-serif",fontSize:'1.3rem',fontWeight:900,color:'#2C2416' } }, 'Tu carrito'),
          React.createElement('p', { style:{ fontSize:'0.55rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#C4A882',marginTop:3 } }, `${items.length} ${items.length===1?'producto':'productos'}`)
        ),
        React.createElement('button', { onClick:onClose, style:{ background:'none',border:'none',cursor:'pointer',color:'#C4A882',padding:4,display:'flex' } },
          React.createElement(XIcon,{width:20,height:20})
        )
      ),
      React.createElement('div', { style:{ flex:1,overflowY:'auto' } },
        items.length === 0
          ? React.createElement('div', { style:{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:20,padding:32,textAlign:'center' } },
              React.createElement(BagIcon, { style:{ width:48,height:48,color:'#C4A882',opacity:0.3 } }),
              React.createElement('p', { style:{ fontFamily:"'Satoshi',sans-serif",fontSize:'1.2rem',fontWeight:900,color:'#2C2416' } }, 'Tu carrito está vacío'),
              React.createElement('p', { style:{ fontSize:'0.8rem',color:'#6A5A42',lineHeight:1.7,maxWidth:260 } }, 'Descubre nuestra selección curada de skincare y perfumería'),
              React.createElement('button', { onClick:()=>{ onClose(); setPage&&setPage({name:'catalog',cat:'all'}); }, style:{ padding:'14px 28px',background:'#2C2416',color:'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase'} }, 'Explorar catálogo')
            )
          : React.createElement('ul', { style:{ listStyle:'none',padding:0 } },
              items.map(item => React.createElement('li', { key:item.id, style:{ display:'flex',gap:14,padding:'16px 24px',borderBottom:'1px solid rgba(196,168,130,0.12)' } },
                React.createElement('div', { style:{ width:68,height:68,flexShrink:0,background:item.bg||'#E8DDD0',display:'flex',alignItems:'center',justifyContent:'center' } },
                  React.createElement('span', { style:{ fontSize:'1.4rem',color:'rgba(44,36,22,0.1)',fontFamily:"'Satoshi',sans-serif" } }, '◈')
                ),
                React.createElement('div', { style:{ flex:1,minWidth:0 } },
                  React.createElement('p', { style:{ fontSize:'0.55rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#C4A882',marginBottom:3 } }, item.vendor),
                  React.createElement('p', { style:{ fontFamily:"'Satoshi',sans-serif",fontSize:'0.9rem',color:'#2C2416',lineHeight:1.3,marginBottom:8 } }, item.title),
                  React.createElement('div', { style:{ display:'flex',alignItems:'center',justifyContent:'space-between' } },
                    React.createElement('span', { style:{ fontSize:'0.875rem',fontWeight:500,color:'#2C2416' } }, `$${(parseFloat(item.price)*item.qty).toFixed(2)}`),
                    React.createElement('div', { style:{ display:'flex',alignItems:'center',gap:6 } },
                      React.createElement('div', { style:{ display:'flex',alignItems:'center',border:'1px solid rgba(196,168,130,0.3)' } },
                        React.createElement('button',{onClick:()=>onUpdateQty(item.id,item.qty-1),style:{padding:'3px 8px',background:'none',border:'none',cursor:'pointer',color:'#6A5A42',fontSize:'0.75rem'}},'−'),
                        React.createElement('span',{style:{padding:'0 8px',fontSize:'0.85rem',color:'#2C2416',minWidth:24,textAlign:'center'}},item.qty),
                        React.createElement('button',{onClick:()=>onUpdateQty(item.id,item.qty+1),style:{padding:'3px 8px',background:'none',border:'none',cursor:'pointer',color:'#6A5A42',fontSize:'0.75rem'}},'+')
                      ),
                      React.createElement('button',{onClick:()=>onRemove(item.id),style:{padding:3,background:'none',border:'none',cursor:'pointer',color:'#C4A882',display:'flex'}},
                        React.createElement('svg',{width:13,height:13,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5},
                          React.createElement('polyline',{points:'3 6 5 6 21 6'}),React.createElement('path',{d:'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2'}))
                      )
                    )
                  )
                )
              ))
            )
      ),
      items.length > 0 && React.createElement('div', { style:{ padding:'18px 24px',borderTop:'1px solid rgba(196,168,130,0.2)' } },
        React.createElement('div', { style:{ display:'flex',justifyContent:'space-between',fontSize:'0.875rem',marginBottom:6 } },
          React.createElement('span',{style:{color:'#6A5A42'}},'Subtotal'),
          React.createElement('span',{style:{color:'#2C2416'}},`$${total.toFixed(2)}`)
        ),
        React.createElement('div', { style:{ display:'flex',justifyContent:'space-between',fontSize:'0.75rem',marginBottom:14 } },
          React.createElement('span',{style:{color:'#6A5A42'}},'Envío'),
          React.createElement('span',{style:{color:'#7A8C6E'}},'Calculado al finalizar')
        ),
        React.createElement('div',{style:{height:1,background:'linear-gradient(90deg,transparent,#C4A882,transparent)',opacity:0.3,marginBottom:14}}),
        React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}},
          React.createElement('span',{style:{fontFamily:"'Satoshi',sans-serif",fontSize:'1.2rem',fontWeight:900,color:'#2C2416'}},'Total'),
          React.createElement('span',{style:{fontWeight:500,fontSize:'1.1rem',color:'#2C2416'}},`$${total.toFixed(2)} USD`)
        ),
        React.createElement('button',{onClick:()=>{ onClose(); setPage&&setPage({name:'checkout'}); },style:{display:'block',width:'100%',padding:'14px',background:'#2C2416',color:'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:8}},'Finalizar compra →'),
        React.createElement('button',{onClick:onClose,style:{display:'block',width:'100%',padding:'13px',background:'transparent',color:'#2C2416',border:'1px solid rgba(44,36,22,0.25)',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase'}},'Seguir comprando')
      )
    )
  );
}

Object.assign(window, { Header, Footer, CartDrawer });
