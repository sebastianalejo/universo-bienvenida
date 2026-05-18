import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Universo de Bienvenida — Para ti, antes de llegar',
  description: 'Un mural de amor construido para ti, antes de que nacieras. Cada mensaje aquí es una pequeña luz esperándote.',
  openGraph: {
    title: 'Universo de Bienvenida',
    description: 'Un mural de amor construido para ti, antes de que nacieras.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
