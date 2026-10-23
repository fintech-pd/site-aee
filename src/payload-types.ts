/* tslint:disable */
/* eslint-disable */
/**
 * Tipos escritos manualmente para o painel AEE, espelhando as collections definidas em
 * src/collections/*.ts.
 *
 * O comando `payload generate:types` (que gera este arquivo automaticamente a partir do
 * payload.config.ts) está sujeito a um bug conhecido de incompatibilidade entre a ferramenta
 * `tsx` e o Node.js 22 neste ambiente de execução (erro "Illegal constructor" ao carregar o
 * módulo `undici` através do hook de require do tsx). Isso não afeta o funcionamento do site
 * (next dev / next build / next start), apenas a regeneração automática deste arquivo.
 *
 * Assim que possível, rode `npm run generate:types` em um ambiente sem esse problema (por
 * exemplo, atualizando o `tsx` ou o Node.js) para substituir este arquivo pela versão gerada
 * automaticamente — ela deve ser equivalente, mas é a fonte da verdade a partir daí.
 */

export type SerializedEditorState = any

export interface Media {
  id: number
  alt: string
  credit?: string | null
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null }
    card?: { url?: string | null; width?: number | null; height?: number | null }
    hero?: { url?: string | null; width?: number | null; height?: number | null }
  }
  updatedAt: string
  createdAt: string
}

export type InstitutionType = 'mantenedora' | 'basica' | 'tecnica' | 'superior'

export interface Campus {
  name: string
  city: string
  state?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  mapUrl?: string | null
  id?: string | null
}

export interface SocialLink {
  network?: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'tiktok' | null
  url?: string | null
  id?: string | null
}

export interface Institution {
  id: number
  name: string
  shortName?: string | null
  slug: string
  type: InstitutionType
  parent?: (number | null) | Institution
  domain?: string | null
  logo?: (number | null) | Media
  logoLight?: (number | null) | Media
  favicon?: (number | null) | Media
  theme?: {
    primaryColor?: string | null
    secondaryColor?: string | null
  }
  shortDescription?: string | null
  about?: SerializedEditorState | null
  mission?: SerializedEditorState | null
  vision?: SerializedEditorState | null
  values?: SerializedEditorState | null
  history?: SerializedEditorState | null
  mecAuthorization?: {
    mecCode?: string | null
    credenciamentoAto?: string | null
    credenciamentoData?: string | null
    credenciamentoVigencia?: string | null
    igc?: string | null
    notes?: string | null
  }
  campuses?: Campus[] | null
  city?: string | null
  contact?: {
    phone?: string | null
    whatsapp?: string | null
    email?: string | null
  }
  socialLinks?: SocialLink[] | null
  organizationalChart?: {
    document?: (number | null) | Media
    description?: SerializedEditorState | null
  }
  updatedAt: string
  createdAt: string
}

export type PersonCategory = 'diretoria' | 'reitoria' | 'coordenacao' | 'nde' | 'docente' | 'outro'

export interface Person {
  id: number
  name: string
  role: string
  category: PersonCategory
  institution: (number | null) | Institution
  courses?: (number | Course)[] | null
  photo?: (number | null) | Media
  bio?: SerializedEditorState | null
  email?: string | null
  order?: number | null
  updatedAt: string
  createdAt: string
}

export type CourseLevel =
  | 'infantil'
  | 'fundamental'
  | 'medio'
  | 'tecnico'
  | 'bacharelado'
  | 'licenciatura'
  | 'tecnologo'
  | 'pos'

export type CourseModality = 'presencial' | 'ead' | 'semipresencial'
export type CourseStatus = 'oferta' | 'suspenso' | 'em_breve' | 'encerrado'

export type LegalActType =
  | 'autorizacao'
  | 'reconhecimento'
  | 'renovacao'
  | 'resolucao_cee'
  | 'parecer_cne'
  | 'decreto'
  | 'outro'

export type IssuingBody = 'seres_mec' | 'cne_ces' | 'cee' | 'inep' | 'outro'

export interface LegalAct {
  type: LegalActType
  issuingBody: IssuingBody
  number: string
  date: string
  subJudice?: boolean | null
  displayText?: string | null
  documentUrl?: string | null
  id?: string | null
}

export interface Course {
  id: number
  name: string
  slug: string
  institution: (number | null) | Institution
  level: CourseLevel
  modality: CourseModality[]
  status: CourseStatus
  statusNote?: string | null
  shortDescription?: string | null
  description?: SerializedEditorState | null
  coverImage?: (number | null) | Media
  details?: {
    duration?: string | null
    workload?: string | null
    shift?: string | null
    degreeTitle?: string | null
  }
  coordinator?: (number | null) | Person
  legalActs?: LegalAct[] | null
  enemAccess?: boolean | null
  tuition?: {
    startingPrice?: number | null
    ctaLabel?: string | null
    ctaUrl?: string | null
  }
  order?: number | null
  updatedAt: string
  createdAt: string
}

export interface News {
  id: number
  title: string
  slug: string
  institution: (number | null) | Institution
  excerpt?: string | null
  content: SerializedEditorState
  coverImage?: (number | null) | Media
  category?: 'institucional' | 'academico' | 'eventos' | 'comercial' | 'extensao' | null
  publishedAt?: string | null
  author?: string | null
  updatedAt: string
  createdAt: string
}

export interface Event {
  id: number
  title: string
  slug: string
  institution: (number | null) | Institution
  description?: SerializedEditorState | null
  coverImage?: (number | null) | Media
  startDate: string
  endDate?: string | null
  location?: string | null
  online?: boolean | null
  registrationUrl?: string | null
  updatedAt: string
  createdAt: string
}

export interface Slide {
  id: number
  title: string
  institution: (number | null) | Institution
  headline?: string | null
  subheadline?: string | null
  image: (number | null) | Media
  ctaLabel?: string | null
  ctaUrl?: string | null
  order?: number | null
  active?: boolean | null
  updatedAt: string
  createdAt: string
}

export interface TimelineEntry {
  id: number
  institution: (number | null) | Institution
  year: number
  title: string
  description?: string | null
  image?: (number | null) | Media
  order?: number | null
  updatedAt: string
  createdAt: string
}

export interface Page {
  id: number
  title: string
  institution: (number | null) | Institution
  slug: string
  content: SerializedEditorState
  showInMenu?: boolean | null
  menuOrder?: number | null
  updatedAt: string
  createdAt: string
}

export interface User {
  id: number
  name?: string | null
  role: 'admin' | 'editor'
  institutions?: (number | Institution)[] | null
  email: string
  updatedAt: string
  createdAt: string
}
