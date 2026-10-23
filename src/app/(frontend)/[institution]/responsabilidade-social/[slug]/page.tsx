import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getSocialProjectBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function SocialProjectDetailPage({
  params,
}: {
  params: Promise<{ institution: string; slug: string }>
}) {
  const { institution: instSlug, slug } = await params
  const institution = await getInstitutionBySlug(instSlug)
  if (!institution) notFound()

  const project = await getSocialProjectBySlug(institution.id, slug)
  if (!project) notFound()

  const cover = typeof project.coverImage === 'object' ? project.coverImage?.url : null

  return (
    <main>
      <section
        className="hero hero--compact"
        style={
          cover
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(14,34,64,0.85), rgba(14,34,64,0.55)), url(${cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="container hero__inner">
          <p className="hero__eyebrow">Responsabilidade Social</p>
          <h1 className="hero__title">{project.title}</h1>
          <p className="hero__subtitle">{project.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          {project.description && <RichText data={project.description} />}

          {project.results && project.results.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ color: 'var(--color-primary)' }}>Resultados e impactos</h2>
              <div className="stats" style={{ marginTop: 16 }}>
                {project.results.map((result, idx) => (
                  <div key={idx} className="stat-item">
                    <span className="stat-number" style={{ color: 'var(--color-primary)' }}>
                      {result.value}
                    </span>
                    <span className="stat-label" style={{ color: 'var(--color-muted)' }}>
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
