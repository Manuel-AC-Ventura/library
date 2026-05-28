import Link from 'next/link'
import { getStaffList } from '@/lib/actions-staff'
import { StaffDeleteButton } from './delete-button'
import { PageHeader } from '@/components/page-header'
import { UserPlus, Users, Shield, ShieldOff, Edit3 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StaffPage() {
  const staff = await getStaffList()

  return (
    <div>
      <PageHeader
        title="Funcionários"
        description="Gerencie os funcionários da biblioteca."
        action={
          <Link href="/staff/new" className="btn-primary">
            <UserPlus className="h-4 w-4" />
            Novo Funcionário
          </Link>
        }
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nome</th>
                <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
                <th className="table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Cargo</th>
                <th className="hidden table-cell text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">Cadastro</th>
                <th className="table-cell text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {staff.map((member) => (
                <tr key={member.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="table-cell text-gray-600 dark:text-gray-400">{member.email}</td>
                  <td className="table-cell">
                    {member.role === 'admin' ? (
                      <span className="badge-blue">
                        <Shield className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="badge-gray">
                        <ShieldOff className="h-3 w-3" />
                        Funcionário
                      </span>
                    )}
                  </td>
                  <td className="hidden table-cell text-gray-500 dark:text-gray-400 lg:table-cell">
                    {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/staff/${member.id}`}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        <Edit3 className="h-3 w-3" />
                        Editar
                      </Link>
                      <StaffDeleteButton id={member.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-50 dark:border-gray-800 px-6 py-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {staff.length} {staff.length === 1 ? 'funcionário' : 'funcionários'}
          </p>
        </div>
      </div>
    </div>
  )
}
