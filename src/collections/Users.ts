import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administração',
  },
  auth: true,
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrador geral', value: 'admin' },
        { label: 'Editor institucional', value: 'editor' },
      ],
    },
    {
      name: 'institutions',
      type: 'relationship',
      relationTo: 'institutions',
      hasMany: true,
      label: 'Instituições que pode editar',
      admin: {
        description: 'Deixe vazio se for administrador geral com acesso a todas as instituições.',
      },
    },
  ],
}
