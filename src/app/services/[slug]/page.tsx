import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import PageHeader from '@/components/PageHeader'
import PortableText from '@/components/PortableText'
import { Metadata } from 'next'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

async function getService(slug: string) {
  try {
    const query = `*[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      content,
      category,
      seo
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

async function getRelatedServices(category: string, currentId: string) {
  try {
    const query = `*[_type == "service" && category == $category && _id != $currentId] | order(order asc)[0...3]{
      _id,
      title,
      slug,
      description,
      category
    }`;
    return await client.fetch(query, { category, currentId });
  } catch (error) {
    console.error('Error fetching related services:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.seo?.metaTitle || `${service.title} - Aderyn Building Consultancy`,
    description: service.seo?.metaDescription || service.description || `${service.title} services from Aderyn Building Consultancy`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = await getRelatedServices(service.category, service._id);

  return (
    <div>
      <PageHeader 
        title={service.title} 
        description={service.description}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {service.content && (
          <PortableText value={service.content} />
        )}
        
        {!service.content && service.description && (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {service.description}
            </p>
          </div>
        )}
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService: any) => (
                <div key={relatedService._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {relatedService.title}
                  </h3>
                  {relatedService.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedService.description}
                    </p>
                  )}
                  <a 
                    href={`/services/${relatedService.slug.current}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help with {service.title}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our experienced team for professional advice and support.
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Get In Touch
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
