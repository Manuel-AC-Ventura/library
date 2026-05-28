import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  action,
}: {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumb.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-gray-900 dark:text-white">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl ${breadcrumb ? 'mt-1' : ''}`}>
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
