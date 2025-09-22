# Aderyn Building Consultancy CMS

A modern, CMS-powered website for Aderyn Building Consultancy built with Next.js and Sanity CMS.

## Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Headless CMS**: Powered by Sanity for easy content management
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO features and meta tag management
- **Fast Performance**: Optimized for speed with Next.js and modern web practices

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended for full Sanity compatibility)
- npm or yarn
- A Sanity account (free at [sanity.io](https://sanity.io))

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd aderyn-cms
   npm install
   ```

2. **Set up Sanity CMS**:

   a. Create a new Sanity project at [sanity.io/manage](https://sanity.io/manage)

   b. Copy your project ID and update the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

   c. Edit `.env.local` and replace the placeholder values:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Deploy the Sanity schema**:
   ```bash
   npx sanity deploy
   ```

4. **Migrate existing content** (optional):

   a. Get a Sanity API token from [sanity.io/manage](https://sanity.io/manage) (Settings > API > Tokens)

   b. Add the token to your `.env.local`:
   ```
   SANITY_API_TOKEN=your_api_token_here
   ```

   c. Run the migration script:
   ```bash
   npm run migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the CMS**:
   - Website: http://localhost:3000
   - CMS Studio: http://localhost:3000/studio

## Content Management

### Accessing the CMS

The Sanity Studio is available at `/studio` when running the development server. Here you can:

- Manage site settings (contact info, offices, etc.)
- Create and edit pages
- Manage services and their categories
- Configure navigation menus

### Content Types

The CMS includes the following content types:

1. **Site Settings**: Global site configuration
   - Company information
   - Contact details
   - Office locations
   - SEO defaults

2. **Pages**: Static pages like About Us, Privacy Policy, etc.
   - Rich text content
   - SEO settings
   - Navigation control

3. **Services**: Individual services offered
   - Categorized by type (Building Surveys, Landlord & Tenant, etc.)
   - Rich text descriptions
   - SEO optimization

4. **Navigation**: Main site navigation
   - Hierarchical menu structure
   - Links to pages, services, or external URLs

### Initial Content Setup

After setting up Sanity, you'll want to create:

1. **Site Settings**: Add your company information and office details
2. **Navigation**: Set up your main menu structure
3. **Pages**: Create essential pages like About Us, Privacy Policy
4. **Services**: Add your building consultancy services

## Development

### Project Structure

```
aderyn-cms/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── studio/         # Sanity Studio
│   │   ├── services/       # Services pages
│   │   └── [slug]/         # Dynamic pages
│   ├── components/         # React components
│   ├── lib/               # Utilities and Sanity client
│   └── sanity/            # Sanity schemas
├── sanity.config.ts       # Sanity configuration
└── README.md
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

The website is designed to be easily customizable:

- **Styling**: Modify Tailwind classes in components
- **Content Types**: Add new schemas in `src/sanity/schemas/`
- **Components**: Create new React components in `src/components/`
- **Pages**: Add new pages in the `src/app/` directory

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Support

For technical support or questions about this implementation, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is built for Aderyn Building Consultancy. All rights reserved.
