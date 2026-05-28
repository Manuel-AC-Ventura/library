'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export function SubmitButton({
  children,
  loadingLabel = 'Salvando...',
  disabled = false,
  className = 'btn-primary',
}: {
  children: React.ReactNode
  loadingLabel?: string
  disabled?: boolean
  className?: string
}) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending || disabled} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )
}
