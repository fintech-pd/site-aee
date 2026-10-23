import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'institution', 'section', 'category', 'publishedAt'],
    group: 'Transparência',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: 'documents',
    mimeTypes: ['application/pdf', 'image/*'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título do documento' },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'transparencia',
      label: 'Onde aparece',
      options: [
        { label: 'Transparência', value: 'transparencia' },
        { label: 'Publicações institucionais', value: 'publicacoes' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'relatorio',
      options: [
        { label: 'Relatório', value: 'relatorio' },
        { label: 'Estatuto', value: 'estatuto' },
        { label: 'Política institucional', value: 'politica' },
        { label: 'Política de privacidade', value: 'privacidade' },
        { label: 'Ata / Governança', value: 'ata' },
        { label: 'Publicação institucional', value: 'publicacao' },
        { label: 'Outro', value: 'outro' },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Descrição breve' },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data de referência/publicação',
      defaultValue: () => new Date().toISOString(),
    },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Ordem de exibição' },
  ],
}
