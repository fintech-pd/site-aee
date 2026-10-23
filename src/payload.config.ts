import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
    Media,
    Users,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'aee-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:' + path.resolve(dirname, '../aee.db'),
    },
  }),
  sharp,
  cors: ['*'],
})
