/* ── Login + Register pages ─────────────────────── */

function LoginPage({ setPage, onLogin, returnTo }) {
  const [mode, setMode] = React.useState('login'); // 'login' | 'register'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim() || (mode === 'register' && !name.trim())) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('El correo no es válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    const user = {
      name: mode === 'register' ? name : (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      email,
    };
    onLogin(user);
    setPage(returnTo || { name: 'account', tab: 'datos' });
  };

  const inputStyle = {
    width: '100%', padding: '13px 14px', background: '#F7F2EB',
    border: '1px solid rgba(196,168,130,0.3)', outline: 'none',
    fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', color: '#2C2416',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    display: 'block', fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase',
    color: '#B8975A', marginBottom: 8,
  };

  return React.createElement('div', { style:{ animation:'fadeUp 0.4s ease both' } },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 84px - 38px)' } },
      // Left: brand panel
      React.createElement('div', { style:{ background:'linear-gradient(160deg,#2C2416 0%,#3A2E1E 60%,#1A150D 100%)', padding:'72px 64px', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' } },
        React.createElement('div', { style:{ position:'absolute', top:'-10%', right:'-15%', width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle, rgba(184,151,90,0.18) 0%, transparent 70%)' } }),
        React.createElement('div', { style:{ position:'absolute', bottom:'-20%', left:'-10%', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 70%)' } }),
        React.createElement('div', { style:{ position:'relative', zIndex:1 } },
          React.createElement('div', { style:{ fontFamily:"'Satoshi',sans-serif", fontSize:'1.4rem', letterSpacing:'0.28em', fontWeight:900, color:'#F7F2EB' } }, 'LUMINAE'),
          React.createElement('div', { style:{ width:36, height:1, background:'#B8975A', marginTop:14 } })
        ),
        React.createElement('div', { style:{ position:'relative', zIndex:1 } },
          React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#B8975A', marginBottom:18 } }, 'Belleza con propósito'),
          React.createElement('h1', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'3rem', fontWeight:300, color:'#F7F2EB', lineHeight:1.1, fontStyle:'italic', marginBottom:20 } }, 'Tu rutina,', React.createElement('br'), 'tu santuario.'),
          React.createElement('p', { style:{ fontFamily:"'Inter',sans-serif", fontSize:'0.95rem', color:'rgba(247,242,235,0.7)', lineHeight:1.7, fontWeight:300, maxWidth:380 } }, 'Accede a tu cuenta para guardar favoritos, ver tu historial de compras y recibir recomendaciones hechas para ti.')
        ),
        React.createElement('div', { style:{ position:'relative', zIndex:1, display:'flex', gap:24 } },
          [['✓','Envíos rápidos'],['✓','Compra segura'],['✓','Atención por WhatsApp']].map(([i,t]) =>
            React.createElement('div', { key:t, style:{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', color:'rgba(247,242,235,0.6)', letterSpacing:'0.1em' } },
              React.createElement('span', { style:{ color:'#B8975A' } }, i), t)))
      ),
      // Right: form panel
      React.createElement('div', { style:{ background:'#F7F2EB', padding:'72px 96px', display:'flex', flexDirection:'column', justifyContent:'center' } },
        React.createElement('div', { style:{ maxWidth:420, width:'100%', margin:'0 auto' } },
          React.createElement('p', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#B8975A', marginBottom:14 } }, mode === 'login' ? 'Bienvenida de nuevo' : 'Crear cuenta'),
          React.createElement('h2', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.4rem', fontWeight:400, color:'#2C2416', lineHeight:1.1, marginBottom:8 } }, mode === 'login' ? 'Inicia sesión' : 'Únete a Luminae'),
          React.createElement('p', { style:{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#6A5A42', marginBottom:36, fontWeight:300 } }, mode === 'login' ? 'Accede con tu correo y contraseña.' : 'Crea tu cuenta en menos de un minuto.'),

          React.createElement('form', { onSubmit:handleSubmit, style:{ display:'flex', flexDirection:'column', gap:20 } },
            mode === 'register' && React.createElement('div', null,
              React.createElement('label', { style:labelStyle }, 'Nombre completo'),
              React.createElement('input', { type:'text', value:name, onChange:e=>setName(e.target.value), placeholder:'María González', style:inputStyle, autoFocus:true })
            ),
            React.createElement('div', null,
              React.createElement('label', { style:labelStyle }, 'Correo electrónico'),
              React.createElement('input', { type:'email', value:email, onChange:e=>setEmail(e.target.value), placeholder:'tucorreo@ejemplo.com', style:inputStyle, autoFocus: mode === 'login' })
            ),
            React.createElement('div', null,
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'baseline' } },
                React.createElement('label', { style:labelStyle }, 'Contraseña'),
                mode === 'login' && React.createElement('button', { type:'button', onClick:()=>alert('Demo: te enviaremos un enlace por correo.'), style:{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#B8975A' } }, '¿Olvidaste?')
              ),
              React.createElement('div', { style:{ position:'relative' } },
                React.createElement('input', { type:showPwd ? 'text' : 'password', value:password, onChange:e=>setPassword(e.target.value), placeholder:'••••••••', style:{...inputStyle, paddingRight:60} }),
                React.createElement('button', { type:'button', onClick:()=>setShowPwd(s=>!s), style:{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#B8975A' } }, showPwd ? 'Ocultar' : 'Ver')
              )
            ),

            error && React.createElement('div', { style:{ padding:'10px 14px', background:'rgba(192,90,72,0.08)', border:'1px solid rgba(192,90,72,0.25)', fontFamily:"'Inter',sans-serif", fontSize:'0.78rem', color:'#A04030' } }, error),

            mode === 'login' && React.createElement('label', { style:{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Inter',sans-serif", fontSize:'0.78rem', color:'#6A5A42', cursor:'pointer', fontWeight:300 } },
              React.createElement('input', { type:'checkbox', defaultChecked:true, style:{ accentColor:'#B8975A' } }),
              'Mantener sesión iniciada'
            ),

            React.createElement('button', { type:'submit', style:{ width:'100%', padding:'15px', background:'#2C2416', color:'#F7F2EB', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.25em', textTransform:'uppercase', marginTop:6 } },
              mode === 'login' ? 'Iniciar sesión →' : 'Crear cuenta →'),

            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:14, margin:'8px 0' } },
              React.createElement('div', { style:{ flex:1, height:1, background:'rgba(196,168,130,0.3)' } }),
              React.createElement('span', { style:{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'#C4A882' } }, 'O continúa con'),
              React.createElement('div', { style:{ flex:1, height:1, background:'rgba(196,168,130,0.3)' } })
            ),

            React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 } },
              ['Google','Apple'].map(p =>
                React.createElement('button', { key:p, type:'button', onClick:()=>{ onLogin({name:'María', email:`maria@${p.toLowerCase()}.com`}); setPage(returnTo || {name:'account',tab:'datos'}); },
                  style:{ padding:'12px', background:'transparent', border:'1px solid rgba(196,168,130,0.35)', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.7rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#2C2416', display:'flex', alignItems:'center', justifyContent:'center', gap:8 } },
                  p === 'Google'
                    ? React.createElement('span', { style:{ fontSize:'0.95rem', fontFamily:'serif', fontWeight:700 } }, 'G')
                    : React.createElement('span', { style:{ fontSize:'1rem' } }, ''),
                  p
                ))
            )
          ),

          React.createElement('p', { style:{ marginTop:32, fontFamily:"'Inter',sans-serif", fontSize:'0.82rem', color:'#6A5A42', textAlign:'center', fontWeight:300 } },
            mode === 'login' ? '¿Aún no tienes cuenta? ' : '¿Ya tienes cuenta? ',
            React.createElement('button', { type:'button', onClick:()=>{ setMode(mode === 'login' ? 'register' : 'login'); setError(''); }, style:{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.68rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#B8975A', borderBottom:'1px solid #B8975A', padding:0 } },
              mode === 'login' ? 'Regístrate' : 'Inicia sesión')
          )
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}

Object.assign(window, { LoginPage });
