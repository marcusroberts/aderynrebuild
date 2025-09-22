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

// Generate static params for all services
export async function generateStaticParams() {
  try {
    // For static export, we'll define the known service slugs
    // In a real deployment, you'd fetch these from Sanity
    return [
      { slug: 'due-diligence-building-surveys' },
      { slug: 'vendor-surveys' },
      { slug: 'planned-preventative-maintenance-surveys' },
      { slug: 'building-pathology-defect-diagnosis' },
      { slug: 'dilapidations' },
      { slug: 'licence-to-alter' },
      { slug: 'feasibility-studies' },
      { slug: 'reinstatement-cost-assessments' },
      { slug: 'schedules-of-condition' },
      { slug: 'contract-administration' },
      { slug: 'project-management' },
      { slug: 'cdm-2015' },
      { slug: 'exit-strategies' },
    ];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
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

  // Fallback metadata
  const fallbackServices = {
    'due-diligence-building-surveys': {
      title: 'Due Diligence Building Surveys',
      description: 'Comprehensive building surveys for property acquisition and investment decisions.',
    },
    'vendor-surveys': {
      title: 'Vendor Surveys',
      description: 'Pre-sale property surveys to identify and address potential issues before marketing.',
    },
    'planned-preventative-maintenance-surveys': {
      title: 'Planned Preventative Maintenance Surveys',
      description: 'Strategic maintenance planning to preserve property value and prevent costly repairs.',
    },
    'building-pathology-defect-diagnosis': {
      title: 'Building Pathology / Defect Diagnosis',
      description: 'Expert diagnosis of building defects and pathology issues.',
    },
    'dilapidations': {
      title: 'Dilapidations',
      description: 'Expert dilapidations advice for landlords and tenants.',
    },
    'licence-to-alter': {
      title: 'Licence to Alter',
      description: 'Licence to alter applications and approvals for tenant improvements.',
    },
    'feasibility-studies': {
      title: 'Feasibility Studies',
      description: 'Comprehensive feasibility assessments for development projects.',
    },
    'reinstatement-cost-assessments': {
      title: 'Reinstatement Cost Assessments',
      description: 'Professional reinstatement cost assessments for insurance purposes.',
    },
    'schedules-of-condition': {
      title: 'Schedules of Condition',
      description: 'Detailed schedules of condition for property documentation.',
    },
    'contract-administration': {
      title: 'Contract Administration',
      description: 'Professional contract administration services for construction projects.',
    },
    'project-management': {
      title: 'Project Management',
      description: 'Comprehensive project management for construction and development projects.',
    },
    'cdm-2015': {
      title: 'CDM 2015',
      description: 'Construction Design and Management Regulations 2015 compliance services.',
    },
    'exit-strategies': {
      title: 'Exit Strategies',
      description: 'Strategic exit planning and implementation for property investments.',
    }
  };

  const serviceData = service || fallbackServices[slug as keyof typeof fallbackServices];

  if (!serviceData) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service?.seo?.metaTitle || `${serviceData.title} - Aderyn Building Consultancy`,
    description: service?.seo?.metaDescription || serviceData.description || `${serviceData.title} services from Aderyn Building Consultancy`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  // Fallback content for when Sanity data is not available
  const fallbackServices = {
    'due-diligence-building-surveys': {
      title: 'Due Diligence Building Surveys',
      description: 'Comprehensive building surveys for property acquisition and investment decisions.',
      category: 'building-surveys'
    },
    'vendor-surveys': {
      title: 'Vendor Surveys',
      description: 'Pre-sale property surveys to identify and address potential issues before marketing.',
      category: 'building-surveys'
    },
    'planned-preventative-maintenance-surveys': {
      title: 'Planned Preventative Maintenance Surveys',
      description: 'Strategic maintenance planning to preserve property value and prevent costly repairs.',
      category: 'building-surveys'
    },
    'building-pathology-defect-diagnosis': {
      title: 'Building Pathology / Defect Diagnosis',
      description: 'Expert diagnosis of building defects and pathology issues.',
      category: 'building-surveys'
    },
    'dilapidations': {
      title: 'Dilapidations',
      description: 'Expert dilapidations advice for landlords and tenants.',
      category: 'landlord-tenant'
    },
    'licence-to-alter': {
      title: 'Licence to Alter',
      description: 'Licence to alter applications and approvals for tenant improvements.',
      category: 'landlord-tenant'
    },
    'feasibility-studies': {
      title: 'Feasibility Studies',
      description: 'Comprehensive feasibility assessments for development projects.',
      category: 'landlord-tenant'
    },
    'reinstatement-cost-assessments': {
      title: 'Reinstatement Cost Assessments',
      description: 'Professional reinstatement cost assessments for insurance purposes.',
      category: 'landlord-tenant'
    },
    'schedules-of-condition': {
      title: 'Schedules of Condition',
      description: 'Detailed schedules of condition for property documentation.',
      category: 'landlord-tenant'
    },
    'contract-administration': {
      title: 'Contract Administration',
      description: 'Professional contract administration services for construction projects.',
      category: 'project-delivery'
    },
    'project-management': {
      title: 'Project Management',
      description: 'Comprehensive project management for construction and development projects.',
      category: 'project-delivery'
    },
    'cdm-2015': {
      title: 'CDM 2015',
      description: 'Construction Design and Management Regulations 2015 compliance services.',
      category: 'project-delivery'
    },
    'exit-strategies': {
      title: 'Exit Strategies',
      description: 'Strategic exit planning and implementation for property investments.',
      category: 'professional-services'
    }
  };

  // Use Sanity data if available, otherwise use fallback
  const serviceData = service || fallbackServices[slug as keyof typeof fallbackServices];

  if (!serviceData) {
    notFound();
  }

  const relatedServices = service ? await getRelatedServices(service.category, service._id) : [];

  return (
    <div>
      <PageHeader
        title={serviceData.title}
        description={serviceData.description}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {service?.content ? (
          <PortableText value={service.content} />
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {serviceData.description}
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
            Need Help with {serviceData.title}?
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
