import { notFound } from 'next/navigation'
import { getBook } from '@/lib/actions'
import { BookForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await getBook(parseInt(params.id))
  if (!book) notFound()

  return (
    <div>
      <PageHeader
        title="Editar Livro"
        description="Atualize as informações do livro."
        breadcrumb={[
          { href: '/books', label: 'Livros' },
          { href: `/books/${params.id}`, label: 'Editar' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <BookForm book={book} />
      </div>
    </div>
  )
}
