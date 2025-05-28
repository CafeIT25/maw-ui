# Vercel Deployment Troubleshooting

## Functions Error Fix

If you're getting the error: `The pattern "app/api/**/*.js" defined in functions doesn't match any Serverless Functions inside the api directory.`

### Solution 1: Clean vercel.json (Recommended)

Ensure your `vercel.json` contains ONLY the following:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Solution 2: Complete File Removal and Recreation

1. **Delete the vercel.json file completely:**
   ```powershell
   Remove-Item vercel.json
   ```

2. **Create a new minimal vercel.json:**
   ```powershell
   New-Item -Name "vercel.json" -ItemType File
   ```

3. **Add only the essential content:**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### Solution 3: Using Vercel Dashboard

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Import your GitHub repository**
3. **Configure build settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Solution 4: Remove .vercel Directory

If you have a local `.vercel` directory, remove it:

```powershell
Remove-Item -Recurse -Force .vercel
```

### Solution 5: Force Clean Deployment

1. **Clear Vercel cache in dashboard:**
   - Go to Project Settings
   - Navigate to Functions tab
   - Clear any existing functions

2. **Redeploy from scratch:**
   - Delete the project in Vercel Dashboard
   - Re-import from GitHub
   - Deploy fresh

## Manual Deployment Steps

### Using GitHub Integration

1. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Fix vercel configuration"
   git push origin main
   ```

2. **Vercel auto-deploys from GitHub**

### Alternative: Vercel CLI Installation

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel --prod
   ```

## Verification Checklist

- [ ] `vercel.json` contains no `functions` section
- [ ] `vercel.json` is in project root (`maw-app/`)
- [ ] No `api/` directory exists in your project
- [ ] Build command produces `dist/` directory
- [ ] `dist/index.html` exists after build

## Current Project Structure

```
maw-app/
├── dist/                 # Build output
├── public/
│   └── _redirects       # Fallback routing
├── src/                 # React source
├── vercel.json          # ✅ Minimal config
├── vite.config.ts       # Build config
└── package.json         # Dependencies
```

## Common Issues

### Issue: Functions pattern error
**Solution:** Remove all `functions` configuration from `vercel.json`

### Issue: 404 on page reload
**Solution:** Ensure rewrites configuration is present

### Issue: Build failures
**Solution:** Check Node.js version (use 18.x or 20.x)

### Issue: Assets not loading
**Solution:** Verify `dist` directory contains assets

## Working vercel.json Template

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Contact

If issues persist:
1. Check Vercel deployment logs
2. Verify GitHub repository connection
3. Ensure build completes successfully locally
4. Contact Vercel support with specific error messages 