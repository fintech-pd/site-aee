import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'startDate'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título do evento' },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    { name: 'description', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'location', type: 'text', label: 'Local' },
    { name: 'online', type: 'checkbox', label: 'Evento online', defaultValue: false },
    { name: 'registrationUrl', type: 'text', label: 'Link de inscrição' },
  ],
}
