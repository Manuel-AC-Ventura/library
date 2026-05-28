'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  RefreshCw,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  LogIn,
  UserCircle,
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { logoutAction } from '@/lib/actions-staff'

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/books', label: 'Livros', icon: BookOpen },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/loans', label: 'Empréstimos', icon: RefreshCw },
  { href: '/reports', label: 'Relatórios', icon: BarChart3 },
]

function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
  onClick,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  pathname: string
  onClick?: () => void
}) {
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
      {isActive && (
        <span className="absolute inset-x-2 -bottom-[9px] h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
      )}
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  pathname,
  onClick,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  pathname: string
  onClick?: () => void
}) {
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )
}

export function NavBar({ staffName }: { staffName: string | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthenticated = staffName !== null

  async function handleLogout() {
    await logoutAction()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={isAuthenticated ? '/' : '/login'} className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
              <BookOpen className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Biblioteca
            </span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex md:items-center md:gap-1">
              {links.map((link) => (
                <NavLink key={link.href} {...link} pathname={pathname} />
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  href="/staff"
                  className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:flex"
                  title="Gerenciar funcionários"
                >
                  <Settings className="h-4 w-4" />
                </Link>
                <div className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 md:block" />
                <div className="hidden items-center gap-2 text-sm text-gray-500 dark:text-gray-400 md:flex">
                  <UserCircle className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{staffName}</span>
                </div>
                <form action={handleLogout} className="hidden md:block">
                  <button
                    type="submit"
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    title="Sair"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:flex"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 dark:border-gray-800 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {isAuthenticated ? (
              <>
                {links.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    {...link}
                    pathname={pathname}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
                <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
                <MobileNavLink
                  href="/staff"
                  label="Funcionários"
                  icon={Settings}
                  pathname={pathname}
                  onClick={() => setMobileOpen(false)}
                />
                <form action={handleLogout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </form>
              </>
            ) : (
              <MobileNavLink
                href="/login"
                label="Entrar"
                icon={LogIn}
                pathname={pathname}
                onClick={() => setMobileOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </header>
  )
}
