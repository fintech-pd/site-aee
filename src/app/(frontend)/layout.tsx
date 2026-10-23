import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Associação Educativa Evangélica',
  description:
    'Rede de instituições de ensino básico, técnico e superior mantidas pela Associação Educativa Evangélica (AEE).',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
