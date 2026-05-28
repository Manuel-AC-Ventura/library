import { notFound } from 'next/navigation'
import { getStaff } from '@/lib/actions-staff'
import { StaffForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  const staff = await getStaff(parseInt(params.id))
  if (!staff) notFound()

  return (
    <div>
      <PageHeader
        title="Editar Funcionário"
        description="Atualize as informações do funcionário."
        breadcrumb={[
          { href: '/staff', label: 'Funcionários' },
          { href: `/staff/${params.id}`, label: 'Editar' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <StaffForm staff={staff} />
      </div>
    </div>
  )
}
