import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Throttle simples em memória para reduzir envios automatizados/abusivos do formulário de
// contato (1 envio por IP a cada 30 segundos). Não substitui um captcha para tráfego em larga
// escala, mas é suficiente para o volume esperado de um site institucional sem depender de
// serviços externos. Reinicia a cada deploy e não é compartilhado entre múltiplas instâncias.
const lastSubmissionByIp = new Map<string, number>()
const THROTTLE_WINDOW_MS = 30_000

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  const { institutionId, name, email, phone, subject, message, consent, website } = body as Record<
    string,
    unknown
  >

  // Campo-armadilha (honeypot): invisível para humanos, mas preenchido por bots automatizados.
  // Respondemos como sucesso para não indicar ao bot que foi identificado.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ message: 'Mensagem enviada com sucesso.' })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const lastSubmission = lastSubmissionByIp.get(ip)
  if (lastSubmission && Date.now() - lastSubmission < THROTTLE_WINDOW_MS) {
    return NextResponse.json(
      { error: 'Aguarde um momento antes de enviar outra mensagem.' },
      { status: 429 },
    )
  }

  if (
    !institutionId ||
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !isValidEmail(email) ||
    typeof message !== 'string' ||
    !message.trim() ||
    consent !== true
  ) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatórios corretamente.' }, { status: 400 })
  }

  const payload = await getPayloadClient()

  try {
    await payload.create({
      collection: 'contact-messages',
      data: {
        institution: institutionId as number,
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === 'string' ? phone.trim() : undefined,
        subject: typeof subject === 'string' ? subject.trim() : undefined,
        message: message.trim(),
        consent: true,
      },
    })
    lastSubmissionByIp.set(ip, Date.now())
    return NextResponse.json({ message: 'Mensagem enviada com sucesso.' })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Não foi possível enviar sua mensagem. Tente novamente em alguns instantes.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
