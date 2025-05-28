# Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel with proper SPA routing support.

### Files Added for Deployment

1. **vercel.json** - Main Vercel configuration
2. **public/_redirects** - Fallback routing configuration
3. **vite.config.ts** - Optimized Vite build configuration

### Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   cd maw-app
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy
   - Choose your project name
   - Deploy to production

### Configuration Details

#### vercel.json
- Handles SPA routing by redirecting all routes to `/index.html`
- Sets up caching headers for static assets
- Configures function timeouts

#### Build Settings
- Output directory: `dist`
- Build command: `npm run build`
- Node.js version: 18.x (recommended)

### Environment Variables

If you need environment variables, add them in Vercel dashboard:
- Go to your project settings
- Navigate to Environment Variables
- Add your variables (e.g., `VITE_API_URL`)

### Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Troubleshooting

**404 on Page Reload:**
- Ensure `vercel.json` is in the project root
- Check that the rewrites configuration is correct
- Verify build output goes to `dist` directory

**Build Failures:**
- Check Node.js version compatibility
- Ensure all dependencies are installed
- Review build logs in Vercel dashboard

**Performance Issues:**
- Enable Edge Functions if needed
- Configure proper caching headers
- Use Vercel Analytics for monitoring

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html) 