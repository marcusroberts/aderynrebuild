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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || `${page.title} - Aderyn Building Consultancy`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={page.title} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {page.content && (
          <PortableText value={page.content} />
        )}
      </div>
    </div>
  );
}
