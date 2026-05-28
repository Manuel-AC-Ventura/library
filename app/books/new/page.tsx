import { BookForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default function NewBookPage() {
  return (
    <div>
      <PageHeader
        title="Novo Livro"
        description="Adicione um novo livro ao acervo da biblioteca."
        breadcrumb={[
          { href: '/books', label: 'Livros' },
          { href: '/books/new', label: 'Novo' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <BookForm />
      </div>
    </div>
  )
}
