import { StaffForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default function NewStaffPage() {
  return (
    <div>
      <PageHeader
        title="Novo Funcionário"
        description="Cadastre um novo funcionário na biblioteca."
        breadcrumb={[
          { href: '/staff', label: 'Funcionários' },
          { href: '/staff/new', label: 'Novo' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <StaffForm />
      </div>
    </div>
  )
}
