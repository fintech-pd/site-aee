import Link from 'next/link'
import type { Institution } from '@/payload-types'

const NETWORK_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
}

export function SiteFooter({ institution }: { institution: Institution }) {
  const base = `/${institution.slug}`
  const isMantenedora = institution.type === 'mantenedora'

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h3 style={{ marginBottom: 12 }}>{institution.name}</h3>
          <p style={{ opacity: 0.78, fontSize: '0.9rem' }}>{institution.shortDescription}</p>
          {institution.socialLinks && institution.socialLinks.length > 0 && (
            <div style={{ display: 'flex', gap: 14, marginTop: 16, flexWrap: 'wrap' }}>
              {institution.socialLinks.map((link, idx) =>
                link.network && link.url ? (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                    {NETWORK_LABELS[link.network] || link.network}
                  </a>
                ) : null,
              )}
            </div>
          )}
        </div>

        <div>
          <h4>{isMantenedora ? 'Institucional' : 'Navegação'}</h4>
          <ul>
            {isMantenedora ? (
              <>
                <li><Link href={`${base}/sobre`}>Quem somos</Link></li>
                <li><Link href={`${base}/institucional/governanca`}>Governança institucional</Link></li>
                <li><Link href={`${base}/institucional/conselho`}>Conselho deliberativo</Link></li>
                <li><Link href={`${base}/institucional/capelania`}>Capelania</Link></li>
                <li><Link href={`${base}/institucional/publicacoes`}>Publicações institucionais</Link></li>
              </>
            ) : (
              <>
                <li><Link href={`${base}/sobre`}>A Instituição</Link></li>
                <li><Link href={`${base}/matriz`}>Matriz / Estrutura</Link></li>
                <li><Link href={`${base}/coordenacao`}>Coordenação</Link></li>
                <li><Link href={`${base}/cursos`}>Cursos</Link></li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h4>{isMantenedora ? 'Mantidas e Transparência' : 'Conteúdo'}</h4>
          <ul>
            {isMantenedora ? (
              <>
                <li><Link href={`${base}/mantidas`}>Nossas mantidas</Link></li>
                <li><Link href={`${base}/responsabilidade-social`}>Responsabilidade social</Link></li>
                <li><Link href={`${base}/transparencia`}>Transparência</Link></li>
              </>
            ) : (
              <>
                <li><Link href={`${base}/noticias`}>Notícias</Link></li>
                <li><Link href={`${base}/eventos`}>Eventos</Link></li>
              </>
            )}
            <li><Link href={`${base}/contato`}>Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <ul style={{ opacity: 0.85, fontSize: '0.9rem' }}>
            {institution.contact?.phone && <li>{institution.contact.phone}</li>}
            {institution.contact?.email && <li>{institution.contact.email}</li>}
            {institution.campuses?.slice(0, 2).map((c, idx) => (
              <li key={idx}>{c.name} — {c.city}/{c.state}</li>
            ))}
          </ul>
          {!isMantenedora && (
            <Link href="/" style={{ display: 'inline-block', marginTop: 12, fontSize: '0.88rem' }}>
              Ver todas as instituições →
            </Link>
          )}
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} {institution.name}. Todos os direitos reservados.</span>
        <span>
          Mantida pela{' '}
          <Link href={isMantenedora ? base : '/aee'} style={{ textDecoration: 'underline' }}>
            Associação Educativa Evangélica
          </Link>
          {' · '}
          <Link href={`${isMantenedora ? base : '/aee'}/institucional/publicacoes`} style={{ textDecoration: 'underline' }}>
            Política de Privacidade
          </Link>
        </span>
      </div>
    </footer>
  )
}
