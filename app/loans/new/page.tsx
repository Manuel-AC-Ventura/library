import { getClients, getBooks } from '@/lib/actions'
import { BorrowForm } from './form'
import { PageHeader } from '@/components/page-header'

export const dynamic = 'force-dynamic'

export default async function NewLoanPage() {
  const [clients, books] = await Promise.all([getClients(), getBooks()])
  const availableBooks = books.filter((b) => (b as any).activeLoans < b.quantity)

  return (
    <div>
      <PageHeader
        title="Novo Empréstimo"
        description="Registre o empréstimo de um livro para um leitor."
        breadcrumb={[
          { href: '/loans', label: 'Empréstimos' },
          { href: '/loans/new', label: 'Novo' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <BorrowForm clients={clients} books={availableBooks} totalBooks={books.length} />
      </div>
    </div>
  )
}
