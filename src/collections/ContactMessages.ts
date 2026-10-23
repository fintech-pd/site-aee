import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated.ts'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'institution', 'subject', 'createdAt'],
    group: 'Administração',
  },
  access: {
    // Mensagens recebidas pelo formulário de contato. Leitura restrita à equipe (dados
    // pessoais, LGPD); criação é pública pois é o próprio visitante preenchendo o formulário
    // (a rota de API aplica validação e proteção anti-spam antes de chamar o Payload).
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      required: true,
    },
    { name: 'name', type: 'text', required: true, label: 'Nome' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', label: 'Telefone' },
    { name: 'subject', type: 'text', label: 'Assunto' },
    { name: 'message', type: 'textarea', required: true, label: 'Mensagem' },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      label: 'Consentiu com o tratamento de dados (LGPD)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'novo',
      options: [
        { label: 'Novo', value: 'novo' },
        { label: 'Em atendimento', value: 'em_atendimento' },
        { label: 'Respondido', value: 'respondido' },
        { label: 'Arquivado', value: 'arquivado' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
