import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getInstitutionBySlug, getCourseBySlug } from '@/lib/queries'
import { CourseStatusBadge } from '@/components/CourseStatusBadge'
import { RichText } from '@/components/RichText'
import { formatLegalAct } from '@/lib/format'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ institution: string; slug: string }>
}) {
  const { institution: instSlug, slug } = await params
  const institution = await getInstitutionBySlug(instSlug)
  if (!institution) notFound()

  const course = await getCourseBySlug(institution.id, slug)
  if (!course) notFound()

  const cover = typeof course.coverImage === 'object' ? course.coverImage?.url : null
  const coordinator =
    typeof course.coordinator === 'object' && course.coordinator ? course.coordinator : null
  const canEnroll = course.status === 'oferta'

  return (
    <main>
      <section
        className="hero hero--compact"
        style={
          cover
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(14,34,64,0.85), rgba(14,34,64,0.5)), url(${cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="container hero__inner">
          <CourseStatusBadge status={course.status} />
          <h1 style={{ margin: '12px 0 8px', fontSize: '2.2rem' }}>{course.name}</h1>
          <p style={{ opacity: 0.9, maxWidth: 600 }}>{course.shortDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
          <div>
            {course.statusNote && (
              <div
                style={{
                  background: '#fff3da',
                  border: '1px solid #f2d38a',
                  borderRadius: 8,
                  padding: '12px 16px',
                  marginBottom: 24,
                  fontSize: '0.9rem',
                }}
              >
                {course.statusNote}
              </div>
            )}

            {course.description && <RichText data={course.description} />}

            {course.legalActs && course.legalActs.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h2 style={{ color: 'var(--color-primary)' }}>Atos regulatórios (MEC)</h2>
                <ul style={{ paddingLeft: 20 }}>
                  {course.legalActs.map((act: NonNullable<typeof course.legalActs>[number], idx: number) => (
                    <li key={idx} style={{ marginBottom: 8 }}>
                      {formatLegalAct(act)}
                      {act.documentUrl && (
                        <>
                          {' '}
                          —{' '}
                          <a href={act.documentUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                            ver documento
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 10,
                padding: 24,
                position: 'sticky',
                top: 96,
              }}
            >
              <h3 style={{ marginTop: 0, color: 'var(--color-primary)' }}>Informações do curso</h3>
              <dl style={{ fontSize: '0.9rem' }}>
                {course.details?.duration && (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Duração</dt>
                    <dd style={{ marginBottom: 12 }}>{course.details.duration}</dd>
                  </>
                )}
                {course.details?.workload && (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Carga horária</dt>
                    <dd style={{ marginBottom: 12 }}>{course.details.workload}</dd>
                  </>
                )}
                {course.details?.shift && (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Turno(s)</dt>
                    <dd style={{ marginBottom: 12 }}>{course.details.shift}</dd>
                  </>
                )}
                {course.details?.degreeTitle && (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Título conferido</dt>
                    <dd style={{ marginBottom: 12 }}>{course.details.degreeTitle}</dd>
                  </>
                )}
                {course.modality?.length ? (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Modalidade</dt>
                    <dd style={{ marginBottom: 12 }}>{course.modality.join(', ')}</dd>
                  </>
                ) : null}
                {coordinator && (
                  <>
                    <dt style={{ color: 'var(--color-muted)' }}>Coordenação</dt>
                    <dd style={{ marginBottom: 12 }}>{coordinator.name}</dd>
                  </>
                )}
              </dl>

              {canEnroll ? (
                <a
                  href={course.tuition?.ctaUrl || '#'}
                  className="button"
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                  {course.tuition?.ctaLabel || 'Quero me inscrever'}
                </a>
              ) : (
                <Link
                  href={`/${institution.slug}/cursos`}
                  className="button"
                  style={{ width: '100%', textAlign: 'center', display: 'block', background: '#eceff1', color: '#5b6672' }}
                >
                  Ver outros cursos disponíveis
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
