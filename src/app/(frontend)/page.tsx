import Link from 'next/link'
import { getAllInstitutions } from '@/lib/queries'

export const dynamic = 'force-dynamic'

const TYPE_LABELS: Record<string, string> = {
  mantenedora: 'Mantenedora',
  basica: 'Educação Básica',
  tecnica: 'Formação Profissional',
  superior: 'Ensino Superior',
}

export default async function HubPage() {
  const institutions = await getAllInstitutions()
  const mantenedora = institutions.find((i) => i.type === 'mantenedora')
  const others = institutions.filter((i) => i.type !== 'mantenedora')

  return (
    <main>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Associação Educativa Evangélica · Desde 1947</p>
          <h1 className="hero__title">
            Educação que transforma gerações, da educação básica ao ensino superior
          </h1>
          <p className="hero__subtitle">
            Mantenedora de instituições de ensino em Anápolis, Goianésia e Ceres — Goiás.
          </p>
          {mantenedora && (
            <div className="hero__actions">
              <Link href={`/${mantenedora.slug}`} className="button">
                Conheça a AEE
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Rede educacional</p>
          <h2 className="section-title">Nossas instituições</h2>
          <p className="section-subtitle">
            Instituições de educação básica, formação profissional e ensino superior, todas
            credenciadas junto ao Ministério da Educação (MEC).
          </p>
          <div className="grid grid--3">
            {others.map((inst) => (
              <Link key={inst.id} href={`/${inst.slug}`} className="card">
                <div className="card__body">
                  <span className="badge badge--level" style={{ alignSelf: 'flex-start' }}>
                    {TYPE_LABELS[inst.type] || inst.type}
                  </span>
                  <h3 style={{ margin: '4px 0' }}>{inst.name}</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                    {inst.shortDescription}
                  </p>
                  {inst.city && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{inst.city}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
