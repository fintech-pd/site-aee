import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getPeopleByInstitution } from '@/lib/queries'

const CATEGORY_LABELS: Record<string, string> = {
  diretoria: 'Diretoria / Mantenedora',
  conselho: 'Conselho Deliberativo',
  reitoria: 'Reitoria / Direção Geral',
  coordenacao: 'Coordenação de Curso',
  nde: 'Núcleo Docente Estruturante (NDE)',
  docente: 'Corpo Docente',
  outro: 'Outros',
}

const CATEGORY_ORDER = ['diretoria', 'conselho', 'reitoria', 'coordenacao', 'nde', 'docente', 'outro']

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const people = await getPeopleByInstitution(institution.id)
  const byCategory = new Map<string, typeof people>()
  for (const person of people) {
    const list = byCategory.get(person.category) || []
    list.push(person)
    byCategory.set(person.category, list)
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">Coordenação e Corpo Diretivo</h1>
        <p className="section-subtitle">
          Conheça quem lidera a gestão acadêmica e administrativa de {institution.name}.
        </p>

        {CATEGORY_ORDER.filter((cat) => byCategory.has(cat)).map((cat) => (
          <div key={cat} style={{ marginBottom: 40 }}>
            <h2 style={{ color: 'var(--color-primary)' }}>{CATEGORY_LABELS[cat]}</h2>
            <div className="grid grid--3">
              {byCategory.get(cat)!.map((person) => {
                const photo = typeof person.photo === 'object' ? person.photo?.url : null
                return (
                  <div key={person.id} className="card">
                    {photo && <img src={photo} alt={person.name} className="card__image" />}
                    <div className="card__body">
                      <h3 style={{ margin: 0 }}>{person.name}</h3>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{person.role}</p>
                      {person.email && <p style={{ fontSize: '0.85rem' }}>{person.email}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {people.length === 0 && (
          <p style={{ color: 'var(--color-muted)' }}>
            Informações sobre a coordenação ainda não foram cadastradas.
          </p>
        )}
      </div>
    </main>
  )
}
