import { notFound } from 'next/navigation'
import { client, queries } from '@/lib/sanity'
import PageHeader from '@/components/PageHeader'
import PortableText from '@/components/PortableText'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  try {
    return await client.fetch(queries.pageBySlug, { slug });
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Generate static params for all pages
export async function generateStaticParams() {
  try {
    // For static export, we'll define the known pages
    // In a real deployment, you'd fetch these from Sanity
    return [
      { slug: 'about-us' },
      { slug: 'party-wall-matters' },
      { slug: 'accreditations' },
      { slug: 'privacy-statement' },
    ];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  // Fallback metadata
  const fallbackContent = {
    'about-us': {
      title: 'About Us',
      description: 'Learn about Aderyn Building Consultancy, an independent Chartered Building Surveying firm.'
    },
    'party-wall-matters': {
      title: 'Party Wall Matters',
      description: 'Expert party wall advice and services for property owners and developers.'
    },
    'accreditations': {
      title: 'Accreditations',
      description: 'Our professional accreditations and industry memberships.'
    },
    'privacy-statement': {
      title: 'Privacy Statement',
      description: 'Our commitment to protecting your privacy and personal data.'
    }
  };

  const pageData = page || fallbackContent[slug as keyof typeof fallbackContent];

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page?.seo?.metaTitle || `${pageData.title} - Aderyn Building Consultancy`,
    description: page?.seo?.metaDescription || pageData.description || `${pageData.title} page for Aderyn Building Consultancy`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  // Fallback content for when Sanity data is not available
  const fallbackContent = {
    'about-us': {
      title: 'About Us',
      content: 'Aderyn Building Consultancy is an independent Chartered Building Surveying firm providing clear, concise, tailored building surveying, construction and property advice for Landlords, Occupiers and Investors.'
    },
    'party-wall-matters': {
      title: 'Party Wall Matters',
      content: 'Expert party wall advice and services for property owners and developers.'
    },
    'accreditations': {
      title: 'Accreditations',
      content: 'Our professional accreditations and industry memberships.'
    },
    'privacy-statement': {
      title: 'Privacy Statement',
      content: 'Our commitment to protecting your privacy and personal data.'
    }
  };

  // Use Sanity data if available, otherwise use fallback
  const pageData = page || fallbackContent[slug as keyof typeof fallbackContent];

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={pageData.title} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {page?.content ? (
          <PortableText value={page.content} />
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {pageData.content || pageData.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
