'use client'

import { useRouter } from 'next/navigation'
import { createStaff, updateStaff } from '@/lib/actions-staff'
import { SubmitButton } from '@/components/submit-button'
import { Check } from 'lucide-react'

export function StaffForm({
  staff,
}: {
  staff?: { id: number; name: string; email: string; role: string }
}) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = formData.get('role') as string
    const password = formData.get('password') as string

    try {
      if (staff) {
        const data: { name: string; email: string; role: string; password?: string } = { name, email, role }
        if (password) data.password = password
        await updateStaff(staff.id, data)
      } else {
        await createStaff({ name, email, password, role })
      }
      router.push('/staff')
      router.refresh()
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erro ao salvar funcionário.')
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
          defaultValue={staff?.name}
          placeholder="Ex: João Silva"
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
          defaultValue={staff?.email}
          placeholder="Ex: joao@biblioteca.com"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {staff ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required={!staff}
          placeholder={staff ? '••••••••' : 'Mínimo 6 caracteres'}
          minLength={staff ? 0 : 6}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cargo
        </label>
        <select name="role" id="role" required defaultValue={staff?.role || 'staff'} className="input-field">
          <option value="staff">Funcionário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <SubmitButton loadingLabel="Salvando...">
          <Check className="h-4 w-4" />
          {staff ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}
        </SubmitButton>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
