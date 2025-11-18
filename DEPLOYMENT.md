# Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Follow the prompts:**

   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? `virtual-memory-simulator`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

4. **Done!** Your app is live at the provided URL.

### Option 2: Vercel Dashboard (Easiest)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub/GitLab/Bitbucket
3. **Click** "Add New Project"
4. **Import** your Git repository (or drag & drop this folder)
5. **Deploy** - Vercel auto-detects settings
6. **Done!** Your app is live.

### Option 3: GitHub Integration (Best for Teams)

1. **Push to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub
   - Select your repository
   - Click "Deploy"

3. **Auto-deploy on push:**
   - Every push to `main` auto-deploys
   - Pull requests get preview URLs

## Deploy to Netlify

### Drag & Drop

1. Go to [netlify.com](https://netlify.com)
2. Sign in
3. Drag and drop this folder
4. Done!

### Netlify CLI

```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Deploy to GitHub Pages

1. **Create repository** on GitHub
2. **Push code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Pages section
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save
4. **Access at:** `https://USERNAME.github.io/REPO_NAME`

## Local Development

Simply open `index.html` in your browser. No build step needed!

Or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## Environment Variables

None needed! This is a static site with no backend.

## Custom Domain

### Vercel

1. Go to project settings
2. Domains tab
3. Add your domain
4. Update DNS records as instructed

### Netlify

1. Go to site settings
2. Domain management
3. Add custom domain
4. Follow DNS instructions

## Performance Tips

- Already optimized with Tailwind CDN
- No build step required
- Loads instantly
- Works offline after first visit (browser cache)

## Troubleshooting

**Issue:** Styles not loading

- **Fix:** Check internet connection (Tailwind CDN)

**Issue:** Fonts not loading

- **Fix:** Check internet connection (Google Fonts)

**Issue:** Vercel deployment fails

- **Fix:** Ensure `vercel.json` is present

## Production Checklist

- ✅ No API keys or secrets in code
- ✅ All assets load from CDN
- ✅ No build step required
- ✅ Works in all modern browsers
- ✅ Mobile responsive
- ✅ Fast load time

## Support

For deployment issues:

- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)
