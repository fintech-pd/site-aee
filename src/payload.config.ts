import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { pushDevSchema } from '@payloadcms/drizzle'
import type { DrizzleAdapter } from '@payloadcms/drizzle/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Institutions } from './collections/Institutions.ts'
import { People } from './collections/People.ts'
import { Courses } from './collections/Courses.ts'
import { News } from './collections/News.ts'
import { Events } from './collections/Events.ts'
import { Slides } from './collections/Slides.ts'
import { TimelineEntries } from './collections/TimelineEntries.ts'
import { Pages } from './collections/Pages.ts'
import { SocialProjects } from './collections/SocialProjects.ts'
import { Documents } from './collections/Documents.ts'
import { ContactMessages } from './collections/ContactMessages.ts'
import { SiteStats } from './globals/SiteStats.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Painel AEE',
    },
  },
  collections: [
    Institutions,
    Pages,
    Courses,
    People,
    News,
    Events,
    Slides,
    TimelineEntries,
    SocialProjects,
    Documents,
    ContactMessages,
    Media,
    Users,
  ],
  globals: [SiteStats],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'aee-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sincroniza automaticamente o esquema do banco (cria/atualiza tabelas) a cada vez que o
  // servidor inicia — inclusive em produção, onde o Payload normalmente só faz isso em
  // desenvolvimento. Dispensa rodar `/api/migrate` manualmente após um deploy (ex: no Render).
  // Como as mudanças de esquema deste projeto são sempre aditivas (novas collections/campos),
  // isso é seguro; mudanças que o Drizzle considerar potencialmente destrutivas pedem
  // confirmação interativa, então evite remover/renomear campos em produção sem rodar
  // `/api/migrate` manualmente primeiro e observar os logs. Defina AUTO_MIGRATE=false para
  // desativar esse comportamento.
  onInit: async (payload) => {
    if (process.env.AUTO_MIGRATE === 'false') return
    try {
      await pushDevSchema(payload.db as unknown as DrizzleAdapter)
      payload.logger.info('[AUTO_MIGRATE] Esquema do banco de dados sincronizado.')
    } catch (error) {
      payload.logger.error(
        `[AUTO_MIGRATE] Falha ao sincronizar esquema do banco: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      // O Supabase exige SSL. Conexões locais (ex: Postgres no seu próprio computador,
      // sem "supabase.co"/"supabase.com" na string de conexão) não precisam de SSL.
      ssl: process.env.DATABASE_URI?.includes('supabase')
        ? { rejectUnauthorized: false }
        : undefined,
    },
  }),
  sharp,
  cors: ['*'],
  plugins: [
    // Armazena os arquivos de mídia no Supabase Storage (compatível com S3) em vez do disco
    // local. Necessário em produção no Render, cujo sistema de arquivos é efêmero (os uploads
    // seriam perdidos a cada novo deploy/reinício). Em desenvolvimento, sem essas variáveis de
    // ambiente configuradas, o plugin fica desabilitado e os uploads continuam indo para
    // ./media (disco local). Veja o README para o passo a passo de configuração no Supabase.
    s3Storage({
      enabled: Boolean(process.env.SUPABASE_S3_ENDPOINT),
      collections: {
        media: true,
        documents: true,
      },
      bucket: process.env.SUPABASE_S3_BUCKET || 'media',
      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT,
        region: process.env.SUPABASE_S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
})
