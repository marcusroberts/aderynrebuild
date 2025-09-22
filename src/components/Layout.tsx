import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Office {
  name: string
  phone: string
  email: string
}

interface LayoutProps {
  children: ReactNode
  siteSettings?: {
    title?: string
    contactInfo?: {
      email?: string
      phone?: string
    }
    offices?: Office[]
  }
}

export default function Layout({ children, siteSettings }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        offices={siteSettings?.offices}
        email={siteSettings?.contactInfo?.email}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer companyName={siteSettings?.title} />
    </div>
  )
}
