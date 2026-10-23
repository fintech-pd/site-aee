import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function GovernancePage({
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
          <h1 className="hero__title">Governança institucional</h1>
          <p className="hero__subtitle">
            Conheça a estrutura de gestão de {institution.name}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          {institution.governance ? (
            <RichText data={institution.governance} />
          ) : (
            <p style={{ color: 'var(--color-muted)' }}>
              As informações de governança institucional ainda não foram publicadas.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
