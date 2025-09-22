import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0]{
    title,
    description,
    contactInfo,
    offices
  }`,
  
  // Get all pages
  pages: `*[_type == "page"] | order(order asc){
    _id,
    title,
    slug,
    content,
    order,
    showInNavigation
  }`,
  
  // Get page by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    content,
    seo
  }`,
  
  // Get all services
  services: `*[_type == "service"] | order(order asc){
    _id,
    title,
    slug,
    description,
    content,
    category,
    order
  }`,
  
  // Get services by category
  servicesByCategory: `*[_type == "service" && category == $category] | order(order asc){
    _id,
    title,
    slug,
    description,
    content,
    order
  }`,
  
  // Get navigation items
  navigation: `*[_type == "navigation"][0]{
    mainNavigation[]{
      title,
      link,
      subItems[]{
        title,
        link
      }
    }
  }`
}
