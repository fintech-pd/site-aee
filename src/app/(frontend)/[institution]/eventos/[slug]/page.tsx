import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getEventBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'
import { formatDateBR } from '@/lib/format'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ institution: string; slug: string }>
}) {
  const { institution: instSlug, slug } = await params
  const institution = await getInstitutionBySlug(instSlug)
  if (!institution) notFound()

  const event = await getEventBySlug(institution.id, slug)
  if (!event) notFound()

  const cover = typeof event.coverImage === 'object' ? event.coverImage?.url : null

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          {formatDateBR(event.startDate)}
          {event.endDate ? ` até ${formatDateBR(event.endDate)}` : ''}
          {event.location ? ` — ${event.location}` : event.online ? ' — Online' : ''}
        </span>
        <h1 style={{ color: 'var(--color-primary)', marginTop: 8 }}>{event.title}</h1>
        {cover && (
          <img
            src={cover}
            alt={event.title}
            style={{ borderRadius: 10, marginBottom: 24, width: '100%' }}
          />
        )}
        <RichText data={event.description} />
        {event.registrationUrl && (
          <a href={event.registrationUrl} className="button" style={{ marginTop: 24, display: 'inline-block' }}>
            Inscreva-se
          </a>
        )}
      </div>
    </main>
  )
}
