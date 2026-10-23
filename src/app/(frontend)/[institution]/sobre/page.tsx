import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { RichText } from '@/components/RichText'
import { formatDateBR } from '@/lib/format'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)
  if (!institution) notFound()

  const mec = institution.mecAuthorization

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <h1 className="section-title">{institution.name}</h1>
        <p className="section-subtitle">{institution.shortDescription}</p>

        {institution.about && (
          <div style={{ marginBottom: 32 }}>
            <RichText data={institution.about} />
          </div>
        )}

        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 32 }}
        >
          {institution.mission && (
            <div>
              <h3 style={{ color: 'var(--color-primary)' }}>Missão</h3>
              <RichText data={institution.mission} />
            </div>
          )}
          {institution.vision && (
            <div>
              <h3 style={{ color: 'var(--color-primary)' }}>Visão</h3>
              <RichText data={institution.vision} />
            </div>
          )}
          {institution.values && (
            <div>
              <h3 style={{ color: 'var(--color-primary)' }}>Valores</h3>
              <RichText data={institution.values} />
            </div>
          )}
        </div>

        {institution.history && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Nossa história</h2>
            <RichText data={institution.history} />
          </div>
        )}

        {mec && (mec.mecCode || mec.credenciamentoAto) && (
          <div
            style={{
              background: '#f7f9fb',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <h2 style={{ color: 'var(--color-primary)', marginTop: 0 }}>
              Credenciamento junto ao MEC
            </h2>
            <ul style={{ paddingLeft: 20, color: 'var(--color-text)' }}>
              {mec.mecCode && <li>Código e-MEC: {mec.mecCode}</li>}
              {mec.credenciamentoAto && (
                <li>
                  Ato de credenciamento: {mec.credenciamentoAto}
                  {mec.credenciamentoData && ` — ${formatDateBR(mec.credenciamentoData)}`}
                </li>
              )}
              {mec.credenciamentoVigencia && <li>Vigência: {mec.credenciamentoVigencia}</li>}
              {mec.igc && <li>IGC: {mec.igc}</li>}
            </ul>
            {mec.notes && <p style={{ color: 'var(--color-muted)' }}>{mec.notes}</p>}
          </div>
        )}
      </div>
    </main>
  )
}
