export default function DebugPage() {
  const envVars = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Debug Information</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <pre className="text-sm">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Build Information</h2>
        <p>Build time: {new Date().toISOString()}</p>
        <p>Platform: {process.env.VERCEL ? 'Vercel' : 'Local'}</p>
        <p>This page helps debug deployment issues.</p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Links</h2>
        <div className="space-y-2">
          <div><a href="/about-us" className="text-blue-600 hover:underline">About Us</a></div>
          <div><a href="/services" className="text-blue-600 hover:underline">Services</a></div>
          <div><a href="/services/due-diligence-building-surveys" className="text-blue-600 hover:underline">Due Diligence Surveys</a></div>
          <div><a href="/contact-us" className="text-blue-600 hover:underline">Contact Us</a></div>
        </div>
      </div>
    </div>
  );
}
