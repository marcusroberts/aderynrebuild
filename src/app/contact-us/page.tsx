import { client, queries } from '@/lib/sanity'
import PageHeader from '@/components/PageHeader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Aderyn Building Consultancy',
  description: 'Get in touch with Aderyn Building Consultancy. We have offices in Cardiff and Swansea and provide national coverage.',
};

async function getSiteSettings() {
  try {
    return await client.fetch(queries.siteSettings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  // Default office information if not available from CMS
  const defaultOffices = [
    {
      name: 'Cardiff Office',
      address: {
        building: 'Sophia House',
        street: '28 Cathedral Road',
        city: 'Cardiff',
        postcode: 'CF11 9LJ'
      },
      phone: '(029) 2056 8136',
      email: 'info@aderynbc.com'
    },
    {
      name: 'Swansea Office',
      address: {
        building: 'Princess House',
        street: 'Princess Way',
        city: 'Swansea',
        postcode: 'SA1 3LW'
      },
      phone: '(01792) 805100',
      email: 'info@aderynbc.com'
    }
  ];

  const offices = siteSettings?.offices || defaultOffices;

  return (
    <div>
      <PageHeader 
        title="Contact Us" 
        description="Get in touch with our experienced team for professional building surveying advice"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Office Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Offices</h2>
            <div className="space-y-8">
              {offices.map((office: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {office.name}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    {office.address?.building && (
                      <p>{office.address.building}</p>
                    )}
                    {office.address?.street && (
                      <p>{office.address.street}</p>
                    )}
                    <p>
                      {office.address?.city}
                      {office.address?.postcode && ` ${office.address.postcode}`}
                    </p>
                    {office.phone && (
                      <p className="mt-4">
                        <span className="font-medium">Tel:</span>{' '}
                        <a 
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {office.phone}
                        </a>
                      </p>
                    )}
                    {office.email && (
                      <p>
                        <span className="font-medium">Email:</span>{' '}
                        <a 
                          href={`mailto:${office.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {office.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Send Message
              </button>
            </form>
            
            <p className="mt-4 text-sm text-gray-600">
              * Required fields
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              National Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With offices in Cardiff and Swansea, we provide a national service to our client base. 
              We are experienced in working across the UK and can provide our services wherever you need them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
