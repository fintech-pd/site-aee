import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getInstitutionBySlug,
  getActiveSlides,
  getCoursesByInstitution,
  getNewsByInstitution,
  getTimelineByInstitution,
} from '@/lib/queries'
import { CourseStatusBadge } from '@/components/CourseStatusBadge'
import { formatDateBR } from '@/lib/format'

export default async function InstitutionHome({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const [slides, courses, news, timeline] = await Promise.all([
    getActiveSlides(institution.id),
    getCoursesByInstitution(institution.id, { status: 'oferta' }),
    getNewsByInstitution(institution.id, 3),
    institution.type === 'mantenedora' ? getTimelineByInstitution(institution.id) : Promise.resolve([]),
  ])

  const base = `/${institution.slug}`
  const heroSlide = slides[0]
  const heroImage =
    heroSlide && typeof heroSlide.image === 'object' ? heroSlide.image?.url : null

  return (
    <main>
      <section
        style={{
          background: heroImage
            ? `linear-gradient(135deg, rgba(11,59,96,0.85), rgba(11,59,96,0.6)), url(${heroImage}) center/cover`
            : 'linear-gradient(135deg, var(--color-primary), #124d7c)',
          color: '#fff',
          padding: '80px 0',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.4rem', maxWidth: 680 }}>
            {heroSlide?.headline || institution.name}
          </h1>
          <p style={{ maxWidth: 560, opacity: 0.9, marginTop: 12 }}>
            {heroSlide?.subheadline || institution.shortDescription}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Link href={`${base}/cursos`} className="button">
              {heroSlide?.ctaLabel || 'Ver cursos'}
            </Link>
            <Link href={`${base}/sobre`} className="button button--outline">
              Conheça a instituição
            </Link>
          </div>
        </div>
      </section>

      {courses.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Cursos em oferta</h2>
            <p className="section-subtitle">
              Conheça alguns dos cursos disponíveis para matrícula em {institution.name}.
            </p>
            <div className="grid grid--3">
              {courses.slice(0, 6).map((course) => {
                const cover =
                  typeof course.coverImage === 'object' ? course.coverImage?.url : null
                return (
                  <Link key={course.id} href={`${base}/cursos/${course.slug}`} className="card">
                    {cover && <img src={cover} alt={course.name} className="card__image" />}
                    <div className="card__body">
                      <CourseStatusBadge status={course.status} />
                      <h3 style={{ margin: '4px 0' }}>{course.name}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        {course.shortDescription}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div style={{ marginTop: 24 }}>
              <Link href={`${base}/cursos`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                Ver todos os cursos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="section" style={{ background: '#f7f9fb' }}>
          <div className="container">
            <h2 className="section-title">Notícias</h2>
            <div className="grid grid--3">
              {news.map((item) => {
                const cover = typeof item.coverImage === 'object' ? item.coverImage?.url : null
                return (
                  <Link key={item.id} href={`${base}/noticias/${item.slug}`} className="card">
                    {cover && <img src={cover} alt={item.title} className="card__image" />}
                    <div className="card__body">
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                        {formatDateBR(item.publishedAt)}
                      </span>
                      <h3 style={{ margin: '4px 0' }}>{item.title}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {institution.type === 'mantenedora' && timeline.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Nossa história</h2>
            <p className="section-subtitle">
              Uma trajetória de décadas dedicada à educação evangélica em Goiás.
            </p>
            <Link href={`${base}/linha-do-tempo`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Ver linha do tempo completa →
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
