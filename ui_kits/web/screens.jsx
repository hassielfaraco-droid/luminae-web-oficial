/* ── Home, PDP, Account, Checkout ─────────────────────── */

function HomePage({ setPage, onAddToCart, favs, toggleFav }) {
  const offers = PRODUCTS.filter(p => p.tag === 'sale' || p.comparePrice).slice(0, 5);
  return React.createElement('div',{style:{animation:'fadeUp 0.45s ease both'}},
    React.createElement('div',{'data-r':'home-hero',style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:0,height:420}},
      React.createElement('div',{onClick:()=>setPage({name:'catalog',cat:'skincare'}),style:{position:'relative',background:'linear-gradient(160deg,#C4A882,#8E7458)',cursor:'pointer',overflow:'hidden',display:'flex',alignItems:'flex-end'}},
        React.createElement('div',{style:{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:0.12}},
          React.createElement('span',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'14rem',color:'#2C2416',fontWeight:300,lineHeight:1,fontStyle:'italic'}},'✦')),
        React.createElement('div',{style:{padding:28,background:'linear-gradient(to top, rgba(44,36,22,0.7) 0%, transparent 100%)',width:'100%'}},
          React.createElement('p',{style:{fontSize:'0.6rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'#D4AD6A',marginBottom:8}},'Nueva temporada'),
          React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:300,color:'#F7F2EB',lineHeight:1.15,marginBottom:10}},'Tratamientos que transforman tu piel'),
          React.createElement('span',{style:{fontSize:'0.62rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'#F7F2EB',fontFamily:"'Plus Jakarta Sans',sans-serif",borderBottom:'1px solid rgba(247,242,235,0.5)',paddingBottom:2}},'EXPLORAR SKINCARE →'))
      ),
      React.createElement('div',{onClick:()=>setPage({name:'catalog',cat:'ofertas'}),style:{position:'relative',background:'#2C2416',cursor:'pointer',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}},
        React.createElement('div',{style:{textAlign:'center',padding:'0 32px',position:'relative',zIndex:1}},
          React.createElement('p',{style:{fontSize:'0.55rem',letterSpacing:'0.35em',textTransform:'uppercase',color:'#B8975A',marginBottom:20}},'Ofertas especiales'),
          React.createElement('div',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'5.5rem',fontWeight:300,color:'#F7F2EB',lineHeight:1}},
            React.createElement('span',{style:{fontSize:'2rem',verticalAlign:'super',color:'#B8975A'}},'hasta '),
            '40',
            React.createElement('span',{style:{fontSize:'2.5rem',color:'#B8975A'}},'%')),
          React.createElement('div',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.5rem',fontWeight:400,color:'#F7F2EB',lineHeight:1.2,marginTop:4,fontStyle:'italic'}},'Off en favoritas'),
          React.createElement('div',{style:{marginTop:24,display:'inline-flex',alignItems:'center',padding:'10px 24px',background:'#B8975A',color:'#2C2416',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.22em',textTransform:'uppercase'}},'Ver ofertas →'))
      ),
      React.createElement('div',{onClick:()=>setPage({name:'catalog',cat:'perfumeria'}),style:{position:'relative',background:'linear-gradient(200deg,#1A150D,#3A2E1E)',cursor:'pointer',overflow:'hidden',display:'flex',alignItems:'flex-end'}},
        React.createElement('div',{style:{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:0.08}},
          React.createElement('span',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'14rem',color:'#B8975A',fontWeight:300,lineHeight:1}},'◈')),
        React.createElement('div',{style:{padding:28,background:'linear-gradient(to top,rgba(26,21,13,0.85) 0%,transparent 100%)',width:'100%'}},
          React.createElement('p',{style:{fontSize:'0.6rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'#B8975A',marginBottom:8}},'Colección'),
          React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:300,color:'#F7F2EB',lineHeight:1.15,marginBottom:10}},'Perfumería de autor'),
          React.createElement('span',{style:{fontSize:'0.62rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'#B8975A',fontFamily:"'Plus Jakarta Sans',sans-serif",borderBottom:'1px solid rgba(184,151,90,0.4)',paddingBottom:2}},'DESCUBRIR →'))
      )
    ),
    React.createElement('div',{style:{background:'#F7F2EB',padding:'52px 0 48px'}},
      React.createElement('div',{style:{maxWidth:1280,margin:'0 auto',padding:'0 40px'}},
        React.createElement('div',{style:{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:28}},
          React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#2C2416'}},'Elegidos para ti'),
          React.createElement('button',{onClick:()=>setPage({name:'catalog',cat:'all'}),style:{background:'none',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A'}},'Ver todo')),
        React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:16}},
          PRODUCTS.slice(0,6).map(p=>React.createElement(ProductCard,{key:p.id,product:p,onAddToCart,isFav:favs.has(p.id),toggleFav,onClick:prod=>setPage({name:'pdp',product:prod})})))
      )
    ),
    React.createElement('div',{style:{height:1,background:'linear-gradient(90deg,transparent,#C4A882,transparent)',opacity:0.25,margin:'0 64px'}}),
    React.createElement('div',{style:{background:'#F0E8DA',padding:'52px 0'}},
      React.createElement('div',{style:{maxWidth:1280,margin:'0 auto',padding:'0 40px'}},
        React.createElement('div',{style:{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:28}},
          React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:400,color:'#2C2416'}},'Ofertas de belleza'),
          React.createElement('button',{onClick:()=>setPage({name:'catalog',cat:'ofertas'}),style:{background:'none',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A'}},`Ver todas (${PRODUCTS.filter(p=>p.tag==='sale'||p.comparePrice).length})`)),
        React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}},
          offers.map(p=>React.createElement(ProductCard,{key:p.id,product:p,onAddToCart,isFav:favs.has(p.id),toggleFav,onClick:prod=>setPage({name:'pdp',product:prod})})))
      )
    ),
    React.createElement(Footer,{setPage})
  );
}

function PDPPage({ product, setPage, onAddToCart, favs, toggleFav }) {
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [variant, setVariant] = React.useState('50 ML');
  const [activeThumb, setActiveThumb] = React.useState(0);
  const variants = ['30 ML','50 ML','100 ML'];
  const isFav = favs.has(product.id);

  const handleAdd = () => { onAddToCart({...product,qty}); setAdded(true); setTimeout(()=>setAdded(false),2000); };

  return React.createElement('div',{style:{animation:'fadeUp 0.4s ease both'}},
    React.createElement('div',{style:{maxWidth:1280,margin:'0 auto',padding:'28px 48px 80px'}},
      React.createElement('div',{style:{display:'flex',gap:6,alignItems:'center',marginBottom:32}},
        ['Inicio',CAT_LABELS[product.cat]||'Catálogo',product.vendor].map((label,i)=>React.createElement(React.Fragment,{key:i},
          i>0&&React.createElement('span',{style:{color:'#C4A882',fontSize:'0.65rem'}},'›'),
          React.createElement('button',{onClick:()=>i===0?setPage({name:'home'}):i===1?setPage({name:'catalog',cat:product.cat||'all'}):null,
            style:{background:'none',border:'none',cursor:i<2?'pointer':'default',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.15em',textTransform:'uppercase',color:i===2?'#2C2416':'#C4A882'}},label)))),
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64}},
        React.createElement('div',null,
          React.createElement('div',{style:{aspectRatio:'1',background:product.bg||'#E8DDD0',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12,position:'relative'}},
            React.createElement('span',{style:{fontSize:'10rem',color:'rgba(44,36,22,0.06)',fontFamily:"'Cormorant Garamond',serif"}},'◈')),
          React.createElement('div',{'data-r':'pdp-thumbs',style:{display:'flex',gap:8}},
            [0,1,2,3].map(i=>React.createElement('div',{key:i,onClick:()=>setActiveThumb(i),style:{width:72,height:72,background:i===activeThumb?product.bg:'#E8DDD0',outline:i===activeThumb?'2px solid #2C2416':'1px solid rgba(196,168,130,0.2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}},
              React.createElement('span',{style:{fontSize:'1.2rem',color:'rgba(44,36,22,0.08)',fontFamily:"'Cormorant Garamond',serif"}},'◈'))))
        ),
        React.createElement('div',null,
          React.createElement('p',{style:{fontSize:'0.58rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'#C4A882',marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif"}},product.vendor),
          React.createElement('h1',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2.2rem',fontWeight:400,color:'#2C2416',lineHeight:1.15,marginBottom:12}},product.title),
          React.createElement('div',{style:{display:'flex',alignItems:'center',gap:10,marginBottom:18}},
            React.createElement(Stars,{rating:product.rating}),
            React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.7rem',color:'#6A5A42'}},`${product.rating} · ${product.reviews.toLocaleString()} reseñas`)),
          React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12,marginBottom:24}},
            React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'1.5rem',fontWeight:500,color:'#2C2416'}},`$${product.price} USD`),
            product.comparePrice&&React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'1rem',color:'#C4A882',textDecoration:'line-through'}},`$${product.comparePrice}`)),
          React.createElement('div',{style:{height:1,background:'linear-gradient(90deg,transparent,#C4A882,transparent)',opacity:0.3,marginBottom:24}}),
          React.createElement('div',{style:{marginBottom:24}},
            React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'#6A5A42',marginBottom:10}},`Tamaño: ${variant}`),
            React.createElement('div',{style:{display:'flex',gap:8}},
              variants.map(v=>React.createElement('button',{key:v,onClick:()=>setVariant(v),style:{padding:'9px 16px',border:'1px solid',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',background:variant===v?'rgba(44,36,22,0.05)':'transparent',color:variant===v?'#2C2416':'#6A5A42',borderColor:variant===v?'#2C2416':'rgba(196,168,130,0.3)'}},v)))),
          React.createElement('div',{style:{display:'flex',gap:10,marginBottom:12}},
            React.createElement('div',{style:{display:'flex',alignItems:'center',border:'1px solid rgba(196,168,130,0.3)'}},
              React.createElement('button',{onClick:()=>setQty(Math.max(1,qty-1)),style:{padding:'12px 16px',background:'none',border:'none',cursor:'pointer',color:'#6A5A42',fontSize:'1rem'}},'−'),
              React.createElement('span',{style:{padding:'0 14px',fontSize:'0.9rem',color:'#2C2416',minWidth:36,textAlign:'center',fontFamily:"'Plus Jakarta Sans',sans-serif"}},qty),
              React.createElement('button',{onClick:()=>setQty(qty+1),style:{padding:'12px 16px',background:'none',border:'none',cursor:'pointer',color:'#6A5A42',fontSize:'1rem'}},'+')),
            React.createElement('button',{onClick:handleAdd,style:{flex:1,padding:'14px',background:added?'#B8975A':'#2C2416',color:added?'#2C2416':'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase'}},added?'✓ Agregado al carrito':'Agregar al carrito')),
          React.createElement('button',{onClick:()=>toggleFav(product.id),style:{width:'100%',padding:'13px',background:isFav?'rgba(184,151,90,0.1)':'transparent',color:'#2C2416',border:`1px solid ${isFav?'#B8975A':'rgba(44,36,22,0.25)'}`,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'center',gap:8}},
            React.createElement(HeartIcon,{filled:isFav,width:14,height:14}), isFav?'En tus favoritos':'Agregar a favoritos'),
          React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}},
            [['🚚','Envío rápido a Venezuela'],['🔒','Compra 100% segura'],['💬','Asesoría por WhatsApp'],['↩','Sin complicaciones']].map(([icon,text])=>
              React.createElement('div',{key:text,style:{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:'1px solid rgba(196,168,130,0.2)'}},
                React.createElement('span',{style:{fontSize:'0.9rem'}},icon),
                React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',color:'#6A5A42'}},text))))
        )
      ),
      React.createElement('div',{style:{marginTop:64}},
        React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#2C2416',marginBottom:28}},'También te puede gustar'),
        React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}},
          PRODUCTS.filter(p=>p.id!==product.id&&p.cat===product.cat).slice(0,4).map(p=>React.createElement(ProductCard,{key:p.id,product:p,onAddToCart,isFav:favs.has(p.id),toggleFav,onClick:prod=>setPage({name:'pdp',product:prod})}))))
    ),
    React.createElement(Footer,{setPage})
  );
}

function AccountPage({ setPage, initialTab='datos', favs, toggleFav, onAddToCart }) {
  const [tab, setTab] = React.useState(initialTab);
  React.useEffect(()=>{ if(initialTab) setTab(initialTab); }, [initialTab]);
  const TABS = [
    { id:'datos', label:'Mis datos', icon:'👤' },
    { id:'ordenes', label:'Mis órdenes', icon:'📦' },
    { id:'favoritos', label:'Favoritos', icon:'♡' },
    { id:'direcciones', label:'Direcciones', icon:'📍' },
  ];
  const sideItem = (t) => React.createElement('button',{key:t.id,onClick:()=>setTab(t.id),
    style:{display:'flex',alignItems:'center',gap:12,padding:'13px 20px',background:tab===t.id?'rgba(184,151,90,0.08)':'transparent',
    border:'none',borderLeft:`2px solid ${tab===t.id?'#B8975A':'transparent'}`,cursor:'pointer',width:'100%',textAlign:'left',
    fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.75rem',letterSpacing:'0.08em',color:tab===t.id?'#2C2416':'#6A5A42'}},
    t.icon, ' ', t.label);

  const DatosTab = () => React.createElement('div',null,
    React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#2C2416',marginBottom:28}},'Información personal'),
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}},
      [['Nombre','María'],['Apellido','González'],['Correo','maria@gmail.com'],['Teléfono','+58 412-442-8894'],['País','Venezuela'],['Ciudad','Caracas']].map(([label,val])=>
        React.createElement('div',{key:label},
          React.createElement('label',{style:{display:'block',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.58rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A',marginBottom:6}},label),
          React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.875rem',color:'#2C2416',padding:'10px 0',borderBottom:'1px solid rgba(196,168,130,0.15)'}},val)))));

  const OrdenesTab = () => React.createElement('div',null,
    React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#2C2416',marginBottom:28}},'Historial de órdenes'),
    React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:12}},
      ORDERS.map(o=>React.createElement('div',{key:o.id,style:{background:'#F0E8DA',border:'1px solid rgba(196,168,130,0.18)',padding:'20px 24px'}},
        React.createElement('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:8}},
          React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.2em',color:'#2C2416',fontWeight:500}},o.id),
          React.createElement('span',{style:{background:'rgba(122,140,110,0.12)',color:'#7A8C6E',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.6rem',letterSpacing:'0.15em',textTransform:'uppercase',padding:'3px 10px'}},o.status)),
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.75rem',color:'#6A5A42'}},`${o.date} · ${o.total} · ${o.items.join(' · ')}`)))));

  const FavoritosTab = () => {
    const items = PRODUCTS.filter(p=>favs.has(p.id));
    return React.createElement('div',null,
      React.createElement('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:24}},
        React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#2C2416'}},'Mis favoritos'),
        React.createElement('button',{onClick:()=>setPage({name:'favorites'}),style:{padding:'8px 16px',background:'transparent',color:'#B8975A',border:'1px solid rgba(184,151,90,0.4)',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.6rem',letterSpacing:'0.18em',textTransform:'uppercase'}},'Ver todos →')),
      items.length === 0
        ? React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',color:'#6A5A42',padding:'40px 0'}},'Aún no tienes favoritos.')
        : React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}},
            items.slice(0,6).map(p=>React.createElement(ProductCard,{key:p.id,product:p,onAddToCart,isFav:true,toggleFav,onClick:prod=>setPage({name:'pdp',product:prod})}))));
  };

  const DireccionesTab = () => React.createElement('div',null,
    React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#2C2416',marginBottom:28}},'Mis direcciones'),
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}},
      ADDRESSES.map(a=>React.createElement('div',{key:a.id,style:{border:`1px solid ${a.default?'#B8975A':'rgba(196,168,130,0.25)'}`,padding:'20px 22px',background:a.default?'rgba(184,151,90,0.04)':'transparent'}},
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#B8975A',marginBottom:8}},a.label),
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.875rem',fontWeight:500,color:'#2C2416',marginBottom:4}},a.name),
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.8rem',color:'#6A5A42',lineHeight:1.6}},a.address),
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.8rem',color:'#6A5A42'}},`${a.city} · ${a.phone}`)))));

  const CONTENT = { datos:DatosTab, ordenes:OrdenesTab, favoritos:FavoritosTab, direcciones:DireccionesTab };
  const C = CONTENT[tab] || DatosTab;

  return React.createElement('div',{style:{animation:'fadeUp 0.4s ease both'}},
    React.createElement('div',{'data-r':'account-hero',style:{background:'#2C2416',padding:'36px 48px',display:'flex',alignItems:'center',gap:20}},
      React.createElement('div',{style:{width:52,height:52,borderRadius:'50%',background:'rgba(184,151,90,0.2)',border:'1px solid rgba(184,151,90,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#B8975A',fontFamily:"'Cormorant Garamond',serif",fontSize:'1.5rem'}},'M'),
      React.createElement('div',null,
        React.createElement('h1',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.8rem',fontWeight:400,color:'#F7F2EB',lineHeight:1}},'Hola, María'),
        React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#B8975A',marginTop:4}},'maria@gmail.com'))),
    React.createElement('div',{style:{maxWidth:1280,margin:'0 auto',padding:'40px 48px 80px',display:'grid',gridTemplateColumns:'220px 1fr',gap:40}},
      React.createElement('aside',{style:{background:'#F0E8DA',border:'1px solid rgba(196,168,130,0.2)',alignSelf:'start'}},
        TABS.map(sideItem)),
      React.createElement('div',{style:{background:'#F0E8DA',border:'1px solid rgba(196,168,130,0.18)',padding:'32px 36px'}},
        React.createElement(C))),
    React.createElement(Footer,{setPage}));
}

function CheckoutPage({ setPage, items }) {
  const total = items.reduce((s,i)=>s+parseFloat(i.price)*i.qty,0);
  return React.createElement('div',{style:{animation:'fadeUp 0.4s ease both'}},
    React.createElement('div',{style:{maxWidth:1100,margin:'0 auto',padding:'40px 40px 80px'}},
      React.createElement('h1',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'2.5rem',fontWeight:400,color:'#2C2416',marginBottom:32}},'Finalizar compra'),
      items.length === 0
        ? React.createElement('div',{style:{textAlign:'center',padding:'60px 0',background:'#F0E8DA'}},
            React.createElement('p',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.5rem',color:'#2C2416',marginBottom:16}},'Tu carrito está vacío'),
            React.createElement('button',{onClick:()=>setPage({name:'catalog',cat:'all'}),style:{padding:'12px 28px',background:'#2C2416',color:'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.65rem',letterSpacing:'0.22em',textTransform:'uppercase'}},'Explorar catálogo'))
        : React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:36}},
            React.createElement('div',{style:{background:'#F0E8DA',padding:32}},
              React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.4rem',fontWeight:400,color:'#2C2416',marginBottom:18}},'Datos de envío'),
              React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',color:'#6A5A42',marginBottom:14}},'(Demo) Pre-llenado con tu dirección por defecto.'),
              React.createElement('div',{style:{padding:16,background:'rgba(255,255,255,0.5)',border:'1px solid rgba(196,168,130,0.2)',marginBottom:24}},
                React.createElement('p',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',color:'#2C2416'}},'María González · Av. Francisco de Miranda · Caracas')),
              React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.4rem',fontWeight:400,color:'#2C2416',marginBottom:18}},'Método de pago'),
              React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}},
                ['Zelle','Binance','Zinli','PayPal'].map(m=>React.createElement('label',{key:m,style:{display:'flex',alignItems:'center',gap:10,padding:14,border:'1px solid rgba(196,168,130,0.3)',cursor:'pointer'}},
                  React.createElement('input',{type:'radio',name:'pay',defaultChecked:m==='Zelle'}),
                  React.createElement('span',{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.85rem',color:'#2C2416'}},m))))),
            React.createElement('div',{style:{background:'#F0E8DA',padding:32,alignSelf:'start'}},
              React.createElement('h2',{style:{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.4rem',fontWeight:400,color:'#2C2416',marginBottom:18}},'Tu pedido'),
              items.map(i=>React.createElement('div',{key:i.id,style:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(196,168,130,0.15)',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.78rem'}},
                React.createElement('span',{style:{color:'#2C2416'}},`${i.title} ×${i.qty}`),
                React.createElement('span',{style:{color:'#2C2416',fontWeight:500}},`$${(i.price*i.qty).toFixed(2)}`))),
              React.createElement('div',{style:{display:'flex',justifyContent:'space-between',padding:'14px 0',marginTop:8,borderTop:'1px solid rgba(196,168,130,0.3)',fontFamily:"'Cormorant Garamond',serif",fontSize:'1.3rem',color:'#2C2416'}},
                React.createElement('span',null,'Total'),
                React.createElement('span',null,`$${total.toFixed(2)}`)),
              React.createElement('button',{onClick:()=>{alert('¡Gracias! Te confirmaremos por WhatsApp.');setPage({name:'home'});},style:{width:'100%',padding:14,background:'#2C2416',color:'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase',marginTop:14}},'Confirmar pedido →'))
          )),
    React.createElement(Footer,{setPage}));
}

Object.assign(window, { HomePage, PDPPage, AccountPage, CheckoutPage });
