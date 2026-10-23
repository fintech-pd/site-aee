import type { CollectionConfig } from 'payload'
import { INSTITUTION_TYPES } from '../lib/constants.ts'
import { authenticated } from '../access/authenticated.ts'

export const Institutions: CollectionConfig = {
  slug: 'institutions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'city'],
    group: 'Instituições',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome da instituição',
    },
    {
      name: 'shortName',
      type: 'text',
      label: 'Sigla / nome curto',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Identificador usado nas URLs do site, ex: unievangelica, couto-magalhaes-anapolis',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: INSTITUTION_TYPES as unknown as { label: string; value: string }[],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'institutions',
      label: 'Mantenedora / instituição superior',
      admin: {
        description: 'Relaciona esta instituição à sua mantenedora (Associação Educativa Evangélica)',
      },
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Domínio de produção (ex: www.unievangelica.edu.br). Usado para roteamento multi-tenant.',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Site oficial (link externo)',
      admin: {
        description:
          'Se preenchido, os cards de "Nossas mantidas" no site da mantenedora apontam para este link em vez da página interna desta instituição.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoLight',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (versão clara, para fundos escuros)',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'theme',
      type: 'group',
      label: 'Identidade visual',
      fields: [
        { name: 'primaryColor', type: 'text', defaultValue: '#17365D', admin: { description: 'Cor primária (hex)' } },
        { name: 'secondaryColor', type: 'text', defaultValue: '#B89553', admin: { description: 'Cor secundária (hex)' } },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descrição curta (usada em listagens e SEO)',
    },
    {
      name: 'about',
      type: 'richText',
      label: 'Sobre / apresentação institucional',
    },
    {
      name: 'mission',
      type: 'richText',
      label: 'Missão',
    },
    {
      name: 'vision',
      type: 'richText',
      label: 'Visão',
    },
    {
      name: 'values',
      type: 'richText',
      label: 'Valores',
    },
    {
      name: 'history',
      type: 'richText',
      label: 'História',
    },
    {
      name: 'mecAuthorization',
      type: 'group',
      label: 'Credenciamento junto ao MEC',
      admin: {
        description: 'Dados de credenciamento institucional perante o MEC/SERES, exibidos na página institucional.',
      },
      fields: [
        { name: 'mecCode', type: 'text', label: 'Código MEC (e-MEC)' },
        { name: 'credenciamentoAto', type: 'text', label: 'Ato de credenciamento' },
        { name: 'credenciamentoData', type: 'date', label: 'Data do ato' },
        { name: 'credenciamentoVigencia', type: 'text', label: 'Vigência' },
        { name: 'igc', type: 'text', label: 'IGC (Índice Geral de Cursos)' },
        { name: 'notes', type: 'textarea', label: 'Observações' },
      ],
    },
    {
      name: 'campuses',
      type: 'array',
      label: 'Unidades / campi',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Nome da unidade' },
        { name: 'city', type: 'text', required: true, label: 'Cidade' },
        { name: 'state', type: 'text', defaultValue: 'GO', label: 'UF' },
        { name: 'address', type: 'text', label: 'Endereço completo' },
        { name: 'phone', type: 'text', label: 'Telefone' },
        { name: 'email', type: 'email', label: 'E-mail' },
        { name: 'mapUrl', type: 'text', label: 'Link do Google Maps' },
      ],
    },
    {
      name: 'city',
      type: 'text',
      label: 'Cidade sede (para listagens)',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contato institucional',
      fields: [
        { name: 'phone', type: 'text', label: 'Telefone' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
        { name: 'email', type: 'email', label: 'E-mail' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociais',
      fields: [
        {
          name: 'network',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'organizationalChart',
      type: 'group',
      label: 'Matriz / Estrutura organizacional',
      admin: {
        description: 'Documento e/ou imagem do organograma institucional.',
      },
      fields: [
        { name: 'document', type: 'upload', relationTo: 'media', label: 'Organograma (imagem)' },
        { name: 'description', type: 'richText', label: 'Descrição da estrutura organizacional' },
      ],
    },
    {
      name: 'governance',
      type: 'richText',
      label: 'Governança institucional',
      admin: {
        description:
          'Texto sobre a governança institucional (conselho deliberativo e demais estruturas de gestão). Usado principalmente pela mantenedora.',
      },
    },
    {
      name: 'chaplaincy',
      type: 'richText',
      label: 'Capelania',
      admin: {
        description: 'Texto sobre a capelania e iniciativas relacionadas aos valores institucionais.',
      },
    },
  ],
}
