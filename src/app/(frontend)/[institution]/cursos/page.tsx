import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getCoursesByInstitution } from '@/lib/queries'
import { CourseStatusBadge } from '@/components/CourseStatusBadge'
import { COURSE_STATUS } from '@/lib/constants'

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ institution: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { institution: slug } = await params
  const { status } = await searchParams
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const courses = await getCoursesByInstitution(institution.id, {
    status: status && status !== 'todos' ? status : undefined,
  })
  const base = `/${institution.slug}/cursos`

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">Cursos</h1>
        <p className="section-subtitle">
          Conheça os cursos oferecidos por {institution.name} e seu status de oferta atual.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          <Link
            href={base}
            className="badge"
            style={{
              background: !status || status === 'todos' ? 'var(--color-primary)' : '#eef3f8',
              color: !status || status === 'todos' ? '#fff' : 'var(--color-primary)',
            }}
          >
            Todos
          </Link>
          {COURSE_STATUS.map((s) => (
            <Link
              key={s.value}
              href={`${base}?status=${s.value}`}
              className="badge"
              style={{
                background: status === s.value ? 'var(--color-primary)' : '#eef3f8',
                color: status === s.value ? '#fff' : 'var(--color-primary)',
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="grid grid--3">
          {courses.map((course) => {
            const cover = typeof course.coverImage === 'object' ? course.coverImage?.url : null
            return (
              <Link
                key={course.id}
                href={`/${institution.slug}/cursos/${course.slug}`}
                className="card"
              >
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

        {courses.length === 0 && (
          <p style={{ color: 'var(--color-muted)' }}>Nenhum curso encontrado para este filtro.</p>
        )}
      </div>
    </main>
  )
}
