import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getNewsByInstitution } from '@/lib/queries'
import { formatDateBR } from '@/lib/format'

export default async function NewsListPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const news = await getNewsByInstitution(institution.id, 50)

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">Notícias</h1>
        <p className="section-subtitle">Fique por dentro das novidades de {institution.name}.</p>

        <div className="grid grid--3">
          {news.map((item) => {
            const cover = typeof item.coverImage === 'object' ? item.coverImage?.url : null
            return (
              <Link key={item.id} href={`/${institution.slug}/noticias/${item.slug}`} className="card">
                {cover && <img src={cover} alt={item.title} className="card__image" />}
                <div className="card__body">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    {formatDateBR(item.publishedAt)}
                  </span>
                  <h3 style={{ margin: '4px 0' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{item.excerpt}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {news.length === 0 && (
          <p style={{ color: 'var(--color-muted)' }}>Nenhuma notícia publicada ainda.</p>
        )}
      </div>
    </main>
  )
}
