import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export default async function OrgChartPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const chart = institution.organizationalChart
  const chartImage =
    chart?.document && typeof chart.document === 'object' ? chart.document.url : null

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <h1 className="section-title">Matriz e Estrutura Organizacional</h1>
        <p className="section-subtitle">
          Estrutura administrativa e organizacional de {institution.name}.
        </p>

        {chartImage && (
          <img
            src={chartImage}
            alt={`Organograma de ${institution.name}`}
            style={{ marginBottom: 24, border: '1px solid var(--color-border)', borderRadius: 10 }}
          />
        )}

        {chart?.description && <RichText data={chart.description} />}

        {institution.campuses && institution.campuses.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Unidades</h2>
            <div className="grid grid--3">
              {institution.campuses.map((campus: NonNullable<typeof institution.campuses>[number], idx: number) => (
                <div key={idx} className="card">
                  <div className="card__body">
                    <h3 style={{ margin: 0 }}>{campus.name}</h3>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                      {campus.address || `${campus.city}/${campus.state}`}
                    </p>
                    {campus.phone && <p style={{ fontSize: '0.85rem' }}>{campus.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
