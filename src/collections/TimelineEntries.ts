import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const TimelineEntries: CollectionConfig = {
  slug: 'timeline-entries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'institution'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
      admin: {
        description: 'Geralmente a mantenedora (Associação Educativa Evangélica), mas pode ser usado por qualquer instituição.',
      },
    },
    { name: 'year', type: 'number', required: true, label: 'Ano' },
    { name: 'title', type: 'text', required: true, label: 'Título do marco' },
    { name: 'description', type: 'textarea', label: 'Descrição' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Ordem dentro do mesmo ano' },
  ],
}
