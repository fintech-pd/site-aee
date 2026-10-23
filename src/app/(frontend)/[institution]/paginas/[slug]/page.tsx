import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getPageBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function GenericPage({
  params,
}: {
  params: Promise<{ institution: string; slug: string }>
}) {
  const { institution: instSlug, slug } = await params
  const institution = await getInstitutionBySlug(instSlug)
  if (!institution) notFound()

  const page = await getPageBySlug(institution.id, slug)
  if (!page) notFound()

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="section-title">{page.title}</h1>
        <RichText data={page.content} />
      </div>
    </main>
  )
}
