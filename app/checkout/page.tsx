'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/* ─── Types & Data ───────────────────────────────────────────── */
interface CartItem { id:string; brand:string; name:string; variant:string; price:number; qty:number; color:string }

const INITIAL_ITEMS: CartItem[] = [
  { id:'i1', brand:'CeraVe',         name:'Crema Hidratante SPF 30',    variant:'52 ml', price:29.99, qty:1, color:'#d4ad6a' },
  { id:'i2', brand:'The Ordinary',   name:'Niacinamida 10% + Zinc 1%', variant:'30 ml', price:12.99, qty:2, color:'#e8ddd0' },
  { id:'i3', brand:'La Roche-Posay', name:'Anthelios SPF 50+ Fluido',  variant:'50 ml', price:34.99, qty:1, color:'#2c2416' },
]

const STEP_LABELS = ['', 'Continuar con datos →', 'Continuar con envío →', 'Continuar con pago →', 'Confirmar pedido →']
const SHIPPING_OPTS = [
  { id:'express',  label:'🚚 Express — Caracas',    desc:'24-48 horas hábiles',   price:8.00 },
  { id:'standard', label:'📦 Estándar — Venezuela', desc:'3-5 días hábiles',      price:5.00 },
  { id:'free',     label:'✦ Envío gratis +$60',    desc:'3-5 días hábiles',      price:0,   badge:true },
]
const PAY_METHODS = [
  { id:'zelle',   icon:'💸', name:'Zelle',       account:'pagos@luminae.store' },
  { id:'binance', icon:'🟡', name:'Binance Pay', account:'ID: 123456789'       },
  { id:'zinli',   icon:'💜', name:'Zinli',       account:'@luminae.store'      },
  { id:'paypal',  icon:'🔵', name:'PayPal',      account:'paypal@luminae.store'},
]

/* ─── Component ─────────────────────────────────────────────── */
export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [shipping, setShipping] = useState('express')
  const [payMethod, setPayMethod] = useState('zelle')
  const [promo, setPromo] = useState('')
  const [promoState, setPromoState] = useState<'idle'|'ok'|'err'>('idle')
  const [discount, setDiscount] = useState(0)
  const [form, setForm] = useState({ firstName:'',lastName:'',email:'',phone:'',state:'',city:'',address:'',reference:'',notes:'' })
  const [errors, setErrors] = useState<Record<string,boolean>>({})
  const [orderDone, setOrderDone] = useState(false)
  const [orderNum, setOrderNum] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(()=>setToast(''),2800) }

  const subtotal = items.reduce((s,i) => s + i.price*i.qty, 0)
  const shippingCost = SHIPPING_OPTS.find(s=>s.id===shipping)?.price ?? 8
  const total = subtotal - discount + shippingCost
  const needed = Math.max(0, 60 - subtotal)
  const freeShipPct = Math.min(100, (subtotal/60)*100)

  const changeQty = (id:string, d:number) => setItems(prev => prev.map(i => i.id===id ? {...i,qty:Math.max(1,i.qty+d)} : i))
  const removeItem = (id:string) => setItems(prev => prev.filter(i => i.id!==id))

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'LUMINAE10') { setDiscount(subtotal*0.1); setPromoState('ok') }
    else setPromoState('err')
  }

  const validateStep2 = () => {
    const req = ['firstName','lastName','email','phone','state','city','address']
    const errs: Record<string,boolean> = {}
    req.forEach(k => { if (!form[k as keyof typeof form]) errs[k] = true })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (step === 2 && !validateStep2()) return
    if (step >= 4) { placeOrder(); return }
    setStep(s => s+1)
    window.scrollTo({top:0,behavior:'smooth'})
  }
  const prevStep = () => { setStep(s=>s-1); window.scrollTo({top:0,behavior:'smooth'}) }

  const placeOrder = () => {
    const num = '#LUM-' + new Date().getFullYear() + '-' + Math.floor(Math.random()*9000+1000)
    setOrderNum(num); setOrderDone(true)
  }

  const stepState = (n:number) => n < step ? 'done' : n === step ? 'active' : 'pending'

  return (
    <>
      <style>{`
        .co-layout{max-width:1200px;margin:0 auto;padding:40px;display:grid;grid-template-columns:1fr 400px;gap:48px;align-items:start}
        .panel{border:1px solid rgba(196,168,130,.2)}
        .panel-head{padding:22px 28px;border-bottom:1px solid rgba(196,168,130,.15);display:flex;align-items:center;justify-content:space-between}
        .panel-title{font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--deep);font-weight:500}
        .steps-bar{background:var(--cream);border-bottom:1px solid rgba(196,168,130,.15);padding:20px 40px}
        .step-circle{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:600;flex-shrink:0;transition:all .3s}
        .step-circle.done{background:var(--moss);color:white}
        .step-circle.active{background:var(--deep);color:var(--gold)}
        .step-circle.pending{border:1px solid rgba(196,168,130,.3);color:var(--earth);background:transparent}
        .step-label{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}
        .cart-item{display:grid;grid-template-columns:80px 1fr auto;gap:18px;align-items:start;padding:20px 0;border-bottom:1px solid rgba(196,168,130,.1)}
        .ci-swatch{border-radius:50% 50% 30% 30% / 40% 40% 20% 20%}
        .ci-qty{display:flex;align-items:center;border:1px solid rgba(196,168,130,.25);width:fit-content;margin-top:10px}
        .ci-qty-btn{width:30px;height:30px;background:none;border:none;cursor:pointer;font-size:.9rem;color:var(--warm)}
        .ci-qty-btn:hover{color:var(--deep)}
        .f-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
        .f-lbl{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--warm)}
        .f-lbl span{color:var(--gold)}
        .f-inp{background:transparent;border:1px solid rgba(196,168,130,.3);padding:12px 14px;font-family:var(--font-body);font-size:.82rem;color:var(--deep);outline:none;transition:border-color .2s;width:100%}
        .f-inp:focus{border-color:var(--gold)}
        .f-inp.error{border-color:#8B2020}
        .f-inp::placeholder{color:rgba(196,168,130,.35)}
        .f-sel{background:var(--cream);border:1px solid rgba(196,168,130,.3);padding:12px 14px;font-family:var(--font-body);font-size:.82rem;color:var(--deep);outline:none;width:100%;appearance:none;cursor:pointer}
        .f-sel:focus{border-color:var(--gold)}
        .ship-opt{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1px solid rgba(196,168,130,.25);cursor:pointer;transition:all .2s;margin-bottom:10px;position:relative}
        .ship-opt:hover{border-color:var(--gold)}
        .ship-opt.selected{border-color:var(--deep);background:rgba(44,36,22,.02)}
        .ship-radio{width:18px;height:18px;border-radius:50%;border:1px solid rgba(196,168,130,.4);flex-shrink:0;display:flex;align-items:center;justify-content:center}
        .ship-opt.selected .ship-radio{background:var(--deep);border-color:var(--deep)}
        .pay-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
        .pay-m{padding:14px;border:1px solid rgba(196,168,130,.25);cursor:pointer;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
        .pay-m:hover{border-color:var(--gold)}
        .pay-m.selected{border-color:var(--deep);background:rgba(44,36,22,.02)}
        .pay-detail{border:1px solid rgba(196,168,130,.2);padding:16px;background:rgba(247,242,235,.5);margin-bottom:12px}
        .summary-panel{background:var(--light);border:1px solid rgba(196,168,130,.2);position:sticky;top:20px}
        .nav-btns{display:flex;gap:12px;justify-content:space-between;align-items:center}
        .prev-btn{background:transparent;border:1px solid rgba(196,168,130,.3);padding:13px 24px;font-family:var(--font-body);font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--warm);cursor:pointer;transition:all .2s}
        .prev-btn:hover{border-color:var(--deep);color:var(--deep)}
        .next-btn{flex:1;padding:15px 32px;background:var(--deep);color:var(--cream);border:none;font-family:var(--font-body);font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;transition:all .2s}
        .next-btn:hover{background:var(--gold);color:var(--deep)}
        .cta-btn{width:100%;padding:16px;background:var(--deep);color:var(--cream);border:none;cursor:pointer;font-family:var(--font-body);font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;transition:all .2s;margin-bottom:10px}
        .cta-btn:hover{background:var(--gold);color:var(--deep)}
        .success-overlay{position:fixed;inset:0;background:rgba(247,242,235,.97);z-index:100;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:40px}
        .success-icon{width:80px;height:80px;border-radius:50%;background:var(--moss);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:28px}
        .toast-fixed{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--deep);color:var(--cream);padding:13px 26px;font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;z-index:200;opacity:0;transition:all .4s;pointer-events:none;white-space:nowrap;display:flex;align-items:center;gap:9px}
        .toast-fixed.show{opacity:1;transform:translateX(-50%) translateY(0)}
        .fsb-bar{height:4px;background:rgba(196,168,130,.2);border-radius:2px;overflow:hidden;margin-top:6px}
        .fsb-fill{height:100%;background:var(--gold);border-radius:2px;transition:width .6s ease}
        @media(max-width:900px){.co-layout{grid-template-columns:1fr}}
        @media(max-width:600px){.co-layout{padding:24px 20px}.steps-bar{padding:16px 20px}}
      `}</style>

      <Header />

      {/* Breadcrumb */}
      <div style={{background:'var(--light)',borderBottom:'1px solid rgba(196,168,130,.15)',padding:'10px 40px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',gap:8,fontSize:'.62rem',color:'var(--earth)'}}>
          <a href="/" style={{color:'var(--warm)'}}>Inicio</a>
          <span style={{opacity:.4}}>›</span>
          <span style={{color:'var(--deep)'}}>Carrito & Checkout</span>
        </div>
      </div>

      {/* Steps */}
      <div className="steps-bar">
        <div style={{maxWidth:780,margin:'0 auto',display:'flex',alignItems:'center'}}>
          {['Carrito','Datos','Envío','Pago','Confirmación'].map((label,i) => (
            <div key={label} style={{display:'flex',alignItems:'center',flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div className={`step-circle ${stepState(i+1)}`}>
                  {stepState(i+1)==='done' ? '✓' : i+1}
                </div>
                <span className="step-label" style={{color:stepState(i+1)==='active'?'var(--deep)':stepState(i+1)==='done'?'var(--moss)':'var(--earth)',fontWeight:stepState(i+1)==='active'?500:300}}>
                  {label}
                </span>
              </div>
              {i < 4 && <div style={{flex:1,height:1,background:'rgba(196,168,130,.2)',margin:'0 14px'}} />}
            </div>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="co-layout">
        <div style={{display:'flex',flexDirection:'column',gap:28}}>

          {/* Step 1: Cart */}
          {step === 1 && (
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title">Mi carrito</span>
                <span style={{fontSize:'.62rem',color:'var(--earth)'}}>{items.length} productos</span>
              </div>
              <div style={{padding:'4px 28px 28px'}}>
                {items.length === 0 ? (
                  <div style={{textAlign:'center',padding:'48px 0'}}>
                    <div style={{fontSize:'3rem',marginBottom:16,opacity:.35}}>🛒</div>
                    <p style={{fontFamily:'var(--font-display)',fontSize:'1.6rem',color:'var(--deep)',marginBottom:8}}>Tu carrito está vacío</p>
                    <a href="/catalogo" className="btn-primary" style={{display:'inline-flex',marginTop:8}}>Explorar catálogo →</a>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="cart-item">
                      <div style={{width:80,height:80,background:'var(--beige)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <div className="ci-swatch" style={{width:40,height:56,background:`linear-gradient(160deg,${item.color}cc,${item.color})`}} />
                      </div>
                      <div>
                        <div style={{fontSize:'.58rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--earth)'}}>{item.brand}</div>
                        <div style={{fontFamily:'var(--font-display)',fontSize:'1rem',color:'var(--deep)',margin:'4px 0'}}>{item.name}</div>
                        <div style={{fontSize:'.68rem',color:'var(--warm)'}}>{item.variant}</div>
                        <div className="ci-qty">
                          <button className="ci-qty-btn" onClick={() => changeQty(item.id,-1)}>−</button>
                          <span style={{width:32,textAlign:'center',fontSize:'.8rem',color:'var(--deep)'}}>{item.qty}</span>
                          <button className="ci-qty-btn" onClick={() => changeQty(item.id,1)}>+</button>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
                        <span style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',color:'var(--deep)'}}>${(item.price*item.qty).toFixed(2)}</span>
                        <button onClick={() => removeItem(item.id)} style={{background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'rgba(196,168,130,.5)',transition:'color .2s'}}
                          onMouseEnter={e=>(e.currentTarget.style.color='#8B2020')}
                          onMouseLeave={e=>(e.currentTarget.style.color='rgba(196,168,130,.5)')}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {items.length > 0 && (
                  <div style={{display:'flex',gap:0,marginTop:20,borderTop:'1px solid rgba(196,168,130,.12)',paddingTop:20}}>
                    <input className="f-inp" placeholder="Código de descuento (LUMINAE10)" value={promo}
                      onChange={e=>setPromo(e.target.value)} style={{borderRight:'none',flex:1}} />
                    <button onClick={applyPromo} className="btn-primary" style={{padding:'12px 20px',whiteSpace:'nowrap'}}>Aplicar</button>
                  </div>
                )}
                {promoState === 'ok' && <p style={{fontSize:'.68rem',color:'var(--moss)',marginTop:8}}>✓ Código aplicado — 10% de descuento</p>}
                {promoState === 'err' && <p style={{fontSize:'.68rem',color:'#8B2020',marginTop:8}}>✕ Código inválido. Prueba con LUMINAE10</p>}
              </div>
            </div>
          )}

          {/* Step 2: Contact / Address */}
          {step === 2 && (
            <div className="panel">
              <div className="panel-head"><span className="panel-title">Datos de contacto y envío</span></div>
              <div style={{padding:28}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  {(['firstName','lastName','email','phone'] as const).map(k => (
                    <div key={k} className="f-group">
                      <label className="f-lbl">{({firstName:'Nombre',lastName:'Apellido',email:'Correo',phone:'WhatsApp'})[k]} <span>*</span></label>
                      <input className={`f-inp ${errors[k]?'error':''}`} value={form[k]}
                        onChange={e=>{ setForm(f=>({...f,[k]:e.target.value})); setErrors(er=>({...er,[k]:false})) }}
                        placeholder={({firstName:'María',lastName:'González',email:'maria@correo.com',phone:'+58 414 000-0000'})[k]} />
                      {errors[k] && <span style={{fontSize:'.62rem',color:'#8B2020'}}>Campo requerido</span>}
                    </div>
                  ))}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:4}}>
                  <div className="f-group">
                    <label className="f-lbl">Estado <span>*</span></label>
                    <select className={`f-sel ${errors.state?'error':''}`} value={form.state}
                      onChange={e=>{ setForm(f=>({...f,state:e.target.value})); setErrors(er=>({...er,state:false})) }}>
                      <option value="">Seleccionar estado</option>
                      {['Distrito Capital','Miranda','Aragua','Carabobo','Zulia','Lara','Táchira','Mérida'].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="f-group">
                    <label className="f-lbl">Ciudad <span>*</span></label>
                    <input className={`f-inp ${errors.city?'error':''}`} value={form.city} placeholder="Caracas"
                      onChange={e=>{ setForm(f=>({...f,city:e.target.value})); setErrors(er=>({...er,city:false})) }} />
                  </div>
                  <div className="f-group" style={{gridColumn:'span 2'}}>
                    <label className="f-lbl">Dirección completa <span>*</span></label>
                    <input className={`f-inp ${errors.address?'error':''}`} value={form.address} placeholder="Urb. Las Mercedes, Av. Principal, Casa #15"
                      onChange={e=>{ setForm(f=>({...f,address:e.target.value})); setErrors(er=>({...er,address:false})) }} />
                  </div>
                  <div className="f-group" style={{gridColumn:'span 2'}}>
                    <label className="f-lbl">Punto de referencia</label>
                    <input className="f-inp" value={form.reference} placeholder="Frente al C.C. Sambil..."
                      onChange={e=>setForm(f=>({...f,reference:e.target.value}))} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Shipping */}
          {step === 3 && (
            <div className="panel">
              <div className="panel-head"><span className="panel-title">Método de envío</span></div>
              <div style={{padding:'24px 28px'}}>
                {SHIPPING_OPTS.map(opt => (
                  <div key={opt.id} className={`ship-opt ${shipping===opt.id?'selected':''}`} onClick={() => setShipping(opt.id)}>
                    <div className={`ship-radio ${shipping===opt.id?'selected':''}`} style={{borderColor:shipping===opt.id?'var(--deep)':'rgba(196,168,130,.4)'}}>
                      {shipping===opt.id && <div style={{width:7,height:7,borderRadius:'50%',background:'var(--gold)'}} />}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'.72rem',color:'var(--deep)',fontWeight:500,marginBottom:3}}>{opt.label}</div>
                      <div style={{fontSize:'.65rem',color:'var(--warm)'}}>{opt.desc}</div>
                    </div>
                    <span style={{fontSize:'.82rem',color:opt.price===0?'var(--moss)':'var(--deep)',fontWeight:opt.price===0?500:300}}>
                      {opt.price===0?'Gratis':'$'+opt.price.toFixed(2)}
                    </span>
                    {opt.badge && <span style={{position:'absolute',top:-8,right:12,background:'var(--moss)',color:'white',fontSize:'.5rem',letterSpacing:'.15em',textTransform:'uppercase',padding:'3px 8px'}}>Disponible</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="panel">
              <div className="panel-head"><span className="panel-title">Método de pago</span></div>
              <div style={{padding:'24px 28px'}}>
                <div className="pay-grid">
                  {PAY_METHODS.map(m => (
                    <div key={m.id} className={`pay-m ${payMethod===m.id?'selected':''}`} onClick={() => setPayMethod(m.id)}>
                      <div style={{fontSize:'1.4rem'}}>{m.icon}</div>
                      <div style={{fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:payMethod===m.id?'var(--deep)':'var(--warm)'}}>{m.name}</div>
                    </div>
                  ))}
                </div>
                {PAY_METHODS.filter(m=>m.id===payMethod).map(m => (
                  <div key={m.id} className="pay-detail">
                    <p style={{fontSize:'.78rem',color:'var(--warm)',lineHeight:1.6,marginBottom:8}}>
                      Realiza tu pago a través de {m.name}:
                    </p>
                    <strong style={{fontSize:'.82rem',color:'var(--deep)'}}>{m.account}</strong>
                    <br/>
                    <button className="btn-primary" style={{marginTop:12,padding:'8px 16px'}}
                      onClick={() => { navigator.clipboard.writeText(m.account).catch(()=>{}); showToast('Copiado: '+m.account) }}>
                      📋 Copiar
                    </button>
                    <div style={{marginTop:14,border:'1px dashed rgba(196,168,130,.4)',padding:14,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                      <span style={{fontSize:'.68rem',letterSpacing:'.12em',color:'var(--warm)',textTransform:'uppercase'}}>📎 Subir comprobante de pago</span>
                    </div>
                  </div>
                ))}
                <p style={{fontSize:'.68rem',color:'var(--earth)',lineHeight:1.6}}>
                  ⚠️ Una vez realizado el pago, sube el comprobante. Tu pedido será procesado en las próximas 2 horas hábiles.
                </p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="nav-btns">
            {step > 1 && <button className="prev-btn" onClick={prevStep}>← Anterior</button>}
            {items.length > 0 && (
              <button className="next-btn" onClick={nextStep}>
                {step === 4 ? 'Confirmar pedido →' : STEP_LABELS[step]}
              </button>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="summary-panel">
          <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(196,168,130,.15)'}}>
            <span style={{fontSize:'.63rem',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--deep)',fontWeight:500}}>Resumen del pedido</span>
          </div>
          <div style={{padding:'20px 24px'}}>
            {/* Free ship bar */}
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.65rem',color:'var(--warm)'}}>
                {needed <= 0
                  ? <span style={{color:'var(--moss)'}}>✦ ¡Envío gratis desbloqueado!</span>
                  : <span>Te faltan <span style={{color:'var(--gold)'}}>${needed.toFixed(2)}</span> para envío gratis</span>
                }
              </div>
              <div className="fsb-bar"><div className="fsb-fill" style={{width:freeShipPct+'%'}} /></div>
            </div>

            {/* Items summary */}
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:16,paddingBottom:16,borderBottom:'1px solid rgba(196,168,130,.1)'}}>
              {items.map(item => (
                <div key={item.id} style={{display:'flex',gap:10,alignItems:'center'}}>
                  <div style={{width:44,height:44,background:'var(--beige)',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{width:22,height:31,borderRadius:'50% 50% 30% 30% / 40% 40% 20% 20%',background:`linear-gradient(160deg,${item.color}cc,${item.color})`}} />
                    <div style={{position:'absolute',top:-5,right:-5,width:16,height:16,borderRadius:'50%',background:'var(--deep)',color:'var(--gold)',fontSize:'.5rem',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{item.qty}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'.72rem',color:'var(--deep)',lineHeight:1.3}}>{item.name}</div>
                    <div style={{fontSize:'.62rem',color:'var(--earth)'}}>{item.variant}</div>
                  </div>
                  <div style={{fontSize:'.82rem',color:'var(--deep)'}}>${(item.price*item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{display:'flex',flexDirection:'column',gap:9,marginBottom:20}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem'}}>
                <span style={{color:'var(--warm)'}}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem'}}>
                  <span style={{color:'var(--warm)'}}>Descuento</span>
                  <span style={{color:'#8B2020'}}>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem'}}>
                <span style={{color:'var(--warm)'}}>Envío</span>
                <span style={{color:shippingCost===0?'var(--moss)':'inherit'}}>{shippingCost===0?'Gratis':'$'+shippingCost.toFixed(2)}</span>
              </div>
              <div style={{height:1,background:'rgba(196,168,130,.15)',margin:'4px 0'}} />
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:'.62rem',letterSpacing:'.18em',textTransform:'uppercase',fontWeight:500}}>Total</span>
                <span style={{fontFamily:'var(--font-display)',fontSize:'1.5rem'}}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="cta-btn" onClick={nextStep} disabled={items.length===0}>
              {step === 4 ? 'Confirmar pedido →' : STEP_LABELS[step] || 'Continuar →'}
            </button>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontSize:'.6rem',color:'rgba(196,168,130,.5)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:16}}>
              🔒 Pago 100% seguro y verificado
            </div>
            <div style={{display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap',paddingTop:14,borderTop:'1px solid rgba(196,168,130,.1)'}}>
              {['Zelle','Binance','Zinli','PayPal'].map(p => (
                <span key={p} style={{fontSize:'.55rem',letterSpacing:'.1em',border:'1px solid rgba(196,168,130,.18)',padding:'4px 9px',color:'rgba(196,168,130,.4)',textTransform:'uppercase'}}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success overlay */}
      {orderDone && (
        <div className="success-overlay">
          <div className="success-icon">✓</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'3rem',fontWeight:300,color:'var(--deep)',marginBottom:12}}>
            ¡Pedido <em style={{fontStyle:'italic',color:'var(--gold)'}}>confirmado</em>!
          </h2>
          <p style={{fontSize:'.9rem',color:'var(--warm)',lineHeight:1.7,maxWidth:480,marginBottom:8}}>
            Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando. Recibirás confirmación por WhatsApp en los próximos minutos.
          </p>
          <p style={{fontSize:'.65rem',letterSpacing:'.28em',textTransform:'uppercase',color:'var(--earth)',marginBottom:32}}>
            Número de pedido: <span style={{color:'var(--gold)'}}>{orderNum}</span>
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
            <button className="btn-primary" onClick={() => window.location.href='/catalogo'}>Seguir comprando</button>
            <a href="https://wa.me/584124428894" target="_blank" className="btn-secondary">💬 WhatsApp</a>
          </div>
          <a href="/pedido" style={{fontSize:'.72rem',color:'var(--gold)',marginTop:20}}>Rastrear mi pedido →</a>
        </div>
      )}

      {/* Toast */}
      <div className={`toast-fixed ${toast?'show':''}`}>
        <span style={{color:'var(--gold)'}}>✓</span> {toast}
      </div>
    </>
  )
}
