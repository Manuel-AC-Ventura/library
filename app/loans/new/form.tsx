'use client'

import { useRouter } from 'next/navigation'
import { borrowBook } from '@/lib/actions'
import type { Client, Book } from '@prisma/client'
import { SubmitButton } from '@/components/submit-button'
import { Plus, BookOpen } from 'lucide-react'

export function BorrowForm({
  clients,
  books,
  totalBooks,
}: {
  clients: Client[]
  books: Book[]
  totalBooks: number
}) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const clientId = parseInt(formData.get('clientId') as string)
    const bookId = parseInt(formData.get('bookId') as string)
    const dueDate = new Date(formData.get('dueDate') as string)
    try {
      await borrowBook(clientId, bookId, dueDate)
      router.push('/loans')
      router.refresh()
    } catch {
      alert('Erro ao registrar empréstimo.')
    }
  }

  function defaultDueDate() {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return d.toISOString().split('T')[0]
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="clientId" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cliente
        </label>
        <select name="clientId" id="clientId" required className="input-field">
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} — {client.email}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bookId" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Livro
        </label>
        <select name="bookId" id="bookId" required className="input-field">
          <option value="">Selecione um livro</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} — {book.author}
            </option>
          ))}
        </select>
        {totalBooks === 0 ? (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">Nenhum livro cadastrado na biblioteca.</p>
        ) : (
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <BookOpen className="h-3 w-3" />
            <span>{books.length} disponível(is)</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span>{totalBooks - books.length} emprestado(s)</span>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="dueDate" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Data de Devolução
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          required
          defaultValue={defaultDueDate()}
          min={new Date().toISOString().split('T')[0]}
          className="input-field"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton disabled={books.length === 0} loadingLabel="Registrando...">
          <Plus className="h-4 w-4" />
          Registrar Empréstimo
        </SubmitButton>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
