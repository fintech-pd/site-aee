import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { richTextFromText } from '@/lib/richtext'
import { institutionsSeed, timelineSeed, coursesSeed } from '@/lib/seed-data'

// Popula o banco com as 7 instituições e conteúdo de EXEMPLO (textos genéricos a serem
// substituídos pelo conteúdo real no painel /admin). Protegido pelo mesmo segredo usado em
// /api/migrate — use apenas uma vez, logo após o primeiro deploy, para começar com uma
// estrutura de dados pronta. Veja README.md.
export async function POST(request: Request) {
  const secret = process.env.MIGRATE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'MIGRATE_SECRET não configurado nas variáveis de ambiente.' },
      { status: 500 },
    )
  }

  const provided = request.headers.get('x-migrate-secret')
  if (provided !== secret) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const payload = await getPayloadClient()

  const existing = await payload.find({ collection: 'institutions', limit: 1 })
  if (existing.totalDocs > 0) {
    return NextResponse.json({
      message: 'Já existem instituições cadastradas. Seed não executado (operação idempotente).',
    })
  }

  const institutionIds: Record<string, number> = {}

  for (const inst of institutionsSeed) {
    const doc = await payload.create({
      collection: 'institutions',
      data: {
        name: inst.name,
        shortName: inst.shortName,
        slug: inst.slug,
        type: inst.type,
        city: inst.city,
        shortDescription: inst.shortDescription,
        about: richTextFromText(inst.about),
        mission: richTextFromText(inst.mission),
        vision: richTextFromText(inst.vision),
        values: richTextFromText(inst.values),
        contact: inst.contact,
        campuses: inst.campuses,
        mecAuthorization: inst.mecAuthorization,
      },
    })
    institutionIds[inst.slug] = doc.id as number
  }

  // Mantenedora passa a ser "parent" das demais instituições
  const aeeId = institutionIds['aee']
  for (const inst of institutionsSeed) {
    if (inst.slug === 'aee') continue
    await payload.update({
      collection: 'institutions',
      id: institutionIds[inst.slug],
      data: { parent: aeeId },
    })
  }

  // Linha do tempo (mantenedora)
  for (const entry of timelineSeed) {
    await payload.create({
      collection: 'timeline-entries',
      data: {
        institution: aeeId,
        year: entry.year,
        title: entry.title,
        description: entry.description,
      },
    })
  }

  // Cursos
  for (const [slug, courses] of Object.entries(coursesSeed)) {
    const institutionId = institutionIds[slug]
    if (!institutionId) continue
    for (const course of courses) {
      await payload.create({
        collection: 'courses',
        data: {
          name: course.name,
          slug: course.slug,
          institution: institutionId,
          level: course.level as never,
          modality: course.modality as never,
          status: course.status as never,
          statusNote: course.statusNote,
          shortDescription: course.shortDescription,
          description: richTextFromText(course.description),
          details: course.details,
          legalActs: course.legalActs as never,
        },
      })
    }
  }

  // Notícias, eventos, slides e pessoas básicas para cada instituição
  for (const inst of institutionsSeed) {
    const institutionId = institutionIds[inst.slug]

    await payload.create({
      collection: 'news',
      data: {
        title: `${inst.shortName} celebra mais um ano de atividades`,
        slug: `${inst.slug}-noticia-boas-vindas`,
        institution: institutionId,
        excerpt: `Confira as novidades de ${inst.name} para este ano.`,
        content: richTextFromText(
          `A comunidade de ${inst.name} iniciou mais um ano de atividades com grandes expectativas. Novos projetos, parcerias e investimentos em infraestrutura marcam este novo ciclo.`,
        ),
        category: 'institucional',
        publishedAt: new Date().toISOString(),
        author: 'Assessoria de Comunicação AEE',
      },
    })

    await payload.create({
      collection: 'events',
      data: {
        title: `Semana de Portas Abertas — ${inst.shortName}`,
        slug: `${inst.slug}-portas-abertas`,
        institution: institutionId,
        description: richTextFromText(
          `Venha conhecer de perto a estrutura e os cursos de ${inst.name}. Visitas guiadas, apresentações e atendimento da equipe pedagógica.`,
        ),
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
        location: inst.campuses?.[0]?.city ? `${inst.name} — ${inst.campuses[0].city}` : inst.name,
        registrationUrl: '#',
      },
    })

    await payload.create({
      collection: 'people',
      data: {
        name: 'A definir',
        role: inst.type === 'mantenedora' ? 'Diretor(a) Presidente' : 'Diretor(a) Geral',
        category: inst.type === 'mantenedora' ? 'diretoria' : 'reitoria',
        institution: institutionId,
        order: 0,
      },
    })
  }

  return NextResponse.json({
    message: 'Seed executado com sucesso.',
    institutions: Object.keys(institutionIds).length,
  })
}
