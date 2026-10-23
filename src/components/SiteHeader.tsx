import Link from 'next/link'
import type { Institution } from '@/payload-types'

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '', label: 'Início' },
  { href: '/sobre', label: 'A Instituição' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/eventos', label: 'Eventos' },
]

export function SiteHeader({ institution }: { institution: Institution }) {
  const base = `/${institution.slug}`
  const logoUrl =
    typeof institution.logo === 'object' && institution.logo?.url ? institution.logo.url : null

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
      >
        <Link href={base} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={institution.name} style={{ height: 40 }} />
          ) : (
            <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>
              {institution.shortName || institution.name}
            </strong>
          )}
        </Link>
        <nav style={{ display: 'flex', gap: 24, fontSize: '0.95rem' }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={`${base}${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
