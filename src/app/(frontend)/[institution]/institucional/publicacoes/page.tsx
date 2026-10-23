import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getDocumentsByInstitution } from '@/lib/queries'
import { DocumentList } from '@/components/DocumentList'

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const documents = await getDocumentsByInstitution(institution.id, 'publicacoes')

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Institucional</p>
          <h1 className="hero__title">Publicações institucionais</h1>
          <p className="hero__subtitle">
            Documentos, estatutos e materiais oficiais de {institution.name}.
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
