import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Announce */}
      <div style={{background:'#2C2416',color:'#C4A882',textAlign:'center',padding:'10px 20px',fontSize:'0.7rem',letterSpacing:'0.25em',textTransform:'uppercase'}}>
        🌿 Envíos a toda Venezuela &nbsp;·&nbsp; <span style={{color:'#B8975A'}}>Paga con Zelle, Binance o transferencia</span> &nbsp;·&nbsp; Envío gratis en pedidos +$60
      </div>

      {/* Hero */}
      <section style={{minHeight:'90vh',display:'flex',alignItems:'center',background:'linear-gradient(135deg,#f0e8da 0%,#f7f2eb 50%,#ede5d8 100%)',position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 60px',textAlign:'center'}}>
          <p style={{fontSize:'0.65rem',letterSpacing:'0.4em',textTransform:'uppercase',color:'#B8975A',marginBottom:'24px'}}>
            Nueva colección 2026
          </p>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(3rem,6vw,6rem)',fontWeight:300,color:'#2C2416',lineHeight:1.05,marginBottom:'24px'}}>
            Tu piel merece<br/>
            la <em style={{fontStyle:'italic',color:'#B8975A'}}>luz</em> que<br/>
            siempre buscaste
          </h1>
          <p style={{fontSize:'1rem',color:'#6A5A42',maxWidth:'480px',margin:'0 auto 48px',lineHeight:1.8}}>
            Skincare curado, perfumería consciente y wellness para la piel venezolana y latina. Ingredientes reales. Resultados reales.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/collections" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'16px 40px',background:'#2C2416',color:'#F7F2EB',textDecoration:'none',fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase'}}>
              Explorar catálogo →
            </Link>
            <Link href="/ai" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'15px 36px',background:'transparent',color:'#2C2416',border:'1px solid rgba(44,36,22,0.25)',textDecoration:'none',fontSize:'0.68rem',letterSpacing:'0.22em',textTransform:'uppercase'}}>
              ✦ Diagnóstico IA
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div style={{background:'#2C2416',display:'flex',overflowX:'auto'}}>
        {['Skincare','Perfumería','Wellness','Marcas','Ofertas','Sets','IA Skin','Blog'].map(cat => (
          <Link key={cat} href={cat === 'IA Skin' ? '/ai' : cat === 'Blog' ? '/blog' : `/collections/${cat.toLowerCase()}`}
            style={{flex:'1',minWidth:'100px',padding:'18px 20px',textAlign:'center',textDecoration:'none',color:'#C4A882',fontSize:'0.65rem',letterSpacing:'0.2em',textTransform:'uppercase',borderRight:'1px solid rgba(196,168,130,0.1)',whiteSpace:'nowrap',transition:'all 0.3s'}}>
            {cat}
          </Link>
        ))}
      </div>
    </div>
  )
}
