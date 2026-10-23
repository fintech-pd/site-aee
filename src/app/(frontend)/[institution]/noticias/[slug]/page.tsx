import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getNewsBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'
import { formatDateBR } from '@/lib/format'

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ institution: string; slug: string }>
}) {
  const { institution: instSlug, slug } = await params
  const institution = await getInstitutionBySlug(instSlug)
  if (!institution) notFound()

  const item = await getNewsBySlug(institution.id, slug)
  if (!item) notFound()

  const cover = typeof item.coverImage === 'object' ? item.coverImage?.url : null

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          {formatDateBR(item.publishedAt)} {item.author ? `— ${item.author}` : ''}
        </span>
        <h1 style={{ color: 'var(--color-primary)', marginTop: 8 }}>{item.title}</h1>
        {cover && (
          <img
            src={cover}
            alt={item.title}
            style={{ borderRadius: 10, marginBottom: 24, width: '100%' }}
          />
        )}
        <RichText data={item.content} />
      </div>
    </main>
  )
}
