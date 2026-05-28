'use client'

import { useRouter } from 'next/navigation'
import { createBook, updateBook } from '@/lib/actions'
import type { Book } from '@prisma/client'
import { SubmitButton } from '@/components/submit-button'
import { Check } from 'lucide-react'

export function BookForm({ book }: { book?: Book }) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      isbn: formData.get('isbn') as string,
    }

    try {
      if (book) {
        await updateBook(book.id, data)
      } else {
        await createBook(data)
      }
      router.push('/books')
      router.refresh()
    } catch {
      alert('Erro ao salvar livro.')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={book?.title}
          placeholder="Ex: Dom Casmurro"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="author" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Autor
        </label>
        <input
          type="text"
          name="author"
          id="author"
          required
          defaultValue={book?.author}
          placeholder="Ex: Machado de Assis"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="isbn" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          ISBN
        </label>
        <input
          type="text"
          name="isbn"
          id="isbn"
          required
          defaultValue={book?.isbn}
          placeholder="Ex: 978-85-01-00001-1"
          className="input-field"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <SubmitButton loadingLabel="Salvando...">
          <Check className="h-4 w-4" />
          {book ? 'Atualizar Livro' : 'Cadastrar Livro'}
        </SubmitButton>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
