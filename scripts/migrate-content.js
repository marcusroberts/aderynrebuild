/**
 * Content Migration Script for Aderyn Building Consultancy
 * 
 * This script helps migrate content from the existing static website
 * to the new Sanity CMS. Run this after setting up your Sanity project.
 * 
 * Usage:
 * 1. Set up your .env.local file with Sanity credentials
 * 2. Run: node scripts/migrate-content.js
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
});

// Site Settings Data
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'Aderyn Building Consultancy',
  description: 'Independent Chartered Building Surveying firm providing clear, concise, tailored building surveying, construction and property advice for Landlords, Occupiers and Investors.',
  contactInfo: {
    email: 'info@aderynbc.com',
    phone: '(029) 2056 8136',
  },
  offices: [
    {
      name: 'Cardiff Office',
      address: {
        building: 'Sophia House',
        street: '28 Cathedral Road',
        city: 'Cardiff',
        postcode: 'CF11 9LJ',
      },
      phone: '(029) 2056 8136',
      email: 'info@aderynbc.com',
    },
    {
      name: 'Swansea Office',
      address: {
        building: 'Princess House',
        street: 'Princess Way',
        city: 'Swansea',
        postcode: 'SA1 3LW',
      },
      phone: '(01792) 805100',
      email: 'info@aderynbc.com',
    },
  ],
  seo: {
    metaTitle: 'Aderyn Building Consultancy | Building Surveyors Cardiff & Swansea',
    metaDescription: 'Independent Chartered Building Surveying firm providing clear, concise, tailored building surveying, construction and property advice for Landlords, Occupiers and Investors.',
  },
};

// Pages Data
const pages = [
  {
    _type: 'page',
    title: 'About Us',
    slug: { current: 'about-us' },
    order: 1,
    showInNavigation: true,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Aderyn Building Consultancy is an independent Chartered Building Surveying firm providing clear, concise, tailored building surveying, construction and property advice for Landlords, Occupiers and Investors of commercial and residential property.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'With our diverse range of property knowledge and experience, we are able to offer our clients a comprehensive array of real estate services.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'About Us - Aderyn Building Consultancy',
      metaDescription: 'Learn about Aderyn Building Consultancy, an independent Chartered Building Surveying firm with offices in Cardiff and Swansea.',
    },
  },
  {
    _type: 'page',
    title: 'Party Wall Matters',
    slug: { current: 'party-wall-matters' },
    order: 2,
    showInNavigation: true,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We provide comprehensive party wall services in accordance with the Party Wall etc. Act 1996.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Party Wall Matters - Aderyn Building Consultancy',
      metaDescription: 'Expert party wall services in accordance with the Party Wall etc. Act 1996.',
    },
  },
  {
    _type: 'page',
    title: 'Accreditations',
    slug: { current: 'accreditations' },
    order: 3,
    showInNavigation: true,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Our team holds relevant professional qualifications and accreditations to ensure the highest standards of service.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Accreditations - Aderyn Building Consultancy',
      metaDescription: 'Professional qualifications and accreditations of the Aderyn Building Consultancy team.',
    },
  },
  {
    _type: 'page',
    title: 'Privacy Statement',
    slug: { current: 'privacy-statement' },
    order: 4,
    showInNavigation: false,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'This privacy statement explains how we collect, use, and protect your personal information.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Privacy Statement - Aderyn Building Consultancy',
      metaDescription: 'Privacy policy and data protection information for Aderyn Building Consultancy.',
    },
  },
];

// Services Data
const services = [
  // Building Surveys
  {
    _type: 'service',
    title: 'Due Diligence Building Surveys',
    slug: { current: 'due-diligence-building-surveys' },
    category: 'building-surveys',
    order: 1,
    description: 'Comprehensive building surveys for property acquisition and investment decisions.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Our due diligence building surveys provide detailed assessments of property condition to support informed investment and acquisition decisions.',
          },
        ],
      },
    ],
  },
  {
    _type: 'service',
    title: 'Vendor Surveys',
    slug: { current: 'vendor-surveys' },
    category: 'building-surveys',
    order: 2,
    description: 'Pre-sale property surveys to identify and address potential issues before marketing.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vendor surveys help property owners identify and address potential issues before bringing their property to market.',
          },
        ],
      },
    ],
  },
  {
    _type: 'service',
    title: 'Planned Preventative Maintenance Surveys',
    slug: { current: 'planned-preventative-maintenance-surveys' },
    category: 'building-surveys',
    order: 3,
    description: 'Strategic maintenance planning to preserve property value and prevent costly repairs.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Our planned preventative maintenance surveys help property owners develop strategic maintenance programs to preserve value and prevent costly emergency repairs.',
          },
        ],
      },
    ],
  },
  {
    _type: 'service',
    title: 'Building Pathology / Defect Diagnosis',
    slug: { current: 'building-pathology-defect-diagnosis' },
    category: 'building-surveys',
    order: 4,
    description: 'Expert diagnosis of building defects and pathology issues.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Specialist building pathology services to diagnose complex defects and provide expert remedial advice.',
          },
        ],
      },
    ],
  },
  // Landlord and Tenant Services
  {
    _type: 'service',
    title: 'Dilapidations',
    slug: { current: 'dilapidations' },
    category: 'landlord-tenant',
    order: 1,
    description: 'Expert dilapidations advice for landlords and tenants.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Comprehensive dilapidations services including schedules, negotiations, and dispute resolution.',
          },
        ],
      },
    ],
  },
  {
    _type: 'service',
    title: 'Licence to Alter',
    slug: { current: 'licence-to-alter' },
    category: 'landlord-tenant',
    order: 2,
    description: 'Licence to alter applications and approvals for tenant improvements.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Expert assistance with licence to alter applications and tenant improvement approvals.',
          },
        ],
      },
    ],
  },
  // Add more services as needed...
];

// Navigation Data
const navigation = {
  _type: 'navigation',
  _id: 'navigation',
  title: 'Main Navigation',
  mainNavigation: [
    {
      title: 'Home',
      link: {
        type: 'custom',
        custom: '/',
      },
    },
    {
      title: 'About Us',
      link: {
        type: 'custom',
        custom: '/about-us',
      },
    },
    {
      title: 'Building Surveys',
      link: {
        type: 'custom',
        custom: '/services',
      },
      subItems: [
        {
          title: 'Due Diligence Building Surveys',
          link: {
            type: 'custom',
            custom: '/services/due-diligence-building-surveys',
          },
        },
        {
          title: 'Vendor Surveys',
          link: {
            type: 'custom',
            custom: '/services/vendor-surveys',
          },
        },
      ],
    },
    {
      title: 'Services',
      link: {
        type: 'custom',
        custom: '/services',
      },
    },
    {
      title: 'Contact Us',
      link: {
        type: 'custom',
        custom: '/contact-us',
      },
    },
  ],
};

async function migrateContent() {
  try {
    console.log('Starting content migration...');

    // Create site settings
    console.log('Creating site settings...');
    await client.createOrReplace(siteSettings);

    // Create pages
    console.log('Creating pages...');
    for (const page of pages) {
      await client.create(page);
    }

    // Create services
    console.log('Creating services...');
    for (const service of services) {
      await client.create(service);
    }

    // Create navigation
    console.log('Creating navigation...');
    await client.createOrReplace(navigation);

    console.log('Content migration completed successfully!');
    console.log('You can now access the CMS at http://localhost:3000/studio');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Check if required environment variables are set
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set SANITY_API_TOKEN in your .env.local file');
  console.error('You can get this token from https://sanity.io/manage');
  process.exit(1);
}

// Run migration
migrateContent();
