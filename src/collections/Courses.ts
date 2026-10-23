import type { CollectionConfig } from 'payload'
import {
  COURSE_LEVELS,
  COURSE_MODALITIES,
  COURSE_STATUS,
  LEGAL_ACT_TYPES,
  ISSUING_BODIES,
} from '../lib/constants.ts'
import { authenticated } from '../access/authenticated.ts'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'institution', 'level', 'status'],
    group: 'Cursos',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome do curso' },
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
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: COURSE_LEVELS as unknown as { label: string; value: string }[],
    },
    {
      name: 'modality',
      type: 'select',
      required: true,
      hasMany: true,
      options: COURSE_MODALITIES as unknown as { label: string; value: string }[],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'oferta',
      options: COURSE_STATUS as unknown as { label: string; value: string }[],
      admin: {
        description:
          'Controla se o curso aparece como disponível para matrícula ou como suspenso/em breve/encerrado na página comercial.',
        position: 'sidebar',
      },
    },
    {
      name: 'statusNote',
      type: 'textarea',
      label: 'Observação sobre o status',
      admin: {
        description:
          'Ex: "Entrada suspensa para o próximo vestibular" ou "Sub judice - decisão liminar em vigor".',
        position: 'sidebar',
      },
    },
    { name: 'shortDescription', type: 'textarea', label: 'Descrição curta (card de listagem)' },
    { name: 'description', type: 'richText', label: 'Descrição completa' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'details',
      type: 'group',
      label: 'Informações do curso',
      fields: [
        { name: 'duration', type: 'text', label: 'Duração (ex: 4 anos / 8 semestres)' },
        { name: 'workload', type: 'text', label: 'Carga horária total' },
        { name: 'shift', type: 'text', label: 'Turno(s)' },
        { name: 'degreeTitle', type: 'text', label: 'Título conferido' },
      ],
    },
    {
      name: 'coordinator',
      type: 'relationship',
      relationTo: 'people',
      label: 'Coordenador(a) do curso',
    },
    {
      name: 'legalActs',
      type: 'array',
      label: 'Atos legais / regulatórios (MEC)',
      admin: {
        description:
          'Histórico de autorização, reconhecimento e renovações do curso junto ao MEC. Exibido na página pública do curso.',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: LEGAL_ACT_TYPES as unknown as { label: string; value: string }[],
        },
        {
          name: 'issuingBody',
          type: 'select',
          required: true,
          defaultValue: 'seres_mec',
          label: 'Órgão emissor',
          options: ISSUING_BODIES as unknown as { label: string; value: string }[],
        },
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Número do ato',
          admin: { description: 'Ex: 497' },
        },
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Data de publicação',
        },
        {
          name: 'subJudice',
          type: 'checkbox',
          label: 'Sub judice',
          defaultValue: false,
          admin: { description: 'Marque se o ato está sob discussão judicial.' },
        },
        {
          name: 'displayText',
          type: 'text',
          label: 'Texto formatado para exibição',
          admin: {
            description:
              'Se vazio, será gerado automaticamente a partir dos campos acima. Ex: "Aut. Port. nº 497 - SERES/MEC, 23/09/2026 (sub judice)".',
          },
        },
        { name: 'documentUrl', type: 'text', label: 'Link do documento oficial (D.O.U. / e-MEC)' },
      ],
    },
    {
      name: 'enemAccess',
      type: 'checkbox',
      label: 'Aceita nota do ENEM',
      defaultValue: true,
    },
    {
      name: 'tuition',
      type: 'group',
      label: 'Comercial',
      fields: [
        { name: 'startingPrice', type: 'number', label: 'Mensalidade a partir de (R$)' },
        { name: 'ctaLabel', type: 'text', label: 'Texto do botão de ação', defaultValue: 'Quero me inscrever' },
        { name: 'ctaUrl', type: 'text', label: 'Link do botão (inscrição/vestibular)' },
      ],
    },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 0 },
  ],
}
