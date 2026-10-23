import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getDocumentsByInstitution } from '@/lib/queries'
import { DocumentList } from '@/components/DocumentList'

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const documents = await getDocumentsByInstitution(institution.id, 'transparencia')

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Transparência</p>
          <h1 className="hero__title">Transparência e Governança</h1>
          <p className="hero__subtitle">
            Relatórios, políticas e documentos públicos de {institution.name}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <DocumentList documents={documents} />
        </div>
      </section>
    </main>
  )
}
