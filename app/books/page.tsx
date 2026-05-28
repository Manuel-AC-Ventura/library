import Link from 'next/link'
import { getBooks } from '@/lib/actions'
import { deleteBook } from '@/lib/actions'
import { DeleteButtonForm } from '@/components/delete-button'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { BookOpen, Plus, BookX, Edit3 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div>
      <PageHeader
        title="Livros"
        description="Gerencie o acervo da biblioteca."
        action={
          <Link href="/books/new" className="btn-primary">
            <Plus className="h-4 w-4" />
            Novo Livro
          </Link>
        }
      />

      {books.length === 0 ? (
        <EmptyState
          icon={BookX}
          title="Nenhum livro cadastrado"
          description="Comece adicionando o primeiro livro ao acervo."
          action={
            <Link href="/books/new" className="btn-primary">
              Adicionar Livro
            </Link>
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Título</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Autor</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:table-cell">ISBN</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="table-cell text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {books.map((book) => (
                  <tr key={book.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                        <span className="font-medium text-gray-900 dark:text-white">{book.title}</span>
                      </div>
                    </td>
                    <td className="table-cell text-gray-600 dark:text-gray-400">{book.author}</td>
                    <td className="hidden table-cell font-mono text-xs text-gray-400 dark:text-gray-500 sm:table-cell">{book.isbn}</td>
                    <td className="table-cell">
                      {book.available ? (
                        <span className="badge-green">Disponível</span>
                      ) : (
                        <span className="badge-amber">Emprestado</span>
                      )}
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/books/${book.id}`}
                          className="btn-secondary text-xs px-3 py-1.5"
                        >
                          <Edit3 className="h-3 w-3" />
                          Editar
                        </Link>
                        <DeleteButtonForm id={book.id} action={deleteBook} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-50 dark:border-gray-800 px-6 py-3">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {books.length} {books.length === 1 ? 'livro cadastrado' : 'livros cadastrados'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
