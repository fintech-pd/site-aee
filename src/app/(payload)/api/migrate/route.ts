import { NextResponse } from 'next/server'
import { pushDevSchema } from '@payloadcms/drizzle'
import type { DrizzleAdapter } from '@payloadcms/drizzle/types'
import { getPayloadClient } from '@/lib/payload'

// Endpoint protegido para sincronizar o esquema do banco de dados (criar/atualizar tabelas)
// em produção, sem depender do comando `payload migrate` via CLI.
//
// Motivo: neste projeto, o CLI do Payload (que usa a ferramenta `tsx` para rodar arquivos
// TypeScript) apresenta um bug de incompatibilidade com `undici`/Node.js em alguns ambientes.
// Este endpoint reaproveita a mesma infraestrutura que já roda o site (bundler do Next.js) para
// aplicar o esquema das collections diretamente no banco, de forma segura para uma sincronização
// aditiva (criação de tabelas novas / colunas novas). Veja README.md para instruções de uso.
//
// Protegido por um segredo (MIGRATE_SECRET) que deve ser definido nas variáveis de ambiente.
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

  try {
    await pushDevSchema(payload.db as unknown as DrizzleAdapter)
    return NextResponse.json({
      message: 'Esquema do banco de dados sincronizado com sucesso.',
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Falha ao sincronizar esquema.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
