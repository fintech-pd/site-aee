import Link from 'next/link'
import type { Institution } from '@/payload-types'

export function SiteFooter({ institution }: { institution: Institution }) {
  const base = `/${institution.slug}`

  return (
    <footer style={{ background: '#0b1b2b', color: '#fff', marginTop: 64 }}>
      <div className="container" style={{ padding: '48px 0', display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div>
          <h3 style={{ marginBottom: 12 }}>{institution.name}</h3>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{institution.shortDescription}</p>
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Institucional</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><Link href={`${base}/sobre`}>A Instituição</Link></li>
            <li><Link href={`${base}/matriz`}>Matriz / Estrutura</Link></li>
            <li><Link href={`${base}/coordenacao`}>Coordenação</Link></li>
            <li><Link href={`${base}/cursos`}>Cursos</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Contato</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, opacity: 0.85, fontSize: '0.9rem' }}>
            {institution.contact?.phone && <li>{institution.contact.phone}</li>}
            {institution.contact?.email && <li>{institution.contact.email}</li>}
            {institution.campuses?.map((c, idx) => (
              <li key={idx}>{c.name} — {c.city}/{c.state}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Mantenedora</h4>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Associação Educativa Evangélica (AEE)
          </p>
          <Link href="/" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
            Ver todas as instituições →
          </Link>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px 0' }}>
        <div className="container" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          © {new Date().getFullYear()} {institution.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
