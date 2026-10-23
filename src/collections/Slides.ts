import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const Slides: CollectionConfig = {
  slug: 'slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'order', 'active'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título (uso interno)' },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    { name: 'headline', type: 'text', label: 'Título exibido no banner' },
    { name: 'subheadline', type: 'text', label: 'Subtítulo' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'ctaLabel', type: 'text', label: 'Texto do botão' },
    { name: 'ctaUrl', type: 'text', label: 'Link do botão' },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Ordem de exibição' },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Ativo' },
  ],
}
