const LABELS: Record<string, string> = {
  oferta: 'Em oferta',
  suspenso: 'Suspenso',
  em_breve: 'Em breve',
  encerrado: 'Encerrado',
}

export function CourseStatusBadge({ status }: { status: string }) {
  return <span className={`badge badge--${status}`}>{LABELS[status] || status}</span>
}
