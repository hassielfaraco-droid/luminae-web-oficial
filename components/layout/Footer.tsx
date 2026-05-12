import Link from 'next/link'

const FOOTER_LINKS = {
  'Tienda':   [['Skincare','/collections/skincare'],['Perfumería','/collections/perfumeria'],['Wellness','/collections/wellness'],['Marcas','/collections'],['Ofertas','/collections/ofertas'],['Sets de regalo','/collections/sets']],
  'Ayuda':    [['¿Cómo comprar?','/faq'],['Métodos de pago','/pagos'],['Envíos Venezuela','/envios'],['Devoluciones','/devoluciones'],['Preguntas frecuentes','/faq']],
  'Luminae':  [['Nuestra historia','/about'],['Diagnóstico IA','/ai'],['Blog de skincare','/blog'],['Contacto','/contacto']],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--deep2)' }} className="pt-20 pb-10">
      <div className="section-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[rgba(196,168,130,0.1)]">

          {/* Brand */}
          <div>
            <span className="block font-display text-[1.8rem] tracking-[0.3em] text-[var(--cream)] leading-none">
              LUMINAE
            </span>
            <span className="label-xs text-[var(--gold)] mt-1.5 block tracking-[0.35em]">
              Venezuela · Latinoamérica
            </span>
            <p className="font-display italic text-[rgba(196,168,130,0.45)] text-sm leading-relaxed mt-5">
              &ldquo;Donde la luz se encuentra<br />con tu piel.&rdquo;
            </p>
            <div className="flex gap-3 mt-6">
              {[['IG','https://instagram.com'],['TK','https://tiktok.com'],['WA',`https://wa.me/584124428894`],['YT','https://youtube.com']].map(([label, href]) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-[rgba(184,151,90,0.2)] flex items-center justify-center text-[var(--earth)] hover:bg-[var(--gold)] hover:text-[var(--deep)] hover:border-[var(--gold)] transition-all label-xs"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="label-xs text-[var(--gold)] mb-6 tracking-[0.3em]">{title}</h4>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[rgba(196,168,130,0.5)] hover:text-[var(--earth)] transition-colors text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="label-xs text-[rgba(196,168,130,0.25)]">
            © 2026 Luminae · Venezuela & Latinoamérica · Todos los derechos reservados
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Zelle','Binance','Zinli','PayPal','USD'].map(m => (
              <span key={m} className="label-xs text-[rgba(196,168,130,0.3)] border border-[rgba(196,168,130,0.1)] px-2 py-0.5">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
