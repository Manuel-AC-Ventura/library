import { DeleteButtonForm } from '@/components/delete-button'
import { deleteStaff } from '@/lib/actions-staff'

export function StaffDeleteButton({ id }: { id: number }) {
  return <DeleteButtonForm id={id} action={deleteStaff} label="Excluir" />
}
