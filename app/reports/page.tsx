import { getMostReadBooks, getActiveReaders } from '@/lib/actions'
import { PageHeader } from '@/components/page-header'
import {
  BookOpen,
  Users,
  Trophy,
  Award,
  Medal,
  Hash,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

function RankIcon({ position }: { position: number }) {
  if (position === 0) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <Trophy className="h-4 w-4 text-amber-600" />
      </span>
    )
  }
  if (position === 1) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </span>
    )
  }
  if (position === 2) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
        <Medal className="h-4 w-4 text-orange-600" />
      </span>
    )
  }
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-xs font-bold text-gray-400 dark:text-gray-500">
      <Hash className="h-3.5 w-3.5" />
    </span>
  )
}

export default async function ReportsPage() {
  const [topBooks, topReaders] = await Promise.all([
    getMostReadBooks(10),
    getActiveReaders(10),
  ])

  return (
    <div>
      <PageHeader
        title="Relatórios"
        description="Estatísticas de leitura e engajamento da biblioteca."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="card">
          <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Livros Mais Lidos</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ranking de livros com mais empréstimos</p>
              </div>
            </div>
          </div>
          {topBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Aguardando registros de empréstimos.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-800 px-6 py-4">
              {topBooks.map((book, index) => (
                <div key={book.id} className="flex items-center gap-4 py-3">
                  <RankIcon position={index} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{book.title}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{book.author}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {book.totalLoans} {book.totalLoans === 1 ? 'vez' : 'vezes'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Leitores Mais Ativos</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ranking de leitores que mais pegam livros</p>
              </div>
            </div>
          </div>
          {topReaders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Aguardando registros de empréstimos.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-800 px-6 py-4">
              {topReaders.map((reader, index) => (
                <div key={reader.id} className="flex items-center gap-4 py-3">
                  <RankIcon position={index} />
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                    {reader.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{reader.name}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{reader.email}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {reader.totalLoans} {reader.totalLoans === 1 ? 'empréstimo' : 'empréstimos'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
