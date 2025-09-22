'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Office {
  name: string
  phone: string
  email: string
}

interface HeaderProps {
  offices?: Office[]
  email?: string
}

export default function Header({ offices = [], email }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      {/* Top contact bar */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex space-x-6">
              {offices.map((office, index) => (
                <span key={index} className="text-gray-600">
                  {office.name}: {office.phone}
                </span>
              ))}
            </div>
            {email && (
              <a 
                href={`mailto:${email}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Aderyn
            </Link>
            <span className="ml-2 text-sm text-gray-600">
              Building Surveyors Cardiff
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-gray-900">
              About Us
            </Link>
            
            {/* Building Surveys Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Building Surveys
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/services/due-diligence-building-surveys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Due Diligence Building Surveys
                  </Link>
                  <Link href="/services/vendor-surveys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Vendor Surveys
                  </Link>
                  <Link href="/services/planned-preventative-maintenance-surveys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Planned Preventative Maintenance Surveys
                  </Link>
                  <Link href="/services/building-pathology-defect-diagnosis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Building Pathology / Defect Diagnosis
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/party-wall-matters" className="text-gray-700 hover:text-gray-900">
              Party Wall Matters
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Services
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Landlord and Tenant
                  </div>
                  <Link href="/services/dilapidations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dilapidations
                  </Link>
                  <Link href="/services/licence-to-alter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Licence to Alter
                  </Link>
                  <Link href="/services/feasibility-studies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Feasibility Studies
                  </Link>
                  <Link href="/services/reinstatement-cost-assessments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Reinstatement Cost Assessments
                  </Link>
                  <Link href="/services/schedules-of-condition" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Schedules of Condition
                  </Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
                    Project Delivery
                  </div>
                  <Link href="/services/contract-administration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Contract Administration
                  </Link>
                  <Link href="/services/project-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Project Management
                  </Link>
                  <Link href="/services/cdm-2015" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    CDM 2015
                  </Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
                    Professional Services
                  </div>
                  <Link href="/services/exit-strategies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Exit Strategies
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/accreditations" className="text-gray-700 hover:text-gray-900">
              Accreditations
            </Link>
            <Link href="/contact-us" className="text-gray-700 hover:text-gray-900">
              Contact Us
            </Link>
            <Link href="/privacy-statement" className="text-gray-700 hover:text-gray-900">
              Privacy Statement
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Home
              </Link>
              <Link href="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                About Us
              </Link>
              <Link href="/party-wall-matters" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Party Wall Matters
              </Link>
              <Link href="/accreditations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Accreditations
              </Link>
              <Link href="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Contact Us
              </Link>
              <Link href="/privacy-statement" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Privacy Statement
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
