'use client'

import { useFormStatus } from 'react-dom'
import { Trash2, Loader2 } from 'lucide-react'

function DeleteButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-danger text-xs"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Excluindo...
        </>
      ) : (
        <>
          <Trash2 className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  )
}

export function DeleteButtonForm({
  id,
  action,
  label = 'Excluir',
}: {
  id: number
  action: (id: number) => Promise<void>
  label?: string
}) {
  async function handleDelete(formData: FormData) {
    if (confirm('Tem certeza? Esta ação não pode ser desfeita.')) {
      try {
        await action(id)
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erro ao excluir'
        alert(message)
      }
    }
  }

  return (
    <form action={handleDelete} className="inline">
      <DeleteButton label={label} />
    </form>
  )
}
