import Link from 'next/link'
import { getAllInstitutions } from '@/lib/queries'

export const dynamic = 'force-dynamic'

const TYPE_LABELS: Record<string, string> = {
  mantenedora: 'Mantenedora',
  basica: 'Educação Básica',
  tecnica: 'Educação Técnica',
  superior: 'Educação Superior',
}

export default async function HubPage() {
  const institutions = await getAllInstitutions()
  const mantenedora = institutions.find((i) => i.type === 'mantenedora')
  const others = institutions.filter((i) => i.type !== 'mantenedora')

  return (
    <main>
      <header
        style={{
          background: 'linear-gradient(135deg, #0b3b60, #124d7c)',
          color: '#fff',
          padding: '72px 0',
        }}
      >
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
            Associação Educativa Evangélica
          </p>
          <h1 style={{ fontSize: '2.6rem', maxWidth: 720, margin: '12px 0 16px' }}>
            Educação evangélica de qualidade, da educação básica ao ensino superior
          </h1>
          <p style={{ maxWidth: 640, opacity: 0.9 }}>
            Mantenedora de instituições de ensino em Anápolis, Goianésia e Ceres — Goiás.
          </p>
          {mantenedora && (
            <Link href={`/${mantenedora.slug}`} className="button" style={{ marginTop: 24 }}>
              Conheça a mantenedora
            </Link>
          )}
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nossas instituições</h2>
          <p className="section-subtitle">
            Rede educacional com instituições de educação básica, técnica e superior, todas
            credenciadas junto ao Ministério da Educação (MEC).
          </p>
          <div className="grid grid--3">
            {others.map((inst) => (
              <Link key={inst.id} href={`/${inst.slug}`} className="card">
                <div className="card__body">
                  <span
                    className="badge"
                    style={{ background: '#eef3f8', color: '#0b3b60', alignSelf: 'flex-start' }}
                  >
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
