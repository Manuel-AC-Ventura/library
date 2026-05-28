import { ClientForm } from '../form'
import { PageHeader } from '@/components/page-header'

export default function NewClientPage() {
  return (
    <div>
      <PageHeader
        title="Novo Cliente"
        description="Cadastre um novo cliente na biblioteca."
      />
      <div className="card max-w-lg p-6 sm:p-8">
        <ClientForm />
      </div>
    </div>
  )
}
