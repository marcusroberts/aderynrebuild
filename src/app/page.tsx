import { client, queries } from '@/lib/sanity'
import ServiceCard from '@/components/ServiceCard'

async function getHomePageData() {
  try {
    const [pages, services] = await Promise.all([
      client.fetch(queries.pages),
      client.fetch(queries.services)
    ]);

    const homePage = pages.find((page: any) => page.slug?.current === 'home' || page.slug?.current === '/');
    return { homePage, services };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return { homePage: null, services: [] };
  }
}

export default async function Home() {
  const { homePage, services } = await getHomePageData();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Aderyn Building Consultancy
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Independent Chartered Building Surveying firm providing clear, concise, tailored building surveying,
              construction and property advice for Landlords, Occupiers and Investors of commercial and residential property.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <p className="text-lg text-gray-700">
                With our diverse range of property knowledge and experience, we are able to offer our clients a comprehensive array of real estate services.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-medium text-gray-800">
                With offices in Cardiff and Swansea we provide a national service to our client base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive building surveying and property services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service: any) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  description={service.description}
                  slug={service.slug.current}
                  category={service.category}
                />
              ))}
            </div>
            {services.length > 6 && (
              <div className="text-center mt-12">
                <a
                  href="/services"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View All Services
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cardiff Office</h3>
                <p className="text-gray-600 mb-2">Sophia House</p>
                <p className="text-gray-600 mb-2">28 Cathedral Road</p>
                <p className="text-gray-600 mb-2">Cardiff CF11 9LJ</p>
                <p className="text-gray-600 mb-2">Tel: (029) 2056 8136</p>
                <p className="text-gray-600">Email: info@aderynbc.com</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Swansea Office</h3>
                <p className="text-gray-600 mb-2">Princess House</p>
                <p className="text-gray-600 mb-2">Princess Way</p>
                <p className="text-gray-600 mb-2">Swansea SA1 3LW</p>
                <p className="text-gray-600 mb-2">Tel: (01792) 805100</p>
                <p className="text-gray-600">Email: info@aderynbc.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
