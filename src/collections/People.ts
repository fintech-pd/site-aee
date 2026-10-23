import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'institution'],
    group: 'Instituições',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome' },
    { name: 'role', type: 'text', required: true, label: 'Cargo / função' },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'coordenacao',
      options: [
        { label: 'Diretoria / Mantenedora', value: 'diretoria' },
        { label: 'Conselho Deliberativo', value: 'conselho' },
        { label: 'Reitoria / Direção Geral', value: 'reitoria' },
        { label: 'Coordenação de Curso', value: 'coordenacao' },
        { label: 'Núcleo Docente Estruturante (NDE)', value: 'nde' },
        { label: 'Corpo Docente', value: 'docente' },
        { label: 'Outro', value: 'outro' },
      ],
    },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    {
      name: 'courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'Curso(s) coordenado(s)',
      admin: { description: 'Preencher quando a pessoa for coordenadora de curso.' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'richText', label: 'Mini-biografia / lattes' },
    { name: 'email', type: 'email' },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 0 },
  ],
}
