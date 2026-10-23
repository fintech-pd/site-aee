import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function ChaplaincyPage({
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
          <p className="hero__eyebrow">Institucional</p>
          <h1 className="hero__title">Capelania</h1>
          <p className="hero__subtitle">
            Iniciativas relacionadas aos valores institucionais de {institution.name}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          {institution.chaplaincy ? (
            <RichText data={institution.chaplaincy} />
          ) : (
            <p style={{ color: 'var(--color-muted)' }}>
              As informações sobre a capelania ainda não foram publicadas.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
