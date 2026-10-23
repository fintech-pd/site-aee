import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getAllInstitutions } from '@/lib/queries'

const GROUP_ORDER = ['basica', 'superior', 'tecnica'] as const
const GROUP_LABELS: Record<string, string> = {
  basica: 'Educação Básica',
  superior: 'Ensino Superior',
  tecnica: 'Formação Profissional',
}

export default async function MaintainedInstitutionsPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const all = await getAllInstitutions()
  const mantidas = all.filter((i) => i.type !== 'mantenedora')
  const byGroup = new Map<string, typeof mantidas>()
  for (const inst of mantidas) {
    const list = byGroup.get(inst.type) || []
    list.push(inst)
    byGroup.set(inst.type, list)
  }

  return (
    <main>
      <section className="hero hero--compact">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Rede Educacional</p>
          <h1 className="hero__title">Nossas Mantidas</h1>
          <p className="hero__subtitle">
            Instituições de educação básica, ensino superior e formação profissional mantidas
            pela {institution.name}, cada uma com identidade e autonomia próprias.
          </p>
        </div>
      </section>

      {GROUP_ORDER.filter((g) => byGroup.has(g)).map((group) => (
        <section key={group} className="section">
          <div className="container">
            <h2 className="section-title">{GROUP_LABELS[group]}</h2>
            <div className="grid grid--3">
              {byGroup.get(group)!.map((inst) => {
                const logo = typeof inst.logo === 'object' ? inst.logo?.url : null
                const href = inst.externalUrl || `/${inst.slug}`
                const isExternal = Boolean(inst.externalUrl)
                return (
                  <a
                    key={inst.id}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="card"
                  >
                    {logo && <img src={logo} alt={inst.name} className="card__logo" />}
                    <div className="card__body">
                      <h3 style={{ margin: 0 }}>{inst.name}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        {inst.shortDescription}
                      </p>
                      {inst.city && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                          {inst.city}
                        </p>
                      )}
                      <span className="link-arrow" style={{ marginTop: 8 }}>
                        {isExternal ? 'Acessar site oficial →' : 'Ver mais →'}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
