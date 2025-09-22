import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description?: string
  slug: string
  category?: string
}

export default function ServiceCard({ title, description, slug, category }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="mb-4">
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
            {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
        )}
      </div>
      <Link 
        href={`/services/${slug}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        Learn more
        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
