import type React from 'react'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug } from '@/lib/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const dynamic = 'force-dynamic'

export default async function InstitutionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ institution: string }>
}) {
  const { institution: slug } = await params
  const institution = await getInstitutionBySlug(slug)

  if (!institution) {
    notFound()
  }

  return (
    <div
      style={
        {
          '--color-primary': institution.theme?.primaryColor || '#17365d',
          '--color-secondary': institution.theme?.secondaryColor || '#b89553',
        } as React.CSSProperties
      }
    >
      <SiteHeader institution={institution} />
      {children}
      <SiteFooter institution={institution} />
    </div>
  )
}
