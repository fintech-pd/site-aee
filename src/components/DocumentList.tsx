import type { InstitutionDocument } from '@/payload-types'
import { formatDateBR } from '@/lib/format'

const CATEGORY_LABELS: Record<string, string> = {
  relatorio: 'Relatório',
  estatuto: 'Estatuto',
  politica: 'Política institucional',
  privacidade: 'Política de privacidade',
  ata: 'Ata / Governança',
  publicacao: 'Publicação institucional',
  outro: 'Documento',
}

export function DocumentList({ documents }: { documents: InstitutionDocument[] }) {
  if (documents.length === 0) {
    return (
      <p style={{ color: 'var(--color-muted)' }}>Nenhum documento publicado até o momento.</p>
    )
  }

  return (
    <div className="doc-list">
      {documents.map((doc) => (
        <a
          key={doc.id}
          href={doc.url || '#'}
          target="_blank"
          rel="noreferrer"
          className="doc-item"
        >
          <div className="doc-item__info">
            <h3>{doc.title}</h3>
            <p className="doc-item__meta">
              {CATEGORY_LABELS[doc.category] || doc.category}
              {doc.publishedAt ? ` · ${formatDateBR(doc.publishedAt)}` : ''}
            </p>
          </div>
          <span className="link-arrow">Baixar →</span>
        </a>
      ))}
    </div>
  )
}
