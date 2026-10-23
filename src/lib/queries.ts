import type { Where } from 'payload'
import { getPayloadClient } from '@/lib/payload'
import type {
  Institution,
  Course,
  News,
  Event,
  Slide,
  TimelineEntry,
  Person,
  Page,
} from '@/payload-types'

export async function getInstitutionBySlug(slug: string): Promise<Institution | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'institutions',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (result.docs[0] as unknown as Institution) || null
}

export async function getAllInstitutions(): Promise<Institution[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'institutions',
    limit: 100,
    sort: 'type',
  })
  return result.docs as unknown as Institution[]
}

export async function getMantenedora(): Promise<Institution | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'institutions',
    where: { type: { equals: 'mantenedora' } },
    limit: 1,
  })
  return (result.docs[0] as unknown as Institution) || null
}

export async function getCoursesByInstitution(
  institutionId: string | number,
  opts: { status?: string } = {},
): Promise<Course[]> {
  const payload = await getPayloadClient()
  const where: Where = { institution: { equals: institutionId } }
  if (opts.status) {
    where.status = { equals: opts.status }
  }
  const result = await payload.find({
    collection: 'courses',
    where,
    limit: 200,
    sort: 'order',
    depth: 1,
  })
  return result.docs as unknown as Course[]
}

export async function getCourseBySlug(
  institutionId: string | number,
  slug: string,
): Promise<Course | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'courses',
    where: {
      institution: { equals: institutionId },
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })
  return (result.docs[0] as unknown as Course) || null
}

export async function getNewsByInstitution(
  institutionId: string | number,
  limit = 12,
): Promise<News[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: { institution: { equals: institutionId } },
    sort: '-publishedAt',
    limit,
    depth: 1,
  })
  return result.docs as unknown as News[]
}

export async function getNewsBySlug(
  institutionId: string | number,
  slug: string,
): Promise<News | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: {
      institution: { equals: institutionId },
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  })
  return (result.docs[0] as unknown as News) || null
}

export async function getEventsByInstitution(
  institutionId: string | number,
  limit = 12,
): Promise<Event[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: { institution: { equals: institutionId } },
    sort: 'startDate',
    limit,
    depth: 1,
  })
  return result.docs as unknown as Event[]
}

export async function getEventBySlug(
  institutionId: string | number,
  slug: string,
): Promise<Event | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: {
      institution: { equals: institutionId },
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  })
  return (result.docs[0] as unknown as Event) || null
}

export async function getActiveSlides(institutionId: string | number): Promise<Slide[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'slides',
    where: {
      institution: { equals: institutionId },
      active: { equals: true },
    },
    sort: 'order',
    limit: 10,
    depth: 1,
  })
  return result.docs as unknown as Slide[]
}

export async function getTimelineByInstitution(
  institutionId: string | number,
): Promise<TimelineEntry[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'timeline-entries',
    where: { institution: { equals: institutionId } },
    sort: 'year',
    limit: 200,
    depth: 1,
  })
  return result.docs as unknown as TimelineEntry[]
}

export async function getPeopleByInstitution(
  institutionId: string | number,
  category?: string,
): Promise<Person[]> {
  const payload = await getPayloadClient()
  const where: Where = { institution: { equals: institutionId } }
  if (category) where.category = { equals: category }
  const result = await payload.find({
    collection: 'people',
    where,
    sort: 'order',
    limit: 200,
    depth: 1,
  })
  return result.docs as unknown as Person[]
}

export async function getPagesByInstitution(institutionId: string | number): Promise<Page[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { institution: { equals: institutionId } },
    sort: 'menuOrder',
    limit: 100,
  })
  return result.docs as unknown as Page[]
}

export async function getPageBySlug(
  institutionId: string | number,
  slug: string,
): Promise<Page | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      institution: { equals: institutionId },
      slug: { equals: slug },
    },
    limit: 1,
  })
  return (result.docs[0] as unknown as Page) || null
}
