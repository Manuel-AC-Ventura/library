import Link from 'next/link'
import { getLoans } from '@/lib/actions'
import { ReturnButton } from './return-button'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { Plus, CalendarRange, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LoansPage() {
  const loans = await getLoans()

  return (
    <div>
      <PageHeader
        title="Empréstimos"
        description="Controle de empréstimos e devoluções."
        action={
          <Link href="/loans/new" className="btn-primary">
            <Plus className="h-4 w-4" />
            Novo Empréstimo
          </Link>
        }
      />

      {loans.length === 0 ? (
        <EmptyState
          icon={CalendarRange}
          title="Nenhum empréstimo registrado"
          description="Registre o primeiro empréstimo para começar."
          action={
            <Link href="/loans/new" className="btn-primary">
              Novo Empréstimo
            </Link>
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Livro</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Usuário</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 md:table-cell">Empréstimo</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Devolução</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="table-cell text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {loans.map((loan) => {
                  const isOverdue = !loan.returnedAt && new Date(loan.dueDate) < new Date()
                  return (
                    <tr key={loan.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{loan.book.title}</span>
                        </div>
                      </td>
                      <td className="table-cell text-gray-600 dark:text-gray-400">{loan.client.name}</td>
                      <td className="hidden table-cell text-gray-500 dark:text-gray-400 md:table-cell">
                        {new Date(loan.borrowedAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="table-cell text-gray-500 dark:text-gray-400">
                        {loan.returnedAt
                          ? new Date(loan.returnedAt).toLocaleDateString('pt-BR')
                          : new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="table-cell">
                        {loan.returnedAt ? (
                          <span className="badge-green">Devolvido</span>
                        ) : isOverdue ? (
                          <span className="badge-red">Atrasado</span>
                        ) : (
                          <span className="badge-blue">Ativo</span>
                        )}
                      </td>
                      <td className="table-cell text-right">
                        {!loan.returnedAt && (
                          <ReturnButton loanId={loan.id} bookId={loan.bookId} />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-50 dark:border-gray-800 px-6 py-3">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {loans.length} {loans.length === 1 ? 'empréstimo registrado' : 'empréstimos registrados'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
