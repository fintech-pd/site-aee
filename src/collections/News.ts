import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'publishedAt'],
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    { name: 'excerpt', type: 'textarea', label: 'Resumo (listagens)' },
    { name: 'content', type: 'richText', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Institucional', value: 'institucional' },
        { label: 'Acadêmico', value: 'academico' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Vestibular / Comercial', value: 'comercial' },
        { label: 'Extensão / Comunidade', value: 'extensao' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data de publicação',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
      defaultValue: () => new Date().toISOString(),
    },
    { name: 'author', type: 'text', label: 'Autor / Assessoria de Comunicação' },
  ],
}
