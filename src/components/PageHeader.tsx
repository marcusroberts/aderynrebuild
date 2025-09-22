interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
