import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getPeopleByInstitution } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function CouncilPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const members = await getPeopleByInstitution(institution.id, 'conselho')

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Institucional</p>
          <h1 className="hero__title">Conselho Deliberativo</h1>
          <p className="hero__subtitle">
            Estrutura de deliberação máxima de {institution.name}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {institution.governance && (
            <div style={{ maxWidth: 780, marginBottom: 40 }}>
              <RichText data={institution.governance} />
            </div>
          )}

          {members.length > 0 ? (
            <div className="grid grid--4">
              {members.map((person) => {
                const photo = typeof person.photo === 'object' ? person.photo?.url : null
                return (
                  <div key={person.id} className="card">
                    {photo && <img src={photo} alt={person.name} className="card__image" />}
                    <div className="card__body">
                      <h3 style={{ margin: 0, fontSize: '1rem' }}>{person.name}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>{person.role}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--color-muted)' }}>
              A composição do conselho deliberativo ainda não foi publicada.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
