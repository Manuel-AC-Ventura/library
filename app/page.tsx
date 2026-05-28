import Link from 'next/link'
import { getDashboardStats, getActiveLoans } from '@/lib/actions'
import { PageHeader } from '@/components/page-header'
import {
  BookOpen,
  Users,
  CalendarRange,
  FileText,
  ArrowRight,
  Clock,
  AlertTriangle,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const statCards = [
  {
    label: 'Total de Livros',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    icon: BookOpen,
  },
  {
    label: 'Total de Clientes',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: Users,
  },
  {
    label: 'Empréstimos Ativos',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    icon: CalendarRange,
  },
  {
    label: 'Total de Empréstimos',
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    icon: FileText,
  },
]

export default async function Dashboard() {
  const stats = await getDashboardStats()
  const activeLoans = await getActiveLoans()

  const statValues = [
    stats.totalBooks,
    stats.totalClients,
    stats.activeLoans,
    stats.totalLoans,
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral do sistema de gerenciamento da biblioteca."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon
          const value = statValues[i]
          return (
            <div key={card.label} className="stat-card">
              <div className="flex items-center gap-4">
                <div className={`icon-wrapper ${card.color}`}>
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</p>
                  <p className="mt-0.5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <div className={`h-full ${card.color} rounded-full`} style={{ width: `${Math.min(100, (value / 20) * 100)}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Empréstimos Ativos</h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {activeLoans.length} {activeLoans.length === 1 ? 'empréstimo em andamento' : 'empréstimos em andamento'}
              </p>
            </div>
            <Link
              href="/loans"
              className="btn-secondary text-sm px-4 py-2"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {activeLoans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarRange className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nenhum empréstimo ativo</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Todos os livros foram devolvidos.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 dark:border-gray-800">
                    <th className="table-header px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Livro</th>
                    <th className="table-header px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Usuário</th>
                    <th className="table-header px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Empréstimo</th>
                    <th className="table-header px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Previsão</th>
                    <th className="table-header px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {activeLoans.map((loan) => {
                    const isOverdue = new Date(loan.dueDate) < new Date()
                    return (
                      <tr key={loan.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900 dark:text-white">{loan.book.title}</td>
                        <td className="table-cell text-gray-600 dark:text-gray-400">{loan.client.name}</td>
                        <td className="table-cell text-gray-500 dark:text-gray-400">
                          {new Date(loan.borrowedAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="table-cell text-gray-500 dark:text-gray-400">
                          {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="table-cell text-right">
                          {isOverdue ? (
                            <span className="badge-red">
                              <AlertTriangle className="h-3 w-3" />
                              Atrasado
                            </span>
                          ) : (
                            <span className="badge-blue">
                              <Clock className="h-3 w-3" />
                              No prazo
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
