import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const SiteStats: GlobalConfig = {
  slug: 'site-stats',
  label: 'AEE em Números',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'foundingYear', type: 'number', label: 'Ano de fundação', defaultValue: 1947 },
        { name: 'studentsCount', type: 'text', label: 'Estudantes atendidos (ex: 20.000+)' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'institutionsCount', type: 'number', label: 'Instituições mantidas' },
        { name: 'citiesCount', type: 'number', label: 'Cidades de atuação' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'socialProjectsCount', type: 'text', label: 'Projetos/iniciativas sociais (ex: 12+)' },
        { name: 'referenceDate', type: 'date', label: 'Data de referência dos números' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Observações (fonte dos dados, ressalvas)',
    },
  ],
}
