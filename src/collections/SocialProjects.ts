import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const SocialProjects: CollectionConfig = {
  slug: 'social-projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'category', 'active'],
    group: 'Responsabilidade Social',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Nome do projeto/programa' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
      admin: { description: 'Geralmente a mantenedora (AEE), mas qualquer instituição pode ter projetos próprios.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'educacional',
      options: [
        { label: 'Programa educacional e comunitário', value: 'educacional' },
        { label: 'Inclusão', value: 'inclusao' },
        { label: 'Iniciativa cultural', value: 'cultural' },
        { label: 'Desenvolvimento humano', value: 'desenvolvimento_humano' },
        { label: 'Outro', value: 'outro' },
      ],
    },
    { name: 'summary', type: 'textarea', label: 'Resumo (listagens)' },
    { name: 'description', type: 'richText', label: 'Descrição completa' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'results',
      type: 'array',
      label: 'Resultados e impactos',
      admin: { description: 'Ex: "2.500 pessoas atendidas em 2025".' },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Número/valor' },
        { name: 'label', type: 'text', required: true, label: 'Descrição' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Projeto ativo' },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Ordem de exibição' },
  ],
}
