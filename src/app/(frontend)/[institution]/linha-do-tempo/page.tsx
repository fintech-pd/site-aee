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
    <main className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <h1 className="section-title">Linha do tempo</h1>
        <p className="section-subtitle">A história de {institution.name} através dos anos.</p>

        <div style={{ borderLeft: '3px solid var(--color-secondary)', paddingLeft: 32 }}>
          {entries.map((entry) => {
            const image = typeof entry.image === 'object' ? entry.image?.url : null
            return (
              <div key={entry.id} style={{ marginBottom: 40, position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: -41,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                  }}
                />
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    fontSize: '1.3rem',
                  }}
                >
                  {entry.year}
                </span>
                <h3 style={{ margin: '4px 0 8px' }}>{entry.title}</h3>
                {entry.description && (
                  <p style={{ color: 'var(--color-muted)' }}>{entry.description}</p>
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
    </main>
  )
}
