import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getSocialProjectsByInstitution } from '@/lib/queries'

const CATEGORY_LABELS: Record<string, string> = {
  educacional: 'Programa educacional e comunitário',
  inclusao: 'Inclusão',
  cultural: 'Iniciativa cultural',
  desenvolvimento_humano: 'Desenvolvimento humano',
  outro: 'Projeto social',
}

export default async function SocialResponsibilityPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const projects = await getSocialProjectsByInstitution(institution.id, { activeOnly: true })

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Compromisso Social</p>
          <h1 className="hero__title">Responsabilidade Social</h1>
          <p className="hero__subtitle">
            Projetos, programas e ações que demonstram o compromisso de {institution.name} com a
            comunidade, a inclusão, a cultura e o desenvolvimento social.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {projects.map((project) => {
              const cover = typeof project.coverImage === 'object' ? project.coverImage?.url : null
              return (
                <Link
                  key={project.id}
                  href={`/${institution.slug}/responsabilidade-social/${project.slug}`}
                  className="card"
                >
                  {cover && <img src={cover} alt={project.title} className="card__image" />}
                  <div className="card__body">
                    <span className="badge badge--level">
                      {CATEGORY_LABELS[project.category] || project.category}
                    </span>
                    <h3 style={{ margin: '4px 0' }}>{project.title}</h3>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                      {project.summary}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {projects.length === 0 && (
            <p style={{ color: 'var(--color-muted)' }}>
              Os projetos sociais desta instituição ainda estão sendo cadastrados.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
