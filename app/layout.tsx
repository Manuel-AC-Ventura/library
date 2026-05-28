import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Biblioteca - Sistema de Gerenciamento',
  description: 'Sistema de Gerenciamento de Biblioteca',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <NavBar staffName={session?.name ?? null} />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
