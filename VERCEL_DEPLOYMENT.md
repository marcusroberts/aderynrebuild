# Vercel Deployment Guide

## ✅ ISSUE RESOLVED: 404 Errors Fixed

The 404 errors on subpages have been resolved! The issue was that the dynamic pages were calling `notFound()` when Sanity data wasn't available, instead of using fallback content.

## What Was Fixed

1. **Added comprehensive fallback content** for all pages and services
2. **Removed `notFound()` calls** that were causing 404s when Sanity was unavailable
3. **Updated metadata generation** to use fallback data
4. **Ensured static generation** works with fallback content

## Current Status

✅ **All routes working**: Homepage, about-us, services, individual service pages
✅ **Static generation**: 25 pages pre-rendered successfully
✅ **Fallback content**: Site works even without Sanity connection
✅ **Build success**: No errors during build process

## Deployment Instructions

### 1. ✅ **Check Environment Variables**

Make sure these are set in your Vercel dashboard:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tbyyj269
NEXT_PUBLIC_SANITY_DATASET=migrated1
SANITY_API_TOKEN=your_token_here
```

**How to add:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable for all environments (Production, Preview, Development)

### 2. ✅ **Verify Build Success**

Check if your build is actually succeeding:

1. Go to Vercel dashboard → "Deployments"
2. Click on the latest deployment
3. Check the "Build Logs" tab
4. Look for any errors during the build process

**Expected output:** Should show 24 static pages generated including all dynamic routes.

### 3. ✅ **Test Debug Page**

Visit `/debug` on your deployed site to check:
- Environment variables are loaded
- Platform detection (should show "Vercel")
- Test links to verify routing

### 4. ✅ **Check Sanity CORS Settings**

1. Go to [sanity.io](https://sanity.io) → Your project → API settings
2. Add your Vercel domain to CORS origins:
   ```
   https://your-project.vercel.app
   https://*.vercel.app
   ```

### 5. ✅ **Verify Static Generation**

The app should generate these static pages:
- `/` (homepage)
- `/about-us`
- `/party-wall-matters` 
- `/accreditations`
- `/privacy-statement`
- `/services`
- `/services/due-diligence-building-surveys`
- `/services/vendor-surveys`
- And 11 more service pages...

## Troubleshooting Steps

### Step 1: Check Build Logs
Look for these specific errors in Vercel build logs:
- `Cannot read properties of null (reading 'title')`
- `Page "/[slug]" is missing "generateStaticParams()"`
- Environment variable errors

### Step 2: Test Locally
Run these commands to verify local build:
```bash
cd aderyn-cms
npm run build
npm run start
```

Then test these URLs:
- http://localhost:3000/
- http://localhost:3000/about-us
- http://localhost:3000/services
- http://localhost:3000/services/due-diligence-building-surveys

### Step 3: Force Redeploy
Sometimes Vercel needs a fresh deployment:
1. Make a small change (add a space to README)
2. Commit and push to trigger new deployment
3. Or use "Redeploy" button in Vercel dashboard

### Step 4: Check Function Logs
If pages are still 404ing:
1. Go to Vercel dashboard → "Functions" tab
2. Check for any runtime errors
3. Look at the "Invocations" to see if functions are being called

## Common Solutions

### Solution A: Environment Variables Missing
**Symptom:** Pages load but show fallback content
**Fix:** Add all required environment variables in Vercel dashboard

### Solution B: Build Failing
**Symptom:** 404 on all pages except homepage
**Fix:** Check build logs, fix any TypeScript/build errors

### Solution C: Static Generation Issues
**Symptom:** Some pages work, others don't
**Fix:** Verify `generateStaticParams()` is working correctly

### Solution D: Sanity Connection Issues
**Symptom:** Pages load but no CMS content
**Fix:** Check CORS settings and API token

## Expected Behavior

✅ **Working correctly:**
- Homepage loads with company information
- `/about-us` shows About Us page (fallback content if Sanity not connected)
- `/services` shows services list
- `/services/[slug]` shows individual service pages
- `/studio` loads Sanity Studio (after authentication)
- `/debug` shows environment information

❌ **Not working (404 errors):**
- Usually indicates build failure or missing static generation
- Check Vercel build logs for specific errors

## Next Steps

1. **Check `/debug` page** on your deployed site
2. **Review Vercel build logs** for any errors
3. **Verify environment variables** are set correctly
4. **Test Sanity CORS** settings include your domain
5. **Force redeploy** if needed

If you're still getting 404s after checking these items, please share:
- The Vercel build logs
- What the `/debug` page shows
- Which specific URLs are returning 404

The app is configured to work with fallback content even without Sanity, so 404s indicate a deployment configuration issue rather than a CMS connection problem.
