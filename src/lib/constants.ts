export const INSTITUTION_TYPES = [
  { label: 'Mantenedora', value: 'mantenedora' },
  { label: 'Educação Básica', value: 'basica' },
  { label: 'Educação Técnica', value: 'tecnica' },
  { label: 'Educação Superior', value: 'superior' },
] as const

export const COURSE_LEVELS = [
  { label: 'Educação Infantil', value: 'infantil' },
  { label: 'Ensino Fundamental', value: 'fundamental' },
  { label: 'Ensino Médio', value: 'medio' },
  { label: 'Técnico', value: 'tecnico' },
  { label: 'Graduação (Bacharelado)', value: 'bacharelado' },
  { label: 'Graduação (Licenciatura)', value: 'licenciatura' },
  { label: 'Graduação (Tecnólogo)', value: 'tecnologo' },
  { label: 'Pós-graduação', value: 'pos' },
] as const

export const COURSE_MODALITIES = [
  { label: 'Presencial', value: 'presencial' },
  { label: 'EAD', value: 'ead' },
  { label: 'Semipresencial', value: 'semipresencial' },
] as const

export const COURSE_STATUS = [
  { label: 'Em oferta', value: 'oferta' },
  { label: 'Suspenso', value: 'suspenso' },
  { label: 'Em breve', value: 'em_breve' },
  { label: 'Encerrado', value: 'encerrado' },
] as const

export const LEGAL_ACT_TYPES = [
  { label: 'Portaria de Autorização', value: 'autorizacao' },
  { label: 'Portaria de Reconhecimento', value: 'reconhecimento' },
  { label: 'Portaria de Renovação de Reconhecimento', value: 'renovacao' },
  { label: 'Resolução CEE', value: 'resolucao_cee' },
  { label: 'Parecer CNE/CES', value: 'parecer_cne' },
  { label: 'Decreto', value: 'decreto' },
  { label: 'Outro', value: 'outro' },
] as const

export const ISSUING_BODIES = [
  { label: 'SERES/MEC', value: 'seres_mec' },
  { label: 'CNE/CES', value: 'cne_ces' },
  { label: 'CEE', value: 'cee' },
  { label: 'INEP', value: 'inep' },
  { label: 'Outro', value: 'outro' },
] as const
