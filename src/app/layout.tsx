import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { client, queries } from "@/lib/sanity";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aderyn Building Consultancy | Building Surveyors Cardiff & Swansea",
  description: "Independent Chartered Building Surveying firm providing clear, concise, tailored building surveying, construction and property advice for Landlords, Occupiers and Investors.",
};

async function getSiteSettings() {
  try {
    return await client.fetch(queries.siteSettings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Layout siteSettings={siteSettings}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
