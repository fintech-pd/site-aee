import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getInstitutionBySlug,
  getActiveSlides,
  getCoursesByInstitution,
  getNewsByInstitution,
} from '@/lib/queries'
import { CourseStatusBadge } from '@/components/CourseStatusBadge'
import { formatDateBR } from '@/lib/format'
import { MantenedoraHome } from './_components/MantenedoraHome'

export default async function InstitutionHome({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const slides = await getActiveSlides(institution.id)
  const heroSlide = slides[0]

  if (institution.type === 'mantenedora') {
    return <MantenedoraHome institution={institution} heroSlide={heroSlide} />
  }

  const [courses, news] = await Promise.all([
    getCoursesByInstitution(institution.id, { status: 'oferta' }),
    getNewsByInstitution(institution.id, 3),
  ])

  const base = `/${institution.slug}`
  const heroImage =
    heroSlide && typeof heroSlide.image === 'object' ? heroSlide.image?.url : null

  return (
    <main>
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
          <h1 className="hero__title">{heroSlide?.headline || institution.name}</h1>
          <p className="hero__subtitle">
            {heroSlide?.subheadline || institution.shortDescription}
          </p>
          <div className="hero__actions">
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
        <section className="section section--alt">
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
    </main>
  )
}
