'use client'

import { returnBook } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { SubmitButton } from '@/components/submit-button'
import { CheckCircle } from 'lucide-react'

export function ReturnButton({ loanId, bookId }: { loanId: number; bookId: number }) {
  const router = useRouter()

  async function handleReturn(formData: FormData) {
    if (confirm('Confirmar devolução deste livro?')) {
      try {
        await returnBook(loanId, bookId)
        router.refresh()
      } catch {
        alert('Erro ao registrar devolução.')
      }
    }
  }

  return (
    <form action={handleReturn} className="inline">
      <SubmitButton loadingLabel="Devolvendo..." className="btn-success text-xs">
        <CheckCircle className="h-3.5 w-3.5" />
        Devolver
      </SubmitButton>
    </form>
  )
}
