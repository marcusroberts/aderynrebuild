# Deployment Guide

This guide covers deploying your Aderyn Building Consultancy CMS to production.

## Prerequisites

Before deploying, ensure you have:

1. ✅ A working local development environment
2. ✅ A Sanity project set up at [sanity.io](https://sanity.io)
3. ✅ Content migrated to your CMS (optional but recommended)
4. ✅ A hosting platform account (Vercel recommended)

## Step 1: Prepare for Deployment

### 1.1 Environment Variables

Ensure your `.env.local` file contains:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (for content migration)
SANITY_API_TOKEN=your_api_token_here
```

### 1.2 Build Test

Test that your application builds successfully:

```bash
npm run build
```

If there are any build errors, fix them before proceeding.

## Step 2: Deploy to Vercel (Recommended)

### 2.1 Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2.2 Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aderyn CMS"
   git branch -M main
   git remote add origin https://github.com/yourusername/aderyn-cms.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: `./` (or `./aderyn-cms` if in subdirectory)
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**:
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

4. **Deploy**:
   Click "Deploy" and wait for the build to complete.

### 2.3 Deploy via CLI

Alternatively, use the Vercel CLI:

```bash
cd aderyn-cms
vercel
```

Follow the prompts and add environment variables when asked.

## Step 3: Configure Domain (Optional)

### 3.1 Custom Domain

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `aderynbc.com`)
3. Configure DNS records as instructed by Vercel

### 3.2 SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## Step 4: Post-Deployment Setup

### 4.1 Test the Deployment

1. **Website**: Visit your deployed URL
2. **CMS**: Visit `your-domain.com/studio`
3. **Content**: Verify all pages and services load correctly

### 4.2 Configure Sanity CORS

Add your production domain to Sanity CORS settings:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to Settings → API → CORS Origins
4. Add your production domain (e.g., `https://aderynbc.com`)

### 4.3 Content Migration (If Not Done)

If you haven't migrated content yet:

```bash
# Set production environment variables
export NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
export NEXT_PUBLIC_SANITY_DATASET=production
export SANITY_API_TOKEN=your_api_token

# Run migration
npm run migrate
```

## Step 5: Alternative Deployment Platforms

### 5.1 Netlify

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will auto-detect the Next.js configuration

3. **Configure Build Settings** (if not auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

4. **Add Environment Variables**:
   Go to Site Settings → Environment Variables and add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tbyyj269
   NEXT_PUBLIC_SANITY_DATASET=migrated1
   SANITY_API_TOKEN=your_api_token_here
   ```

5. **Deploy**:
   Click "Deploy site" and wait for the build to complete.

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy**:
   ```bash
   cd aderyn-cms
   netlify login
   netlify init
   netlify deploy --prod
   ```

### 5.2 Railway

1. Connect your GitHub repository
2. Add environment variables
3. Railway will auto-detect Next.js and deploy

### 5.3 DigitalOcean App Platform

1. Create a new app from GitHub
2. Configure build settings for Next.js
3. Add environment variables

## Step 6: Monitoring and Maintenance

### 6.1 Analytics (Optional)

Consider adding:
- Google Analytics
- Vercel Analytics
- Sanity Analytics

### 6.2 Performance Monitoring

- Use Vercel's built-in performance monitoring
- Consider tools like Lighthouse CI

### 6.3 Content Backup

Regularly backup your Sanity content:

```bash
npx sanity dataset export production backup.tar.gz
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ recommended)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Sanity Connection Issues**:
   - Verify project ID and dataset name
   - Check CORS settings
   - Ensure API token has correct permissions

3. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Redeploy after adding variables

### Getting Help

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Security Checklist

- ✅ Environment variables are secure
- ✅ Sanity API tokens have minimal required permissions
- ✅ CORS is properly configured
- ✅ No sensitive data in public repository
- ✅ SSL certificate is active

## Performance Checklist

- ✅ Images are optimized
- ✅ Fonts are optimized
- ✅ Build size is reasonable
- ✅ Core Web Vitals are good
- ✅ SEO meta tags are present

Your Aderyn Building Consultancy CMS is now ready for production! 🚀
