import Link from 'next/link'
import { getClients } from '@/lib/actions'
import { deleteClient } from '@/lib/actions'
import { DeleteButtonForm } from '@/components/delete-button'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { UserPlus, UsersIcon, Edit3, UserX } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes cadastrados na biblioteca."
        action={
          <Link href="/clientes/new" className="btn-primary">
            <UserPlus className="h-4 w-4" />
            Novo Cliente
          </Link>
        }
      />

      {clients.length === 0 ? (
        <EmptyState
          icon={UserX}
          title="Nenhum cliente cadastrado"
          description="Cadastre o primeiro cliente para começar."
          action={
            <Link href="/clientes/new" className="btn-primary">
              Adicionar Cliente
            </Link>
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nome</th>
                  <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 md:table-cell">Nº Estudante</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 md:table-cell">BI</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">Telefone</th>
                  <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">Cadastro</th>
                  <th className="table-cell text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {clients.map((client) => (
                  <tr key={client.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{client.name}</span>
                      </div>
                    </td>
                    <td className="table-cell text-gray-600 dark:text-gray-400">{client.email}</td>
                    <td className="hidden table-cell font-mono text-xs text-gray-500 dark:text-gray-400 md:table-cell">{client.studentId}</td>
                    <td className="hidden table-cell font-mono text-xs text-gray-500 dark:text-gray-400 md:table-cell">{client.identityCard}</td>
                    <td className="hidden table-cell text-gray-500 dark:text-gray-400 lg:table-cell">{client.phone || '—'}</td>
                    <td className="hidden table-cell text-gray-500 dark:text-gray-400 lg:table-cell">
                      {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/clientes/${client.id}`}
                          className="btn-secondary text-xs px-3 py-1.5"
                        >
                          <Edit3 className="h-3 w-3" />
                          Editar
                        </Link>
                        <DeleteButtonForm id={client.id} action={deleteClient} label="Excluir" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-50 dark:border-gray-800 px-6 py-3">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {clients.length} {clients.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
