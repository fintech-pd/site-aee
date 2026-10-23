import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'slug'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: { description: 'Usado na URL: /[instituicao]/paginas/[slug]' },
    },
    { name: 'content', type: 'richText', required: true },
    { name: 'showInMenu', type: 'checkbox', defaultValue: true, label: 'Exibir no menu institucional' },
    { name: 'menuOrder', type: 'number', defaultValue: 0 },
  ],
  indexes: [
    {
      fields: ['institution', 'slug'],
      unique: true,
    },
  ],
}
