import { notFound } from 'next/navigation'
import { getClient } from '@/lib/actions'
import { ClientForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await getClient(parseInt(params.id))
  if (!client) notFound()

  return (
    <div>
      <PageHeader
        title="Editar Cliente"
        description="Atualize as informações do cliente."
        breadcrumb={[
          { href: '/clientes', label: 'Clientes' },
          { href: `/clientes/${params.id}`, label: 'Editar' },
        ]}
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <ClientForm client={client} />
      </div>
    </div>
  )
}
