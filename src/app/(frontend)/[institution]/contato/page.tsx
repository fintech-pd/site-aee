import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { ContactForm } from '@/components/ContactForm'

const NETWORK_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Fale com a gente</p>
          <h1 className="hero__title">Contato</h1>
          <p className="hero__subtitle">
            Estamos à disposição para esclarecer dúvidas e receber sugestões.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 48, gridTemplateColumns: '1fr 1.3fr' }}>
          <div className="contact-info">
            {institution.campuses?.map((campus, idx) => (
              <div key={idx} className="contact-info__item">
                <span className="contact-info__icon">📍</span>
                <div>
                  <strong>{campus.name}</strong>
                  <p style={{ color: 'var(--color-muted)', margin: '4px 0 0' }}>
                    {campus.address || `${campus.city}/${campus.state}`}
                  </p>
                  {campus.phone && (
                    <p style={{ color: 'var(--color-muted)', margin: '4px 0 0' }}>{campus.phone}</p>
                  )}
                </div>
              </div>
            ))}

            {institution.contact?.phone && (
              <div className="contact-info__item">
                <span className="contact-info__icon">📞</span>
                <div>{institution.contact.phone}</div>
              </div>
            )}
            {institution.contact?.whatsapp && (
              <div className="contact-info__item">
                <span className="contact-info__icon">💬</span>
                <div>WhatsApp: {institution.contact.whatsapp}</div>
              </div>
            )}
            {institution.contact?.email && (
              <div className="contact-info__item">
                <span className="contact-info__icon">✉️</span>
                <div>{institution.contact.email}</div>
              </div>
            )}

            {institution.socialLinks && institution.socialLinks.length > 0 && (
              <div className="contact-info__item">
                <span className="contact-info__icon">🔗</span>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {institution.socialLinks.map((link, idx) =>
                    link.network && link.url ? (
                      <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="link-arrow">
                        {NETWORK_LABELS[link.network] || link.network}
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <ContactForm institutionId={institution.id} />
          </div>
        </div>
      </section>
    </main>
  )
}
