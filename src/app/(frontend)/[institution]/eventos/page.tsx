import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getEventsByInstitution } from '@/lib/queries'
import { formatDateBR } from '@/lib/format'

export default async function EventsListPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const events = await getEventsByInstitution(institution.id, 50)

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">Eventos</h1>
        <p className="section-subtitle">Confira os próximos eventos de {institution.name}.</p>

        <div className="grid grid--3">
          {events.map((event) => {
            const cover = typeof event.coverImage === 'object' ? event.coverImage?.url : null
            return (
              <Link key={event.id} href={`/${institution.slug}/eventos/${event.slug}`} className="card">
                {cover && <img src={cover} alt={event.title} className="card__image" />}
                <div className="card__body">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    {formatDateBR(event.startDate)} {event.location ? `— ${event.location}` : ''}
                  </span>
                  <h3 style={{ margin: '4px 0' }}>{event.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>

        {events.length === 0 && (
          <p style={{ color: 'var(--color-muted)' }}>Nenhum evento programado no momento.</p>
        )}
      </div>
    </main>
  )
}
