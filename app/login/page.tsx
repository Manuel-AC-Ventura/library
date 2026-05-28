'use client'

import { useRouter } from 'next/navigation'
import { loginAction } from '@/lib/actions-staff'
import { BookOpen, LogIn } from 'lucide-react'
import { useState } from 'react'
import { SubmitButton } from '@/components/submit-button'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setError('')
    try {
      await loginAction(formData)
      router.push('/')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao fazer login.')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="card p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/50">
              <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Biblioteca
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Acesse com suas credenciais de funcionário
            </p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="funcionario@biblioteca.com"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <SubmitButton loadingLabel="Entrando..." className="btn-primary w-full">
              <LogIn className="h-4 w-4" />
              Entrar
            </SubmitButton>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          Email: admin@biblioteca.com / Senha: admin123
        </p>
      </div>
    </div>
  )
}
