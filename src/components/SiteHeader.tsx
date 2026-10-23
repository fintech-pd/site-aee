import Link from 'next/link'
import type { Institution } from '@/payload-types'

type NavItem = {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

const DEFAULT_NAV: NavItem[] = [
  { href: '', label: 'Início' },
  { href: '/sobre', label: 'A Instituição' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/eventos', label: 'Eventos' },
]

const MANTENEDORA_NAV: NavItem[] = [
  { href: '', label: 'Início' },
  {
    href: '/sobre',
    label: 'Institucional',
    children: [
      { href: '/sobre', label: 'Quem somos' },
      { href: '/institucional/governanca', label: 'Governança institucional' },
      { href: '/institucional/conselho', label: 'Conselho deliberativo' },
      { href: '/institucional/capelania', label: 'Capelania' },
      { href: '/institucional/publicacoes', label: 'Publicações institucionais' },
    ],
  },
  { href: '/mantidas', label: 'Nossas Mantidas' },
  { href: '/responsabilidade-social', label: 'Responsabilidade Social' },
  {
    href: '/noticias',
    label: 'Notícias e Eventos',
    children: [
      { href: '/noticias', label: 'Notícias' },
      { href: '/eventos', label: 'Eventos' },
    ],
  },
  { href: '/transparencia', label: 'Transparência' },
  { href: '/contato', label: 'Contato' },
]

export function SiteHeader({ institution }: { institution: Institution }) {
  const base = `/${institution.slug}`
  const isMantenedora = institution.type === 'mantenedora'
  const navItems = isMantenedora ? MANTENEDORA_NAV : DEFAULT_NAV
  const logoUrl =
    typeof institution.logo === 'object' && institution.logo?.url ? institution.logo.url : null

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link href={base} className="site-header__logo">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={institution.name} style={{ height: 42 }} />
          ) : (
            <span className="site-header__logo-text">
              {institution.shortName || institution.name}
            </span>
          )}
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => (
            <div key={item.href + item.label} className="site-nav__item">
              <Link href={`${base}${item.href}`} className="site-nav__link">
                {item.label}
                {item.children && <span aria-hidden="true">▾</span>}
              </Link>
              {item.children && (
                <div className="site-nav__dropdown">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={`${base}${child.href}`}
                      className="site-nav__dropdown-link"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}
