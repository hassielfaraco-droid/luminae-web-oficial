/* ── Product card with global favorites + cart ───────────── */

function ProductCard({ product, onAddToCart, onClick, isFav, toggleFav }) {
  const [hovered, setHovered] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const TAG = { new:['Nuevo','#2C2416','#B8975A'], sale:['Oferta','#8B2020','#fff'], best:['Bestseller','#7A8C6E','#fff'] };

  return React.createElement('div', {
    onClick: () => onClick && onClick(product),
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style:{ background:'#F7F2EB', outline:'1px solid rgba(196,168,130,0.18)', cursor:'pointer',
    transform: hovered?'translateY(-3px)':'translateY(0)', transition:'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }
  },
    React.createElement('div', { style:{ aspectRatio:'1',position:'relative',overflow:'hidden',background:product.bg||'#E8DDD0',display:'flex',alignItems:'center',justifyContent:'center' } },
      React.createElement('div', {
        style:{ width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',
        transform:hovered?'scale(1.05)':'scale(1)',transition:'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }
      },
        React.createElement('span',{style:{fontSize:'3.5rem',color:'rgba(44,36,22,0.07)',fontFamily:"'Satoshi',sans-serif"}},'◈')
      ),
      product.tag && TAG[product.tag] && React.createElement('div',{style:{position:'absolute',top:10,left:10,fontSize:'0.55rem',letterSpacing:'0.2em',textTransform:'uppercase',fontWeight:500,padding:'3px 8px',background:TAG[product.tag][1],color:TAG[product.tag][2]}},TAG[product.tag][0]),
      React.createElement('button',{
        onClick:e=>{e.stopPropagation();toggleFav&&toggleFav(product.id);},
        title: isFav?'Quitar de favoritos':'Agregar a favoritos',
        style:{position:'absolute',top:10,right:10,width:30,height:30,borderRadius:'50%',background:'rgba(247,242,235,0.92)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',opacity:(hovered||isFav)?1:0,transition:'opacity 0.2s'}
      }, React.createElement(HeartIcon,{filled:!!isFav,width:13,height:13})),
      React.createElement('div',{style:{position:'absolute',bottom:0,left:0,right:0,display:'flex',justifyContent:'center',padding:'0 0 12px',transform:hovered?'translateY(0)':'translateY(100%)',transition:'transform 0.28s cubic-bezier(0.4,0,0.2,1)'}},
        React.createElement('button',{onClick:handleAdd,style:{padding:'9px 18px',background:added?'#B8975A':'#2C2416',color:added?'#2C2416':'#F7F2EB',border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.62rem',letterSpacing:'0.18em',textTransform:'uppercase',minWidth:150,justifyContent:'center',transition:'background 0.3s,color 0.3s'}},added?'✓ Agregado':'Agregar al carrito')
      )
    ),
    React.createElement('div',{style:{padding:'12px 14px'}},
      React.createElement('p',{style:{fontSize:'0.55rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'#C4A882',marginBottom:4}},product.vendor),
      React.createElement('h3',{style:{fontFamily:"'Satoshi',sans-serif",fontSize:'0.95rem',fontWeight:500,color:hovered?'#B8975A':'#2C2416',lineHeight:1.35,marginBottom:6,transition:'color 0.2s',minHeight:'2.5em',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}},product.title),
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:5,marginBottom:4}},
        React.createElement(Stars,{rating:product.rating}),
        React.createElement('span',{style:{fontSize:'0.6rem',color:'#C4A882',fontFamily:"'Plus Jakarta Sans',sans-serif"}},`(${product.reviews.toLocaleString()})`)
      ),
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
        React.createElement('span',{style:{fontSize:'0.9rem',fontWeight:500,color:'#2C2416',fontFamily:"'Plus Jakarta Sans',sans-serif"}},`$${product.price}`),
        product.comparePrice && React.createElement('span',{style:{fontSize:'0.75rem',color:'#C4A882',textDecoration:'line-through',fontFamily:"'Plus Jakarta Sans',sans-serif"}},`$${product.comparePrice}`)
      )
    )
  );
}

window.ProductCard = ProductCard;
