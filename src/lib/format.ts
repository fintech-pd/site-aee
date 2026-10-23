import { LEGAL_ACT_TYPES, ISSUING_BODIES } from '@/lib/constants'

const ACT_ABBREVIATIONS: Record<string, string> = {
  autorizacao: 'Aut. Port.',
  reconhecimento: 'Rec. Port.',
  renovacao: 'Renov. Rec. Port.',
  resolucao_cee: 'Resolução CEE',
  parecer_cne: 'Parecer CNE/CES',
  decreto: 'Decreto',
  outro: 'Ato',
}

const BODY_LABELS: Record<string, string> = ISSUING_BODIES.reduce(
  (acc, item) => ({ ...acc, [item.value]: item.label }),
  {} as Record<string, string>,
)

export const LEGAL_ACT_TYPE_LABELS: Record<string, string> = LEGAL_ACT_TYPES.reduce(
  (acc, item) => ({ ...acc, [item.value]: item.label }),
  {} as Record<string, string>,
)

export function formatDateBR(dateString?: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export function formatLegalAct(act: {
  type: string
  issuingBody: string
  number: string
  date: string
  subJudice?: boolean | null
  displayText?: string | null
}): string {
  if (act.displayText) return act.displayText

  const abbreviation = ACT_ABBREVIATIONS[act.type] || 'Ato'
  const body = BODY_LABELS[act.issuingBody] || act.issuingBody
  const date = formatDateBR(act.date)
  const suffix = act.subJudice ? ' (sub judice)' : ''

  return `${abbreviation} nº ${act.number} - ${body}, ${date}${suffix}`
}
