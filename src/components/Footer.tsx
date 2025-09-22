interface FooterProps {
  companyName?: string
  year?: number
}

export default function Footer({ 
  companyName = "Aderyn Building Consultancy", 
  year = new Date().getFullYear() 
}: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-600">
          © {year} {companyName} ·{' '}
          <span className="text-gray-400">
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
