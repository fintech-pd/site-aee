import Link from 'next/link'
import type { Institution, Slide } from '@/payload-types'
import {
  getAllInstitutions,
  getSiteStats,
  getTimelineByInstitution,
  getSocialProjectsByInstitution,
  getNewsByInstitution,
  getEventsByInstitution,
} from '@/lib/queries'
import { formatDateBR } from '@/lib/format'

const GROUP_LABELS: Record<string, string> = {
  basica: 'Educação Básica',
  superior: 'Ensino Superior',
  tecnica: 'Formação Profissional',
}

export async function MantenedoraHome({
  institution,
  heroSlide,
}: {
  institution: Institution
  heroSlide?: Slide
}) {
  const base = `/${institution.slug}`

  const [allInstitutions, stats, timeline, socialProjects, news, events] = await Promise.all([
    getAllInstitutions(),
    getSiteStats(),
    getTimelineByInstitution(institution.id),
    getSocialProjectsByInstitution(institution.id, { activeOnly: true }),
    getNewsByInstitution(institution.id, 3),
    getEventsByInstitution(institution.id, 3),
  ])

  const mantidas = allInstitutions.filter((i) => i.type !== 'mantenedora').slice(0, 6)
  const heroImage =
    heroSlide && typeof heroSlide.image === 'object' ? heroSlide.image?.url : null
  const timelinePreview = timeline.slice(0, 4)

  return (
    <main>
      {/* 1. Hero institucional */}
      <section
        className="hero"
        style={
          heroImage
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(14,34,64,0.82), rgba(14,34,64,0.45)), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="container hero__inner">
          <p className="hero__eyebrow">Desde 1947 · Anápolis, Goiás</p>
          <h1 className="hero__title">
            {heroSlide?.headline || 'Educação que transforma gerações.'}
          </h1>
          <p className="hero__subtitle">
            {heroSlide?.subheadline ||
              'Uma trajetória dedicada à educação, ao conhecimento e à formação integral de pessoas, conectando tradição, valores e inovação.'}
          </p>
          <div className="hero__actions">
            <Link href={`${base}/sobre`} className="button">
              Conheça a AEE
            </Link>
            <Link href={`${base}/mantidas`} className="button button--outline">
              Nossas mantidas
            </Link>
          </div>
        </div>
      </section>

      {/* 2. AEE em números */}
      <section className="section--dark" style={{ padding: '64px 0' }}>
        <div className="container">
          <p className="eyebrow">A AEE em números</p>
          <div className="stats">
            {stats?.foundingYear && (
              <div className="stat-item">
                <span className="stat-number">{stats.foundingYear}</span>
                <span className="stat-label">Ano de fundação</span>
              </div>
            )}
            {stats?.studentsCount && (
              <div className="stat-item">
                <span className="stat-number">{stats.studentsCount}</span>
                <span className="stat-label">Estudantes atendidos</span>
              </div>
            )}
            {typeof stats?.institutionsCount === 'number' && (
              <div className="stat-item">
                <span className="stat-number">{stats.institutionsCount}</span>
                <span className="stat-label">Instituições mantidas</span>
              </div>
            )}
            {typeof stats?.citiesCount === 'number' && (
              <div className="stat-item">
                <span className="stat-number">{stats.citiesCount}</span>
                <span className="stat-label">Cidades de atuação</span>
              </div>
            )}
            {stats?.socialProjectsCount && (
              <div className="stat-item">
                <span className="stat-number">{stats.socialProjectsCount}</span>
                <span className="stat-label">Projetos e iniciativas sociais</span>
              </div>
            )}
          </div>
          {stats?.referenceDate && (
            <p className="stats-note">Dados de referência: {formatDateBR(stats.referenceDate)}</p>
          )}
        </div>
      </section>

      {/* 3. Nossa rede de ensino */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Rede educacional</p>
              <h2 className="section-title">Nossa rede de ensino</h2>
              <p className="section-subtitle">
                Instituições de educação básica, ensino superior e formação profissional, cada
                uma com identidade e autonomia próprias.
              </p>
            </div>
            <Link href={`${base}/mantidas`} className="link-arrow">
              Ver todas as mantidas →
            </Link>
          </div>
          <div className="grid grid--3">
            {mantidas.map((inst) => {
              const logo = typeof inst.logo === 'object' ? inst.logo?.url : null
              const href = inst.externalUrl || `/${inst.slug}`
              const isExternal = Boolean(inst.externalUrl)
              return (
                <a
                  key={inst.id}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="card"
                >
                  {logo && <img src={logo} alt={inst.name} className="card__logo" />}
                  <div className="card__body">
                    <span className="badge badge--level">{GROUP_LABELS[inst.type] || inst.type}</span>
                    <h3 style={{ margin: '4px 0' }}>{inst.name}</h3>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                      {inst.shortDescription}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. História e legado */}
      {timelinePreview.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <p className="eyebrow">Nossa trajetória</p>
            <h2 className="section-title">História e legado</h2>
            <p className="section-subtitle">
              Desde a fundação em {timeline[0]?.year || 1947}, a AEE expandiu sua atuação
              educacional por diversas cidades de Goiás.
            </p>
            <div className="timeline">
              {timelinePreview.map((entry) => (
                <div key={entry.id} className="timeline__item">
                  <div className="timeline__dot" />
                  <span className="timeline__year">{entry.year}</span>
                  <h3 className="timeline__title">{entry.title}</h3>
                  {entry.description && <p className="timeline__desc">{entry.description}</p>}
                </div>
              ))}
            </div>
            <Link href={`${base}/linha-do-tempo`} className="link-arrow">
              Ver linha do tempo completa →
            </Link>
          </div>
        </section>
      )}

      {/* 5. Responsabilidade social */}
      {socialProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Compromisso social</p>
                <h2 className="section-title">Responsabilidade social</h2>
                <p className="section-subtitle">
                  Projetos e ações que demonstram o compromisso da AEE com a comunidade, a
                  inclusão, a cultura e o desenvolvimento social.
                </p>
              </div>
              <Link href={`${base}/responsabilidade-social`} className="link-arrow">
                Ver todos os projetos →
              </Link>
            </div>
            <div className="grid grid--3">
              {socialProjects.slice(0, 3).map((project) => {
                const cover = typeof project.coverImage === 'object' ? project.coverImage?.url : null
                return (
                  <Link
                    key={project.id}
                    href={`${base}/responsabilidade-social/${project.slug}`}
                    className="card"
                  >
                    {cover && <img src={cover} alt={project.title} className="card__image" />}
                    <div className="card__body">
                      <h3 style={{ margin: '4px 0' }}>{project.title}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Notícias e eventos */}
      {(news.length > 0 || events.length > 0) && (
        <section className="section section--soft">
          <div className="container">
            <p className="eyebrow">Fique por dentro</p>
            <h2 className="section-title">Notícias e eventos</h2>
            <div className="grid grid--2" style={{ marginTop: 32 }}>
              {news.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Notícias</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {news.map((item) => (
                      <Link key={item.id} href={`${base}/noticias/${item.slug}`} className="card">
                        <div className="card__body">
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                            {formatDateBR(item.publishedAt)}
                          </span>
                          <h4 style={{ margin: '4px 0' }}>{item.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href={`${base}/noticias`} className="link-arrow" style={{ marginTop: 12, display: 'inline-block' }}>
                    Ver todas as notícias →
                  </Link>
                </div>
              )}
              {events.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Eventos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {events.map((event) => (
                      <Link key={event.id} href={`${base}/eventos/${event.slug}`} className="card">
                        <div className="card__body">
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                            {formatDateBR(event.startDate)}
                          </span>
                          <h4 style={{ margin: '4px 0' }}>{event.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href={`${base}/eventos`} className="link-arrow" style={{ marginTop: 12, display: 'inline-block' }}>
                    Ver todos os eventos →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
