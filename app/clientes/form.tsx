'use client'

import { useRouter } from 'next/navigation'
import { createClient, updateClient } from '@/lib/actions'
import type { Client } from '@prisma/client'
import { SubmitButton } from '@/components/submit-button'
import { Check } from 'lucide-react'

export function ClientForm({ client }: { client?: Client }) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      identityCard: formData.get('identityCard') as string,
      studentId: formData.get('studentId') as string,
      phone: (formData.get('phone') as string) || undefined,
    }

    try {
      if (client) {
        await updateClient(client.id, data)
      } else {
        await createClient(data)
      }
      router.push('/clientes')
      router.refresh()
    } catch {
      alert('Erro ao salvar cliente.')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={client?.name}
          placeholder="Ex: Ana Silva"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          defaultValue={client?.email}
          placeholder="Ex: ana@email.com"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="identityCard" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          BI
        </label>
        <input
          type="text"
          name="identityCard"
          id="identityCard"
          required
          defaultValue={client?.identityCard}
          placeholder="Ex: 000000001LA000"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Telefone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          defaultValue={client?.phone || ''}
          placeholder="Ex: +244 923 456 789"
          className="input-field"
        />
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Opcional</p>
      </div>
      <div>
        <label htmlFor="studentId" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nº de Estudante
        </label>
        <input
          type="text"
          name="studentId"
          id="studentId"
          required
          defaultValue={client?.studentId}
          placeholder="Ex: 2024001"
          className="input-field"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <SubmitButton loadingLabel="Salvando...">
          <Check className="h-4 w-4" />
          {client ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </SubmitButton>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
