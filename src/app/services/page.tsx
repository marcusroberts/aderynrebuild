import { client, queries } from '@/lib/sanity'
import PageHeader from '@/components/PageHeader'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Aderyn Building Consultancy',
  description: 'Comprehensive building surveying and property services including building surveys, party wall matters, dilapidations, and project delivery.',
};

async function getServices() {
  try {
    return await client.fetch(queries.services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

function groupServicesByCategory(services: any[]) {
  const grouped: { [key: string]: any[] } = {};
  
  services.forEach(service => {
    const category = service.category || 'other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(service);
  });
  
  return grouped;
}

function getCategoryTitle(category: string) {
  const titles: { [key: string]: string } = {
    'building-surveys': 'Building Surveys',
    'landlord-tenant': 'Landlord and Tenant',
    'project-delivery': 'Project Delivery',
    'professional-services': 'Professional Services',
    'party-wall': 'Party Wall Matters',
    'other': 'Other Services'
  };
  
  return titles[category] || category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default async function ServicesPage() {
  const services = await getServices();
  const groupedServices = groupServicesByCategory(services);

  return (
    <div>
      <PageHeader 
        title="Our Services" 
        description="Comprehensive building surveying and property services for commercial and residential properties"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {getCategoryTitle(category)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServices.map((service: any) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  description={service.description}
                  slug={service.slug.current}
                  category={service.category}
                />
              ))}
            </div>
          </div>
        ))}
        
        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Services information is being updated. Please contact us for more information about our services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
