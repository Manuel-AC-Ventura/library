'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface StatusFilterProps {
  options: { value: string; label: string }[]
  paramName?: string
}

export function StatusFilter({ options, paramName = 'status' }: StatusFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get(paramName) || options[0]?.value || ''

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === options[0]?.value) {
      params.delete(paramName)
    } else {
      params.set(paramName, value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleSelect(opt.value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
            current === opt.value
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
