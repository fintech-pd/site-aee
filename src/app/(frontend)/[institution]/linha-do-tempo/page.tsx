import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getTimelineByInstitution } from '@/lib/queries'

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const entries = await getTimelineByInstitution(institution.id)

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Nossa trajetória</p>
          <h1 className="hero__title">História e legado</h1>
          <p className="hero__subtitle">A história de {institution.name} através dos anos.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="timeline">
            {entries.map((entry) => {
              const image = typeof entry.image === 'object' ? entry.image?.url : null
              return (
                <div key={entry.id} className="timeline__item">
                  <div className="timeline__dot" />
                  <span className="timeline__year">{entry.year}</span>
                  <h3 className="timeline__title">{entry.title}</h3>
                  {entry.description && (
                    <p className="timeline__desc">{entry.description}</p>
                  )}
                  {image && (
                    <img
                      src={image}
                      alt={entry.title}
                      style={{ borderRadius: 10, marginTop: 12, maxWidth: 480 }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {entries.length === 0 && (
            <p style={{ color: 'var(--color-muted)' }}>
              A linha do tempo desta instituição ainda está sendo construída.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
